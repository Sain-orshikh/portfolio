import React from 'react';
import { motion } from 'framer-motion';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'ghost' | 'solid';
};

const Button: React.FC<Props> = ({ children, className = '', variant = 'solid', ...rest }) => {
  const base =
    'inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const styles =
    variant === 'solid'
      ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-400 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40'
      : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400';

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      className={`${base} ${styles} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default Button;
