"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function F1Showcase() {
    return (
        <section className="bg-background py-12 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.8,
                        ease: [0.25, 0.1, 0.25, 1.0]
                    }}
                    className="relative"
                >                    <div className="relative h-[300px] md:h-[450px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="/f1.png"
                            alt="Formula 1 car with custom plate"
                            fill
                            priority
                            className="object-cover"
                            style={{ objectPosition: '70% 50%' }}
                        />
                    </div>

                    {/* Decorative elements */}
                    <motion.div
                        className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />

                    <motion.div
                        className="absolute -bottom-8 -left-8 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.4, 0.7, 0.4]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 1
                        }}
                    />
                </motion.div>
            </div>
        </section>
    )
}
