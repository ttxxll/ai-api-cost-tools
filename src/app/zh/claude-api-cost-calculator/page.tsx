import ApiCostCalculator from '@/components/calculators/ApiCostCalculator';
import FAQSection from '@/components/seo/FAQSection';
import RelatedTools from '@/components/seo/RelatedTools';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Claude API 成本计算器 - 估算 Anthropic Claude 定价',
  description:
    '计算 Claude API 的调用成本，支持 Opus 4.7、Sonnet 4.6、Haiku 4.5。免费在线计算器。',
  alternates: {
    canonical: 'https://aiapicost.tools/zh/claude-api-cost-calculator',
    languages: { en: 'https://aiapicost.tools/claude-api-cost-calculator', zh: 'https://aiapicost.tools/zh/claude-api-cost-calculator' },
  },
};

export default function ClaudeApiCostCalculatorZh() {
  const faqItems = [
    {
      question: 'Claude API 多少钱？',
      answer:
        'Claude API 价格因模型而异。Claude Opus 4.7 每百万输入/输出 token 收费 $5/$25。Claude Sonnet 4.6 收费 $3/$15。Claude Haiku 4.5 收费 $1/$5。',
    },
    {
      question: '哪个 Claude 模型最便宜？',
      answer:
        'Claude Haiku 4.5 最便宜，每百万输入 token 收费 $1，每百万输出 token 收费 $5。',
    },
    {
      question: 'Claude API 有批量折扣吗？',
      answer:
        '是的，Claude API 通过 Message Batches API 提供批量处理，可享受 50% 折扣。',
    },
  ];

  return (
    <>
      <Header locale="zh" />
      <main className="flex-1 bg-[#0B0F19] relative overflow-hidden">
        {/* Hero */}
        <section className="relative border-b border-white/[0.04] py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Claude API 成本计算器
            </h1>
            <p className="text-lg text-gray-400">
              计算 Claude API 的调用成本，支持 Opus 4.7、Sonnet 4.6、Haiku 4.5
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <ApiCostCalculator locale="zh" filterProvider="anthropic" />
          </div>
        </section>

        {/* Example */}
        <section className="relative py-12 px-4 border-t border-white/[0.04]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              示例计算
            </h2>
            <div className="glass-card p-6">
              <p className="text-gray-500 mb-4">
                使用 Claude Sonnet 4.6，每次调用 1,000 输入 token 和 500 输出
                token，每天调用 100 次：
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• 每次输入成本：1,000 × $3 / 1M = $0.003</li>
                <li>• 每次输出成本：500 × $15 / 1M = $0.0075</li>
                <li>• 每次总成本：$0.0105</li>
                <li>• 每日成本：$0.0105 × 100 = $1.05</li>
                <li>• 每月成本：$1.05 × 30 = $31.50</li>
              </ul>
            </div>
          </div>
        </section>

        <FAQSection title="常见问题" items={faqItems} />
        <RelatedTools currentSlug="claude-api-cost-calculator" locale="zh" />
      </main>
      <Footer locale="zh" />
    </>
  );
}
