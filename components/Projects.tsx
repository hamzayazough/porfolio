"use client"

import { useState, useEffect } from "react"
import {
  ExternalLink,
  X,
  CheckCircle,
  Calendar,
  Zap,
  Brain,
  Search,
  MapPin,
  TrendingUp,
  Heart,
  Leaf,
  Pill,
  GamepadIcon,
  Camera,
  Github,
} from "lucide-react"
import { gsap } from "gsap"

const projectsData = [
  {
    name: "AI Animation Studio",
    year: "2025",
    subtitle: "Revolutionary 2D Animation Software with Integrated AI Assistant",
    tech: ["C++", "Qt5", "NestJS", "Python", "Stable Diffusion", "LoRA", "Firebase", "OpenToonz", "Computer Vision"],
    highlights: [
      "Transforms traditional animation workflow by integrating AI directly into production process",
      "Built as a fork of OpenToonz with comprehensive AI-powered features",
      "Accelerates animation production by 20x while centralizing 90% of workflow",
      "Continuous LoRA fine-tuning improves anime-style consistency by 25%",
    ],
    features: [
      "Intelligent Character Generation: Create 2D characters from multiple angles using AI prompts with contextual project memory",
      "Built-in AI Chat Interface: Real-time assistance for navigation, tool discovery, and workflow optimization",
      "Advanced Scene Creation: Combines manual drawing with AI for backgrounds, objects, clothing, and environments",
      "Contextual Frame Generation: Generate subsequent frames based on current frame plus additional prompts",
      "Modular Project Management: Structured interface with dedicated sections for character creation, scene consultation, and project assembly",
    ],
    impact:
      "Addresses the animation industry's need for faster production workflows while maintaining creative control and artistic quality",
    image: "AI animation studio interface with drawing tools and AI assistant",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    category: "AI/ML",
  },
  {
    name: "Knowvance",
    year: "2025",
    subtitle: "AI-Powered Study Platform with Document Analysis and Personalized Learning",
    url: "https://knowvance.ca",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "AWS",
      "PostgreSQL",
      "RAG",
      "Vector DB",
      "OpenAI",
      "Groq",
      "Stripe",
      "Chrome Extension",
    ],
    highlights: [
      "Serving 100+ active users with 60% improvement in study efficiency",
      "Combines AI-powered document analysis with personalized learning tools",
      "RAG architecture enables intelligent chat based on uploaded materials",
      "Chrome extension seamlessly integrates studying tools into web browsing",
    ],
    features: [
      "Subject-Based Organization: Create dedicated subjects and upload PDFs to build comprehensive knowledge bases",
      "AI-Powered Chat Interface: Intelligent chat system using RAG architecture to answer questions from uploaded materials",
      "Interactive Knowledge Building: Save AI responses to knowledge base or generate flashcards from chat interactions",
      "Customizable Practice Exams: Generate tests with specific parameters including difficulty, topics, and question count",
      "Flexible Exam Formats: Take exams interactively online or download as PDF for offline practice",
      "PDF Export Functionality: Convert study materials and generated content into professional PDF formats",
    ],
    impact: "Makes practice-based learning more accessible and effective than traditional reading-only approaches",
    image: "study platform dashboard with AI chat and flashcards",
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
    category: "AI/ML",
  },
  {
    name: "AppartFindr",
    year: "2024",
    subtitle: "Intelligent Accommodation and Roommate Finder with AI-Powered Matching",
    url: "https://apartfindr.ca",
    tech: [
      "Angular",
      "TypeScript",
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "PostGIS",
      "AWS",
      "Auth0",
      "Mapbox",
      "Web Scraping",
    ],
    highlights: [
      "Aggregates 3,000+ accommodation listings from multiple rental websites",
      "Reduces average apartment search time by 40% with intelligent matching",
      "Sophisticated AI algorithms match users with ideal accommodations",
      "Interactive Mapbox-powered visualization with real-time compatibility scores",
    ],
    features: [
      "Multi-Source Aggregation: Advanced web scraping system collecting listings with location, price, amenities, and availability",
      "Comprehensive Profile System: Detailed preference forms covering transportation, lifestyle, safety, proximity to services, and budget",
      "Intelligent Matching Algorithm: Sophisticated recommendation engine with matching percentages and detailed pros/cons analysis",
      "Collaborative Filtering: Learns from user behavior and similar profiles to improve recommendations",
      "Interactive Map Interface: Geographic property browsing with real-time matching scores and compatibility indicators",
      "Roommate Matching: Extends beyond property matching to find compatible roommates based on lifestyle preferences",
    ],
    impact:
      "Centralizes the entire search process, eliminating frustration of managing multiple rental websites while providing data-driven insights",
    image: "apartment finder app with map interface and listings",
    icon: MapPin,
    color: "from-green-500 to-emerald-500",
    category: "Web App",
  },
  {
    name: "Finn.AI (Hackathon)",
    year: "2024",
    subtitle: "AWS-Powered Financial Analysis Platform (4th Place Hackathon)",
    github: "https://github.com/hamzayazough/Finn.Ai",
    tech: ["Python", "Angular", "Go", "AWS S3", "AWS Lambda", "Claude 3", "Yahoo Finance", "Finnhub", "Docker"],
    highlights: [
      "Finalist project in AWS-powered hackathon competition",
      "Centralizes and analyzes key financial data in real time",
      "AI-powered financial analysis with Claude 3 integration",
      "Advanced technical and sentiment analysis capabilities",
    ],
    features: [
      "Real-time Financial Data: Centralizes key financial information with live market updates",
      "AI Financial Analysis: Applies Claude 3 AI agents for intelligent financial insights",
      "Interactive Support Chat: Built-in chat system for user assistance and guidance",
      "Automated Insights: Generates automated insights from financial reports and market data",
      "Technical Analysis: Advanced technical analysis tools for market trends",
      "Sentiment Analysis: Analyzes market sentiment from news and social media",
      "News Curation: Curates relevant financial news based on user interests and portfolio",
    ],
    impact:
      "Democratizes advanced financial analysis tools by making them accessible through an intuitive AI-powered interface",
    image: "financial dashboard with charts and AI analysis",
    icon: TrendingUp,
    color: "from-yellow-500 to-orange-500",
    category: "Hackathon",
  },
  {
    name: "Senevolus (Hackathon)",
    year: "2024",
    subtitle: "Community Platform Connecting Elders with Volunteers",
    github: "https://github.com/hamzayazough/Senevolus",
    tech: ["React", "Node.js", "MongoDB", "AI Validation", "Real-time Chat", "Geolocation"],
    highlights: [
      "Local community-driven platform for elder assistance",
      "AI-powered user validation for security and trust",
      "Task-sharing and moral support facilitation",
      "Innovative accountability and safety features",
    ],
    features: [
      "Elder-Volunteer Matching: Connects elders in need with willing volunteers in their area",
      "Task Management: Facilitates various assistance tasks from errands to companionship",
      "AI User Validation: Innovative AI-powered system ensures user authenticity and safety",
      "Real-time Communication: Secure messaging system for coordination and support",
      "Geolocation Services: Location-based matching for nearby assistance",
      "Trust & Safety: Comprehensive verification and rating system for accountability",
      "Community Building: Features to build lasting relationships and community connections",
    ],
    impact:
      "Strengthens community bonds while providing essential support to elderly population through technology-enabled volunteering",
    image: "community platform with elder and volunteer profiles",
    icon: Heart,
    color: "from-rose-500 to-pink-500",
    category: "Social Impact",
  },
  {
    name: "Plantuary (Hackathon)",
    year: "2024",
    subtitle: "Smart Agronomy Assistant with AI-Powered Crop Recommendations",
    github: "https://github.com/hamzayazough/Plantuary",
    tech: ["Flutter", "Dart", "NestJS", "TypeScript", "PostgreSQL", "Redis", "Mapbox", "Weather API", "ML"],
    highlights: [
      "Cross-platform app (iOS/Android/Web) for smart farming",
      "Analyzes 9,000+ plants against climate conditions",
      "Real-time weather integration with predictive analytics",
      "Context-aware crop recommendations based on location",
    ],
    features: [
      "Context-aware Crop Matchmaking: Uses Mapbox geocoding and weather data to score 9,000+ plants against local conditions",
      "Personalized Planting Calendar: Automatically generates sowing, transplanting, and harvest dates updated with forecast changes",
      "Rich Plant Encyclopedia: Comprehensive profiles with soil preferences, spacing, companion planting, and pest information",
      "Interactive Mapping: Mapbox overlays for user plots, climate zones, and nearby suppliers with navigation",
      "Predictive Analytics: ML-based yield estimates and weather-based task recommendations",
      "Smart Notifications: Push alerts for extreme weather actions like frost protection or irrigation needs",
    ],
    impact:
      "Democratizes agricultural expertise by providing data-driven farming advice to gardeners and small-scale farmers",
    image: "agricultural app with plant recommendations and weather data",
    icon: Leaf,
    color: "from-green-400 to-emerald-600",
    category: "Mobile App",
  },
  {
    name: "MyPillsAssistant (Hackathon)",
    year: "2024",
    subtitle: "AI-Powered Medication Management for Elderly (ConUHacks)",
    github: "https://github.com/CarlEric-Lafleur/ConUHacks",
    tech: ["React", "Node.js", "MongoDB", "OpenCV", "Twilio", "Cron Jobs", "OCR"],
    highlights: [
      "Hackathon project focused on elderly healthcare",
      "OpenCV-powered prescription analysis and pill recognition",
      "Automated medication reminders with caregiver notifications",
      "Smart scheduling with assistant synchronization",
    ],
    features: [
      "Prescription Analysis: OpenCV and OCR technology to analyze prescriptions and create pill tracking objects",
      "Smart Scheduling: Automated pill scheduling with customizable reminder times",
      "Caregiver Sync: Assistant synchronization to receive notifications when elder needs medication",
      "Automated Reminders: MongoDB cron jobs and Twilio integration for timely notifications",
      "Medication Tracking: Comprehensive tracking of medication adherence and history",
      "Timesheet Planning: Visual planning interface for medication schedules",
      "Emergency Alerts: Automatic alerts for missed medications or emergencies",
    ],
    impact:
      "Improves medication adherence for elderly patients while providing peace of mind for caregivers through automated monitoring",
    image: "medication tracking app with pill recognition",
    icon: Pill,
    color: "from-blue-400 to-indigo-600",
    category: "Healthcare",
  },
  {
    name: "Kahoot app",
    year: "2024",
    subtitle: "Multiplayer Quiz Platform with AI-Generated Content",
    tech: ["Angular", "Electron", "Flutter", "NestJS", "MongoDB", "Firebase", "Socket.io", "Groq AI"],
    highlights: [
      "Full-featured Kahoot replica with enhanced multiplayer functionality",
      "AI-generated questions for solo mode using Groq",
      "Real-time multiplayer with socket-based communication",
      "Cross-platform desktop and mobile support",
    ],
    features: [
      "Multiplayer Functionality: Real-time quiz games using Socket.io for seamless multiplayer experience",
      "AI Question Generation: Groq AI integration for generating quiz questions in solo mode",
      "Daily Quests: Gamification features with daily challenges and rewards",
      "Social Features: Add friends, join friends' games, and maintain friend lists",
      "Multi-Chat System: General chat, game-specific chat, and private messaging",
      "Profile Management: Comprehensive user profiles with statistics and achievements",
      "Cross-Platform: Desktop app using Electron/Angular and mobile app with Flutter",
    ],
    impact:
      "Enhances educational engagement through gamified learning with AI-powered content generation and social features",
    image: "quiz game interface with multiplayer features",
    icon: GamepadIcon,
    color: "from-purple-400 to-violet-600",
    category: "Education",
  },
  {
    name: "Automatic Class Note Taker",
    year: "2024",
    subtitle: "AI-Powered Zoom Lecture Capture System",
    github: "https://github.com/hamzayazough/lazyPPTgenerator",
    tech: ["Python", "PyAutoGUI", "Pytesseract", "Python-PPTX", "OCR", "Computer Vision"],
    highlights: [
      "Automatically captures Zoom lecture slides in real-time",
      "OCR-based slide change detection for intelligent capture",
      "Generates formatted PowerPoint presentations automatically",
      "Smart region selection for precise slide extraction",
    ],
    features: [
      "Smart Region Selection: Mouse-based selection of slide number and viewport areas for precise monitoring",
      "Process Monitoring: Continuous monitoring of Zoom application status using psutil",
      "OCR Slide Detection: Pytesseract OCR detects slide number changes every 2 seconds for automatic capture",
      "Automatic Capture: PyAutoGUI screenshots slide regions and embeds them into PowerPoint slides",
      "Real-time Processing: Instant slide creation and temporary file cleanup for efficient storage",
      "Graceful Shutdown: Ctrl+C handling for clean session termination and file compilation",
      "Auto-Save: Finished presentations automatically saved to Downloads folder",
    ],
    impact:
      "Revolutionizes note-taking for students by automating the tedious process of capturing and organizing lecture slides",
    image: "automated note taking system capturing zoom slides",
    icon: Camera,
    color: "from-gray-500 to-slate-600",
    category: "Automation",
  },
]

