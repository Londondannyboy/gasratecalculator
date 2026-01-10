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

      {/* Coming Soon Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-12 bg-slate-800/50 rounded-2xl border border-slate-700/50">
            <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17c0 5.523 3.692 10 8 10c1.906 0 3.674-.586 5-1.566 1.326.98 3.094 1.566 5 1.566 4.308 0 8-4.477 8-10 0-6.002-4.5-10.747-10-10.253z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Articles Coming Soon</h2>
            <p className="text-slate-400 mb-8">
              We're working on comprehensive guides covering gas rate calculations,
              Gas Safe compliance, appliance commissioning, and more.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
            >
              Use the Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Topics Preview */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            Topics We'll Cover
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <h3 className="text-lg font-semibold text-orange-400 mb-2">Gas Rate Calculations</h3>
              <p className="text-slate-400 text-sm">
                Step-by-step guides on calculating appliance heat input using different methods
              </p>
            </div>
            <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <h3 className="text-lg font-semibold text-orange-400 mb-2">Calorific Values</h3>
              <p className="text-slate-400 text-sm">
                Understanding regional CV variations and how they affect calculations
              </p>
            </div>
            <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <h3 className="text-lg font-semibold text-orange-400 mb-2">Appliance Commissioning</h3>
              <p className="text-slate-400 text-sm">
                Best practices for commissioning and testing gas appliances
              </p>
            </div>
            <div className="p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <h3 className="text-lg font-semibold text-orange-400 mb-2">Fault Diagnosis</h3>
              <p className="text-slate-400 text-sm">
                Using gas rate calculations to identify common appliance faults
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
