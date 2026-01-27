# Gas Rate Calculator Quest V2 - Development Guide

## Project Overview

**Site:** gasratecalculator.quest
**Status:** V2 rebuild in progress (CopilotKit + Pydantic AI + Hume Voice)
**Purpose:** Free gas rate calculator for UK gas engineers to calculate appliance heat input

---

## What This Tool Does

The Gas Rate Calculator helps UK Gas Safe registered engineers:
- Calculate heat input (kW) from meter readings
- Support both metric (m³) and imperial (cu ft) measurements
- Built-in timer for precise timing
- Calculate gross and net kW values
- Essential for commissioning, servicing, and fault-finding

---

## V2 Features

### Core Calculator - COMPLETE
- [x] Metric mode: Start/end meter readings + time
- [x] Imperial mode: Test dial size + revolution time
- [x] Built-in stopwatch timer
- [x] Gross/Net kW output
- [x] Voice-enabled calculations (Hume EVI)
- [x] AI assistant for gas engineering questions (CopilotKit)

### AI Agent Capabilities - COMPLETE
- [x] Explain calculations step-by-step
- [x] Answer gas engineering questions
- [x] Provide Gas Safe compliance guidance
- [x] Help with fault diagnosis
- [x] Reference gas regulations

### Additional Pages - COMPLETE
- [x] /gas-bill-calculator - Monthly bill estimation
- [x] /gas-cost-calculator - Appliance running costs

### Authentication - COMPLETE
- [x] Neon Auth integration with NeonAuthUIProvider
- [x] Voice assistant gated behind login
- [x] Sign in/Sign up in Navigation
- [x] UserButton for logged-in users

---

## Tech Stack

### Frontend (Vercel)
- Next.js 15 with App Router
- React 19
- Tailwind CSS 4
- @copilotkit/react-core, @copilotkit/react-ui
- @humeai/voice-react

### Backend (Railway)
- Python 3.11+
- Pydantic AI with AG-UI protocol
- Google Gemini 2.0 Flash
- FastAPI + Uvicorn

---

## Key Formulas

### Metric Calculation
```
Volume (m³) = End Reading - Start Reading
Flow Rate (m³/h) = Volume × (3600 / seconds)
Heat Input (kW gross) = Flow Rate × Calorific Value (39.5 MJ/m³) / 3.6
Heat Input (kW net) = kW gross / 1.11
```

### Imperial Calculation
```
Volume (cu ft) = Test dial size (0.5, 1, 2, or 5 cu ft)
Flow Rate (cu ft/h) = Volume × (3600 / seconds)
Flow Rate (m³/h) = cu ft/h × 0.0283168
Heat Input = same as metric from m³/h
```

---

## Agent Personality: "Gas Safe Assistant"

The agent should:
- Be professional and technically accurate
- Reference Gas Safe regulations where appropriate
- Explain calculations clearly
- Use proper UK gas engineering terminology
- Never provide advice that could be unsafe

### Qualifying Questions
1. What type of appliance are you testing?
2. Are you using a metric or imperial meter?
3. What's the appliance rated input (from data plate)?
4. Is this commissioning, servicing, or fault-finding?

---

## Environment Variables

### Vercel (Production)
```env
AGENT_URL=https://gas-rate-agent-production.up.railway.app/agui/
HUME_API_KEY=...
HUME_SECRET_KEY=...
NEXT_PUBLIC_HUME_CONFIG_ID=...
```

### Railway (Agent)
```env
GOOGLE_API_KEY=...
```

---

## Commands

### Development
```bash
npm run dev                    # Frontend
cd agent && uv run uvicorn src.agent:app --reload --port 8000  # Agent
```

### Deploy
```bash
git push origin main           # Frontend auto-deploys via Vercel
cd agent && railway up         # Agent manual deploy
```

---

## SEO Keywords to Target

- gas rate calculator
- gas rate calculator uk
- heat input calculator
- gas appliance calculator
- gas engineer calculator
- gas safe calculator
- kW calculator gas
- gas consumption calculator
- test dial calculator
- burner pressure calculator

