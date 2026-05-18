import ApiCostCalculator from '@/components/calculators/ApiCostCalculator';
import FAQSection from '@/components/seo/FAQSection';
import RelatedTools from '@/components/seo/RelatedTools';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Gemini API Cost Calculator - Estimate Google Gemini Pricing',
  description:
    'Calculate Google Gemini API costs for Pro, Flash, and Flash-Lite models. Free online calculator.',
  alternates: {
    canonical: 'https://aiapicost.tools/gemini-api-cost-calculator',
    languages: { en: 'https://aiapicost.tools/gemini-api-cost-calculator', zh: 'https://aiapicost.tools/zh/gemini-api-cost-calculator' },
  },
};

export default function GeminiApiCostCalculator() {
  const faqItems = [
    {
      question: 'How much does Gemini 2.5 Pro cost?',
      answer:
        'Gemini 2.5 Pro costs $1.25 per million input tokens (≤200k) and $10.00 per million output tokens. Price doubles for input over 200k tokens.',
    },
    {
      question: 'What is the cheapest Gemini model?',
      answer:
        'Gemini 2.5 Flash-Lite is the cheapest at $0.10 per million input tokens and $0.40 per million output tokens.',
    },
    {
      question: 'Does Gemini offer a free tier?',
      answer:
        'Yes, Google AI Studio offers a free tier for Gemini models with rate limits.',
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
              Gemini API Cost Calculator
            </h1>
            <p className="text-lg text-gray-400">
              Calculate Google Gemini API costs for Pro, Flash, and Flash-Lite
              models
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <ApiCostCalculator filterProvider="google" />
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
                Using Gemini 2.5 Flash with 1,000 input tokens and 500 output
                tokens per call, making 100 calls per day:
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Input cost per call: 1,000 × $0.30 / 1M = $0.0003</li>
                <li>• Output cost per call: 500 × $2.50 / 1M = $0.00125</li>
                <li>• Total per call: $0.00155</li>
                <li>• Daily cost: $0.00155 × 100 = $0.155</li>
                <li>• Monthly cost: $0.155 × 30 = $4.65</li>
              </ul>
            </div>
          </div>
        </section>

        <FAQSection title="Frequently Asked Questions" items={faqItems} />
        <RelatedTools currentSlug="gemini-api-cost-calculator" />
      </main>
      <Footer />
    </>
  );
}
