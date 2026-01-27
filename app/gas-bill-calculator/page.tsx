'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Unsplash images with attribution
const images = {
  hero: {
    src: 'https://images.unsplash.com/photo-1595166986545-bf6dacb22b4e?w=1920&q=80',
    alt: 'Gas flame burning on boiler - UK gas bill calculator',
    credit: 'Unsplash'
  },
  calculator: {
    src: 'https://images.unsplash.com/photo-1709880945165-d2208c6ad2ec?w=800&q=80',
    alt: 'Calculator for UK gas bill estimation',
    credit: 'Unsplash'
  },
  pounds: {
    src: 'https://images.unsplash.com/photo-1700047614820-0f32080db6f8?w=800&q=80',
    alt: 'British pound notes for UK gas bill payment',
    credit: 'Unsplash'
  },
  thermostat: {
    src: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=800&q=80',
    alt: 'Smart thermostat for UK home heating control',
    credit: 'Unsplash'
  },
  cozyHome: {
    src: 'https://images.unsplash.com/photo-1606942472980-a70a972e5150?w=1200&q=80',
    alt: 'Cozy UK home with fireplace - reduce gas bill',
    credit: 'Unsplash'
  },
  radiatorWoman: {
    src: 'https://images.unsplash.com/photo-1692987909694-772e94e69ddf?w=1200&q=80',
    alt: 'Woman by radiator in UK home - home heating',
    credit: 'Unsplash'
  },
  flame: {
    src: 'https://images.unsplash.com/photo-1760907217271-00728f049547?w=800&q=80',
    alt: 'Gas flame - UK gas bill FAQ',
    credit: 'Unsplash'
  },
  britishTown: {
    src: 'https://images.unsplash.com/photo-1651488644799-53c3046d86bd?w=1200&q=80',
    alt: 'British town with houses - UK gas bill resources',
    credit: 'Unsplash'
  },
  meter: {
    src: 'https://images.unsplash.com/photo-1622801179563-94f5aa9a1c6d?w=600&q=80',
    alt: 'Gas meter for UK gas bill reading',
    credit: 'Unsplash'
  },
  coins: {
    src: 'https://images.unsplash.com/photo-1703437874457-560d410f82fa?w=600&q=80',
    alt: 'British coins for UK gas bill payment',
    credit: 'Unsplash'
  },
  houseNight: {
    src: 'https://images.unsplash.com/photo-1737948641148-1145c4273c70?w=600&q=80',
    alt: 'UK house at night with lights - home energy',
    credit: 'Unsplash'
  },
  radiator: {
    src: 'https://images.unsplash.com/photo-1761061079418-e7b9fde0707c?w=600&q=80',
    alt: 'White radiator in UK home - heating system',
    credit: 'Unsplash'
  },
  window: {
    src: 'https://images.unsplash.com/photo-1616714004733-803fc9e621b3?w=600&q=80',
    alt: 'Window in UK home - insulation and energy efficiency',
    credit: 'Unsplash'
  },
}

