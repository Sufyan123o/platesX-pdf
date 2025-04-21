"use client"

import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  currentPlates: z.string().optional(),
  investmentBudget: z.string().optional(),
})

const guides = [
  {
    id: 1,
    title: "Dateless Number Plates",
    description: "Understanding the value and potential of dateless registration plates",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Investment",
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
    title: "Investment Strategies",
    description: "How to build a profitable portfolio of private registration plates",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Investment",
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
    category: "Investment",
  },
  {
    id: 9,
    title: "Selling Your Plates",
    description: "Maximizing returns when selling your private registration numbers",
    imageUrl: "/placeholder.svg?height=600&width=800",
    category: "Selling",
  },
]

export default function GuidePage({ params }: { params: { id: string } }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()
  
  const guideId = parseInt(params.id)
  const guide = guides.find(g => g.id === guideId) || guides[0]
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      currentPlates: "",
      investmentBudget: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    
    // In a real application, you would send this data to your server/API
    console.log(values)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      // In a real application, you'd redirect to the actual guide content
      router.push(`/guides/content/${guideId}`)
    }, 1500)
  }

  return (
    <section className="py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="mx-auto max-w-lg space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{guide.title}</h1>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Complete the form below to access this premium guide
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="currentPlates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Do you currently own any private plates? (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Please list any plates you currently own" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="investmentBudget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Budget (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your approximate budget" {...field} />
                    </FormControl>
                    <FormDescription>
                      This helps us provide more relevant information for you
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Access Guide"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  )
}
