import Icon from './Icon'
import '../css/Header.css'

const THEME_ICONS = { light: 'sun', dark: 'moon', gameboy: 'gamepad' }
const THEME_NAMES = { light: 'Clássico', dark: 'Noite', gameboy: 'Game Boy' }

function Header({
  view,
  onChangeView,
  theme,
  onNextTheme,
  soundOn,
  onToggleSound,
  crt,
  onToggleCrt,
  favoritesCount,
}) {
  return (
    <header className="header">
      <div className="header-top">
        {/* Canto esquerdo: lente azul e LEDs, como na Pokédex dos desenhos */}
        <div className="header-cap" aria-hidden="true">
          <span className="header-lens">
            <span className="header-lens-ring">
              <span className="header-lens-core">
                <span className="header-lens-shine" />
              </span>
            </span>
          </span>
          <span className="header-leds">
            <i className="header-led red" />
            <i className="header-led yellow" />
            <i className="header-led green" />
          </span>
        </div>

        <div className="header-logo">
          <Icon name="pokeball" px={3} />
          <h1 className="header-title">POKÉDEX</h1>
        </div>

        <div className="header-tools">
          <span className="header-fav-count" title="Favoritos">
            <Icon name="star" px={2} />
            {favoritesCount}
          </span>
          <button
            className="tool-button"
            onClick={onToggleSound}
            aria-label="Ligar ou desligar o som"
            title={soundOn ? 'Som ligado' : 'Som desligado'}
          >
            <Icon name={soundOn ? 'soundOn' : 'soundOff'} px={2} />
          </button>
          <button
            className={`tool-button ${crt ? 'on' : ''}`}
            onClick={onToggleCrt}
            aria-label="Efeito de tela CRT"
            title="Efeito CRT"
          >
            <Icon name="tv" px={2} />
          </button>
          <button
            className="tool-button"
            onClick={onNextTheme}
            aria-label="Trocar tema"
            title={`Tema: ${THEME_NAMES[theme]}`}
          >
            <Icon name={THEME_ICONS[theme]} px={2} />
          </button>
        </div>
      </div>

      <nav className="header-tabs">
        <button
          className={`nav-button ${view === 'pokedex' ? 'active' : ''}`}
          onClick={() => onChangeView('pokedex')}
        >
          <Icon name="pokeball" px={2} />
          Pokémon
        </button>
        <button
          className={`nav-button ${view === 'trainers' ? 'active' : ''}`}
          onClick={() => onChangeView('trainers')}
        >
          <Icon name="trainer" px={2} />
          Treinadores
        </button>
      </nav>
    </header>
  )
}

export default Header
