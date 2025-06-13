import { NavLink, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface DropdownItem {
  name: string;
  path: string;
  classname?: string;
}
interface DropdownMenuProps {
  items: DropdownItem[];
  onItemClick?: (path: string) => void;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  closed?: () => void;
}

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 500, damping: 20 },
  },
  exit: { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04 },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.1 } },
};

export default function DropdownMenu({
  items,
  className = '',
  onItemClick,
  isOpen,
  onClose,
  closed,
}: DropdownMenuProps) {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  // 바깥 클릭 감지
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        className={`absolute z-50 mt-2 flex flex-col rounded-md border bg-white whitespace-nowrap drop-shadow-md ${className}`}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={dropdownVariants}
      >
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `${isActive ? 'text-main font-bold' : ''} t4 hover:text-main block px-4 py-2 font-normal`
              }
              onClick={(e) => {
                e.preventDefault();
                if (onItemClick) {
                  onItemClick(item.path);
                } else {
                  navigate(item.path);
                  onClose();
                  if (closed) closed();
                }
              }}
            >
              {item.name}
            </NavLink>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
