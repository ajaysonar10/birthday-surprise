import { useEffect, useRef, useState } from 'react'
import { config, withName } from '../config.js'
import NameText from './NameText.jsx'
import './LetterSection.css'

const HEARTS = [
  { top: '16%', left: '7%', size: 24, dur: 8, delay: 0, color: '#ff9ec4' },
  { top: '26%', left: '16%', size: 16, dur: 10, delay: -3.5, color: '#ffc7df' },
  { top: '58%', left: '5%', size: 18, dur: 9, delay: -1.5, color: '#ffb3d1' },
  { top: '74%', left: '14%', size: 14, dur: 11, delay: -6, color: '#ffd0e2' },
  { top: '20%', right: '8%', size: 22, dur: 8.5, delay: -2, color: '#ff9ec4' },
  { top: '34%', right: '16%', size: 15, dur: 10.5, delay: -5, color: '#ffc7df' },
  { top: '62%', right: '6%', size: 19, dur: 9.5, delay: -4, color: '#ffb3d1' },
  { top: '80%', right: '15%', size: 13, dur: 12, delay: -7.5, color: '#ffd0e2' },
]

const STARS = [
  { top: '10%', left: '22%', size: 12, dur: 3.8, delay: 0 },
  { top: '8%', left: '72%', size: 10, dur: 4.6, delay: -1.4 },
  { top: '38%', left: '10%', size: 14, dur: 3.4, delay: -0.8 },
  { top: '46%', right: '9%', size: 11, dur: 4.2, delay: -2.6 },
  { top: '70%', left: '24%', size: 9, dur: 5, delay: -3.2 },
  { top: '66%', right: '24%', size: 13, dur: 3.6, delay: -1.1 },
  { top: '88%', left: '48%', size: 10, dur: 4.8, delay: -2 },
  { top: '14%', left: '48%', size: 8, dur: 5.2, delay: -4 },
]

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 2.6a5.9 5.9 0 0 0-5.9 5.9v3.1L4.6 15.4a.9.9 0 0 0 .8 1.3h13.2a.9.9 0 0 0 .8-1.3L17.9 11.6V8.5A5.9 5.9 0 0 0 12 2.6z"
        fill="currentColor"
      />
      <circle cx="12" cy="19.2" r="2.2" fill="currentColor" />
    </svg>
  )
}

function HeartsAndStars() {
  return (
    <div className="letter__bits" aria-hidden="true">
      {HEARTS.map((heart, index) => (
        <span
          key={`heart-${index}`}
          className="heart"
          style={{
            top: heart.top,
            left: heart.left,
            right: heart.right,
            '--hs': `${heart.size}px`,
            '--hc': heart.color,
            '--dur': `${heart.dur}s`,
            '--delay': `${heart.delay}s`,
          }}
        >
          ♥
        </span>
      ))}

      {STARS.map((star, index) => (
        <span
          key={`star-${index}`}
          className="letter__star"
          style={{
            top: star.top,
            left: star.left,
            right: star.right,
            '--s': `${star.size}px`,
            '--dur': `${star.dur}s`,
            '--delay': `${star.delay}s`,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  )
}

export default function LetterSection() {
  const [opened, setOpened] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const cardRef = useRef(null)

  // Let the envelope finish unfolding before swapping in the letter.
  useEffect(() => {
    if (!opened) return undefined

    const timer = window.setTimeout(() => setRevealed(true), 850)
    return () => window.clearTimeout(timer)
  }, [opened])

  // Move focus to the letter once it appears so keyboard and screen
  // reader users land on the message straight away.
  useEffect(() => {
    if (revealed) cardRef.current?.focus({ preventScroll: true })
  }, [revealed])

  return (
    <section id="letter" className="letter" aria-labelledby="letter-title">
      <HeartsAndStars />

      <div className="letter__inner">
        <header className="letter__head">
          <p className="letter__eyebrow">
            <span className="letter__eyebrow-dot" aria-hidden="true" />
            {config.letter.eyebrow}
          </p>
          <h2 id="letter-title" className="letter__title">
            <NameText text={config.letter.title} />
          </h2>
        </header>

        <div className="letter__stage">
          <div
            className={[
              'letter__envelope-wrap',
              opened ? 'is-open' : '',
              revealed ? 'is-gone' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            inert={revealed}
          >
            <button
              type="button"
              className="envelope"
              onClick={() => setOpened(true)}
              aria-expanded={opened}
              aria-controls="birthday-letter"
              aria-label={withName(config.letter.openLabel)}
            >
              <span className="envelope__back" aria-hidden="true" />
              <span className="envelope__note" aria-hidden="true">
                <span className="envelope__note-line" />
                <span className="envelope__note-line" />
                <span className="envelope__note-line envelope__note-line--short" />
              </span>
              <span className="envelope__pocket" aria-hidden="true" />
              <span className="envelope__flap" aria-hidden="true" />
              <span className="envelope__seal" aria-hidden="true">
                <BellIcon />
              </span>
            </button>

            <p className="letter__hint">
              <span className="letter__hint-arrow" aria-hidden="true">
                ↑
              </span>
              {config.letter.envelopeHint}
            </p>
          </div>

          {revealed && (
            <article
              id="birthday-letter"
              className="letter-card"
              tabIndex={-1}
              ref={cardRef}
              aria-labelledby="letter-title"
            >
              <span className="letter-card__stamp" aria-hidden="true">
                <BellIcon />
              </span>

              <p className="letter-card__greeting">
                <NameText text={config.letter.greeting} />
              </p>

              {config.letter.paragraphs.map((paragraph, index) => (
                <p key={`paragraph-${index}`} className="letter-card__para">
                  <NameText text={paragraph} />
                </p>
              ))}

              <p className="letter-card__closing">
                {withName(config.letter.closing)}
              </p>
              <p className="letter-card__signature">
                {withName(config.letter.signature)}
              </p>
            </article>
          )}
        </div>
      </div>
    </section>
  )
}
