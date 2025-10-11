'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import SocialLinks from './SocialLinks';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: 'about', label: 'ABOUT' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
];

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, activeSection, onNavigate }) => {
  const handleNavigate = (section: string) => {
    onNavigate(section);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white dark:bg-slate-900 shadow-2xl z-50 lg:hidden"
          >
            <div className="flex flex-col h-full p-8">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="self-end p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="mt-8 mb-12">
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  Your Name
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">Frontend Developer</p>
              </div>

              {/* Navigation */}
              <nav className="flex-1">
                <ul className="space-y-6">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.id;
                    return (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <button
                          onClick={() => handleNavigate(item.id)}
                          className={`flex items-center gap-4 py-2 text-left transition-colors ${
                            isActive
                              ? 'text-slate-900 dark:text-slate-100'
                              : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          <span
                            className={`h-px transition-all ${
                              isActive
                                ? 'w-16 bg-slate-900 dark:bg-slate-100'
                                : 'w-8 bg-slate-300 dark:bg-slate-600'
                            }`}
                          />
                          <span className="text-sm font-bold tracking-widest">{item.label}</span>
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                <SocialLinks />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
