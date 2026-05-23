import { getModelById, type ModelPricingRecord } from '../data/modelPricing';

export interface CustomModelData {
  name?: string;
  displayName?: string;
  inputPricePerMillion?: number;
  outputPricePerMillion?: number;
  inputPricePerM?: number;
  outputPricePerM?: number;
}

export interface ApiCostInput {
  modelId: string;
  inputTokens: number;
  outputTokens: number;
  requestsPerCall?: number;
  callsPerDay?: number;
  cacheHitRate?: number;
  promptCachingEnabled?: boolean;
  cacheTtlHours?: number;
  customModel?: CustomModelData;
}

export interface ApiCostResult {
  model: ModelPricingRecord;
  inputCostPerCall: number;
  outputCostPerCall: number;
  totalCostPerCall: number;
  dailyCost: number;
  monthlyCost: number;
  inputTokensPerDay: number;
  outputTokensPerDay: number;
  pricingTier: 'standard' | 'over200k';
  effectiveInputPricePerM: number;
  effectiveOutputPricePerM: number;
  effectiveReadPricePerM?: number;
  cacheReadCostPerCall: number;
  cacheWriteCostPerCall: number;
  cacheStorageCostPerCall: number;
  noCacheCostPerCall: number;
  noCacheDailyCost: number;
  noCacheMonthlyCost: number;
  cacheSavingsPerCall: number;
  cacheSavingsMonthly: number;
  batchCostPerCall?: number;
  batchDailyCost?: number;
  batchMonthlyCost?: number;
  batchMonthlySavings?: number;
}

interface EffectivePrices {
  inputPricePerM: number;
  outputPricePerM: number;
  readPricePerM?: number;
  pricingTier: 'standard' | 'over200k';
}

const LONG_CONTEXT_THRESHOLD = 200000;

export function calculateApiCost(input: ApiCostInput): ApiCostResult | null {
  if (input.customModel) {
    const custom = input.customModel;
    const model: ModelPricingRecord = {
      id: 'custom',
      provider: 'OpenAI',
      displayName: custom.displayName || custom.name || 'Custom Model',
      contextWindow: 0,
      maxOutput: 0,
      inputPricePerM: custom.inputPricePerM ?? custom.inputPricePerMillion ?? 0,
      outputPricePerM: custom.outputPricePerM ?? custom.outputPricePerMillion ?? 0,
      caching: { isSupported: false },
      batchPricing: { isSupported: false },
    };
    return computeCost(input, model);
  }

  const model = getModelById(input.modelId);
  if (!model) return null;
  return computeCost(input, model);
}

function computeCost(input: ApiCostInput, model: ModelPricingRecord): ApiCostResult {
  const requestsPerCall = input.requestsPerCall || 1;
  const callsPerDay = input.callsPerDay || 1;
  const cacheHitRate = Math.min(Math.max(input.cacheHitRate || 0, 0), 100) / 100;
  const promptCachingEnabled = Boolean(input.promptCachingEnabled && model.caching.isSupported);
  const cacheTtlHours = Math.min(Math.max(input.cacheTtlHours || 0, 0), 24);
  const prices = getEffectivePrices(model, input.inputTokens);

  const inputTokensPerCall = input.inputTokens * requestsPerCall;
  const outputTokensPerCall = input.outputTokens * requestsPerCall;
  const noCacheInputCostPerCall = (inputTokensPerCall * prices.inputPricePerM) / 1000000;
  const outputCostPerCall = (outputTokensPerCall * prices.outputPricePerM) / 1000000;
  const noCacheCostPerCall = noCacheInputCostPerCall + outputCostPerCall;

  let cacheReadCostPerCall = 0;
  let cacheWriteCostPerCall = 0;
  let cacheStorageCostPerCall = 0;
  let inputCostPerCall = noCacheInputCostPerCall;

  if (promptCachingEnabled && prices.readPricePerM !== undefined) {
    const cacheHitTokens = inputTokensPerCall * cacheHitRate;
    const cacheMissTokens = inputTokensPerCall * (1 - cacheHitRate);
    const cacheWritePricePerM = getCacheWritePricePerM(model, prices.inputPricePerM);

    cacheReadCostPerCall = (cacheHitTokens * prices.readPricePerM) / 1000000;
    cacheWriteCostPerCall = (cacheMissTokens * cacheWritePricePerM) / 1000000;
    cacheStorageCostPerCall = getCacheStorageCostPerCall(model, input.inputTokens, cacheTtlHours);
    inputCostPerCall = cacheReadCostPerCall + cacheWriteCostPerCall + cacheStorageCostPerCall;
  }

  const totalCostPerCall = inputCostPerCall + outputCostPerCall;
  const dailyCost = totalCostPerCall * callsPerDay;
  const monthlyCost = dailyCost * 30;
  const noCacheDailyCost = noCacheCostPerCall * callsPerDay;
  const noCacheMonthlyCost = noCacheDailyCost * 30;
  const batch = getBatchComparison(model, inputTokensPerCall, outputTokensPerCall, callsPerDay, noCacheMonthlyCost);

  return {
    model,
    inputCostPerCall,
    outputCostPerCall,
    totalCostPerCall,
    dailyCost,
    monthlyCost,
    inputTokensPerDay: inputTokensPerCall * callsPerDay,
    outputTokensPerDay: outputTokensPerCall * callsPerDay,
    pricingTier: prices.pricingTier,
    effectiveInputPricePerM: prices.inputPricePerM,
    effectiveOutputPricePerM: prices.outputPricePerM,
    effectiveReadPricePerM: prices.readPricePerM,
    cacheReadCostPerCall,
    cacheWriteCostPerCall,
    cacheStorageCostPerCall,
    noCacheCostPerCall,
    noCacheDailyCost,
    noCacheMonthlyCost,
    cacheSavingsPerCall: noCacheCostPerCall - totalCostPerCall,
    cacheSavingsMonthly: noCacheMonthlyCost - monthlyCost,
    ...batch,
  };
}

