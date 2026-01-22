import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LPG Gas Rate Calculator UK | Propane & Butane Heat Input Calculator',
  description: 'Free LPG gas rate calculator for UK gas engineers. Calculate heat input (kW) for propane and butane appliances. Includes correct calorific values for LPG installations - 93.2 MJ/m³ for propane, 121.8 MJ/m³ for butane.',
  keywords: [
    'lpg gas rate calculator',
    'lpg calculator',
    'propane gas rate calculator',
    'butane gas rate calculator',
    'lpg kw calculator',
    'lpg heat input calculator',
    'lpg gas consumption calculator',
    'lpg appliance calculator',
    'lpg gas rate calculation',
    'calor gas rate calculator'
  ],
  alternates: {
    canonical: 'https://gasratecalculator.quest/lpg-gas-rate-calculator',
  },
  openGraph: {
    title: 'LPG Gas Rate Calculator UK | Propane & Butane Calculator',
    description: 'Calculate LPG appliance heat input for propane and butane installations. Free tool for UK Gas Safe engineers.',
    url: 'https://gasratecalculator.quest/lpg-gas-rate-calculator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
