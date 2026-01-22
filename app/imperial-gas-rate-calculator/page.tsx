'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const CALORIFIC_VALUE = 39.5 // MJ/m³ (typical UK natural gas)
const CORRECTION_FACTOR = 1.02264 // Volume correction factor
const CONVERSION_FACTOR = 3.6 // MJ to kWh

const TEST_DIAL_OPTIONS = [
  { value: 0.5, label: '½ cu ft (0.5)', description: 'Small appliances, pilot lights' },
  { value: 1, label: '1 cu ft', description: 'Most common - boilers, fires' },
  { value: 2, label: '2 cu ft', description: 'Larger boilers, commercial' },
  { value: 5, label: '5 cu ft', description: 'High output commercial appliances' },
]

const faqs = [
  {
    question: "What is an imperial gas meter?",
    answer: "An imperial gas meter measures gas consumption in cubic feet (cu ft) rather than cubic metres. These are older-style meters still found in many UK properties, particularly those built before metrication. They have a test dial that shows smaller increments of gas usage for accurate testing."
  },
  {
    question: "How do I identify if I have an imperial meter?",
    answer: "Imperial meters display readings in cubic feet (cu ft or ft³). The meter face will show 'cubic feet' or 'cu ft'. The test dial (small dial on the face) will be marked in fractions of a cubic foot, typically 0.5, 1, 2, or 5 cu ft per revolution."
  },
  {
    question: "How do I perform a gas rate test on an imperial meter?",
    answer: "1) Turn off all other gas appliances. 2) Identify your test dial size (usually marked on the dial). 3) Turn on the appliance at full rate. 4) Time one complete revolution of the test dial using a stopwatch. 5) Enter the dial size and time into this calculator to get the heat input in kW."
  },
  {
    question: "What test dial size should I use?",
    answer: "Use the test dial fitted to your meter - this is usually marked on the dial face. Most domestic imperial meters have a 1 cu ft or 2 cu ft test dial. Smaller 0.5 cu ft dials are used for low-output appliances. The dial size doesn't affect the calculation - just ensure you time one complete revolution."
  },
  {
    question: "How long should one revolution take?",
    answer: "The time depends on the appliance output. A typical 24kW boiler on a 1 cu ft dial takes approximately 12-15 seconds per revolution. Lower output appliances take longer. If the dial is spinning very fast (under 5 seconds), consider using a larger test dial if available for more accuracy."
  },
  {
    question: "Why is my imperial calculation different from the metric reading?",
    answer: "Both methods should give similar results when done correctly. Small differences (±5%) are normal due to timing accuracy and calorific value variations. Larger differences may indicate a timing error, incorrect test dial size selection, or an issue with the appliance."
  },
]

interface Results {
  grossKw: number
  netKw: number
  grossM3h: number
  flowCuFtH: number
}

