'use client';

import { useState } from 'react';
import Link from 'next/link';
import { modelPricing, providers } from '@/lib/data/modelPricing';
import { tools } from '@/lib/content/tools';

type UnitMode = 'tokens' | 'words' | 'characters';

const WORDS_TO_TOKENS = 1.33;
const CHARS_TO_TOKENS = 0.25;

const providerColors: Record<string, string> = {
  OpenAI: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Anthropic: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  Google: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  DeepSeek: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  Mistral: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
  xAI: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
};

interface ComparisonCalculatorProps {
  locale?: 'en' | 'zh';
}

export default function ComparisonCalculator({ locale = 'en' }: ComparisonCalculatorProps) {
  const isZh = locale === 'zh';
  const prefix = isZh ? '/zh' : '';

  const [unitMode, setUnitMode] = useState<UnitMode>('tokens');
  const [inputValue, setInputValue] = useState(1000);
  const [outputValue, setOutputValue] = useState(500);
  const [calls, setCalls] = useState(100);

  const inputTokens =
    unitMode === 'tokens'
      ? inputValue
      : unitMode === 'words'
      ? Math.round(inputValue * WORDS_TO_TOKENS)
      : Math.round(inputValue * CHARS_TO_TOKENS);

  const outputTokens =
    unitMode === 'tokens'
      ? outputValue
      : unitMode === 'words'
      ? Math.round(outputValue * WORDS_TO_TOKENS)
      : Math.round(outputValue * CHARS_TO_TOKENS);

  const calculations = modelPricing.map((model) => {
    const inputCostPerCall = (inputTokens * model.inputPricePerM) / 1000000;
    const outputCostPerCall = (outputTokens * model.outputPricePerM) / 1000000;
    const costPerCall = inputCostPerCall + outputCostPerCall;
    const totalCost = costPerCall * calls;
    return {
      ...model,
      costPerCall,
      totalCost,
      providerName: providers.find((p) => p.provider === model.provider)?.name || model.provider,
    };
  });

  const sortedCalculations = [...calculations].sort(
    (a, b) => a.totalCost - b.totalCost
  );

  const cheapest = sortedCalculations[0]?.totalCost || 0;
  const unitLabel = unitMode === 'tokens' ? 'tokens' : unitMode === 'words' ? 'words' : 'characters';

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Sidebar - Individual Calculators */}
      <aside className="lg:w-64 shrink-0">
        <div className="sticky top-4 space-y-1">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-3">
            {isZh ? '独立计算器' : 'Individual Calculators'}
          </h3>
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={`${prefix}/${tool.slug}`}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="text-base">{tool.icon}</span>
              <span>{isZh ? getToolNameZh(tool.id) : getToolNameEn(tool.id)}</span>
            </Link>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 mb-6">
          {/* Unit Mode Toggle */}
          <div className="flex flex-wrap items-center gap-4 mb-5">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {isZh ? '计算方式：' : 'Calculate by:'}
            </span>
            <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
              {(['tokens', 'words', 'characters'] as UnitMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setUnitMode(mode)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    unitMode === mode
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {isZh ? getUnitLabelZh(mode) : mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {isZh ? `输入 ${getUnitLabelZh(unitMode)}` : `Input ${unitLabel}`}
              </label>
              <input
                type="number"
                value={inputValue || ''}
                onChange={(e) => setInputValue(Number(e.target.value) || 0)}
                min={0}
                className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white font-mono"
                placeholder="0"
              />
              {unitMode !== 'tokens' && (
                <p className="text-xs text-gray-500 mt-1">
                  ≈ {inputTokens.toLocaleString()} tokens
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {isZh ? `输出 ${getUnitLabelZh(unitMode)}` : `Output ${unitLabel}`}
              </label>
              <input
                type="number"
                value={outputValue || ''}
                onChange={(e) => setOutputValue(Number(e.target.value) || 0)}
                min={0}
                className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white font-mono"
                placeholder="0"
              />
              {unitMode !== 'tokens' && (
                <p className="text-xs text-gray-500 mt-1">
                  ≈ {outputTokens.toLocaleString()} tokens
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {isZh ? 'API 调用次数' : 'Number of API calls'}
              </label>
              <input
                type="number"
                value={calls || ''}
                onChange={(e) => setCalls(Number(e.target.value) || 0)}
                min={0}
                className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white font-mono"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900 dark:bg-gray-950 text-white">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    {isZh ? '厂商' : 'Provider'}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                    {isZh ? '模型' : 'Model'}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                    {isZh ? '输入 $/百万' : 'Input $/1M'}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                    {isZh ? '输出 $/百万' : 'Output $/1M'}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                    {isZh ? '单次' : 'Per call'}
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider">
                    {isZh ? '总计' : 'Total'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {sortedCalculations.map((calc, index) => (
                  <tr
                    key={calc.id}
                    className={`transition-colors ${
                      index % 2 === 0
                        ? 'bg-white dark:bg-gray-800'
                        : 'bg-gray-50 dark:bg-gray-850'
                    } hover:bg-blue-50 dark:hover:bg-gray-750`}
                  >
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${providerColors[calc.provider] || ''}`}>
                        {calc.provider.charAt(0).toUpperCase() + calc.provider.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-white text-sm">
                          {calc.displayName}
                        </span>
                        {index === 0 && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-500 text-white uppercase">
                            {isZh ? '最便宜' : 'Cheapest'}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-gray-600 dark:text-gray-400 font-mono">
                      ${calc.inputPricePerM.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-gray-600 dark:text-gray-400 font-mono">
                      ${calc.outputPricePerM.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right text-sm font-mono text-gray-900 dark:text-white">
                      ${formatCost(calc.costPerCall)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-semibold text-gray-900 dark:text-white text-sm">
                      ${formatCost(calc.totalCost)}
                      {cheapest > 0 && calc.totalCost > cheapest && (
                        <span className="text-[11px] text-gray-400 ml-1">
                          ({(calc.totalCost / cheapest).toFixed(1)}x)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
          {isZh
            ? `显示 ${sortedCalculations.length} 个模型，来自 ${providers.length} 家厂商 · 基于 ${calls.toLocaleString()} 次 API 调用，每次 ${inputTokens.toLocaleString()} 输入和 ${outputTokens.toLocaleString()} 输出 tokens`
            : `Showing ${sortedCalculations.length} models from ${providers.length} providers · Prices for ${calls.toLocaleString()} API calls with ${inputTokens.toLocaleString()} input and ${outputTokens.toLocaleString()} output tokens each`}
        </div>
      </div>
    </div>
  );
}

function formatCost(cost: number): string {
  if (cost < 0.001) return cost.toFixed(6);
  if (cost < 0.01) return cost.toFixed(5);
  if (cost < 0.1) return cost.toFixed(4);
  if (cost < 1) return cost.toFixed(3);
  if (cost < 10) return cost.toFixed(2);
  return cost.toFixed(2);
}

function getToolNameEn(id: string): string {
  const names: Record<string, string> = {
    claude: 'Claude API',
    gpt: 'GPT API',
    gemini: 'Gemini API',
    deepseek: 'DeepSeek API',
    comparison: 'Model Comparison',
    budget: 'Budget Planner',
    monthly: 'Monthly Cost',
    batch: 'Batch Estimator',
  };
  return names[id] || id;
}

function getToolNameZh(id: string): string {
  const names: Record<string, string> = {
    claude: 'Claude API',
    gpt: 'GPT API',
    gemini: 'Gemini API',
    deepseek: 'DeepSeek API',
    comparison: '模型对比',
    budget: '预算规划',
    monthly: '月成本',
    batch: '批量估算',
  };
  return names[id] || id;
}

function getUnitLabelZh(mode: UnitMode): string {
  const labels: Record<UnitMode, string> = {
    tokens: 'Token',
    words: '单词',
    characters: '字符',
  };
  return labels[mode];
}
