import React from 'react';
import { motion } from 'framer-motion';
import { introText } from '@/src/data/intro';

const About: React.FC = () => {
  return (
    <section id="about" className="mb-24 scroll-mt-24">
      <h2 className="block lg:hidden text-[14px] font-bold tracking-widest uppercase text-white mb-8">ABOUT</h2>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="space-y-4 text-[17px] text-slate-400 leading-relaxed">
          <p>
            {introText.title}
          </p>

          {introText.paragraphs.map((paragraph, index) => (
            <p key={index}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="pt-6 space-y-4">
          <div>
            <h3 className="block lg:hidden text-[14px] font-bold tracking-widest uppercase text-white mb-8">What I'm learning</h3>
            <h3 className="hidden lg:block text-[17px] font-semibold text-slate-100 mb-3 uppercase tracking-wider">What I'm learning</h3>
            <p className="text-slate-400 text-[17px]">
              {introText.learning}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