function getEffectivePrices(model: ModelPricingRecord, inputTokensPerRequest: number): EffectivePrices {
  const longContextInputPrice = model.inputPricePerM_over200k;
  const longContextOutputPrice = model.outputPricePerM_over200k;

  if (
    model.provider === 'Google' &&
    inputTokensPerRequest > LONG_CONTEXT_THRESHOLD &&
    longContextInputPrice !== undefined &&
    longContextOutputPrice !== undefined
  ) {
    return {
      inputPricePerM: longContextInputPrice,
      outputPricePerM: longContextOutputPrice,
      readPricePerM: model.caching.readPricePerM_over200k ?? model.caching.readPricePerM,
      pricingTier: 'over200k',
    };
  }

  return {
    inputPricePerM: model.inputPricePerM,
    outputPricePerM: model.outputPricePerM,
    readPricePerM: model.caching.readPricePerM,
    pricingTier: 'standard',
  };
}

function getCacheWritePricePerM(model: ModelPricingRecord, fallbackPricePerM: number): number {
  if (model.provider === 'Anthropic') {
    return model.caching.writePricePerM_5m ?? fallbackPricePerM;
  }
  return fallbackPricePerM;
}

function getCacheStorageCostPerCall(
  model: ModelPricingRecord,
  inputTokens: number,
  cacheTtlHours: number
): number {
  if (model.provider !== 'Google' || !model.caching.storagePricePerMPerHour || cacheTtlHours <= 0) {
    return 0;
  }

  return (inputTokens * model.caching.storagePricePerMPerHour * cacheTtlHours) / 1000000;
}

function getBatchComparison(
  model: ModelPricingRecord,
  inputTokensPerCall: number,
  outputTokensPerCall: number,
  callsPerDay: number,
  noCacheMonthlyCost: number
) {
  if (!model.batchPricing.isSupported) return {};

  const batchInputPricePerM = model.batchPricing.inputPricePerM ?? model.inputPricePerM;
  const batchOutputPricePerM = model.batchPricing.outputPricePerM ?? model.outputPricePerM;
  const batchCostPerCall =
    (inputTokensPerCall * batchInputPricePerM) / 1000000 +
    (outputTokensPerCall * batchOutputPricePerM) / 1000000;
  const batchDailyCost = batchCostPerCall * callsPerDay;
  const batchMonthlyCost = batchDailyCost * 30;

  return {
    batchCostPerCall,
    batchDailyCost,
    batchMonthlyCost,
    batchMonthlySavings: Math.max(noCacheMonthlyCost - batchMonthlyCost, 0),
  };
}

export function formatCost(cost: number): string {
  if (cost < 0.01) {
    return cost.toFixed(6);
  } else if (cost < 1) {
    return cost.toFixed(4);
  } else {
    return cost.toFixed(2);
  }
}

export function formatTokens(tokens: number): string {
  if (tokens >= 1000000) {
    return `${(tokens / 1000000).toFixed(2)}M`;
  } else if (tokens >= 1000) {
    return `${(tokens / 1000).toFixed(1)}K`;
  }
  return tokens.toString();
}
