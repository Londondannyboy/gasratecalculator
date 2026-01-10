# Yoga Teacher Insurance Quest - Development Guide

## Project Overview

**Site:** yogateacherinsurance.quest
**Status:** AI agent integration COMPLETE (CopilotKit + Neon Auth + Hume Voice + Gamification)
**SEO Win:** Page 1 UK for "aerial yoga teacher insurance" + "hot yoga insurance"

---

## Current Implementation Status (January 2026)

### COMPLETED
- [x] **Phase 1: CopilotKit + Pydantic AI** - Chat agent deployed to Railway
- [x] **Phase 2: Neon Auth** - User authentication working (Google OAuth)
- [x] **Phase 3: Hume EVI** - Voice widget in hero section
- [x] **Gamified Profile Page** - XP system, levels, yoga journey progression
- [x] **Zep Integration** - API routes for memory persistence
- [x] **New SEO Pages** - Meditation, Studio, Public Liability insurance pages
- [x] **Agent Prompt Update** - 5 qualifying questions before recommendations
- [x] **All 2025 → 2026** - Updated year references across all pages

### CONFIGURED IN VERCEL
- `AGENT_URL` - https://yoga-insurance-agent-production.up.railway.app/agui/
- `HUME_API_KEY` - Configured
- `HUME_SECRET_KEY` - Configured
- `NEXT_PUBLIC_HUME_CONFIG_ID` - 8e6530df-c020-4b82-bfd3-62617a100b17
- `ZEP_API_KEY` - Add for memory persistence

---

## New Pages (January 2026)

| Page | URL | Purpose |
|------|-----|---------|
| Meditation Teacher | `/meditation-teacher-insurance` | Mindfulness/breathwork coverage |
| Yoga Studio | `/yoga-studio-insurance` | Business coverage for studio owners |
| Public Liability | `/public-liability-insurance-yoga-teachers` | Dedicated PL coverage page |

All pages have:
- PageHero component with HeroVoice widget
- Proper SEO metadata
- FAQ schema for Google
- Internal linking

---

## Gamified Profile Page

The profile page (`/profile`) includes:

### XP System
- Yoga styles: +10 XP each
- Locations: +15 XP each
- Experience: 5-75 XP based on years
- Qualifications: 20-75 XP each
- Student count: 10-50 XP
- Has insurance: +20 XP bonus

### Levels & Titles
| Level | XP Required | Title |
|-------|-------------|-------|
| 1 | 0-49 | Yoga Beginner |
| 2 | 50-99 | Emerging Teacher |
| 4 | 150-199 | Growing Instructor |
| 6 | 250-299 | Experienced Yogi |
| 8 | 350-399 | Enlightened Teacher |
| 10+ | 450+ | Yoga Master |

### Features
- Progress circle showing completion %
- Confetti celebration on profile complete
- Animated purple/blue background
- Next step prompts
- Saves to Zep for AI memory

---

## Agent Configuration

### System Prompt (Namaste Personality)
The agent has a zen-like personality and asks 5 qualifying questions before recommending providers:

1. **Styles** - What yoga styles do you teach?
2. **Locations** - Where do you teach?
3. **Experience** - How long have you been teaching?
4. **Students** - How many students per class?
5. **Current cover** - Do you have existing insurance?

### Tools Available
| Tool | Purpose |
|------|---------|
| `compare_providers` | Compare UK yoga insurance providers |
| `explain_coverage` | Explain coverage types |
| `get_style_requirements` | Style-specific requirements |
| `get_provider_info` | Provider details |
| `get_quick_quote_checklist` | Quote preparation |
| `get_my_profile` | User's profile/preferences |

---

## Tech Stack

### Frontend (Vercel)
- Next.js 15 with App Router
- React 19
- Tailwind CSS 4
- @copilotkit/react-core, @copilotkit/react-ui
- @neondatabase/auth
- @humeai/voice-react
- @getzep/zep-cloud

### Backend (Railway)
- Python 3.11+
- Pydantic AI with AG-UI protocol
- Google Gemini 2.0 Flash
- FastAPI + Uvicorn

### Database (Neon)
- PostgreSQL with Neon Auth tables

---

## Key Components

### PageHero (`components/PageHero.tsx`)
Reusable hero section with HeroVoice widget:
```tsx
<PageHero
  title="Hot Yoga Insurance UK"
  titleAccent="Specialized Thermal Coverage"
  subtitle="Comprehensive coverage..."
  badgeText="Heated Environment Specialist"
  badgeColor="orange"
/>
```

### AerialYogaHero (`components/AerialYogaHero.tsx`)
Custom hero for aerial page with video banner.

### VideoBanner (`components/VideoBanner.tsx`)
YouTube video embed with AI chat CTA.

---

## Environment Variables

### Vercel (Production)
```env
DATABASE_URL=postgresql://...
AGENT_URL=https://yoga-insurance-agent-production.up.railway.app/agui/
NEON_AUTH_BASE_URL=https://...neon.tech
HUME_API_KEY=...
HUME_SECRET_KEY=...
NEXT_PUBLIC_HUME_CONFIG_ID=8e6530df-c020-4b82-bfd3-62617a100b17
ZEP_API_KEY=...
```

### Railway (Agent)
```env
DATABASE_URL=postgresql://...
GOOGLE_API_KEY=...
```

---

## Hume Voice Configuration

**Config ID:** 8e6530df-c020-4b82-bfd3-62617a100b17
**CLM Endpoint:** `https://yoga-insurance-agent-production.up.railway.app/chat/completions`

To use CLM (Custom Language Model):
1. In Hume dashboard, edit your config
2. Set Custom Language Model URL to the CLM endpoint
3. This makes Hume voice use the same Pydantic AI brain

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

## SEO Keywords Covered

From Google Search Console data:
- ✅ aerial yoga insurance
- ✅ yoga teacher insurance (uk)
- ✅ hot yoga insurance
- ✅ meditation teacher insurance (NEW)
- ✅ yoga studio insurance (NEW)
- ✅ public liability insurance for yoga teachers (NEW)
- ✅ yoga instructor insurance
- ✅ yoga insurance comparison
- ✅ cheapest yoga teacher insurance (homepage)
- ✅ affordable yoga insurance (homepage)

---

## Reference Projects
- **esportsjobs.quest-v2** - Gamification patterns, Neon Auth
- **copilotkit-demo** - CopilotKit integration patterns
- **gtm-quest-v2** - Latest Neon patterns
