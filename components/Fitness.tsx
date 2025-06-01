"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const fitnessStats = [
  { label: "Bench Press", value: 315, unit: "lb", color: "bg-red-500" },
  { label: "Squat", value: 405, unit: "lb", color: "bg-blue-500" },
  { label: "Weighted Pull-up", value: 90, unit: "lb", color: "bg-green-500" },
  { label: "Mile Run", value: 5.55, unit: "min", color: "bg-purple-500" },
]

export default function Fitness() {
  const chartRef = useRef<HTMLDivElement>(null)
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
      { threshold: 0.5 },
    )

    if (chartRef.current) {
      observer.observe(chartRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const animateChart = () => {
    // Animate bars
    gsap.to(".fitness-bar", {
      height: (index, target) => {
        const stat = fitnessStats[index]
        return `${(stat.value / maxValue) * 100}%`
      },
      duration: 1.5,
      ease: "elastic.out(1, 0.3)",
      stagger: 0.2,
    })

    // Animate values
    gsap.to(".fitness-value", {
      textContent: (index, target) => {
        const stat = fitnessStats[index]
        return stat.value
      },
      duration: 2,
      ease: "power2.out",
      snap: { textContent: 0.01 },
      stagger: 0.2,
      onUpdate: function () {
        const target = this.targets()[0] as HTMLElement
        const index = Array.from(document.querySelectorAll(".fitness-value")).indexOf(target)
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
      <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Fitness Stats
      </h2>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700">
        <div className="mb-8 text-center">
          <p className="text-xl text-slate-600 dark:text-slate-400">When I'm not coding, I'm probably at the gym 💪</p>
        </div>

        <div ref={chartRef} className="relative h-80 flex items-end justify-center gap-8">
          {fitnessStats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="fitness-value text-lg font-bold mb-2 text-slate-800 dark:text-slate-200">0</div>

              <div className="relative">
                <div
                  className={`fitness-bar w-16 ${stat.color} rounded-t-lg transition-all duration-300`}
                  style={{ height: "0px" }}
                ></div>
              </div>

              <div className="mt-4 text-center">
                <div className="font-semibold text-slate-800 dark:text-slate-200">{stat.label}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{stat.unit}</div>
              </div>
            </div>
          ))}

          {/* Y-axis labels */}
          <div className="absolute left-0 bottom-0 h-full w-full pointer-events-none">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="absolute w-full border-t border-slate-200 dark:border-slate-700 flex items-center"
                style={{ bottom: `${i * 20}%` }}
              >
                <span className="text-xs text-slate-500 dark:text-slate-400 -ml-8">
                  {Math.round((maxValue * i) / 5)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
