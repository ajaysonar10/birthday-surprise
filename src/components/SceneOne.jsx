import { config } from '../config.js'
import QuestionScene from './QuestionScene.jsx'

const { sceneOne } = config

export default function SceneOne({ onNext }) {
  return <QuestionScene variant="one" {...sceneOne} onNext={onNext} />
}
