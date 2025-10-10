import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="mt-32 py-12 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <a 
              href="#" 
              aria-label="GitHub" 
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:scale-110"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              aria-label="LinkedIn" 
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:scale-110"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:your.email@example.com" 
              aria-label="Email" 
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:scale-110"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
          
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            Designed & built with <span className="text-red-500">♥</span> using Next.js, TypeScript & Tailwind CSS
          </p>
          
          <p className="text-xs text-slate-500 dark:text-slate-500">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
