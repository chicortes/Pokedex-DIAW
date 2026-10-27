# 🎮 Pokédex Interativa - React + Vite

Trabalho prático desenvolvido em **dupla** utilizando **React** e **Vite** para a criação de uma Pokédex moderna e interativa.

## 👥 Dupla
- **Francisco de Castro Côrtes Netto**
- **Bernardo Ramos Ferreira**

---

## 🚀 Tecnologias Utilizadas

- **React** (Componentes funcionais, Hooks como `useState`, `useEffect`, Props)
- **Vite** (Empacotador e ambiente de desenvolvimento rápido)
- **CSS3 / Estilização Responsiva**
- **JavaScript (ES6+)**

---

## ✨ Funcionalidades

- **Visualização de Pokémon:** Exibição dos cards contendo ID, nome, tipos e atributos completos (HP, Ataque, Defesa, Ataque Especial, Defesa Especial e Velocidade).
- **Pesquisa em Tempo Real:** Filtro rápido por **Nome** ou **ID**.
- **Filtro por Tipo:** Seleção de Pokémon com base em seus elementos (Fire, Water, Grass, Electric, etc.).
- **Detalhes do Pokémon:** Área detalhada ou modal para visualização aprofundada dos atributos (com barras de progresso).
- **Seção de Treinadores:** Consulta interativa aos treinadores disponíveis, suas insígnias e Pokémon relacionados.
- **Identidade Visual Própria:** Layout customizado, responsivo e estilizado.

---

## 📁 Organização do Projeto

```text
pokedex-react/
├── public/
├── src/
│   ├── assets/         # Imagens e recursos visuais
│   ├── components/     # Componentes React (Card, List, SearchBar, Details, etc.)
│   ├── css/            # Arquivos de estilização por componente
│   ├── data/           # Arquivo pokedex-data.json contendo a base de dados
│   ├── App.jsx         # Componente principal
│   ├── main.jsx        # Ponto de entrada da aplicação
│   └── index.css       # Estilos globais
├── package.json
├── vite.config.js
└── README.md