'use client';
import React, { useState } from 'react';
import { projects } from '../src/data/projects';
import { ArrowUpRight, Github, ExternalLink, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 5);
  const hasMoreProjects = projects.length > 5;

  return (
    <section id="projects" className="mb-24 scroll-mt-24">
  <h2 className="block lg:hidden text-[14px] font-bold tracking-widest uppercase text-white mb-8">Projects</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid gap-6">
          {displayedProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative cursor-pointer"
            >
              <a
                href={project.demo || project.repo || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                tabIndex={-1}
              >
                <div className="relative overflow-hidden rounded-xl border border-slate-800/50 bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm transition-all duration-500 hover:border-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/5 hover:bg-slate-700/20 flex flex-col sm:flex-row gap-4 p-4">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-600/0 to-slate-700/0 group-hover:from-slate-600/10 group-hover:to-slate-700/10 transition-all duration-500 rounded-xl"></div>
                  
                  {/* Image on Left - Separate Rectangle */}
                  {project.image && (
                    <div className="relative w-full sm:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden border-2 border-slate-700/50 group-hover:border-teal-400/50 transition-all duration-300">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-base font-semibold text-slate-100 group-hover:text-teal-300 transition-colors flex-1">
                        {project.title}
                      </h3>
                      <div className="flex gap-2 shrink-0">
                        {project.repo && (
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-800/50 text-slate-400 hover:text-teal-300 hover:bg-slate-700/50 transition-all"
                            onClick={e => e.stopPropagation()}
                            tabIndex={0}
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-800/50 text-slate-400 hover:text-teal-300 hover:bg-slate-700/50 transition-all"
                            onClick={e => e.stopPropagation()}
                            tabIndex={0}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed mb-3 flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.tech.map((tech) => (
                        <div
                          key={tech}
                          className="px-2 py-1 text-[10px] font-medium rounded-md bg-teal-500/10 text-teal-300 border border-teal-500/30 shadow-sm"
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>

        {/* Show More Button */}
        {hasMoreProjects && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mt-8"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-800/50 bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm text-slate-300 hover:text-teal-300 hover:border-teal-500/30 transition-all duration-300"
            >
              <span className="font-medium">
                {showAll ? 'Show Less' : `Show More Projects (${projects.length - 5})`}
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Projects;
