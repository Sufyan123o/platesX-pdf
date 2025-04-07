import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Example plate listings - in a real app, this would come from an API or database
const plates = [
    {
        id: 1,
        number: "ABC 123",
        price: 12500,
        category: "Dateless",
        description: "Classic dateless combination"
    },
    {
        id: 2,
        number: "VIP 1",
        price: 250000,
        category: "Premium",
        description: "Exclusive VIP plate"
    },
    {
        id: 3,
        number: "S1 NGH",
        price: 15000,
        category: "Name",
        description: "Perfect for SINGH"
    },
    {
        id: 4,
        number: "F1 RST",
        price: 175000,
        category: "Premium",
        description: "Highly desirable FIRST plate"
    },
    {
        id: 5,
        number: "22 AA",
        price: 45000,
        category: "Dateless",
        description: "Short dateless combination"
    }
]

const categories = ["All", ...new Set(plates.map(plate => plate.category))]

export default function NumberPlates() {
    return (
        <section className="w-full py-12">
            <div className="container">
                <h2 className="text-3xl font-bold text-center mb-8">Available Number Plates</h2>
                <Tabs defaultValue="All" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4 mb-8">
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
                                        <Card key={plate.id}>
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
                                                    <button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg">
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