import { GasRateCalculator } from '@/components/GasRateCalculator'
import { HeroVoice } from '@/components/HeroVoice'
import { GasMeterIllustration, TestDialIllustration } from '@/components/illustrations'
import Link from 'next/link'

const faqs = [
  {
    question: "What is a gas rate calculator?",
    answer: "A gas rate calculator is a tool used by Gas Safe registered engineers to calculate the heat input (in kilowatts) of gas appliances. It uses meter readings or test dial measurements to determine if an appliance is operating within its rated capacity."
  },
  {
    question: "What's the difference between gross and net kW?",
    answer: "Gross kW is the total heat input including the latent heat in water vapour. Net kW (gross ÷ 1.11) is the usable heat output. Most appliance data plates show net kW, so compare your calculated net kW to the appliance rating."
  },
  {
    question: "When should I use metric vs imperial mode?",
    answer: "Use metric mode if your gas meter displays readings in cubic metres (m³). Use imperial mode if you're using a test dial gauge that measures in cubic feet (cu ft). Most modern UK meters are metric."
  },
  {
    question: "How long should I run the test for?",
    answer: "For metric mode, run the test for at least 2 minutes (120 seconds) to get an accurate reading. For imperial mode with a test dial, time one complete revolution of the dial - faster-burning appliances will complete a revolution quicker."
  },
  {
    question: "What calorific value does this calculator use?",
    answer: "This calculator uses 39.5 MJ/m³, which is the typical calorific value for UK natural gas. The actual CV can vary slightly (typically 37.5-43.0 MJ/m³), but 39.5 is the standard used for most calculations."
  },
  {
    question: "Why is my calculated value different from the appliance rating?",
    answer: "Small variations (±5%) are normal due to gas pressure, calorific value variations, and measurement timing. Larger differences may indicate a fault, incorrect burner pressure, or a need for servicing. Always follow Gas Safe procedures."
  },
]

const faqJsonLd = {
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
}

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Calculate Gas Rate (Heat Input) for Gas Appliances",
  description: "Step-by-step guide to calculating gas appliance heat input in kW using meter readings or a test dial. Essential for Gas Safe engineers during commissioning and servicing.",
  totalTime: "PT5M",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "GBP",
    value: "0"
  },
  tool: [
    {
      "@type": "HowToTool",
      name: "Gas meter or test dial gauge"
    },
    {
      "@type": "HowToTool",
      name: "Stopwatch or timer"
    },
    {
      "@type": "HowToTool",
      name: "Gas rate calculator"
    }
  ],
  step: [
    {
      "@type": "HowToStep",
      name: "Turn off other gas appliances",
      text: "Ensure all other gas appliances in the property are turned off to get an accurate reading for the appliance you're testing."
    },
    {
      "@type": "HowToStep",
      name: "Record the starting meter reading",
      text: "For metric meters, note the meter reading including all decimal places (e.g., 1234.567 m³). For imperial meters, identify your test dial size."
    },
    {
      "@type": "HowToStep",
      name: "Turn on the appliance at full rate",
      text: "Turn on the gas appliance you want to test at its maximum burner setting to measure full heat input."
    },
    {
      "@type": "HowToStep",
      name: "Time the gas consumption",
      text: "For metric: run the test for at least 2 minutes and record the time in seconds. For imperial: time one complete revolution of the test dial."
    },
    {
      "@type": "HowToStep",
      name: "Record the ending meter reading",
      text: "For metric meters, note the final reading. For imperial meters, you've already got the data needed from timing the dial."
    },
    {
      "@type": "HowToStep",
      name: "Calculate the heat input",
      text: "Enter your readings into the gas rate calculator to get the Gross kW and Net kW values. Compare the Net kW to the appliance data plate rating."
    }
  ]
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm mb-6">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            Free Tool for Gas Safe Engineers
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Gas Rate{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              Calculator UK
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Calculate gas appliance heat input in kW from meter readings or test dial measurements.
            Essential tool for commissioning, servicing, and fault-finding.
          </p>

          {/* Voice Assistant */}
          <div className="mb-8">
            <HeroVoice />
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Metric & Imperial
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Built-in Timer
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Gross & Net kW
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-12 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <GasRateCalculator />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How Gas Rate Calculation Works
          </h2>

          {/* Meter Illustrations */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Metric Gas Meter</h3>
              <GasMeterIllustration className="max-w-[200px] mx-auto mb-4" />
              <p className="text-sm text-slate-400 text-center">
                Read the meter in cubic metres (m³) before and after the test
              </p>
            </div>
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Imperial Test Dial</h3>
              <TestDialIllustration className="max-w-[160px] mx-auto mb-4" />
              <p className="text-sm text-slate-400 text-center">
                Time one complete revolution of the test dial (cu ft)
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">The Formula</h3>
              <div className="space-y-2 text-sm text-slate-400">
                <p><strong className="text-slate-300">Volume (m³)</strong> = End Reading - Start Reading</p>
                <p><strong className="text-slate-300">Flow Rate (m³/h)</strong> = Volume × (3600 / seconds)</p>
                <p><strong className="text-slate-300">Gross kW</strong> = Flow Rate × 39.5 ÷ 3.6</p>
                <p><strong className="text-slate-300">Net kW</strong> = Gross kW ÷ 1.11</p>
              </div>
            </div>

            <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Why It Matters</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  Verify appliances operate within rated capacity
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  Essential for commissioning new installations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  Diagnose faults and performance issues
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  Meet Gas Safe compliance requirements
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-2xl border border-orange-500/20">
            <h3 className="text-lg font-semibold text-orange-400 mb-3">Calorific Value (CV)</h3>
            <p className="text-slate-300 text-sm">
              This calculator uses <strong>39.5 MJ/m³</strong> as the standard calorific value for UK natural gas.
              The actual CV supplied to your area may vary between 37.5-43.0 MJ/m³. For precise work,
              check the current CV with your gas transporter or use the value from recent gas bills.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 bg-slate-900/50">
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

      {/* Related Calculators Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            More Gas Calculators
          </h2>
          <p className="text-slate-400 text-center mb-8">
            Explore our range of free gas calculation tools for UK gas engineers and homeowners.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/imperial-gas-rate-calculator"
              className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400">
                Imperial Gas Rate Calculator
              </h3>
              <p className="text-slate-400 text-sm">
                Calculate heat input from test dial measurements on imperial (cu ft) meters.
              </p>
            </Link>

            <Link
              href="/lpg-gas-rate-calculator"
              className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400">
                LPG Gas Rate Calculator
              </h3>
              <p className="text-slate-400 text-sm">
                Calculate heat input for propane and butane LPG appliances with correct CV values.
              </p>
            </Link>

            <Link
              href="/gas-bill-calculator"
              className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400">
                Gas Bill Calculator
              </h3>
              <p className="text-slate-400 text-sm">
                Estimate your UK gas bill based on usage, unit rates and standing charges.
              </p>
            </Link>

            <Link
              href="/gas-cost-calculator"
              className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group"
            >
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400">
                Gas Cost Calculator
              </h3>
              <p className="text-slate-400 text-sm">
                Calculate running costs for gas appliances based on heat input and usage.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Need Help With Gas Calculations?
          </h2>
          <p className="text-slate-400 mb-8">
            This gas rate calculator is designed to assist{' '}
            <a href="https://www.gassaferegister.co.uk/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">
              Gas Safe
            </a>{' '}
            registered engineers. Always follow official Gas Safe procedures and regulations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.gassaferegister.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
            >
              Gas Safe Register
            </a>
            <a
              href="#calculator"
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
            >
              Use Gas Rate Calculator
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
