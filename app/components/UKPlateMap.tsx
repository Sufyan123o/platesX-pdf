"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"

// Define the regions with their data
const regionData = [
    {
        id: "london",
        name: "London",
        code: "LA-LY",
        position: { x: 62, y: 70 },
        valuablePlates: ["1 A", "F 1", "S 1"],
        highestSale: "£440,625 for '25 O' in November 2014",
        fastestAppreciating: "Single letter series (K, M, S)",
        topAuctions: [
            { plate: "25 O", price: "£440,625", date: "Nov 2014" },
            { plate: "1 RH", price: "£247,000", date: "May 2018" },
            { plate: "K 1", price: "£231,000", date: "Oct 2010" },
        ]
    },
    {
        id: "birmingham",
        name: "West Midlands",
        code: "DA-DY",
        position: { x: 45, y: 55 },
        valuablePlates: ["1 D", "DAV 1D", "DEN 15"],
        highestSale: "£300,096 for '1 D' in September 2009",
        fastestAppreciating: "DAV series",
        topAuctions: [
            { plate: "1 D", price: "£300,096", date: "Sep 2009" },
            { plate: "D 1", price: "£203,000", date: "Jun 2015" },
            { plate: "DAV 1D", price: "£151,000", date: "Mar 2018" },
        ]
    },
    {
        id: "manchester",
        name: "North West",
        code: "MA-MY",
        position: { x: 40, y: 40 },
        valuablePlates: ["M 1", "MAN 1", "MCF 1"],
        highestSale: "£331,500 for 'M 1' in June 2006",
        fastestAppreciating: "MAC and MAN series",
        topAuctions: [
            { plate: "M 1", price: "£331,500", date: "Jun 2006" },
            { plate: "MCF 1", price: "£253,000", date: "Oct 2016" },
            { plate: "MAN 1", price: "£130,000", date: "Jul 2013" },
        ]
    },
    {
        id: "newcastle",
        name: "North East",
        code: "NA-NY",
        position: { x: 50, y: 25 },
        valuablePlates: ["1 N", "NEW 1", "NE1 1"],
        highestSale: "£154,000 for 'NEW 1' in January 2017",
        fastestAppreciating: "NE and NEW series",
        topAuctions: [
            { plate: "NEW 1", price: "£154,000", date: "Jan 2017" },
            { plate: "1 N", price: "£120,000", date: "Nov 2009" },
            { plate: "N 1", price: "£87,500", date: "Mar 2012" },
        ]
    },
    {
        id: "wales",
        name: "Wales",
        code: "CA-CY",
        position: { x: 30, y: 60 },
        valuablePlates: ["W 1", "WAL 1", "CYM 1"],
        highestSale: "£170,500 for 'W 1' in December 2000",
        fastestAppreciating: "CYM series (Welsh language)",
        topAuctions: [
            { plate: "W 1", price: "£170,500", date: "Dec 2000" },
            { plate: "WAL 1", price: "£123,000", date: "Jun 2015" },
            { plate: "CYM 1", price: "£90,000", date: "Sep 2018" },
        ]
    },
    {
        id: "scotland",
        name: "Scotland",
        code: "SA-SY",
        position: { x: 45, y: 15 },
        valuablePlates: ["S 1", "SCO 1", "MAC 1"],
        highestSale: "£404,063 for 'S 1' in September 2008",
        fastestAppreciating: "MAC and SCO series",
        topAuctions: [
            { plate: "S 1", price: "£404,063", date: "Sep 2008" },
            { plate: "MAC 1", price: "£210,242", date: "Nov 2016" },
            { plate: "SCO 1", price: "£132,000", date: "Jun 2015" },
        ]
    },
    {
        id: "northern-ireland",
        name: "Northern Ireland",
        code: "IA-IZ",
        position: { x: 20, y: 30 },
        valuablePlates: ["1 I", "NI 1", "ULS 1"],
        highestSale: "£92,000 for 'I 1' in March 2014",
        fastestAppreciating: "NI series",
        topAuctions: [
            { plate: "I 1", price: "£92,000", date: "Mar 2014" },
            { plate: "ULS 1", price: "£82,000", date: "Jul 2017" },
            { plate: "BEL 1", price: "£78,000", date: "Oct 2016" },
        ]
    },
    {
        id: "east-anglia",
        name: "East Anglia",
        code: "EA-EY",
        position: { x: 65, y: 55 },
        valuablePlates: ["1 E", "EAS 1", "ANG 1"],
        highestSale: "£125,000 for 'E 1' in October 2007",
        fastestAppreciating: "EA series",
        topAuctions: [
            { plate: "E 1", price: "£125,000", date: "Oct 2007" },
            { plate: "EA 1", price: "£76,000", date: "Mar 2016" },
            { plate: "ANG 1", price: "£55,000", date: "Nov 2017" },
        ]
    },
]
export default function UKPlateMap() {
    const [selected, setSelected] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    // Close modal on ESC
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Escape") setIsOpen(false)
        },
        [setIsOpen]
    )

    useEffect(() => {
        if (isOpen) window.addEventListener("keydown", handleKeyDown)
        else window.removeEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, handleKeyDown])

    const selectRegion = (id) => {
        setSelected(regions.find(r => r.id === id))
        setIsOpen(true)
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-4xl font-extrabold text-gray-900">UK Plate Map</h2>
                    <p className="mt-2 text-lg text-gray-600">
                        Click a region to explore top‑value plates and historic auction data.
                    </p>
                </motion.header>

                <div className="relative mx-auto max-w-lg md:max-w-2xl lg:max-w-3xl">
                    <div className="w-full h-72 md:h-96 lg:h-[600px] bg-white rounded-xl border shadow-sm overflow-hidden">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <defs>
                                <radialGradient id="grad" cx="50%" cy="50%" r="70%">
                                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.15)" />
                                    <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
                                </radialGradient>
                            </defs>

                            <rect width="100" height="100" fill="url(#grad)" />

                            {/* Simplified UK Outline */}
                            <path
                                d="M30,15 L50,10 L65,15 L75,30 L70,40 L75,50 L70,65 L60,80 L45,80 L30,70 L25,60 L35,55 L30,40 L20,35 Z"
                                fill="rgba(107, 114, 128, 0.1)"
                                stroke="#CBD5E0"
                                strokeWidth="0.5"
                            />

                            {/* Northern Ireland */}
                            <path
                                d="M15,30 L25,25 L25,35 L15,40 Z"
                                fill="rgba(107, 114, 128, 0.1)"
                                stroke="#CBD5E0"
                                strokeWidth="0.5"
                            />

                            {regions.map((reg) => (
                                <g
                                    key={reg.id}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`Open details for ${reg.name}`}
                                    onClick={() => selectRegion(reg.id)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") selectRegion(reg.id)
                                    }}
                                    className="cursor-pointer"
                                >
                                    <motion.circle
                                        cx={reg.position.x}
                                        cy={reg.position.y}
                                        r="4"
                                        initial={{ scale: 0.8 }}
                                        whileHover={{ scale: 1.2 }}
                                        animate={{ fill: reg.id === selected?.id ? "#3B82F6" : "rgba(59,130,246,0.6)" }}
                                    />
                                    <text
                                        x={reg.position.x}
                                        y={reg.position.y - 6}
                                        textAnchor="middle"
                                        fontSize="3"
                                        fill="#374151"
                                        className="pointer-events-none select-none"
                                    >
                                        {reg.code}
                                    </text>
                                </g>
                            ))}
                        </svg>

                        {/* Legend */}
                        <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 backdrop-blur-sm p-2 rounded-lg shadow">
                            <p className="text-xs font-medium text-gray-700">Click a dot to view region data</p>
                        </div>
                    </div>

                    {/* Details Modal */}
                    <AnimatePresence>
                        {isOpen && selected && (
                            <motion.div
                                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                            >
                                <motion.div
                                    className="bg-white rounded-xl shadow-xl max-w-xl w-full overflow-hidden"
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* Header */}
                                    <div className="flex justify-between items-center p-4 border-b">
                                        <h3 className="text-2xl font-bold text-gray-900">{selected.name}</h3>
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            aria-label="Close details"
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    <div className="p-4 space-y-6">
                                        {/* Valuable Plates */}
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-800">Top Plates</h4>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {selected.valuablePlates.map((p, i) => (
                                                    <span key={i} className="bg-gray-100 px-4 py-2 rounded font-mono font-semibold">
                                                        {p}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-gray-50 p-4 rounded">
                                                <h5 className="text-sm text-gray-500">Highest Sale</h5>
                                                <p className="mt-1 font-semibold text-gray-900">{selected.highestSale}</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded">
                                                <h5 className="text-sm text-gray-500">Fastest Appreciating</h5>
                                                <p className="mt-1 font-semibold text-gray-900">{selected.fastestAppreciating}</p>
                                            </div>
                                        </div>

                                        {/* Auction Table */}
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Recent Auctions</h4>
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full text-left text-sm">
                                                    <thead className="bg-gray-100">
                                                        <tr>
                                                            <th scope="col" className="px-4 py-2">Plate</th>
                                                            <th scope="col" className="px-4 py-2">Price</th>
                                                            <th scope="col" className="px-4 py-2">Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y">
                                                        {selected.topAuctions.map((a, idx) => (
                                                            <tr key={idx}>
                                                                <td className="px-4 py-2 font-medium text-gray-800">{a.plate}</td>
                                                                <td className="px-4 py-2 text-gray-700">{a.price}</td>
                                                                <td className="px-4 py-2 text-gray-700">{a.date}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 text-right">
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
