import Icon from './Icon'
import { TYPE_COLORS } from '../utils/pokemon'
import '../css/Filters.css'

const SORT_OPTIONS = [
  { value: 'id', label: 'ID' },
  { value: 'name', label: 'Nome' },
  { value: 'hp', label: 'HP' },
  { value: 'attack', label: 'Attack' },
  { value: 'defense', label: 'Defense' },
  { value: 'specialAttack', label: 'Special Attack' },
  { value: 'specialDefense', label: 'Special Defense' },
  { value: 'speed', label: 'Speed' },
]

function Filters({
  types,
  selectedType,
  onSelectType,
  sortBy,
  onSortChange,
  onlyFavorites,
  onToggleFavorites,
  onRandom,
}) {
  return (
    <section className="filters">
      <div className="filters-types">
        <button
          className={`type-chip ${selectedType === 'all' ? 'active' : ''}`}
          onClick={() => onSelectType('all')}
        >
          Todos
        </button>

        {types.map((type) => (
          <button
            key={type.id}
            className={`type-chip ${selectedType === type.name ? 'active' : ''}`}
            style={{ '--chip-color': TYPE_COLORS[type.name] }}
            onClick={() => onSelectType(type.name)}
          >
            {type.name}
          </button>
        ))}
      </div>

      <div className="filters-row">
        <label className="filters-sort">
          Ordenar por
          <select value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <button
          className={`action-button ${onlyFavorites ? 'active' : ''}`}
          onClick={onToggleFavorites}
        >
          <Icon name="star" px={2} />
          Só favoritos
        </button>

        <button className="action-button" onClick={onRandom}>
          <Icon name="dice" px={2} />
          Aleatório
        </button>
      </div>
    </section>
  )
}

export default Filters
