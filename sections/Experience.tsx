import React from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../src/data/experiences';
import { ArrowUpRight } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="mb-24 scroll-mt-24">
  <h2 className="block lg:hidden text-[14px] font-bold tracking-widest uppercase text-white mb-8">Experience</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid gap-6">
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative"
            >
              <a
                href={exp.link || '#'}
                target={exp.link ? '_blank' : undefined}
                rel={exp.link ? 'noopener noreferrer' : undefined}
                className="block relative overflow-hidden rounded-xl border border-slate-800/50 bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm p-6 transition-all duration-500 hover:border-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/5 hover:bg-white/10"
              >
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-slate-100 group-hover:text-teal-300 transition-colors">
                          {exp.role}
                        </h3>
                        {exp.link && (
                          <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-teal-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-teal-300 font-medium mb-3">
                        <span className="text-lg">{exp.company}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-slate-400 shrink-0">
                      <span className="font-medium">{exp.period}</span>
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-2 mb-5">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                          <span className="text-teal-400 mt-1 text-lg leading-none">•</span>
                          <span className="flex-1">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex flex-wrap gap-2.5">
                    {exp.tech.map((tech) => (
                      <div
                        key={tech}
                        className="px-3 py-1.5 text-xs font-medium rounded-md bg-teal-500/10 text-teal-300 border border-teal-500/30 shadow-sm"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
