'use client';

import type { Project } from '@/src/types';
import { projectCategoryIds, projectCategoryLabels, type ProjectFilter } from '@/src/data/project-categories';

type Props = {
  projects: Project[];
  selected: ProjectFilter;
  onChange: (filter: ProjectFilter) => void;
};

export default function ProjectFilters({ projects, selected, onChange }: Props) {
  const filters: ProjectFilter[] = ['all', ...projectCategoryIds];

  return (
    <div role="group" aria-label="Filter projects by type" className="mb-6 flex flex-wrap gap-2">
      {filters.map(filter => {
        const count = filter === 'all' ? projects.length : projects.filter(project => project.category === filter).length;
        return (
          <button
            key={filter}
            type="button"
            aria-pressed={selected === filter}
            onClick={() => onChange(filter)}
            className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300 ${selected === filter
              ? 'border-teal-400/50 bg-teal-500/15 text-teal-300'
              : 'border-slate-700 bg-slate-800/30 text-slate-400 hover:border-slate-500 hover:text-slate-100'}`}
          >
            {filter === 'all' ? 'All' : projectCategoryLabels[filter]}
            <span className="text-xs tabular-nums opacity-75">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
