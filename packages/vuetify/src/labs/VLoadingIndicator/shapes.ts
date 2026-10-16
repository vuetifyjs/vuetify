// Shapes are radius-per-angle approximations of M3 MaterialShapes, not their exact rounded polygons.
// Sampling every shape at the same angles turns morphing into a plain lerp of radii.
const POINTS = 96
const angles = Array.from({ length: POINTS }, (_, i) => i / POINTS * Math.PI * 2)

export const MORPH_INTERVAL = 650
const ROTATION_DURATION = 4666

function wave (lobes: number, depth: number) {
  return (a: number) => 1 + depth * Math.cos(lobes * a)
}

function superellipse (width: number, height: number, power: number) {
  const tilt = -Math.PI / 4
  return (a: number) => (
    Math.abs(Math.cos(a - tilt) / width) ** power +
    Math.abs(Math.sin(a - tilt) / height) ** power
  ) ** (-1 / power)
}

function shape (radius: (angle: number) => number) {
  const radii = angles.map(radius)
  const max = Math.max(...radii)
  return radii.map(r => r / max)
}

export const shapes = [
  shape(wave(10, 0.1)), // soft burst
  shape(wave(9, 0.07)), // 9-sided cookie
  shape(wave(5, 0.12)), // pentagon
  shape(superellipse(1, 0.55, 3)), // pill
  shape(wave(8, 0.09)), // sunny
  shape(wave(4, 0.15)), // 4-sided cookie
  shape(superellipse(1, 0.7, 2)), // oval
]

// Closed-form damped spring (damping ratio 0.6, stiffness 200, mass 1), settles within MORPH_INTERVAL
export function spring (seconds: number) {
  const omega = Math.sqrt(200)
  const decay = 0.6 * omega
  const damped = omega * Math.sqrt(1 - 0.6 ** 2)
  return 1 - Math.exp(-decay * seconds) * (Math.cos(damped * seconds) + decay / damped * Math.sin(damped * seconds))
}

export function morphPath (elapsed: number) {
  const step = Math.floor(elapsed / MORPH_INTERVAL)
  const progress = spring((elapsed % MORPH_INTERVAL) / 1000)
  const from = shapes[step % shapes.length]
  const to = shapes[(step + 1) % shapes.length]
  const rotation = (elapsed / ROTATION_DURATION + (step + progress) / 4) * Math.PI * 2

  return angles.map((a, i) => {
    const r = from[i] + (to[i] - from[i]) * progress
    const x = r * Math.cos(a + rotation)
    const y = r * Math.sin(a + rotation)
    return `${i ? 'L' : 'M'}${x.toFixed(3)} ${y.toFixed(3)}`
  }).join('') + 'Z'
}
