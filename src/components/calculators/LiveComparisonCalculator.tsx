'use client';

import { useMemo, useState, Fragment } from 'react';
import Link from 'next/link';
import { MODELS_DATA, type ModelPricingRecord } from '@/lib/data/modelPricing';
import { tools } from '@/lib/content/tools';

interface ModelCostCalculation extends ModelPricingRecord {
  costPerCall: number;
  totalCost: number;
}

type UnitMode = 'tokens' | 'words' | 'characters';
type SortField = 'provider' | 'name' | 'input' | 'output' | 'total';
type SortDirection = 'asc' | 'desc';

const WORDS_TO_TOKENS = 1.33;
const CHARS_TO_TOKENS = 0.25;

const DEFAULT_PROVIDERS = ['OpenAI', 'Anthropic', 'Google', 'xAI', 'DeepSeek', 'Mistral'];
const MAX_MODELS_PER_PROVIDER = 5;

const PROVIDER_FILTERS: Record<string, (m: ModelPricingRecord) => boolean> = {
  OpenAI: (m) => /gpt-5\.[45]/i.test(m.id) || /gpt-5\.[45]/i.test(m.displayName),
  Anthropic: (m) => /claude-(opus|sonnet|haiku)-4/i.test(m.id),
  Google: (m) => /gemini-3\.1|gemini-2\.5/i.test(m.id) || /gemini 3\.1|gemini 2\.5/i.test(m.displayName),
  DeepSeek: (m) => /deepseek/i.test(m.id),
};

const providerIcons: Record<string, string> = {
  OpenAI: '🟢',
  Anthropic: '🟠',
  Google: '🔵',
  DeepSeek: '🟣',
  Mistral: '🟤',
  xAI: '⚫',
};

