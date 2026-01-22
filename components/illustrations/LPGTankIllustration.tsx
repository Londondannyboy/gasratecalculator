interface LPGTankIllustrationProps {
  className?: string
  type?: 'propane' | 'butane'
}

export function LPGTankIllustration({ className = '', type = 'propane' }: LPGTankIllustrationProps) {
  const isPropane = type === 'propane'
  const primaryColor = isPropane ? '#3b82f6' : '#06b6d4'
  const secondaryColor = isPropane ? '#1d4ed8' : '#0891b2'

  return (
    <figure className={className}>
      <svg
        viewBox="0 0 120 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="lpg-tank-title lpg-tank-desc"
        className="w-full h-auto"
      >
        <title id="lpg-tank-title">{isPropane ? 'Propane' : 'Butane'} LPG Gas Cylinder</title>
        <desc id="lpg-tank-desc">
          Illustration of a {isPropane ? 'propane' : 'butane'} LPG gas cylinder used for calculating LPG gas rate with calorific value of {isPropane ? '93.2' : '121.8'} MJ/m³
        </desc>

        {/* Tank body */}
        <ellipse cx="60" cy="170" rx="45" ry="15" fill={secondaryColor} />
        <rect x="15" y="50" width="90" height="120" fill={primaryColor} />
        <ellipse cx="60" cy="50" rx="45" ry="15" fill={primaryColor} />
        <ellipse cx="60" cy="50" rx="45" ry="15" fill={secondaryColor} opacity="0.3" />

        {/* Tank highlight */}
        <rect x="20" y="55" width="15" height="110" rx="7" fill="white" opacity="0.1" />

        {/* Valve area */}
        <rect x="50" y="30" width="20" height="25" fill="#475569" />
        <rect x="45" y="25" width="30" height="8" rx="2" fill="#64748b" />

        {/* Valve wheel */}
        <ellipse cx="60" cy="18" rx="12" ry="4" fill="#334155" />
        <rect x="57" y="8" width="6" height="12" fill="#475569" />
        <ellipse cx="60" cy="8" rx="10" ry="3" fill="#64748b" />

        {/* Label area */}
        <rect x="25" y="80" width="70" height="60" rx="4" fill="white" opacity="0.9" />

        {/* Label text */}
        <text x="60" y="100" fill={secondaryColor} fontSize="14" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
          {isPropane ? 'PROPANE' : 'BUTANE'}
        </text>
        <text x="60" y="118" fill="#475569" fontSize="10" fontFamily="sans-serif" textAnchor="middle">
          LPG
        </text>
        <text x="60" y="132" fill="#64748b" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
          {isPropane ? '93.2' : '121.8'} MJ/m³
        </text>

        {/* Safety ring */}
        <ellipse cx="60" cy="45" rx="40" ry="3" fill="none" stroke={secondaryColor} strokeWidth="3" />

        {/* Handle */}
        <path d="M30 45 Q30 35 40 35 L80 35 Q90 35 90 45" fill="none" stroke="#475569" strokeWidth="4" strokeLinecap="round" />

        {/* Flame icon */}
        <g transform="translate(48, 145)">
          <path
            d="M12 2C8 6 6 10 6 14C6 18.4 9.6 22 14 22C14 22 12 18 14 14C16 18 14 22 14 22C18.4 22 22 18.4 22 14C22 10 18 4 14 2C14 2 14 6 12 2Z"
            fill="#f97316"
            transform="scale(0.6)"
          />
        </g>
      </svg>
      <figcaption className="sr-only">
        {isPropane ? 'Propane' : 'Butane'} LPG gas cylinder with calorific value {isPropane ? '93.2' : '121.8'} MJ/m³ - used for LPG gas rate calculation
      </figcaption>
    </figure>
  )
}
