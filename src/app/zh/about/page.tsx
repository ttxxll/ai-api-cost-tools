import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { tools } from '@/lib/content/tools';

export const metadata: Metadata = {
  title: '关于我们',
  description: '了解 AI API 成本工具 — 免费帮助开发者估算和比较各主要供应商的 AI API 成本。',
  alternates: {
    canonical: 'https://aiapicost.tools/zh/about',
    languages: { en: 'https://aiapicost.tools/about', zh: 'https://aiapicost.tools/zh/about' },
  },
};

export default function AboutPageZh() {
  return (
    <>
      <Header locale="zh" />
      <main className="flex-1 bg-[#0B0F19]">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-white mb-2">关于 AI API 成本工具</h1>
          <p className="text-sm text-gray-500 mb-10">帮助开发者做出明智的 AI 成本决策</p>

          <div className="space-y-10 text-gray-400 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-white mb-3">我们做什么</h2>
              <p className="mb-3">
                AI API 成本工具是一个免费的在线资源，面向需要了解和规划 AI API 成本的开发者、产品经理和技术团队。随着 AI 领域的发展，数十家供应商和数百个模型使得跨供应商的价格比较变得越来越复杂。
              </p>
              <p>
                我们通过提供统一的界面来简化这一过程，帮助您估算 OpenAI、Anthropic、Google、DeepSeek、Mistral、xAI、Meta 等主要 AI 供应商的成本。我们的工具支持多种输入单位（Token、单词、字符），帮助您理解不同使用模式的成本影响。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">我们的工具</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {tools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/zh/${tool.slug}`}
                    className="glass-card p-4 hover:border-white/[0.12] transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{tool.icon}</span>
                      <span className="font-medium text-white text-sm">{getToolNameZh(tool.id)}</span>
                    </div>
                    <p className="text-xs text-gray-500">{getToolDescZh(tool.id)}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">工作原理</h2>
              <p className="mb-3">
                我们的定价数据根据官方和公开供应商价格手动维护，并打包到静态站点中，以保持快速的加载速度和便捷的成本比较。
              </p>
              <p>
                所有计算直接在您的浏览器中完成 — 我们不会在服务器上存储您的输入数据或计算结果。这意味着您的成本估算完全私密，且无需任何账户或登录即可使用。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">为什么做这个</h2>
              <p className="mb-3">
                当我们开始使用 AI API 时，发现很难在不同供应商之间比较成本。每个供应商都有不同的定价结构、分词方法和计费模式。电子表格可以用，但随着价格变化很快就会过时。
              </p>
              <p>
                我们构建这个工具来解决自己的问题，并决定将其免费提供给开发者社区。无论您是评估使用哪个模型的独立开发者，还是为团队规划基础设施成本的技术负责人，我们都希望这些工具能为您节省时间并帮助您做出更好的决策。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">数据来源</h2>
              <p className="mb-3">
                模型定价数据根据官方和公开供应商价格手动维护，并打包到静态站点中。正常使用不需要运行时定价 API。
              </p>
              <p>
                我们与任何 AI 供应商没有关联。所有供应商名称和商标属于其各自所有者。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-white mb-3">联系我们</h2>
              <p>
                有问题、建议或反馈？我们很乐意听到您的声音。请通过{' '}
                <a href="mailto:contact@aiapicost.tools" className="text-purple-400 hover:text-purple-300">
                  contact@aiapicost.tools
                </a> 联系我们。
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer locale="zh" />
    </>
  );
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

function getToolDescZh(id: string): string {
  const descs: Record<string, string> = {
    token: '估算不同 AI 模型的输入和输出 Token 成本。',
    claude: '估算 Anthropic Claude API 调用成本，包括 Sonnet、Opus 和 Haiku 模型。',
    gpt: '计算 OpenAI GPT API 成本，支持 GPT-5.5、GPT-5.4 等模型。',
    gemini: '估算 Google Gemini API 定价，包括 Flash 和 Pro 模型。',
    deepseek: '计算 DeepSeek API 成本，支持缓存命中率。',
    comparison: '横向比较所有主要 AI 供应商的定价。',
    budget: '为 AI 驱动的应用规划 Token 预算。',
    monthly: '基于每日使用模式估算月度 AI API 成本。',
    batch: '计算批量 API 处理工作负载的成本。',
  };
  return descs[id] || '';
}
