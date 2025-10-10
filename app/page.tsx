'use client'
import React from 'react'
import Navbar from '../components/ui/Navbar'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Projects from '../sections/Projects'
import Contact from '../sections/Contact'
import Footer from '../components/ui/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section id="home" className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
          <Hero/>
        </section>
        
        <section id="about" className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl py-24 sm:py-32">
          <About/>
        </section>
        
        <section id="skills" className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl py-24 sm:py-32 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent dark:via-slate-900/30">
          <Skills/>
        </section>
        
        <section id="projects" className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl py-24 sm:py-32">
          <Projects/>
        </section>
        
        <section id="contact" className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl py-24 sm:py-32">
          <Contact/>
        </section>
        
        <Footer/>
      </main>
    </>
  )
}
