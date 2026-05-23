'use client';

import { useRef, useState } from 'react';
import CalculatorField from './CalculatorField';
import ModelSelector, { DeepSeekPromoBadge } from './ModelSelector';
import SmartAlternatives from './SmartAlternatives';
import {
  calculateApiCost,
  formatCost,
  formatTokens,
  type ApiCostResult,
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
  const [promptCachingEnabled, setPromptCachingEnabled] = useState(filterProvider === 'deepseek');
  const [cacheTtlHours, setCacheTtlHours] = useState(0);
  const [batchModeEnabled, setBatchModeEnabled] = useState(false);
  const [internalCustomModel, setInternalCustomModel] = useState<CustomModelData | null>(customModel || null);

  const activeCustomModel = internalCustomModel;

  const result = calculateApiCost({
    modelId,
    inputTokens,
    outputTokens,
    requestsPerCall,
    callsPerDay,
    cacheHitRate,
    promptCachingEnabled,
    cacheTtlHours,
    batchModeEnabled,
    customModel: activeCustomModel || undefined,
  });

  const selectedModel = result?.model;
  const supportsCaching = Boolean(selectedModel?.caching.isSupported && !activeCustomModel);
  const showCacheHitRate = Boolean(
    supportsCaching && promptCachingEnabled && selectedModel?.caching.readPricePerM !== undefined
  );
  const showGoogleCacheTtl = Boolean(
    supportsCaching &&
      promptCachingEnabled &&
      selectedModel?.provider === 'Google' &&
      selectedModel.caching.storagePricePerMPerHour !== undefined
  );
  const showOpenAiContextWarning = selectedModel?.provider === 'OpenAI' && inputTokens > 270000;

  function scrollToResult() {
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-gray-700/50 bg-gray-800/50 p-8 shadow-2xl shadow-gray-950/20 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12]">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-sm shadow-[0_0_24px_rgba(124,58,237,0.12)]">
                🎮
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">
                  {isZh ? '输入会话参数' : 'Input Session Parameters'}
                </h3>
                <p className="mt-0.5 text-xs text-gray-500">
                  {isZh ? '配置模型、Token 用量和高级计费策略' : 'Configure model, token usage, and advanced billing controls'}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
          <ModelSelector
            value={activeCustomModel ? 'custom' : modelId}
            onChange={(id) => {
              if (id === 'custom') {
                setInternalCustomModel({ name: '', inputPricePerM: 0, outputPricePerM: 0 });
                setPromptCachingEnabled(false);
                setCacheHitRate(0);
                setCacheTtlHours(0);
                setBatchModeEnabled(false);
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
          {showOpenAiContextWarning && <OpenAiContextWarning />}
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
          {(supportsCaching || !activeCustomModel) && (
            <div className="space-y-4 rounded-xl border border-gray-700/50 bg-gray-900/30 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-gray-200">
                    {isZh ? '高级计费策略' : 'Advanced Billing Strategy'}
                  </h4>
                  <p className="mt-0.5 text-xs text-gray-600">
                    {isZh ? '缓存、批处理与供应商专属折扣' : 'Caching, batch mode, and provider-specific discounts'}
                  </p>
                </div>
              </div>
              {supportsCaching && selectedModel && (
                <PromptCachingSwitch
                  enabled={promptCachingEnabled}
                  disabled={false}
                  onChange={(enabled) => {
                    setPromptCachingEnabled(enabled);
                    if (!enabled) {
                      setCacheHitRate(0);
                      setCacheTtlHours(0);
                    }
                  }}
                  showAnthropicTooltip={selectedModel.provider === 'Anthropic'}
                  isZh={isZh}
                />
              )}
              {showCacheHitRate && (
                <CalculatorField
                  label={isZh ? '缓存命中率' : 'Cache Hit Rate'}
                  value={cacheHitRate}
                  onChange={setCacheHitRate}
                  type="percentage"
                  min={0}
                  max={100}
                  suffix="%"
                  icon="💾"
                  helpText={isZh ? '根据当前模型缓存读取价格估算命中折扣' : 'Estimated with the selected model cache-read price'}
                />
              )}
              {!activeCustomModel && (
                <BatchModeSwitch
                  enabled={batchModeEnabled}
                  onChange={setBatchModeEnabled}
                  isZh={isZh}
                  unsupported={Boolean(batchModeEnabled && selectedModel && !selectedModel.batchPricing.isSupported)}
                  insights={result ? (
                    <CostOptimizationInsightsTooltip
                      result={result}
                      promptCachingEnabled={promptCachingEnabled}
                      isZh={isZh}
                    />
                  ) : null}
                />
              )}
              {showGoogleCacheTtl && (
                <CalculatorField
                  label="Cache TTL / 挂载时长"
                  value={cacheTtlHours}
                  onChange={setCacheTtlHours}
                  min={0}
                  max={24}
                  step={1}
                  suffix="hours"
                  icon="⏱️"
                  helpText={isZh ? 'Google 缓存存储按每百万 Token 每小时计费' : 'Google cache storage is billed per 1M tokens per hour'}
                />
              )}
            </div>
          )}
          <button
            onClick={scrollToResult}
            className="w-full mt-1 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white text-sm font-semibold rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 active:scale-[0.98]"
          >
            {isZh ? '查看计算结果 ↓' : 'View Results ↓'}
          </button>
        </div>
        </div>
      </div>

      <div ref={resultRef} className="lg:col-span-3 space-y-5 scroll-mt-4">
        {result && (
          <div className="relative glass-card p-5 overflow-hidden transition-all duration-300 hover:border-white/[0.12]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xs">
                  💰
                </div>
                <h3 className="text-sm font-semibold text-white">{isZh ? '成本估算' : 'Cost Estimate'}</h3>
                <span className="ml-auto text-[10px] text-gray-500 bg-white/[0.03] px-2 py-0.5 rounded-full border border-white/[0.06]">
                  {result.model.displayName}
                </span>
                {result.model.id === 'deepseek-v4-pro' && <DeepSeekPromoBadge />}
              </div>

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

              {result.pricingTier === 'over200k' && (
                <div className="mb-4 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-xs text-cyan-200">
                  {isZh ? '(已触发 >200k 长文本翻倍费率)' : '(Triggered >200k long-context premium pricing)'}{' '}
                  <span className="font-mono text-cyan-300">
                    In ${result.effectiveInputPricePerM}/M · Out ${result.effectiveOutputPricePerM}/M
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 text-xs">
                <CostLine label={isZh ? '输入成本' : 'Input'} value={`$${formatCost(result.inputCostPerCall)}`} />
                <CostLine label={isZh ? '输出成本' : 'Output'} value={`$${formatCost(result.outputCostPerCall)}`} />
                {result.cacheReadCostPerCall > 0 && (
                  <CostLine label={isZh ? '缓存读取' : 'Cache Read'} value={`$${formatCost(result.cacheReadCostPerCall)}`} />
                )}
                {result.cacheWriteCostPerCall > 0 && (
                  <CostLine label={isZh ? '缓存写入' : 'Cache Write'} value={`$${formatCost(result.cacheWriteCostPerCall)}`} />
                )}
                {result.cacheStorageCostPerCall > 0 && (
                  <CostLine label="Storage Cost (挂载费)" value={`$${formatCost(result.cacheStorageCostPerCall)}`} />
                )}
                {result.batchModeEnabled && (
                  <CostLine
                    label={isZh ? 'Batch 模式' : 'Batch Mode'}
                    value={result.usedBatchPricing ? (isZh ? '已启用' : 'Enabled') : (isZh ? '不支持，标准价' : 'Unsupported, standard')}
                  />
                )}
                <CostLine label={isZh ? '每日输入' : 'Daily In'} value={formatTokens(result.inputTokensPerDay)} />
                <CostLine label={isZh ? '每日输出' : 'Daily Out'} value={formatTokens(result.outputTokensPerDay)} />
              </div>
            </div>
          </div>
        )}

        {result && (
          <SmartAlternatives
            isZh={isZh}
            currentModelId={activeCustomModel ? undefined : result.model.id}
            inputTokens={inputTokens}
            outputTokens={outputTokens}
            requestsPerCall={requestsPerCall}
            callsPerDay={callsPerDay}
            cacheHitRate={cacheHitRate}
            promptCachingEnabled={promptCachingEnabled}
            cacheTtlHours={cacheTtlHours}
            batchModeEnabled={batchModeEnabled}
          />
        )}

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

function BatchModeSwitch({
  enabled,
  onChange,
  isZh,
  unsupported,
  insights,
}: {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  isZh: boolean;
  unsupported: boolean;
  insights?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-60">📦</span>
          <span className="text-sm font-medium text-gray-300">{isZh ? 'Batch 模式' : 'Batch Mode'}</span>
          <span className="text-[10px] text-gray-600">{isZh ? '异步降本' : 'async savings'}</span>
          {insights}
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() => onChange(!enabled)}
          className={`relative h-6 w-11 rounded-full border transition-colors ${
            enabled ? 'border-emerald-400/50 bg-emerald-500/40' : 'border-white/[0.12] bg-gray-800/80'
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              enabled ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>
      {unsupported && (
        <p className="mt-2 text-xs text-gray-500">
          {isZh ? '当前模型不支持 Batch，主账单将按标准价格计算。' : 'Current model does not support Batch; the main bill uses standard pricing.'}
        </p>
      )}
    </div>
  );
}

function PromptCachingSwitch({
  enabled,
  disabled,
  onChange,
  showAnthropicTooltip,
  isZh,
}: {
  enabled: boolean;
  disabled: boolean;
  onChange: (enabled: boolean) => void;
  showAnthropicTooltip: boolean;
  isZh: boolean;
}) {
  return (
    <div className={`rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-3 ${disabled ? 'opacity-60' : ''}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm opacity-60">💾</span>
          <span className="text-sm font-medium text-gray-300">{isZh ? '提示词缓存' : 'Prompt Caching'}</span>
          {showAnthropicTooltip && <AnthropicCacheTooltip isZh={isZh} />}
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={enabled && !disabled}
          disabled={disabled}
          onClick={() => onChange(!enabled)}
          className={`relative h-6 w-11 rounded-full border transition-colors ${
            enabled && !disabled ? 'border-purple-400/50 bg-purple-500/40' : 'border-white/[0.12] bg-gray-800/80'
          } ${disabled ? 'cursor-not-allowed' : ''}`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              enabled && !disabled ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>
    </div>
  );
}

function AnthropicCacheTooltip({ isZh }: { isZh: boolean }) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <span className="flex h-6 w-6 cursor-help items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-xs font-bold text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.18)] transition-colors hover:border-cyan-300 hover:bg-cyan-400/20 hover:text-white">
        i
      </span>
      {visible && (
        <span className="pointer-events-none absolute left-1/2 top-8 z-50 w-80 -translate-x-1/2 rounded-xl border border-cyan-400/30 bg-[#0F172A]/95 p-4 text-xs leading-relaxed text-gray-100 opacity-100 shadow-2xl shadow-cyan-950/50 backdrop-blur-xl animate-[tooltip-enter_150ms_ease-out_forwards]">
          <span className="mb-1 block text-sm font-semibold text-cyan-200">
            {isZh ? '缓存写入计费说明' : 'Cache Write Billing Notes'}
          </span>
          {isZh
            ? '默认按照 5 分钟 (5m) 短期驻留标准计算写入费。Anthropic 官方提供 1 小时长期锁定时长，但写入成本将翻倍。短频次对话建议保持默认，长时离线任务需注意成本飙升。'
            : 'By default, this calculator uses the 5-minute (5m) short-lived cache write rate. Anthropic also offers a 1-hour long-lived cache duration, but write costs are doubled. Keep the default for short, frequent conversations; long offline jobs should account for sharply higher write costs.'}
        </span>
      )}
    </span>
  );
}

function OpenAiContextWarning() {
  return (
    <div className="rounded-xl border border-amber-700 bg-amber-900/20 px-3 py-3 text-xs leading-relaxed text-amber-200">
      <p>
        ⚠️ Context Limit Exceeded: OpenAI 官方公共 API 限制最大上下文为 270,000 Tokens。上述价格反映的是标准费率，超出此限制 API 将被拒绝或需联系销售走企业通道。
      </p>
      <p className="mt-1 text-amber-300/80">
        💡 架构建议：处理当前超大文本，建议切换至 Gemini 3.1 Pro 或 Claude Opus。
      </p>
    </div>
  );
}

function CostLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-mono text-gray-300">{value}</span>
    </div>
  );
}

function CostOptimizationInsightsTooltip({
  result,
  promptCachingEnabled,
  isZh,
}: {
  result: ApiCostResult;
  promptCachingEnabled: boolean;
  isZh: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const showBatch = result.batchMonthlyCost !== undefined;
  const showCachingSavings = promptCachingEnabled && result.cacheSavingsMonthly > 0;

  if (!showBatch && !showCachingSavings) return null;

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <button
        type="button"
        className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-xs font-bold text-emerald-300 shadow-[0_0_18px_rgba(16,185,129,0.16)] transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/20 hover:text-emerald-100"
        aria-label={isZh ? '降本优化建议' : 'Cost Optimization Insights'}
      >
        i
      </button>
      {visible && (
        <span className="pointer-events-none absolute left-1/2 top-8 z-50 w-96 -translate-x-1/2 rounded-xl border border-emerald-500/30 bg-[#0F172A]/95 p-4 text-xs leading-relaxed text-gray-100 shadow-2xl shadow-emerald-950/40 backdrop-blur-xl animate-[tooltip-enter_150ms_ease-out_forwards]">
          <span className="mb-2 block text-sm font-semibold text-emerald-200">
            {isZh ? '降本优化建议' : 'Cost Optimization Insights'}
          </span>
          <span className="space-y-2 block">
            {showBatch && result.batchMonthlyCost !== undefined && (
              <span className="block rounded-lg border border-emerald-700 bg-emerald-900/20 p-2 text-emerald-100">
                {isZh ? (
                  <>
                    ✨ Batch API 可用：如果您的任务允许异步处理（24 小时内返回），使用 Batch 模式总价将降至{' '}
                    <span className="font-mono font-semibold text-emerald-300">${formatCost(result.batchMonthlyCost)}</span>{' '}
                    (节省 {formatSavingsPercent(result.batchMonthlySavings ?? 0, result.noCacheMonthlyCost)})。
                  </>
                ) : (
                  <>
                    ✨ Batch API available: If your workload can run asynchronously and return within 24 hours, Batch mode can reduce the total to{' '}
                    <span className="font-mono font-semibold text-emerald-300">${formatCost(result.batchMonthlyCost)}</span>{' '}
                    (save {formatSavingsPercent(result.batchMonthlySavings ?? 0, result.noCacheMonthlyCost)}).
                  </>
                )}
              </span>
            )}
            {showCachingSavings && (
              <span className="block rounded-lg border border-purple-500/30 bg-purple-500/10 p-2 text-purple-100">
                {isZh ? (
                  <>
                    💡 系统精算推荐：您当前的上下文长度和复用频次已达到拐点，强烈建议在代码中显式开启 Prompt Caching，预计可为您节省{' '}
                    <span className="font-mono font-semibold text-purple-300">${formatCost(result.cacheSavingsMonthly)}</span>。
                  </>
                ) : (
                  <>
                    💡 System recommendation: Your current context length and reuse frequency have reached the break-even point. Explicitly enable Prompt Caching in code to save an estimated{' '}
                    <span className="font-mono font-semibold text-purple-300">${formatCost(result.cacheSavingsMonthly)}</span>.
                  </>
                )}
              </span>
            )}
          </span>
        </span>
      )}
    </span>
  );
}

function formatSavingsPercent(savings: number, baseline: number): string {
  if (baseline <= 0) return '0%';
  return `${Math.round((savings / baseline) * 100)}%`;
}

function getDefaultModel(provider: string): string {
  const defaults: Record<string, string> = {
    anthropic: 'claude-sonnet-4.6',
    openai: 'gpt-5.4',
    google: 'gemini-3.1-pro',
    deepseek: 'deepseek-v4-flash',
  };
  return defaults[provider] || 'claude-sonnet-4.6';
}
