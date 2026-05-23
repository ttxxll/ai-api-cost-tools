import { MODELS_DATA } from '@/lib/data/modelPricing';

export const dynamic = 'force-static';

export function GET() {
  return Response.json({
    success: true,
    count: MODELS_DATA.length,
    models: MODELS_DATA,
    source: 'manual-static',
  });
}
