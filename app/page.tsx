import Home from '@/components/Home'
import { profile, siteUrl } from '@/src/data/profile'
import { introText } from '@/src/data/intro'
import type { Metadata } from 'next'

export const metadata: Metadata = { alternates: { canonical: '/' }, openGraph: { type: 'profile', url: '/', title: `${profile.name} (sainorshikh)`, description: profile.description } }

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteUrl}/#profile`,
    url: siteUrl,
    name: profile.name,
    mainEntity: {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: profile.name,
      alternateName: profile.alias,
      url: siteUrl,
      description: introText.title,
      sameAs: [profile.github, profile.linkedin],
      affiliation: { '@type': 'CollegeOrUniversity', name: 'Korea Advanced Institute of Science and Technology (KAIST)' },
      knowsAbout: ['Web development', 'React', 'TypeScript', 'Next.js', 'Python', 'Machine learning', '3D graphics'],
    },
  }
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\u003c') }} />
    <Home />
  </>
}
