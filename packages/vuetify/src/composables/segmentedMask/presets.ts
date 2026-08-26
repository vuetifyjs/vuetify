// Types
import type { Segment, SegmentParts, ValueSegment } from './types'

function lastDayInMonth (parts: SegmentParts) {
  let days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][Number(parts.m) - 1] ?? 31
  const year = Number(parts.y)
  const isLeapYear = !(year % 4) && (year % 100 || !(year % 400))
  if (days === 29 && parts.y?.length === 4 && !isLeapYear) {
    days = 28
  }
  return days
}

export function dateSegments (order: string, separator: string, fixYear?: (year: number) => number): Segment[] {
  const value: Record<string, ValueSegment> = {
    y: { type: 'value', key: 'y', size: 4, max: 9999, close: digits => String(fixYear?.(Number(digits)) ?? digits) },
    m: { type: 'value', key: 'm', size: 2, min: 1, max: 12 },
    d: { type: 'value', key: 'd', size: 2, min: 1, max: 31, softMax: lastDayInMonth },
  }

  return [...order].flatMap((key, i) => [
    ...i ? [{ type: 'separator', value: separator } as const] : [],
    value[key],
  ])
}
