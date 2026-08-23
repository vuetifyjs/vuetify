// Types
import type { Segment, SegmentParts, ValueSegment } from './types'

function daysInMonth (parts: SegmentParts) {
  const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][Number(parts.m) - 1] ?? 31
  const year = Number(parts.y)

  // February keeps the 29th until a whole year rules it out
  return days === 29 && parts.y?.length === 4 && (year % 4 || (!(year % 100) && year % 400)) ? 28 : days
}

export function dateSegments (order: string, separator: string, fixYear?: (year: number) => number): Segment[] {
  const value: Record<string, ValueSegment> = {
    y: { type: 'value', key: 'y', size: 4, max: 9999, close: digits => String(fixYear?.(Number(digits)) ?? digits) },
    m: { type: 'value', key: 'm', size: 2, min: 1, max: 12 },
    d: { type: 'value', key: 'd', size: 2, min: 1, max: 31, softMax: daysInMonth },
  }

  return [...order].flatMap((key, i) => [
    ...i ? [{ type: 'separator', value: separator } as const] : [],
    value[key],
  ])
}
