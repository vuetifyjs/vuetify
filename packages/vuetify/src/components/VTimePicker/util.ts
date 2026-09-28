// Types
import type { Period } from './shared'

export function pad (n: string | number, length = 2) {
  return String(n).padStart(length, '0')
}

export function convert24to12 (hour: number) {
  return hour ? ((hour - 1) % 12 + 1) : 12
}

export function convert12to24 (hour: number, period: Period) {
  return hour % 12 + (period === 'pm' ? 12 : 0)
}

export function extractInteger (v: string): number | null {
  const digits = v.replaceAll(/\D/g, '')
  return digits.length > 0
    ? Number(digits)
    : null
}

export function incrementHour (hour: number, increment: boolean, period: Period | null) {
  if (period) {
    if (hour === 12 && increment) { return { value: 1 } }
    if (hour === 11 && increment) { return { value: 12, togglePeriod: true } }
    if (hour === 12 && !increment) { return { value: 11, togglePeriod: true } }
    if (hour === 1 && !increment) { return { value: 12 } }
  } else {
    if (hour === 23 && increment) { return { value: 0 } }
    if (hour === 0 && !increment) { return { value: 23 } }
  }
  return { value: hour + (increment ? 1 : -1) }
}

export function incrementMinuteOrSecond (val: number, increment: boolean) {
  if (val === 59 && increment) return 0
  if (val === 0 && !increment) return 59
  return val + (increment ? 1 : -1)
}
