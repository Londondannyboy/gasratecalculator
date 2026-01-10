'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const CONSENT_KEY = 'gas_calc_cookie_consent'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY)
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const dismiss = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      accepted: true,
      timestamp: new Date().toISOString()
    }))
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-slate-800 border-t border-slate-700"
      onClick={dismiss}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && dismiss()}
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-sm">
          <p className="text-slate-300 text-center sm:text-left">
            We use cookies to improve your experience.{' '}
            <Link
              href="/privacy"
              className="text-orange-400 hover:text-orange-300 underline"
              onClick={(e) => e.stopPropagation()}
            >
              Privacy Policy
            </Link>
            {' '}&{' '}
            <Link
              href="/terms"
              className="text-orange-400 hover:text-orange-300 underline"
              onClick={(e) => e.stopPropagation()}
            >
              Terms of Service
            </Link>
          </p>
          <button
            onClick={dismiss}
            className="flex-shrink-0 px-4 py-1.5 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-md transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
