import type { MetadataRoute } from 'next';

const BASE_URL = 'https://aiapicost.tools';

const pages = [
  '',
  '/claude-api-cost-calculator',
  '/gpt-api-cost-calculator',
  '/gemini-api-cost-calculator',
  '/deepseek-api-cost-calculator',
  '/token-cost-calculator',
  '/ai-model-price-comparison',
  '/prompt-token-budget-planner',
  '/ai-app-monthly-cost-calculator',
  '/batch-api-cost-estimator',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    // English version
    entries.push({
      url: `${BASE_URL}${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 1 : 0.8,
      alternates: {
        languages: {
          en: `${BASE_URL}${page}`,
          zh: `${BASE_URL}/zh${page}`,
        },
      },
    });

    // Chinese version
    entries.push({
      url: `${BASE_URL}/zh${page}`,
      lastModified: new Date(),
      changeFrequency: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? 0.9 : 0.7,
      alternates: {
        languages: {
          en: `${BASE_URL}${page}`,
          zh: `${BASE_URL}/zh${page}`,
        },
      },
    });
  }

  return entries;
}
