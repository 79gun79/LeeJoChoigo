import { useState } from 'react';
import { CheckCircle, FileText, HelpCircle } from 'lucide-react';
import { NavLink } from 'react-router';
import DropdownMenu from '../modals/DropdownMenu';

interface MenuItem {
  name: string;
  path: string;
  requiresLogin?: boolean;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  subItems?: { name: string; path: string }[];
}

interface NavigationProps {
  onProtectedRoute: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  direction?: 'horizontal' | 'vertical';
  className?: string;
  closed?: () => void;
}

const menuItems: MenuItem[] = [
  {
    name: '문제게시판',
    path: '/problems',
    // requiresLogin: true,
    Icon: FileText,
    subItems: [
      { name: '알고리즘문제', path: '/problems/coding' },
      { name: '개발직군문제', path: '/problems/job' },
    ],
  },
  {
    name: '풀이게시판',
    path: '/solutions',
    Icon: CheckCircle,
    subItems: [
      { name: '알고리즘풀이', path: '/solutions/coding' },
      { name: '개발직군풀이', path: '/solutions/job' },
    ],
  },
  { name: '질문게시판', path: '/questions', Icon: HelpCircle },
];

export default function Navigation({
  onProtectedRoute,
  direction = 'horizontal',
  className = '',
  closed,
}: NavigationProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const layout =
    direction === 'vertical'
      ? 'h5 flex-col flex gap-4 items-start pt-4 ml-4'
      : 't4 hidden md:flex md:gap-10 lg:gap-16';

  const handleMenuClick = (
    item: MenuItem,
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    if (item.requiresLogin) {
      onProtectedRoute(e);
    }
    if (item.subItems) {
      e.preventDefault();
      setOpenMenu(openMenu === item.name ? null : item.name);
    } else {
      if (closed) closed();
    }
  };

  return (
    <nav
      className={`font-medium ${layout} md:text-base lg:text-lg ${className}`}
    >
      {menuItems.map((item) => {
        const Icon = item.Icon;
        const isOpen = openMenu === item.name;
        return (
          <div key={item.name} className="relative">
            <NavLink
              to={item.path}
              onClick={(e) => handleMenuClick(item, e)}
              className={({ isActive }) =>
                `after:bg-main relative px-1 py-1 after:absolute after:bottom-0 after:left-7 after:h-[2px] after:w-0 after:transition-all after:duration-200 hover:after:w-full md:after:left-0 ${
                  isActive
                    ? 'text-main font-bold after:w-3/4 md:after:w-full'
                    : ''
                } flex items-center`
              }
            >
              {Icon && (
                <Icon
                  className="mr-2 h-5 w-5 md:hidden"
                  aria-hidden="true"
                  strokeWidth={2}
                />
              )}
              {item.name}
              {item.subItems && <span className="t5 ml-1"></span>}
            </NavLink>
            {/* 서브 메뉴 */}
            {item.subItems && isOpen && (
              <DropdownMenu
                isOpen={isOpen}
                closed={closed}
                onClose={() => setOpenMenu(null)}
                items={item.subItems}
                className="absolute top-full left-7 md:left-0"
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
