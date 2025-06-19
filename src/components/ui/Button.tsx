type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'main' | 'sub' | 'outline';
  className?: string;
};

export default function Button({
  children,
  onClick,
  variant = 'main',
  className = '',
}: ButtonProps) {
  const base = 'w-1/2 py-2 rounded-[4px] t4 md:w-[200px]';
  const variants = {
    main: 'bg-main text-white ',
    sub: 'bg-sub1 text-white ',
    outline: 'bg-bg-white text-black',
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