---

## Reference: V1 Calculator Logic

From the original gasratecalculator.quest (in dashboard repo):

```typescript
// Metric calculation
const volume = endReading - startReading
const flowRateM3H = volume * (3600 / seconds)
const grossKW = flowRateM3H * 39.5 / 3.6
const netKW = grossKW / 1.11

// Imperial calculation
const flowRateCuFtH = dialSize * (3600 / seconds)
const flowRateM3HFromImperial = flowRateCuFtH * 0.0283168
// Then same kW calculation
```

---

## Pages Structure

| Page | URL | Status |
|------|-----|--------|
| Homepage | `/` | Done |
| Gas Bill Calculator | `/gas-bill-calculator` | Done |
| Gas Cost Calculator | `/gas-cost-calculator` | Done |
| Articles | `/articles` | Done |
| Contact | `/contact` | Done |
| Privacy | `/privacy` | Done |
| Terms | `/terms` | Done |
| Auth Pages | `/auth/[path]` | Done |

---

## Components to Create

### GasRateCalculator
Main calculator with:
- Mode toggle (Metric/Imperial)
- Input fields for readings
- Timer component
- Results display (Gross kW, Net kW, m³/h)

### PageHero
Reusable hero with:
- Title and subtitle
- HeroVoice widget (Hume)
- Gas-themed gradient (orange/amber)

---

## Branding

