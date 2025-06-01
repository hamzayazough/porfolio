"use client"

import { useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { gsap } from "gsap"
import * as THREE from "three"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create Three.js scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer

    containerRef.current.appendChild(renderer.domElement)

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Create laptop-like geometry
    const laptopGroup = new THREE.Group()

    // Laptop base
    const baseGeometry = new THREE.BoxGeometry(3, 0.2, 2)
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      metalness: 0.7,
      roughness: 0.2,
    })
    const base = new THREE.Mesh(baseGeometry, baseMaterial)
    laptopGroup.add(base)

    // Laptop screen
    const screenGeometry = new THREE.BoxGeometry(2.8, 1.8, 0.1)
    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.3,
      roughness: 0.7,
    })
    const screen = new THREE.Mesh(screenGeometry, screenMaterial)
    screen.position.set(0, 1, -0.9)
    screen.rotation.x = -0.2
    laptopGroup.add(screen)

    scene.add(laptopGroup)

    // Create floating code particles
    const particleCount = 300
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 15
      positions[i + 1] = (Math.random() - 0.5) * 15
      positions[i + 2] = (Math.random() - 0.5) * 15
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x7c3aed,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      // Rotate laptop
      laptopGroup.rotation.y += 0.005
      laptopGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.1

      // Animate particles
      particles.rotation.y += 0.001
      particles.rotation.x += 0.0005

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // GSAP animations for text
    gsap.fromTo(".hero-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 })

    gsap.fromTo(".hero-subtitle", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.8 })

    gsap.fromTo(".hero-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 1.1 })

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* 3D Scene Container */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 text-white drop-shadow-2xl">Hamza Yazough</h1>
          <h2 className="hero-subtitle text-2xl md:text-4xl font-medium mb-8 text-blue-200 drop-shadow-lg">
            Full-Stack Engineer & AI Enthusiast
          </h2>
          <button
            onClick={scrollToAbout}
            className="hero-cta bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Explore My Work
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-white text-sm mb-2 opacity-80">Scroll Down</span>
        <ChevronDown className="text-white w-6 h-6 opacity-80" />
      </div>
    </div>
  )
}
