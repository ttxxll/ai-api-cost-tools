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

export default function BatchApiCostEstimatorZh() {
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
      question: '什么是批量 API 处理？',
      answer:
        '批量 API 允许您一次发送多个请求，通常享受折扣价格。非常适合非时间敏感的任务。',
    },
    {
      question: '批量处理能节省多少？',
      answer:
        '大多数厂商为批量处理提供 50% 折扣。请查看具体厂商文档了解确切费率。',
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
              批量 API 成本估算器
            </h1>
            <p className="text-lg text-gray-400">
              估算批量 API 处理任务的成本
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
                  批量参数
                </h3>
                <ModelSelector value={modelId} onChange={setModelId} />
                <CalculatorField
                  label="任务数量"
                  value={taskCount}
                  onChange={setTaskCount}
                  min={1}
                />
                <CalculatorField
                  label="每任务输入 Token 数"
                  value={inputTokensPerTask}
                  onChange={setInputTokensPerTask}
                  suffix="tokens"
                />
                <CalculatorField
                  label="每任务输出 Token 数"
                  value={outputTokensPerTask}
                  onChange={setOutputTokensPerTask}
                  suffix="tokens"
                />
              </div>

              {/* Result */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4">
                  批量成本估算
                </h3>
                {result && (
                  <ResultBreakdown
                    title="批量成本明细"
                    items={[
                      {
                        label: '总输入 Token 数',
                        value: formatTokens(result.totalInputTokens),
                      },
                      {
                        label: '总输出 Token 数',
                        value: formatTokens(result.totalOutputTokens),
                      },
                      {
                        label: '总 Token 数',
                        value: formatTokens(result.totalTokens),
                      },
                      {
                        label: '输入成本',
                        value: `$${formatCost(result.inputCost)}`,
                      },
                      {
                        label: '输出成本',
                        value: `$${formatCost(result.outputCost)}`,
                      },
                      {
                        label: '总成本',
                        value: `$${formatCost(result.totalCost)}`,
                        highlight: true,
                      },
                      {
                        label: '预估时间',
                        value: `~${result.estimatedTimeMinutes} 分钟`,
                      },
                    ]}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <FAQSection title="常见问题" items={faqItems} />
        <RelatedTools currentSlug="batch-api-cost-estimator" locale="zh" />
      </main>
      <Footer locale="zh" />
    </>
  );
}
