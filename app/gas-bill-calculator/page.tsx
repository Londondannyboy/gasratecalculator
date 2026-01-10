'use client'

import { useState } from 'react'
import Link from 'next/link'

const faqs = [
  {
    question: "How is my gas bill calculated?",
    answer: "Your gas bill is calculated by multiplying your gas usage (in kWh) by the unit rate, then adding the standing charge. Usage is measured in cubic metres or cubic feet by your meter, then converted to kWh using the calorific value and volume correction factor."
  },
  {
    question: "What is the standing charge?",
    answer: "The standing charge is a daily fixed fee charged by your energy supplier regardless of how much gas you use. It covers the cost of maintaining the gas network, meter reading, and billing services."
  },
  {
    question: "How do I convert meter readings to kWh?",
    answer: "Multiply your gas usage in cubic metres by the calorific value (typically 39.5 MJ/m³), then by the volume correction factor (1.02264), and divide by 3.6 to get kWh."
  },
]

export default function GasBillCalculatorPage() {
  const [usageKwh, setUsageKwh] = useState('')
  const [unitRate, setUnitRate] = useState('6.24') // Average UK rate p/kWh
  const [standingCharge, setStandingCharge] = useState('31.43') // Average UK daily rate p/day
  const [period, setPeriod] = useState<'daily' | 'monthly' | 'quarterly' | 'annual'>('monthly')
  const [result, setResult] = useState<{ usage: number; standing: number; total: number; vat: number } | null>(null)

  const periodDays = {
    daily: 1,
    monthly: 30.44,
    quarterly: 91.31,
    annual: 365
  }

  const calculate = () => {
    const usage = parseFloat(usageKwh) || 0
    const rate = parseFloat(unitRate) || 0
    const standing = parseFloat(standingCharge) || 0
    const days = periodDays[period]

    const usageCost = (usage * rate) / 100 // Convert pence to pounds
    const standingCost = (standing * days) / 100 // Standing charge for period
    const subtotal = usageCost + standingCost
    const vat = subtotal * 0.05 // VAT at 5% for domestic energy
    const total = subtotal + vat

    setResult({
      usage: usageCost,
      standing: standingCost,
      total: total,
      vat: vat
    })
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(faq => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
              }
            }))
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm mb-6">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            Free Gas Bill Calculator
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Gas Bill{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              Calculator UK
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Estimate your gas bill based on usage and current UK energy rates.
            Includes VAT calculation and standing charges.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 px-4 bg-slate-900/50">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Calculate Your Gas Bill</h2>

            <div className="space-y-6">
              {/* Usage Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Gas Usage (kWh)
                </label>
                <input
                  type="number"
                  value={usageKwh}
                  onChange={(e) => setUsageKwh(e.target.value)}
                  placeholder="e.g., 1200"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Enter your gas usage for the billing period
                </p>
              </div>

              {/* Billing Period */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Billing Period
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['daily', 'monthly', 'quarterly', 'annual'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPeriod(p)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        period === p
                          ? 'bg-orange-500 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Unit Rate (p/kWh)
                  </label>
                  <input
                    type="number"
                    value={unitRate}
                    onChange={(e) => setUnitRate(e.target.value)}
                    step="0.01"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-600 text-white focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Standing Charge (p/day)
                  </label>
                  <input
                    type="number"
                    value={standingCharge}
                    onChange={(e) => setStandingCharge(e.target.value)}
                    step="0.01"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-600 text-white focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Default rates based on UK Energy Price Cap (January 2025)
              </p>

              {/* Calculate Button */}
              <button
                onClick={calculate}
                disabled={!usageKwh}
                className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Calculate Bill
              </button>

              {/* Results */}
              {result && (
                <div className="mt-6 p-6 bg-slate-900/50 rounded-xl border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Estimated Bill</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-slate-300">
                      <span>Gas usage</span>
                      <span>£{result.usage.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Standing charge ({periodDays[period]} days)</span>
                      <span>£{result.standing.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-sm">
                      <span>VAT (5%)</span>
                      <span>£{result.vat.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-slate-700 pt-3 flex justify-between text-white font-bold text-xl">
                      <span>Total</span>
                      <span className="text-orange-400">£{result.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/#calculator"
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
            >
              Gas Rate Calculator
            </Link>
            <Link
              href="/gas-cost-calculator"
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
            >
              Gas Cost Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 cursor-pointer"
              >
                <summary className="flex items-center justify-between text-white font-medium list-none">
                  {faq.question}
                  <svg
                    className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
