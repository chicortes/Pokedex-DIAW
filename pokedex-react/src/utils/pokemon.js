// Cores dos tipos: cada tipo aponta para uma variável CSS (--type-fire, ...),
// definida em index.css. Assim cada tema (clássico, noite, Game Boy) troca as cores.
const TYPE_NAMES = [
  'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground',
  'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dark', 'Dragon', 'Steel', 'Typeless',
]

export const TYPE_COLORS = Object.fromEntries(
  TYPE_NAMES.map((name) => [name, `var(--type-${name.toLowerCase()})`])
)

// Rótulos em português para os atributos
export const STAT_LABELS = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defesa',
  specialAttack: 'Ataque Esp.',
  specialDefense: 'Defesa Esp.',
  speed: 'Velocidade',
}

// Versões curtas para caber nos cards da lista
export const STAT_SHORT = {
  hp: 'HP',
  attack: 'ATQ',
  defense: 'DEF',
  specialAttack: 'ATQ.E',
  specialDefense: 'DEF.E',
  speed: 'VEL',
}

export const STAT_KEYS = Object.keys(STAT_LABELS)

// Valor máximo usado para calcular a largura das barras
export const MAX_STAT = 160

// Alguns Pokémon (ex: Mew) vêm com a lista de tipos vazia no JSON
export function getTypes(pokemon) {
  return pokemon.types.length > 0 ? pokemon.types : [{ id: 0, name: 'Typeless' }]
}

export function formatId(id) {
  return `#${String(id).padStart(3, '0')}`
}

const SPRITES = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

// Lista de URLs em ordem de preferência (a primeira que carregar é usada).
// animated: GIF animado da geração 5 (pixel art). Se não existir, cai no sprite estático.
export function getSpriteUrls(id, { animated = false, shiny = false } = {}) {
  const shinyPath = shiny ? 'shiny/' : ''
  const still = `${SPRITES}/${shinyPath}${id}.png`
  const moving = `${SPRITES}/versions/generation-v/black-white/animated/${shinyPath}${id}.gif`
  return animated ? [moving, still] : [still]
}

export function totalStats(pokemon) {
  return STAT_KEYS.reduce((sum, key) => sum + pokemon.stats[key], 0)
}
