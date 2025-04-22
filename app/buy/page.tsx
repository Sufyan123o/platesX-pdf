"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import BuyingForm from "../components/BuyingForm"
import UKPlate from "../components/UKPlate"

// Example plate listings - in a real app, this would come from an API or database
const plates = [
    {
        id: 1,
        number: "S1 TAL",
        price: 22000,
        category: "Other",
    },
    {
        id: 2,
        number: "5 UFS",
        price: 49995,
        category: "Dateless",
    },
    {
        id: 3,
        number: "921 A",
        price: 34995,
        category: "Dateless",
    },
    {
        id: 4,
        number: "ROS 17E",
        price: 14995,
        category: "Other",
    }
]

const categories = ["All", ...new Set(plates.map(plate => plate.category))]

export default function BuyPage() {
    const [selectedPlate, setSelectedPlate] = useState("")
    
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
        <section className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
                <motion.div 
                    className="mb-12 space-y-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">Available Number Plates</h1>
                    <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
                        Browse our collection of premium UK private registration plates.
                        Contact us for more options not listed here.
                    </p>
                </motion.div>

                <Tabs defaultValue="All" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 lg:grid-cols-3 mb-8">
                        {categories.map((category) => (
                            <TabsTrigger key={category} value={category}>
                                {category}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {categories.map((category) => (
                        <TabsContent key={category} value={category}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {plates
                                    .filter(plate => category === "All" || plate.category === category)
                                    .map(plate => (
                                        <motion.div
                                            key={plate.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >                                            <Card className="hover:shadow-lg transition-shadow">
                                                <CardHeader className="pb-2">                                                    <div className="mx-auto w-full max-w-[280px] mb-4">
                                                        <UKPlate 
                                                            number={plate.number} 
                                                            plateStyle="yellow"
                                                        />
                                                    </div>
                                                    <CardDescription className="text-center">
                                                        {plate.description}
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>                                                    <div className="text-center">                                                        <p className="text-xl font-semibold">
                                                            £{plate.price.toLocaleString()}
                                                        </p>
                                                        <Button 
                                                            onClick={() => {
                                                                setSelectedPlate(plate.number);
                                                                scrollToSection('buy-enquiry-form');
                                                            }}
                                                            className="mt-4"
                                                        >
                                                            Enquire Now
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
                
                {/* Add BuyingForm at the bottom of the page */}
                <div id="buy-enquiry-form" className="mt-20">
                    <BuyingForm plate={selectedPlate} />
                </div>
                <div className="mt-16 text-center">
                    <p className="text-lg text-muted-foreground mb-6">
                        Can't find what you're looking for? We have access to thousands more plates not listed here.
                    </p>
                    <a 
                        href="/sourcing" 
                        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-lg font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
                    >
                        Ask Us to Find Your Perfect Plate
                    </a>                </div>
                
            </div>
        </section>
    )
}
