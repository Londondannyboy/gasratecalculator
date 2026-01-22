interface GasMeterIllustrationProps {
  className?: string
}

export function GasMeterIllustration({ className = '' }: GasMeterIllustrationProps) {
  return (
    <figure className={className}>
      <svg
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="gas-meter-title gas-meter-desc"
        className="w-full h-auto"
      >
        <title id="gas-meter-title">UK Gas Meter Diagram</title>
        <desc id="gas-meter-desc">Illustration of a metric gas meter showing cubic metre readings used for gas rate calculation in the UK</desc>

        {/* Meter body */}
        <rect x="20" y="20" width="160" height="120" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />

        {/* Display panel */}
        <rect x="35" y="35" width="130" height="50" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" />

        {/* Digital readout */}
        <text x="50" y="68" fill="#22c55e" fontFamily="monospace" fontSize="24" fontWeight="bold">
          12345.678
        </text>

        {/* Unit label */}
        <text x="145" y="68" fill="#64748b" fontFamily="sans-serif" fontSize="10">
          m³
        </text>

        {/* Meter label */}
        <text x="100" y="105" fill="#94a3b8" fontFamily="sans-serif" fontSize="11" textAnchor="middle">
          METRIC GAS METER
        </text>

        {/* Barcode area */}
        <rect x="40" y="115" width="60" height="15" rx="2" fill="#334155" />
        <g fill="#94a3b8">
          <rect x="44" y="118" width="2" height="9" />
          <rect x="48" y="118" width="1" height="9" />
          <rect x="51" y="118" width="3" height="9" />
          <rect x="56" y="118" width="1" height="9" />
          <rect x="59" y="118" width="2" height="9" />
          <rect x="63" y="118" width="1" height="9" />
          <rect x="66" y="118" width="3" height="9" />
          <rect x="71" y="118" width="2" height="9" />
          <rect x="75" y="118" width="1" height="9" />
          <rect x="78" y="118" width="2" height="9" />
          <rect x="82" y="118" width="1" height="9" />
          <rect x="85" y="118" width="3" height="9" />
          <rect x="90" y="118" width="1" height="9" />
          <rect x="93" y="118" width="2" height="9" />
        </g>

        {/* Gas pipe connections */}
        <rect x="0" y="60" width="20" height="16" rx="2" fill="#475569" />
        <rect x="180" y="60" width="20" height="16" rx="2" fill="#475569" />

        {/* Status LED */}
        <circle cx="160" y="45" r="4" fill="#22c55e">
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
      <figcaption className="sr-only">
        UK metric gas meter displaying reading in cubic metres (m³) - used for gas rate calculation
      </figcaption>
    </figure>
  )
}
