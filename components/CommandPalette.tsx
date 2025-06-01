"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"

const sections = [
  { id: "hero", label: "Home", description: "Go to hero section" },
  { id: "about", label: "About", description: "Learn more about me" },
  { id: "skills", label: "Skills", description: "View my technical skills" },
  { id: "timeline", label: "Experience", description: "See my work experience" },
  { id: "projects", label: "Projects", description: "Browse my projects" },
  { id: "stats", label: "Stats", description: "View achievement statistics" },
  { id: "fitness", label: "Fitness", description: "Check out my fitness stats" },
  { id: "contact", label: "Contact", description: "Get in touch with me" },
]

interface CommandPaletteProps {
  onClose: () => void
}

export default function CommandPalette({ onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filteredSections = sections.filter(
    (section) =>
      section.label.toLowerCase().includes(query.toLowerCase()) ||
      section.description.toLowerCase().includes(query.toLowerCase()),
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % filteredSections.length)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filteredSections.length) % filteredSections.length)
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (filteredSections[selectedIndex]) {
          navigateToSection(filteredSections[selectedIndex].id)
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [filteredSections, selectedIndex, onClose])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const navigateToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-20">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-4 p-6 border-b border-slate-200 dark:border-slate-700">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search sections..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-lg outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {filteredSections.length > 0 ? (
            filteredSections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => navigateToSection(section.id)}
                className={`w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                  index === selectedIndex ? "bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500" : ""
                }`}
              >
                <div className="font-medium text-slate-900 dark:text-slate-100">{section.label}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{section.description}</div>
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">No sections found for "{query}"</div>
          )}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 flex justify-between">
          <span>Use ↑↓ to navigate</span>
          <span>Press Enter to select</span>
        </div>
      </div>
    </div>
  )
}
