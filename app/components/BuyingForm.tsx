"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, ShoppingCart } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number." }),
  plateNumber: z.string().min(1, { message: "Please enter the plate you're interested in." }),
  subject: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  formType: z.string().default("buying"),
})

export default function BuyingForm({ plate = "" }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      plateNumber: plate, // Pre-fill with plate param if provided
      subject: plate ? `Interest in plate: ${plate}` : "Buying Enquiry",
      message: "",
      formType: "buying",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    console.log("Form submitted with values:", values);
    
    try {
      console.log("Sending data to API...");
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      console.log("API response status:", response.status);
      
      const data = await response.json();
      console.log("API response data:", data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }
      
      setSubmitStatus('success')
      setStatusMessage("Thank you for your enquiry. We'll get back to you soon about this plate!")
      form.reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      setStatusMessage(error instanceof Error ? error.message : 'Failed to send your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="buy-enquiry" className="bg-background py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">Enquire About A Plate For Sale</h2>
          <p className="text-lg text-muted-foreground">
            Fill out the form below and we'll get in touch about this plate.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {submitStatus === 'success' && (
            <Alert className="bg-green-50 border-green-600 dark:bg-green-900/20">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle className="text-green-600 dark:text-green-400">Success</AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-300">
                {statusMessage}
              </AlertDescription>
            </Alert>
          )}

          {submitStatus === 'error' && (
            <Alert className="bg-red-50 border-red-600 dark:bg-red-900/20">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <AlertTitle className="text-red-600 dark:text-red-400">Error</AlertTitle>
              <AlertDescription className="text-red-700 dark:text-red-300">
                {statusMessage}
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="plateNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plate of Interest</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC 123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
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
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+44 1234 567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Plate Enquiry" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us about your interest in this plate..." className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Submit Enquiry"}
                {!isSubmitting && <ShoppingCart className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  )
}
