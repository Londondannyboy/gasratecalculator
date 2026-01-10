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

### Additional Pages - IN PROGRESS
- [ ] /gas-bill-calculator - Monthly bill estimation
- [ ] /gas-cost-calculator - Appliance running costs

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
| Gas Bill Calculator | `/gas-bill-calculator` | Pending |
| Gas Cost Calculator | `/gas-cost-calculator` | Pending |
| Articles | `/articles` | Done |
| Contact | `/contact` | Done |
| Privacy | `/privacy` | Done |
| Terms | `/terms` | Done |

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
