import { useEffect, useRef, useState } from 'react'
import Doraemon from './Doraemon.jsx'
import { Confetti, Decorations } from './Decorations.jsx'
import './QuestionScene.css'

/**
 * Shared full-screen "question" scene, used by Scene 1 and Scene 2.
 *
 * Everything here is viewport-bound: the copy scales with the viewport
 * height so the scene always fits exactly one 100vw × 100vh screen.
 */

/**
 * Small, repeatable dodge offsets. Kept modest so the NO button never
 * leaves the scene or overlaps the YES button.
 */
function nextDodge(attempt) {
  const x = ((attempt * 37) % 7) * 7 - 21
  const y = ((attempt * 53) % 5) * 6 - 12
  const r = ((attempt * 29) % 5) - 2

  return { '--no-x': `${x}px`, '--no-y': `${y}px`, '--no-r': `${r}deg` }
}

export default function QuestionScene({
  variant = 'one',
  bubble,
  eyebrow,
  lead,
  question,
  yesLabel,
  noLabel,
  hint,
  replies,
  accentWhole = false,
  onNext,
}) {
  const [noCount, setNoCount] = useState(0)
  const [reply, setReply] = useState('')
  const [dodge, setDodge] = useState({})
  const [burst, setBurst] = useState(0)
  const [mood, setMood] = useState('idle')
  const [leaving, setLeaving] = useState(false)

  const leaveTimer = useRef(null)
  const moodTimer = useRef(null)

  useEffect(
    () => () => {
      if (leaveTimer.current) window.clearTimeout(leaveTimer.current)
      if (moodTimer.current) window.clearTimeout(moodTimer.current)
    },
    [],
  )

  const handleNo = () => {
    const attempt = noCount + 1
    setNoCount(attempt)
    setReply(replies[(attempt - 1) % replies.length])

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (finePointer) setDodge(nextDodge(attempt))
  }

  const handleYes = () => {
    if (leaving) return

    setLeaving(true)
    setBurst((count) => count + 1)

    // Let the confetti and the little exit animation land before the
    // next scene slides in.
    leaveTimer.current = window.setTimeout(() => onNext(), 640)
  }

  const cheer = () => {
    setMood('happy')
    setBurst((count) => count + 1)

    if (moodTimer.current) window.clearTimeout(moodTimer.current)
    moodTimer.current = window.setTimeout(() => setMood('idle'), 2200)
  }

  const titleId = `question-${variant}-title`

  return (
    <main
      className={`scene scene--question scene--q-${variant}${
        leaving ? ' is-leaving' : ''
      }`}
      aria-labelledby={titleId}
    >
      <Decorations variant="dark" />
      <Confetti burstKey={burst} />
      <div className="question-scene__halo" aria-hidden="true" />

      <div className="question-scene__content">
        <div className="question-scene__mascot">
          <p className="question-scene__bubble" aria-hidden="true">
            {bubble}
          </p>

          <button
            type="button"
            className="question-scene__mascot-btn"
            onClick={cheer}
            aria-label="Give Doraemon a high five"
          >
            <span className="question-scene__mascot-ring" aria-hidden="true" />
            <Doraemon mood={mood} />
          </button>
        </div>

        <p className="eyebrow eyebrow--dark">{eyebrow}</p>

        <h1 id={titleId} className="question-scene__title display display--dark">
          {accentWhole ? (
            <span className="question-scene__accent">{lead}</span>
          ) : (
            <>
              {lead}
              {question ? (
                <>
                  {' '}
                  <span className="question-scene__accent">{question}</span>
                </>
              ) : null}
            </>
          )}
        </h1>

        <div className="question-scene__actions">
          <button
            type="button"
            className="btn btn--primary question-scene__yes"
            onClick={handleYes}
            disabled={leaving}
          >
            {yesLabel}
          </button>

          <button
            type="button"
            className="btn btn--ghost question-scene__no"
            style={dodge}
            onClick={handleNo}
            disabled={leaving}
          >
            {noLabel}
          </button>
        </div>

        <p className="question-scene__reply" role="status" aria-live="polite">
          {reply}
        </p>

        <p className="question-scene__hint">{hint}</p>
      </div>
    </main>
  )
}
