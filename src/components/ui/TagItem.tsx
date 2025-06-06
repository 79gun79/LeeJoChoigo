import { X } from 'lucide-react';

export default function TagItem() {
  return (
    <>
      <div className="flex items-center gap-1 rounded-sm bg-[var(--color-sub1)] px-2 py-1 text-xs text-white md:text-sm">
        태그명
        <button>
          <X className="h-[14px] w-[14px] md:h-[16px] md:w-[16px]" />
        </button>
      </div>
    </>
  );
}
