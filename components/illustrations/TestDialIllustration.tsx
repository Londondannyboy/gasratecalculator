interface TestDialIllustrationProps {
  className?: string
}

export function TestDialIllustration({ className = '' }: TestDialIllustrationProps) {
  return (
    <figure className={className}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="test-dial-title test-dial-desc"
        className="w-full h-auto"
      >
        <title id="test-dial-title">Imperial Gas Meter Test Dial</title>
        <desc id="test-dial-desc">Illustration of a test dial gauge on an imperial gas meter measuring cubic feet for gas rate calculation</desc>

        {/* Outer ring */}
        <circle cx="100" cy="100" r="90" fill="#1e293b" stroke="#475569" strokeWidth="3" />

        {/* Inner dial face */}
        <circle cx="100" cy="100" r="75" fill="#0f172a" stroke="#334155" strokeWidth="2" />

        {/* Dial markings */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
          const angle = (i * 36 - 90) * (Math.PI / 180)
          const x1 = 100 + 60 * Math.cos(angle)
          const y1 = 100 + 60 * Math.sin(angle)
          const x2 = 100 + 70 * Math.cos(angle)
          const y2 = 100 + 70 * Math.sin(angle)
          const textX = 100 + 50 * Math.cos(angle)
          const textY = 100 + 50 * Math.sin(angle)
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth="2" />
              <text
                x={textX}
                y={textY}
                fill="#94a3b8"
                fontSize="12"
                fontFamily="sans-serif"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {i}
              </text>
            </g>
          )
        })}

        {/* Minor tick marks */}
        {[...Array(50)].map((_, i) => {
          if (i % 5 === 0) return null
          const angle = (i * 7.2 - 90) * (Math.PI / 180)
          const x1 = 100 + 65 * Math.cos(angle)
          const y1 = 100 + 65 * Math.sin(angle)
          const x2 = 100 + 70 * Math.cos(angle)
          const y2 = 100 + 70 * Math.sin(angle)
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#475569" strokeWidth="1" />
          )
        })}

        {/* Center hub */}
        <circle cx="100" cy="100" r="12" fill="#334155" stroke="#475569" strokeWidth="2" />
        <circle cx="100" cy="100" r="6" fill="#f97316" />

        {/* Needle */}
        <g transform="rotate(45, 100, 100)">
          <polygon points="100,30 96,100 104,100" fill="#f97316" />
          <polygon points="100,100 96,120 104,120" fill="#475569" />
        </g>

        {/* Label */}
        <text x="100" y="145" fill="#64748b" fontSize="10" fontFamily="sans-serif" textAnchor="middle">
          1 CU FT
        </text>
        <text x="100" y="158" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
          TEST DIAL
        </text>

        {/* Animated rotation indicator */}
        <circle cx="100" cy="100" r="78" fill="none" stroke="#f97316" strokeWidth="2" strokeDasharray="8 20" opacity="0.3">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 100 100"
            to="360 100 100"
            dur="10s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <figcaption className="sr-only">
        Imperial gas meter test dial measuring 1 cubic foot per revolution - used for gas rate calculation on older UK meters
      </figcaption>
    </figure>
  )
}
