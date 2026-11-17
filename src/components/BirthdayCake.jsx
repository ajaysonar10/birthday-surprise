/**
 * Hand-drawn SVG birthday cake, matched to the site's pastel palette.
 * The candle flames flicker via CSS (.cake__flame in SurpriseSection.css).
 */
const CANDLES = [
  { x: 102, stripe: '#ff9fc3' },
  { x: 120, stripe: '#8fd3f4' },
  { x: 138, stripe: '#ffd45e' },
]

const SPRINKLES = [
  { x: 70, y: 158, color: '#ffffff' },
  { x: 110, y: 164, color: '#ffd45e' },
  { x: 150, y: 158, color: '#8fd3f4' },
  { x: 184, y: 166, color: '#ff6ea3' },
  { x: 80, y: 112, color: '#ffffff' },
  { x: 118, y: 118, color: '#ffd45e' },
  { x: 152, y: 112, color: '#ffffff' },
  { x: 100, y: 138, color: '#ffd45e' },
  { x: 140, y: 142, color: '#8fd3f4' },
  { x: 166, y: 138, color: '#ffffff' },
  { x: 96, y: 76, color: '#ff6ea3' },
  { x: 144, y: 76, color: '#ffffff' },
]

export default function BirthdayCake({ className = '' }) {
  return (
    <svg
      className={`cake ${className}`.trim()}
      viewBox="0 0 240 210"
      role="img"
      aria-label="A three-tier birthday cake with three lit candles"
    >
      <defs>
        <linearGradient id="cake-pink-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd3e5" />
          <stop offset="100%" stopColor="#ff9fc3" />
        </linearGradient>
        <linearGradient id="cake-pink-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffc2da" />
          <stop offset="100%" stopColor="#ff8fb8" />
        </linearGradient>
        <linearGradient id="cake-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cdeeff" />
          <stop offset="100%" stopColor="#8fd3f4" />
        </linearGradient>
        <linearGradient id="cake-cream" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffdf6" />
          <stop offset="100%" stopColor="#fff0e2" />
        </linearGradient>
        <radialGradient id="cake-flame" cx="50%" cy="68%" r="62%">
          <stop offset="0%" stopColor="#fff7c2" />
          <stop offset="55%" stopColor="#ffd45e" />
          <stop offset="100%" stopColor="#ff9d3c" />
        </radialGradient>
        <radialGradient id="cake-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffe9a8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* plate */}
      <ellipse cx="120" cy="197" rx="92" ry="10" fill="#9fd4ee" opacity="0.28" />
      <ellipse cx="120" cy="188" rx="102" ry="15" fill="#eaf7ff" />
      <ellipse cx="120" cy="184" rx="90" ry="11" fill="#d7eefb" />

      {/* bottom tier */}
      <rect x="36" y="126" width="168" height="58" rx="12" fill="url(#cake-pink-a)" />
      <rect x="36" y="120" width="168" height="20" rx="10" fill="url(#cake-cream)" />
      <g fill="url(#cake-cream)">
        <circle cx="56" cy="140" r="9" />
        <circle cx="82" cy="140" r="10" />
        <circle cx="108" cy="140" r="9" />
        <circle cx="134" cy="140" r="10" />
        <circle cx="160" cy="140" r="9" />
        <circle cx="184" cy="140" r="10" />
      </g>

      {/* middle tier */}
      <rect x="58" y="88" width="124" height="44" rx="11" fill="url(#cake-blue)" />
      <rect x="58" y="82" width="124" height="18" rx="9" fill="url(#cake-cream)" />
      <g fill="url(#cake-cream)">
        <circle cx="74" cy="100" r="8" />
        <circle cx="98" cy="100" r="8.5" />
        <circle cx="122" cy="100" r="8" />
        <circle cx="146" cy="100" r="8.5" />
        <circle cx="168" cy="100" r="8" />
      </g>

      {/* top tier */}
      <rect x="82" y="56" width="76" height="34" rx="9" fill="url(#cake-pink-b)" />
      <rect x="82" y="50" width="76" height="15" rx="7" fill="url(#cake-cream)" />
      <g fill="url(#cake-cream)">
        <circle cx="96" cy="65" r="6.5" />
        <circle cx="114" cy="65" r="7" />
        <circle cx="132" cy="65" r="6.5" />
        <circle cx="150" cy="65" r="7" />
      </g>

      {/* sprinkles */}
      <g strokeWidth="3" strokeLinecap="round" opacity="0.9">
        {SPRINKLES.map((sprinkle, index) => (
          <line
            key={`sprinkle-${index}`}
            x1={sprinkle.x}
            y1={sprinkle.y}
            x2={sprinkle.x + 6}
            y2={sprinkle.y - 4}
            stroke={sprinkle.color}
          />
        ))}
      </g>

      {/* candles */}
      <g className="cake__candles">
        {CANDLES.map((candle, index) => (
          <g className="cake__candle" key={`candle-${index}`}>
            <circle
              cx={candle.x}
              cy="18"
              r="16"
              fill="url(#cake-halo)"
              className="cake__halo"
            />
            <ellipse
              className="cake__flame"
              cx={candle.x}
              cy="17"
              rx="6"
              ry="9.5"
              fill="url(#cake-flame)"
            />
            <ellipse cx={candle.x} cy="19" rx="2.4" ry="4" fill="#fffbe0" opacity="0.9" />
            <line
              x1={candle.x}
              y1="27"
              x2={candle.x}
              y2="31"
              stroke="#7a5a44"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <rect
              x={candle.x - 4.5}
              y="30"
              width="9"
              height="28"
              rx="4"
              fill="#fffdf6"
              stroke="#ffe4ee"
              strokeWidth="1"
            />
            <rect
              x={candle.x - 4.5}
              y="34"
              width="9"
              height="5"
              fill={candle.stripe}
              opacity="0.85"
            />
            <rect
              x={candle.x - 4.5}
              y="43"
              width="9"
              height="5"
              fill={candle.stripe}
              opacity="0.85"
            />
          </g>
        ))}
      </g>
    </svg>
  )
}
