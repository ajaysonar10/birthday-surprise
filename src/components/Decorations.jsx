/**
 * Purely decorative pieces: drifting aurora orbs, floating hearts,
 * stars and magical sparkles.
 *
 * Everything here is aria-hidden and pointer-events:none so it never
 * gets in the way of the content or of screen readers.
 */
import { useMemo } from 'react'
import { createPortal } from 'react-dom'

const ORBS = [
  { top: '-12%', left: '-8%', size: 420, from: 'lavender', dur: 26, delay: 0 },
  { top: '8%', right: '-12%', size: 360, from: 'sky', dur: 32, delay: -8 },
  { bottom: '-16%', left: '18%', size: 300, from: 'pink', dur: 29, delay: -14 },
]

const HEARTS = [
  { top: '14%', left: '6%', size: 22, dur: 11, delay: 0, from: 'pink' },
  { top: '34%', left: '13%', size: 14, dur: 14, delay: -4, from: 'lavender' },
  { top: '68%', left: '7%', size: 17, dur: 12, delay: -7, from: 'pink' },
  { top: '86%', left: '18%', size: 12, dur: 15, delay: -2, from: 'cream' },
  { top: '11%', right: '9%', size: 19, dur: 12.5, delay: -3, from: 'lavender' },
  { top: '30%', right: '16%', size: 13, dur: 15.5, delay: -9, from: 'pink' },
  { top: '64%', right: '8%', size: 21, dur: 13, delay: -5, from: 'cream' },
  { top: '82%', right: '15%', size: 15, dur: 16, delay: -11, from: 'lavender' },
]

const STARS = [
  { top: '9%', left: '26%', size: 16, dur: 3.6, delay: 0, from: 'cream' },
  { top: '6%', left: '64%', size: 12, dur: 4.4, delay: -1.2, from: 'sky' },
  { top: '42%', left: '5%', size: 13, dur: 4, delay: -2.4, from: 'cream' },
  { top: '52%', right: '6%', size: 15, dur: 3.4, delay: -0.6, from: 'sky' },
  { bottom: '12%', left: '28%', size: 11, dur: 4.8, delay: -3.1, from: 'cream' },
  { bottom: '18%', right: '26%', size: 14, dur: 3.8, delay: -1.8, from: 'lavender' },
  { top: '24%', left: '44%', size: 10, dur: 5.2, delay: -4.2, from: 'sky' },
  { top: '76%', left: '40%', size: 12, dur: 4.6, delay: -2.8, from: 'cream' },
]

const SPARKLES = [
  { top: '22%', left: '20%', size: 5, dur: 3.2, delay: 0 },
  { top: '12%', right: '30%', size: 4, dur: 2.8, delay: -1 },
  { top: '38%', right: '22%', size: 6, dur: 3.6, delay: -2 },
  { top: '58%', left: '16%', size: 4, dur: 3, delay: -0.5 },
  { bottom: '22%', left: '32%', size: 5, dur: 3.4, delay: -1.6 },
  { bottom: '10%', right: '18%', size: 6, dur: 2.9, delay: -2.2 },
  { top: '70%', right: '34%', size: 4, dur: 3.8, delay: -0.8 },
  { top: '48%', left: '4%', size: 5, dur: 3.1, delay: -2.6 },
  { bottom: '34%', right: '4%', size: 4, dur: 3.5, delay: -1.3 },
  { top: '4%', left: '48%', size: 5, dur: 2.7, delay: -2 },
]

function Orbs() {
  return ORBS.map((orb, index) => (
    <span
      key={`orb-${index}`}
      className={`deco-orb deco-orb--${orb.from}`}
      style={{
        top: orb.top,
        bottom: orb.bottom,
        left: orb.left,
        right: orb.right,
        '--size': `${orb.size}px`,
        '--dur': `${orb.dur}s`,
        '--delay': `${orb.delay}s`,
      }}
    />
  ))
}

function Hearts() {
  return HEARTS.map((heart, index) => (
    <span
      key={`heart-${index}`}
      className={`deco-heart deco-heart--${heart.from}`}
      style={{
        top: heart.top,
        left: heart.left,
        right: heart.right,
        '--s': `${heart.size}px`,
        '--dur': `${heart.dur}s`,
        '--delay': `${heart.delay}s`,
      }}
    >
      ♥
    </span>
  ))
}

function Stars() {
  return STARS.map((star, index) => (
    <span
      key={`star-${index}`}
      className={`deco-star deco-star--${star.from}`}
      style={{
        top: star.top,
        bottom: star.bottom,
        left: star.left,
        right: star.right,
        '--s': `${star.size}px`,
        '--dur': `${star.dur}s`,
        '--delay': `${star.delay}s`,
      }}
    >
      ✦
    </span>
  ))
}

function Sparkles() {
  return SPARKLES.map((sparkle, index) => (
    <span
      key={`sparkle-${index}`}
      className="deco-sparkle"
      style={{
        top: sparkle.top,
        bottom: sparkle.bottom,
        left: sparkle.left,
        right: sparkle.right,
        '--s': `${sparkle.size}px`,
        '--dur': `${sparkle.dur}s`,
        '--delay': `${sparkle.delay}s`,
      }}
    />
  ))
}

/**
 * `variant` tints the floating pieces for dark navy or pale sections.
 */
export function Decorations({ variant = 'dark' }) {
  return (
    <div className={`decorations decorations--${variant}`} aria-hidden="true">
      <Orbs />
      <Hearts />
      <Stars />
      <Sparkles />
    </div>
  )
}

const CONFETTI_COLORS = [
  { color: '#f4b8d0', heart: true },
  { color: '#b9a5f5', heart: true },
  { color: '#78ddf5', heart: false },
  { color: '#fff0d8', heart: false },
  { color: '#ffd9e8', heart: true },
  { color: '#d8ccff', heart: false },
]

/**
 * A one-shot confetti + heart shower. Bump the `burstKey` prop to replay it.
 */
export function Confetti({ burstKey = 0 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 46 }, (_, index) => {
        const palette = CONFETTI_COLORS[index % CONFETTI_COLORS.length]
        return {
          left: (index * 37 + 9) % 100,
          delay: ((index * 13) % 30) / 10,
          duration: 2.9 + ((index * 7) % 22) / 10,
          color: palette.color,
          heart: palette.heart && index % 2 === 0,
          round: index % 3 === 0,
          rotate: (index * 47) % 360,
          drift: (index % 2 === 0 ? 1 : -1) * (14 + ((index * 5) % 52)),
          size: 8 + ((index * 3) % 7),
        }
      }),
    [],
  )

  // Nothing until something actually celebrates: a burstKey of 0 is the
  // resting state, so pages must not rain confetti on first paint.
  if (!burstKey) return null

  // Rendered into <body> so section overflow and stacking cannot clip it.
  return createPortal(
    <div className="confetti" key={burstKey} aria-hidden="true">
      {pieces.map((piece, index) => (
        <span
          key={`confetti-${index}`}
          className={[
            'confetti__piece',
            piece.heart ? 'confetti__piece--heart' : '',
            piece.round ? 'confetti__piece--round' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{
            left: `${piece.left}%`,
            color: piece.color,
            backgroundColor: piece.heart ? 'transparent' : piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            '--drift': `${piece.drift}px`,
            '--rot': `${piece.rotate}deg`,
            '--size': `${piece.size}px`,
          }}
        >
          {piece.heart ? '♥' : null}
        </span>
      ))}
    </div>,
    document.body,
  )
}
