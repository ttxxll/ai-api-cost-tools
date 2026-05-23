import { getModelById, type ModelPricing } from '../data/modelPricing';

export interface BatchEstimatorInput {
  modelId: string;
  taskCount: number;
  inputTokensPerTask: number;
  outputTokensPerTask: number;
}

export interface BatchEstimatorResult {
  model: ModelPricing;
  totalInputTokens: number;
  totalOutputTokens: number;
  totalTokens: number;
  inputCost: number;
  outputCost: number;
  totalCost: number;
  standardTotalCost: number;
  savings: number;
  isBatchSupported: boolean;
  usedBatchPricing: boolean;
  estimatedTimeMinutes: number;
}

export function estimateBatchCost(
  input: BatchEstimatorInput
): BatchEstimatorResult | null {
  const model = getModelById(input.modelId);
  if (!model) return null;

  const totalInputTokens = input.inputTokensPerTask * input.taskCount;
  const totalOutputTokens = input.outputTokensPerTask * input.taskCount;
  const totalTokens = totalInputTokens + totalOutputTokens;
  const isBatchSupported = model.batchPricing.isSupported;
  const inputPricePerM = isBatchSupported
    ? model.batchPricing.inputPricePerM ?? model.inputPricePerM
    : model.inputPricePerM;
  const outputPricePerM = isBatchSupported
    ? model.batchPricing.outputPricePerM ?? model.outputPricePerM
    : model.outputPricePerM;

  const inputCost = (totalInputTokens * inputPricePerM) / 1000000;
  const outputCost =
    (totalOutputTokens * outputPricePerM) / 1000000;
  const totalCost = inputCost + outputCost;
  const standardTotalCost =
    (totalInputTokens * model.inputPricePerM) / 1000000 +
    (totalOutputTokens * model.outputPricePerM) / 1000000;
  const savings = Math.max(standardTotalCost - totalCost, 0);

  const estimatedTimeMinutes = Math.ceil((input.taskCount * 2) / 60);

  return {
    model,
    totalInputTokens,
    totalOutputTokens,
    totalTokens,
    inputCost,
    outputCost,
    totalCost,
    standardTotalCost,
    savings,
    isBatchSupported,
    usedBatchPricing: isBatchSupported,
    estimatedTimeMinutes,
  };
}
