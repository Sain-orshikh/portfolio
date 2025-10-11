import React from 'react';
import { Github, Linkedin, Instagram, Facebook } from 'lucide-react';
import { SiDiscord } from 'react-icons/si';
import { motion } from 'framer-motion';

const socials = [
  { icon: Github, href: 'https://github.com/Sain-orshikh', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/sain-orshikh-nyambayar-127a58352/', label: 'LinkedIn' },
  { icon: SiDiscord, href: 'https://discordapp.com/users/779665822271537162', label: 'Discord' },
  { icon: Instagram, href: 'https://www.instagram.com/sainorshikh/', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/sainorshikh.nyamayar/', label: 'Facebook' },
];

const SocialLinks: React.FC = () => {
  return (
    <div className="flex items-center gap-4 mt-4 sm:mt-0">
      {socials.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
            className="group text-slate-400 hover:text-white dark:text-slate-400 dark:hover:text-white transition-colors"
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {social.icon === SiDiscord ? (
            <SiDiscord className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
          ) : (
            <social.icon className="w-6 h-6" />
          )}
        </motion.a>
      ))}
    </div>
  );
};

export default SocialLinks;
