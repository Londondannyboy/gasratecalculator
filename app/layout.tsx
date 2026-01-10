import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { CookieConsent } from "@/components/CookieConsent"
import { Providers } from "@/components/providers"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Gas Rate Calculator UK | Free Heat Input Calculator for Gas Engineers",
    template: "%s | Gas Rate Calculator UK"
  },
  description: "Free UK gas rate calculator for gas engineers. Calculate gas appliance heat input in kW from meter readings or test dial. Essential tool for Gas Safe registered engineers.",
  keywords: [
    "gas rate calculator",
    "gas rate calculator uk",
    "heat input calculator",
    "gas appliance calculator",
    "gas engineer calculator",
    "gas safe calculator",
    "kW calculator",
    "gas consumption calculator",
    "test dial calculator",
    "burner pressure calculator",
    "gas flow rate calculator"
  ],
  authors: [{ name: "Gas Rate Calculator UK" }],
  creator: "Gas Rate Calculator UK",
  publisher: "Gas Rate Calculator UK",
  metadataBase: new URL("https://gasratecalculator.quest"),
  alternates: {
    canonical: "https://gasratecalculator.quest",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://gasratecalculator.quest",
    siteName: "Gas Rate Calculator UK",
    title: "Gas Rate Calculator UK | Free Heat Input Calculator",
    description: "Free UK gas rate calculator for gas engineers. Calculate appliance heat input in kW from meter readings or test dial.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gas Rate Calculator UK | Free Heat Input Calculator",
    description: "Free gas rate calculator for UK gas engineers. Calculate heat input in kW.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    title: "Gas Rate Calculator UK",
    capable: true,
    statusBarStyle: "black-translucent",
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://gasratecalculator.quest/#website",
  name: "Gas Rate Calculator UK",
  alternateName: ["Heat Input Calculator", "Gas Engineer Calculator", "Gas Safe Calculator"],
  url: "https://gasratecalculator.quest",
  description: "Free UK gas rate calculator for Gas Safe registered engineers. Calculate appliance heat input in kW from meter readings or test dial measurements.",
  inLanguage: "en-GB",
  publisher: {
    "@type": "Organization",
    "@id": "https://gasratecalculator.quest/#organization",
    name: "Gas Rate Calculator UK",
    url: "https://gasratecalculator.quest",
    logo: {
      "@type": "ImageObject",
      "@id": "https://gasratecalculator.quest/#logo",
      url: "https://gasratecalculator.quest/icon.svg",
      contentUrl: "https://gasratecalculator.quest/icon.svg",
      width: 512,
      height: 512,
      caption: "Gas Rate Calculator UK"
    }
  }
}

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://gasratecalculator.quest/#app",
  name: "Gas Rate Calculator UK",
  alternateName: "Heat Input Calculator",
  description: "Free online gas rate calculator for UK gas engineers. Calculate gas appliance heat input in kW from meter readings or test dial. Supports metric and imperial measurements.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "GBP"
  },
  featureList: [
    "Metric (m³) and Imperial (cu ft) modes",
    "Built-in stopwatch timer",
    "Gross and Net kW calculation",
    "Gas Safe compliant formulas"
  ]
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Gas Rate Calculator",
      item: "https://gasratecalculator.quest"
    }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-slate-900 text-white`}>
        <Providers>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  )
}
