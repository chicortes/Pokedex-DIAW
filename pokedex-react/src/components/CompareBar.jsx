import Icon from './Icon'
import '../css/CompareBar.css'

// Barra fixa no rodapé que aparece quando há Pokémon selecionados para comparar
function CompareBar({ selected, onOpen, onClear }) {
  if (selected.length === 0) return null

  return (
    <div className="compare-bar">
      <span>
        <Icon name="swords" px={2} />
        Comparar: {selected.map((p) => p.name).join(' vs ')}
        {selected.length === 1 && ' (escolha mais um)'}
      </span>
      <div className="compare-bar-buttons">
        {selected.length === 2 && (
          <button className="action-button active" onClick={onOpen}>
            Comparar agora
          </button>
        )}
        <button className="action-button" onClick={onClear}>
          Limpar
        </button>
      </div>
    </div>
  )
}

export default CompareBar
