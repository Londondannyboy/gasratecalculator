'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { LPGTankIllustration } from '@/components/illustrations'

// LPG calorific values are significantly higher than natural gas
const LPG_TYPES = {
  propane: {
    name: 'Propane',
    calorificValue: 93.2, // MJ/m³
    description: 'Most common LPG - bulk tanks, cylinders',
    density: 1.882, // kg/m³ at 15°C
  },
  butane: {
    name: 'Butane',
    calorificValue: 121.8, // MJ/m³
    description: 'Portable heaters, camping gas',
    density: 2.489, // kg/m³ at 15°C
  },
}

const CORRECTION_FACTOR = 1.02264
const CONVERSION_FACTOR = 3.6 // MJ to kWh

const faqs = [
  {
    question: "What is the difference between propane and butane?",
    answer: "Propane and butane are both LPG (Liquefied Petroleum Gas) but have different properties. Propane has a lower boiling point (-42°C) making it suitable for outdoor use in cold weather. Butane has a higher boiling point (0°C) and is typically used for indoor portable appliances. Propane also has a slightly lower calorific value (93.2 MJ/m³) compared to butane (121.8 MJ/m³)."
  },
  {
    question: "Why is the LPG calorific value different from natural gas?",
    answer: "LPG has a much higher calorific value than natural gas (39.5 MJ/m³). Propane is approximately 93.2 MJ/m³ and butane approximately 121.8 MJ/m³. This means LPG produces more heat per cubic metre, so appliances use less volume of gas but the heat output can be similar or higher than natural gas equivalents."
  },
  {
    question: "How do I gas rate an LPG appliance?",
    answer: "Gas rating LPG appliances follows the same principle as natural gas: measure gas consumption over time and calculate the heat input. However, you must use the correct calorific value for the LPG type (propane or butane). This calculator automatically applies the correct CV for your selected gas type."
  },
  {
    question: "Can I use a standard gas rate calculator for LPG?",
    answer: "No - using a standard natural gas calculator will give incorrect results for LPG. Natural gas calculators use a CV of approximately 39.5 MJ/m³, whereas propane is 93.2 MJ/m³ and butane is 121.8 MJ/m³. This would result in significantly underestimating the heat input of an LPG appliance."
  },
  {
    question: "What meters are used for LPG installations?",
    answer: "LPG installations may use dedicated LPG meters or flow sensors. Many domestic LPG installations (especially cylinder-fed) don't have meters, so gas rating is typically done using the timed test dial method if a meter exists, or by monitoring cylinder weight change over time. Commercial installations usually have dedicated meters."
  },
  {
    question: "Do I need different qualifications for LPG work?",
    answer: "Yes. Working on LPG requires specific qualifications in addition to standard domestic gas qualifications. Engineers need CCN1/CPA1 core credentials plus specific LPG modules such as LAL1 (LPG Core), CCLP1 (Changeover LPG), and appliance-specific categories. Check the Gas Safe Register for current requirements."
  },
]

type LpgType = 'propane' | 'butane'

interface Results {
  grossKw: number
  netKw: number
  grossM3h: number
  netM3h: number
  kgPerHour: number
}

