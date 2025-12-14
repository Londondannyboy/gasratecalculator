import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Yoga Teacher Insurance UK | Top Providers",
  description: "Best yoga teacher insurance in the UK. Compare top-rated providers and find the best coverage.",
  alternates: {
    canonical: "https://yogateacherinsurance.quest/best-yoga-teacher-insurance-uk",
  },
}

export default function Page() {
  return (
    <div className="min-h-screen py-16 px-4">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">Best Yoga Teacher Insurance UK</h1>
        <p className="text-lg text-slate-400 mb-8">Find the best yoga teacher insurance from top-rated UK providers. We review and compare leading options.</p>
        
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
