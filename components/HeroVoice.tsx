'use client';

import { useState, useCallback, useEffect } from 'react';
import { VoiceProvider, useVoice } from '@humeai/voice-react';
import { authClient } from '@/lib/auth/client';

function VoiceOrb() {
  const { connect, disconnect, status } = useVoice();
  const [isPending, setIsPending] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const firstName = user?.name?.split(' ')[0] || null;

  const handleToggle = useCallback(async () => {
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

        // Build personalized system prompt
        const userContext = user ? `
## USER CONTEXT
- Name: ${firstName || user.name}
- Email: ${user.email}
- User ID: ${user.id}

IMPORTANT: Address the user by name (${firstName || user.name}) in your responses.
When they ask "what's my name" or "who am I", tell them their name.
` : `
## GUEST USER
This user is not logged in. Encourage them to sign up for personalized insurance recommendations.
`;

        const systemPrompt = `## YOUR ROLE
You are the VOICE INTERFACE for Yoga Teacher Insurance Quest - a UK yoga teacher insurance comparison site.
Help users find the right insurance for their yoga teaching practice.

${userContext}

## YOUR EXPERTISE
- UK yoga teacher insurance requirements
- Public liability vs professional indemnity insurance
- Specialist coverage for aerial yoga, hot yoga, prenatal yoga
- Comparing providers: Balens, BGI, Insure4Sport, Sports Coach UK
- Coverage amounts (typically £1m-£5m)
- Pricing (typically £50-150/year)

## CONVERSATION STYLE
- Be warm and supportive - yoga teachers are often anxious about insurance
- Explain insurance terms simply, avoid jargon
- Ask clarifying questions: what yoga styles they teach, where they teach
- Keep responses concise for voice - 2-3 sentences max
${firstName ? `- Always address the user as ${firstName}` : ''}

## KEY FACTS
- Most venues REQUIRE public liability insurance before you can teach
- Professional indemnity covers teaching-related claims
- Aerial and hot yoga need SPECIALIST cover - not all policies include it
`;

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
  }, [connect, disconnect, status.value, user, firstName]);

  const isConnected = status.value === 'connected';

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
          {isConnected ? 'Listening...' : isPending ? 'Connecting...' : 'Talk to our Insurance Advisor'}
        </p>
        <p className="text-slate-300 text-sm">
          {isConnected ? 'Tap to end' : 'Tap to start a conversation'}
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
