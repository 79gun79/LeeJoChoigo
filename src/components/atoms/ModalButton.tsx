import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  className?: string;
} & React.ComponentPropsWithoutRef<'button'>;

export default function ModalButton({
  className = '',
  type = 'button',
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <>
      <button
        className={twMerge(
          'bg-gray3 hover:bg-gray4 h-8 w-25 rounded-[10px] text-center text-white md:h-10 md:w-40',
          className,
        )}
        type={type}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    </>
  );
}
