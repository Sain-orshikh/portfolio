import React from 'react';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="py-24 sm:py-32 md:py-40">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 mb-6"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Available for work</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-white dark:to-slate-100 bg-clip-text text-transparent">
              Your Name
            </span>
            <br />
            <span className="text-slate-600 dark:text-slate-400 text-4xl sm:text-5xl md:text-6xl">
              Frontend Developer
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Frontend Developer passionate about <span className="font-semibold text-accent">UI/UX</span>, <span className="font-semibold text-accent">performance</span>, and shipping production-grade web apps that users love.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#projects">
              <Button className="group">
                View Projects
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#contact">
              <Button variant="ghost">Contact Me</Button>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
