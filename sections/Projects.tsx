import React from 'react';
import { projects } from '../src/data/projects';
import Card from '../components/ui/Card';
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
  return (
    <div>
      <h2 className="section-heading">Featured Projects</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -8 }}
            className="group"
          >
            <Card className="flex flex-col h-full overflow-hidden p-0 hover:shadow-2xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{p.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 flex-1 leading-relaxed">{p.description}</p>
                
                <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  {p.repo && (
                    <a 
                      href={p.repo} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-accent transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4" /> 
                      Code
                    </a>
                  )}
                  {p.demo && (
                    <a 
                      href={p.demo} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-light transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" /> 
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
