import React from 'react';
import Card from '../components/ui/Card';
import { motion } from 'framer-motion';
import { Code2, Palette, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="section-heading">About Me</h2>
      
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2 space-y-6">
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            I'm a frontend developer specialized in building fast, accessible, and polished user interfaces.
            I use modern tools like React, TypeScript, Tailwind CSS and Framer Motion to create delightful experiences.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="p-5">
              <Code2 className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold mb-1">Clean Code</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Maintainable & scalable</p>
            </Card>
            <Card className="p-5">
              <Palette className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold mb-1">UI/UX Focus</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Beautiful interfaces</p>
            </Card>
            <Card className="p-5">
              <Zap className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold mb-1">Performance</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Lightning fast apps</p>
            </Card>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Main Stack</h3>
              <p className="text-slate-600 dark:text-slate-400">React • TypeScript • Tailwind CSS • Framer Motion • Vite</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Tools & Platforms</h3>
              <p className="text-slate-600 dark:text-slate-400">Git • GitHub • Vercel • Chrome DevTools • Figma</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end order-first md:order-last">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="w-64 h-64 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
              <img 
                alt="profile" 
                src="/assets/profile.jpg" 
                className="w-48 h-48 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-xl relative z-10" 
              />
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
