/**
 * Purely decorative pieces: clouds, balloons, sparkles and confetti.
 * Everything here is aria-hidden and pointer-events:none so it never
 * gets in the way of the content or of screen readers.
 */
import { useMemo } from 'react'
import { createPortal } from 'react-dom'

const CLOUDS = [
  { top: '7%', left: '3%', w: 180, o: 0.9, dur: 46, delay: -2 },
  { top: '15%', right: '5%', w: 220, o: 0.72, dur: 58, delay: -14 },
  { bottom: '11%', left: '8%', w: 150, o: 0.6, dur: 52, delay: -22 },
  { bottom: '5%', right: '10%', w: 195, o: 0.5, dur: 64, delay: -8 },
]

const BALLOONS = [
  { top: '11%', left: '7%', w: 58, c: '#ffb3d1', dur: 13, delay: 0, str: 70 },
  { top: '7%', right: '9%', w: 48, c: '#8fd3f4', dur: 16, delay: -4, str: 84 },
  { top: '42%', left: '4%', w: 40, c: '#ffe08a', dur: 18, delay: -8, str: 56 },
  { top: '38%', right: '5%', w: 44, c: '#ffc7df', dur: 15, delay: -6, str: 62 },
]

const SPARKLES = [
  { top: '18%', left: '18%', s: 13, dur: 3.6, delay: 0 },
  { top: '9%', left: '38%', s: 9, dur: 4.4, delay: -1.2 },
  { top: '24%', right: '20%', s: 15, dur: 3.2, delay: -0.6 },
  { top: '6%', right: '32%', s: 10, dur: 4.8, delay: -2.4 },
  { bottom: '20%', left: '16%', s: 12, dur: 4, delay: -1.8 },
  { bottom: '9%', left: '34%', s: 8, dur: 3.4, delay: -0.4 },
  { bottom: '26%', right: '14%', s: 14, dur: 4.2, delay: -3 },
  { bottom: '7%', right: '30%', s: 9, dur: 3.8, delay: -1 },
  { top: '46%', left: '12%', s: 10, dur: 5, delay: -2 },
  { top: '52%', right: '9%', s: 11, dur: 4.6, delay: -0.8 },
]

function Clouds() {
  return CLOUDS.map((cloud, index) => (
    <div
      key={`cloud-${index}`}
      className="cloud deco--hide-sm"
      style={{
        top: cloud.top,
        bottom: cloud.bottom,
        left: cloud.left,
        right: cloud.right,
        '--w': `${cloud.w}px`,
        '--o': cloud.o,
        '--dur': `${cloud.dur}s`,
        '--delay': `${cloud.delay}s`,
      }}
    />
  ))
}

function Balloons() {
  return BALLOONS.map((balloon, index) => (
    <div
      key={`balloon-${index}`}
      className="balloon deco--hide-sm"
      style={{
        top: balloon.top,
        left: balloon.left,
        right: balloon.right,
        '--bw': `${balloon.w}px`,
        '--c': balloon.c,
        '--dur': `${balloon.dur}s`,
        '--delay': `${balloon.delay}s`,
        '--str': `${balloon.str}px`,
      }}
    />
  ))
}

function Sparkles() {
  return SPARKLES.map((sparkle, index) => (
    <span
      key={`sparkle-${index}`}
      className="sparkle"
      style={{
        top: sparkle.top,
        bottom: sparkle.bottom,
        left: sparkle.left,
        right: sparkle.right,
        '--s': `${sparkle.s}px`,
        '--dur': `${sparkle.dur}s`,
        '--delay': `${sparkle.delay}s`,
      }}
      aria-hidden="true"
    >
      ✦
    </span>
  ))
}

export function Decorations() {
  return (
    <div className="decorations" aria-hidden="true">
      <Clouds />
      <Balloons />
      <Sparkles />
    </div>
  )
}

const CONFETTI_COLORS = [
  '#ffb3d1',
  '#7cc9f0',
  '#ffd45e',
  '#ffffff',
  '#ff8fb8',
  '#b7e4ff',
]

/**
 * A one-shot confetti shower. Bump the `burstKey` prop to replay it.
 */
export function Confetti({ burstKey = 0 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 34 }, (_, index) => ({
        left: (index * 37 + 11) % 100,
        delay: ((index * 13) % 24) / 10,
        duration: 2.8 + ((index * 7) % 20) / 10,
        color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
        rotate: (index * 47) % 360,
        drift: (index % 2 === 0 ? 1 : -1) * (16 + ((index * 5) % 44)),
        round: index % 3 === 0,
      })),
    [],
  )

  // Rendered into <body> so the welcome section's `overflow: hidden` and
  // isolation cannot clip the shower or stack it under the next section.
  return createPortal(
    <div className="confetti" key={burstKey} aria-hidden="true">
      {pieces.map((piece, index) => (
        <span
          key={`confetti-${index}`}
          className={`confetti__piece${piece.round ? ' confetti__piece--round' : ''}`}
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            '--drift': `${piece.drift}px`,
            '--rot': `${piece.rotate}deg`,
          }}
        />
      ))}
    </div>,
    document.body,
  )
}
