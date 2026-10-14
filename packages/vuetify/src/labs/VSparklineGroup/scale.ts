export interface ChartTick {
  value: number
  position: number
  label: string
}

export function tickStep (span: number, count: number): number {
  const raw = span / Math.max(count, 1)
  const power = 10 ** Math.floor(Math.log10(raw))
  const error = raw / power
  return power * (error >= 7.07 ? 10 : error >= 3.16 ? 5 : error >= 1.41 ? 2 : 1)
}

export function niceDomain (min: number, max: number, count: number): [number, number] {
  if (min === max) return [min - 1, max + 1]
  const step = tickStep(max - min, count)
  return [Math.floor(min / step) * step, Math.ceil(max / step) * step]
}

export function linearTicks (min: number, max: number, count: number): number[] {
  if (min === max) return [min]
  const step = tickStep(max - min, count)
  const ticks: number[] = []
  // toPrecision trims float drift like 0.30000000000000004
  for (let i = Math.ceil(min / step); i * step <= max + step / 1e6; i++) {
    ticks.push(Number((i * step).toPrecision(12)))
  }
  return ticks
}

export function toPosition (value: number, [min, max]: [number, number]): number {
  return max === min ? 0 : (value - min) / (max - min)
}

export interface ChartAxisConfig {
  ticks?: number
  format?: (value: number) => string
  labels?: string[]
  grid?: boolean
}
