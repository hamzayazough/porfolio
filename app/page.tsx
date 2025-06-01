"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Timeline from "@/components/Timeline"
import Projects from "@/components/Projects"
import Stats from "@/components/Stats"
import Fitness from "@/components/Fitness"
import Contact from "@/components/Contact"
import CommandPalette from "@/components/CommandPalette"
import { ThemeProvider } from "@/components/theme-provider"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const [projectFilter, setProjectFilter] = useState("")

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette shortcut (Cmd/Ctrl + K)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsCommandPaletteOpen(true)
      }

      // Escape to close command palette
      if (e.key === "Escape") {
        setIsCommandPaletteOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    // Page title cycling on blur/focus
    const titles = [
      "Hamza Yazough | Full-Stack Engineer",
      "Looking for a talented developer?",
      "Come back! The code misses you!",
      "AI + Engineering = Magic ✨",
    ]
    let titleIndex = 0

    const handleBlur = () => {
      titleIndex = (titleIndex + 1) % titles.length
      document.title = titles[titleIndex]
    }

    const handleFocus = () => {
      document.title = "Hamza Yazough | Portfolio"
    }

    window.addEventListener("blur", handleBlur)
    window.addEventListener("focus", handleFocus)

    // Fix any horizontal overflow issues
    document.body.style.overflowX = "hidden"
    document.documentElement.style.overflowX = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("blur", handleBlur)
      window.removeEventListener("focus", handleFocus)
    }
  }, [])

  const filterProjects = (tech: string) => {
    setProjectFilter(tech)
    // Scroll to projects section
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden max-w-[100vw]">
        <Navigation />

        {isCommandPaletteOpen && <CommandPalette onClose={() => setIsCommandPaletteOpen(false)} />}

        <main className="overflow-x-hidden">
          <section id="hero" className="min-h-screen overflow-x-hidden">
            <Hero />
          </section>

          <section id="about" className="min-h-screen py-20 overflow-x-hidden">
            <About />
          </section>

          <section id="skills" className="min-h-screen py-20 overflow-x-hidden">
            <Skills onFilter={filterProjects} />
          </section>

          <section id="timeline" className="min-h-screen py-20 overflow-x-hidden">
            <Timeline />
          </section>

          <section id="projects" className="min-h-screen py-20 overflow-x-hidden">
            <Projects filter={projectFilter} />
          </section>

          <section id="stats" className="py-20 overflow-x-hidden">
            <Stats />
          </section>

          <section id="fitness" className="py-20 overflow-x-hidden">
            <Fitness />
          </section>

          <section id="contact" className="py-20 overflow-x-hidden">
            <Contact />
          </section>
        </main>

        <footer className="py-8 text-center text-sm text-slate-500 dark:text-slate-400 overflow-x-hidden">
          <p>© {new Date().getFullYear()} Hamza Yazough. All rights reserved.</p>
        </footer>
      </div>
    </ThemeProvider>
  )
}
