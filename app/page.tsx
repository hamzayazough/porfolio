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
      <div className="bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Navigation />

        {isCommandPaletteOpen && <CommandPalette onClose={() => setIsCommandPaletteOpen(false)} />}

        <main>
          <section id="hero" className="min-h-screen">
            <Hero />
          </section>

          <div id="about" className="py-20">
            <About />
          </div>

          <div id="skills" className="py-20">
            <Skills onFilter={filterProjects} />
          </div>

          <div id="timeline" className="py-20">
            <Timeline />
          </div>

          <div id="projects" className="py-20">
            <Projects filter={projectFilter} />
          </div>

          <div id="stats" className="py-20">
            <Stats />
          </div>

          <div id="fitness" className="py-20">
            <Fitness />
          </div>

          <div id="contact" className="py-20">
            <Contact />
          </div>
        </main>

        <footer className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Hamza Yazough. All rights reserved.</p>
        </footer>
      </div>
    </ThemeProvider>
  )
}
