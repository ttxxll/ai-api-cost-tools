import ApiCostCalculator from '@/components/calculators/ApiCostCalculator';
import FAQSection from '@/components/seo/FAQSection';
import RelatedTools from '@/components/seo/RelatedTools';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'DeepSeek API Cost Calculator - Estimate DeepSeek Pricing',
  description:
    'Calculate DeepSeek API costs for Chat and Reasoner models. Free online calculator.',
  alternates: {
    canonical: 'https://aiapicost.tools/deepseek-api-cost-calculator',
    languages: { en: 'https://aiapicost.tools/deepseek-api-cost-calculator', zh: 'https://aiapicost.tools/zh/deepseek-api-cost-calculator' },
  },
};

export default function DeepSeekApiCostCalculator() {
  const faqItems = [
    {
      question: 'How much does DeepSeek Chat cost?',
      answer:
        'DeepSeek Chat costs $0.28 per million input tokens and $0.42 per million output tokens. Cache hits are $0.028 per million tokens.'
    },
    {
      question: 'What is DeepSeek Reasoner pricing?',
      answer:
        'DeepSeek Reasoner uses the same tracked LiteLLM pricing: $0.28 per million input tokens and $0.42 per million output tokens.',
    },
    {
      question: 'How does DeepSeek cache pricing work?',
      answer:
        'DeepSeek offers significant discounts for cache hits. If your prompt matches a cached prefix, you pay only a fraction of the input cost.',
    },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#0B0F19] relative overflow-hidden">
        {/* Hero */}
        <section className="relative border-b border-white/[0.04] py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              DeepSeek API Cost Calculator
            </h1>
            <p className="text-lg text-gray-400">
              Calculate DeepSeek API costs for Chat and Reasoner models
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <ApiCostCalculator filterProvider="deepseek" />
          </div>
        </section>

        {/* Example */}
        <section className="relative py-12 px-4 border-t border-white/[0.04]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Example Calculation
            </h2>
            <div className="glass-card p-6">
              <p className="text-gray-500 mb-4">
                Using DeepSeek Chat with 1,000 input tokens and 500 output
                tokens per call, making 100 calls per day (50% cache hit rate):
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>
                  • Cache hit input cost: 500 × $0.028 / 1M = $0.000014
                </li>
                <li>
                  • Cache miss input cost: 500 × $0.28 / 1M = $0.00014
                </li>
                <li>• Output cost: 500 × $0.42 / 1M = $0.00021</li>
                <li>• Total per call: $0.000364</li>
                <li>• Daily cost: $0.000364 × 100 = $0.0364</li>
                <li>• Monthly cost: $0.0364 × 30 = $1.09</li>
              </ul>
            </div>
          </div>
        </section>

        <FAQSection title="Frequently Asked Questions" items={faqItems} />
        <RelatedTools currentSlug="deepseek-api-cost-calculator" />
      </main>
      <Footer />
    </>
  );
}
