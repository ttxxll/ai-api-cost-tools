import { getModelById, modelPricing, type ModelPricingRecord } from '../data/modelPricing';

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
  batchModeEnabled?: boolean;
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
  batchModeEnabled: boolean;
  usedBatchPricing: boolean;
  batchModeUnsupported: boolean;
}

export interface SmartAlternativeBadge {
  label: string;
  tone: 'muted' | 'warning' | 'info' | 'danger';
}

export interface SmartAlternativeCandidate {
  model: ModelPricingRecord;
  costPerCall: number;
  monthlyCost: number;
  badges: SmartAlternativeBadge[];
  unavailable: boolean;
}

export interface SmartAlternativesInput {
  currentModelId?: string;
  inputTokens: number;
  outputTokens: number;
  requestsPerCall?: number;
  callsPerDay?: number;
  cacheHitRate?: number;
  promptCachingEnabled?: boolean;
  cacheTtlHours?: number;
  batchModeEnabled?: boolean;
  preferredModelIds?: string[];
  limit?: number;
  locale?: 'en' | 'zh';
}

interface EffectivePrices {
  inputPricePerM: number;
  outputPricePerM: number;
  readPricePerM?: number;
  pricingTier: 'standard' | 'over200k';
}

interface CostScenarioOptions {
  assumeGoogleStorageHour?: boolean;
  forceStandardPricing?: boolean;
}

