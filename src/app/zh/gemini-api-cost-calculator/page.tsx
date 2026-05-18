import ApiCostCalculator from '@/components/calculators/ApiCostCalculator';
import FAQSection from '@/components/seo/FAQSection';
import RelatedTools from '@/components/seo/RelatedTools';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Gemini API 成本计算器 - 估算 Google Gemini 定价',
  description:
    '计算 Google Gemini API 的调用成本，支持 Pro、Flash、Flash-Lite 模型。免费在线计算器。',
  alternates: {
    canonical: 'https://aiapicost.tools/zh/gemini-api-cost-calculator',
    languages: { en: 'https://aiapicost.tools/gemini-api-cost-calculator', zh: 'https://aiapicost.tools/zh/gemini-api-cost-calculator' },
  },
};

export default function GeminiApiCostCalculatorZh() {
  const faqItems = [
    {
      question: 'Gemini 2.5 Pro 多少钱？',
      answer:
        'Gemini 2.5 Pro 每百万输入 token（≤200k）收费 $1.25，每百万输出 token 收费 $10.00。超过 200k 输入 token 价格翻倍。',
    },
    {
      question: '最便宜的 Gemini 模型是什么？',
      answer:
        'Gemini 2.5 Flash-Lite 最便宜，每百万输入 token 收费 $0.10，每百万输出 token 收费 $0.40。',
    },
    {
      question: 'Gemini 有免费额度吗？',
      answer: '是的，Google AI Studio 为 Gemini 模型提供有速率限制的免费额度。',
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
              Gemini API 成本计算器
            </h1>
            <p className="text-lg text-gray-400">
              计算 Google Gemini API 的调用成本，支持 Pro、Flash、Flash-Lite
              模型
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <ApiCostCalculator locale="zh" filterProvider="google" />
          </div>
        </section>

        <FAQSection title="常见问题" items={faqItems} />
        <RelatedTools currentSlug="gemini-api-cost-calculator" locale="zh" />
      </main>
      <Footer locale="zh" />
    </>
  );
}
