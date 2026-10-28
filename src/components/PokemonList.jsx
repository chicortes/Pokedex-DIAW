import Icon from './Icon'
import PokemonCard from './PokemonCard'
import '../css/PokemonList.css'

function PokemonList({ pokemon, favorites, compareIds, onSelect, onToggleFavorite, onToggleCompare }) {
  // Tratamento para quando nenhum Pokémon é encontrado
  if (pokemon.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state-icon">
          <Icon name="question" px={6} />
        </span>
        <h2>NENHUM POKÉMON ENCONTRADO!</h2>
        <p>Tente mudar a pesquisa ou o filtro de tipo.</p>
      </div>
    )
  }

  return (
    <div className="pokemon-list">
      {pokemon.map((item, index) => (
        <PokemonCard
          key={item.id}
          pokemon={item}
          index={index}
          isFavorite={favorites.includes(item.id)}
          isCompared={compareIds.includes(item.id)}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
          onToggleCompare={onToggleCompare}
        />
      ))}
    </div>
  )
}

export default PokemonList
