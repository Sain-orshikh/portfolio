import React from 'react';
import ThemeToggle from './ThemeToggle';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl flex items-center justify-between h-16">
        <a href="#home" className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-500 hover:to-purple-500 transition-all">
          YourName
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a 
              key={l.id} 
              href={`#${l.id}`} 
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <button aria-label="menu" className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Menu size={20} />
            </button>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
