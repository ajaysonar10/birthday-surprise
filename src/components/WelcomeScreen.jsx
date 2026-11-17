import { useState } from 'react'
import { config } from '../config.js'
import Doraemon from './Doraemon.jsx'
import NameText from './NameText.jsx'
import { Confetti, Decorations } from './Decorations.jsx'

function scrollToLetter() {
  const letter = document.getElementById('letter')
  if (!letter) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  letter.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
}

function SparkleIcon() {
  return (
    <svg
      className="welcome__cta-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 2.2l2 5.6 5.6 2-5.6 2-2 5.6-2-5.6-5.6-2 5.6-2z"
        fill="currentColor"
      />
      <circle cx="19.4" cy="4.6" r="1.5" fill="currentColor" opacity="0.75" />
      <circle cx="4.2" cy="18.6" r="1.2" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

export default function WelcomeScreen() {
  const [burst, setBurst] = useState(0)

  return (
    <main className="welcome">
      <Decorations />
      <Confetti burstKey={burst} />

      <section className="welcome__card" aria-labelledby="welcome-title">
        <p className="welcome__eyebrow">
          <span className="welcome__eyebrow-dot" aria-hidden="true" />
          {config.welcome.eyebrow}
        </p>

        <div className="welcome__mascot">
          <Doraemon />
        </div>

        <h1 id="welcome-title" className="welcome__title">
          <NameText text={config.birthday.headline} />
        </h1>

        <p className="welcome__tagline">
          <NameText text={config.birthday.tagline} />
        </p>

        <button
          type="button"
          className="welcome__cta"
          onClick={() => {
            setBurst((count) => count + 1)
            scrollToLetter()
          }}
        >
          <span>{config.welcome.button}</span>
          <SparkleIcon />
        </button>

        <p className="welcome__hint">{config.welcome.hint}</p>
      </section>
    </main>
  )
}
