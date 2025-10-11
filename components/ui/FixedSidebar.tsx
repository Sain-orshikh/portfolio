import React from 'react';
import { motion } from 'framer-motion';
import SocialLinks from './SocialLinks';

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

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden w-full mt-10">
        <div className="flex flex-col items-start px-6 py-4 gap-2">
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-slate-100">Sain-Orshikh.N</h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-300 mb-3">Web Developer</h2>
          <p className="text-slate-400 max-w-sm leading-relaxed text-[17px]">Building modern web applications with React, TypeScript, and Next.js</p>
          <div className="pt-2"><SocialLinks /></div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:block lg:fixed lg:top-0 lg:left-0 lg:w-1/2 lg:h-screen"
      >
        <div className="h-full ml-16 xl:ml-24 2xl:ml-64 flex flex-col justify-between p-12 xl:p-24">
          {/* Header Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-slate-100">
                Sain-Orshikh.N
              </h1>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-300 mb-6">
                Web Developer
              </h2>
              <p className="text-slate-400 max-w-sm leading-relaxed text-[17px]">
                Building modern web applications with React, TypeScript, and Next.js
              </p>
            </motion.div>

            {/* Navigation */}
            <nav className="mt-16" aria-label="Main navigation">
              <ul className="space-y-2">
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

      {/* No mobile menu, just show header and socials */}
    </>
  );
};

export default FixedSidebar;
