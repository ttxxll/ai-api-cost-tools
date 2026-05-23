import ApiCostCalculator from '@/components/calculators/ApiCostCalculator';
import FAQSection from '@/components/seo/FAQSection';
import RelatedTools from '@/components/seo/RelatedTools';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'GPT API Cost Calculator - Estimate OpenAI GPT Pricing',
  description:
    'Calculate OpenAI GPT API costs for GPT-5.5, GPT-5.4, and GPT-5.4 Mini models. Free online calculator.',
  alternates: {
    canonical: 'https://aiapicost.tools/gpt-api-cost-calculator',
    languages: { en: 'https://aiapicost.tools/gpt-api-cost-calculator', zh: 'https://aiapicost.tools/zh/gpt-api-cost-calculator' },
  },
};

export default function GptApiCostCalculator() {
  const faqItems = [
    {
      question: 'How much does GPT-5.4 API cost?',
      answer:
        'GPT-5.4 costs $2.50 per million input tokens and $15.00 per million output tokens.',
    },
    {
      question: 'What is the cheapest OpenAI model?',
      answer:
        'GPT-5.4 Mini is the cheapest tracked OpenAI model at $0.75 per million input tokens and $4.50 per million output tokens.',
    },
    {
      question: 'How much does GPT-5.5 cost?',
      answer:
        'GPT-5.5 costs $5.00 per million input tokens and $30.00 per million output tokens.'
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
              GPT API Cost Calculator
            </h1>
            <p className="text-lg text-gray-400">
              Calculate OpenAI GPT API costs for GPT-5.5, GPT-5.4, and GPT-5.4 Mini models
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <ApiCostCalculator filterProvider="openai" />
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
                Using GPT-5.4 with 1,000 input tokens and 500 output tokens per
                call, making 100 calls per day:
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Input cost per call: 1,000 × $2.50 / 1M = $0.0025</li>
                <li>• Output cost per call: 500 × $15 / 1M = $0.0075</li>
                <li>• Total per call: $0.0100</li>
                <li>• Daily cost: $0.0100 × 100 = $1.00</li>
                <li>• Monthly cost: $1.00 × 30 = $30.00</li>
              </ul>
            </div>
          </div>
        </section>

        <FAQSection title="Frequently Asked Questions" items={faqItems} />
        <RelatedTools currentSlug="gpt-api-cost-calculator" />
      </main>
      <Footer />
    </>
  );
}
