"use client"

import { useEffect, useRef } from "react"
import { Dumbbell, Trophy, Target, Timer } from "lucide-react"
import { gsap } from "gsap"

const fitnessStats = [
  {
    label: "Bench Press",
    value: 315,
    unit: "lb",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-500",
    icon: Dumbbell,
    description: "Personal Record",
  },
  {
    label: "Squat",
    value: 405,
    unit: "lb",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500",
    icon: Trophy,
    description: "Max Lift",
  },
  {
    label: "Weighted Pull-up",
    value: 90,
    unit: "lb",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500",
    icon: Target,
    description: "Added Weight",
  },
  {
    label: "Mile Run",
    value: 5.55,
    unit: "min",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500",
    icon: Timer,
    description: "Best Time",
  },
]

export default function Fitness() {
  const chartRef = useRef<HTMLDivElement>(null)
  const cardValuesRef = useRef<(HTMLDivElement | null)[]>([])
  const maxValue = Math.max(...fitnessStats.map((stat) => stat.value)) * 1.2

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateChart()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 },
    )

    if (chartRef.current) {
      observer.observe(chartRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const animateChart = () => {
    // Animate the intro text
    gsap.fromTo(".fitness-intro", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })

    // Animate stat cards
    gsap.fromTo(
      ".fitness-card",
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.3,
      },
    )

    // Animate card values
    cardValuesRef.current.forEach((valueElement, index) => {
      if (valueElement) {
        const stat = fitnessStats[index]
        gsap.to(valueElement, {
          textContent: stat.value,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: Number.isInteger(stat.value) ? 1 : 0.01 },
          delay: 0.5 + index * 0.1,
          onUpdate: () => {
            if (valueElement) {
              if (Number.isInteger(stat.value)) {
                valueElement.textContent = Math.round(Number(valueElement.textContent)).toString()
              } else {
                valueElement.textContent = Number(valueElement.textContent).toFixed(2)
              }
            }
          },
        })
      }
    })

    // Animate bars
    gsap.to(".fitness-bar", {
      height: (index, target) => {
        const stat = fitnessStats[index]
        return `${(stat.value / maxValue) * 100}%`
      },
      duration: 1.5,
      ease: "elastic.out(1, 0.3)",
      stagger: 0.2,
      delay: 0.8,
    })

    // Animate chart values
    gsap.to(".fitness-chart-value", {
      textContent: (index, target) => {
        const stat = fitnessStats[index]
        return stat.value
      },
      duration: 2,
      ease: "power2.out",
      snap: { textContent: 0.01 },
      stagger: 0.2,
      delay: 0.8,
      onUpdate: function () {
        const target = this.targets()[0] as HTMLElement
        const index = Array.from(document.querySelectorAll(".fitness-chart-value")).indexOf(target)
        const stat = fitnessStats[index]

        if (stat && target) {
          if (Number.isInteger(stat.value)) {
            target.textContent = Math.round(Number(target.textContent)).toString()
          } else {
            target.textContent = Number(target.textContent).toFixed(2)
          }
        }
      },
    })
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Fitness Stats
      </h2>

      <div className="fitness-intro text-center mb-16">
        <p className="text-2xl text-slate-600 dark:text-slate-400 mb-4">
          When I'm not coding, I'm probably at the gym 💪
        </p>
        <p className="text-lg text-slate-500 dark:text-slate-500">
          Staying physically strong helps me stay mentally sharp
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {fitnessStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="fitness-card bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 group hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.description}</span>
              </div>

              <div className="text-center">
                <div
                  ref={(el) => (cardValuesRef.current[index] = el)}
                  className="fitness-card-value text-3xl font-bold mb-2 text-slate-800 dark:text-slate-200"
                >
                  0
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">{stat.unit}</div>
                <div className="font-semibold text-slate-700 dark:text-slate-300">{stat.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Enhanced Chart */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-700">
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Performance Chart</h3>
          <p className="text-slate-400">Visual representation of my fitness achievements</p>
        </div>

        <div
          ref={chartRef}
          className="relative h-80 flex items-end justify-center gap-8 bg-slate-800/50 rounded-2xl p-6"
        >
          {fitnessStats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center relative group">
              {/* Value display */}
              <div className="fitness-chart-value text-lg font-bold mb-3 text-white bg-slate-700 px-3 py-1 rounded-lg shadow-lg">
                0
              </div>

              {/* Bar container */}
              <div className="relative flex flex-col items-center">
                {/* Animated bar */}
                <div
                  className={`fitness-bar w-16 ${stat.bgColor} rounded-t-lg transition-all duration-300 shadow-lg relative overflow-hidden`}
                  style={{ height: "0px" }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent transform -skew-y-12 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                </div>

                {/* Base line */}
                <div className="w-16 h-1 bg-slate-600 rounded-b-lg"></div>
              </div>

              {/* Label */}
              <div className="mt-4 text-center">
                <div className="font-semibold text-white text-sm mb-1">{stat.label}</div>
                <div className="text-xs text-slate-400">{stat.unit}</div>
              </div>

              {/* Hover tooltip */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-slate-700 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                {stat.description}: {stat.value} {stat.unit}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-700"></div>
              </div>
            </div>
          ))}

          {/* Y-axis grid lines */}
          <div className="absolute left-0 bottom-0 h-full w-full pointer-events-none">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="absolute w-full border-t border-slate-600/30 flex items-center"
                style={{ bottom: `${i * 20}%` }}
              >
                <span className="text-xs text-slate-500 -ml-12 bg-slate-800 px-2 py-1 rounded">
                  {Math.round((maxValue * i) / 5)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart footer */}
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">💡 Consistent training leads to consistent results</p>
        </div>
      </div>
    </div>
  )
}
