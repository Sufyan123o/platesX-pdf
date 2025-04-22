"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(7, { message: "Please enter a valid phone number." }),
    plateNumber: z.string().min(1, { message: "Please enter your plate number." }),
    onRetention: z.enum(["yes", "no"]),
    listPrice: z.string().min(1, { message: "Please enter your desired list price." }),
    bottomPrice: z.string().min(1, { message: "Please enter your minimum acceptable price." }),
    subject: z.string().min(1, { message: "Please enter a subject." }),
    message: z.string().optional(),
})

export default function SellPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            plateNumber: "",
            onRetention: "no",
            listPrice: "",
            bottomPrice: "",
            subject: "",
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
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Sell Your Plate With Us</h1>
                            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Let us help you sell your private registration plate for the best price
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">Why Sell With PlatesX?</h2>
                            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                                <li>Professional marketing and exposure to our extensive buyer network</li>
                                <li>Competitive commission - only pay when your plate sells</li>
                                <li>Expert valuation and advice to maximize your plate's value</li>
                                <li>Secure handling of all paperwork and DVLA procedures</li>
                                <li>Trusted by hundreds of satisfied customers</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">Our Process:</h3>
                            <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                                <li>Fill out the form with your plate details</li>
                                <li>Our experts will contact you to discuss valuation</li>
                                <li>We list and market your plate to our buyer network</li>
                                <li>When sold, we handle all transfer paperwork</li>
                                <li>You receive your payment minus DVLA fees and our commission</li>
                            </ol>
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
                                <p>Thank you for choosing to sell your plate with us. One of our specialists will contact you shortly to discuss your plate valuation and next steps.</p>
                                <Button onClick={() => setIsSubmitted(false)} variant="outline">Submit Another Request</Button>
                            </div>
                        ) : (
                            <div className="border rounded-lg p-6 space-y-6">
                                <h3 className="text-xl font-bold">Sell Your Plate</h3>
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
                                            name="plateNumber"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Registration Number</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g. ABC 123" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="onRetention"
                                            render={({ field }) => (
                                                <FormItem className="space-y-3">
                                                    <FormLabel>Is the plate on retention?</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                            className="flex space-x-4"
                                                        >
                                                            <FormItem className="flex items-center space-x-2 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="yes" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">Yes</FormLabel>
                                                            </FormItem>
                                                            <FormItem className="flex items-center space-x-2 space-y-0">
                                                                <FormControl>
                                                                    <RadioGroupItem value="no" />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">No, it's on a vehicle</FormLabel>
                                                            </FormItem>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="listPrice"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Desired Listing Price (£)</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="e.g. 5000" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="bottomPrice"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Minimum Acceptable Price (£)</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="e.g. 3500" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="subject"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Subject</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Brief description" {...field} />
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
                                                    <FormLabel>Additional Information (Optional)</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Any other details about your plate or special requirements"
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
