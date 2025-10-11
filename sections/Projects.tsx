import React from 'react';
import { projects } from '../src/data/projects';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="mb-32 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative flex flex-col"
            >
              <div className="relative overflow-hidden rounded-xl border border-slate-800/50 bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm transition-all duration-500 hover:border-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/5 hover:-translate-y-1 hover:bg-slate-700/20 flex flex-col h-full">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-600/0 to-slate-700/0 group-hover:from-slate-600/10 group-hover:to-slate-700/10 transition-all duration-500 rounded-xl"></div>
                
                {/* Image */}
                {project.image && (
                  <div className="relative w-full aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60"></div>
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-slate-100 group-hover:text-teal-300 transition-colors flex-1">
                      {project.title}
                    </h3>
                    <div className="flex gap-2 shrink-0">
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-teal-300 hover:bg-slate-700/50 transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-teal-300 hover:bg-slate-700/50 transition-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2.5 mt-auto">
                    {project.tech.map((tech) => (
                      <div
                        key={tech}
                        className="px-3 py-1.5 text-xs font-medium rounded-md bg-teal-500/10 text-teal-300 border border-teal-500/30 shadow-sm"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
