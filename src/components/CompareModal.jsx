import Icon from './Icon'
import Modal from './Modal'
import PokemonImage from './PokemonImage'
import TypeBadge from './TypeBadge'
import { getTypes, STAT_KEYS, STAT_LABELS, MAX_STAT, TYPE_COLORS, totalStats } from '../utils/pokemon'
import '../css/CompareModal.css'

function CompareModal({ first, second, onClose, onClear }) {
  return (
    <Modal onClose={onClose} wide>
      <h2 className="compare-title">
        <Icon name="swords" px={3} />
        COMPARAÇÃO
      </h2>

      <div className="compare-heads">
        {[first, second].map((pokemon) => (
          <div key={pokemon.id} className="compare-head">
            <PokemonImage id={pokemon.id} name={pokemon.name} className="compare-image" />
            <h3>{pokemon.name}</h3>
            <div className="compare-types">
              {getTypes(pokemon).map((type) => (
                <TypeBadge key={type.id} name={type.name} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="compare-rows">
        {STAT_KEYS.map((key) => {
          const a = first.stats[key]
          const b = second.stats[key]
          return (
            <div key={key} className="compare-row">
              <div className="compare-side left">
                <strong className={a > b ? 'winner' : ''}>{a}</strong>
                <div className="compare-track">
                  <div
                    className="compare-fill"
                    style={{
                      width: `${Math.min((a / MAX_STAT) * 100, 100)}%`,
                      backgroundColor: TYPE_COLORS[getTypes(first)[0].name],
                    }}
                  />
                </div>
              </div>
              <span className="compare-label">{STAT_LABELS[key]}</span>
              <div className="compare-side right">
                <div className="compare-track">
                  <div
                    className="compare-fill"
                    style={{
                      width: `${Math.min((b / MAX_STAT) * 100, 100)}%`,
                      backgroundColor: TYPE_COLORS[getTypes(second)[0].name],
                    }}
                  />
                </div>
                <strong className={b > a ? 'winner' : ''}>{b}</strong>
              </div>
            </div>
          )
        })}

        <div className="compare-row total">
          <strong className={totalStats(first) > totalStats(second) ? 'winner' : ''}>
            {totalStats(first)}
          </strong>
          <span className="compare-label">Total</span>
          <strong className={totalStats(second) > totalStats(first) ? 'winner' : ''}>
            {totalStats(second)}
          </strong>
        </div>
      </div>

      <button className="action-button" onClick={onClear}>
        Limpar comparação
      </button>
    </Modal>
  )
}

export default CompareModal
