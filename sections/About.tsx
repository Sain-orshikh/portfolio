import React from 'react';
import { motion } from 'framer-motion';

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
            I'm a high school senior at <span className="text-slate-100 font-medium">Mongol Aspiration International School</span> passionate about building increasingly complex and challenging web applications.
          </p>

          <p>
            Currently, I'm taking a break from web development to focus on my studies, while honing my design skills on the weekends.
            In the past, I've had the opportunity to develop software across a variety of settings—from <span className="text-slate-100 font-medium">large corporations</span> and <span className="text-slate-100 font-medium">start-ups</span> to <span className="text-slate-100 font-medium">school organizations</span>.
          </p>

          <p>
            In my spare time, I'm usually enjoying my last year of high school with friends, binge-watching anime and TV shows, playing basketball, or diving into video games.
          </p>
        </div>

        <div className="pt-6 space-y-4">
          <div>
            <h3 className="block lg:hidden text-[14px] font-bold tracking-widest uppercase text-white mb-8">What I'm learning</h3>
            <h3 className="hidden lg:block text-[17px] font-semibold text-slate-100 mb-3 uppercase tracking-wider">What I'm learning</h3>
            <p className="text-slate-400 text-[17px]">
              Currently exploring advanced React patterns, backend development with Node.js, and UI/UX design principles 
              to create more intuitive and accessible web applications.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
