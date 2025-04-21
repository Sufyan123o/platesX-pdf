"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"

const plateTypes = [
  { id: "dateless", label: "Dateless" },
  { id: "name", label: "Name" },
  { id: "initials", label: "Initials" },
  { id: "number", label: "Number" },
  { id: "prefix", label: "Prefix Style" },
  { id: "suffix", label: "Suffix Style" },
  { id: "current", label: "Current Style" }
]

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(7, { message: "Please enter a valid phone number." }),
  plateTypes: z.array(z.string()).min(1, { message: "Please select at least one plate type." }),
  desiredPlate: z.string().optional(),
  budget: z.string().min(1, { message: "Please enter your budget." }),
  timeframe: z.string().min(1, { message: "Please select a timeframe." }),
  message: z.string().optional(),
})

export default function SourcingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      plateTypes: [],
      desiredPlate: "",
      budget: "",
      timeframe: "",
      message: "",
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
    }, 1500)
  }

  return (
    <section className="py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Plate Sourcing Service</h1>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Let us find your perfect private plate
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Why Use Our Sourcing Service?</h2>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                <li>Access to thousands of plates not publicly available</li>
                <li>Industry connections to find rare and unique combinations</li>
                <li>Expert negotiation to secure the best possible price</li>
                <li>Time-saving - we do all the research for you</li>
                <li>Satisfaction guaranteed - no obligation quotes</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Our Sourcing Process:</h3>
              <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                <li>Tell us what you're looking for using the form</li>
                <li>Our team researches available options matching your criteria</li>
                <li>We present you with suitable options and price quotes</li>
                <li>Choose your preferred plate - no obligation</li>
                <li>We handle the entire purchase process if you decide to proceed</li>
              </ol>
            </div>
            <div className="bg-primary/10 p-6 rounded-lg">
              <p className="font-semibold">Success Stories:</p>
              <blockquote className="italic border-l-2 border-primary pl-4 mt-2">
                "PlatesX found me the exact plate I wanted after I'd been searching for months. Their service was exceptional and the price was better than I expected."
                <footer className="text-sm mt-1">— James R., BMW Owner</footer>
              </blockquote>
            </div>
          </motion.div>
          
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isSubmitted ? (
              <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-lg space-y-4 text-center">
                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">Request Submitted Successfully!</h3>
                <p>Thank you for your sourcing request. One of our plate specialists will be in touch shortly to discuss your requirements and provide suitable options.</p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline">Submit Another Request</Button>
              </div>
            ) : (
              <div className="border rounded-lg p-6 space-y-6">
                <h3 className="text-xl font-bold">Tell Us What You're Looking For</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Your contact number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="plateTypes"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">Plate Types</FormLabel>
                            <FormDescription>
                              Select the types of plates you're interested in
                            </FormDescription>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {plateTypes.map((item) => (
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="plateTypes"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, item.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== item.id
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {item.label}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="desiredPlate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specific Desired Plate/Format (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. A1 XYZ or name/initials" {...field} />
                          </FormControl>
                          <FormDescription>
                            If you have a specific format or characters in mind
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget Range (£)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 5000-10000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="timeframe"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Timeframe</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="When do you need the plate?" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="asap">As soon as possible</SelectItem>
                              <SelectItem value="1month">Within 1 month</SelectItem>
                              <SelectItem value="3months">Within 3 months</SelectItem>
                              <SelectItem value="6months">Within 6 months</SelectItem>
                              <SelectItem value="noRush">No rush</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Requirements (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any other details about what you're looking for" 
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Submit Request"}
                    </Button>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form, you agree to our Terms of Service and Privacy Policy.
                      There is no obligation to purchase any plate we source.
                    </p>
                  </form>
                </Form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
