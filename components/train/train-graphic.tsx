// SVG locomotive + three ICF-style coaches, Indian Railways styling.
// Engine: WAP-class flat-front, red body with yellow nose flashes,
// smokestack + billowing exhaust puffs, pulsing headlight glow.
// Coaches: ICF blue with yellow upper-stripe, three large windows each
// framing a single chair silhouette, "VELVET LINE" stencil, end door.
// All idle animations are SMIL <animate> so the component stays RSC.
// The 1.5px bob is applied by the outer wrapper in RouteMap.

const coachOffsets = [61, 135, 209] as const

function Coach() {
  return (
    <>
      {/* Roof shadow */}
      <rect x="0" y="18" width="72" height="2" fill="#0F1F4D" />
      {/* Blue body */}
      <rect x="0" y="20" width="72" height="22" fill="#1E3A8A" />
      {/* Yellow upper stripe */}
      <rect x="0" y="22" width="72" height="2.5" fill="#FFD500" />
      {/* Three windows, each framing a single chair silhouette */}
      {[4, 24, 44].map((wx) => {
        const cx = wx + 8
        return (
          <g key={wx}>
            <rect x={wx} y={25} width={16} height={8} fill="#0A1530" />
            <rect x={cx - 1} y={26.5} width={2} height={5.5} fill="#FFD500" />
            <rect x={cx - 2.5} y={30.5} width={5} height={1.2} fill="#FFD500" />
          </g>
        )
      })}
      {/* Stencil */}
      <text
        x="32"
        y="40"
        fontFamily="monospace"
        fontSize="3"
        fill="#FFD500"
        textAnchor="middle"
        fontWeight="bold"
        letterSpacing="0.5"
      >
        VELVET LINE
      </text>
      {/* End door */}
      <rect x="62" y="26" width="6" height="14" fill="#000000" />
      <rect x="64.5" y="32" width="1" height="2" fill="#FFD500" />
    </>
  )
}

export function TrainGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 -42 290 98"
      width="145"
      height="49"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
      className={className}
    >
      {/* ────── ENGINE (WAP-class loco silhouette) ────── */}
      <g>
        {/* Smokestack */}
        <rect x="44" y="10" width="4" height="4" fill="#0A0A0A" />
        {/* Exhaust puffs — three large billows, rise + grow + fade */}
        <g>
          <circle cx="46" cy="10" r="3" fill="#A8B2C0" opacity="0">
            <animate
              attributeName="cy"
              values="10;-30"
              dur="2.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              values="46;42"
              dur="2.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="3;11"
              dur="2.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.8;0"
              dur="2.8s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="46" cy="10" r="3.5" fill="#8A95A5" opacity="0">
            <animate
              attributeName="cy"
              values="10;-24"
              dur="2.8s"
              begin="0.9s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              values="46;50"
              dur="2.8s"
              begin="0.9s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="3.5;12"
              dur="2.8s"
              begin="0.9s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.75;0"
              dur="2.8s"
              begin="0.9s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="46" cy="10" r="3" fill="#9AA4B2" opacity="0">
            <animate
              attributeName="cy"
              values="10;-20"
              dur="2.8s"
              begin="1.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              values="46;45"
              dur="2.8s"
              begin="1.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="3;10"
              dur="2.8s"
              begin="1.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.7;0"
              dur="2.8s"
              begin="1.8s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
        {/* Roof / hood */}
        <rect x="6" y="14" width="48" height="6" fill="#8B0000" />
        {/* Main red body */}
        <rect x="2" y="20" width="56" height="22" fill="#E60012" />
        {/* Yellow nose flash, upper + lower */}
        <polygon points="2,20 14,20 8,26 2,26" fill="#FFD500" />
        <polygon points="2,36 8,36 14,42 2,42" fill="#FFD500" />
        {/* Cab roof rim */}
        <rect x="32" y="14" width="22" height="2" fill="#FFD500" />
        {/* Driver windscreen */}
        <rect x="34" y="16" width="18" height="6" fill="#000000" />
        <line
          x1="43"
          y1="16"
          x2="43"
          y2="22"
          stroke="#2A3340"
          strokeWidth="0.4"
        />
        {/* Twin headlights (hard core) */}
        <circle cx="4" cy="24" r="1.4" fill="#FFF8E7" />
        <circle cx="4" cy="38" r="1.4" fill="#FFF8E7" />
        {/* Soft headlight glow — pulses */}
        <circle cx="4" cy="24" r="2.6" fill="#FFF8E7">
          <animate
            attributeName="opacity"
            values="0.15;0.45;0.15"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="4" cy="38" r="2.6" fill="#FFF8E7">
          <animate
            attributeName="opacity"
            values="0.15;0.45;0.15"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Devanagari "रेल" on the engine flank */}
        <text
          x="50"
          y="38"
          fontFamily="serif"
          fontSize="4"
          fill="#FFD500"
          textAnchor="end"
          fontWeight="bold"
        >
          रेल
        </text>
        {/* Coupler */}
        <rect x="58" y="30" width="3" height="2.5" fill="#2A3340" />
      </g>

      {/* ────── COACHES (3 × ICF, VELVET LINE branded) ────── */}
      {coachOffsets.map((offset) => (
        <g key={offset} transform={`translate(${offset} 0)`}>
          <Coach />
        </g>
      ))}

      {/* ────── BOGIES / WHEELS ────── */}
      <g>
        {/* Engine — 3 axles */}
        <circle
          cx="14"
          cy="46"
          r="3.5"
          fill="#0A0A0A"
          stroke="#2A3340"
          strokeWidth="0.4"
        />
        <circle
          cx="26"
          cy="46"
          r="3.5"
          fill="#0A0A0A"
          stroke="#2A3340"
          strokeWidth="0.4"
        />
        <circle
          cx="46"
          cy="46"
          r="3.5"
          fill="#0A0A0A"
          stroke="#2A3340"
          strokeWidth="0.4"
        />
        {/* Each coach — 2 bogies */}
        {coachOffsets.map((offset) => (
          <g key={offset}>
            <circle
              cx={11 + offset}
              cy={46}
              r={3}
              fill="#0A0A0A"
              stroke="#2A3340"
              strokeWidth="0.4"
            />
            <circle
              cx={63 + offset}
              cy={46}
              r={3}
              fill="#0A0A0A"
              stroke="#2A3340"
              strokeWidth="0.4"
            />
          </g>
        ))}
      </g>

      {/* ────── RAIL SHADOW under the wheels ────── */}
      <rect x="2" y="50" width="280" height="1" fill="#2A3340" opacity="0.5" />
    </svg>
  )
}
