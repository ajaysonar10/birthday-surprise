import { useEffect, useRef, useState } from 'react'
import { config, withName } from '../config.js'
import NameText from './NameText.jsx'
import BirthdayCake from './BirthdayCake.jsx'
import { Confetti, Decorations } from './Decorations.jsx'
import './SurpriseSection.css'

const DOOR_SPARKS = [
  { tx: '-96px', ty: '-54px', delay: '0s', size: '15px' },
  { tx: '88px', ty: '-70px', delay: '0.08s', size: '12px' },
  { tx: '-70px', ty: '46px', delay: '0.16s', size: '11px' },
  { tx: '104px', ty: '34px', delay: '0.04s', size: '14px' },
  { tx: '-12px', ty: '-96px', delay: '0.12s', size: '10px' },
  { tx: '26px', ty: '86px', delay: '0.2s', size: '12px' },
]

function BurstIcon() {
  return (
    <svg
      className="surprise__celebrate-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 2.1l2.1 5.7 5.8 2.1-5.8 2.1L12 17.7l-2.1-5.7L4.1 9.9l5.8-2.1z"
        fill="currentColor"
      />
      <circle cx="19.6" cy="4.4" r="1.5" fill="currentColor" opacity="0.8" />
      <circle cx="4.4" cy="18.8" r="1.2" fill="currentColor" opacity="0.65" />
    </svg>
  )
}

export default function SurpriseSection() {
  const [opened, setOpened] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [celebrations, setCelebrations] = useState(0)
  const revealRef = useRef(null)

  // Let the door swing open before the surprise appears.
  useEffect(() => {
    if (!opened) return undefined

    const timer = window.setTimeout(() => setRevealed(true), 1000)
    return () => window.clearTimeout(timer)
  }, [opened])

  useEffect(() => {
    if (revealed) revealRef.current?.focus({ preventScroll: true })
  }, [revealed])

  return (
    <section id="surprise" className="surprise" aria-labelledby="surprise-heading">
      <Decorations />

      {revealed && <Confetti burstKey={celebrations} />}

      <div className="surprise__inner">
        <header className="surprise__head">
          <p className="surprise__eyebrow">
            <span className="surprise__eyebrow-dot" aria-hidden="true" />
            {config.surprise.eyebrow}
          </p>
          <h2 id="surprise-heading" className="surprise__heading">
            <NameText text={config.surprise.title} />
          </h2>
        </header>

        <div className="surprise__stage">
          <div
            className={[
              'surprise__door-wrap',
              opened ? 'is-open' : '',
              revealed ? 'is-gone' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            inert={revealed}
          >
            <p className="surprise__door-sign">{config.surprise.doorSign}</p>

            <button
              type="button"
              className="door"
              onClick={() => setOpened(true)}
              aria-expanded={opened}
              aria-controls="birthday-surprise-reveal"
              aria-label={withName(config.surprise.doorLabel)}
            >
              <span className="door__frame" aria-hidden="true" />

              <span className="door__cosmos" aria-hidden="true">
                <span className="door__light" />
              </span>

              <span className="door__panel" aria-hidden="true">
                <span className="door__knob" />
                <span className="door__decal">✦</span>
              </span>

              <span className="door__sparks" aria-hidden="true">
                {DOOR_SPARKS.map((spark, index) => (
                  <span
                    key={`door-spark-${index}`}
                    className="door__spark"
                    style={{
                      '--tx': spark.tx,
                      '--ty': spark.ty,
                      '--delay': spark.delay,
                      '--fs': spark.size,
                    }}
                  >
                    ✦
                  </span>
                ))}
              </span>
            </button>

            <p className="surprise__door-hint">
              <span className="surprise__door-hint-arrow" aria-hidden="true">
                ↑
              </span>
              {config.surprise.doorHint}
            </p>
          </div>

          {revealed && (
            <div
              id="birthday-surprise-reveal"
              className="surprise__reveal"
              ref={revealRef}
              tabIndex={-1}
            >
              <p className="surprise__message">
                <NameText text={config.surprise.message} />
              </p>

              <div className="surprise__cake" key={celebrations}>
                <BirthdayCake />
              </div>

              <p className="surprise__caption">
                {config.surprise.cakeCaption}
              </p>

              <button
                type="button"
                className="surprise__celebrate"
                onClick={() => setCelebrations((count) => count + 1)}
              >
                <span>{config.surprise.celebrateButton}</span>
                <BurstIcon />
              </button>

              <p
                className={`surprise__cheer${celebrations > 0 ? ' is-visible' : ''}`}
                aria-live="polite"
              >
                {celebrations > 0 ? (
                  <NameText text={config.surprise.afterCelebrate} />
                ) : null}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
