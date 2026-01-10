'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const mainLinks = [
    { href: '#calculator', label: 'Calculator' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#faq', label: 'FAQ' },
    { href: '/articles', label: 'Guides' },
  ]

  return (
    <header className="border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white hidden sm:block">
              Gas Rate <span className="text-orange-400">Calculator</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {mainLinks.map((link) =>
              link.href.startsWith('/') ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700 mt-3">
            <div className="flex flex-col space-y-1">
              {mainLinks.map((link) =>
                link.href.startsWith('/') ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
