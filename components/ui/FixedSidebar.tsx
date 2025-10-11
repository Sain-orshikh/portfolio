'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import SocialLinks from './SocialLinks';
import MobileMenu from './MobileMenu';

interface FixedSidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: 'about', label: 'ABOUT' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
];

const FixedSidebar: React.FC<FixedSidebarProps> = ({ activeSection, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-slate-100">
              Sain Orshikh
            </h1>
            <p className="text-xs text-slate-400">High School Student • Developer</p>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:block lg:fixed lg:top-0 lg:left-0 lg:w-1/2 lg:h-screen"
      >
        <div className="h-full ml-[25%] flex flex-col justify-between p-12 xl:p-24">
          {/* Header Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-slate-100">
                Sain Orshikh
              </h1>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-300 mb-2">
                High School Student
              </h2>
              <p className="text-sm text-slate-400 mb-4">
                Grade 12 • Mongol Aspiration International School
              </p>
              <p className="text-slate-400 max-w-sm leading-relaxed">
                Building modern web applications with React, TypeScript, and Next.js
              </p>
            </motion.div>

            {/* Navigation */}
            <nav className="mt-16" aria-label="Main navigation">
              <ul className="space-y-4">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <button
                        onClick={() => onNavigate(item.id)}
                        className={`group flex items-center py-3 transition-all ${
                          isActive ? 'text-slate-100' : 'text-slate-400'
                        }`}
                      >
                        <span
                          className={`h-px mr-4 transition-all ${
                            isActive
                              ? 'w-16 bg-slate-100'
                              : 'w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-300'
                          }`}
                        />
                        <span
                          className={`text-xs font-bold tracking-widest transition-all ${
                            isActive ? 'text-slate-100' : 'group-hover:text-slate-100'
                          }`}
                        >
                          {item.label}
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Social Links at Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <SocialLinks />
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={onNavigate}
      />
    </>
  );
};

export default FixedSidebar;
