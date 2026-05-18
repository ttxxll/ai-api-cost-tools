export interface ModelPricing {
  id: string;
  name: string;
  provider: 'anthropic' | 'openai' | 'google' | 'deepseek' | 'mistral' | 'xai';
  inputPricePerMillion: number;
  outputPricePerMillion: number;
  contextWindow: number;
  maxOutput: number;
  cacheHitPricePerMillion?: number;
  notes?: string;
}

export const modelPricing: ModelPricing[] = [
  // ── Anthropic Claude ──────────────────────────────────────────────
  {
    id: 'claude-opus-4.7',
    name: 'Claude Opus 4.7',
    provider: 'anthropic',
    inputPricePerMillion: 5,
    outputPricePerMillion: 25,
    contextWindow: 1000000,
    maxOutput: 128000,
  },
  {
    id: 'claude-sonnet-4.6',
    name: 'Claude Sonnet 4.6',
    provider: 'anthropic',
    inputPricePerMillion: 3,
    outputPricePerMillion: 15,
    contextWindow: 1000000,
    maxOutput: 128000,
  },
  {
    id: 'claude-sonnet-4.5',
    name: 'Claude Sonnet 4.5',
    provider: 'anthropic',
    inputPricePerMillion: 3,
    outputPricePerMillion: 15,
    contextWindow: 1000000,
    maxOutput: 64000,
  },
  {
    id: 'claude-haiku-4.5',
    name: 'Claude Haiku 4.5',
    provider: 'anthropic',
    inputPricePerMillion: 1,
    outputPricePerMillion: 5,
    contextWindow: 200000,
    maxOutput: 64000,
  },

  // ── OpenAI GPT ────────────────────────────────────────────────────
  {
    id: 'gpt-5.5-pro',
    name: 'GPT-5.5 Pro',
    provider: 'openai',
    inputPricePerMillion: 30,
    outputPricePerMillion: 180,
    contextWindow: 1050000,
    maxOutput: 128000,
  },
  {
    id: 'gpt-5.5',
    name: 'GPT-5.5',
    provider: 'openai',
    inputPricePerMillion: 5,
    outputPricePerMillion: 30,
    contextWindow: 1050000,
    maxOutput: 128000,
  },
  {
    id: 'gpt-5.4-pro',
    name: 'GPT-5.4 Pro',
    provider: 'openai',
    inputPricePerMillion: 30,
    outputPricePerMillion: 180,
    contextWindow: 1050000,
    maxOutput: 128000,
  },
  {
    id: 'gpt-5.4',
    name: 'GPT-5.4',
    provider: 'openai',
    inputPricePerMillion: 2.5,
    outputPricePerMillion: 15,
    contextWindow: 1050000,
    maxOutput: 128000,
  },
  {
    id: 'gpt-5.4-mini',
    name: 'GPT-5.4 Mini',
    provider: 'openai',
    inputPricePerMillion: 0.75,
    outputPricePerMillion: 4.5,
    contextWindow: 400000,
    maxOutput: 128000,
  },
  {
    id: 'gpt-5',
    name: 'GPT-5',
    provider: 'openai',
    inputPricePerMillion: 1.25,
    outputPricePerMillion: 10,
    contextWindow: 400000,
    maxOutput: 128000,
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    inputPricePerMillion: 2.5,
    outputPricePerMillion: 10,
    contextWindow: 128000,
    maxOutput: 16384,
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o mini',
    provider: 'openai',
    inputPricePerMillion: 0.15,
    outputPricePerMillion: 0.6,
    contextWindow: 128000,
    maxOutput: 16384,
  },
  {
    id: 'o3',
    name: 'o3',
    provider: 'openai',
    inputPricePerMillion: 2,
    outputPricePerMillion: 8,
    contextWindow: 200000,
    maxOutput: 100000,
  },
  {
    id: 'o3-mini',
    name: 'o3-mini',
    provider: 'openai',
    inputPricePerMillion: 1.1,
    outputPricePerMillion: 4.4,
    contextWindow: 200000,
    maxOutput: 100000,
  },

  // ── Google Gemini ─────────────────────────────────────────────────
  {
    id: 'gemini-3.1-pro-preview',
    name: 'Gemini 3.1 Pro Preview',
    provider: 'google',
    inputPricePerMillion: 2,
    outputPricePerMillion: 12,
    contextWindow: 1048576,
    maxOutput: 65536,
  },
  {
    id: 'gemini-3.1-flash-lite',
    name: 'Gemini 3.1 Flash Lite',
    provider: 'google',
    inputPricePerMillion: 0.25,
    outputPricePerMillion: 1.5,
    contextWindow: 1048576,
    maxOutput: 65536,
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'google',
    inputPricePerMillion: 1.25,
    outputPricePerMillion: 10,
    contextWindow: 1048576,
    maxOutput: 65536,
  },
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'google',
    inputPricePerMillion: 0.3,
    outputPricePerMillion: 2.5,
    contextWindow: 1048576,
    maxOutput: 65535,
  },
  {
    id: 'gemini-2.5-flash-lite',
    name: 'Gemini 2.5 Flash Lite',
    provider: 'google',
    inputPricePerMillion: 0.1,
    outputPricePerMillion: 0.4,
    contextWindow: 1048576,
    maxOutput: 65535,
  },

  // ── DeepSeek ──────────────────────────────────────────────────────
  {
    id: 'deepseek-v4-flash',
    name: 'DeepSeek V4 Flash',
    provider: 'deepseek',
    inputPricePerMillion: 0.112,
    outputPricePerMillion: 0.224,
    contextWindow: 1048576,
    maxOutput: 384000,
    cacheHitPricePerMillion: 0.0028,
  },
  {
    id: 'deepseek-v4-pro',
    name: 'DeepSeek V4 Pro',
    provider: 'deepseek',
    inputPricePerMillion: 0.435,
    outputPricePerMillion: 0.87,
    contextWindow: 1048576,
    maxOutput: 384000,
    cacheHitPricePerMillion: 0.003625,
  },

  // ── Mistral ───────────────────────────────────────────────────────
  {
    id: 'mistral-large-2',
    name: 'Mistral Large 2',
    provider: 'mistral',
    inputPricePerMillion: 2,
    outputPricePerMillion: 6,
    contextWindow: 128000,
    maxOutput: 65536,
  },
  {
    id: 'mistral-medium-3-5',
    name: 'Mistral Medium 3.5',
    provider: 'mistral',
    inputPricePerMillion: 1.5,
    outputPricePerMillion: 7.5,
    contextWindow: 128000,
    maxOutput: 65536,
  },
  {
    id: 'mistral-small-4',
    name: 'Mistral Small 4',
    provider: 'mistral',
    inputPricePerMillion: 0.15,
    outputPricePerMillion: 0.6,
    contextWindow: 128000,
    maxOutput: 65536,
  },

  // ── xAI (Grok) ───────────────────────────────────────────────────
  {
    id: 'grok-4.3',
    name: 'Grok 4.3',
    provider: 'xai',
    inputPricePerMillion: 1.25,
    outputPricePerMillion: 2.5,
    contextWindow: 1000000,
    maxOutput: 65536,
  },
  {
    id: 'grok-3',
    name: 'Grok 3',
    provider: 'xai',
    inputPricePerMillion: 3,
    outputPricePerMillion: 15,
    contextWindow: 131072,
    maxOutput: 65536,
  },
  {
    id: 'grok-3-mini',
    name: 'Grok 3 Mini',
    provider: 'xai',
    inputPricePerMillion: 0.3,
    outputPricePerMillion: 0.5,
    contextWindow: 131072,
    maxOutput: 65536,
  },
];

export function getModelsByProvider(provider: string): ModelPricing[] {
  return modelPricing.filter((model) => model.provider === provider);
}

export function getModelById(id: string): ModelPricing | undefined {
  // Try exact match first
  const exact = modelPricing.find((model) => model.id === id);
  if (exact) return exact;
  // Try matching after stripping provider prefix (e.g. "openai/gpt-5.4" -> "gpt-5.4")
  const stripped = id.includes('/') ? id.split('/').pop()! : id;
  return modelPricing.find((model) => model.id === stripped);
}

export const providers = [
  { id: 'anthropic', name: 'Anthropic (Claude)' },
  { id: 'openai', name: 'OpenAI (GPT)' },
  { id: 'google', name: 'Google (Gemini)' },
  { id: 'deepseek', name: 'DeepSeek' },
  { id: 'mistral', name: 'Mistral' },
  { id: 'xai', name: 'xAI (Grok)' },
];
