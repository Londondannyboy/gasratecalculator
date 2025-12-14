import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "How Much Does Yoga Teacher Insurance Cost?",
  description: "Yoga teacher insurance cost guide 2025. Find pricing from £15/month for comprehensive coverage.",
  alternates: {
    canonical: "https://yogateacherinsurance.quest/how-much-yoga-teacher-insurance-cost",
  },
}

export default function Page() {
  return (
    <div className="min-h-screen py-16 px-4">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">How Much Does Yoga Teacher Insurance Cost?</h1>
        <p className="text-lg text-slate-400 mb-8">Yoga teacher insurance typically costs £15-£38/month. Our pricing guide breaks down costs by experience and coverage type.</p>
        
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 mb-8">
          <Link href="/#calculator" className="inline-block px-8 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors">Get Quote Now</Link>
        </div>

        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-white mb-4">Learn More</h2>
          <p className="text-slate-400">Browse our comprehensive guides to find the insurance coverage that best fits your needs. Compare providers, learn about coverage types, and get affordable quotes from specialist UK insurers.</p>
        </div>
      </article>
    </div>
  )
}
