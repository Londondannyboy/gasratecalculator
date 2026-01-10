'use client';

import { useState, useCallback, useEffect } from 'react';
import { VoiceProvider, useVoice } from '@humeai/voice-react';

function VoiceOrb() {
  const { connect, disconnect, status } = useVoice();
  const [isPending, setIsPending] = useState(false);

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

        // Gas engineering system prompt
        const systemPrompt = `## IDENTITY
You are the VOICE ASSISTANT for Gas Rate Calculator UK - a free tool for Gas Safe registered engineers.
You help gas engineers with calculations, troubleshooting, and compliance questions.
You are professional, technically accurate, and safety-conscious.

## YOUR EXPERTISE
- Gas rate calculations (metric and imperial methods)
- Heat input verification for commissioning
- Appliance troubleshooting (boilers, fires, hobs, ovens)
- Gas Safe regulations and compliance
- Calorific values and correction factors
- Acceptable tolerances (±5% of data plate rating)

## KEY FORMULAS
Metric: Volume (m³) × Correction (1.02264) × (3600/seconds) × 39.5 ÷ 3.6 = Gross kW
Net kW = Gross kW ÷ 1.11
Imperial: Convert cu ft to m³ first (× 0.0283168)

## CONVERSATION RULES
1. Keep responses SHORT for voice (2-3 sentences max)
2. Be professional and technically accurate
3. Always prioritize Gas Safe compliance
4. If readings are outside ±5% tolerance, advise investigation
5. Remind users to isolate other appliances during testing

## TYPICAL VALUES
- Combi boiler: 24-40 kW
- System boiler: 12-30 kW
- Gas fire: 3-7 kW
- Gas hob: 7-12 kW total
- Standard UK calorific value: 39.5 MJ/m³

Remember: You're helping professionals do their job safely.`;

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
  }, [connect, disconnect, status.value]);

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
              : 'bg-gradient-to-br from-orange-400 to-orange-600 animate-pulse'
          }
        `}
      >
        {/* Pulsing rings */}
        {!isConnected && !isPending && (
          <>
            <span className="absolute inset-0 rounded-full animate-ping bg-orange-400 opacity-20" />
            <span className="absolute inset-[-8px] rounded-full animate-pulse bg-orange-400/10" />
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
          {isConnected ? 'Listening...' : isPending ? 'Connecting...' : 'Voice Assistant'}
        </p>
        <p className="text-slate-300 text-sm">
          {isConnected ? 'Tap to end' : 'Tap to ask about gas calculations'}
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
        <div className="w-24 h-24 rounded-full bg-orange-500/50 animate-pulse" />
        <div className="text-center">
          <p className="text-white font-medium text-lg">Voice Assistant</p>
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
