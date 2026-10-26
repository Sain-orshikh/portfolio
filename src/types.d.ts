import type { ProjectCategory } from './data/project-categories';

export type Project = {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tech: string[];
  repo?: string;
  demo?: string;
  image?: string;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  tech: string[];
  type: 'paid' | 'unpaid' | 'school' | 'personal';
  link?: string;
};
