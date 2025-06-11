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
          'bg-gray3 t4 hover:bg-gray4 h-6 w-20 rounded-[4px] text-center text-white md:h-8 md:w-25',
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
