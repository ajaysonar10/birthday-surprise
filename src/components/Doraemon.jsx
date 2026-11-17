/**
 * A hand-drawn, Doraemon-inspired mascot built entirely from inline SVG.
 * The waving hand and the bell are animated from App.css.
 */
export default function Doraemon({ className = '' }) {
  return (
    <svg
      className={`doraemon ${className}`.trim()}
      viewBox="0 0 260 250"
      role="img"
      aria-label="A happy blue robot cat waving hello"
    >
      <defs>
        <linearGradient id="dora-blue" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#a3e0fa" />
          <stop offset="55%" stopColor="#74c8f1" />
          <stop offset="100%" stopColor="#4fb2e6" />
        </linearGradient>
        <radialGradient id="dora-bell" cx="35%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#ffe89a" />
          <stop offset="70%" stopColor="#ffd34f" />
          <stop offset="100%" stopColor="#f2b92e" />
        </radialGradient>
        <radialGradient id="dora-nose" cx="32%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#ff8d99" />
          <stop offset="100%" stopColor="#e8445a" />
        </radialGradient>
      </defs>

      {/* soft shadow */}
      <ellipse cx="118" cy="240" rx="62" ry="7" fill="#8cc9e8" opacity="0.22" />

      {/* waving arm */}
      <g className="doraemon__hand">
        {/* arm reaches out of the head and into the hand so the two connect */}
        <ellipse
          cx="216"
          cy="163"
          rx="28"
          ry="15"
          transform="rotate(-26 216 163)"
          fill="url(#dora-blue)"
        />
        <circle
          cx="236"
          cy="141"
          r="19"
          fill="#ffffff"
          stroke="#d8ecf7"
          strokeWidth="2"
        />
        <ellipse cx="230" cy="135" rx="5.5" ry="3.8" fill="#ffffff" opacity="0.9" />
      </g>

      {/* head */}
      <circle cx="115" cy="118" r="96" fill="url(#dora-blue)" />
      <ellipse cx="88" cy="62" rx="34" ry="20" fill="#ffffff" opacity="0.22" />

      {/* face */}
      <ellipse cx="115" cy="132" rx="80" ry="70" fill="#ffffff" />

      {/* blush */}
      <ellipse cx="59" cy="152" rx="13" ry="6.5" fill="#ffa8c9" opacity="0.38" />
      <ellipse cx="171" cy="152" rx="13" ry="6.5" fill="#ffa8c9" opacity="0.38" />

      {/* eyes */}
      <ellipse
        cx="97"
        cy="86"
        rx="20"
        ry="25"
        fill="#ffffff"
        stroke="#b6d9e9"
        strokeWidth="2"
      />
      <ellipse
        cx="133"
        cy="86"
        rx="20"
        ry="25"
        fill="#ffffff"
        stroke="#b6d9e9"
        strokeWidth="2"
      />
      <circle cx="104" cy="92" r="7" fill="#2f3a52" />
      <circle cx="126" cy="92" r="7" fill="#2f3a52" />
      <circle cx="101.5" cy="89" r="2.4" fill="#ffffff" />
      <circle cx="123.5" cy="89" r="2.4" fill="#ffffff" />

      {/* nose */}
      <circle cx="115" cy="110" r="13" fill="url(#dora-nose)" />
      <ellipse cx="110" cy="105" rx="4" ry="3" fill="#ffffff" opacity="0.75" />

      {/* mouth */}
      <path
        d="M115 123 V136"
        stroke="#3d4a63"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M115 136 C107 149 93 151 83 143"
        fill="none"
        stroke="#3d4a63"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M115 136 C123 149 137 151 147 143"
        fill="none"
        stroke="#3d4a63"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* whiskers */}
      <g stroke="#3d4a63" strokeWidth="2.6" strokeLinecap="round" opacity="0.85">
        <line x1="70" y1="108" x2="27" y2="97" />
        <line x1="68" y1="122" x2="23" y2="122" />
        <line x1="70" y1="136" x2="27" y2="147" />
        <line x1="160" y1="108" x2="203" y2="97" />
        <line x1="162" y1="122" x2="207" y2="122" />
        <line x1="160" y1="136" x2="203" y2="147" />
      </g>

      {/* collar */}
      <rect x="54" y="193" width="122" height="21" rx="10.5" fill="#ef5a68" />
      <rect x="54" y="193" width="122" height="8" rx="4" fill="#ff8390" opacity="0.55" />

      {/* bell */}
      <g className="doraemon__bell">
        <circle
          cx="115"
          cy="211"
          r="14"
          fill="url(#dora-bell)"
          stroke="#e0a41f"
          strokeWidth="1.6"
        />
        <line
          x1="103"
          y1="210"
          x2="127"
          y2="210"
          stroke="#d99a14"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="115"
          y1="210"
          x2="115"
          y2="220"
          stroke="#d99a14"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="115" cy="221" r="2.8" fill="#d99a14" />
        <circle cx="110" cy="205" r="3" fill="#fff6d6" opacity="0.85" />
      </g>
    </svg>
  )
}
