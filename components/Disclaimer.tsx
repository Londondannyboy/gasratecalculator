'use client'

import { useState, useEffect } from 'react'

const DISCLAIMER_KEY = 'gas_calc_disclaimer_dismissed'

export function Disclaimer() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem(DISCLAIMER_KEY)
    if (!dismissed) {
      setShowBanner(true)
    }
  }, [])

  const dismiss = () => {
    sessionStorage.setItem(DISCLAIMER_KEY, 'true')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-amber-200">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>
              <strong>Professional Use Only:</strong> This calculator is for Gas Safe registered engineers. Always verify calculations and follow official procedures.
            </span>
          </div>
          <button
            onClick={dismiss}
            className="flex-shrink-0 text-amber-300 hover:text-white transition-colors"
            aria-label="Dismiss disclaimer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
