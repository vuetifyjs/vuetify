// Types
export type SegmentParts = Record<string, string>

export type ValueSegment = {
  type: 'value'
  key: string
  size: number
  min?: number | ((parts: SegmentParts) => number)
  max?: number | ((parts: SegmentParts) => number)
}

export type SeparatorSegment = {
  type: 'separator'
  value: string
}

export type Segment = ValueSegment | SeparatorSegment

function resolveLimit (
  value: number | ((parts: SegmentParts) => number) | undefined,
  parts: SegmentParts,
  fallback: number,
) {
  if (value == null) return fallback
  return typeof value === 'function' ? value(parts) : value
}

export function maskSegmentsFrom (
  segments: readonly Segment[],
  text: string,
  startIndex = 0,
): { value: string, index: number, closed: boolean } {
  let index = startIndex
  let result = ''
  let closed = false
  const parts: SegmentParts = {}

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    if (segment.type === 'separator') continue

    let digits = ''
    while (index < text.length && digits.length < segment.size && /\d/.test(text[index])) {
      digits += text[index++]
    }

    if (!digits) {
      return { value: result, index, closed: false }
    }

    const separatorStart = index
    while (index < text.length && !/\d/.test(text[index])) index++
    closed = index > separatorStart

    const max = resolveLimit(segment.max, parts, 10 ** segment.size - 1)
    const padThreshold = Math.floor(max / 10 ** (segment.size - 1))
    const overflows = digits.length === 1 && segment.size > 1 && Number(digits) > padThreshold

    if (digits.length < segment.size) {
      if (overflows || (closed && segment.size <= 2)) {
        digits = digits.padStart(segment.size, '0')
      } else if (!closed) {
        parts[segment.key] = digits
        result += digits
        return { value: result, index, closed: false }
      }
    }

    parts[segment.key] = digits
    result += digits

    const next = segments[i + 1]
    if (next?.type === 'separator' && segments.slice(i + 2).some(item => item.type === 'value')) {
      result += next.value
    }
  }

  return { value: result, index, closed }
}

export function maskSegments (segments: readonly Segment[], input: string) {
  return maskSegmentsFrom(segments, input.trimStart()).value
}

export function overtype (text: string, start: number, typed: string): [string, number] {
  const characters = [...text]
  const isDigit = (index: number) => /\d/.test(characters[index] ?? '')
  let caret = start

  for (const character of typed) {
    const period = characters.length - 2
    if (/[ap]/i.test(character) && /[ap]/i.test(characters[period] ?? '') && characters[period + 1]?.toLowerCase() === 'm') {
      characters[period] = character.toUpperCase()
      caret = characters.length
      continue
    }

    while (caret < characters.length && !isDigit(caret)) caret++

    if (!/\d/.test(character)) {
      while (caret < characters.length && isDigit(caret)) caret++
    } else if (caret < characters.length) {
      characters[caret++] = character
    }
  }

  while (caret < characters.length && !isDigit(caret)) caret++

  return [characters.join(''), caret]
}

export function createSegmentedEdit (mask: (value: string) => string) {
  let edit: { value: string, start: number, end: number } | undefined

  function onBeforeinput (event: InputEvent) {
    const input = event.target as HTMLInputElement
    edit = {
      value: input.value,
      start: input.selectionStart ?? 0,
      end: input.selectionEnd ?? 0,
    }
  }

  function onInput (event: InputEvent) {
    if (event.isComposing || event.inputType?.startsWith('delete')) return

    const input = event.target as HTMLInputElement
    const previous = edit?.value ?? ''
    const editingInside = !!edit &&
      edit.start < previous.length &&
      edit.end - edit.start < previous.length &&
      mask(previous) === previous

    const [value, caret] = editingInside
      ? overtype(
        previous,
        edit!.start,
        input.value.slice(edit!.start, input.value.length - previous.length + edit!.end),
      )
      : [mask(input.value)] as [string, number?]

    if (value === input.value) return

    input.value = value
    input.setSelectionRange(caret ?? value.length, caret ?? value.length)
  }

  return { onBeforeinput, onInput }
}

export function daysInMonth (parts: SegmentParts) {
  const year = Number(parts.y)
  const month = Number(parts.m)
  if (!year || year < 100 || !month || month < 1 || month > 12) return 31
  return new Date(year, month, 0).getDate()
}

export function dateSegments (order: string, separator: string): Segment[] {
  const sizes: Record<string, number> = { y: 4, m: 2, d: 2 }
  const max: Record<string, ValueSegment['max']> = {
    y: 9999,
    m: 12,
    d: parts => daysInMonth(parts),
  }

  const segments: Segment[] = []
  for (let i = 0; i < order.length; i++) {
    const key = order[i]
    segments.push({
      type: 'value',
      key,
      size: sizes[key] ?? 2,
      min: key === 'y' ? 0 : 1,
      max: max[key],
    })
    if (i < order.length - 1) {
      segments.push({ type: 'separator', value: separator })
    }
  }
  return segments
}

export function timeSegments (options: { useSeconds?: boolean, hour12?: boolean } = {}): Segment[] {
  const segments: Segment[] = [
    {
      type: 'value',
      key: 'h',
      size: 2,
      min: options.hour12 ? 1 : 0,
      max: options.hour12 ? 12 : 23,
    },
    { type: 'separator', value: ':' },
    { type: 'value', key: 'm', size: 2, min: 0, max: 59 },
  ]

  if (options.useSeconds) {
    segments.push(
      { type: 'separator', value: ':' },
      { type: 'value', key: 's', size: 2, min: 0, max: 59 },
    )
  }

  return segments
}

export function dateTimeSegments (
  order: string,
  dateSeparator: string,
  options: { useSeconds?: boolean, hour12?: boolean } = {},
): Segment[] {
  return [
    ...dateSegments(order, dateSeparator),
    { type: 'separator', value: ' ' },
    ...timeSegments(options),
  ]
}
