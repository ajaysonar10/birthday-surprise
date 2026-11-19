import { useCallback, useEffect, useRef, useState } from 'react'
import SceneOne from './components/SceneOne.jsx'
import SceneTwo from './components/SceneTwo.jsx'
import MemoryGallery from './components/MemoryGallery.jsx'
import LetterScene from './components/LetterScene.jsx'
import DoorScene from './components/DoorScene.jsx'
import { config, withName } from './config.js'
import './App.css'

const SCENE_COUNT = 5

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M14.5 5.5 8 12l6.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function App() {
  const [scene, setScene] = useState(1)
  const [direction, setDirection] = useState('forward')
  const [photos, setPhotos] = useState([])

  const photosRef = useRef(photos)
  const photoId = useRef(0)

  useEffect(() => {
    photosRef.current = photos
  }, [photos])

  useEffect(() => {
    document.title = withName(config.site.title)
  }, [])

  // Release the object URLs the gallery created when the app goes away.
  useEffect(() => {
    return () => {
      photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.url))
    }
  }, [])

  /* Photos live here, not in Scene 3, so they survive moving between
     scenes. Only local object URLs are created — nothing is uploaded. */
  const addPhotos = useCallback((fileList) => {
    const files = Array.from(fileList ?? []).filter((file) =>
      file.type.startsWith('image/'),
    )

    if (files.length === 0) return []

    const added = files.map((file) => {
      photoId.current += 1
      return {
        id: `photo-${photoId.current}`,
        url: URL.createObjectURL(file),
      }
    })

    setPhotos((current) => [...current, ...added])
    return added
  }, [])

  const goTo = useCallback(
    (next) => {
      const clamped = Math.max(1, Math.min(SCENE_COUNT, next))
      if (clamped === scene) return

      setDirection(clamped > scene ? 'forward' : 'back')
      setScene(clamped)
    },
    [scene],
  )

  /* Replay starts the whole experience over and releases the photo URLs
     it was holding, so nothing leaks between playthroughs. */
  const restart = useCallback(() => {
    photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.url))
    photosRef.current = []
    setPhotos([])
    setDirection('back')
    setScene(1)
  }, [])

  return (
    <div className="app">
      <div key={scene} className={`app__scene app__scene--${direction}`}>
        {scene === 1 && <SceneOne onNext={() => goTo(2)} />}
        {scene === 2 && <SceneTwo onNext={() => goTo(3)} />}
        {scene === 3 && (
          <MemoryGallery
            photos={photos}
            onAdd={addPhotos}
            onNext={() => goTo(4)}
          />
        )}
        {scene === 4 && <LetterScene onNext={() => goTo(5)} />}
        {scene === 5 && <DoorScene onReplay={restart} />}

        {scene > 1 && (
          <button
            type="button"
            className="scene-back"
            onClick={() => goTo(scene - 1)}
          >
            <BackIcon />
            <span>Back</span>
          </button>
        )}
      </div>
    </div>
  )
}
