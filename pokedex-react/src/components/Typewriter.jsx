import { useEffect, useState } from 'react'

// Escreve o texto letra por letra, como as caixas de diálogo dos jogos.
// Use key={text} no componente para reiniciar a digitação quando o texto mudar.
function Typewriter({ text, speed = 28 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count >= text.length) return
    const timer = setTimeout(() => setCount(count + 1), speed)
    return () => clearTimeout(timer)
  }, [count, text, speed])

  const done = count >= text.length

  return (
    <span>
      {text.slice(0, count)}
      {done && <span className="dialog-arrow" />}
    </span>
  )
}

export default Typewriter
