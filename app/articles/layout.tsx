import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gas Engineering Guides & Articles | Gas Rate Calculator UK",
  description: "In-depth guides and articles about gas rate calculations, appliance testing, Gas Safe compliance, and troubleshooting tips for UK gas engineers.",
  keywords: [
    "gas rate calculation guide",
    "gas engineer articles",
    "gas appliance testing",
    "heat input calculation",
    "Gas Safe compliance",
    "boiler commissioning guide"
  ],
  robots: {
    index: true,
    follow: true,
  },
}

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
