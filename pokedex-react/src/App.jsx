import { useEffect, useMemo, useRef, useState } from 'react'
import data from './data/pokedex-data.json'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import TrainersPanel from './components/TrainersPanel'
import CompareBar from './components/CompareBar'
import CompareModal from './components/CompareModal'
import BootScreen from './components/BootScreen'
import PokeballThrow from './components/PokeballThrow'
import { playBlip, playSelect, setSoundEnabled } from './utils/sound'
import './css/App.css'

const THEMES = ['light', 'dark', 'gameboy']

// Lê um valor do localStorage com segurança (se der erro, usa o padrão)
function loadStored(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function App() {
  const { pokemon, types, trainers } = data

  // ----- Estados -----
  const [booted, setBooted] = useState(false)
  const [view, setView] = useState('pokedex')
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState('id')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [encounter, setEncounter] = useState(false) // true quando veio do botão aleatório
  const [throwing, setThrowing] = useState(false)
  const [favorites, setFavorites] = useState(() => loadStored('pokedex-favorites', []))
  const [compareIds, setCompareIds] = useState([])
  const [showCompare, setShowCompare] = useState(false)
  const [soundOn, setSoundOn] = useState(() => loadStored('pokedex-sound', true))
  const [crt, setCrt] = useState(() => loadStored('pokedex-crt', false))
  const [theme, setTheme] = useState(() => {
    const stored = loadStored('pokedex-theme', 'light')
    return THEMES.includes(stored) ? stored : 'light'
  })

  const throwTimer = useRef(null)

  // ----- Efeitos -----
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('pokedex-theme', JSON.stringify(theme))
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-crt', crt ? 'on' : 'off')
    localStorage.setItem('pokedex-crt', JSON.stringify(crt))
  }, [crt])

  useEffect(() => {
    setSoundEnabled(soundOn)
    localStorage.setItem('pokedex-sound', JSON.stringify(soundOn))
  }, [soundOn])

  useEffect(() => {
    localStorage.setItem('pokedex-favorites', JSON.stringify(favorites))
  }, [favorites])

  // Limpa o timer da pokébola se o componente sair da tela
  useEffect(() => () => clearTimeout(throwTimer.current), [])

  // ----- Estado derivado: lista filtrada e ordenada -----
  const visiblePokemon = useMemo(() => {
    const query = search.trim().toLowerCase()

    const filtered = pokemon.filter((p) => {
      const matchesSearch =
        query === '' || p.name.toLowerCase().includes(query) || String(p.id).startsWith(query)

      const matchesType = selectedType === 'all' || p.types.some((t) => t.name === selectedType)

      // "Typeless" também precisa achar o Mew, que tem types vazio no JSON
      const matchesTypeless = selectedType === 'Typeless' && p.types.length === 0

      const matchesFavorite = !onlyFavorites || favorites.includes(p.id)

      return matchesSearch && (matchesType || matchesTypeless) && matchesFavorite
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'id') return a.id - b.id
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return b.stats[sortBy] - a.stats[sortBy] // atributos: do maior para o menor
    })
  }, [pokemon, search, selectedType, sortBy, onlyFavorites, favorites])

  // ----- Eventos -----
  function openPokemon(p) {
    setEncounter(false)
    setSelectedPokemon(p)
  }

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((f) => f !== id) : [...current, id]
    )
  }

  function toggleCompare(id) {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((c) => c !== id)
      if (current.length === 2) return [current[1], id] // mantém só os 2 últimos
      return [...current, id]
    })
  }

  // Aleatório: mostra a pokébola balançando e depois abre o Pokémon sorteado
  function pickRandom() {
    if (throwing) return
    playSelect()
    setThrowing(true)
    throwTimer.current = setTimeout(() => {
      const random = pokemon[Math.floor(Math.random() * pokemon.length)]
      setThrowing(false)
      setEncounter(true)
      setSelectedPokemon(random)
    }, 1300)
  }

  function nextTheme() {
    setTheme(THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length])
  }

  const comparedPokemon = compareIds.map((id) => pokemon.find((p) => p.id === id))

  return (
    // Um único "blip" para qualquer botão clicado no app inteiro
    <div className="app" onClick={(event) => event.target.closest('button') && playBlip()}>
      {!booted && <BootScreen onDone={() => setBooted(true)} />}

      <Header
        view={view}
        onChangeView={setView}
        theme={theme}
        onNextTheme={nextTheme}
        soundOn={soundOn}
        onToggleSound={() => setSoundOn(!soundOn)}
        crt={crt}
        onToggleCrt={() => setCrt(!crt)}
        favoritesCount={favorites.length}
      />

      <main className="app-main">
        {view === 'pokedex' ? (
          <>
            <SearchBar value={search} onChange={setSearch} />

            <Filters
              types={types}
              selectedType={selectedType}
              onSelectType={setSelectedType}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onlyFavorites={onlyFavorites}
              onToggleFavorites={() => setOnlyFavorites(!onlyFavorites)}
              onRandom={pickRandom}
            />

            <p className="results-count">
              {visiblePokemon.length} POKÉMON ENCONTRADO{visiblePokemon.length !== 1 && 'S'}
            </p>

            <PokemonList
              pokemon={visiblePokemon}
              favorites={favorites}
              compareIds={compareIds}
              onSelect={openPokemon}
              onToggleFavorite={toggleFavorite}
              onToggleCompare={toggleCompare}
            />
          </>
        ) : (
          <TrainersPanel trainers={trainers} pokemon={pokemon} onSelectPokemon={openPokemon} />
        )}
      </main>

      {throwing && <PokeballThrow />}

      {selectedPokemon && (
        <PokemonDetails
          pokemon={selectedPokemon}
          trainers={trainers}
          isFavorite={favorites.includes(selectedPokemon.id)}
          wild={encounter}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelectedPokemon(null)}
        />
      )}

      {showCompare && comparedPokemon.length === 2 && (
        <CompareModal
          first={comparedPokemon[0]}
          second={comparedPokemon[1]}
          onClose={() => setShowCompare(false)}
          onClear={() => {
            setCompareIds([])
            setShowCompare(false)
          }}
        />
      )}

      <CompareBar
        selected={comparedPokemon}
        onOpen={() => setShowCompare(true)}
        onClear={() => setCompareIds([])}
      />
    </div>
  )
}

export default App
