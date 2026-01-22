import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gas Bill Calculator UK | Free Gas Usage & Cost Estimator 2025',
  description: 'Free UK gas bill calculator - estimate your monthly, quarterly or annual gas bill based on kWh usage, unit rates and standing charges. Includes 5% VAT calculation. Updated for January 2025 price cap rates.',
  keywords: [
    'gas bill calculator',
    'gas bill calculator uk',
    'estimate gas bill',
    'gas cost calculator',
    'energy bill calculator',
    'gas usage calculator',
    'uk gas bill estimator',
    'calculate gas bill from meter reading',
    'gas bill calculator with standing charge',
    'quarterly gas bill calculator'
  ],
  alternates: {
    canonical: 'https://gasratecalculator.quest/gas-bill-calculator',
  },
  openGraph: {
    title: 'Gas Bill Calculator UK | Free Gas Usage & Cost Estimator',
    description: 'Estimate your UK gas bill based on kWh usage, unit rates and standing charges. Includes VAT calculation.',
    url: 'https://gasratecalculator.quest/gas-bill-calculator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
