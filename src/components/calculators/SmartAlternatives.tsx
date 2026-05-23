'use client';

import { useMemo, useState } from 'react';
import {
  calculateSmartAlternatives,
  formatCost,
  type SmartAlternativeBadge,
} from '@/lib/calculators/apiCost';
import { modelPricing } from '@/lib/data/modelPricing';

interface SmartAlternativesProps {
  isZh: boolean;
  currentModelId?: string;
  inputTokens: number;
  outputTokens: number;
  requestsPerCall: number;
  callsPerDay: number;
  cacheHitRate: number;
  promptCachingEnabled: boolean;
  cacheTtlHours: number;
  batchModeEnabled: boolean;
}

export default function SmartAlternatives({
  isZh,
  currentModelId,
  inputTokens,
  outputTokens,
  requestsPerCall,
  callsPerDay,
  cacheHitRate,
  promptCachingEnabled,
  cacheTtlHours,
  batchModeEnabled,
}: SmartAlternativesProps) {
  const [expanded, setExpanded] = useState(false);
  const [preferredModelIds, setPreferredModelIds] = useState<string[]>([]);
  const selectableModels = useMemo(
    () => modelPricing.filter((model) => model.id !== currentModelId),
    [currentModelId]
  );
  const hasPreferredModels = preferredModelIds.length > 0;
  const alternatives = useMemo(
    () => calculateSmartAlternatives({
      currentModelId,
      inputTokens,
      outputTokens,
      requestsPerCall,
      callsPerDay,
      cacheHitRate,
      promptCachingEnabled,
      cacheTtlHours,
      batchModeEnabled,
      preferredModelIds,
      locale: isZh ? 'zh' : 'en',
      limit: 3,
    }),
    [
      batchModeEnabled,
      cacheHitRate,
      cacheTtlHours,
      callsPerDay,
      currentModelId,
      inputTokens,
      isZh,
      outputTokens,
      preferredModelIds,
      promptCachingEnabled,
      requestsPerCall,
    ]
  );

  const togglePreferredModel = (modelId: string) => {
    setPreferredModelIds((selectedIds) =>
      selectedIds.includes(modelId)
        ? selectedIds.filter((selectedId) => selectedId !== modelId)
        : [...selectedIds, modelId]
    );
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="w-full rounded-xl border border-indigo-700/50 bg-indigo-900/20 px-4 py-3 text-left text-sm font-medium text-indigo-200 shadow-[0_0_24px_rgba(99,102,241,0.12)] transition-all hover:border-indigo-500/60 hover:bg-indigo-900/40 hover:text-white"
      >
        <span className="flex items-center justify-between gap-3">
          <span>
            {isZh
              ? '💡 发现更优方案？点击横向对比其他模型的同等任务开销'
              : '💡 Found a better option? Compare this workload across other models'}
          </span>
          <span className={`text-indigo-300 transition-transform ${expanded ? 'rotate-180' : ''}`}>▾</span>
        </span>
      </button>

      {expanded && (
        <div className="mt-3 space-y-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 animate-[tooltip-enter_150ms_ease-out_forwards]">
          <div className="rounded-xl border border-gray-700/50 bg-gray-900/40 p-3">
            <div className="mb-2 text-xs text-gray-400">
              {isZh
                ? '🔍 默认推荐最平价方案。您也可指定倾向模型进行对比：'
                : '🔍 Defaulting to cheapest alternatives. Select specific models to compare:'}
            </div>
            <div className="flex flex-wrap gap-2">
              {selectableModels.map((model) => {
                const selected = preferredModelIds.includes(model.id);

                return (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => togglePreferredModel(model.id)}
                    aria-pressed={selected}
                    className={`rounded-full border px-2.5 py-1 text-[11px] transition-all duration-200 ${
                      selected
                        ? 'border-indigo-400/70 bg-indigo-500/15 text-indigo-100 shadow-[0_0_14px_rgba(99,102,241,0.16)]'
                        : 'border-gray-700 bg-gray-800/70 text-gray-300 hover:border-gray-500 hover:bg-gray-700/70 hover:text-white'
                    }`}
                  >
                    {model.displayName}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between px-1 text-[10px] uppercase tracking-wider text-gray-600">
            <span>{isZh ? '智能平替比价' : 'Smart Alternatives'}</span>
            <span>
              {hasPreferredModels
                ? isZh
                  ? `已选 ${alternatives.length}`
                  : `${alternatives.length} selected`
                : `Top ${alternatives.length}`}
            </span>
          </div>
          {alternatives.length > 0 ? (
            alternatives.map((candidate, index) => (
              <div
                key={candidate.model.id}
                className={`rounded-xl border p-3 transition-all duration-200 ${
                  candidate.unavailable
                    ? 'border-red-500/30 bg-red-950/10 opacity-80'
                    : 'border-white/[0.06] bg-[#0B1220]/70 hover:border-indigo-500/30 hover:bg-indigo-950/20'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/10 text-[10px] font-bold text-indigo-300">
                        {index + 1}
                      </span>
                      <span className="font-medium text-white">{candidate.model.displayName}</span>
                      <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] text-gray-500">
                        {candidate.model.provider}
                      </span>
                    </div>
                    {candidate.badges.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {candidate.badges.map((badge) => (
                          <AlternativeBadge key={`${candidate.model.id}-${badge.label}`} badge={badge} />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    {candidate.unavailable ? (
                      <>
                        <div className="text-xs font-semibold text-red-300">
                          {isZh ? '超出上下文' : 'Over context'}
                        </div>
                        <div className="mt-1 text-[10px] text-gray-500">
                          {isZh ? '无法计算' : 'not available'}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="font-mono text-base font-bold text-indigo-200">
                          ${formatCost(candidate.monthlyCost)}
                        </div>
                        <div className="text-[10px] text-gray-600">
                          {isZh ? '每月估算' : 'monthly est.'}
                        </div>
                        <div className="mt-1 font-mono text-[10px] text-gray-500">
                          ${formatCost(candidate.costPerCall)} / {isZh ? '次' : 'call'}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-amber-700/50 bg-amber-900/20 p-3 text-xs text-amber-200">
              {isZh ? '没有找到满足当前上下文长度的可用平替模型。' : 'No compatible alternative models fit the current context length.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AlternativeBadge({ badge }: { badge: SmartAlternativeBadge }) {
  const classes: Record<SmartAlternativeBadge['tone'], string> = {
    muted: 'border-gray-600/50 bg-gray-800/60 text-gray-400',
    warning: 'border-amber-600/50 bg-amber-900/30 text-amber-300',
    info: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300',
    danger: 'border-red-500/50 bg-red-500/10 text-red-300',
  };

  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] ${classes[badge.tone]}`}>
      {badge.label}
    </span>
  );
}
