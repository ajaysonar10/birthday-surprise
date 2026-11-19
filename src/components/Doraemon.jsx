/**
 * A hand-drawn, Doraemon-inspired mascot built entirely from inline SVG.
 *
 * `mood` drives the cute reactions used across the site:
 *   'idle'  — gentle bob, blinking, waving hand
 *   'happy' — bounce, bigger blush, happy sparkles
 *   'shy'   — head tilt, blush turned up
 *   'sad'   — small deflated tilt for the playful NO answers
 *
 * Eye blinks, the wave and the bell are animated from App.css so the
 * reduced-motion rules can switch them all off in one place.
 */
export default function Doraemon({ className = '', mood = 'idle' }) {
  return (
    <svg
      className={`doraemon doraemon--${mood} ${className}`.trim()}
      viewBox="0 0 260 250"
      role="img"
      aria-label="A happy blue robot cat waving hello"
    >
      <defs>
        <linearGradient id="dora-blue" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#a9d6f7" />
          <stop offset="55%" stopColor="#6e8ddb" />
          <stop offset="100%" stopColor="#4a63b0" />
        </linearGradient>
        <radialGradient id="dora-bell" cx="35%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#fff2c2" />
          <stop offset="70%" stopColor="#ffdf94" />
          <stop offset="100%" stopColor="#f0c25e" />
        </radialGradient>
        <radialGradient id="dora-nose" cx="32%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#ff9fb0" />
          <stop offset="100%" stopColor="#e8445a" />
        </radialGradient>
        <radialGradient id="dora-aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#b9a5f5" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#78ddf5" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#78ddf5" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft aura so he sits in the glow instead of on top of it */}
      <circle cx="116" cy="120" r="128" fill="url(#dora-aura)" />

      {/* floor shadow */}
      <ellipse cx="118" cy="241" rx="60" ry="6.5" fill="#0a1126" opacity="0.5" />

      {/* cute reaction hearts, revealed by mood classes */}
      <g className="doraemon__reaction" aria-hidden="true">
        <path
          className="doraemon__reaction-heart"
          d="M198 34c-4-7-14-5-14 3 0 6 8 11 14 15 6-4 14-9 14-15 0-8-10-10-14-3z"
          fill="#f4b8d0"
        />
        <path
          className="doraemon__reaction-heart"
          d="M44 62c-3-5-10-4-10 2 0 4 6 8 10 11 4-3 10-7 10-11 0-6-7-7-10-2z"
          fill="#b9a5f5"
        />
        <path
          className="doraemon__reaction-heart"
          d="M212 96c-2.5-4.5-9-3.5-9 2 0 3.5 5 7 9 9.5 4-2.5 9-6 9-9.5 0-5.5-6.5-6.5-9-2z"
          fill="#78ddf5"
        />
        <path
          className="doraemon__reaction-spark"
          d="M40 108l2.6 7.4 7.4 2.6-7.4 2.6L40 128l-2.6-7.4L30 118l7.4-2.6z"
          fill="#fff0d8"
        />
      </g>

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
          stroke="#c9d9f5"
          strokeWidth="2"
        />
        <ellipse cx="230" cy="135" rx="5.5" ry="3.8" fill="#ffffff" opacity="0.9" />
      </g>

      {/* head */}
      <circle cx="115" cy="118" r="96" fill="url(#dora-blue)" />
      <ellipse cx="88" cy="62" rx="34" ry="20" fill="#ffffff" opacity="0.28" />

      {/* face */}
      <ellipse cx="115" cy="132" rx="80" ry="70" fill="#fcfeff" />

      {/* blush */}
      <ellipse
        className="doraemon__blush"
        cx="59"
        cy="152"
        rx="13"
        ry="6.5"
        fill="#f4b8d0"
        opacity="0.42"
      />
      <ellipse
        className="doraemon__blush"
        cx="171"
        cy="152"
        rx="13"
        ry="6.5"
        fill="#f4b8d0"
        opacity="0.42"
      />

      {/* eyes — grouped so a single blink keyframe closes both */}
      <g className="doraemon__eyes">
        <ellipse
          cx="97"
          cy="86"
          rx="20"
          ry="25"
          fill="#ffffff"
          stroke="#bcd2f0"
          strokeWidth="2"
        />
        <ellipse
          cx="133"
          cy="86"
          rx="20"
          ry="25"
          fill="#ffffff"
          stroke="#bcd2f0"
          strokeWidth="2"
        />
        <circle cx="104" cy="92" r="7" fill="#26314f" />
        <circle cx="126" cy="92" r="7" fill="#26314f" />
        <circle cx="101.5" cy="89" r="2.4" fill="#ffffff" />
        <circle cx="123.5" cy="89" r="2.4" fill="#ffffff" />
      </g>

      {/* nose */}
      <circle cx="115" cy="110" r="13" fill="url(#dora-nose)" />
      <ellipse cx="110" cy="105" rx="4" ry="3" fill="#ffffff" opacity="0.75" />

      {/* mouth */}
      <g className="doraemon__mouth">
        <path
          d="M115 123 V136"
          stroke="#33405e"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M115 136 C107 149 93 151 83 143"
          fill="none"
          stroke="#33405e"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M115 136 C123 149 137 151 147 143"
          fill="none"
          stroke="#33405e"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* whiskers */}
      <g
        className="doraemon__whiskers"
        stroke="#33405e"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.85"
      >
        <line x1="70" y1="108" x2="27" y2="97" />
        <line x1="68" y1="122" x2="23" y2="122" />
        <line x1="70" y1="136" x2="27" y2="147" />
        <line x1="160" y1="108" x2="203" y2="97" />
        <line x1="162" y1="122" x2="207" y2="122" />
        <line x1="160" y1="136" x2="203" y2="147" />
      </g>

      {/* collar */}
      <rect x="54" y="193" width="122" height="21" rx="10.5" fill="#e3556d" />
      <rect x="54" y="193" width="122" height="8" rx="4" fill="#ff8390" opacity="0.55" />

      {/* bell */}
      <g className="doraemon__bell">
        <circle
          cx="115"
          cy="211"
          r="14"
          fill="url(#dora-bell)"
          stroke="#e0b45f"
          strokeWidth="1.6"
        />
        <line
          x1="103"
          y1="210"
          x2="127"
          y2="210"
          stroke="#d9a53f"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="115"
          y1="210"
          x2="115"
          y2="220"
          stroke="#d9a53f"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="115" cy="221" r="2.8" fill="#d9a53f" />
        <circle cx="110" cy="205" r="3" fill="#fff6d6" opacity="0.85" />
      </g>
    </svg>
  )
}