export default function ImperialGasRateCalculatorPage() {
  const [testDialSize, setTestDialSize] = useState(1)
  const [timeSeconds, setTimeSeconds] = useState('')
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerValue, setTimerValue] = useState(0)
  const [results, setResults] = useState<Results | null>(null)

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
    if (!time || time <= 0) {
      setResults(null)
      return
    }

    // Imperial: convert cubic feet to cubic metres
    const volumeCuFt = testDialSize
    const volumeM3 = volumeCuFt * 0.0283168 // Convert cu ft to m³

    // Calculate corrected volume
    const correctedVolume = volumeM3 * CORRECTION_FACTOR

    // Gas rate in m³/h and cu ft/h
    const gasRateM3h = (correctedVolume / time) * 3600
    const flowCuFtH = (volumeCuFt / time) * 3600

    // Gross kW = (m³/h × Calorific Value) / Conversion Factor
    const grossKw = (gasRateM3h * CALORIFIC_VALUE) / CONVERSION_FACTOR

    // Net kW (gross / 1.11)
    const netKw = grossKw / 1.11

    setResults({
      grossKw: Math.round(grossKw * 100) / 100,
      netKw: Math.round(netKw * 100) / 100,
      grossM3h: Math.round(gasRateM3h * 1000) / 1000,
      flowCuFtH: Math.round(flowCuFtH * 100) / 100,
    })
  }, [testDialSize, timeSeconds])

  useEffect(() => {
    calculate()
  }, [calculate])

  const resetAll = () => {
    setTestDialSize(1)
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm mb-6">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            Free Tool for Gas Safe Engineers
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Imperial Gas Rate{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              Calculator UK
            </span>
          </h1>

          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-4">
            Calculate gas appliance heat input (kW) from <strong>test dial measurements</strong> on imperial (cubic feet) gas meters.
            Essential for <a href="https://www.gassaferegister.co.uk/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Gas Safe</a> registered engineers working with older meter installations.
          </p>

          <p className="text-sm text-slate-400">
            Supports test dial sizes: 0.5, 1, 2, and 5 cubic feet
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
            {/* Header */}
            <div className="bg-orange-500 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Imperial Test Dial Calculator</h2>
              <p className="text-orange-100 text-sm">For gas meters measuring in cubic feet (cu ft)</p>
            </div>

            <div className="p-6 sm:p-8">
              {/* Instructions */}
              <div className="mb-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                <h3 className="text-sm font-semibold text-orange-400 mb-2">How to Use the Imperial Gas Rate Calculator</h3>
                <ol className="text-sm text-slate-400 space-y-1 list-decimal list-inside">
                  <li>Turn off all other gas appliances in the property</li>
                  <li>Identify and select your test dial size from the dropdown below</li>
                  <li>Turn on the appliance at full rate (maximum burner)</li>
                  <li>Time one complete revolution of the test dial</li>
                  <li>Enter the time taken to see the heat input calculation</li>
                </ol>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Test Dial Settings</h3>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">
                      Test Dial Size (cu ft per revolution)
                    </label>
                    <select
                      value={testDialSize}
                      onChange={(e) => setTestDialSize(parseFloat(e.target.value))}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    >
                      {TEST_DIAL_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label} - {option.description}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-slate-500 mt-1">
                      Check the dial face on your meter for the size marking
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">
                      Time for One Revolution (seconds)
                    </label>
                    <input
                      type="number"
                      value={timeSeconds}
                      onChange={(e) => setTimeSeconds(e.target.value)}
                      placeholder="Enter seconds for one complete revolution"
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  {/* Timer */}
                  <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                    <label className="block text-sm text-slate-400 mb-3">Built-in Stopwatch</label>
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-mono text-orange-400 flex-shrink-0">
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
                            className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-medium rounded-lg transition-colors"
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
                  <h3 className="text-lg font-semibold text-white mb-4">Appliance Heat Input</h3>

                  {results ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl border border-orange-500/30">
                          <p className="text-sm text-orange-400 mb-1">Gross kW</p>
                          <p className="text-3xl font-bold text-white">{results.grossKw}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-xl border border-amber-500/30">
                          <p className="text-sm text-amber-400 mb-1">Net kW</p>
                          <p className="text-3xl font-bold text-white">{results.netKw}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                          <p className="text-sm text-slate-400 mb-1">Flow Rate (cu ft/h)</p>
                          <p className="text-2xl font-bold text-white">{results.flowCuFtH}</p>
                        </div>
                        <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                          <p className="text-sm text-slate-400 mb-1">Flow Rate (m³/h)</p>
                          <p className="text-2xl font-bold text-white">{results.grossM3h}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                        <h4 className="text-sm font-semibold text-slate-300 mb-2">Understanding Your Results</h4>
                        <ul className="text-xs text-slate-400 space-y-1">
                          <li><strong className="text-orange-400">Gross kW:</strong> Total heat input including latent heat</li>
                          <li><strong className="text-amber-400">Net kW:</strong> Usable heat output - compare to appliance data plate rating</li>
                          <li><strong className="text-slate-300">Flow Rate:</strong> Gas consumption in cubic feet or metres per hour</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center p-8 bg-slate-900/30 rounded-xl border border-slate-700/30 border-dashed">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-slate-500 text-sm">
                          Select your test dial size and enter the time to calculate
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
                Metric Gas Rate Calculator
              </Link>
              <Link
                href="/lpg-gas-rate-calculator"
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
              >
                LPG Gas Rate Calculator
              </Link>
              <Link
                href="/gas-bill-calculator"
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
              >
                Gas Bill Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How Imperial Gas Rate Calculation Works */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            How Imperial Gas Rate Calculation Works
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-3">The Imperial Formula</h3>
              <div className="space-y-2 text-sm text-slate-400">
                <p><strong className="text-slate-300">Volume (cu ft)</strong> = Test dial size</p>
                <p><strong className="text-slate-300">Volume (m³)</strong> = cu ft × 0.0283168</p>
                <p><strong className="text-slate-300">Flow Rate (m³/h)</strong> = Volume × (3600 / seconds)</p>
                <p><strong className="text-slate-300">Gross kW</strong> = Flow Rate × 39.5 ÷ 3.6</p>
                <p><strong className="text-slate-300">Net kW</strong> = Gross kW ÷ 1.11</p>
              </div>
            </div>

            <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-3">Imperial vs Metric Meters</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span><strong className="text-slate-300">Imperial:</strong> Uses test dial (cu ft) - time one revolution</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span><strong className="text-slate-300">Metric:</strong> Uses meter readings (m³) - record start and end</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>Both methods give the same kW result when done correctly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span>Imperial is often quicker for single appliance testing</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Reference Table */}
          <div className="p-6 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/20">
            <h3 className="text-lg font-semibold text-orange-400 mb-4">Quick Reference: Typical Revolution Times</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-700">
                    <th className="text-left py-2 pr-4">Appliance Type</th>
                    <th className="text-center py-2 px-4">Approx. kW</th>
                    <th className="text-center py-2 px-4">1 cu ft dial</th>
                    <th className="text-center py-2 pl-4">2 cu ft dial</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-700/50">
                    <td className="py-2 pr-4">Pilot Light</td>
                    <td className="text-center py-2 px-4">0.2-0.5 kW</td>
                    <td className="text-center py-2 px-4">3-6 mins</td>
                    <td className="text-center py-2 pl-4">6-12 mins</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-2 pr-4">Gas Hob (one ring)</td>
                    <td className="text-center py-2 px-4">2-3 kW</td>
                    <td className="text-center py-2 px-4">40-60 secs</td>
                    <td className="text-center py-2 pl-4">80-120 secs</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-2 pr-4">Combi Boiler (DHW)</td>
                    <td className="text-center py-2 px-4">24-30 kW</td>
                    <td className="text-center py-2 px-4">10-15 secs</td>
                    <td className="text-center py-2 pl-4">20-30 secs</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">System Boiler</td>
                    <td className="text-center py-2 px-4">15-24 kW</td>
                    <td className="text-center py-2 px-4">12-20 secs</td>
                    <td className="text-center py-2 pl-4">24-40 secs</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Times are approximate. Always compare your calculated kW to the appliance data plate rating.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Imperial Gas Rate Calculator FAQ
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
            Resources for Gas Engineers
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://www.gassaferegister.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400">Gas Safe Register</h3>
              <p className="text-slate-400 text-sm">Official register of gas engineers. Verify registrations and find qualified engineers in your area.</p>
            </a>

            <a
              href="https://www.igem.org.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400">IGEM Standards</h3>
              <p className="text-slate-400 text-sm">Institution of Gas Engineers and Managers - technical standards and guidance for the gas industry.</p>
            </a>
          </div>

          {/* CTA */}
          <div className="mt-12 p-6 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/20 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Have a Metric Meter?</h3>
            <p className="text-slate-400 text-sm mb-4">
              If your meter displays readings in cubic metres (m³), use our standard gas rate calculator instead.
            </p>
            <Link
              href="/"
              className="inline-flex px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
            >
              Metric Gas Rate Calculator
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
