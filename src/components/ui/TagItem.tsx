import { X } from 'lucide-react';

interface TagItemProps {
  label: string;
  onDelete: () => void;
}

export default function TagItem({ label, onDelete }: TagItemProps) {
  return (
    <>
      <div className="flex items-center gap-1 rounded-sm bg-[var(--color-sub1)] px-2 py-1 text-xs text-white md:text-sm">
        {label}
        <button onClick={onDelete} type="button">
          <X className="h-[14px] w-[14px] md:h-[16px] md:w-[16px]" />
        </button>
      </div>
    </>
  );
}
