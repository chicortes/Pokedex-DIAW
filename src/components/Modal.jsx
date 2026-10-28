import { useEffect } from 'react'
import Icon from './Icon'
import '../css/Modal.css'

// Modal genérico: fecha com ESC ou clicando fora da caixa
function Modal({ onClose, children, wide = false }) {
  useEffect(() => {
    function handleKey(event) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-box ${wide ? 'wide' : ''}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          <Icon name="close" px={2} />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
