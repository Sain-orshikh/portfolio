import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Project One',
    description: 'A modern UI component library with custom animations and accessibility.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    repo: 'https://github.com/yourname/project-one',
    demo: 'https://project-one-demo.example',
    image: '/assets/profile.jpg'
  },
  {
    id: 'proj-2',
    title: 'Project Two',
    description: 'A responsive dashboard built for performance and scalability.',
    tech: ['React', 'Vite', 'Framer Motion'],
    repo: 'https://github.com/yourname/project-two',
    demo: '',
    image: '/assets/profile.jpg'
  }
];
