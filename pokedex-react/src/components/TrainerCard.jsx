import Icon from './Icon'
import PokemonImage from './PokemonImage'
import TrainerImage from './TrainerImage'
import '../css/TrainerCard.css'

function TrainerCard({ trainer, team, onSelectPokemon }) {
  // Sempre mostra pelo menos 8 espaços de insígnia; os conquistados ficam acesos
  const slots = Array.from({ length: Math.max(8, trainer.badges) }, (_, i) => i < trainer.badges)

  return (
    <article className="trainer-card">
      <header className="trainer-card-header">
        <span>TRAINER CARD</span>
        <span>ID {String(trainer.id).padStart(5, '0')}</span>
      </header>

      <div className="trainer-card-main">
        <div className="trainer-photo">
          <TrainerImage name={trainer.name} />
        </div>

        <div className="trainer-info">
          <h3 className="trainer-name">{trainer.name}</h3>
          <p className="trainer-count">{team.length} Pokémon</p>
          <p className="trainer-badges-label">
            <Icon name="badge" px={2} />
            {trainer.badges} insígnias
          </p>
          <div className="trainer-badges-row">
            {slots.map((earned, i) => (
              <span key={i} className={`badge-slot ${earned ? 'earned' : ''}`} />
            ))}
          </div>
        </div>
      </div>

      <ul className="trainer-team">
        {team.map((pokemon) => (
          <li key={pokemon.id}>
            <button className="trainer-pokemon" onClick={() => onSelectPokemon(pokemon)}>
              <PokemonImage id={pokemon.id} name={pokemon.name} className="trainer-pokemon-image" scale={0.5} />
              <span>{pokemon.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default TrainerCard
