import { useState } from 'react'
import Icon from './Icon'
import { getSpriteUrls } from '../utils/pokemon'
import '../css/PokemonImage.css'

// Mostra o sprite pixel art do Pokémon.
// scale: multiplicador do tamanho original (2 = dobro, mantém os pixels nítidos)
// animated: usa o GIF animado; se não existir ou falhar, cai no sprite estático
function PokemonImage({ id, name, className = '', scale = 2, animated = false, shiny = false }) {
  const [failed, setFailed] = useState([])
  const [naturalWidth, setNaturalWidth] = useState(null)

  const urls = getSpriteUrls(id, { animated, shiny })
  const url = urls.find((candidate) => !failed.includes(candidate))

  // Se nenhuma imagem carregou, mostra uma pokébola no lugar
  if (!url) {
    return <div className={`pokemon-image-fallback ${className}`}>
        <Icon name="pokeball" px={6} />
      </div>
  }

  return (
    <img
      className={`pokemon-image ${className}`}
      src={url}
      alt={name}
      loading="lazy"
      style={naturalWidth ? { width: naturalWidth * scale } : undefined}
      onLoad={(event) => setNaturalWidth(event.target.naturalWidth)}
      onError={() => setFailed((current) => [...current, url])}
    />
  )
}

export default PokemonImage
