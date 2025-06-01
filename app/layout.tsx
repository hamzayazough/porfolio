import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hamza Yazough | Full-Stack Engineer & AI Tinkerer",
  description:
    "Software engineering student at Polytechnique Montréal specializing in AI-powered applications. Experience at Coveo and Beneva, hackathon finalist.",
  keywords: [
    "Hamza Yazough",
    "Full-Stack Developer",
    "AI Engineer",
    "Software Engineering",
    "Polytechnique Montréal",
    "React",
    "Angular",
    "Vue.js",
    "Machine Learning",
  ],
  authors: [{ name: "Hamza Yazough" }],
  creator: "Hamza Yazough",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hamzayazough.dev",
    title: "Hamza Yazough | Full-Stack Engineer & AI Tinkerer",
    description: "Software engineering student at Polytechnique Montréal specializing in AI-powered applications.",
    siteName: "Hamza Yazough Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza Yazough | Full-Stack Engineer & AI Tinkerer",
    description: "Software engineering student at Polytechnique Montréal specializing in AI-powered applications.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://hamzayazough.dev" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
