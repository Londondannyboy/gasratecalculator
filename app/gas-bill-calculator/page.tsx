'use client'

import { useState } from 'react'
import Link from 'next/link'

const faqs = [
  {
    question: "How is my gas bill calculated in the UK?",
    answer: "Your UK gas bill is calculated by multiplying your gas usage (in kWh) by the unit rate, then adding the standing charge for the billing period. Usage is measured in cubic metres or cubic feet by your meter, then converted to kWh using the calorific value (about 39.5 MJ/m³) and volume correction factor (1.02264). Finally, 5% VAT is added to domestic gas bills."
  },
  {
    question: "What is the standing charge on a gas bill?",
    answer: "The standing charge is a daily fixed fee charged by your energy supplier regardless of how much gas you use. As of January 2025, the average UK standing charge is around 31.43p per day. It covers the cost of maintaining the gas network, meter reading, and billing services."
  },
  {
    question: "How do I convert gas meter readings to kWh?",
    answer: "To convert gas meter readings to kWh: 1) Calculate units used (current reading minus previous reading), 2) For metric meters, multiply by 2.83 to convert m³ to cubic feet if needed, 3) Multiply by the calorific value (typically 39.5), 4) Multiply by the volume correction factor (1.02264), 5) Divide by 3.6 to get kWh."
  },
  {
    question: "What is the current gas unit rate in the UK?",
    answer: "As of January 2025, under the Energy Price Cap, the average gas unit rate is around 6.24p per kWh. This rate can vary by region and supplier. Check your latest bill or energy supplier website for your exact unit rate."
  },
  {
    question: "Why is my gas bill higher than expected?",
    answer: "High gas bills can result from: increased usage during cold weather, inefficient boiler (consider getting a gas rate calculation done), poor insulation, incorrect meter readings, or being on a more expensive tariff. Use this calculator with your actual meter readings to verify your bill is correct."
  },
  {
    question: "How much gas does a typical UK household use?",
    answer: "The average UK household uses approximately 12,000 kWh of gas per year. This varies significantly based on property size, insulation quality, boiler efficiency, and heating habits. A well-insulated 3-bed semi might use 8,000-10,000 kWh, while a larger detached home could use 15,000-20,000 kWh."
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
            Free UK Gas Bill Calculator - Updated January 2025
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            UK Gas Bill{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              Calculator
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-4">
            Estimate your <strong>UK gas bill</strong> based on kWh usage and current{' '}
            <a
              href="https://www.ofgem.gov.uk/information-for-household-consumers/energy-price-cap"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 underline"
            >
              Ofgem Energy Price Cap
            </a>{' '}
            rates. Includes standing charges and 5% VAT calculation.
          </p>

          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Uses January 2025 price cap rates: <strong>6.24p/kWh</strong> unit rate and <strong>31.43p/day</strong> standing charge
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

          {/* Related Internal Links */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">Related Gas Calculators</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
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
              <Link
                href="/imperial-gas-rate-calculator"
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
              >
                Imperial Gas Rate Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How Gas Bills Work Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            How UK Gas Bills Are Calculated
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Meter Reading to kWh</h3>
              <p className="text-slate-400 text-sm">
                Your gas usage is measured in cubic metres (m³) or cubic feet. This is converted to kWh using the calorific value
                (typically 39.5 MJ/m³) and volume correction factor (1.02264).
              </p>
            </div>

            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Apply Unit Rate</h3>
              <p className="text-slate-400 text-sm">
                Your kWh usage is multiplied by the unit rate (currently ~6.24p/kWh under the{' '}
                <a href="https://www.ofgem.gov.uk/information-for-household-consumers/energy-price-cap" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">
                  Ofgem price cap
                </a>). This forms the main part of your bill.
              </p>
            </div>

            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Add Standing Charge</h3>
              <p className="text-slate-400 text-sm">
                The standing charge (~31.43p/day) is added regardless of usage. This covers network maintenance and metering costs.
                For a quarterly bill, this adds roughly £28.60.
              </p>
            </div>

            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">4</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Calculate VAT</h3>
              <p className="text-slate-400 text-sm">
                Domestic gas is charged at a reduced VAT rate of 5% (not the standard 20%). This is added to your final bill amount.
              </p>
            </div>
          </div>

          {/* Typical Usage Reference */}
          <div className="p-6 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/20">
            <h3 className="text-lg font-semibold text-orange-400 mb-4">Typical UK Gas Usage by Property Size</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-white">8,000</p>
                <p className="text-xs text-slate-400">kWh/year</p>
                <p className="text-sm text-slate-300">Small flat</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">12,000</p>
                <p className="text-xs text-slate-400">kWh/year</p>
                <p className="text-sm text-slate-300">Medium house</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">17,000</p>
                <p className="text-xs text-slate-400">kWh/year</p>
                <p className="text-sm text-slate-300">Large house</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">22,000+</p>
                <p className="text-xs text-slate-400">kWh/year</p>
                <p className="text-sm text-slate-300">Detached</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center">
              Source:{' '}
              <a href="https://www.ofgem.gov.uk/information-consumers/energy-advice-households/average-gas-and-electricity-use" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">
                Ofgem typical domestic consumption values
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Gas Bill Calculator FAQ
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

      {/* Helpful Resources Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Helpful Resources for UK Gas Consumers
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://www.ofgem.gov.uk/information-for-household-consumers"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400">Ofgem Consumer Information</h3>
              <p className="text-slate-400 text-sm">Official energy regulator guidance on bills, switching suppliers, and your rights as an energy consumer.</p>
            </a>

            <a
              href="https://www.citizensadvice.org.uk/consumer/energy/energy-supply/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400">Citizens Advice Energy</h3>
              <p className="text-slate-400 text-sm">Free, independent advice on energy bills, debt help, and resolving issues with your energy supplier.</p>
            </a>

            <a
              href="https://www.gassaferegister.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400">Gas Safe Register</h3>
              <p className="text-slate-400 text-sm">Find a registered gas engineer for boiler servicing, repairs, and installations. All gas work must be done by Gas Safe engineers.</p>
            </a>

            <a
              href="https://www.energysavingtrust.org.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400">Energy Saving Trust</h3>
              <p className="text-slate-400 text-sm">Tips and guidance on reducing your gas usage and improving home energy efficiency.</p>
            </a>
          </div>

          {/* CTA to main calculator */}
          <div className="mt-12 p-6 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/20 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Are you a Gas Safe Engineer?</h3>
            <p className="text-slate-400 text-sm mb-4">
              Use our professional <strong>gas rate calculator</strong> to calculate appliance heat input from meter readings.
            </p>
            <Link
              href="/"
              className="inline-flex px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
            >
              Gas Rate Calculator for Engineers
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
