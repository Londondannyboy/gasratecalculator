import Link from 'next/link'

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Calculate Gas Rate: Complete Guide for Gas Engineers",
  description: "Learn how to calculate gas rate (heat input) for any gas appliance using metric or imperial methods.",
  author: {
    "@type": "Organization",
    name: "Gas Rate Calculator UK"
  },
  publisher: {
    "@type": "Organization",
    name: "Gas Rate Calculator UK",
    logo: {
      "@type": "ImageObject",
      url: "https://gasratecalculator.quest/icon.svg"
    }
  },
  datePublished: "2025-01-22",
  dateModified: "2025-01-22",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://gasratecalculator.quest/articles/how-to-calculate-gas-rate"
  }
}

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Calculate Gas Rate for Gas Appliances",
  description: "Step-by-step guide to calculating the heat input (kW) of gas appliances using meter readings.",
  totalTime: "PT10M",
  supply: [
    { "@type": "HowToSupply", name: "Gas meter readings" },
    { "@type": "HowToSupply", name: "Time measurement in seconds" }
  ],
  tool: [
    { "@type": "HowToTool", name: "Gas meter or test dial gauge" },
    { "@type": "HowToTool", name: "Stopwatch or timer" },
    { "@type": "HowToTool", name: "Calculator" }
  ],
  step: [
    {
      "@type": "HowToStep",
      name: "Prepare the property",
      text: "Turn off all other gas appliances in the property to ensure accurate measurement of a single appliance."
    },
    {
      "@type": "HowToStep",
      name: "Record starting meter reading",
      text: "Note the gas meter reading including all decimal places. For imperial meters, identify your test dial size."
    },
    {
      "@type": "HowToStep",
      name: "Run the appliance",
      text: "Turn on the gas appliance at maximum rate and start your timer simultaneously."
    },
    {
      "@type": "HowToStep",
      name: "Time the gas consumption",
      text: "For metric meters, time for at least 2 minutes. For imperial meters, time one complete revolution of the test dial."
    },
    {
      "@type": "HowToStep",
      name: "Record ending reading",
      text: "Note the final meter reading and the exact time elapsed in seconds."
    },
    {
      "@type": "HowToStep",
      name: "Apply the gas rate formula",
      text: "Calculate: Volume (m³) × Correction Factor (1.02264) × Calorific Value (39.5) ÷ Time (seconds) × 1000 = kW"
    }
  ]
}

