export type ModelProvider = 'OpenAI' | 'Anthropic' | 'Google' | 'DeepSeek' | 'xAI' | 'Mistral';

export interface ModelPricing {
  id: string;
  provider: ModelProvider;
  displayName: string;
  contextWindow: number;
  maxOutput: number;
  inputPricePerM: number;
  outputPricePerM: number;
  inputPricePerM_over200k?: number;
  outputPricePerM_over200k?: number;
  caching: {
    isSupported: boolean;
    readPricePerM?: number;
    readPricePerM_over200k?: number;
    writePricePerM_5m?: number;
    writePricePerM_1h?: number;
    storagePricePerMPerHour?: number;
  };
  batchPricing: {
    isSupported: boolean;
    inputPricePerM?: number;
    outputPricePerM?: number;
  };
}

export type ModelPricingRecord = ModelPricing;

export const MODELS_DATA: ModelPricingRecord[] = [
  {
    id: 'gpt-5.5-pro',
    provider: 'OpenAI',
    displayName: 'GPT-5.5-pro',
    contextWindow: 270000,
    maxOutput: 128000,
    inputPricePerM: 30,
    outputPricePerM: 180,
    caching: {
      isSupported: false,
    },
    batchPricing: {
      isSupported: true,
      inputPricePerM: 15,
      outputPricePerM: 90,
    },
  },
  {
    id: 'gpt-5.5',
    provider: 'OpenAI',
    displayName: 'GPT-5.5',
    contextWindow: 270000,
    maxOutput: 128000,
    inputPricePerM: 5,
    outputPricePerM: 30,
    caching: {
      isSupported: true,
      readPricePerM: 0.5,
    },
    batchPricing: {
      isSupported: true,
      inputPricePerM: 2.5,
      outputPricePerM: 15,
    },
  },
  {
    id: 'gpt-5.4',
    provider: 'OpenAI',
    displayName: 'GPT-5.4',
    contextWindow: 270000,
    maxOutput: 128000,
    inputPricePerM: 2.5,
    outputPricePerM: 15,
    caching: {
      isSupported: true,
      readPricePerM: 0.25,
    },
    batchPricing: {
      isSupported: true,
      inputPricePerM: 1.25,
      outputPricePerM: 7.5,
    },
  },
  {
    id: 'gpt-5.4-mini',
    provider: 'OpenAI',
    displayName: 'GPT-5.4 Mini',
    contextWindow: 270000,
    maxOutput: 128000,
    inputPricePerM: 0.75,
    outputPricePerM: 4.5,
    caching: {
      isSupported: true,
      readPricePerM: 0.075,
    },
    batchPricing: {
      isSupported: true,
      inputPricePerM: 0.375,
      outputPricePerM: 2.25,
    },
  },
  {
    id: 'claude-opus-4.7',
    provider: 'Anthropic',
    displayName: 'Claude Opus 4.7',
    contextWindow: 1000000,
    maxOutput: 128000,
    inputPricePerM: 5,
    outputPricePerM: 25,
    caching: {
      isSupported: true,
      readPricePerM: 0.5,
      writePricePerM_5m: 6.25,
      writePricePerM_1h: 10,
    },
    batchPricing: {
      isSupported: true,
      inputPricePerM: 2.5,
      outputPricePerM: 12.5,
    },
  },
  {
    id: 'claude-sonnet-4.6',
    provider: 'Anthropic',
    displayName: 'Claude Sonnet 4.6',
    contextWindow: 1000000,
    maxOutput: 64000,
    inputPricePerM: 3,
    outputPricePerM: 15,
    caching: {
      isSupported: true,
      readPricePerM: 0.3,
      writePricePerM_5m: 3.75,
      writePricePerM_1h: 6,
    },
    batchPricing: {
      isSupported: true,
      inputPricePerM: 1.5,
      outputPricePerM: 7.5,
    },
  },
  {
    id: 'claude-haiku-4.5',
    provider: 'Anthropic',
    displayName: 'Claude Haiku 4.5',
    contextWindow: 200000,
    maxOutput: 64000,
    inputPricePerM: 1,
    outputPricePerM: 5,
    caching: {
      isSupported: true,
      readPricePerM: 0.1,
      writePricePerM_5m: 1.25,
      writePricePerM_1h: 2,
    },
    batchPricing: {
      isSupported: true,
      inputPricePerM: 0.5,
      outputPricePerM: 2.5,
    },
  },
  {
    id: 'gemini-3.5-flash',
    provider: 'Google',
    displayName: 'Gemini 3.5 Flash',
    contextWindow: 1048576,
    maxOutput: 65536,
    inputPricePerM: 1.5,
    outputPricePerM: 9,
    caching: {
      isSupported: true,
      readPricePerM: 0.15,
      storagePricePerMPerHour: 1,
    },
    batchPricing: {
      isSupported: true,
      inputPricePerM: 0.75,
      outputPricePerM: 4.5,
    },
  },
  {
    id: 'gemini-3.1-pro',
    provider: 'Google',
    displayName: 'Gemini 3.1 Pro',
    contextWindow: 2000000,
    maxOutput: 65536,
    inputPricePerM: 2,
    outputPricePerM: 12,
    inputPricePerM_over200k: 4,
    outputPricePerM_over200k: 18,
    caching: {
      isSupported: true,
      readPricePerM: 0.2,
      readPricePerM_over200k: 0.4,
      storagePricePerMPerHour: 4.5,
    },
    batchPricing: {
      isSupported: true,
      inputPricePerM: 1,
      outputPricePerM: 6,
    },
  },
  {
    id: 'gemini-3.1-flash-lite',
    provider: 'Google',
    displayName: 'Gemini 3.1 Flash-Lite',
    contextWindow: 1048576,
    maxOutput: 65536,
    inputPricePerM: 0.25,
    outputPricePerM: 1.5,
    caching: {
      isSupported: true,
      readPricePerM: 0.025,
      storagePricePerMPerHour: 1,
    },
    batchPricing: {
      isSupported: true,
      inputPricePerM: 0.125,
      outputPricePerM: 0.75,
    },
  },
  {
    id: 'deepseek-v4-pro',
    provider: 'DeepSeek',
    displayName: 'DeepSeek V4 Pro',
    contextWindow: 1000000,
    maxOutput: 384000,
    inputPricePerM: 0.435,
    outputPricePerM: 0.87,
    caching: {
      isSupported: true,
      readPricePerM: 0.003625,
    },
    batchPricing: {
      isSupported: false,
    },
  },
  {
    id: 'deepseek-v4-flash',
    provider: 'DeepSeek',
    displayName: 'DeepSeek V4 Flash',
    contextWindow: 1000000,
    maxOutput: 384000,
    inputPricePerM: 0.14,
    outputPricePerM: 0.28,
    caching: {
      isSupported: true,
      readPricePerM: 0.0028,
    },
    batchPricing: {
      isSupported: false,
    },
  },
  {
    id: 'grok-4.3',
    provider: 'xAI',
    displayName: 'Grok 4.3',
    contextWindow: 1000000,
    maxOutput: 8192,
    inputPricePerM: 1.25,
    outputPricePerM: 2.5,
    caching: {
      isSupported: false,
    },
    batchPricing: {
      isSupported: false,
    },
  },
  {
    id: 'grok-build-0.1',
    provider: 'xAI',
    displayName: 'Grok Build 0.1',
    contextWindow: 262144,
    maxOutput: 8192,
    inputPricePerM: 1,
    outputPricePerM: 2,
    caching: {
      isSupported: false,
    },
    batchPricing: {
      isSupported: false,
    },
  },
  {
    id: 'mistral-large-3',
    provider: 'Mistral',
    displayName: 'mistral-large-latest',
    contextWindow: 256000,
    maxOutput: 32768,
    inputPricePerM: 0.5,
    outputPricePerM: 1.5,
    caching: {
      isSupported: false,
    },
    batchPricing: {
      isSupported: false,
    },
  },
  {
    id: 'mistral-medium-3.5',
    provider: 'Mistral',
    displayName: 'mistral-medium-latest',
    contextWindow: 256000,
    maxOutput: 32768,
    inputPricePerM: 1.5,
    outputPricePerM: 7.5,
    caching: {
      isSupported: false,
    },
    batchPricing: {
      isSupported: false,
    },
  },
  {
    id: 'mistral-small-4',
    provider: 'Mistral',
    displayName: 'mistral-small-latest',
    contextWindow: 256000,
    maxOutput: 32768,
    inputPricePerM: 0.15,
    outputPricePerM: 0.6,
    caching: {
      isSupported: false,
    },
    batchPricing: {
      isSupported: false,
    },
  },
];

