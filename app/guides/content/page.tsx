"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

// Using the same guide data from the original PortfolioGrid component
const guides = [
  {
    id: 1,
    title: "Dateless Number Plates",
    description: "Understanding the value and potential of dateless registration plates",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "General",
  },
  {
    id: 2,
    title: "DVLA Auctions Guide",
    description: "How to participate and secure valuable plates at official DVLA auctions",
    imageUrl: "/placeholder.svg?height=800&width=600",
    category: "Buying",
  },
  {
    id: 3,
    title: "Number Plate Valuation",
    description: "Factors that determine the value of private registration plates",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Valuation",
  },
  {
    id: 4,
    title: "Transfer Process Explained",
    description: "Step-by-step guide to transferring private plates between vehicles",
    imageUrl: "/placeholder.svg?height=800&width=600",
    category: "Legal",
  },
  {
    id: 5,
    title: "Plate Selection Strategy",
    description: "How to select the most suitable private registration plates",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "General",
  },
  {
    id: 6,
    title: "Cherished Marks History",
    description: "The fascinating history of UK's most valuable registration numbers",
    imageUrl: "/placeholder.svg?height=800&width=600",
    category: "History",
  },
  {
    id: 7,
    title: "Legal Requirements",
    description: "Understanding the laws and regulations around private plates in the UK",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Legal",
  },
  {
    id: 8,
    title: "Market Trends Analysis",
    description: "Current trends and future predictions for the private plate market",
    imageUrl: "/placeholder.svg?height=800&width=600",
    category: "General",
  },
  {
    id: 9,
    title: "Selling Your Plates",
    description: "Maximizing returns when selling your private registration numbers",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Selling",
  },
]

const categories = ["All", ...new Set(guides.map((guide) => guide.category))]

export default function GuidesContent() {
  const [filter, setFilter] = useState("All")

  const filteredGuides = filter === "All" ? guides : guides.filter((guide) => guide.category === filter)

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Premium Registration Guides</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Expert resources to help you navigate the private plates market
          </p>
        </motion.div>

        <div className="flex justify-center space-x-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map((guide) => (
            <motion.div
              key={guide.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-background rounded-3xl shadow-lg overflow-hidden hover-lift transition-all duration-300 ease-in-out border-2 border-transparent hover:border-primary/10"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={guide.imageUrl || "/placeholder.svg"}
                  alt={guide.title}
                  fill
                  style={{objectFit: "cover"}}
                  className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300"
                  whileHover={{ opacity: 1 }}
                >
                  <p className="text-white text-center px-4">{guide.description}</p>
                </motion.div>
              </div>
              <div className="p-6">
                <div className="text-sm font-medium text-primary mb-1">{guide.category}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{guide.title}</h3>
                <a href={`/guides/${guide.id}`} className="text-primary hover:underline inline-flex items-center">
                  Read Guide
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
