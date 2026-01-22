import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gas Cost Calculator UK | Appliance Running Cost Calculator 2025',
  description: 'Free UK gas cost calculator - calculate the running cost of your boiler, gas fire, hob and other appliances. Uses January 2025 price cap rates (6.24p/kWh). Find hourly, daily, weekly, monthly and annual costs.',
  keywords: [
    'gas cost calculator',
    'gas cost calculator uk',
    'gas appliance running cost',
    'boiler running cost calculator',
    'gas fire running cost',
    'gas hob running cost',
    'energy cost calculator uk',
    'how much does it cost to run a boiler',
    'gas appliance cost per hour',
    'gas heating cost calculator'
  ],
  alternates: {
    canonical: 'https://gasratecalculator.quest/gas-cost-calculator',
  },
  openGraph: {
    title: 'Gas Cost Calculator UK | Appliance Running Costs',
    description: 'Calculate the running cost of any gas appliance - boilers, fires, hobs and more. Uses UK Energy Price Cap rates.',
    url: 'https://gasratecalculator.quest/gas-cost-calculator',
    type: 'website',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
