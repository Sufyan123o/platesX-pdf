"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    quote:
      "Investing in dateless plates through their guidance has been the best financial decision I've made. My portfolio has appreciated by 32% in just 18 months.",
    author: "James Wilson",
    position: "Private Investor",
    image: "/plateslogo.png",
  },
  {
    quote:
      "Their market analysis was spot-on. I purchased the plates they recommended at auction and have already received offers at double my initial investment.",
    author: "Sarah Thompson",
    position: "Car Enthusiast & Collector",
    image: "/plateslogo.png",
  },
  {
    quote:
      "The educational resources provided exceptional insights into the private plates market. As a first-time investor, I felt confident making informed decisions.",
    author: "Michael Chen",
    position: "Entrepreneur",
    image: "/plateslogo.png",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="container mx-auto">
        <motion.h2
          className="text-5xl font-black mb-16 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          What Our Clients Say
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              className="bg-gray-800 p-6 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.image || "/plateslogo.png"}
                  alt={testimonial.author}
                  width={50}
                  height={50}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-gray-400">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

