export interface Tool {
  id: string;
  slug: string;
  icon: string;
  category: 'single-model' | 'comparison' | 'planning';
}

export const tools: Tool[] = [
  {
    id: 'token',
    slug: 'token-cost-calculator',
    icon: '🧮',
    category: 'planning',
  },
  {
    id: 'claude',
    slug: 'claude-api-cost-calculator',
    icon: '🤖',
    category: 'single-model',
  },
  {
    id: 'gpt',
    slug: 'gpt-api-cost-calculator',
    icon: '💬',
    category: 'single-model',
  },
  {
    id: 'gemini',
    slug: 'gemini-api-cost-calculator',
    icon: '✨',
    category: 'single-model',
  },
  {
    id: 'deepseek',
    slug: 'deepseek-api-cost-calculator',
    icon: '🔍',
    category: 'single-model',
  },
  {
    id: 'comparison',
    slug: 'ai-model-price-comparison',
    icon: '📊',
    category: 'comparison',
  },
  {
    id: 'budget',
    slug: 'prompt-token-budget-planner',
    icon: '💰',
    category: 'planning',
  },
  {
    id: 'monthly',
    slug: 'ai-app-monthly-cost-calculator',
    icon: '📅',
    category: 'planning',
  },
  {
    id: 'batch',
    slug: 'batch-api-cost-estimator',
    icon: '📦',
    category: 'planning',
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getRelatedTools(currentSlug: string, limit = 3): Tool[] {
  return tools.filter((tool) => tool.slug !== currentSlug).slice(0, limit);
}
