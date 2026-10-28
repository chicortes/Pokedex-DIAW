// Sons retrô gerados na hora com Web Audio (não precisa de nenhum arquivo de áudio)
let enabled = true
let ctx = null

function getContext() {
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return null
    ctx = new AudioCtx()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

export function setSoundEnabled(value) {
  enabled = value
}

function tone(freq, delay, duration, type = 'square', volume = 0.04) {
  if (!enabled) return
  const audio = getContext()
  if (!audio) return

  const start = audio.currentTime + delay
  const osc = audio.createOscillator()
  const gain = audio.createGain()

  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(volume, start)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)

  osc.connect(gain)
  gain.connect(audio.destination)
  osc.start(start)
  osc.stop(start + duration + 0.02)
}

export function playBlip() {
  tone(880, 0, 0.06)
}

export function playSelect() {
  tone(660, 0, 0.07)
  tone(990, 0.07, 0.1)
}

export function playJingle() {
  ;[523, 659, 784, 1047, 784, 1047].forEach((freq, i) => tone(freq, i * 0.1, 0.14))
}
