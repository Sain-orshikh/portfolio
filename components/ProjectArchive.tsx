'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Project } from '@/src/types';
import { projectSlug } from '@/lib/projects';
import { projectCategoryLabels, type ProjectFilter } from '@/src/data/project-categories';
import ProjectFilters from './ui/ProjectFilters';

export default function ProjectArchive({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<ProjectFilter>('all');
  const filteredProjects = [...projects].reverse().filter(project => category === 'all' || project.category === category);

  return <>
    <ProjectFilters projects={projects} selected={category} onChange={setCategory} />
    <p role="status" className="mb-6 text-sm text-slate-400">Showing {filteredProjects.length} of {projects.length} projects</p>
    <div className="space-y-8">{filteredProjects.map(project => <article key={project.id} className="rounded-xl border border-slate-700 p-6">
      <p className="mb-2 text-xs font-medium text-slate-400">{projectCategoryLabels[project.category]}</p>
      <h2 className="text-2xl font-semibold text-teal-300"><Link href={`/projects/${projectSlug(project)}`}>{project.title}</Link></h2>
      <p className="text-slate-300 mt-3">{project.description}</p>
      <p className="text-slate-400 mt-3">Built with: {project.tech.join(', ')}</p>
    </article>)}</div>
  </>;
}
