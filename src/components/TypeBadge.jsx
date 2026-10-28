import { TYPE_COLORS } from '../utils/pokemon'
import '../css/TypeBadge.css'

function TypeBadge({ name }) {
  return (
    <span className="type-badge" style={{ backgroundColor: TYPE_COLORS[name] }}>
      {name}
    </span>
  )
}

export default TypeBadge
