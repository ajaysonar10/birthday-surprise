import { useEffect } from 'react'
import WelcomeScreen from './components/WelcomeScreen.jsx'
import LetterSection from './components/LetterSection.jsx'
import SurpriseSection from './components/SurpriseSection.jsx'
import { config } from './config.js'
import './App.css'

function App() {
  useEffect(() => {
    document.title = `Happy Birthday, ${config.person.name}! 🎉`
  }, [])

  return (
    <>
      <WelcomeScreen />
      <LetterSection />
      <SurpriseSection />
    </>
  )
}

export default App
