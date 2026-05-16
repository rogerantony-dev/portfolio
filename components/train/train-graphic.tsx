// SVG locomotive + 2 coaches, styled after Indian Railways ICF stock.
// Engine: WAP-style flat-front, red body with yellow nose flashes.
// Coaches: ICF blue with yellow upper-stripe, row of small windows,
// "VELVET LINE" / coach-class stencil, end-of-coach doors.
// Idle life: exhaust puffs from the smokestack, headlight pulse — all
// via SMIL <animate> so the component stays RSC. The outer wrapper in
// RouteMap adds a 1px vertical bob (Motion, reduced-motion-aware).
//
// viewBox extends above 0 to give exhaust room to rise.
export function TrainGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 -10 220 66"
      width="180"
      height="54"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
      className={className}
    >
      {/* ────── ENGINE (WAP-class loco silhouette) ────── */}
      <g>
        {/* Smokestack */}
        <rect x="44" y="10" width="4" height="4" fill="#0A0A0A" />
        {/* Exhaust puffs (three, staggered) — rise + grow + fade */}
        <g>
          <circle cx="46" cy="11" r="1.5" fill="#8A95A5" opacity="0">
            <animate
              attributeName="cy"
              values="11;-6"
              dur="1.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="1.5;3"
              dur="1.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.55;0"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="46" cy="11" r="1.5" fill="#8A95A5" opacity="0">
            <animate
              attributeName="cy"
              values="11;-6"
              dur="1.8s"
              begin="0.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="1.5;3"
              dur="1.8s"
              begin="0.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.55;0"
              dur="1.8s"
              begin="0.6s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="46" cy="11" r="1.5" fill="#8A95A5" opacity="0">
            <animate
              attributeName="cy"
              values="11;-6"
              dur="1.8s"
              begin="1.2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="1.5;3"
              dur="1.8s"
              begin="1.2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.55;0"
              dur="1.8s"
              begin="1.2s"
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
        <rect x="34" y="16" width="18" height="6" fill="#0A0E14" />
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

      {/* ────── COACH 1 (ICF, VELVET LINE branded) ────── */}
      <g transform="translate(61 0)">
        {/* Roof shadow */}
        <rect x="0" y="18" width="72" height="2" fill="#0F1F4D" />
        {/* Blue body */}
        <rect x="0" y="20" width="72" height="22" fill="#1E3A8A" />
        {/* Yellow upper stripe */}
        <rect x="0" y="22" width="72" height="2.5" fill="#FFD500" />
        {/* Window row */}
        <rect x="3" y="26" width="6" height="6" fill="#0A0E14" />
        <rect x="11" y="26" width="6" height="6" fill="#0A0E14" />
        <rect x="19" y="26" width="6" height="6" fill="#0A0E14" />
        <rect x="27" y="26" width="6" height="6" fill="#0A0E14" />
        <rect x="35" y="26" width="6" height="6" fill="#0A0E14" />
        <rect x="43" y="26" width="6" height="6" fill="#0A0E14" />
        <rect x="51" y="26" width="6" height="6" fill="#0A0E14" />
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
        <rect x="62" y="26" width="6" height="14" fill="#0A0E14" />
        <rect x="64.5" y="32" width="1" height="2" fill="#FFD500" />
        {/* Coupler */}
        <rect x="72" y="30" width="3" height="2.5" fill="#2A3340" />
      </g>

      {/* ────── COACH 2 (numbered class marker) ────── */}
      <g transform="translate(136 0)">
        <rect x="0" y="18" width="72" height="2" fill="#0F1F4D" />
        <rect x="0" y="20" width="72" height="22" fill="#1E3A8A" />
        <rect x="0" y="22" width="72" height="2.5" fill="#FFD500" />
        <rect x="3" y="26" width="6" height="6" fill="#0A0E14" />
        <rect x="11" y="26" width="6" height="6" fill="#0A0E14" />
        <rect x="19" y="26" width="6" height="6" fill="#0A0E14" />
        <rect x="27" y="26" width="6" height="6" fill="#0A0E14" />
        <rect x="35" y="26" width="6" height="6" fill="#0A0E14" />
        <rect x="43" y="26" width="6" height="6" fill="#0A0E14" />
        <rect x="51" y="26" width="6" height="6" fill="#0A0E14" />
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
          A1 · GENERAL
        </text>
        <rect x="62" y="26" width="6" height="14" fill="#0A0E14" />
        <rect x="64.5" y="32" width="1" height="2" fill="#FFD500" />
      </g>

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
        {/* Coach 1 — 2 bogies */}
        <circle
          cx="72"
          cy="46"
          r="3"
          fill="#0A0A0A"
          stroke="#2A3340"
          strokeWidth="0.4"
        />
        <circle
          cx="124"
          cy="46"
          r="3"
          fill="#0A0A0A"
          stroke="#2A3340"
          strokeWidth="0.4"
        />
        {/* Coach 2 — 2 bogies */}
        <circle
          cx="148"
          cy="46"
          r="3"
          fill="#0A0A0A"
          stroke="#2A3340"
          strokeWidth="0.4"
        />
        <circle
          cx="200"
          cy="46"
          r="3"
          fill="#0A0A0A"
          stroke="#2A3340"
          strokeWidth="0.4"
        />
      </g>

      {/* ────── RAIL SHADOW under the wheels ────── */}
      <rect x="2" y="50" width="206" height="1" fill="#2A3340" opacity="0.5" />
    </svg>
  )
}
