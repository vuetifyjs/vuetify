function round (value: number) {
  return Math.round(value * 1000) / 1000
}

// line segments, not béziers: Chrome dashes curves along a coarse approximation and misplaces dash ends
const STEPS_PER_WAVE = 16

function points (amplitude: number, wavelength: number, width: number) {
  const step = wavelength / STEPS_PER_WAVE
  return Array.from({ length: Math.ceil(width / step) + 1 }, (_, index) => {
    const x = Math.min(index * step, width)
    return [x, amplitude * Math.sin(2 * Math.PI * x / wavelength)]
  })
}

export function wavePath (width: number, amplitude: number, wavelength: number) {
  return `M ${points(amplitude, wavelength, width).map(point => point.map(round).join(' ')).join(' L ')}`
}

// path length per unit of x, converts horizontal distances into dash lengths
export function waveStretch (amplitude: number, wavelength: number) {
  const wave = points(amplitude, wavelength, wavelength)
  return wave.slice(1)
    .reduce((sum, [x, y], index) => sum + Math.hypot(x - wave[index][0], y - wave[index][1]), 0) / wavelength
}
