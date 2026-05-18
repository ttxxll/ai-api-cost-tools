'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CalculatorField from '@/components/calculators/CalculatorField';
import ModelSelector from '@/components/calculators/ModelSelector';
import ResultBreakdown from '@/components/calculators/ResultBreakdown';
import FAQSection from '@/components/seo/FAQSection';
import RelatedTools from '@/components/seo/RelatedTools';
import { calculateBudget } from '@/lib/calculators/budgetPlanner';
import { formatCost } from '@/lib/calculators/apiCost';

export default function PromptTokenBudgetPlanner() {
  const [modelId, setModelId] = useState('claude-sonnet-4.6');
  const [monthlyBudget, setMonthlyBudget] = useState(100);
  const [avgInputTokens, setAvgInputTokens] = useState(1000);
  const [avgOutputTokens, setAvgOutputTokens] = useState(500);

  const result = calculateBudget({
    modelId,
    monthlyBudget,
    avgInputTokens,
    avgOutputTokens,
  });

  const faqItems = [
    {
      question: 'How do I plan my AI API budget?',
      answer:
        'Start by estimating your expected usage (calls per day, tokens per call), then use this calculator to see how much budget you need.',
    },
    {
      question: 'What if I exceed my budget?',
      answer:
        'Most providers allow you to set usage limits. Monitor your usage regularly and adjust your budget as needed.',
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
              Prompt Token Budget Planner
            </h1>
            <p className="text-lg text-gray-400">
              Plan your AI API budget and calculate how many calls you can make
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">
                  Budget Parameters
                </h3>
                <CalculatorField
                  label="Monthly Budget"
                  value={monthlyBudget}
                  onChange={setMonthlyBudget}
                  suffix="USD"
                  min={1}
                />
                <ModelSelector value={modelId} onChange={setModelId} />
                <CalculatorField
                  label="Avg Input Tokens per Call"
                  value={avgInputTokens}
                  onChange={setAvgInputTokens}
                  suffix="tokens"
                />
                <CalculatorField
                  label="Avg Output Tokens per Call"
                  value={avgOutputTokens}
                  onChange={setAvgOutputTokens}
                  suffix="tokens"
                />
              </div>

              {/* Result */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">
                  Budget Results
                </h3>
                {result && (
                  <ResultBreakdown
                    title="Budget Breakdown"
                    items={[
                      {
                        label: 'Cost per Call',
                        value: `$${formatCost(result.costPerCall)}`,
                      },
                      {
                        label: 'Max Calls per Month',
                        value: result.maxCallsPerMonth.toLocaleString(),
                        highlight: true,
                      },
                      {
                        label: 'Max Calls per Day',
                        value: result.maxCallsPerDay.toLocaleString(),
                        highlight: true,
                      },
                      {
                        label: 'Monthly Budget',
                        value: `$${monthlyBudget}`,
                      },
                    ]}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <FAQSection title="Frequently Asked Questions" items={faqItems} />
        <RelatedTools currentSlug="prompt-token-budget-planner" />
      </main>
      <Footer />
    </>
  );
}