const providerColors: Record<string, string> = {
  Anthropic: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  OpenAI: 'bg-green-500/10 text-green-400 border-green-500/20',
  Google: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  DeepSeek: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Mistral: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  xAI: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

interface SelectedModelData {
  name: string;
  inputPricePerM: number;
  outputPricePerM: number;
}

interface LiveComparisonCalculatorProps {
  locale?: 'en' | 'zh';
  onSelectModel?: (modelId: string, modelData?: SelectedModelData) => void;
}

export default function LiveComparisonCalculator({ locale = 'en', onSelectModel }: LiveComparisonCalculatorProps) {
  const isZh = locale === 'zh';
  const prefix = isZh ? '/zh' : '';

  const [unitMode, setUnitMode] = useState<UnitMode>('tokens');
  const [inputValue, setInputValue] = useState(1000);
  const [outputValue, setOutputValue] = useState(500);
  const [calls, setCalls] = useState(100);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProviders, setSelectedProviders] = useState<string[]>(DEFAULT_PROVIDERS);
  const [sortField, setSortField] = useState<SortField>('total');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const models = MODELS_DATA;

  const allProviders = useMemo(() => {
    const providers = [...new Set(models.map((m) => m.provider))];
    return providers.sort((a, b) => {
      const aIsDefault = DEFAULT_PROVIDERS.includes(a);
      const bIsDefault = DEFAULT_PROVIDERS.includes(b);
      if (aIsDefault && !bIsDefault) return -1;
      if (!aIsDefault && bIsDefault) return 1;
      return a.localeCompare(b);
    });
  }, [models]);

  function toggleProvider(provider: string) {
    setSelectedProviders((prev) =>
      prev.includes(provider)
        ? prev.filter((p) => p !== provider)
        : [...prev, provider]
    );
  }

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection(field === 'total' ? 'desc' : 'asc');
    }
  }

  const filteredModels = useMemo(() => {
    let result = [...models];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.displayName.toLowerCase().includes(query) ||
          m.provider.toLowerCase().includes(query) ||
          m.id.toLowerCase().includes(query)
      );
    }
    if (selectedProviders.length > 0) {
      result = result.filter((m) => selectedProviders.includes(m.provider));
    }
    return result;
  }, [models, searchQuery, selectedProviders]);

  const inputTokens =
    unitMode === 'tokens' ? inputValue
      : unitMode === 'words' ? Math.round(inputValue * WORDS_TO_TOKENS)
      : Math.round(inputValue * CHARS_TO_TOKENS);

  const outputTokens =
    unitMode === 'tokens' ? outputValue
      : unitMode === 'words' ? Math.round(outputValue * WORDS_TO_TOKENS)
      : Math.round(outputValue * CHARS_TO_TOKENS);

  const groupedForRender = useMemo(() => {
    const calculations: ModelCostCalculation[] = filteredModels.map((model) => {
      const inputCostPerCall = (inputTokens * model.inputPricePerM) / 1000000;
      const outputCostPerCall = (outputTokens * model.outputPricePerM) / 1000000;
      const costPerCall = inputCostPerCall + outputCostPerCall;
      const totalCost = costPerCall * calls;
      return { ...model, costPerCall, totalCost };
    });

    const grouped = new Map<string, ModelCostCalculation[]>();
    for (const calc of calculations) {
      const group = grouped.get(calc.provider) || [];
      group.push(calc);
      grouped.set(calc.provider, group);
    }

    for (const [, group] of grouped) {
      group.sort((a, b) => {
        let comparison = 0;
        switch (sortField) {
          case 'provider': comparison = a.provider.localeCompare(b.provider); break;
          case 'name': comparison = a.displayName.localeCompare(b.displayName); break;
          case 'input': comparison = a.inputPricePerM - b.inputPricePerM; break;
          case 'output': comparison = a.outputPricePerM - b.outputPricePerM; break;
          case 'total': comparison = a.totalCost - b.totalCost; break;
        }
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    const groups: { provider: string; models: ModelCostCalculation[] }[] = [];
    const providerOrder = DEFAULT_PROVIDERS.filter((p) => grouped.has(p));
    for (const [provider] of grouped) {
      if (!providerOrder.includes(provider)) providerOrder.push(provider);
    }
    for (const provider of providerOrder) {
      let models = grouped.get(provider) || [];
      const filter = PROVIDER_FILTERS[provider];
      if (filter) {
        models = models.filter((m) => filter(m));
      }
      if (models.length > 0) {
        groups.push({ provider, models: models.slice(0, MAX_MODELS_PER_PROVIDER) });
      }
    }
    return groups;
  }, [filteredModels, inputTokens, outputTokens, calls, sortField, sortDirection]);

  const allCalculations = groupedForRender.flatMap((g) => g.models);
  const cheapest = allCalculations.length > 0
    ? Math.min(...allCalculations.map((c) => c.totalCost))
    : 0;

  function renderSortIndicator(field: SortField) {
    if (sortField !== field) return <span className="text-gray-600">↕</span>;
    return <span className="text-purple-400">{sortDirection === 'asc' ? '↑' : '↓'}</span>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Sidebar */}
      <aside className="lg:w-56 shrink-0">
        <div className="sticky top-20 space-y-5">
          {/* Tools List */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
              {isZh ? '工具箱' : 'Tools'}
            </h3>
            <div className="space-y-0.5">
              {tools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`${prefix}/${tool.slug}`}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:text-gray-300 hover:bg-white/[0.03] transition-colors"
                >
                  <span className="text-sm">{tool.icon}</span>
                  <span>{isZh ? getToolNameZh(tool.id) : getToolNameEn(tool.id)}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Provider Filter */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
              {isZh ? '厂商筛选' : 'Providers'}
            </h3>
            <div className="space-y-0.5">
              {allProviders.map((provider) => {
                const count = models.filter((m) => m.provider === provider).length;
                const isSelected = selectedProviders.includes(provider);
                return (
                  <button
                    key={provider}
                    onClick={() => toggleProvider(provider)}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      isSelected
                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.03] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded border flex items-center justify-center ${
                        isSelected ? 'bg-purple-500 border-purple-500' : 'border-white/[0.15]'
                      }`}>
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                            <path d="M3 6L5 8L9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className="text-xs">{provider}</span>
                    </div>
                    <span className="text-xs text-gray-600">{count}</span>
                  </button>
                );
              })}
            </div>
            {selectedProviders.length > 0 && (
              <button
                onClick={() => setSelectedProviders([])}
                className="w-full mt-1 px-3 py-1 text-xs text-gray-600 hover:text-gray-400"
              >
                {isZh ? '清除' : 'Clear'}
              </button>
            )}
          </div>

          {/* Status */}
          <div className="px-3 text-[10px] text-gray-600">
            {isZh ? '数据来自 OpenRouter 静态同步' : 'Static OpenRouter pricing'}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Compact Input Bar */}
        <div className="glass-card p-4 mb-4">
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500">
                {isZh ? '单位:' : 'Unit:'}
              </span>
              <div className="flex rounded-lg border border-white/[0.08] overflow-hidden text-xs">
                {(['tokens', 'words', 'characters'] as UnitMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setUnitMode(mode)}
                    className={`px-2.5 py-1 font-medium transition-colors ${
                      unitMode === mode
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-transparent text-gray-500 hover:text-gray-300 hover:bg-white/[0.03]'
                    }`}
                  >
                    {isZh ? getUnitLabelZh(mode) : mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <label className="text-xs text-gray-500">{isZh ? '输入' : 'In'}</label>
              <input
                type="number"
                value={inputValue || ''}
                onChange={(e) => setInputValue(Number(e.target.value) || 0)}
                min={0}
                className="w-20 px-2 py-1 text-xs font-mono bg-white/[0.03] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <label className="text-xs text-gray-500">{isZh ? '输出' : 'Out'}</label>
              <input
                type="number"
                value={outputValue || ''}
                onChange={(e) => setOutputValue(Number(e.target.value) || 0)}
                min={0}
                className="w-20 px-2 py-1 text-xs font-mono bg-white/[0.03] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <label className="text-xs text-gray-500">{isZh ? '次数' : 'Calls'}</label>
              <input
                type="number"
                value={calls || ''}
                onChange={(e) => setCalls(Number(e.target.value) || 0)}
                min={0}
                className="w-20 px-2 py-1 text-xs font-mono bg-white/[0.03] border border-white/[0.08] rounded-lg text-white focus:outline-none focus:border-purple-500/50"
              />
            </div>
            {unitMode !== 'tokens' && (
              <span className="text-[10px] text-gray-600">
                ≈ {inputTokens.toLocaleString()} / {outputTokens.toLocaleString()} tokens
              </span>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isZh ? '搜索模型...' : 'Search models...'}
            className="w-full pl-8 pr-8 py-2.5 text-sm bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)] transition-all"
          />
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Results Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/[0.03] border-b border-white/[0.06]">
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('provider')}>
                    <span className="inline-flex items-center gap-1">{isZh ? '厂商' : 'Provider'}{renderSortIndicator('provider')}</span>
                  </th>
                  <th className="px-3 py-2.5 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('name')}>
                    <span className="inline-flex items-center gap-1">{isZh ? '模型' : 'Model'}{renderSortIndicator('name')}</span>
                  </th>
                  <th className="px-3 py-2.5 text-right text-[11px] font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('input')}>
                    <span className="inline-flex items-center gap-1">{isZh ? '输入$/M' : 'In $/M'}{renderSortIndicator('input')}</span>
                  </th>
                  <th className="px-3 py-2.5 text-right text-[11px] font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('output')}>
                    <span className="inline-flex items-center gap-1">{isZh ? '输出$/M' : 'Out $/M'}{renderSortIndicator('output')}</span>
                  </th>
                  <th className="px-3 py-2.5 text-right text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    {isZh ? '单次' : 'Per Call'}
                  </th>
                  <th className="px-3 py-2.5 text-right text-[11px] font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('total')}>
                    <span className="inline-flex items-center gap-1">{isZh ? '总计' : 'Total'}{renderSortIndicator('total')}</span>
                  </th>
                  {onSelectModel && (
                    <th className="px-3 py-2.5 text-center text-[11px] font-semibold text-gray-400 uppercase tracking-wider w-20"></th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {groupedForRender.length === 0 ? (
                  <tr>
                    <td colSpan={onSelectModel ? 7 : 6} className="px-4 py-8 text-center text-sm text-gray-600">
                      {isZh ? '没有匹配的模型' : 'No matching models'}
                    </td>
                  </tr>
                ) : (
                  groupedForRender.map((group) => (
                    <Fragment key={group.provider}>
                      <tr className="bg-white/[0.02]">
                        <td colSpan={onSelectModel ? 7 : 6} className="px-3 py-1.5">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border ${providerColors[group.provider] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                              <span>{providerIcons[group.provider] || '⚪'}</span>
                              {group.provider}
                            </span>
                            <span className="text-[10px] text-gray-600">{group.models.length} {isZh ? '个模型' : 'models'}</span>
                          </div>
                        </td>
                      </tr>
                      {group.models.map((calc) => (
                        <tr key={calc.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-3 py-2">
                            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border ${providerColors[calc.provider] || 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                              <span>{providerIcons[calc.provider] || '⚪'}</span>
                              {calc.provider}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium text-white text-sm">{calc.displayName}</span>
                              {calc.totalCost === cheapest && cheapest > 0 && (
                                <span className="inline-flex items-center px-1 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                                  {isZh ? '最低' : 'Lowest'}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-3 py-2 text-right text-xs text-gray-500 font-mono">
                            ${calc.inputPricePerM.toFixed(2)}
                          </td>
                          <td className="px-3 py-2 text-right text-xs text-gray-500 font-mono">
                            ${calc.outputPricePerM.toFixed(2)}
                          </td>
                          <td className="px-3 py-2 text-right text-xs font-mono text-gray-300">
                            ${formatCost(calc.costPerCall)}
                          </td>
                          <td className="px-3 py-2 text-right font-mono font-semibold text-white text-sm">
                            ${formatCost(calc.totalCost)}
                            {cheapest > 0 && calc.totalCost > cheapest && (
                              <span className="text-[10px] text-gray-600 ml-0.5">
                                ({(calc.totalCost / cheapest).toFixed(1)}x)
                              </span>
                            )}
                          </td>
                          {onSelectModel && (
                            <td className="px-3 py-2 text-center">
                              <button
                                onClick={() => onSelectModel(calc.id, {
                                  name: calc.displayName,
                                  inputPricePerM: calc.inputPricePerM,
                                  outputPricePerM: calc.outputPricePerM,
                                })}
                                className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 transition-colors"
                              >
                                🧮 {isZh ? '计算' : 'Calc'}
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-3 text-[11px] text-gray-600 flex items-center justify-between">
          <span>
            {isZh
              ? `${groupedForRender.length > 0 ? groupedForRender.reduce((s, g) => s + g.models.length, 0) : 0} / ${models.length} 个模型`
              : `${groupedForRender.length > 0 ? groupedForRender.reduce((s, g) => s + g.models.length, 0) : 0} of ${models.length} models`}
          </span>
          <span>{isZh ? '数据来自 OpenRouter 静态同步' : 'via OpenRouter static sync'}</span>
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
    token: 'Token Cost', claude: 'Claude API', gpt: 'GPT API', gemini: 'Gemini API', deepseek: 'DeepSeek API',
    comparison: 'Model Comparison', budget: 'Budget Planner', monthly: 'Monthly Cost', batch: 'Batch Estimator',
  };
  return names[id] || id;
}

function getToolNameZh(id: string): string {
  const names: Record<string, string> = {
    token: 'Token 成本', claude: 'Claude API', gpt: 'GPT API', gemini: 'Gemini API', deepseek: 'DeepSeek API',
    comparison: '模型对比', budget: '预算规划', monthly: '月成本', batch: '批量估算',
  };
  return names[id] || id;
}

function getUnitLabelZh(mode: UnitMode): string {
  const labels: Record<UnitMode, string> = { tokens: 'Token', words: '单词', characters: '字符' };
  return labels[mode];
}
