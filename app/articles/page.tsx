import Link from 'next/link'

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Gas Engineering{' '}
            <span className="block bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mt-2">
              Guides & Resources
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-4">
            Expert resources for UK Gas Safe registered engineers
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold text-slate-400 mb-6">Featured Guide</h2>
          <Link
            href="/articles/how-to-calculate-gas-rate"
            className="block p-8 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-2xl border border-orange-500/20 hover:border-orange-500/40 transition-colors group"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-grow">
                <span className="text-xs text-orange-400 font-medium uppercase tracking-wide">Gas Rate Calculations</span>
                <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-orange-400 transition-colors">
                  How to Calculate Gas Rate
                </h3>
                <p className="text-slate-400 mt-2">
                  Complete step-by-step guide to calculating gas appliance heat input (kW) using metric or imperial methods. Includes formulas, worked examples, and common mistakes to avoid.
                </p>
                <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
                  <span>8 min read</span>
                  <span>|</span>
                  <span>Updated January 2025</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center text-orange-400 font-medium group-hover:translate-x-1 transition-transform">
                  Read guide
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Coming Soon Topics */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-4">
            More Guides Coming Soon
          </h2>
          <p className="text-slate-400 text-center mb-12">
            We&apos;re working on comprehensive guides covering more gas engineering topics
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <h3 className="text-lg font-semibold text-slate-500 mb-2">Understanding Calorific Values</h3>
              <p className="text-slate-500 text-sm">
                Regional CV variations and how they affect gas rate calculations
              </p>
              <span className="inline-block mt-3 text-xs text-slate-600 bg-slate-800 px-2 py-1 rounded">Coming Soon</span>
            </div>
            <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <h3 className="text-lg font-semibold text-slate-500 mb-2">Boiler Commissioning Guide</h3>
              <p className="text-slate-500 text-sm">
                Best practices for commissioning and testing gas boilers
              </p>
              <span className="inline-block mt-3 text-xs text-slate-600 bg-slate-800 px-2 py-1 rounded">Coming Soon</span>
            </div>
            <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <h3 className="text-lg font-semibold text-slate-500 mb-2">Fault Diagnosis with Gas Rate</h3>
              <p className="text-slate-500 text-sm">
                Using gas rate calculations to identify common appliance faults
              </p>
              <span className="inline-block mt-3 text-xs text-slate-600 bg-slate-800 px-2 py-1 rounded">Coming Soon</span>
            </div>
            <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <h3 className="text-lg font-semibold text-slate-500 mb-2">LPG Installation Guide</h3>
              <p className="text-slate-500 text-sm">
                Working with propane and butane in domestic settings
              </p>
              <span className="inline-block mt-3 text-xs text-slate-600 bg-slate-800 px-2 py-1 rounded">Coming Soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need to Calculate Now?</h2>
          <p className="text-slate-400 mb-8">
            Use our free online calculators for instant gas rate calculations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
            >
              Gas Rate Calculator
            </Link>
            <Link
              href="/imperial-gas-rate-calculator"
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
            >
              Imperial Calculator
            </Link>
            <Link
              href="/lpg-gas-rate-calculator"
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
            >
              LPG Calculator
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
