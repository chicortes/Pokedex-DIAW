import TrainerCard from './TrainerCard'
import '../css/TrainersPanel.css'

function TrainersPanel({ trainers, pokemon, onSelectPokemon }) {
  return (
    <section className="trainers-panel">
      <h2 className="section-title">Treinadores</h2>
      <div className="trainers-grid">
        {trainers.map((trainer) => {
          // Converte a lista de IDs nos objetos Pokémon correspondentes
          const team = trainer.pokemonIds
            .map((id) => pokemon.find((p) => p.id === id))
            .filter(Boolean)

          return (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
              team={team}
              onSelectPokemon={onSelectPokemon}
            />
          )
        })}
      </div>
    </section>
  )
}

export default TrainersPanel
