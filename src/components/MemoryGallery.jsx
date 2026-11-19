import { useEffect, useRef, useState } from 'react'
import { Decorations } from './Decorations.jsx'
import { config } from '../config.js'
import './MemoryGallery.css'

/**
 * Scene 3 — the sibling memory gallery.
 *
 * Photos themselves are owned by App so they survive moving between
 * scenes; this component only decides which one is on stage. Everything
 * is sized against the viewport so the scene never scrolls.
 */

const { gallery } = config

// The last word of the heading gets the gradient accent, matching the
// question scenes.
const titleCut = gallery.title.lastIndexOf(' ')
const titleLead = gallery.title.slice(0, titleCut)
const titleAccent = gallery.title.slice(titleCut + 1)

function ChevronIcon({ direction }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d={direction === 'prev' ? 'M14.5 5.5 8 12l6.5 6.5' : 'M9.5 5.5 16 12l-6.5 6.5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AddIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 6v12M6 12h12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function PhotoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect
        x="3"
        y="4.5"
        width="18"
        height="15"
        rx="3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="9" cy="10" r="1.7" fill="currentColor" />
      <path
        d="M4.8 17.2l4.4-4.2 3 2.9 3-2.4 3.9 3.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function MemoryGallery({ photos, onAdd, onNext }) {
  const [active, setActive] = useState(0)
  const [dragging, setDragging] = useState(false)

  const inputRef = useRef(null)
  const stripRef = useRef(null)
  const thumbRefs = useRef([])

  // Never point past the end, even if the list changes under us.
  const index = photos.length === 0 ? 0 : Math.min(active, photos.length - 1)

  // Keep the active thumbnail centred in its own horizontal strip.
  useEffect(() => {
    const strip = stripRef.current
    const thumb = thumbRefs.current[index]

    if (!strip || !thumb) return

    strip.scrollTo({
      left: thumb.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2,
      behavior: 'smooth',
    })
  }, [index, photos.length])

  const openPicker = () => inputRef.current?.click()

  const handleFiles = (fileList) => {
    if (!fileList || fileList.length === 0) return

    const added = onAdd(fileList)
    if (added && added.length > 0 && photos.length > 0) {
      // Jump to the first photo of the batch that was just added.
      setActive(photos.length)
    }
  }

  const handleChange = (event) => {
    handleFiles(event.target.files)
    // Allow picking the same file again later.
    event.target.value = ''
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragging(false)
    handleFiles(event.dataTransfer?.files)
  }

  const step = (delta) => {
    if (photos.length < 2) return

    setActive((index) => (index + delta + photos.length) % photos.length)
  }

  const current = photos[index]
  const hasPhotos = photos.length > 0

  return (
    <main className="scene scene--memories" aria-labelledby="memories-title">
      <Decorations variant="dark" />

      <div className="memories">
        <header className="memories__head">
          <p className="eyebrow eyebrow--dark">{gallery.eyebrow}</p>
          <h1 id="memories-title" className="memories__title display display--dark">
            {titleLead} <span className="memories__title-accent">{titleAccent}</span>
          </h1>
          <p className="memories__subtitle">{gallery.subtitle}</p>
        </header>

        <div
          className={`memories__stage${dragging ? ' is-dragging' : ''}`}
          onDragOver={(event) => {
            event.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleChange}
          />

          {hasPhotos ? (
            <>
              <figure key={current.id} className="memories__frame">
                <img
                  className="memories__image"
                  src={current.url}
                  alt={`${gallery.counterLabel} ${index + 1} of ${photos.length}`}
                />
                <figcaption className="memories__caption">
                  {gallery.counterLabel} {index + 1} / {photos.length}
                </figcaption>
              </figure>

              {photos.length > 1 && (
                <>
                  <button
                    type="button"
                    className="memories__nav memories__nav--prev"
                    onClick={() => step(-1)}
                    aria-label={gallery.prevLabel}
                  >
                    <ChevronIcon direction="prev" />
                  </button>
                  <button
                    type="button"
                    className="memories__nav memories__nav--next"
                    onClick={() => step(1)}
                    aria-label={gallery.nextLabel}
                  >
                    <ChevronIcon direction="next" />
                  </button>
                </>
              )}
            </>
          ) : (
            <button type="button" className="memories__empty" onClick={openPicker}>
              <span className="memories__empty-icon" aria-hidden="true">
                <PhotoIcon />
              </span>
              <span className="memories__empty-title">{gallery.emptyTitle}</span>
              <span className="memories__empty-hint">{gallery.emptyHint}</span>
            </button>
          )}
        </div>

        {hasPhotos && (
          <div className="memories__strip" ref={stripRef}>
            {photos.map((photo, i) => (
              <button
                key={photo.id}
                ref={(element) => {
                  thumbRefs.current[i] = element
                }}
                type="button"
                className={`memories__thumb${i === index ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Show ${gallery.counterLabel.toLowerCase()} ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
              >
                <img src={photo.url} alt="" />
              </button>
            ))}
          </div>
        )}

        <div className="memories__actions">
          <button
            type="button"
            className="btn btn--ghost memories__add"
            onClick={openPicker}
          >
            <AddIcon />
            {gallery.addLabel}
          </button>
          <button type="button" className="btn btn--primary" onClick={onNext}>
            {gallery.continueLabel}
          </button>
        </div>
      </div>
    </main>
  )
}
