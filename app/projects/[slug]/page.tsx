import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects } from '@/src/data/projects'
import { projectSlug } from '@/lib/projects'

type Props = { params: { slug: string } }
export const dynamicParams = false
export function generateStaticParams() {
  return projects.map(project => ({ slug: projectSlug(project) }))
}
export function generateMetadata({ params }: Props): Metadata {
  const project = projects.find(item => projectSlug(item) === params.slug)
  if (!project) return {}
  return {
    title: project.title,
    description: `${project.title} by Sain-Orshikh Nyambayar (sainorshikh). ${project.description}`,
    alternates: { canonical: `/projects/${params.slug}` },
    openGraph: { title: `${project.title} | Sain-Orshikh Nyambayar`, description: project.description, url: `/projects/${params.slug}`, ...(project.image ? { images: [{ url: project.image, alt: `${project.title} screenshot` }] } : {}) },
    twitter: { card: project.image ? 'summary_large_image' : 'summary', title: project.title, description: project.description, ...(project.image ? { images: [project.image] } : {}) },
  }
}
export default function ProjectPage({ params }: Props) {
  const project = projects.find(item => projectSlug(item) === params.slug)
  if (!project) notFound()
  return <main className="max-w-3xl mx-auto px-6 py-16">
    <Link href="/projects" className="text-teal-300">← All projects</Link>
    <h1 className="text-4xl font-bold text-slate-100 mt-8 mb-4">{project.title}</h1>
    <p className="text-slate-400 mb-8">A project by <Link href="/" className="text-teal-300">Sain-Orshikh Nyambayar (sainorshikh)</Link>.</p>
    {project.image && <div className="relative w-full aspect-video mb-8"><Image src={project.image} alt={`${project.title} screenshot`} fill sizes="(max-width: 768px) 100vw, 720px" className="object-contain rounded-xl" /></div>}
    <h2 className="text-2xl font-semibold text-slate-100 mb-3">About the project</h2>
    <p className="text-slate-300 leading-relaxed">{project.description}</p>
    <h2 className="text-2xl font-semibold text-slate-100 mt-8 mb-3">Technologies</h2>
    <ul className="list-disc pl-6 text-slate-300">{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>
    <div className="flex gap-6 mt-8 text-teal-300">
      {project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer">Source code ↗</a>}
      {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">Live demo ↗</a>}
    </div>
  </main>
}
