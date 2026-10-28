import { useState } from 'react'
import { getTypes, formatId, STAT_KEYS, STAT_SHORT, STAT_LABELS, TYPE_COLORS } from '../utils/pokemon'
import Icon from './Icon'
import PokemonImage from './PokemonImage'
import TypeBadge from './TypeBadge'
import '../css/PokemonCard.css'

function PokemonCard({ pokemon, index, isFavorite, isCompared, onSelect, onToggleFavorite, onToggleCompare }) {
  // Enquanto o mouse está em cima, o sprite vira o GIF animado
  const [hovered, setHovered] = useState(false)

  const types = getTypes(pokemon)
  const mainColor = TYPE_COLORS[types[0].name]

  // stopPropagation evita que o clique no botão também abra os detalhes do card
  function handleFavorite(event) {
    event.stopPropagation()
    onToggleFavorite(pokemon.id)
  }

  function handleCompare(event) {
    event.stopPropagation()
    onToggleCompare(pokemon.id)
  }

  return (
    <article
      className="pokemon-card"
      // --i faz cada card entrar um pouquinho depois do anterior
      style={{ '--card-color': mainColor, '--i': index % 12 }}
      onClick={() => onSelect(pokemon)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="pokemon-card-top">
        <span className="pokemon-card-id">No.{formatId(pokemon.id).slice(1)}</span>
        <div className="pokemon-card-buttons">
          <button
            className={`mini-button ${isCompared ? 'active' : ''}`}
            onClick={handleCompare}
            aria-label="Comparar"
            title="Comparar"
          >
            <Icon name="swords" px={2} />
          </button>
          <button
            className={`mini-button ${isFavorite ? 'active' : ''}`}
            onClick={handleFavorite}
            aria-label="Favoritar"
            title="Favoritar"
          >
            <Icon name={isFavorite ? 'star' : 'starOff'} px={2} />
          </button>
        </div>
      </div>

      <div className="pokemon-card-art">
        <PokemonImage
          id={pokemon.id}
          name={pokemon.name}
          className="pokemon-card-image"
          scale={2}
          animated={hovered}
        />
      </div>

      <h3 className="pokemon-card-name">{pokemon.name}</h3>

      <div className="pokemon-card-types">
        {types.map((type) => (
          <TypeBadge key={type.id} name={type.name} />
        ))}
      </div>

      <ul className="pokemon-card-stats">
        {STAT_KEYS.map((key) => (
          <li key={key}>
            <span title={STAT_LABELS[key]}>{STAT_SHORT[key]}</span>
            <strong>{pokemon.stats[key]}</strong>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default PokemonCard
