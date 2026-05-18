import Link from 'next/link';
import { getRelatedTools } from '@/lib/content/tools';

interface RelatedToolsProps {
  currentSlug: string;
  locale?: 'en' | 'zh';
  title?: string;
}

export default function RelatedTools({
  currentSlug,
  locale = 'en',
  title,
}: RelatedToolsProps) {
  const relatedTools = getRelatedTools(currentSlug);
  const isZh = locale === 'zh';

  return (
    <section className="relative py-16 px-4 border-t border-white/[0.04]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-3 text-center">
          {title || (isZh ? '相关工具' : 'Related Tools')}
        </h2>
        <p className="text-sm text-gray-500 text-center mb-10">
          {isZh ? '继续探索其他 AI 成本计算工具' : 'Explore more AI cost calculation tools'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedTools.map((tool) => (
            <Link
              key={tool.id}
              href={`${isZh ? '/zh' : ''}/${tool.slug}`}
              className="glass-card block p-6 text-center hover:border-white/[0.12] transition-all duration-300"
            >
              <div className="text-3xl mb-3">{tool.icon}</div>
              <h3 className="text-sm font-semibold text-white mb-1">
                {isZh ? getToolNameZh(tool.id) : getToolNameEn(tool.id)}
              </h3>
              <p className="text-xs text-gray-500">
                {isZh ? getToolDescZh(tool.id) : getToolDescEn(tool.id)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function getToolNameEn(id: string): string {
  const names: Record<string, string> = {
    token: 'Token Cost Calculator',
    claude: 'Claude API Calculator',
    gpt: 'GPT API Calculator',
    gemini: 'Gemini API Calculator',
    deepseek: 'DeepSeek API Calculator',
    comparison: 'Model Comparison',
    budget: 'Budget Planner',
    monthly: 'Monthly Cost Calculator',
    batch: 'Batch Cost Estimator',
  };
  return names[id] || id;
}

function getToolNameZh(id: string): string {
  const names: Record<string, string> = {
    token: 'Token 成本计算器',
    claude: 'Claude API 计算器',
    gpt: 'GPT API 计算器',
    gemini: 'Gemini API 计算器',
    deepseek: 'DeepSeek API 计算器',
    comparison: '模型价格对比',
    budget: '预算规划器',
    monthly: '月成本计算器',
    batch: '批量成本估算器',
  };
  return names[id] || id;
}

function getToolDescEn(id: string): string {
  const descs: Record<string, string> = {
    token: 'Calculate AI token costs',
    claude: 'Calculate Claude API costs',
    gpt: 'Calculate OpenAI GPT API costs',
    gemini: 'Calculate Google Gemini API costs',
    deepseek: 'Calculate DeepSeek API costs',
    comparison: 'Compare pricing across models',
    budget: 'Plan your AI API budget',
    monthly: 'Estimate monthly app costs',
    batch: 'Estimate batch processing costs',
  };
  return descs[id] || '';
}

function getToolDescZh(id: string): string {
  const descs: Record<string, string> = {
    token: '计算 AI Token 成本',
    claude: '计算 Claude API 调用成本',
    gpt: '计算 OpenAI GPT API 调用成本',
    gemini: '计算 Google Gemini API 调用成本',
    deepseek: '计算 DeepSeek API 调用成本',
    comparison: '横向比较各模型定价',
    budget: '规划 AI API 预算',
    monthly: '估算应用月度成本',
    batch: '估算批量处理成本',
  };
  return descs[id] || '';
}
