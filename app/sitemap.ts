import type { MetadataRoute } from 'next'
import { siteUrl } from '@/src/data/profile'
import { projects } from '@/src/data/projects'
import { projectSlug } from '@/lib/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/projects', ...projects.map(project => `/projects/${projectSlug(project)}`)]
    .map(path => ({ url: `${siteUrl}${path}` }))
}
