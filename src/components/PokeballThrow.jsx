import '../css/PokeballThrow.css'

// Animação rápida de pokébola balançando, usada no botão "Aleatório"
function PokeballThrow() {
  return (
    <div className="throw-overlay">
      <div className="throw-ball" />
      <p className="throw-text">Capturando...</p>
    </div>
  )
}

export default PokeballThrow
