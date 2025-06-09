import { NavLink } from 'react-router';

interface MenuItem {
  name: string;
  path: string;
  requiresLogin?: boolean;
}

interface NavigationProps {
  onProtectedRoute: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

const menuItems: MenuItem[] = [
  { name: '문제게시판', path: '/problems', requiresLogin: true },
  { name: '풀이게시판', path: '/solutions' },
  { name: '질문게시판', path: '/questions' },
];

export default function Navigation({
  onProtectedRoute,
  direction = 'horizontal',
  className = '',
}: NavigationProps) {
  const layout =
    direction === 'vertical'
      ? 'h5 flex-col flex gap-4 items-start pt-10'
      : 't4 hidden md:flex md:gap-8 lg:gap-16';
  return (
    <nav className={`font-medium ${layout} lg:text-[16px] ${className}`}>
      {menuItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          onClick={item.requiresLogin ? onProtectedRoute : undefined}
          className={({ isActive }) =>
            `after:bg-main relative px-1 py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-200 hover:after:w-full ${isActive ? 'text-main font-bold after:w-full' : ''}`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}
