import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const LITELLM_PRICING_URL =
  'https://raw.githubusercontent.com/BerriAI/litellm/main/model_prices_and_context_window.json';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputFile = resolve(projectRoot, 'src/lib/data/modelsPricing.ts');

const trackedModels = [
  { id: 'claude-opus-4.7', litellmId: 'claude-opus-4-7', provider: 'Anthropic', displayName: 'Claude Opus 4.7' },
  { id: 'claude-sonnet-4.6', litellmId: 'claude-sonnet-4-6', provider: 'Anthropic', displayName: 'Claude Sonnet 4.6' },
  { id: 'claude-sonnet-4.5', litellmId: 'claude-sonnet-4-5', provider: 'Anthropic', displayName: 'Claude Sonnet 4.5' },
  { id: 'claude-haiku-4.5', litellmId: 'claude-haiku-4-5', provider: 'Anthropic', displayName: 'Claude Haiku 4.5' },
  { id: 'gpt-5.5-pro', litellmId: 'gpt-5.5-pro', provider: 'OpenAI', displayName: 'GPT-5.5 Pro' },
  { id: 'gpt-5.5', litellmId: 'gpt-5.5', provider: 'OpenAI', displayName: 'GPT-5.5' },
  { id: 'gpt-5.4-pro', litellmId: 'gpt-5.4-pro', provider: 'OpenAI', displayName: 'GPT-5.4 Pro' },
  { id: 'gpt-5.4', litellmId: 'gpt-5.4', provider: 'OpenAI', displayName: 'GPT-5.4' },
  { id: 'gpt-5.4-mini', litellmId: 'gpt-5.4-mini', provider: 'OpenAI', displayName: 'GPT-5.4 Mini' },
  { id: 'gpt-5', litellmId: 'gpt-5', provider: 'OpenAI', displayName: 'GPT-5' },
  { id: 'gpt-4o', litellmId: 'gpt-4o', provider: 'OpenAI', displayName: 'GPT-4o' },
  { id: 'gpt-4o-mini', litellmId: 'gpt-4o-mini', provider: 'OpenAI', displayName: 'GPT-4o mini' },
  { id: 'o3', litellmId: 'o3', provider: 'OpenAI', displayName: 'o3' },
  { id: 'o3-mini', litellmId: 'o3-mini', provider: 'OpenAI', displayName: 'o3-mini' },
  { id: 'gemini-3.1-pro-preview', litellmId: 'gemini-3.1-pro-preview', provider: 'Google', displayName: 'Gemini 3.1 Pro Preview' },
  { id: 'gemini-3.1-flash-lite-preview', litellmId: 'gemini-3.1-flash-lite-preview', provider: 'Google', displayName: 'Gemini 3.1 Flash Lite Preview' },
  { id: 'gemini-2.5-pro', litellmId: 'gemini-2.5-pro', provider: 'Google', displayName: 'Gemini 2.5 Pro' },
  { id: 'gemini-2.5-flash', litellmId: 'gemini-2.5-flash', provider: 'Google', displayName: 'Gemini 2.5 Flash' },
  { id: 'gemini-2.5-flash-lite', litellmId: 'gemini-2.5-flash-lite', provider: 'Google', displayName: 'Gemini 2.5 Flash Lite' },
  { id: 'deepseek-chat', litellmId: 'deepseek-chat', provider: 'DeepSeek', displayName: 'DeepSeek Chat' },
  { id: 'deepseek-reasoner', litellmId: 'deepseek-reasoner', provider: 'DeepSeek', displayName: 'DeepSeek Reasoner' },
  { id: 'mistral-large-latest', litellmId: 'mistral/mistral-large-latest', provider: 'Mistral', displayName: 'Mistral Large Latest' },
  { id: 'mistral-medium-2505', litellmId: 'mistral/mistral-medium-2505', provider: 'Mistral', displayName: 'Mistral Medium 3' },
  { id: 'mistral-small-latest', litellmId: 'mistral/mistral-small-latest', provider: 'Mistral', displayName: 'Mistral Small Latest' },
  { id: 'grok-3', litellmId: 'azure_ai/grok-3', provider: 'xAI', displayName: 'Grok 3' },
  { id: 'grok-3-mini', litellmId: 'azure_ai/grok-3-mini', provider: 'xAI', displayName: 'Grok 3 Mini' },
];

const providerAliases = {
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  google: 'Google',
  gemini: 'Google',
  deepseek: 'DeepSeek',
  mistral: 'Mistral',
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

const perMillion = (value) => roundPrice((Number(value) || 0) * 1_000_000);
const roundPrice = (value) => Number(value.toFixed(9));

function buildCaching(entry, inputPricePerM) {
  const readPricePerM = entry.cache_read_input_token_cost === undefined
    ? undefined
    : perMillion(entry.cache_read_input_token_cost);
  const writePricePerM = entry.cache_creation_input_token_cost === undefined
    ? undefined
    : perMillion(entry.cache_creation_input_token_cost);
  const isSupported = Boolean(entry.supports_prompt_caching || readPricePerM !== undefined || writePricePerM !== undefined);
  if (!isSupported) return { isSupported: false };
  return {
    isSupported: true,
    writePricePerM: writePricePerM ?? inputPricePerM,
    ...(readPricePerM === undefined ? {} : { readPricePerM }),
  };
}

async function fetchPricing() {
  const response = await fetch(LITELLM_PRICING_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch LiteLLM pricing: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

function normalizeModels(litellmData) {
  return trackedModels.map((model) => {
    const entry = litellmData[model.litellmId];
    if (!entry) {
      throw new Error(`LiteLLM model not found: ${model.litellmId}`);
    }

    const inputPricePerM = perMillion(entry.input_cost_per_token);
    const outputPricePerM = perMillion(entry.output_cost_per_token);
    if (inputPricePerM <= 0 || outputPricePerM <= 0) {
      throw new Error(`LiteLLM model has incomplete token pricing: ${model.litellmId}`);
    }

    return {
      id: model.id,
      provider: model.provider,
      displayName: model.displayName,
      contextWindow: Number(entry.max_input_tokens || entry.max_tokens || 0),
      inputPricePerM,
      outputPricePerM,
      caching: buildCaching(entry, inputPricePerM),
      maxOutput: Number(entry.max_output_tokens || 0),
      litellmId: model.litellmId,
    };
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
  litellmId: string;
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
    (model) => model.id === id || model.id === stripped || model.litellmId === id || model.litellmId === stripped
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
console.log(`Synced ${models.length} model pricing records from LiteLLM.`);
