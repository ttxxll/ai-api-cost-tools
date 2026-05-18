import Link from 'next/link';
import { tools } from '@/lib/content/tools';

interface FooterProps {
  locale?: 'en' | 'zh';
}

export default function Footer({ locale = 'en' }: FooterProps) {
  const isZh = locale === 'zh';
  const prefix = isZh ? '/zh' : '';

  return (
    <footer className="border-t border-white/[0.06] bg-[#0B0F19] mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-white mb-4 gradient-text-primary">
              AI API Cost Tools
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {isZh
                ? '面向开发者的免费 AI API 成本计算器工具箱。'
                : 'Free AI API cost calculators and token budget planners for developers.'}
            </p>
            <p className="text-xs text-gray-600">
              {isZh ? '帮助开发者做出明智的 AI 成本决策' : 'Helping developers make informed AI cost decisions'}
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">
              {isZh ? '工具' : 'Tools'}
            </h4>
            <ul className="space-y-2">
              {tools.slice(0, 4).map((tool) => (
                <li key={tool.id}>
                  <Link
                    href={`${prefix}/${tool.slug}`}
                    className="text-sm text-gray-500 hover:text-purple-400 transition-colors"
                  >
                    {isZh ? getToolNameZh(tool.id) : getToolNameEn(tool.id)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Tools */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">
              {isZh ? '更多工具' : 'More Tools'}
            </h4>
            <ul className="space-y-2">
              {tools.slice(4).map((tool) => (
                <li key={tool.id}>
                  <Link
                    href={`${prefix}/${tool.slug}`}
                    className="text-sm text-gray-500 hover:text-purple-400 transition-colors"
                  >
                    {isZh ? getToolNameZh(tool.id) : getToolNameEn(tool.id)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">
              {isZh ? '公司' : 'Company'}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href={`${prefix}/about`} className="text-sm text-gray-500 hover:text-purple-400 transition-colors">
                  {isZh ? '关于我们' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/contact`} className="text-sm text-gray-500 hover:text-purple-400 transition-colors">
                  {isZh ? '联系我们' : 'Contact'}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/privacy-policy`} className="text-sm text-gray-500 hover:text-purple-400 transition-colors">
                  {isZh ? '隐私政策' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link href={`${prefix}/terms-of-service`} className="text-sm text-gray-500 hover:text-purple-400 transition-colors">
                  {isZh ? '服务条款' : 'Terms of Service'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-white/[0.06]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-gray-600">
                {isZh
                  ? '免责声明：计算结果基于公开定价的估算。实际成本可能有所不同。请始终以官方文档为准。'
                  : 'Disclaimer: Calculations are estimates based on published pricing. Actual costs may vary. Always refer to official provider documentation for authoritative pricing.'}
              </p>
              <p className="text-xs text-gray-600 mt-2">
                &copy; {new Date().getFullYear()} AI API Cost Tools.{' '}
                {isZh ? '保留所有权利。' : 'All rights reserved.'}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <Link href={`${prefix}/privacy-policy`} className="hover:text-purple-400 transition-colors">
                {isZh ? '隐私' : 'Privacy'}
              </Link>
              <Link href={`${prefix}/terms-of-service`} className="hover:text-purple-400 transition-colors">
                {isZh ? '条款' : 'Terms'}
              </Link>
              <Link href={`${prefix}/contact`} className="hover:text-purple-400 transition-colors">
                {isZh ? '联系' : 'Contact'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function getToolNameEn(id: string): string {
  const names: Record<string, string> = {
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
