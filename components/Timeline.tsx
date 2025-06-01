"use client"

import { useEffect } from "react"
import { Briefcase, CheckCircle } from "lucide-react"
import { gsap } from "gsap"

const experienceData = [
  {
    company: "Coveo Solutions Inc.",
    role: "Full-Stack Developer Intern",
    period: "May 2025 – Aug 2025",
    bullets: [
      "Built AI-powered search components across React / Angular / Vue + EJS.",
      "Tuned ML models; relevance lifted 35%.",
      "Delivered tooling that boosted team velocity 25%.",
    ],
  },
  {
    company: "Beneva Assurances",
    role: "Full-Stack Developer Intern",
    period: "May 2024 – May 2025",
    bullets: [
      "Architected audit system (Java + Angular + Postgres).",
      "Pilot success → adopted by entire department.",
      "Automated form generation & notifications for 400+ users; audit time ↓ 40%.",
    ],
  },
  {
    company: "Sûreté du Québec",
    location: "Rivière-du-Loup, QC",
    role: "Student Intern",
    period: "June 2023 – August 2023",
    bullets: [
      "Developed scripts to automate administrative tasks and streamline internal processes.",
      "Analyzed requirements and designed a tailored optimization solution, presented to and approved by senior management.",
      "Proactively proposed and implemented the technical solution.",
    ],
  },
]

export default function Timeline() {
  useEffect(() => {
    gsap.fromTo(
      ".timeline-item",
      { opacity: 0, x: (index) => (index % 2 === 0 ? -100 : 100) },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 70%",
        },
      },
    )
  }, [])

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Experience
      </h2>

      <div className="timeline-container relative max-w-6xl mx-auto">
        {/* Vertical line - positioned in the center */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full hidden md:block"></div>

        <div className="space-y-12">
          {experienceData.map((exp, index) => (
            <div key={index} className="timeline-item relative">
              {/* Desktop layout */}
              <div className="hidden md:block">
                <div className={`flex items-center ${index % 2 === 0 ? "flex-row-reverse" : "flex-row"}`}>
                  {/* Content card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center mb-6">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl mr-4">
                          <Briefcase className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">{exp.role}</h3>
                          <p className="text-blue-600 dark:text-blue-400 font-semibold">{exp.company}</p>
                          {exp.location && <p className="text-slate-500 dark:text-slate-400 text-sm">{exp.location}</p>}
                        </div>
                      </div>

                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">{exp.period}</p>

                      <ul className="space-y-3">
                        {exp.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 dark:text-slate-300">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Timeline dot - properly positioned */}
                  <div className="w-2/12 flex justify-center">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white dark:border-slate-900 shadow-lg z-10"></div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="w-5/12"></div>
                </div>
              </div>

              {/* Mobile layout */}
              <div className="block md:hidden">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 ml-8 relative">
                  {/* Mobile timeline dot */}
                  <div className="absolute -left-4 top-8 w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white dark:border-slate-900"></div>

                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg mr-3">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{exp.role}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm">{exp.company}</p>
                      {exp.location && <p className="text-slate-500 dark:text-slate-400 text-xs">{exp.location}</p>}
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium">{exp.period}</p>

                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-300 text-sm">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile vertical line */}
        <div className="absolute left-2 top-0 h-full w-0.5 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full block md:hidden"></div>
      </div>
    </div>
  )
}