const faqs = [
  {
    question: "How is my gas bill calculated in the UK?",
    answer: "Your UK gas bill is calculated by multiplying your gas usage (in kWh) by the unit rate, then adding the standing charge for the billing period. Usage is measured in cubic metres or cubic feet by your meter, then converted to kWh using the calorific value (about 39.5 MJ/m³) and volume correction factor (1.02264). Finally, 5% VAT is added to domestic gas bills."
  },
  {
    question: "What is the standing charge on a gas bill?",
    answer: "The standing charge is a daily fixed fee charged by your energy supplier regardless of how much gas you use. As of January 2026, the average UK standing charge is around 31.43p per day. It covers the cost of maintaining the gas network, meter reading, and billing services."
  },
  {
    question: "How do I convert gas meter readings to kWh?",
    answer: "To convert gas meter readings to kWh: 1) Calculate units used (current reading minus previous reading), 2) For metric meters, multiply by 2.83 to convert m³ to cubic feet if needed, 3) Multiply by the calorific value (typically 39.5), 4) Multiply by the volume correction factor (1.02264), 5) Divide by 3.6 to get kWh."
  },
  {
    question: "What is the current gas unit rate in the UK?",
    answer: "As of January 2026, under the Energy Price Cap, the average gas unit rate is around 6.24p per kWh. This rate can vary by region and supplier. Check your latest bill or energy supplier website for your exact unit rate."
  },
  {
    question: "Why is my gas bill higher than expected?",
    answer: "High gas bills can result from: increased usage during cold weather, inefficient boiler (consider getting a gas rate calculation done), poor insulation, incorrect meter readings, or being on a more expensive tariff. Use this calculator with your actual meter readings to verify your bill is correct."
  },
  {
    question: "How much gas does a typical UK household use?",
    answer: "The average UK household uses approximately 12,000 kWh of gas per year. This varies significantly based on property size, insulation quality, boiler efficiency, and heating habits. A well-insulated 3-bed semi might use 8,000-10,000 kWh, while a larger detached home could use 15,000-20,000 kWh."
  },
  {
    question: "What is the Ofgem Energy Price Cap?",
    answer: "The Ofgem Energy Price Cap is a limit set by the UK energy regulator on the maximum amount suppliers can charge for each unit of gas and electricity. It's updated quarterly and protects consumers on standard variable tariffs. As of January 2026, the price cap sets gas at around 6.24p/kWh with a 31.43p daily standing charge."
  },
  {
    question: "How can I reduce my UK gas bill?",
    answer: "To reduce your UK gas bill: 1) Improve home insulation (loft, walls, windows), 2) Service your boiler annually to maintain efficiency, 3) Install a smart thermostat, 4) Lower your thermostat by 1°C (saves ~10% on heating), 5) Bleed radiators regularly, 6) Switch to a better tariff or supplier, 7) Consider upgrading to a more efficient boiler."
  },
  {
    question: "Is this gas bill calculator accurate?",
    answer: "This gas bill calculator UK tool provides estimates based on the Ofgem Energy Price Cap rates. Actual bills may vary slightly based on your specific supplier, regional variations, and exact meter readings. For precise figures, always check your energy statement or contact your supplier directly. This is a beta tool for estimation purposes."
  },
  {
    question: "What's the difference between gross and net calorific value?",
    answer: "Gross calorific value (GCV) measures total energy content of gas including water vapour. Net calorific value (NCV) excludes energy in water vapour and is typically ~10% lower. UK gas bills use the gross value (about 39.5 MJ/m³). Modern condensing boilers recover some of this extra heat, making them more efficient."
  },
]

const tocItems = [
  { id: 'calculator', label: 'Gas Bill Calculator' },
  { id: 'how-bills-work', label: 'How UK Gas Bills Work' },
  { id: 'price-cap', label: 'Energy Price Cap Explained' },
  { id: 'average-bills', label: 'Average UK Gas Bills' },
  { id: 'reduce-bills', label: 'Tips to Reduce Your Gas Bill' },
  { id: 'faq', label: 'Frequently Asked Questions' },
  { id: 'resources', label: 'Helpful Resources' },
]

