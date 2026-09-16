const round = (value: number) => Math.round(value * 1000) / 1000

export function linearWavePath (start: number, end: number, center: number, amplitude: number, wavelength: number) {
  const k = 2 * Math.PI / wavelength
  const y = (x: number) => center + amplitude * Math.sin(k * (x - start))
  const slope = (x: number) => amplitude * k * Math.cos(k * (x - start))

  let path = `M ${round(start)} ${round(center)}`
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
  // Point and its derivative along the angle, scaled to one third of a segment for Hermite control points
  const point = (i: number) => {
    const angle = i * step
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    const r = radius + amplitude * Math.sin(waves * angle)
    const dr = amplitude * waves * Math.cos(waves * angle)
    return {
      x: center + r * cos,
      y: center + r * sin,
      dx: (dr * cos - r * sin) * step / 3,
      dy: (dr * sin + r * cos) * step / 3,
    }
  }

  // Starts one wave early so the dash can slide back while the path rotates forward
  const start = point(-4)
  let path = `M ${round(start.x)} ${round(start.y)}`
  for (let i = -4; i < count; i++) {
    const a = point(i)
    const b = point(i + 1)
    path += ` C ${round(a.x + a.dx)} ${round(a.y + a.dy)} ${round(b.x - b.dx)} ${round(b.y - b.dy)} ${round(b.x)} ${round(b.y)}`
  }
  return path
}
