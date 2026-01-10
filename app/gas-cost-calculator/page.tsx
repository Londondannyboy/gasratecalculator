'use client'

import { useState } from 'react'
import Link from 'next/link'

const appliances = [
  { name: 'Combi Boiler', kw: 28, category: 'Heating' },
  { name: 'System Boiler', kw: 18, category: 'Heating' },
  { name: 'Gas Fire', kw: 4.5, category: 'Heating' },
  { name: 'Gas Hob (4 ring)', kw: 8, category: 'Cooking' },
  { name: 'Gas Oven', kw: 3, category: 'Cooking' },
  { name: 'Gas Tumble Dryer', kw: 2.5, category: 'Laundry' },
]

const faqs = [
  {
    question: "How do I calculate gas appliance running costs?",
    answer: "Multiply the appliance's kW rating by the number of hours used, then multiply by your unit rate (p/kWh). For example, a 4kW gas fire used for 3 hours at 6.24p/kWh costs: 4 x 3 x 6.24 = 74.88p."
  },
  {
    question: "What is a kW rating?",
    answer: "The kW (kilowatt) rating shows how much energy an appliance uses per hour. A 4kW gas fire uses 4 kilowatt-hours (kWh) of gas for every hour it's running at full power."
  },
  {
    question: "Why does my boiler cost vary?",
    answer: "Boilers cycle on and off based on demand - they don't run constantly. A combi boiler might only fire for 5-10 minutes per hour for hot water, or longer periods when heating the home. Actual usage depends on insulation, thermostat settings, and outdoor temperature."
  },
]

export default function GasCostCalculatorPage() {
  const [applianceKw, setApplianceKw] = useState('')
  const [hoursPerDay, setHoursPerDay] = useState('')
  const [unitRate, setUnitRate] = useState('6.24') // Average UK rate p/kWh
  const [selectedAppliance, setSelectedAppliance] = useState<string | null>(null)
  const [result, setResult] = useState<{ hourly: number; daily: number; weekly: number; monthly: number; yearly: number } | null>(null)

  const selectAppliance = (kw: number, name: string) => {
    setApplianceKw(kw.toString())
    setSelectedAppliance(name)
  }

  const calculate = () => {
    const kw = parseFloat(applianceKw) || 0
    const hours = parseFloat(hoursPerDay) || 0
    const rate = parseFloat(unitRate) || 0

    const hourly = (kw * rate) / 100 // Cost per hour in pounds
    const daily = hourly * hours
    const weekly = daily * 7
    const monthly = daily * 30.44
    const yearly = daily * 365

    setResult({
      hourly,
      daily,
      weekly,
      monthly,
      yearly
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
            Free Gas Cost Calculator
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Gas Cost{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              Calculator UK
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Calculate the running cost of any gas appliance.
            Find out how much it costs to run your boiler, gas fire, or hob.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Appliance Selection */}
            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Select Appliance</h2>
              <p className="text-sm text-slate-400 mb-4">
                Choose a common appliance or enter a custom kW rating
              </p>

              <div className="space-y-2">
                {appliances.map((app) => (
                  <button
                    key={app.name}
                    onClick={() => selectAppliance(app.kw, app.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedAppliance === app.name
                        ? 'bg-orange-500/20 border border-orange-500/50 text-white'
                        : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    <span>{app.name}</span>
                    <span className="text-sm text-slate-400">{app.kw} kW</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Calculator Form */}
            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
              <h2 className="text-xl font-bold text-white mb-4">Calculate Running Cost</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Appliance Rating (kW)
                  </label>
                  <input
                    type="number"
                    value={applianceKw}
                    onChange={(e) => {
                      setApplianceKw(e.target.value)
                      setSelectedAppliance(null)
                    }}
                    placeholder="e.g., 28"
                    step="0.1"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Hours Used Per Day
                  </label>
                  <input
                    type="number"
                    value={hoursPerDay}
                    onChange={(e) => setHoursPerDay(e.target.value)}
                    placeholder="e.g., 4"
                    step="0.5"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500"
                  />
                </div>

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
                  <p className="text-xs text-slate-500 mt-1">
                    UK Energy Price Cap rate (January 2025)
                  </p>
                </div>

                <button
                  onClick={calculate}
                  disabled={!applianceKw || !hoursPerDay}
                  className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Calculate Cost
                </button>

                {result && (
                  <div className="mt-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                    <h3 className="text-lg font-semibold text-white mb-3">Running Costs</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="p-3 bg-slate-800 rounded-lg">
                        <p className="text-slate-400">Per Hour</p>
                        <p className="text-white font-bold">{(result.hourly * 100).toFixed(1)}p</p>
                      </div>
                      <div className="p-3 bg-slate-800 rounded-lg">
                        <p className="text-slate-400">Per Day</p>
                        <p className="text-white font-bold">£{result.daily.toFixed(2)}</p>
                      </div>
                      <div className="p-3 bg-slate-800 rounded-lg">
                        <p className="text-slate-400">Per Week</p>
                        <p className="text-white font-bold">£{result.weekly.toFixed(2)}</p>
                      </div>
                      <div className="p-3 bg-slate-800 rounded-lg">
                        <p className="text-slate-400">Per Month</p>
                        <p className="text-orange-400 font-bold">£{result.monthly.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                      <p className="text-slate-400 text-sm">Annual Cost</p>
                      <p className="text-orange-400 font-bold text-2xl">£{result.yearly.toFixed(2)}</p>
                    </div>
                  </div>
                )}
              </div>
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
              href="/gas-bill-calculator"
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
            >
              Gas Bill Calculator
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