export default function GasBillCalculatorPage() {
  const [usageKwh, setUsageKwh] = useState('')
  const [unitRate, setUnitRate] = useState('6.24')
  const [standingCharge, setStandingCharge] = useState('31.43')
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

    const usageCost = (usage * rate) / 100
    const standingCost = (standing * days) / 100
    const subtotal = usageCost + standingCost
    const vat = subtotal * 0.05
    const total = subtotal + vat

    setResult({
      usage: usageCost,
      standing: standingCost,
      total: total,
      vat: vat
    })
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Gas Bill Calculator UK",
            "description": "Free UK gas bill calculator to estimate monthly, quarterly or annual gas costs based on kWh usage, unit rates and standing charges.",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "GBP"
            },
            "creator": {
              "@type": "Organization",
              "name": "Gas Rate Calculator UK"
            }
          })
        }}
      />

      {/* Beta Disclaimer Banner */}
      <section className="bg-amber-500/20 border-b border-amber-500/30">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-2 text-amber-200 text-sm">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>
              <strong>Beta Tool:</strong> This <strong>gas bill calculator UK</strong> is for estimation purposes only.
              Always consult your energy supplier or a <a href="https://www.gassaferegister.co.uk/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Gas Safe registered engineer</a> for accurate billing and safety advice.
            </span>
          </div>
        </div>
      </section>

      {/* Hero Section with Background Image */}
      <section className="relative py-20 px-4 overflow-hidden min-h-[500px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/30 via-transparent to-transparent" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full text-orange-400 text-sm mb-6">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            Free <strong>UK Gas Bill</strong> Calculator - Updated January 2026
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Gas Bill Calculator UK:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              Free Estimator Tool
            </span>
          </h1>

          <p className="text-lg text-slate-200 max-w-2xl mx-auto mb-4 drop-shadow">
            Use our free <strong>gas bill calculator UK</strong> to estimate your monthly, quarterly or annual <strong>UK gas bill</strong> based on kWh usage and current{' '}
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

          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-8">
            Uses January 2026 <strong>UK</strong> price cap rates: <strong>6.24p/kWh</strong> unit rate and <strong>31.43p/day</strong> standing charge
          </p>

          {/* Scroll indicator */}
          <button
            onClick={() => scrollToSection('calculator')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-orange-500/25"
          >
            Calculate Your Bill
            <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-6 px-4 bg-slate-800/50 border-y border-slate-700/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold text-white mb-4">
            Quick Navigation: UK Gas Bill Calculator Guide
          </h2>
          <nav aria-label="Table of contents">
            <ul className="flex flex-wrap gap-3">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="px-4 py-2 bg-slate-700/50 hover:bg-orange-500/20 border border-slate-600 hover:border-orange-500/50 rounded-lg text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Calculator Section with Background Image */}
      <section id="calculator" className="relative py-16 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={images.pounds.src}
            alt={images.pounds.alt}
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900" />
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={images.calculator.src}
                  alt={images.calculator.alt}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Calculate Your UK Gas Bill</h2>
                <p className="text-slate-400 text-sm">
                  Enter your gas usage to estimate your <strong>UK gas bill</strong>
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Usage Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Gas Usage (kWh) <span className="text-orange-400">*</span>
                </label>
                <input
                  type="number"
                  value={usageKwh}
                  onChange={(e) => setUsageKwh(e.target.value)}
                  placeholder="e.g., 1200"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  aria-describedby="usage-help"
                />
                <p id="usage-help" className="text-xs text-slate-500 mt-1">
                  Find this on your <strong>UK gas bill</strong> or energy statement
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
                Default rates based on <strong>UK</strong> Energy Price Cap (January 2026)
              </p>

              {/* Calculate Button */}
              <button
                onClick={calculate}
                disabled={!usageKwh}
                className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-orange-500/25"
              >
                Calculate UK Gas Bill
              </button>

              {/* Results */}
              {result && (
                <div className="mt-6 p-6 bg-slate-900/70 rounded-xl border border-orange-500/30" role="region" aria-label="Gas bill calculation results">
                  <h3 className="text-lg font-semibold text-white mb-4">Estimated UK Gas Bill</h3>
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
                      <span>Total <strong>UK Gas Bill</strong></span>
                      <span className="text-orange-400">£{result.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Professional Disclaimer */}
          <div className="mt-6 p-4 bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h4 className="font-semibold text-red-400 mb-1">Important Disclaimer</h4>
                <p className="text-sm text-slate-400">
                  This <strong>gas bill calculator UK</strong> is a <strong>beta tool</strong> providing estimates only. For accurate billing information,
                  always consult your energy supplier. For gas safety concerns, contact a{' '}
                  <a href="https://www.gassaferegister.co.uk/" target="_blank" rel="noopener noreferrer" className="text-orange-400 underline hover:text-orange-300">
                    Gas Safe registered engineer
                  </a>.
                </p>
              </div>
            </div>
          </div>

          {/* Related Internal Links */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">Related UK Gas Calculators</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/" className="px-6 py-3 bg-slate-700/80 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors backdrop-blur-sm">
                Gas Rate Calculator UK
              </Link>
              <Link href="/gas-cost-calculator" className="px-6 py-3 bg-slate-700/80 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors backdrop-blur-sm">
                Gas Cost Calculator UK
              </Link>
              <Link href="/imperial-gas-rate-calculator" className="px-6 py-3 bg-slate-700/80 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors backdrop-blur-sm">
                Imperial Gas Rate Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How Gas Bills Work Section */}
      <section id="how-bills-work" className="py-16 px-4 bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            How UK Gas Bills Are Calculated
          </h2>
          <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            Understanding how your <strong>UK gas bill</strong> is calculated helps you manage energy costs more effectively.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Step 1 - with meter image */}
            <div className="relative p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 opacity-30 group-hover:opacity-50 transition-opacity">
                <Image
                  src={images.meter.src}
                  alt={images.meter.alt}
                  fill
                  className="object-cover rounded-tr-xl"
                  sizes="96px"
                />
              </div>
              <div className="relative">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-orange-400">1</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Meter Reading to kWh</h3>
                <p className="text-slate-400 text-sm">
                  Your <strong>UK</strong> gas usage is measured in cubic metres (m³) then converted to kWh using the calorific value (39.5 MJ/m³) and volume correction factor.
                </p>
              </div>
            </div>

            {/* Step 2 - with coins image */}
            <div className="relative p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 opacity-30 group-hover:opacity-50 transition-opacity">
                <Image
                  src={images.coins.src}
                  alt={images.coins.alt}
                  fill
                  className="object-cover rounded-tr-xl"
                  sizes="96px"
                />
              </div>
              <div className="relative">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-orange-400">2</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Apply Unit Rate</h3>
                <p className="text-slate-400 text-sm">
                  Your kWh usage is multiplied by the unit rate (~6.24p/kWh under the <strong>UK</strong> Ofgem price cap). This forms the main part of your <strong>gas bill</strong>.
                </p>
              </div>
            </div>

            {/* Step 3 - with house at night */}
            <div className="relative p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 opacity-30 group-hover:opacity-50 transition-opacity">
                <Image
                  src={images.houseNight.src}
                  alt={images.houseNight.alt}
                  fill
                  className="object-cover rounded-tr-xl"
                  sizes="96px"
                />
              </div>
              <div className="relative">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-orange-400">3</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Add Standing Charge</h3>
                <p className="text-slate-400 text-sm">
                  The <strong>UK</strong> standing charge (~31.43p/day) is added regardless of usage. For a quarterly <strong>bill</strong>, this adds ~£28.60.
                </p>
              </div>
            </div>

            {/* Step 4 - with window */}
            <div className="relative p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 opacity-30 group-hover:opacity-50 transition-opacity">
                <Image
                  src={images.window.src}
                  alt={images.window.alt}
                  fill
                  className="object-cover rounded-tr-xl"
                  sizes="96px"
                />
              </div>
              <div className="relative">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-orange-400">4</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Calculate VAT (5%)</h3>
                <p className="text-slate-400 text-sm">
                  Domestic gas in the <strong>UK</strong> has a reduced VAT rate of 5% (not 20%), making energy more affordable for households.
                </p>
              </div>
            </div>
          </div>

          {/* Formula */}
          <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">UK Gas Bill Formula</h3>
            <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm text-orange-400 overflow-x-auto">
              <p>Total Gas Bill = ((kWh × Unit Rate) + (Standing Charge × Days)) × 1.05</p>
            </div>
            <p className="text-slate-500 text-xs mt-3">
              The 1.05 multiplier accounts for the 5% VAT on all <strong>UK gas bills</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Energy Price Cap Section with Thermostat Image */}
      <section id="price-cap" className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images.thermostat.src}
            alt={images.thermostat.alt}
            fill
            className="object-cover opacity-15"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            UK Energy Price Cap Explained
          </h2>
          <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            The <strong>UK</strong> Energy Price Cap is set by{' '}
            <a href="https://www.ofgem.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">
              Ofgem
            </a>{' '}
            and determines maximum rates suppliers can charge.
          </p>

          {/* Price Cap Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-gradient-to-br from-orange-500/20 to-amber-500/10 backdrop-blur-sm rounded-xl border border-orange-500/30 text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">6.24p</div>
              <div className="text-slate-300 font-medium">per kWh</div>
              <div className="text-slate-500 text-sm mt-2">UK Gas Unit Rate</div>
              <div className="text-slate-600 text-xs mt-1">January 2026 Price Cap</div>
            </div>

            <div className="p-6 bg-gradient-to-br from-orange-500/20 to-amber-500/10 backdrop-blur-sm rounded-xl border border-orange-500/30 text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">31.43p</div>
              <div className="text-slate-300 font-medium">per day</div>
              <div className="text-slate-500 text-sm mt-2">UK Standing Charge</div>
              <div className="text-slate-600 text-xs mt-1">Daily fixed cost</div>
            </div>

            <div className="p-6 bg-gradient-to-br from-orange-500/20 to-amber-500/10 backdrop-blur-sm rounded-xl border border-orange-500/30 text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">5%</div>
              <div className="text-slate-300 font-medium">VAT Rate</div>
              <div className="text-slate-500 text-sm mt-2">Reduced Rate</div>
              <div className="text-slate-600 text-xs mt-1">For domestic energy</div>
            </div>
          </div>

          {/* Price Cap History Table */}
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">UK Energy Price Cap History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Period</th>
                    <th className="text-right py-3 px-4 text-slate-300 font-medium">Gas (p/kWh)</th>
                    <th className="text-right py-3 px-4 text-slate-300 font-medium">Standing (p/day)</th>
                    <th className="text-right py-3 px-4 text-slate-300 font-medium">Annual Bill*</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400">
                  <tr className="border-b border-slate-700/50 bg-orange-500/10">
                    <td className="py-3 px-4 font-medium text-white">Jan 2026 (Current)</td>
                    <td className="py-3 px-4 text-right">6.24p</td>
                    <td className="py-3 px-4 text-right">31.43p</td>
                    <td className="py-3 px-4 text-right text-orange-400 font-semibold">£1,738</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4">Oct 2025</td>
                    <td className="py-3 px-4 text-right">5.48p</td>
                    <td className="py-3 px-4 text-right">31.41p</td>
                    <td className="py-3 px-4 text-right">£1,568</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4">Jul 2025</td>
                    <td className="py-3 px-4 text-right">5.48p</td>
                    <td className="py-3 px-4 text-right">31.41p</td>
                    <td className="py-3 px-4 text-right">£1,568</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4">Apr 2025</td>
                    <td className="py-3 px-4 text-right">5.48p</td>
                    <td className="py-3 px-4 text-right">31.41p</td>
                    <td className="py-3 px-4 text-right">£1,690</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Jan 2025</td>
                    <td className="py-3 px-4 text-right">7.42p</td>
                    <td className="py-3 px-4 text-right">29.60p</td>
                    <td className="py-3 px-4 text-right">£1,928</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              *Based on <a href="https://www.ofgem.gov.uk/information-consumers/energy-advice-households/average-gas-and-electricity-use" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Ofgem typical consumption</a> (12,000 kWh/year)
            </p>
          </div>
        </div>
      </section>

      {/* Average UK Gas Bills Section with Cozy Home Background */}
      <section id="average-bills" className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images.cozyHome.src}
            alt={images.cozyHome.alt}
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Average UK Gas Bills by Property Type
          </h2>
          <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            <strong>UK gas bill</strong> amounts vary based on property size and insulation quality.
          </p>

          <div className="p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-orange-500/20 mb-8">
            <h3 className="text-lg font-semibold text-orange-400 mb-4">Typical UK Gas Usage by Property Size</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <p className="text-2xl font-bold text-white">8,000</p>
                <p className="text-xs text-slate-400">kWh/year</p>
                <p className="text-sm text-slate-300 mt-1">Small flat</p>
                <p className="text-xs text-orange-400 mt-2">~£640/year*</p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <p className="text-2xl font-bold text-white">12,000</p>
                <p className="text-xs text-slate-400">kWh/year</p>
                <p className="text-sm text-slate-300 mt-1">Medium house</p>
                <p className="text-xs text-orange-400 mt-2">~£910/year*</p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <p className="text-2xl font-bold text-white">17,000</p>
                <p className="text-xs text-slate-400">kWh/year</p>
                <p className="text-sm text-slate-300 mt-1">Large house</p>
                <p className="text-xs text-orange-400 mt-2">~£1,240/year*</p>
              </div>
              <div className="p-4 bg-slate-900/50 rounded-lg">
                <p className="text-2xl font-bold text-white">22,000+</p>
                <p className="text-xs text-slate-400">kWh/year</p>
                <p className="text-sm text-slate-300 mt-1">Large detached</p>
                <p className="text-xs text-orange-400 mt-2">~£1,580/year*</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center">
              *Using January 2026 price cap rates. Source: <a href="https://www.ofgem.gov.uk/information-consumers/energy-advice-households/average-gas-and-electricity-use" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Ofgem</a>
            </p>
          </div>

          {/* Regional Variations with radiator image */}
          <div className="relative p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-30">
              <Image
                src={images.radiator.src}
                alt={images.radiator.alt}
                fill
                className="object-cover rounded-tr-xl"
                sizes="128px"
              />
            </div>
            <div className="relative">
              <h3 className="text-lg font-semibold text-white mb-4">Regional Variations in UK Gas Bills</h3>
              <p className="text-slate-400 text-sm mb-4">
                <strong>UK gas bills</strong> can vary by region due to different network costs and climate.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900/50 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Factors Affecting Bills</h4>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• Local network distribution costs</li>
                    <li>• Regional supplier pricing</li>
                    <li>• Average winter temperatures</li>
                    <li>• Housing stock efficiency</li>
                  </ul>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Find Your Exact Rates</h4>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• Check your latest <strong>UK gas bill</strong></li>
                    <li>• Log into your supplier account</li>
                    <li>• Contact your energy supplier</li>
                    <li>• Use our <strong>calculator</strong> with your rates</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section with Woman by Radiator Background */}
      <section id="reduce-bills" className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images.radiatorWoman.src}
            alt={images.radiatorWoman.alt}
            fill
            className="object-cover opacity-15"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            10 Tips to Reduce Your UK Gas Bill
          </h2>
          <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            Proven strategies from the{' '}
            <a href="https://www.energysavingtrust.org.uk/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">
              Energy Saving Trust
            </a>{' '}
            to lower your <strong>UK gas bill</strong>.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Lower thermostat by 1°C", desc: "Reduce your UK gas bill by up to 10% annually", icon: "🌡️" },
              { title: "Service your boiler annually", desc: "Maintains efficiency and prevents breakdowns", icon: "🔧" },
              { title: "Install a smart thermostat", desc: "Save up to £150/year with optimised schedules", icon: "📱" },
              { title: "Improve home insulation", desc: "Loft and wall insulation reduces heat loss", icon: "🏠" },
              { title: "Bleed radiators regularly", desc: "Remove trapped air for better efficiency", icon: "♨️" },
              { title: "Use TRVs effectively", desc: "Control heating room by room", icon: "🎛️" },
              { title: "Draught-proof your home", desc: "Save up to £60 per year on your bill", icon: "🚪" },
              { title: "Compare energy suppliers", desc: "Switching could save you money", icon: "💰" },
              { title: "Consider a boiler upgrade", desc: "Modern A-rated boilers are more efficient", icon: "⬆️" },
              { title: "Use heating timer", desc: "Don't heat an empty home", icon: "⏰" },
            ].map((tip, index) => (
              <div key={index} className="p-4 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700/50 flex items-start gap-3">
                <span className="text-2xl" role="img" aria-hidden="true">{tip.icon}</span>
                <div>
                  <h3 className="font-medium text-white">{tip.title}</h3>
                  <p className="text-sm text-slate-400">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/10 backdrop-blur-sm rounded-xl border border-green-500/30">
            <h3 className="text-lg font-semibold text-green-400 mb-2">Need Help with Energy Efficiency?</h3>
            <p className="text-slate-400 text-sm mb-4">
              The <strong>UK</strong> Government offers grants to improve home energy efficiency.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.gov.uk/improve-energy-efficiency" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-300 text-sm transition-colors">
                UK Government Grants →
              </a>
              <a href="https://www.energysavingtrust.org.uk/advice/grants-and-loans/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-300 text-sm transition-colors">
                Energy Saving Trust Grants →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with Flame Background */}
      <section id="faq" className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images.flame.src}
            alt={images.flame.alt}
            fill
            className="object-cover opacity-10"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/98 to-slate-900" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            UK Gas Bill Calculator FAQ
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
            Common questions about <strong>UK gas bills</strong> and our <strong>gas bill calculator UK</strong> tool.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700/50 cursor-pointer"
              >
                <summary className="flex items-center justify-between text-white font-medium list-none">
                  {faq.question}
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {/* Resources Section with British Town Background */}
      <section id="resources" className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={images.britishTown.src}
            alt={images.britishTown.alt}
            fill
            className="object-cover opacity-15"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            Helpful Resources for UK Gas Bill Information
          </h2>
          <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            Official <strong>UK</strong> resources for energy consumers.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <a href="https://www.ofgem.gov.uk/information-for-household-consumers" target="_blank" rel="noopener noreferrer" className="p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400">Ofgem - UK Energy Regulator</h3>
              <p className="text-slate-400 text-sm">Official guidance on <strong>bills</strong>, switching suppliers, and consumer rights.</p>
            </a>

            <a href="https://www.citizensadvice.org.uk/consumer/energy/energy-supply/" target="_blank" rel="noopener noreferrer" className="p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400">Citizens Advice - Energy Help</h3>
              <p className="text-slate-400 text-sm">Free advice on <strong>UK gas bills</strong>, debt help, and supplier issues.</p>
            </a>

            <a href="https://www.gassaferegister.co.uk/" target="_blank" rel="noopener noreferrer" className="p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400">Gas Safe Register - UK</h3>
              <p className="text-slate-400 text-sm">Find registered gas engineers for boiler servicing and repairs.</p>
            </a>

            <a href="https://www.energysavingtrust.org.uk/" target="_blank" rel="noopener noreferrer" className="p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400">Energy Saving Trust</h3>
              <p className="text-slate-400 text-sm">Tips for reducing your <strong>UK gas bill</strong> and improving efficiency.</p>
            </a>

            <a href="https://www.gov.uk/guidance/gas-meter-readings-and-billing" target="_blank" rel="noopener noreferrer" className="p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400">GOV.UK - Gas Meter Guidance</h3>
              <p className="text-slate-400 text-sm">Official government information on meter readings and <strong>billing</strong>.</p>
            </a>

            <a href="https://www.moneysavingexpert.com/utilities/gas-electricity-bills/" target="_blank" rel="noopener noreferrer" className="p-6 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400">MoneySavingExpert - Energy</h3>
              <p className="text-slate-400 text-sm">Independent advice on tariffs and reducing your <strong>gas bill</strong>.</p>
            </a>
          </div>

          {/* CTA for Engineers */}
          <div className="mt-12 p-6 bg-gradient-to-r from-orange-500/20 to-amber-500/10 backdrop-blur-sm rounded-xl border border-orange-500/30 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Are you a UK Gas Safe Engineer?</h3>
            <p className="text-slate-400 text-sm mb-4">
              Use our professional <strong>gas rate calculator UK</strong> for appliance heat input calculations.
            </p>
            <Link href="/" className="inline-flex px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors shadow-lg">
              Gas Rate Calculator UK for Engineers
            </Link>
          </div>
        </div>
      </section>

      {/* Final Beta Notice */}
      <section className="py-8 px-4 bg-slate-800/50 border-t border-slate-700/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-slate-400">
            <strong className="text-amber-400">Beta Notice:</strong> This <strong>gas bill calculator UK</strong> provides estimates only.
            Always consult your energy supplier for accurate <strong>billing</strong>.
            For gas safety, contact a{' '}
            <a href="https://www.gassaferegister.co.uk/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Gas Safe registered engineer</a>{' '}
            or <a href="https://www.ofgem.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Ofgem</a>.
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Images provided by <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">Unsplash</a>
          </p>
        </div>
      </section>
    </>
  )
}