interface CostScenario {
  inputCostPerCall: number;
  outputCostPerCall: number;
  totalCostPerCall: number;
  dailyCost: number;
  monthlyCost: number;
  cacheReadCostPerCall: number;
  cacheWriteCostPerCall: number;
  cacheStorageCostPerCall: number;
  noCacheCostPerCall: number;
  noCacheDailyCost: number;
  noCacheMonthlyCost: number;
  cacheSavingsPerCall: number;
  cacheSavingsMonthly: number;
  pricingTier: 'standard' | 'over200k';
  effectiveInputPricePerM: number;
  effectiveOutputPricePerM: number;
  effectiveReadPricePerM?: number;
  usedBatchPricing: boolean;
  batchModeUnsupported: boolean;
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

export function calculateSmartAlternatives(input: SmartAlternativesInput): SmartAlternativeCandidate[] {
  const limit = input.limit ?? 3;
  const locale = input.locale ?? 'en';
  const currentModel = input.currentModelId ? getModelById(input.currentModelId) : undefined;
  const preferredModelIds = input.preferredModelIds ?? [];

  if (preferredModelIds.length > 0) {
    const selectedModels = preferredModelIds
      .map((modelId) => getModelById(modelId))
      .filter((model): model is ModelPricingRecord => Boolean(model));

    return selectedModels.map((model) => buildSmartAlternative(model, input, locale));
  }

  return modelPricing
    .filter((model) => model.id !== currentModel?.id)
    .map((model) => buildSmartAlternative(model, input, locale))
    .filter((candidate) => !candidate.unavailable)
    .sort((a, b) => a.monthlyCost - b.monthlyCost)
    .slice(0, limit);
}

function computeCost(input: ApiCostInput, model: ModelPricingRecord): ApiCostResult {
  const scenario = getCostScenario(model, input);
  const requestsPerCall = input.requestsPerCall || 1;
  const callsPerDay = input.callsPerDay || 1;
  const inputTokensPerCall = input.inputTokens * requestsPerCall;
  const outputTokensPerCall = input.outputTokens * requestsPerCall;
  const batch = getBatchComparison(model, inputTokensPerCall, outputTokensPerCall, callsPerDay, scenario.noCacheMonthlyCost);

  return {
    model,
    inputCostPerCall: scenario.inputCostPerCall,
    outputCostPerCall: scenario.outputCostPerCall,
    totalCostPerCall: scenario.totalCostPerCall,
    dailyCost: scenario.dailyCost,
    monthlyCost: scenario.monthlyCost,
    inputTokensPerDay: inputTokensPerCall * callsPerDay,
    outputTokensPerDay: outputTokensPerCall * callsPerDay,
    pricingTier: scenario.pricingTier,
    effectiveInputPricePerM: scenario.effectiveInputPricePerM,
    effectiveOutputPricePerM: scenario.effectiveOutputPricePerM,
    effectiveReadPricePerM: scenario.effectiveReadPricePerM,
    cacheReadCostPerCall: scenario.cacheReadCostPerCall,
    cacheWriteCostPerCall: scenario.cacheWriteCostPerCall,
    cacheStorageCostPerCall: scenario.cacheStorageCostPerCall,
    noCacheCostPerCall: scenario.noCacheCostPerCall,
    noCacheDailyCost: scenario.noCacheDailyCost,
    noCacheMonthlyCost: scenario.noCacheMonthlyCost,
    cacheSavingsPerCall: scenario.cacheSavingsPerCall,
    cacheSavingsMonthly: scenario.cacheSavingsMonthly,
    batchModeEnabled: Boolean(input.batchModeEnabled),
    usedBatchPricing: scenario.usedBatchPricing,
    batchModeUnsupported: scenario.batchModeUnsupported,
    ...batch,
  };
}

function buildSmartAlternative(
  model: ModelPricingRecord,
  input: SmartAlternativesInput,
  locale: 'en' | 'zh'
): SmartAlternativeCandidate {
  if (input.inputTokens > model.contextWindow) {
    return {
      model,
      costPerCall: Number.POSITIVE_INFINITY,
      monthlyCost: Number.POSITIVE_INFINITY,
      unavailable: true,
      badges: [{ label: '❌ Exceeds Limit', tone: 'danger' }],
    };
  }

  const badges: SmartAlternativeBadge[] = [];
  const cacheRequested = Boolean(input.promptCachingEnabled);
  const batchRequested = Boolean(input.batchModeEnabled);
  const cacheTtlHours = getAlternativeCacheTtlHours(model, input, badges, locale);
  const forceStandardPricing =
    (cacheRequested && !model.caching.isSupported) ||
    (batchRequested && !model.batchPricing.isSupported);

  if (cacheRequested && !model.caching.isSupported) {
    badges.push({
      label: locale === 'zh' ? '不支持缓存，按标准价计算' : 'Cache unsupported, standard pricing',
      tone: 'muted',
    });
  }

  if (batchRequested && !model.batchPricing.isSupported) {
    badges.push({ label: locale === 'zh' ? '不支持 Batch' : 'Batch unsupported', tone: 'muted' });
  }

  const scenario = getCostScenario(
    model,
    {
      modelId: model.id,
      inputTokens: input.inputTokens,
      outputTokens: input.outputTokens,
      requestsPerCall: input.requestsPerCall,
      callsPerDay: input.callsPerDay,
      cacheHitRate: input.cacheHitRate,
      promptCachingEnabled: cacheRequested,
      cacheTtlHours,
      batchModeEnabled: batchRequested,
    },
    { forceStandardPricing }
  );

  if (scenario.pricingTier === 'over200k') {
    badges.push({ label: locale === 'zh' ? '>200k 长文本费率' : '>200k tier', tone: 'info' });
  }

  return {
    model,
    costPerCall: scenario.totalCostPerCall,
    monthlyCost: scenario.monthlyCost,
    unavailable: false,
    badges,
  };
}

function getCostScenario(
  model: ModelPricingRecord,
  input: ApiCostInput,
  options: CostScenarioOptions = {}
): CostScenario {
  const requestsPerCall = input.requestsPerCall || 1;
  const callsPerDay = input.callsPerDay || 1;
  const cacheHitRate = Math.min(Math.max(input.cacheHitRate || 0, 0), 100) / 100;
  const batchModeEnabled = Boolean(input.batchModeEnabled);
  const usedBatchPricing = batchModeEnabled && model.batchPricing.isSupported && !options.forceStandardPricing;
  const batchModeUnsupported = batchModeEnabled && !model.batchPricing.isSupported;
  const promptCachingEnabled = Boolean(
    input.promptCachingEnabled && model.caching.isSupported && !options.forceStandardPricing
  );
  const cacheTtlHours = Math.min(Math.max(input.cacheTtlHours || 0, 0), 24);
  const prices = getEffectivePrices(model, input.inputTokens, usedBatchPricing);

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

  return {
    inputCostPerCall,
    outputCostPerCall,
    totalCostPerCall,
    dailyCost,
    monthlyCost,
    cacheReadCostPerCall,
    cacheWriteCostPerCall,
    cacheStorageCostPerCall,
    noCacheCostPerCall,
    noCacheDailyCost,
    noCacheMonthlyCost,
    cacheSavingsPerCall: noCacheCostPerCall - totalCostPerCall,
    cacheSavingsMonthly: noCacheMonthlyCost - monthlyCost,
    pricingTier: prices.pricingTier,
    effectiveInputPricePerM: prices.inputPricePerM,
    effectiveOutputPricePerM: prices.outputPricePerM,
    effectiveReadPricePerM: prices.readPricePerM,
    usedBatchPricing,
    batchModeUnsupported,
  };
}

function getEffectivePrices(
  model: ModelPricingRecord,
  inputTokensPerRequest: number,
  usedBatchPricing = false
): EffectivePrices {
  const baseInputPricePerM = usedBatchPricing
    ? model.batchPricing.inputPricePerM ?? model.inputPricePerM
    : model.inputPricePerM;
  const baseOutputPricePerM = usedBatchPricing
    ? model.batchPricing.outputPricePerM ?? model.outputPricePerM
    : model.outputPricePerM;
  const longContextInputPrice = model.inputPricePerM_over200k;
  const longContextOutputPrice = model.outputPricePerM_over200k;

  if (
    !usedBatchPricing &&
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
    inputPricePerM: baseInputPricePerM,
    outputPricePerM: baseOutputPricePerM,
    readPricePerM: model.caching.readPricePerM,
    pricingTier: 'standard',
  };
}

function getAlternativeCacheTtlHours(
  model: ModelPricingRecord,
  input: SmartAlternativesInput,
  badges: SmartAlternativeBadge[],
  locale: 'en' | 'zh'
): number {
  if (
    input.promptCachingEnabled &&
    model.provider === 'Google' &&
    model.caching.isSupported &&
    model.caching.storagePricePerMPerHour !== undefined &&
    (input.cacheTtlHours || 0) <= 0
  ) {
    badges.push({ label: locale === 'zh' ? '含1小时挂载费' : 'Includes 1h storage', tone: 'info' });
    return 1;
  }

  return input.cacheTtlHours || 0;
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
