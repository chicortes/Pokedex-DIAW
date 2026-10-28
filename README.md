# 🎮 Pokédex React + Vite

Pokédex interativa feita para a **Atividade 03** (DIAW, PUC Minas), usando **React + Vite**.

Dupla : Bernardo Ramos Ferreira e Francisco de Castro Côrtes Netto

## ▶️ Como executar

```bash
npm install
npm run dev
```

Depois abra no navegador: **http://localhost:5173**

Para gerar a versão de produção: `npm run build`.

## ✅ Funcionalidades

- Lista com os 151 Pokémon (ID, nome, tipos e os 6 atributos em cada card)
- Pesquisa por **nome** ou **ID**, atualizando enquanto digita
- Filtro por **tipo** (tipos lidos do `pokedex-data.json`)
- Detalhes do Pokémon em **modal**, com barras de atributos e caixa de diálogo com texto digitando
- Área de **Treinadores** (cartão com foto, insígnias e Pokémon de cada um)
- Mensagem quando nenhum Pokémon é encontrado
- Layout responsivo
- **Desafios opcionais:** favoritos (salvos no `localStorage`), comparação de dois Pokémon, ordenação (HP, Attack, Defense, Special Attack, Special Defense, Speed, Nome, ID), Pokémon aleatório e temas

## 🎮 Identidade visual: Pokédex 8-bit

Todo o site é em **pixel art**, como um jogo de Game Boy:

- **Tela de abertura** com pokébola que se abre ao apertar START (clique, Enter ou Espaço)
- **Sprites pixel art** dos Pokémon; ao passar o mouse no card o sprite vira o **GIF animado** (geração 5)
- **Shiny:** botão no modal de detalhes para ver a versão alternativa
- **Aleatório:** a pokébola balança e aparece "Um Pokémon selvagem apareceu!"
- **3 temas** (botão no cabeçalho): Clássico, Noite e **Game Boy** (4 tons de verde)
- **Efeito CRT** (scanlines) opcional
- **Sons retrô** gerados com Web Audio (botão 🔊 liga e desliga)
- Bordas "pixeladas" feitas só com `box-shadow`, barras de atributos em blocos e animações em degraus (`steps()`)
- Fontes pixel: Press Start 2P e VT323 (Google Fonts)

## 🌐 Imagens

- **Pokémon (pixel art):** sprites da **PokéAPI**
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`
  e GIFs animados em `.../versions/generation-v/black-white/animated/{id}.gif`
- **Treinadores:** sprites do **Pokémon Showdown**
  `https://play.pokemonshowdown.com/sprites/trainers/{nome}.png`
  (o mapeamento treinador -> arquivo fica em `src/utils/trainers.js`)

Se alguma imagem não carregar, o app mostra um ícone ou a inicial do treinador e continua funcionando só com os dados do JSON.

## 📁 Dados

Os dados ficam em `src/data/pokedex-data.json` e são importados direto no `App.jsx`.

## 🧩 Organização

```text
src/
├── components/   # componentes React (Header, SearchBar, Filters, PokemonList, PokemonCard, PokemonDetails, ...)
├── css/          # um arquivo CSS por componente (o tema fica em index.css)
├── data/         # pokedex-data.json
├── utils/        # tipos, rótulos, URLs dos sprites, sons retrô
├── App.jsx       # estados principais e lógica de filtro/ordenação
├── main.jsx
└── index.css     # variáveis de tema e reset
```

## 🛠️ Tecnologias

React 18, Vite 5, CSS puro.
