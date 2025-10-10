import './globals.css'
import { ThemeProvider } from '../context/ThemeProvider'
import React from 'react'

export const metadata = {
  title: 'Your Name — Frontend Developer',
  description: 'Personal portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
