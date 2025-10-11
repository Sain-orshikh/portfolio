import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="mb-36 scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <h2 className="text-sm font-bold tracking-widest text-slate-100 uppercase mb-16 lg:sr-only">
          About
        </h2>

        <div className="space-y-4 text-slate-400 leading-relaxed">
          <p>
            I'm a high school senior at <span className="text-slate-100 font-medium">Mongol Aspiration International School</span> passionate about building increasingly complex and challenging web applications.
          </p>

          <p>
            Currently, I'm taking a break from web development to focus on my studies, while honing my design skills on the weekends.
            In the past, I've had the opportunity to develop software across a variety of settings—from large corporations and start-ups to school organizations.
          </p>

          <p>
            In my spare time, I'm usually enjoying my last year of high school with friends, binge-watching anime and TV shows, playing basketball, or diving into video games.
          </p>
        </div>

        <div className="pt-6 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-3 uppercase tracking-wider">Technologies I work with</h3>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Python', 'Django', 'Vercel', 'Git'].map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1.5 text-sm font-medium bg-slate-800 text-slate-300 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-3 uppercase tracking-wider">What I'm learning</h3>
            <p className="text-slate-400">
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
