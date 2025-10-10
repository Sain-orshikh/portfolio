import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';

const skills = [
  { name: 'React', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Tailwind CSS', level: 95 },
  { name: 'Framer Motion', level: 85 },
  { name: 'Next.js', level: 88 },
  { name: 'Accessibility', level: 82 },
  { name: 'Performance', level: 87 },
  { name: 'Testing', level: 80 },
];

const Skills: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="section-heading">Skills & Expertise</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {skills.map((skill, i) => (
          <motion.div 
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            whileHover={{ y: -6, scale: 1.02 }}
          >
            <Card className="p-5 flex flex-col items-center justify-center text-center group cursor-default">
              <span className="text-sm font-semibold mb-2">{skill.name}</span>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 + 0.2, duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Skills;
