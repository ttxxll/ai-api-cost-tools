interface AdSlotProps {
  slot?: string;
  format?: 'horizontal' | 'vertical' | 'rectangle';
}

export default function AdSlot({ slot, format = 'horizontal' }: AdSlotProps) {
  const dimensions = {
    horizontal: 'h-24',
    vertical: 'h-64',
    rectangle: 'h-48',
  };

  return (
    <div
      className={`bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center ${dimensions[format]} my-8`}
      data-ad-slot={slot}
    >
      <span className="text-sm text-gray-400 dark:text-gray-500">
        Advertisement
      </span>
    </div>
  );
}
