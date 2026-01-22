import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Calculate Gas Rate | Step-by-Step Guide for Gas Engineers',
  description: 'Learn how to calculate gas rate (heat input) for any gas appliance. Complete guide with formulas, worked examples, and tips for metric and imperial meters. Essential knowledge for Gas Safe engineers.',
  keywords: [
    'how to calculate gas rate',
    'gas rate formula',
    'gas rate calculation formula',
    'how to do a gas rate',
    'how to gas rate a boiler',
    'gas rate calculation',
    'heat input formula',
    'gas rate metric',
    'gas rate imperial',
    'calculate kw from gas meter',
    'gas appliance heat input calculation'
  ],
  alternates: {
    canonical: 'https://gasratecalculator.quest/articles/how-to-calculate-gas-rate',
  },
  openGraph: {
    title: 'How to Calculate Gas Rate | Complete Guide',
    description: 'Step-by-step guide to calculating gas appliance heat input in kW. Includes formulas for metric and imperial meters.',
    url: 'https://gasratecalculator.quest/articles/how-to-calculate-gas-rate',
    type: 'article',
    publishedTime: '2025-01-22',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
