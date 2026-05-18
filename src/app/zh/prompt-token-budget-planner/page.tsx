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

export default function PromptTokenBudgetPlannerZh() {
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
      question: '如何规划 AI API 预算？',
      answer:
        '首先估算您的预期使用量（每天调用次数、每次 token 数），然后使用此计算器查看需要多少预算。',
    },
    {
      question: '如果超出预算怎么办？',
      answer:
        '大多数厂商允许您设置使用限额。定期监控使用情况并根据需要调整预算。',
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
              Token 预算规划器
            </h1>
            <p className="text-lg text-gray-400">
              规划 AI API 预算，计算可支持的调用次数
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
                  预算参数
                </h3>
                <CalculatorField
                  label="月度预算"
                  value={monthlyBudget}
                  onChange={setMonthlyBudget}
                  suffix="美元"
                  min={1}
                />
                <ModelSelector value={modelId} onChange={setModelId} />
                <CalculatorField
                  label="平均每次输入 Token 数"
                  value={avgInputTokens}
                  onChange={setAvgInputTokens}
                  suffix="tokens"
                />
                <CalculatorField
                  label="平均每次输出 Token 数"
                  value={avgOutputTokens}
                  onChange={setAvgOutputTokens}
                  suffix="tokens"
                />
              </div>

              {/* Result */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">
                  预算结果
                </h3>
                {result && (
                  <ResultBreakdown
                    title="预算明细"
                    items={[
                      {
                        label: '每次调用成本',
                        value: `$${formatCost(result.costPerCall)}`,
                      },
                      {
                        label: '每月最大调用次数',
                        value: result.maxCallsPerMonth.toLocaleString(),
                        highlight: true,
                      },
                      {
                        label: '每日最大调用次数',
                        value: result.maxCallsPerDay.toLocaleString(),
                        highlight: true,
                      },
                      {
                        label: '月度预算',
                        value: `$${monthlyBudget}`,
                      },
                    ]}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <FAQSection title="常见问题" items={faqItems} />
        <RelatedTools currentSlug="prompt-token-budget-planner" locale="zh" />
      </main>
      <Footer locale="zh" />
    </>
  );
}
