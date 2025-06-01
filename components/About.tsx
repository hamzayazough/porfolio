"use client"

import { useEffect } from "react"
import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { gsap } from "gsap"

const profileData = {
  name: "Hamza Yazough",
  title: "Full-Stack Engineer & AI Enthusiast",
  email: "hamza.yazough1992@gmail.com",
  phone: "+1 581-337-8450",
  location: "Montréal, QC, Canada",
  links: {
    github: "https://github.com/hamzayazough",
    linkedin: "https://linkedin.com/in/hamza-y-967916250",
  },
  summary:
    "Software-engineering undergrad at Polytechnique Montréal (2022-2027) who loves building AI-powered products that shave hours off tedious workflows. Interned at Coveo, Beneva for a whole year and Sûreté du Québec. Finalist & hacker at AWS powered Hackathon, PolyHx, ConUHacks and McHacks.",
}

export default function About() {
  useEffect(() => {
    gsap.fromTo(
      ".about-content",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 80%",
        },
      },
    )

    gsap.fromTo(
      ".about-image",
      { opacity: 0, x: 50, rotation: -5 },
      {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 80%",
        },
      },
    )
  }, [])

  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          About Me
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="about-content order-2 lg:order-1">
            <div className="w-full">
              <p className="text-xl leading-relaxed mb-8 text-slate-700 dark:text-slate-300">{profileData.summary}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <a
                    href={`mailto:${profileData.email}`}
                    className="text-sm hover:text-blue-600 transition-colors truncate"
                  >
                    {profileData.email}
                  </a>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <a href={`tel:${profileData.phone}`} className="text-sm hover:text-blue-600 transition-colors">
                    {profileData.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm">{profileData.location}</span>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Github className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <a
                    href={profileData.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-blue-600 transition-colors truncate"
                  >
                    GitHub Profile
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={profileData.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-slate-700 text-white rounded-full hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>

                <a
                  href={profileData.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          <div className="about-image order-1 lg:order-2 relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl transform hover:rotate-2 transition-transform duration-500">
              <img
                src="/image.png?height=600&width=600"
                alt="Hamza Yazough"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-6 bg-purple-600 text-white p-6 rounded-xl shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <p className="font-bold text-lg">Software Engineering</p>
              <p className="text-purple-200">Polytechnique Montréal</p>
              <p className="text-purple-200">2022-2027</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
