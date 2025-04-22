"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      const offset = 80 // Account for header height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  return (
    <motion.header
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">        <div className="hidden md:flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">PlatesX</span>
            <img
              className="h-12 w-auto"
              src="/plateslogo.png?height=50&width=200"
              alt="PlatesX Logo"
            />
          </Link>
        </div>
        
        <div className="flex gap-x-4 md:gap-x-8">
          <Link href="/" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">
            Home
          </Link>          <Link href="/guides" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">
            Guides
          </Link>
          <Link href="/buy" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">
            Buy
          </Link>
          <Link href="/sell" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">
            Sell
          </Link>
          <Link href="/sourcing" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">
            Sourcing
          </Link>
          <button
            onClick={() => window.location.pathname === "/" 
              ? scrollToSection("contact") 
              : window.location.href = "/#contact"}
            className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>        <div className="hidden md:flex flex-1 justify-end">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
          )}
        </div>
      </nav>
    </motion.header>
  )
}

