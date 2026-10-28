// Sprites de treinadores do Pokémon Showdown.
// Cada treinador tem uma lista de nomes de arquivo possíveis: se o primeiro
// não existir no Showdown, o componente tenta o próximo automaticamente.
// Para corrigir uma imagem errada, basta editar o nome aqui.
const SHOWDOWN_TRAINERS_URL = 'https://play.pokemonshowdown.com/sprites/trainers'

const TRAINER_SPRITES = {
  Ash: ['ash', 'red'],
  Brock: ['brock'],
  Misty: ['misty'],
  'Lt. Surge': ['ltsurge', 'surge'],
  Erika: ['erika'],
  Koga: ['koga'],
  Sabrina: ['sabrina'],
  Blaine: ['blaine'],
  Giovanni: ['giovanni'],
  Gary: ['blue', 'gary'],
  'Team Rocket': ['teamrocket', 'rocketgrunt', 'rocket'],
  Lance: ['lance'],
}

export function getTrainerImageUrls(name) {
  const files = TRAINER_SPRITES[name] ?? [name.toLowerCase().replace(/[^a-z0-9]/g, '')]
  return files.map((file) => `${SHOWDOWN_TRAINERS_URL}/${file}.png`)
}
