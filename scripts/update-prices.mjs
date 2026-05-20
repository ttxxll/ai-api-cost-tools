import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const OPENROUTER_MODELS_URL = 'https://openrouter.ai/api/v1/models';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputFile = resolve(projectRoot, 'src/lib/data/modelsPricing.ts');

const trackedModels = [
  { id: 'claude-opus-4.7', openRouterIds: ['anthropic/claude-opus-4.7'], provider: 'Anthropic', displayName: 'Claude Opus 4.7' },
  { id: 'claude-sonnet-4.6', openRouterIds: ['anthropic/claude-sonnet-4.6'], provider: 'Anthropic', displayName: 'Claude Sonnet 4.6' },
  { id: 'claude-sonnet-4.5', openRouterIds: ['anthropic/claude-sonnet-4.5'], provider: 'Anthropic', displayName: 'Claude Sonnet 4.5' },
  { id: 'claude-haiku-4.5', openRouterIds: ['anthropic/claude-haiku-4.5'], provider: 'Anthropic', displayName: 'Claude Haiku 4.5' },
  { id: 'claude-3-5-sonnet', openRouterIds: ['anthropic/claude-3.5-sonnet', 'anthropic/claude-3-5-sonnet'], provider: 'Anthropic', displayName: 'Claude 3.5 Sonnet', optional: true },
  { id: 'gpt-5.5-pro', openRouterIds: ['openai/gpt-5.5-pro'], provider: 'OpenAI', displayName: 'GPT-5.5 Pro' },
  { id: 'gpt-5.5', openRouterIds: ['openai/gpt-5.5'], provider: 'OpenAI', displayName: 'GPT-5.5' },
  { id: 'gpt-5', openRouterIds: ['openai/gpt-5'], provider: 'OpenAI', displayName: 'GPT-5', optional: true },
  { id: 'gpt-4o', openRouterIds: ['openai/gpt-4o', 'openai/gpt-4o-2024-11-20'], provider: 'OpenAI', displayName: 'GPT-4o' },
  { id: 'gpt-4o-mini', openRouterIds: ['openai/gpt-4o-mini'], provider: 'OpenAI', displayName: 'GPT-4o mini' },
  { id: 'o3', openRouterIds: ['openai/o3'], provider: 'OpenAI', displayName: 'o3' },
  { id: 'o3-mini', openRouterIds: ['openai/o3-mini'], provider: 'OpenAI', displayName: 'o3-mini' },
  { id: 'gemini-2.5-pro', openRouterIds: ['google/gemini-2.5-pro'], provider: 'Google', displayName: 'Gemini 2.5 Pro' },
  { id: 'gemini-2.5-flash', openRouterIds: ['google/gemini-2.5-flash'], provider: 'Google', displayName: 'Gemini 2.5 Flash' },
  { id: 'gemini-2.5-flash-lite', openRouterIds: ['google/gemini-2.5-flash-lite'], provider: 'Google', displayName: 'Gemini 2.5 Flash Lite' },
  { id: 'deepseek-v4-pro', openRouterIds: ['deepseek/deepseek-v4-pro'], provider: 'DeepSeek', displayName: 'DeepSeek V4 Pro' },
  { id: 'deepseek-v4-flash', openRouterIds: ['deepseek/deepseek-v4-flash'], provider: 'DeepSeek', displayName: 'DeepSeek V4 Flash' },
  { id: 'deepseek-chat', openRouterIds: ['deepseek/deepseek-chat'], provider: 'DeepSeek', displayName: 'DeepSeek Chat', optional: true },
  { id: 'deepseek-reasoner', openRouterIds: ['deepseek/deepseek-reasoner'], provider: 'DeepSeek', displayName: 'DeepSeek Reasoner', optional: true },
  { id: 'mistral-large-latest', openRouterIds: ['mistralai/mistral-large-2512', 'mistralai/mistral-large'], provider: 'Mistral', displayName: 'Mistral Large Latest' },
  { id: 'mistral-medium-2505', openRouterIds: ['mistralai/mistral-medium-3', 'mistralai/mistral-medium-3.1'], provider: 'Mistral', displayName: 'Mistral Medium 3' },
  { id: 'mistral-small-latest', openRouterIds: ['mistralai/mistral-small-2603', 'mistralai/mistral-small-3.2-24b-instruct'], provider: 'Mistral', displayName: 'Mistral Small Latest' },
  { id: 'grok-4.3', openRouterIds: ['x-ai/grok-4.3'], provider: 'xAI', displayName: 'Grok 4.3' },
  { id: 'grok-4.20', openRouterIds: ['x-ai/grok-4.20'], provider: 'xAI', displayName: 'Grok 4.20' },
  { id: 'grok-3', openRouterIds: ['x-ai/grok-3'], provider: 'xAI', displayName: 'Grok 3', optional: true },
  { id: 'grok-3-mini', openRouterIds: ['x-ai/grok-3-mini'], provider: 'xAI', displayName: 'Grok 3 Mini', optional: true },
];

const cachePricingFallbacks = {
  Anthropic: { readMultiplier: 0.1, writeMultiplier: 1.25 },
  OpenAI: { readMultiplier: 0.5, writeMultiplier: 1 },
  Google: { readMultiplier: 0.1, writeMultiplier: 0.3 },
  DeepSeek: { readMultiplier: 0.1, writeMultiplier: 1 },
  Mistral: { readMultiplier: 0.1, writeMultiplier: 1 },
  xAI: { readMultiplier: 0.16, writeMultiplier: 1 },
};

