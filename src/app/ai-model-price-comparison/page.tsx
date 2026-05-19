'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CalculatorField from '@/components/calculators/CalculatorField';
import FAQSection from '@/components/seo/FAQSection';
import RelatedTools from '@/components/seo/RelatedTools';
import { modelPricing } from '@/lib/data/modelPricing';

export default function AiModelPriceComparison() {
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);

  const faqItems = [
    {
      question: 'Which AI model is cheapest?',
      answer:
        'DeepSeek Chat is one of the cheapest tracked models at $0.28/$0.42 per million input/output tokens. However, consider factors like quality, speed, and context window.'
    },
    {
      question: 'How do I choose between models?',
      answer:
        'Consider your use case: Haiku/Flash for simple tasks, Sonnet/GPT-4o for general use, Opus/o1 for complex reasoning. Balance cost with quality needs.',
    },
  ];

  // Calculate costs for each model
  const comparisons = modelPricing.map((model) => {
    const inputCost = (inputTokens * model.inputPricePerM) / 1000000;
    const outputCost = (outputTokens * model.outputPricePerM) / 1000000;
    return {
      ...model,
      inputCost,
      outputCost,
      totalCost: inputCost + outputCost,
    };
  });

  // Sort by total cost
  const sortedComparisons = [...comparisons].sort(
    (a, b) => a.totalCost - b.totalCost
  );

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#0B0F19] relative overflow-hidden">
        {/* Hero */}
        <section className="relative border-b border-white/[0.04] py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              AI Model Price Comparison
            </h1>
            <p className="text-lg text-gray-400">
              Compare pricing across Claude, GPT, Gemini, and DeepSeek models
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <CalculatorField
                label="Input Tokens"
                value={inputTokens}
                onChange={setInputTokens}
                suffix="tokens"
              />
              <CalculatorField
                label="Output Tokens"
                value={outputTokens}
                onChange={setOutputTokens}
                suffix="tokens"
              />
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full glass-card overflow-hidden">
                <thead>
                  <tr className="bg-white/[0.03]">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">
                      Model
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">
                      Input Price
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">
                      Output Price
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">
                      Total Cost
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-400">
                      Rank
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedComparisons.map((model, index) => (
                    <tr
                      key={model.id}
                      className="border-t border-white/[0.04]"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-white">
                            {model.displayName}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                            {model.provider}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-gray-500">
                        ${model.inputCost.toFixed(6)}
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-gray-500">
                        ${model.outputCost.toFixed(6)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-medium text-white">
                        ${model.totalCost.toFixed(6)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {index === 0 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Cheapest
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <FAQSection title="Frequently Asked Questions" items={faqItems} />
        <RelatedTools currentSlug="ai-model-price-comparison" />
      </main>
      <Footer />
    </>
  );
}
