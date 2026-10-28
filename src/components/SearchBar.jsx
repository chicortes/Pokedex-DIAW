import Icon from './Icon'
import '../css/SearchBar.css'

function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrap">
      <Icon name="search" px={3} className="search-icon" />
      <input
        className="search-bar"
        type="text"
        placeholder="Pesquisar Pokémon por nome ou ID..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}

export default SearchBar
