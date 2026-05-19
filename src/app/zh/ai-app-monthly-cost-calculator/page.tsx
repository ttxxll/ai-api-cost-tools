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

export default function AiAppMonthlyCostCalculatorZh() {
  const [modelId, setModelId] = useState('claude-sonnet-4.6');
  const [users, setUsers] = useState(100);
  const [callsPerUserPerDay, setCallsPerUserPerDay] = useState(10);
  const [avgInputTokens, setAvgInputTokens] = useState(1000);
  const [avgOutputTokens, setAvgOutputTokens] = useState(500);

  const model = getModelById(modelId);
  const totalCallsPerDay = users * callsPerUserPerDay;
  const costPerCall = model
    ? (avgInputTokens * model.inputPricePerM) / 1000000 +
      (avgOutputTokens * model.outputPricePerM) / 1000000
    : 0;
  const dailyCost = costPerCall * totalCallsPerDay;
  const monthlyCost = dailyCost * 30;
  const costPerUser = users > 0 ? monthlyCost / users : 0;

  const faqItems = [
    {
      question: '如何估算 AI 应用成本？',
      answer:
        '估算您的用户数、每用户每天平均调用次数和每次调用的 token 用量。此计算器将显示月度成本。',
    },
    {
      question: '如何降低 AI 成本？',
      answer:
        '对简单任务使用更便宜的模型、实现缓存、优化 prompt 减少 token 用量、批量处理相似请求。',
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
              AI 应用月成本计算器
            </h1>
            <p className="text-lg text-gray-400">
              估算 AI 驱动应用的月度成本
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
                  应用参数
                </h3>
                <ModelSelector value={modelId} onChange={setModelId} />
                <CalculatorField
                  label="预估用户数"
                  value={users}
                  onChange={setUsers}
                  min={1}
                />
                <CalculatorField
                  label="每用户每日调用次数"
                  value={callsPerUserPerDay}
                  onChange={setCallsPerUserPerDay}
                  min={1}
                />
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
                  成本估算
                </h3>
                <ResultBreakdown
                  title="月成本明细"
                  items={[
                    {
                      label: '每次调用成本',
                      value: `$${formatCost(costPerCall)}`,
                    },
                    {
                      label: '每日总调用次数',
                      value: totalCallsPerDay.toLocaleString(),
                    },
                    {
                      label: '每日成本',
                      value: `$${formatCost(dailyCost)}`,
                    },
                    {
                      label: '月度总成本',
                      value: `$${formatCost(monthlyCost)}`,
                      highlight: true,
                    },
                    {
                      label: '每用户成本',
                      value: `$${formatCost(costPerUser)}`,
                      highlight: true,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        <FAQSection title="常见问题" items={faqItems} />
        <RelatedTools currentSlug="ai-app-monthly-cost-calculator" locale="zh" />
      </main>
      <Footer locale="zh" />
    </>
  );
}
