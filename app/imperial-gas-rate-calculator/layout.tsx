import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Imperial Gas Rate Calculator UK | Test Dial Calculator for Cu Ft Meters',
  description: 'Free imperial gas rate calculator for UK gas engineers. Calculate appliance heat input (kW) from test dial measurements on imperial (cubic feet) gas meters. Supports 0.5, 1, 2, and 5 cu ft test dials.',
  keywords: [
    'imperial gas rate calculator',
    'imperial meter gas rate',
    'test dial calculator',
    'cubic feet gas calculator',
    'gas rate imperial meter',
    'cu ft gas rate',
    'gas rate calculation imperial',
    'imperial gas meter calculator',
    'how to gas rate imperial meter',
    'gas rate calculator uk imperial'
  ],
  alternates: {
    canonical: 'https://gasratecalculator.quest/imperial-gas-rate-calculator',
  },
  openGraph: {
    title: 'Imperial Gas Rate Calculator UK | Test Dial Calculator',
    description: 'Calculate gas appliance heat input from test dial measurements on imperial gas meters. Free tool for UK Gas Safe engineers.',
    url: 'https://gasratecalculator.quest/imperial-gas-rate-calculator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
