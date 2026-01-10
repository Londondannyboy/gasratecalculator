'use client'

import { useState, useEffect, useCallback } from 'react'

type MeasurementMode = 'metric' | 'imperial'

const CALORIFIC_VALUE = 39.5 // MJ/m³ (typical UK natural gas)
const CORRECTION_FACTOR = 1.02264 // Volume correction factor
const CONVERSION_FACTOR = 3.6 // MJ to kWh

// Test dial sizes in cubic feet
const TEST_DIAL_OPTIONS = [
  { value: 0.5, label: '½ cu ft (0.5)' },
  { value: 1, label: '1 cu ft' },
  { value: 2, label: '2 cu ft' },
  { value: 5, label: '5 cu ft' },
]

interface Results {
  grossKw: number
  netKw: number
  grossM3h: number
  netM3h: number
}

export function GasRateCalculator() {
  const [mode, setMode] = useState<MeasurementMode>('metric')

  // Metric inputs
  const [meterStart, setMeterStart] = useState('')
  const [meterEnd, setMeterEnd] = useState('')

  // Imperial inputs
  const [testDialSize, setTestDialSize] = useState(1)

  // Shared inputs
  const [timeSeconds, setTimeSeconds] = useState('')

  // Timer state
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerValue, setTimerValue] = useState(0)

  // Results
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

    let volumeM3: number

    if (mode === 'metric') {
      const start = parseFloat(meterStart)
      const end = parseFloat(meterEnd)
      if (isNaN(start) || isNaN(end)) {
        setResults(null)
        return
      }
      volumeM3 = end - start
    } else {
      // Imperial: convert cubic feet to cubic meters
      // One revolution of test dial
      const volumeCuFt = testDialSize
      volumeM3 = volumeCuFt * 0.0283168 // Convert cu ft to m³
    }

    if (volumeM3 <= 0) {
      setResults(null)
      return
    }

    // Calculate corrected volume
    const correctedVolume = volumeM3 * CORRECTION_FACTOR

    // Gas rate in m³/h
    const gasRateM3h = (correctedVolume / time) * 3600

    // Gross kW = (m³/h × Calorific Value) / Conversion Factor
    const grossKw = (gasRateM3h * CALORIFIC_VALUE) / CONVERSION_FACTOR

    // Net kW (gross / 1.11 for conversion efficiency)
    const netKw = grossKw / 1.11

    // Net m³/h
    const netM3h = gasRateM3h / 1.11

    setResults({
      grossKw: Math.round(grossKw * 100) / 100,
      netKw: Math.round(netKw * 100) / 100,
      grossM3h: Math.round(gasRateM3h * 1000) / 1000,
      netM3h: Math.round(netM3h * 1000) / 1000,
    })
  }, [mode, meterStart, meterEnd, testDialSize, timeSeconds])

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
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 overflow-hidden">
        {/* Mode Toggle */}
        <div className="flex border-b border-slate-700/50">
          <button
            onClick={() => { setMode('metric'); resetAll(); }}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-all ${
              mode === 'metric'
                ? 'bg-orange-500 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Metric (m³)
          </button>
          <button
            onClick={() => { setMode('imperial'); resetAll(); }}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition-all ${
              mode === 'imperial'
                ? 'bg-orange-500 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Imperial (cu ft)
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {/* Instructions */}
          <div className="mb-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
            <h3 className="text-sm font-semibold text-orange-400 mb-2">Instructions</h3>
            {mode === 'metric' ? (
              <ol className="text-sm text-slate-400 space-y-1 list-decimal list-inside">
                <li>Turn off all other gas appliances in the property</li>
                <li>Note the meter start reading (including decimal places)</li>
                <li>Turn on the appliance at full rate</li>
                <li>Use the timer or stopwatch for at least 2 minutes</li>
                <li>Note the meter end reading and enter the time taken</li>
              </ol>
            ) : (
              <ol className="text-sm text-slate-400 space-y-1 list-decimal list-inside">
                <li>Turn off all other gas appliances in the property</li>
                <li>Select your test dial size from the dropdown</li>
                <li>Turn on the appliance at full rate</li>
                <li>Time one complete revolution of the test dial</li>
                <li>Enter the time taken in seconds</li>
              </ol>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                {mode === 'metric' ? 'Meter Readings' : 'Test Dial'}
              </h3>

              {mode === 'metric' ? (
                <>
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
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
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
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    Test Dial Size
                  </label>
                  <select
                    value={testDialSize}
                    onChange={(e) => setTestDialSize(parseFloat(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  >
                    {TEST_DIAL_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Time (seconds)
                </label>
                <input
                  type="number"
                  value={timeSeconds}
                  onChange={(e) => setTimeSeconds(e.target.value)}
                  placeholder={mode === 'metric' ? 'Minimum 120 seconds recommended' : 'Time for one revolution'}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>

              {/* Timer */}
              <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                <label className="block text-sm text-slate-400 mb-3">Built-in Timer</label>
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
                Reset All
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
                      <p className="text-sm text-slate-400 mb-1">Gross m³/h</p>
                      <p className="text-2xl font-bold text-white">{results.grossM3h}</p>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                      <p className="text-sm text-slate-400 mb-1">Net m³/h</p>
                      <p className="text-2xl font-bold text-white">{results.netM3h}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">Understanding the Results</h4>
                    <ul className="text-xs text-slate-400 space-y-1">
                      <li><strong className="text-orange-400">Gross kW:</strong> Total heat input including latent heat in water vapour</li>
                      <li><strong className="text-amber-400">Net kW:</strong> Usable heat (gross ÷ 1.11) - compare this to appliance data plate</li>
                      <li><strong className="text-slate-300">m³/h:</strong> Gas flow rate in cubic metres per hour</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-8 bg-slate-900/30 rounded-xl border border-slate-700/30 border-dashed">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                      </svg>
                    </div>
                    <p className="text-slate-500 text-sm">
                      Enter your {mode === 'metric' ? 'meter readings' : 'test dial'} and time to calculate
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
