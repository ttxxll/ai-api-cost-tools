'use client';

interface ResultItem {
  label: string;
  value: string;
  highlight?: boolean;
}

interface ResultBreakdownProps {
  title: string;
  items: ResultItem[];
}

export default function ResultBreakdown({ title, items }: ResultBreakdownProps) {
  return (
    <div className="glass-card p-5 transition-all duration-300 hover:border-white/[0.12]">
      <h3 className="text-sm font-semibold text-white mb-4">
        {title}
      </h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center rounded-lg px-3 py-2 ${
              item.highlight
                ? 'bg-purple-500/10 border border-purple-500/20'
                : 'bg-white/[0.03] border border-white/[0.06]'
            }`}
          >
            <span className="text-xs text-gray-500">
              {item.label}
            </span>
            <span
              className={`font-mono ${
                item.highlight
                  ? 'text-lg font-bold text-purple-400 glow-text-purple'
                  : 'text-sm text-gray-300'
              }`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
