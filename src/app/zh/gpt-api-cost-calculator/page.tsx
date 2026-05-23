import ApiCostCalculator from '@/components/calculators/ApiCostCalculator';
import FAQSection from '@/components/seo/FAQSection';
import RelatedTools from '@/components/seo/RelatedTools';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'GPT API 成本计算器 - 估算 OpenAI GPT 定价',
  description:
    '计算 OpenAI GPT API 的调用成本，支持 GPT-5.5、GPT-5.4 和 GPT-5.4 Mini 模型。免费在线计算器。',
  alternates: {
    canonical: 'https://aiapicost.tools/zh/gpt-api-cost-calculator',
    languages: { en: 'https://aiapicost.tools/gpt-api-cost-calculator', zh: 'https://aiapicost.tools/zh/gpt-api-cost-calculator' },
  },
};

export default function GptApiCostCalculatorZh() {
  const faqItems = [
    {
      question: 'GPT-5.4 API 多少钱？',
      answer:
        'GPT-5.4 每百万输入 token 收费 $2.50，每百万输出 token 收费 $15.00。'
    },
    {
      question: 'OpenAI 最便宜的模型是什么？',
      answer:
        'GPT-5.4 Mini 是当前跟踪的最便宜 OpenAI 模型，每百万输入 token 收费 $0.75，每百万输出 token 收费 $4.50。',
    },
    {
      question: 'GPT-5.5 多少钱？',
      answer:
        'GPT-5.5 每百万输入 token 收费 $5.00，每百万输出 token 收费 $30.00。'
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
              GPT API 成本计算器
            </h1>
            <p className="text-lg text-gray-400">
              计算 OpenAI GPT API 的调用成本，支持 GPT-5.5、GPT-5.4 和 GPT-5.4 Mini 模型
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <ApiCostCalculator locale="zh" filterProvider="openai" />
          </div>
        </section>

        <FAQSection title="常见问题" items={faqItems} />
        <RelatedTools currentSlug="gpt-api-cost-calculator" locale="zh" />
      </main>
      <Footer locale="zh" />
    </>
  );
}
