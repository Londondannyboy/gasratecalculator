import Link from "next/link"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Yoga Teacher Training Insurance | Trainee & Student Coverage',
  description: 'Yoga teacher training insurance for trainees and students completing certification. Specialist coverage for yoga training programs. Affordable rates starting from £10/month.',
  alternates: {
    canonical: 'https://yogateacherinsurance.quest/yoga-teacher-training-insurance',
  },
}

export default function Page() {
  return (
    <div className="min-h-screen py-16 px-4">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Yoga Teacher Training Insurance
        </h1>

        <p className="text-lg text-slate-400 mb-8">
          Professional indemnity insurance is essential for yoga trainees and students completing their certification. Many yoga teacher training programs require trainees to carry insurance while teaching as part of their learning experience. Get affordable coverage specifically designed for trainees entering the profession.
        </p>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Get Training Insurance Quotes</h2>
          <p className="text-slate-300 mb-4">
            Use our quote calculator to get personalized estimates for trainee yoga teacher insurance.
          </p>
          <Link href="/#calculator" className="inline-block px-8 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors">
            Get Trainee Quote
          </Link>
        </div>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-white mb-4">Why Trainees Need Insurance</h2>
          <p className="text-slate-400 mb-4">
            Training insurance protects you and your students during your learning journey. Many yoga training programs require trainees to have professional indemnity insurance in place before they can teach as part of their course requirements.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-bold text-blue-400 mb-3">Course Requirements</h3>
              <p className="text-slate-400 text-sm">
                Most yoga teacher training programs require professional indemnity insurance as a prerequisite for teaching practice sessions and practicum hours.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-bold text-blue-400 mb-3">Student Protection</h3>
              <p className="text-slate-400 text-sm">
                Insurance protects your trainees and students from any potential incidents during practice classes while you're learning to teach.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-bold text-blue-400 mb-3">Professional Start</h3>
              <p className="text-slate-400 text-sm">
                Having insurance from the start of your teaching career demonstrates professionalism and commitment to your students' safety.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-lg font-bold text-blue-400 mb-3">Affordable Rates</h3>
              <p className="text-slate-400 text-sm">
                Trainee insurance is typically cheaper than experienced teacher insurance. Get comprehensive coverage at trainee-friendly prices.
              </p>
            </div>
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-white mb-4">Coverage for Trainees</h2>
          <p className="text-slate-400 mb-4">
            Trainee yoga teacher insurance typically includes:
          </p>
          <ul className="text-slate-400 space-y-2 mb-4">
            <li>• Professional indemnity coverage for negligence claims</li>
            <li>• Public liability protection for student injury</li>
            <li>• Legal defense and compensation costs</li>
            <li>• Coverage during practice teaching hours</li>
            <li>• Continuation coverage after qualification</li>
          </ul>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-bold text-white mb-4">Start Your Teaching Career Right</h2>
          <p className="text-slate-400 mb-4">
            Getting insurance as a trainee yoga teacher is a smart investment in your career. It satisfies course requirements, protects your students, and demonstrates professionalism from day one.
          </p>
          <Link href="/compare-yoga-teacher-insurance-uk" className="inline-block px-6 py-2 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors">
            Compare Training Insurance Quotes
          </Link>
        </section>
      </article>
    </div>
  )
}
