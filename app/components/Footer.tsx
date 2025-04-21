"use client"

import Link from "next/link"

export default function Footer() {
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
  
  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "Buy", href: "/buy" },
    { name: "Sell", href: "/sell" },
    { name: "Sourcing", href: "/sourcing" },
    { name: "Guides", href: "/guides" },
  ]

  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {footerLinks.map((link) => (
            <div key={link.name} className="pb-6">
              <Link
                href={link.href}
                className="text-sm leading-6 text-muted-foreground hover:text-foreground"
              >
                {link.name}
              </Link>
            </div>
          ))}
          <div className="pb-6">
            <button
              onClick={() => window.location.pathname === "/" 
                ? scrollToSection("contact") 
                : window.location.href = "/#contact"}
              className="text-sm leading-6 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              Contact
            </button>
          </div>
        </nav>
        <p className="mt-10 text-center text-sm leading-5 text-muted-foreground">
          &copy; {new Date().getFullYear()} PlatesX. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

