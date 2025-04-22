'use client'

import React from 'react'

interface PremiumUKPlateProps {
    number: string
    plateStyle?: 'yellow' | 'white'
    className?: string
}

export default function PremiumUKPlate({
    number,
    plateStyle = 'yellow',
    className = ''
}: PremiumUKPlateProps) {
    // Simply uppercase the number without any automatic formatting
    const formatted = number.toUpperCase()

    return (
        <>
            {/* Load custom plate font */}
            <style jsx global>{`
                @font-face {
                    font-family: 'UKNumberPlate';
                    src: url('/fonts/UKNumberPlate.ttf') format('truetype');
                    font-weight: normal;
                    font-style: normal;
                }
            `}</style>

            <div
                className={`relative max-w-sm ${className}`}
                style={{ fontFamily: `'UKNumberPlate', Arial, sans-serif` }}
            >
                <div
                    className={`relative overflow-hidden rounded-xl border-4 border-gray-800 shadow-2xl ${
                        plateStyle === 'yellow'
                            ? 'bg-gradient-to-b from-yellow-300 to-yellow-400'
                            : 'bg-gradient-to-b from-white to-gray-100'
                    }`}
                    style={{
                        // Reduced bottom padding to lift characters closer
                        padding: '0.25rem 0.5rem',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    {/* The plate number */}
                    <div
                        className="flex-1 text-center text-gray-900 font-bold"
                        style={{
                            fontSize: '3rem',
                            lineHeight: 0.85,       // tighten gap under glyphs
                            letterSpacing: '0.05em',
                            textShadow: '1px 1px 1px rgba(0,0,0,0.2)'
                        }}
                    >
                        {formatted}
                    </div>

                    {/* Subtle hologram overlay */}
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.15) 0, transparent 40%),
                                              radial-gradient(circle at 70% 80%, rgba(255,255,255,0.1) 0, transparent 50%)`,
                            mixBlendMode: 'overlay'
                        }}
                    />
                </div>
            </div>
        </>
    )
}
