import { useState } from 'react'
import { getTrainerImageUrls } from '../utils/trainers'
import '../css/TrainerImage.css'

// Tenta cada URL da lista; se todas falharem, mostra a inicial do treinador
function TrainerImage({ name }) {
  const urls = getTrainerImageUrls(name)
  const [index, setIndex] = useState(0)

  if (index >= urls.length) {
    return <div className="trainer-image-fallback">{name.charAt(0)}</div>
  }

  return (
    <img
      className="trainer-image"
      src={urls[index]}
      alt={`Treinador ${name}`}
      onError={() => setIndex(index + 1)}
    />
  )
}

export default TrainerImage
