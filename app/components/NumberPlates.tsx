"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NumberPlates() {
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
        <section id="listings" className="w-full py-12">
            <div className="container">
                <h2 className="text-3xl font-bold text-center mb-8">Available Number Plates</h2>
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
                                        <Card key={plate.id} className="hover:shadow-lg transition-shadow">
                                            <CardHeader>
                                                <CardTitle className="text-2xl font-bold text-center">
                                                    {plate.number}
                                                </CardTitle>
                                                <CardDescription className="text-center">
                                                    {plate.description}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-center">
                                                    <p className="text-xl font-semibold">
                                                        £{plate.price.toLocaleString()}
                                                    </p>
                                                    <button 
                                                        onClick={() => scrollToSection("contact")}
                                                        className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg"
                                                    >
                                                        Enquire Now
                                                    </button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    )
}