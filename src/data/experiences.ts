import type { Experience } from '../types';

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Frontend Engineer Intern',
    company: 'Erxes Inc',
    period: 'Summer 2024',
    type: 'paid',
    description: 'Worked on client web applications, integrating complex systems and building production-ready interfaces for real businesses.',
    achievements: [
      'Built CRM integration for APU company, connecting forms and questionnaires to Erxes backend plugin system',
      'Developed Ug-Center gym website with complex gradient UIs, payment system integration, and time slot management',
      'Collaborated with senior developers on production codebases and version control workflows'
    ],
    tech: ['TypeScript', 'Next.js', 'Erxes', 'Payment'],
    link: 'https://erxes.io'
  },
  {
    id: 'exp-2',
    role: 'Web Developer',
    company: 'Mongol Aspiration International School',
    period: '2024',
    type: 'school',
    description: 'Lead developer for the school\'s official website, building core features and infrastructure from scratch.',
    achievements: [
      'Built homepage, navbar, footer, and admin panel for school website',
      'Developed about section and content management features',
      'Established foundation for ongoing development and future features'
    ],
    tech: ['Next.js', 'TypeScript', 'Vercel', 'Cloudinary']
  },
  {
    id: 'exp-3',
    role: 'Full Stack Developer',
    company: 'Study Simple Club (MAIS)',
    period: '2024',
    type: 'school',
    description: 'Transformed a no-code Notion website into a modern, scalable web application.',
    achievements: [
      'Migrated entire platform from Notion to Next.js TypeScript application',
      'Improved performance, maintainability, and user experience',
      'Deployed and managed production environment on Vercel'
    ],
    tech: ['Next.js', 'TypeScript', 'Migration', 'Spotify API']
  },
  {
    id: 'exp-4',
    role: 'Web Developer',
    company: 'School Club Project (MAIS)',
    period: '2024',
    type: 'school',
    description: 'Built a complete web application from the ground up for a school club.',
    achievements: [
      'Designed and implemented full-stack architecture',
      'Created user-friendly interface with modern design principles',
      'Managed deployment and production environment'
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Full Stack']
  },
  {
    id: 'exp-5',
    role: 'Software Engineer Intern',
    company: 'Electric Meter Dashboard Project',
    period: 'Summer 2023 (Grade 10)',
    type: 'unpaid',
    description: 'First professional internship experience, working on IoT dashboard for electric meter monitoring.',
    achievements: [
      'Developed web dashboard for electric meter data visualization',
      'Learned professional development workflows and best practices',
      'Gained experience in real-world software development environment'
    ],
    tech: ['Javascript', 'Web Dashboard', 'IoT']
  }
];