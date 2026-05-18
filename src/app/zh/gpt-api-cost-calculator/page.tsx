import ApiCostCalculator from '@/components/calculators/ApiCostCalculator';
import FAQSection from '@/components/seo/FAQSection';
import RelatedTools from '@/components/seo/RelatedTools';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'GPT API 成本计算器 - 估算 OpenAI GPT 定价',
  description:
    '计算 OpenAI GPT API 的调用成本，支持 GPT-4o、o1、o3 模型。免费在线计算器。',
  alternates: {
    canonical: 'https://aiapicost.tools/zh/gpt-api-cost-calculator',
    languages: { en: 'https://aiapicost.tools/gpt-api-cost-calculator', zh: 'https://aiapicost.tools/zh/gpt-api-cost-calculator' },
  },
};

export default function GptApiCostCalculatorZh() {
  const faqItems = [
    {
      question: 'GPT-4o API 多少钱？',
      answer:
        'GPT-4o 每百万输入 token 收费 $2.50，每百万输出 token 收费 $10.00。',
    },
    {
      question: 'OpenAI 最便宜的模型是什么？',
      answer:
        'GPT-4o mini 最便宜，每百万输入 token 收费 $0.15，每百万输出 token 收费 $0.60。',
    },
    {
      question: 'o1 多少钱？',
      answer:
        'o1 每百万输入 token 收费 $15.00，每百万输出 token 收费 $60.00，因为其具有高级推理能力。',
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
              计算 OpenAI GPT API 的调用成本，支持 GPT-4o、o1、o3 模型
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
