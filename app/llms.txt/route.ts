import { profile, siteUrl } from '@/src/data/profile'
import { introText } from '@/src/data/intro'
import { projects } from '@/src/data/projects'
import { experiences } from '@/src/data/experiences'
import { projectSlug } from '@/lib/projects'

export const dynamic = 'force-static'

export function GET() {
  const content = [
    `# ${profile.name}`,
    `> ${profile.description}`,
    introText.title,
    ...introText.paragraphs,
    introText.learning,
    'This is a first-party summary of the public portfolio. Project descriptions and experience are self-reported by its owner.',
    '## Portfolio',
    `- [Biography and experience](${siteUrl}/): Public profile of ${profile.name}, also known as ${profile.alias}.`,
    `- [All projects](${siteUrl}/projects): Web development, machine learning, and 3D graphics projects.`,
    '## Experience',
    ...experiences.map(exp => `- ${exp.role}, ${exp.company} (${exp.period}): ${exp.description} ${exp.achievements.join('; ')}.`),
    '## Projects',
    ...[...projects].reverse().map(project => `- [${project.title}](${siteUrl}/projects/${projectSlug(project)}): ${project.description} Technologies: ${project.tech.join(', ')}.`),
    '## Public profiles',
    `- [GitHub](${profile.github}): Code repositories.`,
    `- [LinkedIn](${profile.linkedin}): Professional profile.`,
  ].join('\n\n') + '\n'
  return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
