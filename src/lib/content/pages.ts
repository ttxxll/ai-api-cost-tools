import type { Locale } from '../i18n/locales';

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
}

const pageMetadata: Record<string, Record<Locale, PageMetadata>> = {
  home: {
    en: {
      title: 'AI API Cost Calculators - Free Token Budget Tools',
      description: 'Estimate and compare AI API costs across Claude, GPT, Gemini, and DeepSeek. Free online calculators for developers and teams.',
      keywords: ['ai api cost calculator', 'token budget planner', 'ai model pricing', 'claude api cost', 'gpt api pricing'],
      canonicalPath: '/',
    },
    zh: {
      title: 'AI API 成本计算器 - 免费 Token 预算工具',
      description: '估算和比较 Claude、GPT、Gemini、DeepSeek 的 API 调用成本。面向开发者的免费在线计算器。',
      keywords: ['AI API 成本计算器', 'Token 预算规划', 'AI 模型价格对比', 'Claude API 成本', 'GPT API 价格'],
      canonicalPath: '/zh',
    },
  },
  'claude-api-cost-calculator': {
    en: {
      title: 'Claude API Cost Calculator - Estimate Anthropic Claude Pricing',
      description: 'Calculate Claude API costs for Opus 4.7, Sonnet 4.6, and Haiku 4.5. Free online calculator with transparent pricing.',
      keywords: ['claude api cost calculator', 'anthropic pricing', 'claude opus cost', 'claude sonnet pricing'],
      canonicalPath: '/claude-api-cost-calculator',
    },
    zh: {
      title: 'Claude API 成本计算器 - 估算 Anthropic Claude 定价',
      description: '计算 Claude API 的调用成本，支持 Opus 4.7、Sonnet 4.6、Haiku 4.5。免费在线计算器。',
      keywords: ['Claude API 成本计算器', 'Anthropic 定价', 'Claude Opus 成本', 'Claude Sonnet 价格'],
      canonicalPath: '/zh/claude-api-cost-calculator',
    },
  },
  'gpt-api-cost-calculator': {
    en: {
      title: 'GPT API Cost Calculator - Estimate OpenAI GPT Pricing',
      description: 'Calculate OpenAI GPT API costs for GPT-5.5, GPT-5.4, and GPT-5.4 Mini models. Free online calculator.',
      keywords: ['gpt api cost calculator', 'openai pricing', 'gpt-5.4 cost', 'openai api pricing'],
      canonicalPath: '/gpt-api-cost-calculator',
    },
    zh: {
      title: 'GPT API 成本计算器 - 估算 OpenAI GPT 定价',
      description: '计算 OpenAI GPT API 的调用成本，支持 GPT-5.5、GPT-5.4 和 GPT-5.4 Mini 模型。免费在线计算器。',
      keywords: ['GPT API 成本计算器', 'OpenAI 定价', 'GPT-5.4 成本', 'OpenAI API 价格'],
      canonicalPath: '/zh/gpt-api-cost-calculator',
    },
  },
  'gemini-api-cost-calculator': {
    en: {
      title: 'Gemini API Cost Calculator - Estimate Google Gemini Pricing',
      description: 'Calculate Google Gemini API costs for Pro, Flash, and Flash-Lite models. Free online calculator.',
      keywords: ['gemini api cost calculator', 'google gemini pricing', 'gemini pro cost', 'gemini flash pricing'],
      canonicalPath: '/gemini-api-cost-calculator',
    },
    zh: {
      title: 'Gemini API 成本计算器 - 估算 Google Gemini 定价',
      description: '计算 Google Gemini API 的调用成本，支持 Pro、Flash、Flash-Lite 模型。免费在线计算器。',
      keywords: ['Gemini API 成本计算器', 'Google Gemini 定价', 'Gemini Pro 成本', 'Gemini Flash 价格'],
      canonicalPath: '/zh/gemini-api-cost-calculator',
    },
  },
  'deepseek-api-cost-calculator': {
    en: {
      title: 'DeepSeek API Cost Calculator - Estimate DeepSeek Pricing',
      description: 'Calculate DeepSeek API costs for V4-Flash and V4-Pro models. Free online calculator.',
      keywords: ['deepseek api cost calculator', 'deepseek pricing', 'deepseek v4 cost', 'deepseek api pricing'],
      canonicalPath: '/deepseek-api-cost-calculator',
    },
    zh: {
      title: 'DeepSeek API 成本计算器 - 估算 DeepSeek 定价',
      description: '计算 DeepSeek API 的调用成本，支持 V4-Flash、V4-Pro 模型。免费在线计算器。',
      keywords: ['DeepSeek API 成本计算器', 'DeepSeek 定价', 'DeepSeek V4 成本', 'DeepSeek API 价格'],
      canonicalPath: '/zh/deepseek-api-cost-calculator',
    },
  },
  'ai-model-price-comparison': {
    en: {
      title: 'AI Model Price Comparison - Compare Claude, GPT, Gemini, DeepSeek',
      description: 'Compare AI API pricing across Claude, GPT, Gemini, and DeepSeek models side by side. Free comparison tool.',
      keywords: ['ai model price comparison', 'ai api pricing comparison', 'compare ai models', 'cheapest ai api'],
      canonicalPath: '/ai-model-price-comparison',
    },
    zh: {
      title: 'AI 模型价格对比 - 比较 Claude、GPT、Gemini、DeepSeek',
      description: '横向比较 Claude、GPT、Gemini、DeepSeek 各模型的 API 定价。免费对比工具。',
      keywords: ['AI 模型价格对比', 'AI API 价格比较', '比较 AI 模型', '最便宜的 AI API'],
      canonicalPath: '/zh/ai-model-price-comparison',
    },
  },
  'prompt-token-budget-planner': {
    en: {
      title: 'Prompt Token Budget Planner - Plan Your AI API Spending',
      description: 'Plan your AI API budget and calculate how many calls you can make within your budget. Free budget planning tool.',
      keywords: ['token budget planner', 'ai api budget', 'ai spending calculator', 'token budget calculator'],
      canonicalPath: '/prompt-token-budget-planner',
    },
    zh: {
      title: 'Token 预算规划器 - 规划 AI API 支出',
      description: '规划 AI API 预算，计算在预算内可支持的调用次数。免费预算规划工具。',
      keywords: ['Token 预算规划', 'AI API 预算', 'AI 支出计算器', 'Token 预算计算器'],
      canonicalPath: '/zh/prompt-token-budget-planner',
    },
  },
  'ai-app-monthly-cost-calculator': {
    en: {
      title: 'AI App Monthly Cost Calculator - Estimate Your AI App Costs',
      description: 'Estimate monthly costs for your AI-powered application based on users and usage patterns. Free calculator.',
      keywords: ['ai app monthly cost', 'ai application cost calculator', 'ai saas cost', 'ai chatbot cost'],
      canonicalPath: '/ai-app-monthly-cost-calculator',
    },
    zh: {
      title: 'AI 应用月成本计算器 - 估算 AI 应用成本',
      description: '根据用户数和使用模式估算 AI 应用的月度成本。免费计算器。',
      keywords: ['AI 应用月成本', 'AI 应用成本计算器', 'AI SaaS 成本', 'AI 聊天机器人成本'],
      canonicalPath: '/zh/ai-app-monthly-cost-calculator',
    },
  },
  'batch-api-cost-estimator': {
    en: {
      title: 'Batch API Cost Estimator - Calculate Batch Processing Costs',
      description: 'Estimate costs for batch API processing tasks across different AI models. Free batch cost calculator.',
      keywords: ['batch api cost', 'batch processing ai cost', 'ai batch pricing', 'bulk api cost'],
      canonicalPath: '/batch-api-cost-estimator',
    },
    zh: {
      title: '批量 API 成本估算器 - 计算批量处理成本',
      description: '估算不同 AI 模型的批量 API 处理任务成本。免费批量成本计算器。',
      keywords: ['批量 API 成本', '批量处理 AI 成本', 'AI 批量定价', '批量 API 价格'],
      canonicalPath: '/zh/batch-api-cost-estimator',
    },
  },
};

export function getPageMetadata(slug: string, locale: Locale): PageMetadata | undefined {
  return pageMetadata[slug]?.[locale];
}

export function getAlternateLinks(slug: string): { locale: string; href: string }[] {
  const metadata = pageMetadata[slug];
  if (!metadata) return [];

  return [
    { locale: 'en', href: `https://aiapicost.tools${metadata.en.canonicalPath}` },
    { locale: 'zh', href: `https://aiapicost.tools${metadata.zh.canonicalPath}` },
    { locale: 'x-default', href: `https://aiapicost.tools${metadata.en.canonicalPath}` },
  ];
}
