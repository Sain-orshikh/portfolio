import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Sain-Orshikh Nyambayar',
  description: 'High school student passionate about web development, building production-ready applications.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
