import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

interface OpenRouterModel {
  id: string;
  name: string;
  pricing: {
    prompt: string;
    completion: string;
  };
  context_length: number;
  top_provider?: {
    max_completion_tokens?: number;
  };
}

interface ProcessedModel {
  id: string;
  name: string;
  provider: string;
  inputPricePerMillion: number;
  outputPricePerMillion: number;
  contextWindow: number;
  maxOutput: number;
}

export async function GET() {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const models: OpenRouterModel[] = data.data || [];

    // Filter and process popular models
    const popularProviders = [
      'anthropic',
      'openai',
      'google',
      'mistral',
      'meta-llama',
      'deepseek',
      'x-ai',
      'cohere',
    ];

    const processedModels: ProcessedModel[] = models
      .filter((model) => {
        // Filter by popular providers
        const provider = model.id.split('/')[0];
        return popularProviders.includes(provider);
      })
      .filter((model) => {
        // Filter out free models and dynamic pricing
        const promptPrice = parseFloat(model.pricing.prompt);
        return promptPrice > 0 && promptPrice !== -1;
      })
      .map((model) => {
        const provider = model.id.split('/')[0];
        const promptPrice = parseFloat(model.pricing.prompt) || 0;
        const completionPrice = parseFloat(model.pricing.completion) || 0;

        return {
          id: model.id,
          name: model.name,
          provider: formatProviderName(provider),
          inputPricePerMillion: promptPrice * 1000000,
          outputPricePerMillion: completionPrice * 1000000,
          contextWindow: model.context_length || 0,
          maxOutput: model.top_provider?.max_completion_tokens || 0,
        };
      })
      .sort((a, b) => {
        // Sort by provider, then by price
        if (a.provider !== b.provider) {
          return a.provider.localeCompare(b.provider);
        }
        return a.inputPricePerMillion - b.inputPricePerMillion;
      });

    return NextResponse.json({
      success: true,
      count: processedModels.length,
      models: processedModels,
      cached_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to fetch pricing:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch pricing data',
      models: getFallbackModels(),
    });
  }
}

function formatProviderName(provider: string): string {
  const names: Record<string, string> = {
    anthropic: 'Anthropic',
    openai: 'OpenAI',
    google: 'Google',
    mistral: 'Mistral',
    'meta-llama': 'Meta',
    deepseek: 'DeepSeek',
    'x-ai': 'xAI',
    cohere: 'Cohere',
  };
  return names[provider] || provider;
}

function getFallbackModels(): ProcessedModel[] {
  // Fallback data if API fails
  return [
    {
      id: 'anthropic/claude-opus-4.7',
      name: 'Claude Opus 4.7',
      provider: 'Anthropic',
      inputPricePerMillion: 5,
      outputPricePerMillion: 25,
      contextWindow: 1000000,
      maxOutput: 128000,
    },
    {
      id: 'anthropic/claude-sonnet-4.6',
      name: 'Claude Sonnet 4.6',
      provider: 'Anthropic',
      inputPricePerMillion: 3,
      outputPricePerMillion: 15,
      contextWindow: 1000000,
      maxOutput: 64000,
    },
    {
      id: 'openai/gpt-4o',
      name: 'GPT-4o',
      provider: 'OpenAI',
      inputPricePerMillion: 2.5,
      outputPricePerMillion: 10,
      contextWindow: 128000,
      maxOutput: 16384,
    },
  ];
}
