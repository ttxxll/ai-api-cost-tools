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
  litellmId: string;
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
    litellmId: "claude-opus-4-7"
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
    maxOutput: 64000,
    litellmId: "claude-sonnet-4-6"
  },
  {
    id: "claude-sonnet-4.5",
    provider: "Anthropic",
    displayName: "Claude Sonnet 4.5",
    contextWindow: 200000,
    inputPricePerM: 3,
    outputPricePerM: 15,
    caching: {
      isSupported: true,
      writePricePerM: 3.75,
      readPricePerM: 0.3
    },
    maxOutput: 64000,
    litellmId: "claude-sonnet-4-5"
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
    litellmId: "claude-haiku-4-5"
  },
  {
    id: "gpt-5.5-pro",
    provider: "OpenAI",
    displayName: "GPT-5.5 Pro",
    contextWindow: 1050000,
    inputPricePerM: 30,
    outputPricePerM: 180,
    caching: {
      isSupported: true,
      writePricePerM: 30,
      readPricePerM: 3
    },
    maxOutput: 128000,
    litellmId: "gpt-5.5-pro"
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
    litellmId: "gpt-5.5"
  },
  {
    id: "gpt-5.4-pro",
    provider: "OpenAI",
    displayName: "GPT-5.4 Pro",
    contextWindow: 1050000,
    inputPricePerM: 30,
    outputPricePerM: 180,
    caching: {
      isSupported: true,
      writePricePerM: 30,
      readPricePerM: 3
    },
    maxOutput: 128000,
    litellmId: "gpt-5.4-pro"
  },
  {
    id: "gpt-5.4",
    provider: "OpenAI",
    displayName: "GPT-5.4",
    contextWindow: 1050000,
    inputPricePerM: 2.5,
    outputPricePerM: 15,
    caching: {
      isSupported: true,
      writePricePerM: 2.5,
      readPricePerM: 0.25
    },
    maxOutput: 128000,
    litellmId: "gpt-5.4"
  },
  {
    id: "gpt-5.4-mini",
    provider: "OpenAI",
    displayName: "GPT-5.4 Mini",
    contextWindow: 272000,
    inputPricePerM: 0.75,
    outputPricePerM: 4.5,
    caching: {
      isSupported: true,
      writePricePerM: 0.75,
      readPricePerM: 0.075
    },
    maxOutput: 128000,
    litellmId: "gpt-5.4-mini"
  },
  {
    id: "gpt-5",
    provider: "OpenAI",
    displayName: "GPT-5",
    contextWindow: 272000,
    inputPricePerM: 1.25,
    outputPricePerM: 10,
    caching: {
      isSupported: true,
      writePricePerM: 1.25,
      readPricePerM: 0.125
    },
    maxOutput: 128000,
    litellmId: "gpt-5"
  },
  {
    id: "gpt-4o",
    provider: "OpenAI",
    displayName: "GPT-4o",
    contextWindow: 128000,
    inputPricePerM: 2.5,
    outputPricePerM: 10,
    caching: {
      isSupported: true,
      writePricePerM: 2.5,
      readPricePerM: 1.25
    },
    maxOutput: 16384,
    litellmId: "gpt-4o"
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
    litellmId: "gpt-4o-mini"
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
    litellmId: "o3"
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
    litellmId: "o3-mini"
  },
  {
    id: "gemini-3.1-pro-preview",
    provider: "Google",
    displayName: "Gemini 3.1 Pro Preview",
    contextWindow: 1048576,
    inputPricePerM: 2,
    outputPricePerM: 12,
    caching: {
      isSupported: true,
      writePricePerM: 2,
      readPricePerM: 0.2
    },
    maxOutput: 65536,
    litellmId: "gemini-3.1-pro-preview"
  },
  {
    id: "gemini-3.1-flash-lite-preview",
    provider: "Google",
    displayName: "Gemini 3.1 Flash Lite Preview",
    contextWindow: 1048576,
    inputPricePerM: 0.25,
    outputPricePerM: 1.5,
    caching: {
      isSupported: true,
      writePricePerM: 0.25,
      readPricePerM: 0.025
    },
    maxOutput: 65536,
    litellmId: "gemini-3.1-flash-lite-preview"
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
      writePricePerM: 1.25,
      readPricePerM: 0.125
    },
    maxOutput: 65535,
    litellmId: "gemini-2.5-pro"
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
      writePricePerM: 0.3,
      readPricePerM: 0.03
    },
    maxOutput: 65535,
    litellmId: "gemini-2.5-flash"
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
      writePricePerM: 0.1,
      readPricePerM: 0.01
    },
    maxOutput: 65535,
    litellmId: "gemini-2.5-flash-lite"
  },
  {
    id: "deepseek-chat",
    provider: "DeepSeek",
    displayName: "DeepSeek Chat",
    contextWindow: 131072,
    inputPricePerM: 0.28,
    outputPricePerM: 0.42,
    caching: {
      isSupported: true,
      writePricePerM: 0.28,
      readPricePerM: 0.028
    },
    maxOutput: 8192,
    litellmId: "deepseek-chat"
  },
  {
    id: "deepseek-reasoner",
    provider: "DeepSeek",
    displayName: "DeepSeek Reasoner",
    contextWindow: 131072,
    inputPricePerM: 0.28,
    outputPricePerM: 0.42,
    caching: {
      isSupported: true,
      writePricePerM: 0.28,
      readPricePerM: 0.028
    },
    maxOutput: 65536,
    litellmId: "deepseek-reasoner"
  },
  {
    id: "mistral-large-latest",
    provider: "Mistral",
    displayName: "Mistral Large Latest",
    contextWindow: 262144,
    inputPricePerM: 0.5,
    outputPricePerM: 1.5,
    caching: {
      isSupported: false
    },
    maxOutput: 262144,
    litellmId: "mistral/mistral-large-latest"
  },
  {
    id: "mistral-medium-2505",
    provider: "Mistral",
    displayName: "Mistral Medium 3",
    contextWindow: 131072,
    inputPricePerM: 0.4,
    outputPricePerM: 2,
    caching: {
      isSupported: false
    },
    maxOutput: 8191,
    litellmId: "mistral/mistral-medium-2505"
  },
  {
    id: "mistral-small-latest",
    provider: "Mistral",
    displayName: "Mistral Small Latest",
    contextWindow: 131072,
    inputPricePerM: 0.06,
    outputPricePerM: 0.18,
    caching: {
      isSupported: false
    },
    maxOutput: 131072,
    litellmId: "mistral/mistral-small-latest"
  },
  {
    id: "grok-3",
    provider: "xAI",
    displayName: "Grok 3",
    contextWindow: 131072,
    inputPricePerM: 3,
    outputPricePerM: 15,
    caching: {
      isSupported: false
    },
    maxOutput: 131072,
    litellmId: "azure_ai/grok-3"
  },
  {
    id: "grok-3-mini",
    provider: "xAI",
    displayName: "Grok 3 Mini",
    contextWindow: 131072,
    inputPricePerM: 0.25,
    outputPricePerM: 1.27,
    caching: {
      isSupported: false
    },
    maxOutput: 131072,
    litellmId: "azure_ai/grok-3-mini"
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
    (model) => model.id === id || model.id === stripped || model.litellmId === id || model.litellmId === stripped
  );
}

export const modelPricing = MODELS_DATA;