export const PROVIDERS = [
  { id: 'openai', provider: 'OpenAI', name: 'OpenAI (GPT)' },
  { id: 'anthropic', provider: 'Anthropic', name: 'Anthropic (Claude)' },
  { id: 'google', provider: 'Google', name: 'Google (Gemini)' },
  { id: 'deepseek', provider: 'DeepSeek', name: 'DeepSeek' },
  { id: 'mistral', provider: 'Mistral', name: 'Mistral' },
  { id: 'xai', provider: 'xAI', name: 'xAI (Grok)' },
] as const;

export const providers = PROVIDERS;

const providerAliases: Record<string, ModelProvider> = {
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  google: 'Google',
  gemini: 'Google',
  deepseek: 'DeepSeek',
  mistral: 'Mistral',
  mistralai: 'Mistral',
  xai: 'xAI',
  'x-ai': 'xAI',
  grok: 'xAI',
};

const modelAliases: Record<string, string> = {
  'gemini-3.1-pro-preview': 'gemini-3.1-pro',
  'deepseek-chat': 'deepseek-v4-flash',
  'mistral-large-latest': 'mistral-large-3',
  'mistral-medium-2505': 'mistral-medium-3.5',
  'mistral-small-latest': 'mistral-small-4',
};

export function getProviderId(provider: string): string {
  const direct = PROVIDERS.find((item) => item.provider === provider || item.id === provider.toLowerCase());
  if (direct) return direct.id;
  const normalized = providerAliases[provider.toLowerCase()];
  return PROVIDERS.find((item) => item.provider === normalized)?.id || provider.toLowerCase();
}

export function normalizeProvider(provider: string): ModelProvider | undefined {
  const direct = PROVIDERS.find((item) => item.provider === provider || item.id === provider.toLowerCase());
  return direct?.provider ?? providerAliases[provider.toLowerCase()];
}

export function getModelsByProvider(provider: string): ModelPricingRecord[] {
  const normalizedProvider = normalizeProvider(provider);
  return MODELS_DATA.filter((model) => model.provider === normalizedProvider);
}

export function getModelById(id: string): ModelPricingRecord | undefined {
  const stripped = id.includes('/') ? id.split('/').pop()! : id;
  const normalizedId = modelAliases[id] ?? modelAliases[stripped] ?? id;
  const normalizedStripped = modelAliases[stripped] ?? stripped;

  return MODELS_DATA.find(
    (model) => model.id === id || model.id === stripped || model.id === normalizedId || model.id === normalizedStripped
  );
}

export const modelPricing = MODELS_DATA;
