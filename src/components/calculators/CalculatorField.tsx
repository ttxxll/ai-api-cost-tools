'use client';

interface CalculatorFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  type?: 'number' | 'percentage';
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  helpText?: string;
  icon?: string;
}

export default function CalculatorField({
  label,
  value,
  onChange,
  type = 'number',
  min = 0,
  max,
  step = 1,
  suffix,
  helpText,
  icon,
}: CalculatorFieldProps) {
  return (
    <div className="group">
      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-400 mb-1.5">
        {icon && <span className="text-sm opacity-60">{icon}</span>}
        {label}
      </label>
      <div className="relative">
        <input
          type={type === 'percentage' ? 'number' : type}
          value={value || ''}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          min={min}
          max={max}
          step={step}
          className="w-full px-4 py-3 text-lg font-mono font-semibold text-white bg-white/[0.03] border border-white/[0.08] rounded-xl focus:outline-none focus:border-purple-500/50 focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)] transition-all placeholder:text-gray-600"
          placeholder="0"
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-600">
            {suffix}
          </span>
        )}
      </div>
      {helpText && (
        <p className="mt-1.5 text-xs text-gray-600">
          {helpText}
        </p>
      )}
    </div>
  );
}
