import ApiCostCalculator from '@/components/calculators/ApiCostCalculator';
import FAQSection from '@/components/seo/FAQSection';
import RelatedTools from '@/components/seo/RelatedTools';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Claude API Cost Calculator - Estimate Anthropic Claude Pricing',
  description:
    'Calculate Claude API costs for Opus 4.7, Sonnet 4.6, and Haiku 4.5. Free online calculator with transparent pricing.',
  alternates: {
    canonical: 'https://aiapicost.tools/claude-api-cost-calculator',
    languages: { en: 'https://aiapicost.tools/claude-api-cost-calculator', zh: 'https://aiapicost.tools/zh/claude-api-cost-calculator' },
  },
};

export default function ClaudeApiCostCalculator() {
  const faqItems = [
    {
      question: 'How much does Claude API cost?',
      answer:
        'Claude API pricing varies by model. Claude Opus 4.7 costs $5/$25 per million input/output tokens. Claude Sonnet 4.6 costs $3/$15. Claude Haiku 4.5 costs $1/$5.',
    },
    {
      question: 'Which Claude model is cheapest?',
      answer:
        'Claude Haiku 4.5 is the cheapest at $1 per million input tokens and $5 per million output tokens.',
    },
    {
      question: 'Does Claude API offer batch pricing?',
      answer:
        'Yes, Claude API offers batch processing at 50% discount through the Message Batches API.',
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
              Claude API Cost Calculator
            </h1>
            <p className="text-lg text-gray-400">
              Calculate Claude API costs for Opus 4.7, Sonnet 4.6, and Haiku 4.5
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <ApiCostCalculator filterProvider="anthropic" />
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
                Using Claude Sonnet 4.6 with 1,000 input tokens and 500 output
                tokens per call, making 100 calls per day:
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Input cost per call: 1,000 × $3 / 1M = $0.003</li>
                <li>• Output cost per call: 500 × $15 / 1M = $0.0075</li>
                <li>• Total per call: $0.0105</li>
                <li>• Daily cost: $0.0105 × 100 = $1.05</li>
                <li>• Monthly cost: $1.05 × 30 = $31.50</li>
              </ul>
            </div>
          </div>
        </section>

        <FAQSection title="Frequently Asked Questions" items={faqItems} />
        <RelatedTools currentSlug="claude-api-cost-calculator" />
      </main>
      <Footer />
    </>
  );
}
