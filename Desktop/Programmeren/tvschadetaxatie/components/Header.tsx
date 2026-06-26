"use client"
import Link from "next/link"
import { useState } from "react"
import { siteConfig } from "@/config/site"

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header>
      {/* Top bar */}
      <div style={{ backgroundColor: "var(--navy-dark)" }} className="text-white text-xs py-1.5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <span>Gecertificeerde TV-specialisten</span>
          <span className="font-semibold">24/7 bereikbaar — <a href="tel:+31630192552" className="hover:underline">+31 6 30 19 25 52</a> · info@tvschaderapport.nl</span>
        </div>
      </div>

      {/* Main header */}
      <div style={{ backgroundColor: "var(--navy)" }} className="sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white flex items-center justify-center">
              <span style={{ color: "var(--navy)" }} className="font-black text-sm leading-none">TV</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">{siteConfig.name}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-blue-100">
            <Link href="/hoe-het-werkt" className="hover:text-white transition-colors">Hoe het werkt</Link>
            <Link href="/veelgestelde-vragen" className="hover:text-white transition-colors">FAQ</Link>
            <Link href="/over-ons" className="hover:text-white transition-colors">Over ons</Link>
          </nav>

          <Link
            href="/aanvragen"
            className="hidden md:inline-flex items-center gap-2 bg-white font-bold px-5 py-2 text-sm transition-colors hover:bg-blue-50"
            style={{ color: "var(--navy)" }}
          >
            Rapport aanvragen →
          </Link>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {open && (
          <div style={{ backgroundColor: "var(--navy-dark)" }} className="md:hidden border-t border-blue-900 px-4 py-4 flex flex-col gap-4 text-sm">
            <Link href="/hoe-het-werkt" className="text-blue-100 hover:text-white">Hoe het werkt</Link>
            <Link href="/veelgestelde-vragen" className="text-blue-100 hover:text-white">FAQ</Link>
            <Link href="/over-ons" className="text-blue-100 hover:text-white">Over ons</Link>
            <Link
              href="/aanvragen"
              className="bg-white font-bold px-4 py-2 text-center"
              style={{ color: "var(--navy)" }}
            >
              Rapport aanvragen →
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
