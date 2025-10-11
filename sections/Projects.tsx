import React from 'react';
import { projects } from '../src/data/projects';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="mb-36 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-sm font-bold tracking-widest text-slate-100 uppercase mb-16 lg:sr-only">
          Projects
        </h2>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.demo || project.repo || '#'}
              target={project.demo || project.repo ? '_blank' : undefined}
              rel={project.demo || project.repo ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group block relative hover:bg-slate-800/50 rounded-lg p-6 -mx-6 transition-all duration-300 cursor-pointer"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
                {/* Left: Image */}
                {project.image && (
                  <div className="lg:col-span-1">
                    <div className="w-full aspect-video rounded border-2 border-slate-700/60 overflow-hidden group-hover:border-slate-600 transition-colors">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Right: Content */}
                <div className={project.image ? "lg:col-span-3" : "lg:col-span-4"}>
                  <h3 className="text-base font-semibold text-slate-100 mb-2 group-hover:text-teal-300 transition-colors flex items-center gap-2">
                    {project.title}
                    {(project.demo || project.repo) && (
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-teal-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    )}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed mb-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-teal-400/10 text-teal-300"
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

export default Projects;
