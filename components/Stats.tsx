"use client"

import { useEffect, useRef } from "react"
import { Users, Award, Calendar, GitCommit } from "lucide-react"
import { gsap } from "gsap"

const statsData = [
  {
    label: "Users Impacted",
    value: 500,
    suffix: "+",
    icon: Users,
    color: "text-blue-600",
  },
  {
    label: "Hackathon Participated",
    value: 8,
    suffix: "x",
    icon: Award,
    color: "text-amber-600",
  },
  {
    label: "Years of Experience",
    value: 3,
    suffix: "",
    icon: Calendar,
    color: "text-purple-600",
  },
  {
    label: "Number of Commits",
    value: 999,
    suffix: "+",
    icon: GitCommit,
    color: "text-green-600",
  },
]

export default function Stats() {
  const countersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    const firstCounter = countersRef.current[0]
    if (firstCounter?.parentElement?.parentElement) {
      observer.observe(firstCounter.parentElement.parentElement)
    }

    return () => observer.disconnect()
  }, [])

  const animateCounters = () => {
    countersRef.current.forEach((counter, index) => {
      if (counter) {
        const stat = statsData[index]
        gsap.to(counter, {
          textContent: stat.value,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          onUpdate: () => {
            if (counter) {
              counter.textContent = `${Math.round(Number(counter.textContent))}${stat.suffix}`
            }
          },
        })
      }
    })
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        By the Numbers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {statsData.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-center border border-slate-200 dark:border-slate-700 group hover:scale-105"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>

              <div className="text-4xl font-bold mb-4 text-slate-800 dark:text-slate-200">
                <span ref={(el) => (countersRef.current[index] = el)} className="tabular-nums">
                  0{stat.suffix}
                </span>
              </div>

              <p className="text-slate-600 dark:text-slate-400 font-medium">{stat.label}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
