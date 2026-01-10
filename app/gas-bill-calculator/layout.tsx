import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gas Bill Calculator UK | Estimate Your Gas Bill',
  description: 'Free gas bill calculator for UK households. Estimate your monthly, quarterly or annual gas bill based on usage, unit rates, and standing charges. Includes VAT calculation.',
  keywords: [
    'gas bill calculator',
    'gas bill calculator uk',
    'estimate gas bill',
    'gas cost calculator',
    'energy bill calculator',
    'gas usage calculator'
  ],
  alternates: {
    canonical: 'https://gasratecalculator.quest/gas-bill-calculator',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
