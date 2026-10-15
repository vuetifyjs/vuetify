// Utilities
import { createRange } from '@/util'

function round (value: number) {
  return Math.round(value * 1000) / 1000
}

export function hasWave (value: number) {
  return value > 10 && value < 95
}

export function linearWavePath (start: number, end: number, center: number, amplitude: number, wavelength: number, phase = start) {
  const waveNumber = 2 * Math.PI / wavelength
  const y = (x: number) => center + amplitude * Math.sin(waveNumber * (x - phase))
  const slope = (x: number) => amplitude * waveNumber * Math.cos(waveNumber * (x - phase))

  let path = `M ${round(start)} ${round(y(start))}`
  for (let x = start; x < end; x += wavelength / 4) {
    const next = Math.min(x + wavelength / 4, end)
    const third = (next - x) / 3
    path += ` C ${round(x + third)} ${round(y(x) + slope(x) * third)} ${round(next - third)} ${round(y(next) - slope(next) * third)} ${round(next)} ${round(y(next))}`
  }
  return path
}

export function circularWavePath (center: number, radius: number, amplitude: number, waves: number) {
  const count = waves * 4
  const step = 2 * Math.PI / count

  function point (index: number) {
    const angle = index * step
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    const r = radius + amplitude * Math.sin(waves * angle)
    const dr = amplitude * waves * Math.cos(waves * angle)
    // tangent scaled to a third of the segment = cubic Bézier control point offset
    return {
      x: center + r * cos,
      y: center + r * sin,
      dx: (dr * cos - r * sin) * step / 3,
      dy: (dr * sin + r * cos) * step / 3,
    }
  }

  const start = point(0)
  // one extra wave so the dash can slide forward while the path rotates back
  return `M ${round(start.x)} ${round(start.y)}` + createRange(count + 4).map(index => {
    const from = point(index)
    const to = point(index + 1)
    return ` C ${round(from.x + from.dx)} ${round(from.y + from.dy)} ${round(to.x - to.dx)} ${round(to.y - to.dy)} ${round(to.x)} ${round(to.y)}`
  }).join('')
}
