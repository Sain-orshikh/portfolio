import type { Project } from '@/src/types'

export function projectSlug(project: Project) {
  return project.id.replace(/^proj-/, '') + '-' + project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
