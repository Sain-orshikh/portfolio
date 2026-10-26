export const projectCategoryIds = ['web', 'ai', '3d-games'] as const;

export type ProjectCategory = typeof projectCategoryIds[number];
export type ProjectFilter = ProjectCategory | 'all';

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  web: 'Web',
  ai: 'AI',
  '3d-games': '3D Graphics & Games',
};
