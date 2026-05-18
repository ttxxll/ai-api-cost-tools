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
  estimatedTimeMinutes: number;
}

export function estimateBatchCost(
  input: BatchEstimatorInput
): BatchEstimatorResult | null {
  const model = getModelById(input.modelId);
  if (!model) return null;

  // Calculate total tokens
  const totalInputTokens = input.inputTokensPerTask * input.taskCount;
  const totalOutputTokens = input.outputTokensPerTask * input.taskCount;
  const totalTokens = totalInputTokens + totalOutputTokens;

  // Calculate costs
  const inputCost = (totalInputTokens * model.inputPricePerMillion) / 1000000;
  const outputCost =
    (totalOutputTokens * model.outputPricePerMillion) / 1000000;
  const totalCost = inputCost + outputCost;

  // Estimate time (rough estimate: ~2 seconds per task for batch processing)
  const estimatedTimeMinutes = Math.ceil((input.taskCount * 2) / 60);

  return {
    model,
    totalInputTokens,
    totalOutputTokens,
    totalTokens,
    inputCost,
    outputCost,
    totalCost,
    estimatedTimeMinutes,
  };
}
