"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, ArrowRight, ChevronRight, Mail, Clock, Bell } from "lucide-react"

export default function WaitlistPage() {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
    const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setStatus("error")
      setMessage("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)
    setStatus("idle")

    try {
      // Send to Discord via the API endpoint
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          source: "Waitlist Page"
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }
      
      setStatus("success")
      setMessage("You've been added to our waitlist! We'll notify you when we launch.")
      setEmail("")
    } catch (error) {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
      console.error('Error submitting waitlist form:', error)
    } finally {
      setIsSubmitting(false)
    }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
            {/* Hero Section with Animated Gradient */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#4f46e5,transparent_40%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#14b8a6,transparent_40%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f97316,transparent_45%)]"></div>
                </div>

                <div className="container relative z-10 px-4 py-24 md:py-32 lg:py-40 mx-auto">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-primary/10 text-primary">
                                <Clock className="w-4 h-4 mr-2" />
                                <span className="text-sm font-medium">Coming Soon</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Exclusive <span className="text-primary">PlatesX</span> Guides
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Join our waitlist to be the first to access our premium collection of exclusive guides reserved for early members.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="max-w-md mx-auto"
                        >
                            {status === "success" ? (
                                <Alert className="bg-green-50 border-green-600 dark:bg-green-900/20 mb-8">
                                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    <AlertTitle className="text-green-600 dark:text-green-400">Success</AlertTitle>
                                    <AlertDescription className="text-green-700 dark:text-green-300">
                                        {message}
                                    </AlertDescription>
                                </Alert>
                            ) : status === "error" ? (
                                <Alert className="bg-red-50 border-red-600 dark:bg-red-900/20 mb-8">
                                    <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                                    <AlertTitle className="text-red-600 dark:text-red-400">Error</AlertTitle>
                                    <AlertDescription className="text-red-700 dark:text-red-300">
                                        {message}
                                    </AlertDescription>
                                </Alert>
                            ) : null}

                            <form onSubmit={handleSubmit} className="relative">
                                <Input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 pr-36 h-14 text-base rounded-full shadow-lg focus:ring-2 focus:ring-primary/50"
                                />
                                <div className="absolute inset-y-0 left-3 flex items-center">
                                    <Mail className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="absolute right-1 top-1 rounded-full px-5 h-12"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center">
                                            <span className="animate-spin mr-2">◌</span>
                                            Joining...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            Join Waitlist
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </span>
                                    )}
                                </Button>
                            </form>

                            <p className="text-sm text-muted-foreground mt-4">
                                We respect your privacy. No spam, just updates on our launch and exclusive offers.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Feature Highlights */}
            <div className="container px-4 py-20 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Bell className="h-8 w-8 text-primary" />,
                            title: "Early Access",
                            description: "Be the first to gain access to the guide before it's available to the general public."
                        },
                        {
                            icon: <Clock className="h-8 w-8 text-primary" />,
                            title: "Exclusive Offers",
                            description: "Gain access to crucial invesment advice to build a private registration plate portfolio."
                        },
                        {
                            icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
                            title: "Priority Support",
                            description: "Enjoy dedicated customer service and personalized plate recommendations."
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
                            className="bg-card/50 backdrop-blur-sm border rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Floating Plates Animation */}
            <div className="relative py-20 overflow-hidden">
                <div className="container px-4 mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className="text-center max-w-2xl mx-auto mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Coming Soon to PlatesX</h2>
                        <p className="text-lg text-muted-foreground">
                            Our upcoming page will feature a curated collection of premium guides,
                            showcasing investment guidance to ensure a seamless buying & selling experience.
                        </p>
                    </motion.div>

                    {/* <div className="flex justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                "S 1", "R 2", "VIP 1", "1 WOW", "BOSS", "CEO 1", 
                "WIN 1", "1 ACE", "GOLD 1", "TOP 10"
              ].map((plate, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    opacity: 0, 
                    y: Math.random() * 100 - 50,
                    rotate: Math.random() * 10 - 5 
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    rotate: 0
                  }}
                  transition={{ 
                    duration: 0.8,
                    delay: 0.1 * i,
                    type: "spring",
                    stiffness: 50
                  }}
                  className="bg-white dark:bg-black border-4 border-yellow-500 rounded-md px-3 py-2 text-center shadow-lg"
                >
                  <p className="text-lg font-bold">{plate}</p>
                </motion.div>
              ))}
            </div>
          </div> */}
                </div>

                {/* Background Elements */}
                <div className="absolute top-1/4 -left-20 w-60 h-60 bg-primary/20 rounded-full filter blur-3xl opacity-30"></div>
                <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-secondary/30 rounded-full filter blur-3xl opacity-30"></div>
            </div>

            {/* FAQ Section */}
            <div className="container px-4 py-20 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-2xl mx-auto mb-12"
                >
                    <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground">
                        Get answers to common questions about our upcoming platform and waitlist
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        {
                            q: "How much will the guides cost?",
                            a: "It will be completely free of charge for waitlist members."
                        },
                        {
                            q: "Will the guide offer investment plates?",
                            a: "No, the guide will not offer investment plates. It will focus on information and tips for beginners to start investing in plates."
                        },
                        {
                            q: "How do I secure the guide early?",
                            a: "By joining the waitlist, you'll receive early access to purchase the guide before it goes public."
                        },
                        {
                            q: "Are there any fees to join the waitlist?",
                            a: "No, joining the waitlist is completely free with no obligation to purchase."
                        }
                    ].map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                            className="border rounded-xl p-6 hover:border-primary/50 transition-all"
                        >
                            <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                            <p className="text-muted-foreground">{faq.a}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <Button
                        size="lg"
                        className="rounded-full px-8"
                        onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Join the Waitlist
                        <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </motion.div>
            </div>
        </div>
    )
}

