import React from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../src/data/experiences';
import { ArrowUpRight } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="mb-36 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-sm font-bold tracking-widest text-slate-900 dark:text-slate-100 uppercase mb-16 lg:sr-only">
          Experience
        </h2>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.a
              key={exp.id}
              href={exp.link || '#'}
              target={exp.link ? '_blank' : undefined}
              rel={exp.link ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group block relative hover:bg-slate-50/50 dark:hover:bg-slate-800/50 rounded-lg p-6 -mx-6 transition-all duration-300 cursor-pointer"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
                {/* Left: Date */}
                <div className="lg:col-span-1">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {exp.period}
                  </p>
                </div>

                {/* Right: Content */}
                <div className="lg:col-span-3">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-accent transition-colors flex items-center gap-2">
                    {exp.role} · {exp.company}
                    {exp.link && (
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    )}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    {exp.description}
                  </p>

                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-1 mb-4">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <span className="text-accent mt-0.5">▹</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-teal-400/10 text-teal-600 dark:text-teal-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
