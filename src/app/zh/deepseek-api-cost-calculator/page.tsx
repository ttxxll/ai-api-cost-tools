import ApiCostCalculator from '@/components/calculators/ApiCostCalculator';
import FAQSection from '@/components/seo/FAQSection';
import RelatedTools from '@/components/seo/RelatedTools';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'DeepSeek API 成本计算器 - 估算 DeepSeek 定价',
  description:
    '计算 DeepSeek API 的调用成本，支持 Chat、Reasoner 模型。免费在线计算器。',
  alternates: {
    canonical: 'https://aiapicost.tools/zh/deepseek-api-cost-calculator',
    languages: { en: 'https://aiapicost.tools/deepseek-api-cost-calculator', zh: 'https://aiapicost.tools/zh/deepseek-api-cost-calculator' },
  },
};

export default function DeepSeekApiCostCalculatorZh() {
  const faqItems = [
    {
      question: 'DeepSeek Chat 多少钱？',
      answer:
        'DeepSeek Chat 每百万输入 token 收费 $0.28，每百万输出 token 收费 $0.42。缓存命中为每百万 token $0.028。',
    },
    {
      question: 'DeepSeek Reasoner 价格是多少？',
      answer:
        'DeepSeek Reasoner 使用当前 OpenRouter 跟踪价格：每百万输入 token $0.28，每百万输出 token $0.42。',
    },
    {
      question: 'DeepSeek 缓存定价如何运作？',
      answer:
        'DeepSeek 为缓存命中提供大幅折扣。如果您的 prompt 匹配缓存前缀，只需支付输入成本的一小部分。',
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
              DeepSeek API 成本计算器
            </h1>
            <p className="text-lg text-gray-400">
              计算 DeepSeek API 的调用成本，支持 Chat、Reasoner 模型
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <ApiCostCalculator locale="zh" filterProvider="deepseek" />
          </div>
        </section>

        <FAQSection title="常见问题" items={faqItems} />
        <RelatedTools currentSlug="deepseek-api-cost-calculator" locale="zh" />
      </main>
      <Footer locale="zh" />
    </>
  );
}
