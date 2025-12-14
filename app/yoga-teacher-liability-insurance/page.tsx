import Link from "next/link"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Yoga Teacher Liability Insurance UK | Professional & Public Liability Cover',
  description: 'Yoga teacher liability insurance covering professional indemnity and public liability. Protect yourself and your students. Get quotes for comprehensive coverage from specialist UK providers.',
  alternates: {
    canonical: 'https://yogateacherinsurance.quest/yoga-teacher-liability-insurance',
  },
}

export default function Page() {
  return (
    <div className="min-h-screen py-16 px-4">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Yoga Teacher Liability Insurance UK
        </h1>

        <p className="text-lg text-slate-400 mb-8">
          Professional liability insurance protects yoga teachers from claims of negligence or poor instruction. Combined with public liability coverage for student injury and property damage, comprehensive liability insurance is essential for any yoga professional.
        </p>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Get Your Quote Today</h2>
          <p className="text-slate-300 mb-4">
            Use our quote calculator to get personalized insurance estimates for liability coverage based on your teaching situation.
          </p>
          <Link href="/#calculator" className="inline-block px-8 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors">
            Get Quote Estimate
          </Link>
        </div>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-white mb-4">Professional Indemnity vs Public Liability</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold text-blue-400 mb-3">Professional Indemnity</h3>
              <p className="text-slate-400 mb-4">
                Covers claims that your teaching advice or instruction caused injury due to negligence or poor practice.
              </p>
              <ul className="text-sm text-slate-400 space-y-2">
                <li>• Negligence claims</li>
                <li>• Legal defense costs</li>
                <li>• Compensation claims</li>
                <li>• Professional breach claims</li>
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold text-blue-400 mb-3">Public Liability</h3>
              <p className="text-slate-400 mb-4">
                Covers injury to students or damage to property during your classes.
              </p>
              <ul className="text-sm text-slate-400 space-y-2">
                <li>• Student injury claims</li>
                <li>• Property damage</li>
                <li>• Medical expenses</li>
                <li>• Legal defense</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-white mb-4">Why Liability Insurance Matters</h2>
          <p className="text-slate-400 mb-4">
            Yoga teacher liability insurance protects you against the financial and legal consequences of student claims. Even with careful teaching, accidents can happen, and claims can arise unexpectedly.
          </p>
          <p className="text-slate-400 mb-4">
            Insurance covers legal fees, compensation claims, and defense costs - expenses that could otherwise bankrupt your teaching practice. Most yoga studios require teachers to carry liability insurance.
          </p>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-white mb-4">Compare Providers</h2>
          <p className="text-slate-400 mb-4">
            Get quotes from specialist yoga teacher insurance providers. Compare professional indemnity and public liability coverage from Yoga Alliance, Balens, and other UK specialists.
          </p>
          <Link href="/compare-yoga-teacher-insurance-uk" className="inline-block px-6 py-2 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors">
            Compare Providers
          </Link>
        </section>
      </article>
    </div>
  )
}
