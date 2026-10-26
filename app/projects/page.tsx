import Link from 'next/link'
import type { Metadata } from 'next'
import { projects } from '@/src/data/projects'
import ProjectArchive from '@/components/ProjectArchive'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore web applications, machine learning experiments, and 3D graphics projects by Sain-Orshikh Nyambayar (sainorshikh).',
  alternates: { canonical: '/projects' },
}

export default function ProjectsPage() {
  return <main className="max-w-4xl mx-auto px-6 py-16">
    <Link href="/" className="text-teal-300">← Back to portfolio</Link>
    <h1 className="text-4xl font-bold text-slate-100 mt-8 mb-4">Projects by Sain-Orshikh Nyambayar</h1>
    <p className="text-slate-400 mb-10">Web applications, machine learning experiments, and 3D graphics projects. I also go by sainorshikh online.</p>
    <ProjectArchive projects={projects} />
  </main>
}
