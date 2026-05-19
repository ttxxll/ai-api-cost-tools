'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CalculatorField from '@/components/calculators/CalculatorField';
import FAQSection from '@/components/seo/FAQSection';
import RelatedTools from '@/components/seo/RelatedTools';
import { modelPricing } from '@/lib/data/modelPricing';

export default function AiModelPriceComparisonZh() {
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);

  const faqItems = [
    {
      question: '哪个 AI 模型最便宜？',
      answer:
        'DeepSeek Chat 是当前跟踪模型中价格较低的选择之一，每百万输入/输出 token 收费 $0.28/$0.42。但请考虑质量、速度和上下文窗口等因素。',
    },
    {
      question: '如何选择模型？',
      answer:
        '根据您的使用场景：Haiku/Flash 用于简单任务，Sonnet/GPT-4o 用于通用场景，Opus/o1 用于复杂推理。平衡成本与质量需求。',
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
      <Header locale="zh" />
      <main className="flex-1 bg-[#0B0F19] relative overflow-hidden">
        {/* Hero */}
        <section className="relative border-b border-white/[0.04] py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              AI 模型价格对比
            </h1>
            <p className="text-lg text-gray-400">
              横向比较 Claude、GPT、Gemini、DeepSeek 各模型的 API 定价
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <CalculatorField
                label="输入 Token 数"
                value={inputTokens}
                onChange={setInputTokens}
                suffix="tokens"
              />
              <CalculatorField
                label="输出 Token 数"
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
                      模型
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">
                      输入成本
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">
                      输出成本
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">
                      总成本
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-400">
                      排名
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
                            最便宜
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

        <FAQSection title="常见问题" items={faqItems} />
        <RelatedTools currentSlug="ai-model-price-comparison" locale="zh" />
      </main>
      <Footer locale="zh" />
    </>
  );
}
