# Gas Rate Calculator Quest V2 - Implementation Plan

## Project Goal
Create v2 of gasratecalculator.quest using:
- CopilotKit + Pydantic AI (chat agent)
- Hume EVI (voice agent)
- Next.js 15 with App Router
- Railway for Python agent deployment

---

## Implementation Progress (Updated January 2025)

### Phase 1: Clone & Transform - COMPLETE

| Task | Status | Notes |
|------|--------|-------|
| Clone yogateacherinsurance.quest template | Done | Used as base structure |
| Update package.json | Done | gas-rate-calculator-quest v2.0.0 |
| Remove yoga pages | Done | Deleted 18+ yoga-specific pages |
| Create GasRateCalculator component | Done | Metric/Imperial modes, timer |
| Rewrite homepage | Done | Calculator, FAQs, How It Works |
| Update Navigation | Done | Orange/amber gas branding |
| Update Footer | Done | Calculator links, Gas Safe links |

### Phase 2: CopilotKit + Pydantic AI - COMPLETE

| Task | Status | Notes |
|------|--------|-------|
| Update providers.tsx | Done | gas_agent, "Gas Safe Assistant" |
| Update API route | Done | Points to gas_agent |
| Create agent.py | Done | 5 gas-specific tools |
| Deploy to Railway | Done | gas-rate-agent-production.up.railway.app |

**Agent Tools Implemented:**
- `get_appliance_info(appliance_type)` - Boiler, fire, hob specs
- `diagnose_issue(reading_type, deviation)` - High/low troubleshooting
- `get_regulations(topic)` - Gas Safe, IGEM, tolerance info
- `explain_calculation(method)` - Step-by-step formulas
- `calculate_gas_rate(...)` - Compute kW from inputs

### Phase 3: Hume Voice - COMPLETE

| Task | Status | Notes |
|------|--------|-------|
| Install @humeai/voice-react | Done | |
| Create HeroVoice component | Done | Pulsating orb, no auth required |
| Gas engineering system prompt | Done | Professional, safety-focused |
| Add to homepage | Done | Centered in hero section |

### Phase 4: Content & SEO - IN PROGRESS

| Task | Status | Notes |
|------|--------|-------|
| Update robots.ts | Done | gasratecalculator.quest domain |
| Update sitemap.ts | Done | Gas-focused URLs |
| Update privacy/terms/contact | Done | Gas Rate Calculator branding |
| Update manifest.ts | Done | Orange theme color |
| Update icons | Done | Flame icon, orange gradient |
| Create /gas-bill-calculator | Pending | Cost estimation tool |
| Create /gas-cost-calculator | Pending | Usage cost calculator |

---

## Environment Variables

### Vercel (Production)
```env
AGENT_URL=https://gas-rate-agent-production.up.railway.app/agui/
DATABASE_URL=...
NEON_AUTH_BASE_URL=...
HUME_API_KEY=...
HUME_SECRET_KEY=...
NEXT_PUBLIC_HUME_CONFIG_ID=...
```

### Railway (Agent)
```env
GOOGLE_API_KEY=...
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PRODUCTION SETUP                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌──────────────┐                    ┌──────────────┐      │
│   │   VERCEL     │                    │   RAILWAY    │      │
│   │  (Next.js)   │                    │  (Python)    │      │
│   │              │                    │              │      │
│   │ gasrate      │ ─── AG-UI ──────► │  Pydantic    │      │
│   │ calculator   │                    │  AI Agent    │      │
│   │ .quest       │                    │              │      │
│   │              │                    │ • 5 Tools    │      │
│   │ • Frontend   │                    │ • Gemini 2.0 │      │
│   │ • CopilotKit │                    │   Flash      │      │
│   │ • HeroVoice  │                    │              │      │
│   └──────────────┘                    └──────────────┘      │
│          │                                                   │
│          │                                                   │
│          ▼                                                   │
│   ┌──────────────┐                                          │
│   │   HUME AI    │                                          │
│   │   (Voice)    │                                          │
│   │              │                                          │
│   │ System prompt│                                          │
│   │ for gas eng  │                                          │
│   └──────────────┘                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
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

## Next Steps

1. Create `/gas-bill-calculator` page - estimate monthly gas bills
2. Create `/gas-cost-calculator` page - calculate appliance running costs
3. Add cookie consent component
4. Add disclaimer banner
5. Test voice assistant functionality
6. Run full deployment

---

## Files Modified

### Frontend
- `package.json` - Updated name and version
- `components/GasRateCalculator.tsx` - Main calculator
- `components/Navigation.tsx` - Gas branding
- `components/Footer.tsx` - Calculator links
- `components/providers.tsx` - CopilotKit setup
- `components/HeroVoice.tsx` - Voice widget
- `app/page.tsx` - Homepage
- `app/robots.ts` - SEO
- `app/sitemap.ts` - SEO
- `app/manifest.ts` - PWA
- `app/icon.tsx` - Favicon
- `app/apple-icon.tsx` - Apple icon
- `app/contact/page.tsx` - Contact page
- `app/privacy/page.tsx` - Privacy policy
- `app/terms/page.tsx` - Terms of service
- `app/articles/layout.tsx` - Articles metadata

### Agent
- `agent/src/agent.py` - Gas engineering agent
- `agent/pyproject.toml` - Dependencies

---

## Reference
- See CLAUDE.md for detailed documentation
- V1 source in dashboard repo at commit `e9471de6`
