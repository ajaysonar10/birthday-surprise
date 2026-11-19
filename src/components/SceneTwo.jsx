import { config } from '../config.js'
import QuestionScene from './QuestionScene.jsx'

const { sceneTwo } = config

export default function SceneTwo({ onNext }) {
  return <QuestionScene variant="two" accentWhole {...sceneTwo} onNext={onNext} />
}
