import React from 'react';
import ContactForm from '../components/ui/Form';
import { motion } from 'framer-motion';
import { Mail, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-950/30 mb-6"
        >
          <MessageSquare className="w-8 h-8 text-accent" />
        </motion.div>
        
        <h2 className="section-heading mb-4">Let's Work Together</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Want to work together? Send me a message and I'll reply within a few days.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <ContactForm />
      </div>
    </motion.div>
  );
};

export default Contact;