export default function LpgGasRateCalculatorPage() {
  const [lpgType, setLpgType] = useState<LpgType>('propane')
  const [meterStart, setMeterStart] = useState('')
  const [meterEnd, setMeterEnd] = useState('')
  const [timeSeconds, setTimeSeconds] = useState('')
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerValue, setTimerValue] = useState(0)
  const [results, setResults] = useState<Results | null>(null)

  const selectedGas = LPG_TYPES[lpgType]

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerValue((prev) => prev + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerRunning])

  const startTimer = () => {
    setTimerValue(0)
    setTimerRunning(true)
  }

  const stopTimer = () => {
    setTimerRunning(false)
    setTimeSeconds(timerValue.toString())
  }

  const resetTimer = () => {
    setTimerRunning(false)
    setTimerValue(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const calculate = useCallback(() => {
    const time = parseFloat(timeSeconds)
    const start = parseFloat(meterStart)
    const end = parseFloat(meterEnd)

    if (!time || time <= 0 || isNaN(start) || isNaN(end)) {
      setResults(null)
      return
    }

    const volumeM3 = end - start
    if (volumeM3 <= 0) {
      setResults(null)
      return
    }

    // Calculate corrected volume
    const correctedVolume = volumeM3 * CORRECTION_FACTOR

    // Gas rate in m³/h
    const gasRateM3h = (correctedVolume / time) * 3600

    // Gross kW using LPG calorific value
    const grossKw = (gasRateM3h * selectedGas.calorificValue) / CONVERSION_FACTOR

    // Net kW (gross / 1.11)
    const netKw = grossKw / 1.11
    const netM3h = gasRateM3h / 1.11

    // kg/h using density
    const kgPerHour = gasRateM3h * selectedGas.density

    setResults({
      grossKw: Math.round(grossKw * 100) / 100,
      netKw: Math.round(netKw * 100) / 100,
      grossM3h: Math.round(gasRateM3h * 1000) / 1000,
      netM3h: Math.round(netM3h * 1000) / 1000,
      kgPerHour: Math.round(kgPerHour * 100) / 100,
    })
  }, [meterStart, meterEnd, timeSeconds, selectedGas])

  useEffect(() => {
    calculate()
  }, [calculate])

  const resetAll = () => {
    setMeterStart('')
    setMeterEnd('')
    setTimeSeconds('')
    setTimerValue(0)
    setTimerRunning(false)
    setResults(null)
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm mb-6">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            LPG Gas Rate Calculator - Propane & Butane
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            LPG Gas Rate{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Calculator UK
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-4">
            Calculate heat input (kW) for <strong>propane and butane</strong> LPG appliances.
            Uses correct calorific values for LPG - essential for{' '}
            <a href="https://www.gassaferegister.co.uk/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Gas Safe
            </a>{' '}
            registered engineers working on LPG installations.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400 mb-8">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full">
              <span className="text-blue-400">Propane:</span> 93.2 MJ/m³
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full">
              <span className="text-cyan-400">Butane:</span> 121.8 MJ/m³
            </div>
          </div>

          {/* LPG Tank Illustrations */}
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <LPGTankIllustration type="propane" className="w-20 h-auto mx-auto" />
              <p className="text-xs text-blue-400 mt-2">Propane</p>
            </div>
            <div className="text-center">
              <LPGTankIllustration type="butane" className="w-20 h-auto mx-auto" />
              <p className="text-xs text-cyan-400 mt-2">Butane</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
            {/* LPG Type Toggle */}
            <div className="flex border-b border-slate-700/50">
              <button
                onClick={() => { setLpgType('propane'); resetAll(); }}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-all ${
                  lpgType === 'propane'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span className="block">Propane</span>
                <span className="text-xs opacity-75">93.2 MJ/m³</span>
              </button>
              <button
                onClick={() => { setLpgType('butane'); resetAll(); }}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-all ${
                  lpgType === 'butane'
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span className="block">Butane</span>
                <span className="text-xs opacity-75">121.8 MJ/m³</span>
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {/* Gas Type Info */}
              <div className={`mb-6 p-4 rounded-xl border ${
                lpgType === 'propane'
                  ? 'bg-blue-500/10 border-blue-500/20'
                  : 'bg-cyan-500/10 border-cyan-500/20'
              }`}>
                <h3 className={`text-sm font-semibold mb-1 ${
                  lpgType === 'propane' ? 'text-blue-400' : 'text-cyan-400'
                }`}>
                  {selectedGas.name} Selected
                </h3>
                <p className="text-slate-400 text-sm">{selectedGas.description}</p>
                <p className="text-xs text-slate-500 mt-1">
                  Calorific Value: {selectedGas.calorificValue} MJ/m³ | Density: {selectedGas.density} kg/m³
                </p>
              </div>

              {/* Instructions */}
              <div className="mb-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                <h3 className={`text-sm font-semibold mb-2 ${
                  lpgType === 'propane' ? 'text-blue-400' : 'text-cyan-400'
                }`}>How to Gas Rate an LPG Appliance</h3>
                <ol className="text-sm text-slate-400 space-y-1 list-decimal list-inside">
                  <li>Ensure the LPG supply is connected and at correct pressure</li>
                  <li>Turn off all other gas appliances on the same supply</li>
                  <li>Note the meter start reading (if metered installation)</li>
                  <li>Turn on the appliance at full rate</li>
                  <li>Use the timer for at least 2 minutes</li>
                  <li>Note the meter end reading and enter the time taken</li>
                </ol>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Meter Readings</h3>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">
                      Meter Start Reading (m³)
                    </label>
                    <input
                      type="number"
                      step="0.001"
                      value={meterStart}
                      onChange={(e) => setMeterStart(e.target.value)}
                      placeholder="e.g. 1234.567"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">
                      Meter End Reading (m³)
                    </label>
                    <input
                      type="number"
                      step="0.001"
                      value={meterEnd}
                      onChange={(e) => setMeterEnd(e.target.value)}
                      placeholder="e.g. 1234.789"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">
                      Time (seconds)
                    </label>
                    <input
                      type="number"
                      value={timeSeconds}
                      onChange={(e) => setTimeSeconds(e.target.value)}
                      placeholder="Minimum 120 seconds recommended"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Timer */}
                  <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                    <label className="block text-sm text-slate-400 mb-3">Built-in Timer</label>
                    <div className="flex items-center gap-4">
                      <div className={`text-3xl font-mono flex-shrink-0 ${
                        lpgType === 'propane' ? 'text-blue-400' : 'text-cyan-400'
                      }`}>
                        {formatTime(timerValue)}
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {!timerRunning ? (
                          <button
                            onClick={startTimer}
                            className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            Start
                          </button>
                        ) : (
                          <button
                            onClick={stopTimer}
                            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            Stop
                          </button>
                        )}
                        <button
                          onClick={resetTimer}
                          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          Reset
                        </button>
                        {!timerRunning && timerValue > 0 && (
                          <button
                            onClick={() => setTimeSeconds(timerValue.toString())}
                            className={`px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors ${
                              lpgType === 'propane'
                                ? 'bg-blue-600 hover:bg-blue-500'
                                : 'bg-cyan-600 hover:bg-cyan-500'
                            }`}
                          >
                            Use Time
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={resetAll}
                    className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
                  >
                    Reset Calculator
                  </button>
                </div>

                {/* Results Section */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">LPG Appliance Heat Input</h3>

                  {results ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className={`p-4 rounded-xl border ${
                          lpgType === 'propane'
                            ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-blue-500/30'
                            : 'bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border-cyan-500/30'
                        }`}>
                          <p className={`text-sm mb-1 ${lpgType === 'propane' ? 'text-blue-400' : 'text-cyan-400'}`}>Gross kW</p>
                          <p className="text-3xl font-bold text-white">{results.grossKw}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-xl border border-amber-500/30">
                          <p className="text-sm text-amber-400 mb-1">Net kW</p>
                          <p className="text-3xl font-bold text-white">{results.netKw}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
                          <p className="text-xs text-slate-400 mb-1">m³/h</p>
                          <p className="text-lg font-bold text-white">{results.grossM3h}</p>
                        </div>
                        <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
                          <p className="text-xs text-slate-400 mb-1">kg/h</p>
                          <p className="text-lg font-bold text-white">{results.kgPerHour}</p>
                        </div>
                        <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
                          <p className="text-xs text-slate-400 mb-1">Net m³/h</p>
                          <p className="text-lg font-bold text-white">{results.netM3h}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                        <h4 className="text-sm font-semibold text-slate-300 mb-2">Understanding LPG Results</h4>
                        <ul className="text-xs text-slate-400 space-y-1">
                          <li><strong className={lpgType === 'propane' ? 'text-blue-400' : 'text-cyan-400'}>Gross kW:</strong> Total heat input using {selectedGas.name} CV ({selectedGas.calorificValue} MJ/m³)</li>
                          <li><strong className="text-amber-400">Net kW:</strong> Usable heat - compare to appliance data plate</li>
                          <li><strong className="text-slate-300">kg/h:</strong> LPG consumption by weight (useful for cylinder calculations)</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center p-8 bg-slate-900/30 rounded-xl border border-slate-700/30 border-dashed">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                          </svg>
                        </div>
                        <p className="text-slate-500 text-sm">
                          Enter meter readings and time to calculate LPG heat input
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">Other Gas Rate Calculators</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
              >
                Natural Gas Rate Calculator
              </Link>
              <Link
                href="/imperial-gas-rate-calculator"
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
              >
                Imperial Gas Rate Calculator
              </Link>
              <Link
                href="/gas-cost-calculator"
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
              >
                Gas Cost Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LPG vs Natural Gas Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            LPG vs Natural Gas: Key Differences
          </h2>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-700">
                  <th className="text-left py-3 pr-4">Property</th>
                  <th className="text-center py-3 px-4">Natural Gas</th>
                  <th className="text-center py-3 px-4 text-blue-400">Propane</th>
                  <th className="text-center py-3 pl-4 text-cyan-400">Butane</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-700/50">
                  <td className="py-3 pr-4 font-medium">Calorific Value</td>
                  <td className="text-center py-3 px-4">39.5 MJ/m³</td>
                  <td className="text-center py-3 px-4 text-blue-400">93.2 MJ/m³</td>
                  <td className="text-center py-3 pl-4 text-cyan-400">121.8 MJ/m³</td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="py-3 pr-4 font-medium">Density</td>
                  <td className="text-center py-3 px-4">0.72 kg/m³</td>
                  <td className="text-center py-3 px-4 text-blue-400">1.88 kg/m³</td>
                  <td className="text-center py-3 pl-4 text-cyan-400">2.49 kg/m³</td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="py-3 pr-4 font-medium">Boiling Point</td>
                  <td className="text-center py-3 px-4">-162°C</td>
                  <td className="text-center py-3 px-4 text-blue-400">-42°C</td>
                  <td className="text-center py-3 pl-4 text-cyan-400">0°C</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">Supply Pressure</td>
                  <td className="text-center py-3 px-4">21 mbar</td>
                  <td className="text-center py-3 px-4 text-blue-400">37 mbar</td>
                  <td className="text-center py-3 pl-4 text-cyan-400">28 mbar</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Why Use a Dedicated LPG Calculator?</h3>
            <p className="text-slate-300 text-sm mb-3">
              Using a natural gas calculator for LPG will give <strong>significantly incorrect results</strong>.
              Since LPG has a much higher calorific value (up to 3x that of natural gas),
              a standard calculator would underestimate the heat input by the same factor.
            </p>
            <p className="text-slate-400 text-sm">
              For example, if an LPG appliance is consuming 0.01 m³ per minute:
            </p>
            <ul className="text-sm text-slate-400 mt-2 space-y-1">
              <li>• Natural gas calculation: ~6.6 kW (incorrect for LPG)</li>
              <li>• Propane calculation: ~15.5 kW (correct for propane)</li>
              <li>• Butane calculation: ~20.3 kW (correct for butane)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            LPG Gas Rate Calculator FAQ
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
            LPG Resources
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://www.uklpg.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400">UKLPG</h3>
              <p className="text-slate-400 text-sm">Trade association for the LPG industry in the UK. Technical guidance and industry standards.</p>
            </a>

            <a
              href="https://www.gassaferegister.co.uk/gas-safety/gas-appliances/lpg/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400">Gas Safe - LPG Safety</h3>
              <p className="text-slate-400 text-sm">Official guidance on LPG safety from the Gas Safe Register.</p>
            </a>

            <a
              href="https://www.calor.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400">Calor Gas</h3>
              <p className="text-slate-400 text-sm">Major UK LPG supplier - technical specifications and cylinder information.</p>
            </a>

            <a
              href="https://www.flogas.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400">Flogas</h3>
              <p className="text-slate-400 text-sm">UK LPG supplier - bulk tanks and cylinder supplies for domestic and commercial.</p>
            </a>
          </div>

          {/* CTA */}
          <div className="mt-12 p-6 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/20 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Working with Natural Gas?</h3>
            <p className="text-slate-400 text-sm mb-4">
              For mains gas installations, use our standard gas rate calculator with the correct calorific value.
            </p>
            <Link
              href="/"
              className="inline-flex px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
            >
              Natural Gas Rate Calculator
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