interface ProjectsProps {
  filter: string
}

export default function Projects({ filter }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const categories = [
    "All",
    "AI/ML",
    "Web App",
    "Mobile App",
    "Hackathon",
    "Social Impact",
    "Healthcare",
    "Education",
    "Automation",
  ]

  useEffect(() => {
    gsap.fromTo(
      ".project-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".projects-container",
          start: "top 80%",
        },
      },
    )
  }, [])

  const filteredProjects = projectsData.filter((project) => {
    const matchesFilter = filter ? project.tech.some((tech) => tech.toLowerCase().includes(filter.toLowerCase())) : true
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
    return matchesFilter && matchesCategory
  })

  const openModal = (project: any) => {
    setSelectedProject(project)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setSelectedProject(null)
    document.body.style.overflow = ""
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
          Featured Projects
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filter && (
          <div className="flex items-center gap-4 mb-4">
            <span className="text-slate-600 dark:text-slate-400">
              Filtering by: <strong className="text-blue-600">{filter}</strong>
            </span>
            <button
              onClick={() => window.location.reload()}
              className="text-sm px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              Clear filter
            </button>
          </div>
        )}
      </div>

      <div className="projects-container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => {
          const Icon = project.icon
          return (
            <div
              key={index}
              className="project-card bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700 group"
            >
              {/* Project Header */}
              <div className={`relative p-6 bg-gradient-to-br ${project.color} text-white`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">{project.year}</span>
                    </div>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p className="text-white/90 text-sm leading-relaxed line-clamp-2">{project.subtitle}</p>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Tech Stack */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs rounded-full font-medium">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Key Highlights */}
                <div className="mb-6">
                  <ul className="space-y-2">
                    {project.highlights.slice(0, 2).map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="text-sm flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-300 line-clamp-2">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex gap-2">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live</span>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-slate-600 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 text-sm font-medium transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => openModal(project)}
                    className="flex items-center gap-1 text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
                  >
                    <span>Details</span>
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Enhanced Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className={`relative p-8 bg-gradient-to-br ${selectedProject.color} text-white`}>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-start gap-6">
                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                  <selectedProject.icon className="w-12 h-12" />
                </div>
                <div className="flex-1">
                  <h3 className="text-4xl font-bold mb-2">{selectedProject.name}</h3>
                  <p className="text-xl text-white/90 mb-4">{selectedProject.subtitle}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                      <Calendar className="w-5 h-5" />
                      <span className="font-medium">{selectedProject.year}</span>
                    </div>
                    <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm font-medium">
                      {selectedProject.category}
                    </span>
                    {selectedProject.url && (
                      <a
                        href={selectedProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                        <span>Live Site</span>
                      </a>
                    )}
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Key Features */}
                  <div>
                    <h4 className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-200">Key Features</h4>
                    <ul className="space-y-4">
                      {selectedProject.features.map((feature: string, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-slate-800 dark:text-slate-200">{feature.split(":")[0]}:</strong>
                            <span className="text-slate-700 dark:text-slate-300 ml-1">
                              {feature.split(":").slice(1).join(":")}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact */}
                  <div>
                    <h4 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200">Impact & Results</h4>
                    <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-xl">
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{selectedProject.impact}</p>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Technology Stack */}
                  <div>
                    <h4 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-lg font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h4 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">Highlights</h4>
                    <ul className="space-y-3">
                      {selectedProject.highlights.map((highlight: string, highlightIndex: number) => (
                        <li key={highlightIndex} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 dark:text-slate-300 text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
