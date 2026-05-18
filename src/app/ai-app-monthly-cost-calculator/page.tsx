'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CalculatorField from '@/components/calculators/CalculatorField';
import ModelSelector from '@/components/calculators/ModelSelector';
import ResultBreakdown from '@/components/calculators/ResultBreakdown';
import FAQSection from '@/components/seo/FAQSection';
import RelatedTools from '@/components/seo/RelatedTools';
import { getModelById } from '@/lib/data/modelPricing';
import { formatCost } from '@/lib/calculators/apiCost';

export default function AiAppMonthlyCostCalculator() {
  const [modelId, setModelId] = useState('claude-sonnet-4.6');
  const [users, setUsers] = useState(100);
  const [callsPerUserPerDay, setCallsPerUserPerDay] = useState(10);
  const [avgInputTokens, setAvgInputTokens] = useState(1000);
  const [avgOutputTokens, setAvgOutputTokens] = useState(500);

  const model = getModelById(modelId);
  const totalCallsPerDay = users * callsPerUserPerDay;
  const costPerCall = model
    ? (avgInputTokens * model.inputPricePerMillion) / 1000000 +
      (avgOutputTokens * model.outputPricePerMillion) / 1000000
    : 0;
  const dailyCost = costPerCall * totalCallsPerDay;
  const monthlyCost = dailyCost * 30;
  const costPerUser = users > 0 ? monthlyCost / users : 0;

  const faqItems = [
    {
      question: 'How do I estimate my AI app costs?',
      answer:
        'Estimate your user count, average calls per user per day, and typical token usage per call. This calculator will show you the monthly cost.',
    },
    {
      question: 'How can I reduce my AI costs?',
      answer:
        'Use cheaper models for simple tasks, implement caching, optimize prompts to reduce token usage, and batch similar requests.',
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
              AI App Monthly Cost Calculator
            </h1>
            <p className="text-lg text-gray-400">
              Estimate monthly costs for your AI-powered application
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
                  App Parameters
                </h3>
                <ModelSelector value={modelId} onChange={setModelId} />
                <CalculatorField
                  label="Estimated Users"
                  value={users}
                  onChange={setUsers}
                  min={1}
                />
                <CalculatorField
                  label="Calls per User per Day"
                  value={callsPerUserPerDay}
                  onChange={setCallsPerUserPerDay}
                  min={1}
                />
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
                  Cost Estimate
                </h3>
                <ResultBreakdown
                  title="Monthly Cost Breakdown"
                  items={[
                    {
                      label: 'Cost per Call',
                      value: `$${formatCost(costPerCall)}`,
                    },
                    {
                      label: 'Total Calls per Day',
                      value: totalCallsPerDay.toLocaleString(),
                    },
                    {
                      label: 'Daily Cost',
                      value: `$${formatCost(dailyCost)}`,
                    },
                    {
                      label: 'Monthly Cost',
                      value: `$${formatCost(monthlyCost)}`,
                      highlight: true,
                    },
                    {
                      label: 'Cost per User',
                      value: `$${formatCost(costPerUser)}`,
                      highlight: true,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        <FAQSection title="Frequently Asked Questions" items={faqItems} />
        <RelatedTools currentSlug="ai-app-monthly-cost-calculator" />
      </main>
      <Footer />
    </>
  );
}
