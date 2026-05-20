export type ModelProvider = 'OpenAI' | 'Anthropic' | 'Google' | 'DeepSeek' | 'Mistral' | 'xAI';

export interface ModelPricing {
  id: string;
  provider: ModelProvider;
  displayName: string;
  contextWindow: number;
  inputPricePerM: number;
  outputPricePerM: number;
  caching: {
    isSupported: boolean;
    writePricePerM?: number;
    readPricePerM?: number;
  };
}

export interface ModelPricingRecord extends ModelPricing {
  maxOutput: number;
  openRouterId: string;
}

export const MODELS_DATA: ModelPricingRecord[] = [
  {
    id: "claude-opus-4.7",
    provider: "Anthropic",
    displayName: "Claude Opus 4.7",
    contextWindow: 1000000,
    inputPricePerM: 5,
    outputPricePerM: 25,
    caching: {
      isSupported: true,
      writePricePerM: 6.25,
      readPricePerM: 0.5
    },
    maxOutput: 128000,
    openRouterId: "anthropic/claude-opus-4.7"
  },
  {
    id: "claude-sonnet-4.6",
    provider: "Anthropic",
    displayName: "Claude Sonnet 4.6",
    contextWindow: 1000000,
    inputPricePerM: 3,
    outputPricePerM: 15,
    caching: {
      isSupported: true,
      writePricePerM: 3.75,
      readPricePerM: 0.3
    },
    maxOutput: 128000,
    openRouterId: "anthropic/claude-sonnet-4.6"
  },
  {
    id: "claude-sonnet-4.5",
    provider: "Anthropic",
    displayName: "Claude Sonnet 4.5",
    contextWindow: 1000000,
    inputPricePerM: 3,
    outputPricePerM: 15,
    caching: {
      isSupported: true,
      writePricePerM: 3.75,
      readPricePerM: 0.3
    },
    maxOutput: 64000,
    openRouterId: "anthropic/claude-sonnet-4.5"
  },
  {
    id: "claude-haiku-4.5",
    provider: "Anthropic",
    displayName: "Claude Haiku 4.5",
    contextWindow: 200000,
    inputPricePerM: 1,
    outputPricePerM: 5,
    caching: {
      isSupported: true,
      writePricePerM: 1.25,
      readPricePerM: 0.1
    },
    maxOutput: 64000,
    openRouterId: "anthropic/claude-haiku-4.5"
  },
  {
    id: "gpt-5.5-pro",
    provider: "OpenAI",
    displayName: "GPT-5.5 Pro",
    contextWindow: 1050000,
    inputPricePerM: 30,
    outputPricePerM: 180,
    caching: {
      isSupported: false
    },
    maxOutput: 128000,
    openRouterId: "openai/gpt-5.5-pro"
  },
  {
    id: "gpt-5.5",
    provider: "OpenAI",
    displayName: "GPT-5.5",
    contextWindow: 1050000,
    inputPricePerM: 5,
    outputPricePerM: 30,
    caching: {
      isSupported: true,
      writePricePerM: 5,
      readPricePerM: 0.5
    },
    maxOutput: 128000,
    openRouterId: "openai/gpt-5.5"
  },
  {
    id: "gpt-5",
    provider: "OpenAI",
    displayName: "GPT-5",
    contextWindow: 400000,
    inputPricePerM: 1.25,
    outputPricePerM: 10,
    caching: {
      isSupported: true,
      writePricePerM: 1.25,
      readPricePerM: 0.125
    },
    maxOutput: 128000,
    openRouterId: "openai/gpt-5"
  },
  {
    id: "gpt-4o",
    provider: "OpenAI",
    displayName: "GPT-4o",
    contextWindow: 128000,
    inputPricePerM: 2.5,
    outputPricePerM: 10,
    caching: {
      isSupported: false
    },
    maxOutput: 16384,
    openRouterId: "openai/gpt-4o"
  },
  {
    id: "gpt-4o-mini",
    provider: "OpenAI",
    displayName: "GPT-4o mini",
    contextWindow: 128000,
    inputPricePerM: 0.15,
    outputPricePerM: 0.6,
    caching: {
      isSupported: true,
      writePricePerM: 0.15,
      readPricePerM: 0.075
    },
    maxOutput: 16384,
    openRouterId: "openai/gpt-4o-mini"
  },
  {
    id: "o3",
    provider: "OpenAI",
    displayName: "o3",
    contextWindow: 200000,
    inputPricePerM: 2,
    outputPricePerM: 8,
    caching: {
      isSupported: true,
      writePricePerM: 2,
      readPricePerM: 0.5
    },
    maxOutput: 100000,
    openRouterId: "openai/o3"
  },
  {
    id: "o3-mini",
    provider: "OpenAI",
    displayName: "o3-mini",
    contextWindow: 200000,
    inputPricePerM: 1.1,
    outputPricePerM: 4.4,
    caching: {
      isSupported: true,
      writePricePerM: 1.1,
      readPricePerM: 0.55
    },
    maxOutput: 100000,
    openRouterId: "openai/o3-mini"
  },
  {
    id: "gemini-2.5-pro",
    provider: "Google",
    displayName: "Gemini 2.5 Pro",
    contextWindow: 1048576,
    inputPricePerM: 1.25,
    outputPricePerM: 10,
    caching: {
      isSupported: true,
      writePricePerM: 0.375,
      readPricePerM: 0.125
    },
    maxOutput: 65536,
    openRouterId: "google/gemini-2.5-pro"
  },
  {
    id: "gemini-2.5-flash",
    provider: "Google",
    displayName: "Gemini 2.5 Flash",
    contextWindow: 1048576,
    inputPricePerM: 0.3,
    outputPricePerM: 2.5,
    caching: {
      isSupported: true,
      writePricePerM: 0.083333333,
      readPricePerM: 0.03
    },
    maxOutput: 65535,
    openRouterId: "google/gemini-2.5-flash"
  },
  {
    id: "gemini-2.5-flash-lite",
    provider: "Google",
    displayName: "Gemini 2.5 Flash Lite",
    contextWindow: 1048576,
    inputPricePerM: 0.1,
    outputPricePerM: 0.4,
    caching: {
      isSupported: true,
      writePricePerM: 0.083333333,
      readPricePerM: 0.01
    },
    maxOutput: 65535,
    openRouterId: "google/gemini-2.5-flash-lite"
  },
  {
    id: "deepseek-v4-pro",
    provider: "DeepSeek",
    displayName: "DeepSeek V4 Pro",
    contextWindow: 1048576,
    inputPricePerM: 0.435,
    outputPricePerM: 0.87,
    caching: {
      isSupported: true,
      writePricePerM: 0.435,
      readPricePerM: 0.003625
    },
    maxOutput: 384000,
    openRouterId: "deepseek/deepseek-v4-pro"
  },
  {
    id: "deepseek-v4-flash",
    provider: "DeepSeek",
    displayName: "DeepSeek V4 Flash",
    contextWindow: 1048576,
    inputPricePerM: 0.112,
    outputPricePerM: 0.224,
    caching: {
      isSupported: true,
      writePricePerM: 0.112,
      readPricePerM: 0.022
    },
    maxOutput: 0,
    openRouterId: "deepseek/deepseek-v4-flash"
  },
  {
    id: "deepseek-chat",
    provider: "DeepSeek",
    displayName: "DeepSeek Chat",
    contextWindow: 163840,
    inputPricePerM: 0.32,
    outputPricePerM: 0.89,
    caching: {
      isSupported: false
    },
    maxOutput: 16384,
    openRouterId: "deepseek/deepseek-chat"
  },
  {
    id: "mistral-large-latest",
    provider: "Mistral",
    displayName: "Mistral Large Latest",
    contextWindow: 262144,
    inputPricePerM: 0.5,
    outputPricePerM: 1.5,
    caching: {
      isSupported: true,
      writePricePerM: 0.5,
      readPricePerM: 0.05
    },
    maxOutput: 0,
    openRouterId: "mistralai/mistral-large-2512"
  },
  {
    id: "mistral-medium-2505",
    provider: "Mistral",
    displayName: "Mistral Medium 3",
    contextWindow: 131072,
    inputPricePerM: 0.4,
    outputPricePerM: 2,
    caching: {
      isSupported: true,
      writePricePerM: 0.4,
      readPricePerM: 0.04
    },
    maxOutput: 0,
    openRouterId: "mistralai/mistral-medium-3"
  },
  {
    id: "mistral-small-latest",
    provider: "Mistral",
    displayName: "Mistral Small Latest",
    contextWindow: 262144,
    inputPricePerM: 0.15,
    outputPricePerM: 0.6,
    caching: {
      isSupported: true,
      writePricePerM: 0.15,
      readPricePerM: 0.015
    },
    maxOutput: 0,
    openRouterId: "mistralai/mistral-small-2603"
  },
  {
    id: "grok-4.3",
    provider: "xAI",
    displayName: "Grok 4.3",
    contextWindow: 1000000,
    inputPricePerM: 1.25,
    outputPricePerM: 2.5,
    caching: {
      isSupported: true,
      writePricePerM: 1.25,
      readPricePerM: 0.2
    },
    maxOutput: 0,
    openRouterId: "x-ai/grok-4.3"
  },
  {
    id: "grok-4.20",
    provider: "xAI",
    displayName: "Grok 4.20",
    contextWindow: 2000000,
    inputPricePerM: 1.25,
    outputPricePerM: 2.5,
    caching: {
      isSupported: true,
      writePricePerM: 1.25,
      readPricePerM: 0.2
    },
    maxOutput: 0,
    openRouterId: "x-ai/grok-4.20"
  }
];

export const PROVIDERS = [
  {
    id: "openai",
    provider: "OpenAI",
    name: "OpenAI (GPT)"
  },
  {
    id: "anthropic",
    provider: "Anthropic",
    name: "Anthropic (Claude)"
  },
  {
    id: "google",
    provider: "Google",
    name: "Google (Gemini)"
  },
  {
    id: "deepseek",
    provider: "DeepSeek",
    name: "DeepSeek"
  },
  {
    id: "mistral",
    provider: "Mistral",
    name: "Mistral"
  },
  {
    id: "xai",
    provider: "xAI",
    name: "xAI (Grok)"
  }
] as const;

export const providers = PROVIDERS;

const providerAliases: Record<string, ModelProvider> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
  google: "Google",
  gemini: "Google",
  deepseek: "DeepSeek",
  mistral: "Mistral",
  mistralai: "Mistral",
  xai: "xAI",
  "x-ai": "xAI",
  grok: "xAI"
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
  return MODELS_DATA.find(
    (model) => model.id === id || model.id === stripped || model.openRouterId === id || model.openRouterId === stripped
  );
}

export const modelPricing = MODELS_DATA;
