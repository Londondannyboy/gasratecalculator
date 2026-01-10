import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Gas Rate Calculator UK',
  description: 'Privacy policy for Gas Rate Calculator UK. How we collect, use, and protect your personal data.',
  alternates: {
    canonical: 'https://gasratecalculator.quest/privacy',
  },
}

export default function Page() {
  return (
    <div className="min-h-screen py-16 px-4">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <p className="text-slate-400 mb-6">Last updated: January 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
          <p className="text-slate-400 mb-4">
            Gas Rate Calculator UK operates the gasratecalculator.quest website. We are committed to protecting your privacy and ensuring you have a positive experience on our site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
          <p className="text-slate-400 mb-4">We may collect information you provide directly, information collected automatically through cookies and analytics, and calculator usage data to improve our services.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Information</h2>
          <p className="text-slate-400">We use collected information to provide gas rate calculator functionality, improve our website and services, and comply with legal obligations.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">4. Data Protection</h2>
          <p className="text-slate-400">We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
          <p className="text-slate-400">If you have questions about this Privacy Policy, please contact us at: support@gasratecalculator.quest</p>
        </section>
      </article>
    </div>
  )
}
