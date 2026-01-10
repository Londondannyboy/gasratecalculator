import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gas Cost Calculator UK | Appliance Running Costs',
  description: 'Free gas cost calculator for UK households. Calculate the running cost of your boiler, gas fire, hob and other gas appliances. Find out daily, weekly, monthly and annual costs.',
  keywords: [
    'gas cost calculator',
    'gas appliance running cost',
    'boiler running cost',
    'gas fire cost',
    'gas hob cost',
    'energy cost calculator uk'
  ],
  alternates: {
    canonical: 'https://gasratecalculator.quest/gas-cost-calculator',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
