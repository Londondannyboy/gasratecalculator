import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gas Bill Calculator UK | Free Gas Usage & Cost Estimator 2026 | Gas Rate Calculator UK',
  description: 'Free UK gas bill calculator - estimate your monthly, quarterly or annual gas bill based on kWh usage, unit rates and standing charges. Includes 5% VAT calculation. Updated for January 2026 Ofgem Energy Price Cap rates. Calculate your gas bill with our free UK tool.',
  keywords: [
    'gas bill calculator',
    'gas bill calculator uk',
    'uk gas bill calculator',
    'estimate gas bill uk',
    'gas cost calculator uk',
    'energy bill calculator uk',
    'gas usage calculator uk',
    'uk gas bill estimator',
    'calculate gas bill from meter reading',
    'gas bill calculator with standing charge',
    'quarterly gas bill calculator uk',
    'monthly gas bill calculator',
    'annual gas bill uk',
    'ofgem price cap calculator',
    'gas standing charge calculator'
  ],
  alternates: {
    canonical: 'https://gasratecalculator.quest/gas-bill-calculator',
  },
  openGraph: {
    title: 'Gas Bill Calculator UK | Free Gas Usage & Cost Estimator 2026',
    description: 'Free UK gas bill calculator - estimate your monthly, quarterly or annual gas bill. Updated for January 2026 Ofgem Price Cap rates. Includes standing charges and 5% VAT.',
    url: 'https://gasratecalculator.quest/gas-bill-calculator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
