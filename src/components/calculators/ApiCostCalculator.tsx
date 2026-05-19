'use client';

import { useState, useRef } from 'react';
import CalculatorField from './CalculatorField';
import ModelSelector from './ModelSelector';
import {
  calculateApiCost,
  formatCost,
  formatTokens,
  type CustomModelData,
} from '@/lib/calculators/apiCost';

interface ApiCostCalculatorProps {
  locale?: 'en' | 'zh';
  filterProvider?: string;
  selectedModelId?: string;
  customModel?: CustomModelData;
}

export default function ApiCostCalculator({
  locale = 'en',
  filterProvider,
  selectedModelId,
  customModel,
}: ApiCostCalculatorProps) {
  const isZh = locale === 'zh';
  const resultRef = useRef<HTMLDivElement>(null);
  const [modelId, setModelId] = useState(
    selectedModelId || (filterProvider ? getDefaultModel(filterProvider) : 'claude-sonnet-4.6')
  );
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(500);
  const [requestsPerCall, setRequestsPerCall] = useState(1);
  const [callsPerDay, setCallsPerDay] = useState(100);
  const [cacheHitRate, setCacheHitRate] = useState(0);
  const [internalCustomModel, setInternalCustomModel] = useState<CustomModelData | null>(customModel || null);

  const activeCustomModel = internalCustomModel;

  const result = calculateApiCost({
    modelId,
    inputTokens,
    outputTokens,
    requestsPerCall,
    callsPerDay,
    cacheHitRate,
    customModel: activeCustomModel || undefined,
  });

  function scrollToResult() {
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
      {/* Input Section */}
      <div className="lg:col-span-2 glass-card p-5 transition-all duration-300 hover:border-white/[0.12]">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-xs">
            ⚙️
          </div>
          <h3 className="text-sm font-semibold text-white">
            {isZh ? '输入参数' : 'Parameters'}
          </h3>
        </div>
        <div className="space-y-3">
          <ModelSelector
            value={activeCustomModel ? 'custom' : modelId}
            onChange={(id) => {
              if (id === 'custom') {
                setInternalCustomModel({ name: '', inputPricePerM: 0, outputPricePerM: 0 });
              } else {
                setModelId(id);
                setInternalCustomModel(null);
              }
            }}
            filterProvider={filterProvider}
            onCustomModelChange={setInternalCustomModel}
            customModel={internalCustomModel}
            allowCustom
          />
          <div className="grid grid-cols-2 gap-3">
            <CalculatorField
              label={isZh ? '输入 Token' : 'Input Tokens'}
              value={inputTokens}
              onChange={setInputTokens}
              suffix="tokens"
              icon="📥"
            />
            <CalculatorField
              label={isZh ? '输出 Token' : 'Output Tokens'}
              value={outputTokens}
              onChange={setOutputTokens}
              suffix="tokens"
              icon="📤"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <CalculatorField
              label={isZh ? '每次请求数' : 'Requests/Call'}
              value={requestsPerCall}
              onChange={setRequestsPerCall}
              min={1}
              icon="🔁"
            />
            <CalculatorField
              label={isZh ? '每日调用' : 'Calls/Day'}
              value={callsPerDay}
              onChange={setCallsPerDay}
              min={1}
              icon="📅"
            />
          </div>
          {filterProvider === 'deepseek' && (
            <CalculatorField
              label={isZh ? '缓存命中率' : 'Cache Hit Rate'}
              value={cacheHitRate}
              onChange={setCacheHitRate}
              type="percentage"
              min={0}
              max={100}
              suffix="%"
              icon="💾"
              helpText={isZh ? 'DeepSeek 支持缓存命中折扣' : 'DeepSeek cache hit discount'}
            />
          )}
          <button
            onClick={scrollToResult}
            className="w-full mt-1 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white text-sm font-semibold rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 active:scale-[0.98]"
          >
            {isZh ? '查看计算结果 ↓' : 'View Results ↓'}
          </button>
        </div>
      </div>

      {/* Result Section */}
      <div ref={resultRef} className="lg:col-span-3 space-y-5 scroll-mt-4">
        {/* Cost Result Card */}
        {result && (
          <div className="relative glass-card p-5 overflow-hidden transition-all duration-300 hover:border-white/[0.12]">
            {/* Subtle glow background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xs">
                  💰
                </div>
                <h3 className="text-sm font-semibold text-white">{isZh ? '成本估算' : 'Cost Estimate'}</h3>
                <span className="ml-auto text-[10px] text-gray-500 bg-white/[0.03] px-2 py-0.5 rounded-full border border-white/[0.06]">
                  {result.model.displayName}
                </span>
              </div>

              {/* 3 big numbers */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center">
                  <p className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">{isZh ? '单次' : 'Per Call'}</p>
                  <p className="text-lg font-bold font-mono text-white glow-text-purple">${formatCost(result.totalCostPerCall)}</p>
                </div>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 text-center">
                  <p className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">{isZh ? '每日' : 'Daily'}</p>
                  <p className="text-lg font-bold font-mono text-white">${formatCost(result.dailyCost)}</p>
                </div>
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 text-center">
                  <p className="text-[10px] text-purple-400 mb-1 uppercase tracking-wider">{isZh ? '每月' : 'Monthly'}</p>
                  <p className="text-lg font-bold font-mono text-purple-400 glow-text-purple">${formatCost(result.monthlyCost)}</p>
                </div>
              </div>

              {/* Detail grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2">
                  <span className="text-gray-500">{isZh ? '输入成本' : 'Input'}</span>
                  <span className="font-mono text-gray-300">${formatCost(result.inputCostPerCall)}</span>
                </div>
                <div className="flex justify-between bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2">
                  <span className="text-gray-500">{isZh ? '输出成本' : 'Output'}</span>
                  <span className="font-mono text-gray-300">${formatCost(result.outputCostPerCall)}</span>
                </div>
                <div className="flex justify-between bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2">
                  <span className="text-gray-500">{isZh ? '每日输入' : 'Daily In'}</span>
                  <span className="font-mono text-gray-300">{formatTokens(result.inputTokensPerDay)}</span>
                </div>
                <div className="flex justify-between bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2">
                  <span className="text-gray-500">{isZh ? '每日输出' : 'Daily Out'}</span>
                  <span className="font-mono text-gray-300">{formatTokens(result.outputTokensPerDay)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Formula */}
        <div className="glass-card p-5 transition-all duration-300 hover:border-white/[0.12]">
          <h4 className="text-sm font-semibold text-white mb-3">
            {isZh ? '计算原理' : 'How It Works'}
          </h4>
          <div className="space-y-1.5">
            {(isZh
              ? [
                  { step: '1', label: '输入成本', formula: '输入Token × 输入价格 ÷ 1M', cls: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
                  { step: '2', label: '输出成本', formula: '输出Token × 输出价格 ÷ 1M', cls: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
                  { step: '3', label: '单次成本', formula: '输入成本 + 输出成本', cls: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
                  { step: '4', label: '每日成本', formula: '单次成本 × 每日调用次数', cls: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
                  { step: '5', label: '每月成本', formula: '每日成本 × 30', cls: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
                ]
              : [
                  { step: '1', label: 'Input Cost', formula: 'Input Tokens × Input Price ÷ 1M', cls: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
                  { step: '2', label: 'Output Cost', formula: 'Output Tokens × Output Price ÷ 1M', cls: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
                  { step: '3', label: 'Cost per Call', formula: 'Input Cost + Output Cost', cls: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
                  { step: '4', label: 'Daily Cost', formula: 'Cost/Call × Calls/Day', cls: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
                  { step: '5', label: 'Monthly Cost', formula: 'Daily Cost × 30', cls: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
                ]
            ).map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className={`flex-shrink-0 w-6 h-6 rounded-full ${item.cls} border flex items-center justify-center text-[10px] font-bold`}>
                  {item.step}
                </div>
                <div className="flex-1 flex items-center justify-between bg-white/[0.02] border border-white/[0.04] rounded-lg px-3 py-1.5">
                  <span className="text-xs font-medium text-gray-300">{item.label}</span>
                  <span className="text-[10px] font-mono text-gray-600">{item.formula}</span>
                </div>
                {i < 4 && <span className="text-gray-700 text-[10px]">↓</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getDefaultModel(provider: string): string {
  const defaults: Record<string, string> = {
    anthropic: 'claude-sonnet-4.6',
    openai: 'gpt-5.4',
    google: 'gemini-3.1-pro-preview',
    deepseek: 'deepseek-chat',
  };
  return defaults[provider] || 'claude-sonnet-4.6';
}
