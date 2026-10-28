import { ICONS, PALETTE } from '../utils/icons'
import '../css/Icon.css'

// Desenha um ícone pixel art como SVG. px = tamanho de cada "pixel" na tela.
// Pixels vizinhos da mesma cor viram um retângulo só, para o SVG ficar leve.
function Icon({ name, px = 2, className = '' }) {
  const rows = ICONS[name]
  const cols = Math.max(...rows.map((row) => row.length))
  const rects = []

  rows.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      const char = row[x]
      if (char === '.') {
        x++
        continue
      }
      let end = x
      while (end + 1 < row.length && row[end + 1] === char) end++
      rects.push(<rect key={`${y}-${x}`} x={x} y={y} width={end - x + 1} height={1} fill={PALETTE[char]} />)
      x = end + 1
    }
  })

  return (
    <svg
      className={`pixel-icon ${className}`}
      width={cols * px}
      height={rows.length * px}
      viewBox={`0 0 ${cols} ${rows.length}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {rects}
    </svg>
  )
}

export default Icon
