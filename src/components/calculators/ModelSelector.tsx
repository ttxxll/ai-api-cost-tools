'use client';

import {
  modelPricing,
  providers,
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

  const filteredModels = filterProvider
    ? modelPricing.filter((m) => m.provider === filterProvider)
    : modelPricing;

  const groupedModels = providers
    .map((provider) => ({
      ...provider,
      models: filteredModels.filter((m) => m.provider === provider.id),
    }))
    .filter((group) => group.models.length > 0);

  const defaultModelId = filteredModels[0]?.id || 'claude-sonnet-4.6';

  return (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-400 mb-1.5">
        <span className="text-sm opacity-60">🤖</span>
        Model
      </label>
      {!isCustom ? (
        <>
          <div className="flex gap-2">
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 px-3 py-2.5 text-sm font-semibold text-white bg-white/[0.03] border border-white/[0.08] rounded-xl focus:outline-none focus:border-purple-500/50 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)] transition-all appearance-none cursor-pointer"
            >
              {groupedModels.map((group) => (
                <optgroup key={group.id} label={group.name} className="bg-[#111827] text-gray-300">
                  {group.models.map((model) => (
                    <option key={model.id} value={model.id} className="bg-[#111827]">
                      {model.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            {allowCustom && (
              <button
                onClick={() => {
                  onChange('custom');
                  onCustomModelChange?.({ name: '', inputPricePerMillion: 0, outputPricePerMillion: 0 });
                }}
                className="px-3 py-2.5 text-xs font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-xl hover:bg-purple-500/20 transition-colors whitespace-nowrap"
              >
                ✏️ Custom
              </button>
            )}
          </div>
          {value && <ModelInfo modelId={value} />}
        </>
      ) : (
        <>
          <button
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

function CustomModelInputs({
  model,
  onChange,
}: {
  model: CustomModelData | null;
  onChange: (model: CustomModelData) => void;
}) {
  const name = model?.name || '';
  const inputPrice = model?.inputPricePerMillion ?? 0;
  const outputPrice = model?.outputPricePerMillion ?? 0;

  return (
    <div className="mt-2 space-y-2 p-3 bg-purple-500/5 border border-purple-500/20 rounded-xl">
      <div>
        <label className="text-[10px] text-gray-500 mb-0.5 block">Model Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => onChange({ name: e.target.value, inputPricePerMillion: inputPrice, outputPricePerMillion: outputPrice })}
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
            onChange={(e) => onChange({ name, inputPricePerMillion: Number(e.target.value) || 0, outputPricePerMillion: outputPrice })}
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
            onChange={(e) => onChange({ name, inputPricePerMillion: inputPrice, outputPricePerMillion: Number(e.target.value) || 0 })}
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

function ModelInfo({ modelId }: { modelId: string }) {
  const model = modelPricing.find((m) => m.id === modelId);
  if (!model) return null;

  return (
    <div className="mt-2 grid grid-cols-2 gap-1.5">
      <div className="flex justify-between bg-purple-500/10 border border-purple-500/20 rounded-lg px-2.5 py-1.5 text-xs">
        <span className="text-gray-500">Input</span>
        <span className="font-mono font-semibold text-purple-400">${model.inputPricePerMillion}/M</span>
      </div>
      <div className="flex justify-between bg-cyan-500/10 border border-cyan-500/20 rounded-lg px-2.5 py-1.5 text-xs">
        <span className="text-gray-500">Output</span>
        <span className="font-mono font-semibold text-cyan-400">${model.outputPricePerMillion}/M</span>
      </div>
    </div>
  );
}