### Colors
- Primary: Orange (#F97316) - Gas flame
- Secondary: Amber (#F59E0B)
- Background: Slate (#1E293B)
- Accent: White

### Logo
Flame icon with "Gas Rate Calculator" text

---

## Migration from V1

V1 source is in git history at commit `e9471de6` in the dashboard repo:
- `apps/gas-rate-calculator/src/app/page.tsx`
- `apps/gas-rate-calculator/src/components/GasRateCalculator.tsx`

Key files to extract:
1. Calculator component logic
2. Timer functionality
3. SEO content and FAQs

---

## PRD Documentation

### Gas Bill Calculator UK - SEO Optimisation (January 2026)

**Target Keyword:** `gas bill calculator uk`

**Page URL:** `/gas-bill-calculator`

#### SEO Requirements Implemented

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| H1 contains full keyword | ✅ | "Gas Bill Calculator UK: Free Estimator Tool" |
| Keywords in H2/H3 headings | ✅ | All section headings include "UK", "gas bill", "calculator" |
| Strong/bold tags for keywords | ✅ | `<strong>` used throughout for gas, bill, calculator, uk |
| Meta title optimised | ✅ | "Gas Bill Calculator UK \| Free Gas Usage & Cost Estimator 2026" |
| Meta description optimised | ✅ | 160 chars with keywords and January 2026 reference |
| Table of contents | ✅ | Smooth scroll navigation with 7 sections |
| High-authority external links | ✅ | Ofgem, Citizens Advice, Gas Safe, GOV.UK, Energy Saving Trust, MoneySavingExpert |
| FAQ Schema (JSON-LD) | ✅ | 10 FAQs with FAQPage structured data |
| WebApplication Schema | ✅ | Added for rich snippets |
| Word count increased | ✅ | From ~150 to ~2000+ words |
| Data tables | ✅ | UK Energy Price Cap History table |
| Images with alt text | ✅ | Gas meter illustration with keyword-rich aria-label |

#### Beta/Disclaimer Requirements

| Requirement | Status | Location |
|-------------|--------|----------|
| Beta disclaimer banner | ✅ | Amber banner at page top |
| Professional disclaimer | ✅ | Red warning box below calculator |
| Gas Safe engineer warning | ✅ | Links to Gas Safe Register |
| Ofgem regulatory reference | ✅ | Links to official Ofgem guidance |
| Footer beta notice | ✅ | Final section before footer |

#### Page Sections

1. **Beta Disclaimer Banner** - Warning about estimation-only tool
2. **Hero Section** - H1, intro text, gas meter illustration
3. **Table of Contents** - Quick navigation with anchors
4. **Calculator Section** - kWh input, period selector, rates, results
5. **Professional Disclaimer** - Warning to consult professionals
6. **How UK Gas Bills Work** - 4-step process explanation
7. **UK Gas Bill Formula** - Technical formula display
8. **UK Energy Price Cap Explained** - Rate cards + history table
9. **Average UK Gas Bills** - Property size usage reference
10. **Regional Variations** - UK regional differences
11. **10 Tips to Reduce Your UK Gas Bill** - Energy saving advice
12. **FAQ Section** - 10 expandable FAQs with schema
13. **Helpful Resources** - 6 high-authority external links
14. **CTA for Engineers** - Link to main Gas Rate Calculator
15. **Final Beta Notice** - Footer disclaimer

#### UK Energy Price Cap Data (January 2026)

| Rate Type | Value |
|-----------|-------|
| Gas Unit Rate | 6.24p/kWh |
| Standing Charge | 31.43p/day |
| VAT Rate | 5% |

#### External Links (High Authority)

- Ofgem (UK Energy Regulator): https://www.ofgem.gov.uk/
- Citizens Advice Energy: https://www.citizensadvice.org.uk/consumer/energy/
- Gas Safe Register: https://www.gassaferegister.co.uk/
- Energy Saving Trust: https://www.energysavingtrust.org.uk/
- GOV.UK Energy Efficiency: https://www.gov.uk/improve-energy-efficiency
- MoneySavingExpert Energy: https://www.moneysavingexpert.com/utilities/

#### Files Modified

- `app/gas-bill-calculator/page.tsx` - Main page component
- `app/gas-bill-calculator/layout.tsx` - SEO metadata
- `next.config.ts` - Added Unsplash remote image support

---

### Unsplash Integration (January 2026)

**API Credentials:**
- Application ID: 846504
- Access Key: `c_y_xJaw-p05vjKOKC5kdiZGw21trx9DbRYjWx-9AVY`
- Secret Key: (stored securely)

**Configuration:**
Added Unsplash to `next.config.ts` remotePatterns for image optimization:
```typescript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' }
  ]
}
```

#### Images Used on Gas Bill Calculator Page (13 Total)

| Image ID | Usage | Alt Text |
|----------|-------|----------|
| xxgNqAtIJ0s | Hero background | Gas flame burning on boiler |
| 1709880945165 | Calculator section | Calculator for UK gas bill |
| 1700047614820 | Calculator background | British pound notes |
| RFAHj4tI37Y | Price cap section | Smart thermostat |
| ljnWGE2IlEo | Average bills section | Cozy UK home with fireplace |
| kAWXKpctuSY | Tips section | Woman by radiator |
| PxBNsfu7FNs | FAQ section | Single gas flame |
| qLlBswuGQJ0 | Resources section | British town |
| VNnQf784q7s | Step 1 card | Gas meter |
| UWznDqb7S9w | Step 2 card | British coins |
| 2EgYygoXNgw | Step 3 card | UK house at night |
| blhlWKx28gA | Regional section | White radiator |
| okngblc5z0k | Step 4 card | Window (insulation) |

**Implementation Pattern:**
- All section backgrounds use gradient overlays for text readability
- Card images use opacity transitions on hover
- Proper alt text with keywords for SEO
- Next.js Image component with `fill` and `sizes` for optimization
- Unsplash attribution in footer

---

### Future SEO Tasks

- [ ] Optimise `/gas-cost-calculator` for "gas cost calculator uk"
- [ ] Optimise `/` homepage for "gas rate calculator uk"
- [ ] Optimise `/imperial-gas-rate-calculator` for "imperial gas calculator"
- [ ] Optimise `/lpg-gas-rate-calculator` for "lpg gas calculator uk"
- [ ] Add more internal linking between calculator pages
- [ ] Consider adding comparison tool between calculators
- [ ] Add Unsplash images to other calculator pages
