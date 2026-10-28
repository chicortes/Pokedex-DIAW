import { useCallback, useEffect, useState } from 'react'
import { playJingle } from '../utils/sound'
import '../css/BootScreen.css'

// Tela de abertura: a pokébola abre ao apertar START (clique, Enter ou Espaço)
function BootScreen({ onDone }) {
  const [ready, setReady] = useState(false)
  const [leaving, setLeaving] = useState(false)

  // "Carregando" falso de 2 segundos, só pelo efeito
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const start = useCallback(() => {
    if (!ready || leaving) return
    playJingle()
    setLeaving(true)
    setTimeout(onDone, 750)
  }, [ready, leaving, onDone])

  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        start()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [start])

  return (
    <div className={`boot ${leaving ? 'leaving' : ''}`}>
      <div className="boot-half boot-top" />
      <div className="boot-half boot-bottom" />

      <div className="boot-content">
        <h1 className="boot-title">POKÉDEX</h1>
        <p className="boot-subtitle">REACT EDITION</p>

        <button className={`boot-start ${ready ? 'ready' : ''}`} onClick={start} disabled={!ready}>
          <span className="boot-start-inner">{ready ? 'START' : '...'}</span>
        </button>

        <div className="boot-loader-area">
          <div className="boot-loader">
            <div className="boot-loader-fill" />
          </div>
          <p className="boot-loader-text">{ready ? 'APERTE START' : 'CARREGANDO 151 POKÉMON'}</p>
        </div>
      </div>
    </div>
  )
}

export default BootScreen
