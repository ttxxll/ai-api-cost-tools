'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CalculatorField from '@/components/calculators/CalculatorField';
import ModelSelector from '@/components/calculators/ModelSelector';
import ResultBreakdown from '@/components/calculators/ResultBreakdown';
import FAQSection from '@/components/seo/FAQSection';
import RelatedTools from '@/components/seo/RelatedTools';
import { estimateBatchCost } from '@/lib/calculators/batchEstimator';
import { formatCost, formatTokens } from '@/lib/calculators/apiCost';

export default function BatchApiCostEstimator() {
  const [modelId, setModelId] = useState('claude-sonnet-4.6');
  const [taskCount, setTaskCount] = useState(1000);
  const [inputTokensPerTask, setInputTokensPerTask] = useState(500);
  const [outputTokensPerTask, setOutputTokensPerTask] = useState(200);

  const result = estimateBatchCost({
    modelId,
    taskCount,
    inputTokensPerTask,
    outputTokensPerTask,
  });

  const faqItems = [
    {
      question: 'What is batch API processing?',
      answer:
        'Batch API allows you to send multiple requests at once, often at a discounted rate. It is ideal for non-time-sensitive tasks.',
    },
    {
      question: 'How much can I save with batch processing?',
      answer:
        'Most providers offer 50% discount for batch processing. Check the specific provider documentation for exact rates.',
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
              Batch API Cost Estimator
            </h1>
            <p className="text-lg text-gray-400">
              Estimate costs for batch API processing tasks
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
                  Batch Parameters
                </h3>
                <ModelSelector value={modelId} onChange={setModelId} />
                <CalculatorField
                  label="Number of Tasks"
                  value={taskCount}
                  onChange={setTaskCount}
                  min={1}
                />
                <CalculatorField
                  label="Input Tokens per Task"
                  value={inputTokensPerTask}
                  onChange={setInputTokensPerTask}
                  suffix="tokens"
                />
                <CalculatorField
                  label="Output Tokens per Task"
                  value={outputTokensPerTask}
                  onChange={setOutputTokensPerTask}
                  suffix="tokens"
                />
              </div>

              {/* Result */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">
                  Batch Cost Estimate
                </h3>
                {result && (
                  <ResultBreakdown
                    title="Batch Cost Breakdown"
                    items={[
                      {
                        label: 'Total Input Tokens',
                        value: formatTokens(result.totalInputTokens),
                      },
                      {
                        label: 'Total Output Tokens',
                        value: formatTokens(result.totalOutputTokens),
                      },
                      {
                        label: 'Total Tokens',
                        value: formatTokens(result.totalTokens),
                      },
                      {
                        label: 'Pricing Mode',
                        value: result.usedBatchPricing ? 'Batch pricing' : 'Standard pricing',
                      },
                      {
                        label: 'Input Cost',
                        value: `$${formatCost(result.inputCost)}`,
                      },
                      {
                        label: 'Output Cost',
                        value: `$${formatCost(result.outputCost)}`,
                      },
                      {
                        label: 'Total Cost',
                        value: `$${formatCost(result.totalCost)}`,
                        highlight: true,
                      },
                      {
                        label: result.isBatchSupported ? 'Batch Savings' : 'Batch Support',
                        value: result.isBatchSupported ? `$${formatCost(result.savings)}` : 'Unavailable',
                      },
                      {
                        label: 'Estimated Time',
                        value: `~${result.estimatedTimeMinutes} min`,
                      },
                    ]}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <FAQSection title="Frequently Asked Questions" items={faqItems} />
        <RelatedTools currentSlug="batch-api-cost-estimator" />
      </main>
      <Footer />
    </>
  );
}
