"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Home, User, Code, Briefcase, Layout, BarChart2, Activity, Mail, Sun, Moon } from "lucide-react"

const navItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code },
  { id: "timeline", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: Layout },
  { id: "stats", label: "Stats", icon: BarChart2 },
  { id: "fitness", label: "Fitness", icon: Activity },
  { id: "contact", label: "Contact", icon: Mail },
]

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isHovered, setIsHovered] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    navItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) return null

  return (
    <div
      className="fixed left-0 top-0 h-full flex flex-col items-center justify-center z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: isHovered ? "auto" : "12px" }} // Control width to prevent layout shift
    >
      {/* Hover trigger area - invisible but extends the hover zone */}
      <div className="absolute left-0 top-0 w-12 h-full" />

      {/* Navigation container */}
      <div
        className={`
          bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full shadow-2xl border border-slate-200/50 dark:border-slate-700/50
          transition-all duration-500 ease-out
          ${isHovered ? "translate-x-0 p-3 opacity-100" : "-translate-x-12 p-2 opacity-60 hover:opacity-80"}
        `}
      >
        <nav className="flex flex-col space-y-4">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  nav-item relative flex items-center justify-center rounded-full transition-all duration-300 group/item
                  ${isHovered ? "w-10 h-10" : "w-8 h-8"}
                  ${
                    activeSection === item.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                      : "hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }
                `}
                aria-label={`Navigate to ${item.label} section`}
              >
                <Icon className={`transition-all duration-300 ${isHovered ? "w-5 h-5" : "w-4 h-4"}`} />

                {/* Tooltip - only show when hovered and expanded */}
                <span
                  className={`
                    nav-tooltip absolute left-14 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 
                    px-3 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none z-10
                    transition-all duration-300
                    ${isHovered ? "opacity-0 group-hover/item:opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}
                  `}
                >
                  {item.label}
                  {/* Arrow pointing to the button */}
                  <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-800 dark:bg-slate-200 rotate-45" />
                </span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className={`
          bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-full shadow-2xl border border-slate-200/50 dark:border-slate-700/50
          text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200
          transition-all duration-500 ease-out
          ${isHovered ? "translate-x-0 p-3 opacity-100 mt-6" : "-translate-x-12 p-2 opacity-60 hover:opacity-80 mt-4"}
          ${isHovered ? "w-10 h-10" : "w-8 h-8"}
        `}
        aria-label="Toggle dark mode"
      >
        {theme === "dark" ? (
          <Sun className={`transition-all duration-300 ${isHovered ? "w-5 h-5" : "w-4 h-4"}`} />
        ) : (
          <Moon className={`transition-all duration-300 ${isHovered ? "w-5 h-5" : "w-4 h-4"}`} />
        )}
      </button>

      {/* Subtle indicator when hidden */}
      <div
        className={`
          absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-blue-600 to-purple-600 rounded-r-full
          transition-all duration-500
          ${isHovered ? "opacity-0 scale-y-0" : "opacity-40 scale-y-100"}
        `}
      />
    </div>
  )
}
