'use client';

interface AdPlaceholderProps {
  slot?: string;
  format?: 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

export default function AdPlaceholder({
  slot = 'ad-slot',
  format = 'horizontal',
  className = '',
}: AdPlaceholderProps) {
  const dimensions = {
    horizontal: 'h-[90px] max-w-[728px]',
    vertical: 'h-[600px] max-w-[160px]',
    rectangle: 'h-[250px] max-w-[300px]',
  };

  return (
    <div
      className={`w-full mx-auto ${dimensions[format]} flex items-center justify-center ${className}`}
      data-ad-slot={slot}
    >
      {/* Ad slot - will be populated by AdSense script */}
    </div>
  );
}
