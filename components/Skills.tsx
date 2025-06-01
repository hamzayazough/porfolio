"use client"

import { useEffect } from "react"
import { gsap } from "gsap"

const skillsData = {
  languages: ["Java", "TypeScript", "Python", "C++", "SQL", "JavaScript"],
  frameworks: ["Angular", "React", "Vue.js", "Node.js", "NestJS", "Flask", "Spring Boot", "FastAPI", "Qt"],
  tools: [
    "Git",
    "Docker",
    "AWS",
    "Azure AD",
    "Jenkins",
    "PostgreSQL",
    "MongoDB",
    "Auth0",
    "RAG",
    "Vector DBs",
    "Ollama",
    "Stripe",
    "Mapbox",
    "Google Doc AI",
    "Groq",
    "OpenAI",
    "Firebase",
  ],
}

const colorClasses = [
  "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800",
  "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-800",
  "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800",
  "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-800",
  "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200 hover:bg-rose-200 dark:hover:bg-rose-800",
  "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200 hover:bg-cyan-200 dark:hover:bg-cyan-800",
]

interface SkillsProps {
  onFilter: (skill: string) => void
}

export default function Skills({ onFilter }: SkillsProps) {
  useEffect(() => {
    gsap.fromTo(
      ".skill-category",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".skills-container",
          start: "top 80%",
        },
      },
    )

    gsap.fromTo(
      ".skill-tag",
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.05,
        scrollTrigger: {
          trigger: ".skills-container",
          start: "top 70%",
        },
      },
    )
  }, [])

  const getRandomColorClass = () => {
    return colorClasses[Math.floor(Math.random() * colorClasses.length)]
  }

  const handleSkillClick = (skill: string) => {
    onFilter(skill)
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Skills & Expertise
      </h2>

      <div className="skills-container grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(skillsData).map(([category, skills]) => (
          <div
            key={category}
            className="skill-category bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
          >
            <h3 className="text-2xl font-bold mb-6 text-center capitalize text-slate-800 dark:text-slate-200">
              {category}
            </h3>

            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill, index) => (
                <button
                  key={index}
                  onClick={() => handleSkillClick(skill)}
                  className={`skill-tag px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer ${getRandomColorClass()}`}
                  aria-label={`Filter projects by ${skill}`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
