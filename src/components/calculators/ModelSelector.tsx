'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  getModelById,
  getModelsByProvider,
  modelPricing,
  providers,
  type ModelPricingRecord,
} from '@/lib/data/modelPricing';
import type { CustomModelData } from '@/lib/calculators/apiCost';

interface ModelSelectorProps {
  value: string;
  onChange: (modelId: string) => void;
  filterProvider?: string;
  onCustomModelChange?: (model: CustomModelData | null) => void;
  customModel?: CustomModelData | null;
  allowCustom?: boolean;
}

export default function ModelSelector({
  value,
  onChange,
  filterProvider,
  onCustomModelChange,
  customModel,
  allowCustom = false,
}: ModelSelectorProps) {
  const isCustom = value === 'custom';
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredModels = filterProvider ? getModelsByProvider(filterProvider) : modelPricing;
  const selectedModel = getModelById(value) ?? filteredModels[0];

  const groupedModels = useMemo(
    () => providers
      .map((provider) => ({
        ...provider,
        models: filteredModels.filter((m) => m.provider === provider.provider),
      }))
      .filter((group) => group.models.length > 0),
    [filteredModels]
  );

  const defaultModelId = filteredModels[0]?.id || 'claude-sonnet-4.6';

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-400 mb-1.5">
        <span className="text-sm opacity-60">🤖</span>
        Model
      </label>
      {!isCustom ? (
        <>
          <div ref={containerRef} className="relative flex gap-2">
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setIsOpen((open) => !open);
                }
              }}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              className="flex-1 min-w-0 px-3 py-2.5 text-sm font-semibold text-white bg-white/[0.03] border border-white/[0.08] rounded-xl focus:outline-none focus:border-purple-500/50 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)] transition-all cursor-pointer"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-2">
                  <span className="truncate">{selectedModel?.displayName || 'Select model'}</span>
                  {selectedModel?.id === 'deepseek-v4-pro' && <DeepSeekPromoBadge />}
                </span>
                <span className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
              </span>
            </button>
            {allowCustom && (
              <button
                type="button"
                onClick={() => {
                  onChange('custom');
                  onCustomModelChange?.({ name: '', inputPricePerM: 0, outputPricePerM: 0 });
                  setIsOpen(false);
                }}
                className="px-3 py-2.5 text-xs font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-xl hover:bg-purple-500/20 transition-colors whitespace-nowrap"
              >
                ✏️ Custom
              </button>
            )}
            {isOpen && (
              <div
                role="listbox"
                className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-white/[0.08] bg-[#111827]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl"
              >
                {groupedModels.map((group) => (
                  <div key={group.id} className="py-1">
                    <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                      {group.name}
                    </div>
                    <div className="space-y-0.5">
                      {group.models.map((model) => (
                        <ModelOption
                          key={model.id}
                          model={model}
                          selected={model.id === selectedModel?.id}
                          onSelect={() => {
                            onChange(model.id);
                            onCustomModelChange?.(null);
                            setIsOpen(false);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {selectedModel && <ModelInfo model={selectedModel} />}
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => {
              onChange(defaultModelId);
              onCustomModelChange?.(null);
            }}
            className="w-full py-2 mb-2 text-xs font-medium text-gray-400 bg-white/[0.03] border border-white/[0.08] rounded-xl hover:bg-white/[0.06] transition-colors flex items-center justify-center gap-1.5"
          >
            <span>←</span>
            Back to Models
          </button>
          <CustomModelInputs model={customModel ?? null} onChange={onCustomModelChange ?? (() => {})} />
        </>
      )}
    </div>
  );
}

function ModelOption({
  model,
  selected,
  onSelect,
}: {
  model: ModelPricingRecord;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      onClick={onSelect}
      className={`w-full rounded-lg px-3 py-2 text-left transition-colors focus:outline-none focus:bg-purple-500/10 ${
        selected
          ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
          : 'text-gray-400 border border-transparent hover:bg-white/[0.04] hover:text-white'
      }`}
    >
      <span className="flex items-center justify-between gap-3">
        <span className="min-w-0 truncate text-sm font-medium">{model.displayName}</span>
        {model.id === 'deepseek-v4-pro' && <DeepSeekPromoBadge />}
      </span>
      <span className="mt-0.5 block text-[10px] font-mono text-gray-600">
        ${model.inputPricePerM}/M in · ${model.outputPricePerM}/M out
      </span>
    </button>
  );
}

function CustomModelInputs({
  model,
  onChange,
}: {
  model: CustomModelData | null;
  onChange: (model: CustomModelData) => void;
}) {
  const name = model?.name || '';
  const inputPrice = model?.inputPricePerM ?? 0;
  const outputPrice = model?.outputPricePerM ?? 0;

  return (
    <div className="mt-2 space-y-2 p-3 bg-purple-500/5 border border-purple-500/20 rounded-xl">
      <div>
        <label className="text-[10px] text-gray-500 mb-0.5 block">Model Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => onChange({ name: e.target.value, inputPricePerM: inputPrice, outputPricePerM: outputPrice })}
          placeholder="e.g. My Custom LLM"
          className="w-full px-3 py-2 text-sm font-mono text-white bg-white/[0.03] border border-white/[0.08] rounded-lg focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-700"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] text-gray-500 mb-0.5 block">Input $/M tokens</label>
          <input
            type="number"
            value={inputPrice || ''}
            onChange={(e) => onChange({ name, inputPricePerM: Number(e.target.value) || 0, outputPricePerM: outputPrice })}
            min={0}
            step={0.01}
            className="w-full px-3 py-2 text-sm font-mono text-white bg-white/[0.03] border border-white/[0.08] rounded-lg focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-700"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="text-[10px] text-gray-500 mb-0.5 block">Output $/M tokens</label>
          <input
            type="number"
            value={outputPrice || ''}
            onChange={(e) => onChange({ name, inputPricePerM: inputPrice, outputPricePerM: Number(e.target.value) || 0 })}
            min={0}
            step={0.01}
            className="w-full px-3 py-2 text-sm font-mono text-white bg-white/[0.03] border border-white/[0.08] rounded-lg focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-700"
            placeholder="0.00"
          />
        </div>
      </div>
    </div>
  );
}

function ModelInfo({ model }: { model: ModelPricingRecord }) {
  return (
    <div className="mt-2 space-y-1.5">
      {model.id === 'deepseek-v4-pro' && (
        <div className="flex justify-end">
          <DeepSeekPromoBadge />
        </div>
      )}
      <div className="grid grid-cols-2 gap-1.5">
        <div className="flex justify-between bg-purple-500/10 border border-purple-500/20 rounded-lg px-2.5 py-1.5 text-xs">
          <span className="text-gray-500">Input</span>
          <span className="font-mono font-semibold text-purple-400">${model.inputPricePerM}/M</span>
        </div>
        <div className="flex justify-between bg-cyan-500/10 border border-cyan-500/20 rounded-lg px-2.5 py-1.5 text-xs">
          <span className="text-gray-500">Output</span>
          <span className="font-mono font-semibold text-cyan-400">${model.outputPricePerM}/M</span>
        </div>
      </div>
    </div>
  );
}

export function DeepSeekPromoBadge() {
  return (
    <span className="shrink-0 bg-red-500/20 text-red-400 border border-red-500/50 text-xs px-2 py-0.5 rounded-full animate-pulse">
      🔥 $0.435/M (75% Off Permanent)
    </span>
  );
}
