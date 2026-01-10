import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Gas Rate Calculator UK',
  description: 'Terms of Service for Gas Rate Calculator UK. Please read our terms and conditions before using our website and calculator tools.',
  alternates: {
    canonical: 'https://gasratecalculator.quest/terms',
  },
}

export default function Page() {
  return (
    <div className="min-h-screen py-16 px-4">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <p className="text-slate-400 mb-6">Last updated: January 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
          <p className="text-slate-400">By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
          <p className="text-slate-400">Permission is granted to use the Gas Rate Calculator and related tools for personal and professional use. This is the grant of a license, not a transfer of title, and under this license you may not: modify the materials, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information obtained from our website.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">3. Professional Use Disclaimer</h2>
          <p className="text-slate-400">This calculator is provided as a reference tool for Gas Safe registered engineers. Users are responsible for verifying all calculations and ensuring compliance with Gas Safe regulations. The results should be used in conjunction with professional training and manufacturer guidelines.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">4. Limitations</h2>
          <p className="text-slate-400">In no event shall Gas Rate Calculator UK or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
          <p className="text-slate-400">If you have any questions about these Terms of Service, please contact us at: support@gasratecalculator.quest</p>
        </section>
      </article>
    </div>
  )
}
