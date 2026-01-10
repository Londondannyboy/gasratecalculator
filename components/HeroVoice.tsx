'use client';

import { useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { VoiceProvider, useVoice } from '@humeai/voice-react';
import { authClient } from '@/lib/auth/client';
import Link from 'next/link';

// Get page context from pathname
function getPageContext(pathname: string): string {
  if (pathname.includes('aerial')) {
    return `The user is on the AERIAL YOGA INSURANCE page. Focus on aerial yoga topics:
- Hammock/silk/swing equipment coverage
- Fall injury risks (higher than standard yoga)
- Rigging and installation liability
- Premium typically 20-40% higher than standard
- Not all insurers cover aerial - recommend Balens or BGI`;
  }
  if (pathname.includes('hot-yoga')) {
    return `The user is on the HOT YOGA INSURANCE page. Focus on hot yoga topics:
- Heat-related illness risks (dehydration, heat exhaustion)
- Higher liability due to heated environment
- Bikram-specific requirements
- Need explicit hot yoga coverage - not all policies include it
- Premium typically 10-20% higher than standard`;
  }
  if (pathname.includes('meditation')) {
    return `The user is on the MEDITATION TEACHER INSURANCE page. Focus on:
- Mindfulness and breathwork coverage
- Lower physical risk than yoga
- Psychological/emotional claim considerations
- Often included in yoga policies
- Good for yoga nidra, pranayama, guided meditation`;
  }
  if (pathname.includes('studio')) {
    return `The user is on the YOGA STUDIO INSURANCE page. Focus on business coverage:
- Public liability for premises
- Employer's liability (required if you have staff)
- Property and contents insurance
- Business interruption cover
- Equipment coverage`;
  }
  if (pathname.includes('public-liability')) {
    return `The user is on the PUBLIC LIABILITY page. Focus on:
- What public liability covers (injuries, property damage)
- Typical coverage amounts (£1m-£10m)
- Studio/venue requirements (usually £5m minimum)
- Difference from professional indemnity`;
  }
  if (pathname.includes('profile')) {
    return `The user is on their PROFILE page. Help them:
- Complete their yoga teaching profile
- Understand why this info helps get accurate quotes
- Explain how their choices affect insurance needs`;
  }
  // Default homepage context
  return `The user is on the HOMEPAGE. Help them:
- Understand yoga teacher insurance basics
- Compare UK providers (Balens, BGI, Insure4Sport)
- Get started with a quote`;
}

function VoiceOrb() {
  const { connect, disconnect, status } = useVoice();
  const [isPending, setIsPending] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const firstName = user?.name?.split(' ')[0] || null;
  const pathname = usePathname();

  const handleToggle = useCallback(async () => {
    // Require login
    if (!user) {
      return; // Should not happen as button is hidden for guests
    }

    if (status.value === 'connected') {
      disconnect();
    } else {
      setIsPending(true);
      try {
        const res = await fetch('/api/hume-token', { method: 'POST' });
        const { accessToken } = await res.json();

        const configId = process.env.NEXT_PUBLIC_HUME_CONFIG_ID;
        if (!configId || !accessToken) {
          console.error('Missing Hume config or token');
          return;
        }

        // Get page-specific context
        const pageContext = getPageContext(pathname);

        // Build comprehensive system prompt
        const systemPrompt = `## CRITICAL IDENTITY
You are the VOICE ASSISTANT for Yoga Teacher Insurance Quest - a UK yoga teacher insurance COMPARISON WEBSITE.
You help yoga teachers find and compare insurance policies. You are NOT an elf, NOT a fantasy character, NOT a game assistant.
You are a helpful, knowledgeable yoga insurance advisor with a calm, supportive personality.

## USER INFORMATION
- Name: ${firstName || user.name}
- Email: ${user.email}
- User ID: ${user.id}

IMPORTANT: Address the user by their first name (${firstName || user.name}) in your responses.

## CURRENT PAGE CONTEXT
${pageContext}

## YOUR EXPERTISE (YOGA INSURANCE ONLY)
- UK yoga teacher insurance requirements
- Public liability insurance (£1m-£10m coverage)
- Professional indemnity insurance
- Specialist coverage: aerial yoga, hot yoga, prenatal yoga
- UK Providers: Balens, BGI, Insure4Sport, Sports Coach UK
- Typical pricing: £50-180/year depending on style and coverage
- Yoga Alliance requirements

## CONVERSATION RULES
1. ONLY discuss yoga teacher insurance topics
2. Be warm, supportive, and calm (like a yoga teacher)
3. Keep responses SHORT for voice (2-3 sentences max)
4. Ask clarifying questions about their teaching (styles, locations, experience)
5. Reference the current page context when relevant
6. If asked about non-insurance topics, politely redirect to insurance

## KEY FACTS TO MENTION
- Most venues REQUIRE insurance before you can teach
- Public liability covers student injuries and property damage
- Professional indemnity covers claims about your instruction
- Aerial and hot yoga need SPECIALIST cover - not all policies include it
- Always recommend getting quotes from 2-3 providers

Remember: You are a yoga insurance advisor. Stay focused on insurance.`;

        await connect({
          auth: { type: 'accessToken', value: accessToken },
          configId: configId,
          sessionSettings: {
            type: 'session_settings',
            systemPrompt: systemPrompt,
          }
        });
      } catch (e) {
        console.error('Voice connect error:', e);
      } finally {
        setIsPending(false);
      }
    }
  }, [connect, disconnect, status.value, user, firstName, pathname]);

  const isConnected = status.value === 'connected';

  // If not logged in, show sign-in prompt
  if (!user) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shadow-xl">
          <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-white font-medium text-lg">Voice Advisor</p>
          <Link
            href="/auth/sign-in"
            className="text-blue-400 hover:text-blue-300 text-sm underline"
          >
            Sign in to use voice
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleToggle}
        disabled={isPending}
        className={`
          relative w-24 h-24 rounded-full flex items-center justify-center
          transition-all duration-300 shadow-2xl
          ${isConnected
            ? 'bg-gradient-to-br from-green-400 to-emerald-600'
            : isPending
              ? 'bg-gradient-to-br from-yellow-400 to-amber-600'
              : 'bg-gradient-to-br from-blue-400 to-blue-600 animate-pulse'
          }
        `}
      >
        {/* Pulsing rings */}
        {!isConnected && !isPending && (
          <>
            <span className="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-20" />
            <span className="absolute inset-[-8px] rounded-full animate-pulse bg-blue-400/10" />
          </>
        )}

        {isConnected && (
          <span className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-30" />
        )}

        {/* Icon */}
        {isConnected ? (
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-8 bg-white rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-6 bg-white rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
            <span className="w-1.5 h-9 bg-white rounded-full animate-pulse" style={{ animationDelay: '450ms' }} />
            <span className="w-1.5 h-5 bg-white rounded-full animate-pulse" style={{ animationDelay: '600ms' }} />
          </div>
        ) : isPending ? (
          <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        )}
      </button>

      <div className="text-center">
        <p className="text-white font-medium text-lg">
          {isConnected ? 'Listening...' : isPending ? 'Connecting...' : `Hi ${firstName}! Tap to talk`}
        </p>
        <p className="text-slate-300 text-sm">
          {isConnected ? 'Tap to end' : 'Ask about yoga insurance'}
        </p>
      </div>
    </div>
  );
}

export function HeroVoice() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-full bg-blue-500/50 animate-pulse" />
        <div className="text-center">
          <p className="text-white font-medium text-lg">Talk to our Insurance Advisor</p>
          <p className="text-slate-300 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <VoiceProvider onError={(err) => console.error('Hume error:', err)}>
      <VoiceOrb />
    </VoiceProvider>
  );
}
