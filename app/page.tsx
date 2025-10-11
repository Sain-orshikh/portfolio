'use client'
import React, { useEffect, useState } from 'react'
import FixedSidebar from '../components/ui/FixedSidebar'
import About from '../sections/About'
import Experience from '../sections/Experience'
import Projects from '../sections/Projects'

export default function Home() {
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -35% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const sections = document.querySelectorAll('section[id]')
      sections.forEach((section) => observer.observe(section))
    }, 100)

    return () => {
      const sections = document.querySelectorAll('section[id]')
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const yOffset = -100 // Offset for better positioning
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="lg:flex">
        {/* Fixed Left Sidebar */}
        <FixedSidebar activeSection={activeSection} onNavigate={handleNavigate} />

        {/* Scrollable Right Content */}
        <main className="lg:ml-[50%] lg:mr-[15%] lg:w-[50%] px-6 sm:px-12 py-16 lg:py-24 pt-36 lg:pt-24">
          <About />
          <Experience />
          <Projects />

          {/* Footer Text */}
          <footer className="mt-24 pt-12 border-t border-slate-800/60">
            <p className="text-sm text-slate-400 text-center">
              Designed & built with <span className="text-red-500">♥</span> using Next.js, TypeScript & Tailwind CSS
            </p>
          </footer>
        </main>
      </div>
    </div>
  )
}
