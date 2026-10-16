import './globals.css'
import React from 'react'
import type { Metadata } from 'next'
import { profile, siteUrl } from '@/src/data/profile'
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION, other: process.env.BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } : {} },
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name} (sainorshikh) | Developer & KAIST Student`, template: `%s | ${profile.name}` },
  description: profile.description,
  openGraph: { type: 'website', siteName: profile.name, title: `${profile.name} (sainorshikh)`, description: profile.description, locale: 'en_US' },
  twitter: { card: 'summary', title: `${profile.name} (sainorshikh)`, description: profile.description },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
