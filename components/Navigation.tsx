'use client'

import { useState } from 'react'
import Link from 'next/link'
import { authClient } from '@/lib/auth/client'
import { UserButton } from '@neondatabase/auth/react/ui'

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [insuranceOpen, setInsuranceOpen] = useState(false)
  const { data: session, isPending } = authClient.useSession()
  const user = session?.user

  // Simplified nav - main items only
  const mainLinks = [
    { href: '#calculator', label: 'Get Quote' },
    { href: '/articles', label: 'Guides' },
  ]

  // Insurance types for dropdown
  const insuranceTypes = [
    { href: '/aerial-yoga-insurance', label: 'Aerial Yoga', icon: '🎪' },
    { href: '/hot-yoga-insurance', label: 'Hot Yoga', icon: '🔥' },
    { href: '/meditation-teacher-insurance', label: 'Meditation', icon: '🧘' },
    { href: '/yoga-studio-insurance', label: 'Studio Insurance', icon: '🏠' },
    { href: '/public-liability-insurance-yoga-teachers', label: 'Public Liability', icon: '🛡️' },
    { href: '/pilates-instructor-insurance', label: 'Pilates', icon: '💪' },
  ]

  return (
    <header className="border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m0 0l-2-1m2 1v2.5M14 4l-2 1m0 0l-2-1m2 1v2.5" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white hidden sm:block">
              Yoga Insurance <span className="text-blue-400">UK</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Main Links */}
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

            {/* Insurance Types Dropdown */}
            <div className="relative">
              <button
                onClick={() => setInsuranceOpen(!insuranceOpen)}
                onBlur={() => setTimeout(() => setInsuranceOpen(false), 150)}
                className="flex items-center gap-1 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                Insurance Types
                <svg className={`w-4 h-4 transition-transform ${insuranceOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {insuranceOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-2 z-50">
                  {insuranceTypes.map((type) => (
                    <Link
                      key={type.href}
                      href={type.href}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                      <span>{type.icon}</span>
                      {type.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-slate-700 mx-2" />

            {/* Auth Section */}
            {isPending ? (
              <div className="w-7 h-7 rounded-full bg-slate-700 animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30 text-sm transition-colors"
                >
                  <span className="text-xs">🧘</span>
                  <span>My Studio</span>
                </Link>
                <div className="w-7 h-7">
                  <UserButton size="sm" />
                </div>
              </div>
            ) : (
              <Link
                href="/auth/sign-in"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
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
              {/* Main Links */}
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

              {/* Insurance Types Section */}
              <div className="pt-2 pb-1 px-4">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Insurance Types</span>
              </div>
              {insuranceTypes.map((type) => (
                <Link
                  key={type.href}
                  href={type.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  <span>{type.icon}</span>
                  {type.label}
                </Link>
              ))}

              {/* Mobile auth */}
              <div className="pt-3 border-t border-slate-700 mt-2">
                {!isPending && !user && (
                  <Link
                    href="/auth/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mx-4 block bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-center font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                )}
                {user && (
                  <div className="px-4 space-y-2">
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors"
                    >
                      <span>🧘</span>
                      My Studio
                    </Link>
                    <div className="flex items-center gap-3 px-4 py-2">
                      <div className="w-7 h-7">
                        <UserButton size="sm" />
                      </div>
                      <span className="text-sm text-slate-300">{user.name || 'User'}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
