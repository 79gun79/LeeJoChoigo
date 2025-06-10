import { NavLink, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';

interface DropdownItem {
  name: string;
  path: string;
}

interface DropdownMenuProps {
  items: DropdownItem[];
  className?: string;
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
}: DropdownMenuProps) {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      <motion.div
        className={`absolute right-0 z-50 mt-2 flex flex-col rounded-md border bg-white whitespace-nowrap drop-shadow-md ${className}`}
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
                `${isActive ? 'text-main' : ''} t4 block px-4 py-2 font-normal`
              }
              onClick={(e) => {
                e.preventDefault();
                navigate(item.path);
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
