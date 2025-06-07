export default function CheckList({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return (
    <>
      <div>
        <input
          type="checkbox"
          name="tag"
          id={title + id}
          className="peer absolute appearance-none opacity-0"
        />
        <label
          htmlFor={title + id}
          className="cursor-pointer rounded-sm bg-[#dddddd] px-2 py-1 text-xs text-[var(--color-gray4)] peer-checked:bg-[#1BBFBF] peer-checked:text-white md:px-2.5 md:py-1.5 md:text-sm"
        >
          {title}
        </label>
      </div>
    </>
  );
}
