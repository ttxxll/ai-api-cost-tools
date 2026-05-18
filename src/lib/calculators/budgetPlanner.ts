import { getModelById, type ModelPricing } from '../data/modelPricing';

export interface BudgetPlannerInput {
  modelId: string;
  monthlyBudget: number;
  avgInputTokens: number;
  avgOutputTokens: number;
}

export interface BudgetPlannerResult {
  model: ModelPricing;
  costPerCall: number;
  maxCallsPerMonth: number;
  maxCallsPerDay: number;
  inputCostPerCall: number;
  outputCostPerCall: number;
}

export function calculateBudget(input: BudgetPlannerInput): BudgetPlannerResult | null {
  const model = getModelById(input.modelId);
  if (!model) return null;

  // Calculate cost per call
  const inputCostPerCall =
    (input.avgInputTokens * model.inputPricePerMillion) / 1000000;
  const outputCostPerCall =
    (input.avgOutputTokens * model.outputPricePerMillion) / 1000000;
  const costPerCall = inputCostPerCall + outputCostPerCall;

  // Calculate max calls
  const maxCallsPerMonth =
    costPerCall > 0 ? Math.floor(input.monthlyBudget / costPerCall) : 0;
  const maxCallsPerDay = Math.floor(maxCallsPerMonth / 30);

  return {
    model,
    costPerCall,
    maxCallsPerMonth,
    maxCallsPerDay,
    inputCostPerCall,
    outputCostPerCall,
  };
}
