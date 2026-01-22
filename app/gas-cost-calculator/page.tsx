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
    answer: "Multiply the appliance's kW rating by the number of hours used, then multiply by your unit rate (p/kWh). For example, a 4kW gas fire used for 3 hours at 6.24p/kWh costs: 4 x 3 x 6.24 = 74.88p. This calculator automates this process for you."
  },
  {
    question: "What is a kW rating and where do I find it?",
    answer: "The kW (kilowatt) rating shows the power consumption of an appliance. You can find it on the appliance's data plate (usually a metal label), in the user manual, or by searching the model number online. A 4kW gas fire uses 4 kilowatt-hours (kWh) of gas for every hour at full power."
  },
  {
    question: "Why does my boiler running cost vary so much?",
    answer: "Boilers cycle on and off based on demand - they don't run constantly at full power. A combi boiler might only fire for 5-10 minutes per hour for hot water, or longer periods when heating the home. Actual costs depend on insulation, thermostat settings, outdoor temperature, and boiler efficiency. Modern condensing boilers are more efficient than older models."
  },
  {
    question: "How much does it cost to run a gas fire per hour?",
    answer: "At January 2025 price cap rates (6.24p/kWh), a typical 4kW gas fire costs approximately 25p per hour to run. A larger 6kW fire costs around 37p per hour. These costs assume the fire runs continuously at full power - actual costs may be lower with thermostatic controls."
  },
  {
    question: "How much does it cost to run a gas hob?",
    answer: "A single gas ring uses about 2kW, costing approximately 12p per hour. A full 4-ring hob running all burners at maximum would use about 8kW, costing around 50p per hour. In practice, most cooking uses 1-2 rings at varying power, so typical cooking costs 5-20p per meal."
  },
  {
    question: "Is gas heating cheaper than electric?",
    answer: "Currently, yes. At January 2025 rates, gas costs around 6.24p/kWh while electricity costs around 24.50p/kWh - nearly 4 times more expensive per unit. However, electric heat pumps can be 3-4x more efficient than gas boilers, potentially making them cheaper to run despite higher unit rates."
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
            Free Gas Cost Calculator - Updated January 2025
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            UK Gas Appliance{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              Cost Calculator
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-4">
            Calculate the <strong>running cost</strong> of any gas appliance - boilers, gas fires, hobs and more.
            Uses current{' '}
            <a
              href="https://www.ofgem.gov.uk/information-for-household-consumers/energy-price-cap"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 underline"
            >
              Ofgem Energy Price Cap
            </a>{' '}
            rates.
          </p>

          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            January 2025 price cap rate: <strong>6.24p/kWh</strong>
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
                href="/gas-bill-calculator"
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
              >
                Gas Bill Calculator
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

      {/* Typical Running Costs Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Typical UK Gas Appliance Running Costs
          </h2>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-700">
                  <th className="text-left py-3 pr-4">Appliance</th>
                  <th className="text-center py-3 px-4">Power (kW)</th>
                  <th className="text-center py-3 px-4">Cost/Hour</th>
                  <th className="text-center py-3 px-4">Cost/Day*</th>
                  <th className="text-center py-3 pl-4">Cost/Year*</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-700/50">
                  <td className="py-3 pr-4 font-medium">Combi Boiler (heating)</td>
                  <td className="text-center py-3 px-4">24-28 kW</td>
                  <td className="text-center py-3 px-4">~£1.75</td>
                  <td className="text-center py-3 px-4">~£5.25</td>
                  <td className="text-center py-3 pl-4 text-orange-400">~£960</td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="py-3 pr-4 font-medium">Gas Fire</td>
                  <td className="text-center py-3 px-4">3-6 kW</td>
                  <td className="text-center py-3 px-4">~25p</td>
                  <td className="text-center py-3 px-4">~£1.00</td>
                  <td className="text-center py-3 pl-4 text-orange-400">~£180</td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="py-3 pr-4 font-medium">Gas Hob (per ring)</td>
                  <td className="text-center py-3 px-4">2 kW</td>
                  <td className="text-center py-3 px-4">~12p</td>
                  <td className="text-center py-3 px-4">~12p</td>
                  <td className="text-center py-3 pl-4 text-orange-400">~£45</td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="py-3 pr-4 font-medium">Gas Oven</td>
                  <td className="text-center py-3 px-4">2.5-3 kW</td>
                  <td className="text-center py-3 px-4">~19p</td>
                  <td className="text-center py-3 px-4">~19p</td>
                  <td className="text-center py-3 pl-4 text-orange-400">~£35</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">Gas Tumble Dryer</td>
                  <td className="text-center py-3 px-4">2.5 kW</td>
                  <td className="text-center py-3 px-4">~16p</td>
                  <td className="text-center py-3 px-4">~16p</td>
                  <td className="text-center py-3 pl-4 text-orange-400">~£30</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 text-center">
            *Based on typical usage patterns. Boiler assumes 3 hours effective runtime/day during heating season.
            Cooking appliances assume average household usage. Rates based on January 2025 price cap (6.24p/kWh).
          </p>

          {/* Energy Saving Tips */}
          <div className="mt-8 p-6 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/20">
            <h3 className="text-lg font-semibold text-orange-400 mb-4">Tips to Reduce Gas Appliance Costs</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-orange-400 mt-0.5">1.</span>
                <span><strong>Lower your thermostat</strong> by 1°C to save up to £100/year on heating</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-400 mt-0.5">2.</span>
                <span><strong>Service your boiler annually</strong> to maintain efficiency</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-400 mt-0.5">3.</span>
                <span><strong>Use lids on pans</strong> to reduce hob cooking time by up to 30%</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-400 mt-0.5">4.</span>
                <span><strong>Bleed radiators regularly</strong> to ensure efficient heat distribution</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Source:{' '}
              <a href="https://www.energysavingtrust.org.uk/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">
                Energy Saving Trust
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Gas Cost Calculator FAQ
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

      {/* Resources Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Helpful Energy Resources
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://www.ofgem.gov.uk/information-for-household-consumers/energy-price-cap"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400">Ofgem Energy Price Cap</h3>
              <p className="text-slate-400 text-sm">Official information on current gas and electricity price cap rates from the energy regulator.</p>
            </a>

            <a
              href="https://www.energysavingtrust.org.uk/advice/boilers/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400">Energy Saving Trust - Boilers</h3>
              <p className="text-slate-400 text-sm">Expert advice on boiler efficiency, maintenance, and when to consider upgrading your heating system.</p>
            </a>

            <a
              href="https://www.gassaferegister.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400">Gas Safe Register</h3>
              <p className="text-slate-400 text-sm">Find a registered gas engineer for boiler servicing, repairs, and appliance installations.</p>
            </a>

            <a
              href="https://www.which.co.uk/reviews/boilers"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400">Which? Boiler Reviews</h3>
              <p className="text-slate-400 text-sm">Independent reviews and reliability ratings for boilers if you&apos;re considering a replacement.</p>
            </a>
          </div>

          {/* CTA */}
          <div className="mt-12 p-6 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/20 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Are you a Gas Safe Engineer?</h3>
            <p className="text-slate-400 text-sm mb-4">
              Use our professional <strong>gas rate calculator</strong> to check appliance heat input against rated capacity.
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
