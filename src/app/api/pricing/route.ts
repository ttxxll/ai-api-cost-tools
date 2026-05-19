import { MODELS_DATA } from '@/lib/data/modelPricing';

export const dynamic = 'force-static';

export function GET() {
  return Response.json({
    success: true,
    count: MODELS_DATA.length,
    models: MODELS_DATA.map((model) => ({
      id: model.id,
      name: model.displayName,
      provider: model.provider,
      inputPricePerM: model.inputPricePerM,
      outputPricePerM: model.outputPricePerM,
      contextWindow: model.contextWindow,
      maxOutput: model.maxOutput,
      caching: model.caching,
      litellmId: model.litellmId,
    })),
    source: 'litellm-static',
  });
}