export default function HowToCalculateGasRatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="bg-slate-900 border-b border-slate-800 px-4 py-3">
        <div className="max-w-4xl mx-auto text-sm text-slate-400">
          <Link href="/" className="hover:text-orange-400">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/articles" className="hover:text-orange-400">Articles</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">How to Calculate Gas Rate</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm mb-6">
            <span className="w-2 h-2 bg-orange-400 rounded-full" />
            Gas Engineering Guide
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            How to Calculate{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              Gas Rate
            </span>
          </h1>

          <p className="text-xl text-slate-300 mb-6">
            A complete step-by-step guide to calculating the heat input (kW) of any gas appliance.
            Essential knowledge for Gas Safe registered engineers.
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <span>Updated: January 2025</span>
            <span>|</span>
            <span>Reading time: 8 minutes</span>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 px-4 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold text-white mb-4">In This Guide</h2>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            <a href="#what-is-gas-rate" className="text-slate-400 hover:text-orange-400">1. What is Gas Rate?</a>
            <a href="#metric-formula" className="text-slate-400 hover:text-orange-400">2. The Metric Formula</a>
            <a href="#imperial-formula" className="text-slate-400 hover:text-orange-400">3. The Imperial Formula</a>
            <a href="#step-by-step" className="text-slate-400 hover:text-orange-400">4. Step-by-Step Method</a>
            <a href="#worked-example" className="text-slate-400 hover:text-orange-400">5. Worked Example</a>
            <a href="#common-mistakes" className="text-slate-400 hover:text-orange-400">6. Common Mistakes</a>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-invert prose-orange">

          {/* Section 1: What is Gas Rate */}
          <section id="what-is-gas-rate" className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">1. What is Gas Rate?</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                <strong>Gas rate</strong> (also called heat input) is the amount of energy a gas appliance consumes per unit of time,
                measured in <strong>kilowatts (kW)</strong>. It tells you how much gas an appliance is burning and whether it&apos;s
                operating within its rated capacity.
              </p>
              <p>
                As a <a href="https://www.gassaferegister.co.uk/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">Gas Safe</a> registered
                engineer, calculating gas rate is essential for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400">
                <li><strong>Commissioning</strong> - Verifying new installations meet manufacturer specifications</li>
                <li><strong>Servicing</strong> - Checking appliances are operating efficiently</li>
                <li><strong>Fault-finding</strong> - Diagnosing under-firing or over-firing issues</li>
                <li><strong>Safety checks</strong> - Ensuring appliances aren&apos;t exceeding their rated input</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Metric Formula */}
          <section id="metric-formula" className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">2. The Metric Gas Rate Formula</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                For <strong>metric gas meters</strong> (measuring in cubic metres, m³), the gas rate formula is:
              </p>

              <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 my-6">
                <h3 className="text-lg font-semibold text-orange-400 mb-4">Metric Gas Rate Formula</h3>
                <div className="space-y-3 font-mono text-sm">
                  <p className="text-slate-300">
                    <strong>Volume (m³)</strong> = End Reading - Start Reading
                  </p>
                  <p className="text-slate-300">
                    <strong>Flow Rate (m³/h)</strong> = Volume × (3600 ÷ seconds)
                  </p>
                  <p className="text-slate-300">
                    <strong>Corrected Flow</strong> = Flow Rate × 1.02264 <span className="text-slate-500">(volume correction factor)</span>
                  </p>
                  <p className="text-slate-300">
                    <strong>Gross kW</strong> = Corrected Flow × 39.5 ÷ 3.6
                  </p>
                  <p className="text-slate-300">
                    <strong>Net kW</strong> = Gross kW ÷ 1.11
                  </p>
                </div>
              </div>

              <p>
                <strong>Key values explained:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400">
                <li><strong>39.5 MJ/m³</strong> - Standard UK calorific value for natural gas</li>
                <li><strong>1.02264</strong> - Volume correction factor (accounts for temperature and pressure)</li>
                <li><strong>3.6</strong> - Conversion factor from MJ to kWh</li>
                <li><strong>1.11</strong> - Gross to net conversion (accounts for latent heat in water vapour)</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Imperial Formula */}
          <section id="imperial-formula" className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">3. The Imperial Gas Rate Formula</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                For <strong>imperial gas meters</strong> with test dials (measuring in cubic feet, cu ft):
              </p>

              <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 my-6">
                <h3 className="text-lg font-semibold text-orange-400 mb-4">Imperial Gas Rate Formula</h3>
                <div className="space-y-3 font-mono text-sm">
                  <p className="text-slate-300">
                    <strong>Volume (cu ft)</strong> = Test dial size (0.5, 1, 2, or 5 cu ft)
                  </p>
                  <p className="text-slate-300">
                    <strong>Flow Rate (cu ft/h)</strong> = Volume × (3600 ÷ seconds per revolution)
                  </p>
                  <p className="text-slate-300">
                    <strong>Flow Rate (m³/h)</strong> = cu ft/h × 0.0283168
                  </p>
                  <p className="text-slate-300">
                    <strong>Gross kW</strong> = m³/h × 1.02264 × 39.5 ÷ 3.6
                  </p>
                </div>
              </div>

              <p>
                <strong>Test dial sizes:</strong> Most imperial meters have test dials of 0.5, 1, 2, or 5 cubic feet.
                The size is usually marked on the dial face. Time one complete revolution of the test dial.
              </p>
            </div>
          </section>

          {/* Section 4: Step by Step */}
          <section id="step-by-step" className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">4. Step-by-Step Method</h2>
            <div className="text-slate-300 space-y-4">
              <p>Follow these steps to perform a gas rate calculation:</p>

              <div className="space-y-4 my-6">
                <div className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-orange-500">
                  <h3 className="font-semibold text-white mb-2">Step 1: Isolate the appliance</h3>
                  <p className="text-slate-400 text-sm">Turn off ALL other gas appliances in the property - including pilot lights, gas fires, hobs, and any other gas appliances. Only the appliance you&apos;re testing should be consuming gas.</p>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-orange-500">
                  <h3 className="font-semibold text-white mb-2">Step 2: Record starting reading</h3>
                  <p className="text-slate-400 text-sm">For metric meters: Note the meter reading including ALL decimal places (e.g., 12345.678 m³). For imperial: Identify your test dial size.</p>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-orange-500">
                  <h3 className="font-semibold text-white mb-2">Step 3: Fire the appliance</h3>
                  <p className="text-slate-400 text-sm">Turn on the appliance at MAXIMUM rate. For boilers, this usually means hot water mode at maximum temperature. Start your timer at the same moment.</p>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-orange-500">
                  <h3 className="font-semibold text-white mb-2">Step 4: Time the consumption</h3>
                  <p className="text-slate-400 text-sm">
                    <strong>Metric:</strong> Run for at least 2 minutes (120 seconds) for accuracy. Longer is better for low-output appliances.<br/>
                    <strong>Imperial:</strong> Time one complete revolution of the test dial.
                  </p>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-orange-500">
                  <h3 className="font-semibold text-white mb-2">Step 5: Record and calculate</h3>
                  <p className="text-slate-400 text-sm">Note the final reading and time. Apply the formula above, or use our <Link href="/" className="text-orange-400 hover:underline">gas rate calculator</Link> for instant results.</p>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-orange-500">
                  <h3 className="font-semibold text-white mb-2">Step 6: Compare to data plate</h3>
                  <p className="text-slate-400 text-sm">Compare your calculated NET kW to the appliance data plate. A variance of ±5% is typically acceptable. Larger differences may indicate a fault.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Worked Example */}
          <section id="worked-example" className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">5. Worked Example</h2>
            <div className="text-slate-300 space-y-4">
              <p>
                <strong>Scenario:</strong> You&apos;re commissioning a new 28kW combi boiler and need to verify its gas rate.
              </p>

              <div className="p-6 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl border border-orange-500/20 my-6">
                <h3 className="text-lg font-semibold text-orange-400 mb-4">Example Calculation (Metric)</h3>
                <div className="space-y-3 text-sm">
                  <p><strong>Given:</strong></p>
                  <ul className="list-disc list-inside text-slate-400 ml-4">
                    <li>Meter start reading: 12345.678 m³</li>
                    <li>Meter end reading: 12345.834 m³</li>
                    <li>Time elapsed: 180 seconds (3 minutes)</li>
                  </ul>

                  <p className="mt-4"><strong>Calculation:</strong></p>
                  <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-xs space-y-2">
                    <p>Volume = 12345.834 - 12345.678 = <span className="text-orange-400">0.156 m³</span></p>
                    <p>Flow Rate = 0.156 × (3600 ÷ 180) = 0.156 × 20 = <span className="text-orange-400">3.12 m³/h</span></p>
                    <p>Corrected Flow = 3.12 × 1.02264 = <span className="text-orange-400">3.191 m³/h</span></p>
                    <p>Gross kW = 3.191 × 39.5 ÷ 3.6 = <span className="text-orange-400">35.0 kW gross</span></p>
                    <p>Net kW = 35.0 ÷ 1.11 = <span className="text-orange-400 font-bold">31.5 kW net</span></p>
                  </div>

                  <p className="mt-4"><strong>Result:</strong> The boiler is operating at approximately 31.5 kW net, which is slightly above the rated 28kW.
                  This indicates the boiler may be over-firing and the burner pressure should be checked and adjusted.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Common Mistakes */}
          <section id="common-mistakes" className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">6. Common Mistakes to Avoid</h2>
            <div className="text-slate-300 space-y-4">
              <div className="grid gap-4">
                <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                  <h3 className="font-semibold text-red-400 mb-2">Not isolating other appliances</h3>
                  <p className="text-slate-400 text-sm">Forgetting to turn off other gas appliances will give you an inflated gas rate reading. Always isolate before testing.</p>
                </div>

                <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                  <h3 className="font-semibold text-red-400 mb-2">Running the test too short</h3>
                  <p className="text-slate-400 text-sm">Short test periods magnify any timing errors. For metric meters, always run for at least 2 minutes, preferably longer for low-output appliances.</p>
                </div>

                <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                  <h3 className="font-semibold text-red-400 mb-2">Comparing gross to net values</h3>
                  <p className="text-slate-400 text-sm">Most appliance data plates show NET kW. Always compare your calculated NET value (not gross) to the data plate.</p>
                </div>

                <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                  <h3 className="font-semibold text-red-400 mb-2">Not accounting for modulating appliances</h3>
                  <p className="text-slate-400 text-sm">Modern modulating boilers adjust their output. Ensure the appliance is firing at maximum rate during the test - usually by running hot water at maximum temperature.</p>
                </div>

                <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                  <h3 className="font-semibold text-red-400 mb-2">Using wrong calorific value</h3>
                  <p className="text-slate-400 text-sm">The standard CV of 39.5 MJ/m³ is used for most calculations. Regional variations (37.5-43.0) can affect accuracy. For precise work, check the current CV with your gas transporter.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-12 p-8 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-2xl border border-orange-500/20 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Try Our Free Gas Rate Calculator</h2>
            <p className="text-slate-300 mb-6">
              Skip the manual calculations. Our free online calculator does all the maths for you instantly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
              >
                Metric Gas Rate Calculator
              </Link>
              <Link
                href="/imperial-gas-rate-calculator"
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
              >
                Imperial Gas Rate Calculator
              </Link>
            </div>
          </section>

        </div>
      </article>

      {/* Related Articles */}
      <section className="py-12 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-6">Related Calculators</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/lpg-gas-rate-calculator" className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors">
              <h3 className="font-semibold text-white mb-2">LPG Gas Rate Calculator</h3>
              <p className="text-slate-400 text-sm">For propane and butane appliances</p>
            </Link>
            <Link href="/gas-bill-calculator" className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors">
              <h3 className="font-semibold text-white mb-2">Gas Bill Calculator</h3>
              <p className="text-slate-400 text-sm">Estimate monthly gas costs</p>
            </Link>
            <Link href="/gas-cost-calculator" className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors">
              <h3 className="font-semibold text-white mb-2">Appliance Cost Calculator</h3>
              <p className="text-slate-400 text-sm">Running costs for any appliance</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