const providerAliases = {
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

const providers = [
  { id: 'openai', provider: 'OpenAI', name: 'OpenAI (GPT)' },
  { id: 'anthropic', provider: 'Anthropic', name: 'Anthropic (Claude)' },
  { id: 'google', provider: 'Google', name: 'Google (Gemini)' },
  { id: 'deepseek', provider: 'DeepSeek', name: 'DeepSeek' },
  { id: 'mistral', provider: 'Mistral', name: 'Mistral' },
  { id: 'xai', provider: 'xAI', name: 'xAI (Grok)' },
];

const roundPrice = (value) => Number(value.toFixed(9));
const numericPrice = (value) => {
  const price = Number(value);
  return Number.isFinite(price) ? price : 0;
};
const perMillion = (value) => roundPrice(numericPrice(value) * 1_000_000);

function supportsCaching(model, cacheReadPricePerM, cacheWritePricePerM) {
  if (cacheReadPricePerM > 0 || cacheWritePricePerM > 0) return true;
  if (model.pricing && ('input_cache_read' in model.pricing || 'input_cache_write' in model.pricing)) return true;
  const parameters = model.supported_parameters || [];
  return parameters.includes('prompt_cache_key') || parameters.includes('cache_control');
}

function buildCaching(model, provider, inputPricePerM) {
  const explicitReadPricePerM = perMillion(model.pricing?.input_cache_read);
  const explicitWritePricePerM = perMillion(model.pricing?.input_cache_write);
  const isSupported = supportsCaching(model, explicitReadPricePerM, explicitWritePricePerM);

  if (!isSupported) return { isSupported: false };

  const fallback = cachePricingFallbacks[provider];
  const readPricePerM = explicitReadPricePerM > 0
    ? explicitReadPricePerM
    : roundPrice(inputPricePerM * (fallback?.readMultiplier ?? 1));
  const writePricePerM = explicitWritePricePerM > 0
    ? explicitWritePricePerM
    : roundPrice(inputPricePerM * (fallback?.writeMultiplier ?? 1));

  return {
    isSupported: true,
    writePricePerM,
    readPricePerM,
  };
}

async function fetchPricing() {
  const response = await fetch(OPENROUTER_MODELS_URL, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'ai-api-cost-tools-pricing-sync',
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch OpenRouter models: ${response.status} ${response.statusText}`);
  }
  const payload = await response.json();
  if (!Array.isArray(payload.data)) {
    throw new Error('OpenRouter models response did not include a data array.');
  }
  return payload.data;
}

function findOpenRouterModel(modelsById, trackedModel) {
  return trackedModel.openRouterIds
    .map((id) => modelsById.get(id))
    .find(Boolean);
}

function normalizeModels(openRouterModels) {
  const modelsById = new Map(openRouterModels.map((model) => [model.id, model]));

  return trackedModels.flatMap((trackedModel) => {
    const entry = findOpenRouterModel(modelsById, trackedModel);
    if (!entry) {
      if (trackedModel.optional) return [];
      throw new Error(`OpenRouter model not found: ${trackedModel.openRouterIds.join(', ')}`);
    }

    const inputPricePerM = perMillion(entry.pricing?.prompt);
    const outputPricePerM = perMillion(entry.pricing?.completion);
    if (inputPricePerM <= 0 || outputPricePerM <= 0) {
      if (trackedModel.optional) return [];
      throw new Error(`OpenRouter model has incomplete token pricing: ${entry.id}`);
    }

    return [{
      id: trackedModel.id,
      provider: trackedModel.provider,
      displayName: trackedModel.displayName,
      contextWindow: Number(entry.context_length || entry.top_provider?.context_length || 0),
      inputPricePerM,
      outputPricePerM,
      caching: buildCaching(entry, trackedModel.provider, inputPricePerM),
      maxOutput: Number(entry.top_provider?.max_completion_tokens || 0),
      openRouterId: entry.id,
    }];
  });
}

function formatKey(key) {
  return /^[A-Za-z_$][\w$]*$/.test(key) ? key : JSON.stringify(key);
}

function formatValue(value, level = 0) {
  const indent = '  '.repeat(level);
  const nextIndent = '  '.repeat(level + 1);

  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    return `[` + value.map((item) => `\n${nextIndent}${formatValue(item, level + 1)}`).join(',') + `\n${indent}]`;
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value).filter(([, entryValue]) => entryValue !== undefined);
    if (entries.length === 0) return '{}';
    return `{` + entries.map(([key, entryValue]) => `\n${nextIndent}${formatKey(key)}: ${formatValue(entryValue, level + 1)}`).join(',') + `\n${indent}}`;
  }
  return JSON.stringify(value);
}

function renderModelsPricing(models) {
  return `export type ModelProvider = 'OpenAI' | 'Anthropic' | 'Google' | 'DeepSeek' | 'Mistral' | 'xAI';

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

export const MODELS_DATA: ModelPricingRecord[] = ${formatValue(models)};

export const PROVIDERS = ${formatValue(providers)} as const;

export const providers = PROVIDERS;

const providerAliases: Record<string, ModelProvider> = ${formatValue(providerAliases)};

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
`;
}

const data = await fetchPricing();
const models = normalizeModels(data);
const output = renderModelsPricing(models);

await mkdir(dirname(outputFile), { recursive: true });
await writeFile(outputFile, output, 'utf8');
console.log(`Synced ${models.length} model pricing records from OpenRouter.`);
