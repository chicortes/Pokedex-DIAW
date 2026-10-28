import { useState } from 'react'
import Icon from './Icon'
import Modal from './Modal'
import PokemonImage from './PokemonImage'
import TypeBadge from './TypeBadge'
import StatBar from './StatBar'
import Typewriter from './Typewriter'
import { getTypes, formatId, STAT_KEYS, STAT_LABELS, TYPE_COLORS, totalStats } from '../utils/pokemon'
import '../css/PokemonDetails.css'

function PokemonDetails({ pokemon, trainers, isFavorite, wild, onToggleFavorite, onClose }) {
  const [shiny, setShiny] = useState(false)

  const types = getTypes(pokemon)
  const color = TYPE_COLORS[types[0].name]

  // Treinadores que possuem esse Pokémon (estado derivado dos dados)
  const owners = trainers.filter((trainer) => trainer.pokemonIds.includes(pokemon.id))

  // Texto da caixa de diálogo
  const typeText = types.map((type) => type.name).join('/')
  const ownersText =
    owners.length > 0 ? ` Treinadores: ${owners.map((o) => o.name).join(', ')}.` : ' Nenhum treinador o possui.'
  const dialogText = wild
    ? `Um ${pokemon.name} selvagem apareceu! Tipo ${typeText}.${ownersText}`
    : `${pokemon.name}, Pokémon do tipo ${typeText}. Soma dos atributos: ${totalStats(pokemon)}.${ownersText}`

  return (
    <Modal onClose={onClose}>
      <div className="details" style={{ '--card-color': color }}>
        <div className="details-hero">
          <PokemonImage
            id={pokemon.id}
            name={pokemon.name}
            className="details-image"
            scale={3}
            animated
            shiny={shiny}
          />
        </div>

        <div className="details-body">
          <div className="details-title-row">
            <span className="details-id">No.{formatId(pokemon.id).slice(1)}</span>
            {shiny && (
              <span className="details-shiny-tag">
                <Icon name="sparkle" px={2} />
                SHINY
              </span>
            )}
          </div>
          <h2 className="details-name">{pokemon.name}</h2>

          <div className="details-types">
            {types.map((type) => (
              <TypeBadge key={type.id} name={type.name} />
            ))}
          </div>

          <div className="details-stats">
            {STAT_KEYS.map((key) => (
              <StatBar key={key} label={STAT_LABELS[key]} value={pokemon.stats[key]} color={color} />
            ))}
          </div>

          <div className="dialog">
            <Typewriter key={dialogText} text={dialogText} />
          </div>

          <div className="details-buttons">
            <button
              className={`action-button ${isFavorite ? 'active' : ''}`}
              onClick={() => onToggleFavorite(pokemon.id)}
            >
              <Icon name={isFavorite ? 'star' : 'starOff'} px={2} />
              {isFavorite ? 'Favorito' : 'Favoritar'}
            </button>
            <button className={`action-button ${shiny ? 'active' : ''}`} onClick={() => setShiny(!shiny)}>
              <Icon name="sparkle" px={2} />
              Shiny
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default PokemonDetails
