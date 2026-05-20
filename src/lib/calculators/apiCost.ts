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
}

export function calculateApiCost(input: ApiCostInput): ApiCostResult | null {
  if (input.customModel) {
    const custom = input.customModel;
    const model: ModelPricingRecord = {
      id: 'custom',
      provider: 'OpenAI',
      displayName: custom.displayName || custom.name || 'Custom Model',
      contextWindow: 0,
      inputPricePerM: custom.inputPricePerM ?? custom.inputPricePerMillion ?? 0,
      outputPricePerM: custom.outputPricePerM ?? custom.outputPricePerMillion ?? 0,
      caching: { isSupported: false },
      maxOutput: 0,
      openRouterId: 'custom',
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

  const inputTokensPerCall = input.inputTokens * requestsPerCall;
  const outputTokensPerCall = input.outputTokens * requestsPerCall;

  let inputCostPerCall: number;
  if (model.caching.isSupported && model.caching.readPricePerM !== undefined && cacheHitRate > 0) {
    const cacheHitCost = (inputTokensPerCall * cacheHitRate * model.caching.readPricePerM) / 1000000;
    const cacheMissCost = (inputTokensPerCall * (1 - cacheHitRate) * model.inputPricePerM) / 1000000;
    inputCostPerCall = cacheHitCost + cacheMissCost;
  } else {
    inputCostPerCall = (inputTokensPerCall * model.inputPricePerM) / 1000000;
  }

  const outputCostPerCall =
    (outputTokensPerCall * model.outputPricePerM) / 1000000;
  const totalCostPerCall = inputCostPerCall + outputCostPerCall;

  // Calculate daily and monthly costs
  const dailyCost = totalCostPerCall * callsPerDay;
  const monthlyCost = dailyCost * 30;

  // Calculate token usage
  const inputTokensPerDay = inputTokensPerCall * callsPerDay;
  const outputTokensPerDay = outputTokensPerCall * callsPerDay;

  return {
    model,
    inputCostPerCall,
    outputCostPerCall,
    totalCostPerCall,
    dailyCost,
    monthlyCost,
    inputTokensPerDay,
    outputTokensPerDay,
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
