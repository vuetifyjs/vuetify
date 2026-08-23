// Types
import type { MaskEditResult, MaskResult, Segment, SegmentParts, ValueSegment } from './types'

function readSection (segment: ValueSegment, text: string, start: number, tail: boolean, parts: SegmentParts) {
  const max = segment.max ?? 10 ** segment.size - 1
  const limit = Math.min(max, segment.softMax?.(parts) ?? max)
  let index = start
  let digits = ''
  let filled = false

  while (index < text.length && !filled && /\d/.test(text[index])) {
    const value = Number(digits + text[index])

    // a digit that does not fit caps the section it is typed into, e.g. 1 then 5 is December
    if (value > limit) {
      digits = String(limit).padStart(digits.length + 1, '0')
      index++
      filled = true
      break
    }

    digits += text[index++]

    // a section stays open on a value it cannot be left with, e.g. a month is never 00
    if (segment.min && !Number(digits)) digits = '0'

    filled = digits.length === segment.size
  }

  const separatorStart = index

  // only the last section swallows what follows, elsewhere a second separator means an empty one
  if (tail) {
    while (index < text.length && !/\d/.test(text[index])) index++
  } else if (index < text.length && !/\d/.test(text[index])) {
    index++
  }

  // a section with no room left for another digit is closed, e.g. 4 is April
  filled ||= !!digits && Number(digits) * 10 ** (segment.size - digits.length) > limit

  return { digits, index, end: separatorStart, filled, closed: index > separatorStart }
}

// a closed section fills its width, and cannot be left holding less than it has to be
function closeSection (segment: ValueSegment, digits: string, left: boolean) {
  const value = segment.close?.(digits) ?? digits
  const min = left ? segment.min ?? 0 : 0

  return String(Math.max(Number(value), min)).padStart(segment.size, '0')
}

export function maskSegmentsFrom (
  segments: readonly Segment[],
  text: string,
  startIndex = 0,
  caret = -1
): MaskResult {
  let index = startIndex
  let result = ''
  let closed = false
  let gaps = false
  let outCaret = -1
  let width = 0
  let base = 0
  let pending = ''
  let complete = true

  const parts: SegmentParts = {}
  const limited: { segment: ValueSegment, at: number }[] = []

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    if (segment.type === 'separator') continue

    const next = segments[i + 1]
    const tail = !segments.slice(i + 1).some(item => item.type === 'value')
    const separator = !tail && next?.type === 'separator' ? next.value : ''
    const start = index

    const section = readSection(segment, text, index, tail, parts)
    const filled = section.filled
    let digits = section.digits

    index = section.index
    closed = section.closed

    const typed = digits.length
    // the caret is read against the digits the section took, which a cap or a zero can shorten
    const editing = caret >= start && caret <= section.end
    const holds = editing || (caret >= start && caret < index)

    if (!digits) {
      // a hole only ends the value when nothing comes after it
      if (tail || !closed) complete = false
      if (!closed) break

      if (holds && outCaret < 0) outCaret = result.length + pending.length

      // an empty section keeps its place as long as a later one still holds digits
      pending += separator
      base += segment.size + separator.length
      continue
    }

    // a separator closes a section only once the caret has moved on
    const done = filled || typed === segment.size || (closed && !editing)

    // sections keep their full width, an overwriting edit counts on it
    if (typed < segment.size && done) {
      digits = closeSection(segment, digits, caret >= section.end)
    }

    if (pending) gaps = true

    parts[segment.key] = digits
    result += pending + digits
    pending = ''

    if (segment.softMax) limited.push({ segment, at: result.length - digits.length })

    width = base + digits.length

    if (holds && outCaret < 0) {
      outCaret = caret >= start + typed && done
        ? result.length + separator.length
        : result.length - typed + Math.min(caret - start, typed)
    }

    if (typed < segment.size && !filled && !closed) {
      complete = false
      break
    }

    base += segment.size + separator.length
    result += separator

    // a trailing separator moves the format along with it
    if (separator) width = base
  }

  // a section read before the one that narrows it is capped afterwards, e.g. 31.04 is April 30th
  for (const { segment, at } of limited) {
    const digits = parts[segment.key]
    const limit = segment.softMax!(parts)

    if (Number(digits) <= limit) continue

    const capped = String(limit).padStart(digits.length, '0')

    parts[segment.key] = capped
    result = result.slice(0, at) + capped + result.slice(at + digits.length)
  }

  return { value: result, index, closed, caret: outCaret, width, gaps, complete }
}

// strip noise and map the caret into the kept character stream
export function toMaskSource (input: string, noise: RegExp, caret = -1) {
  const text = input.trimStart().replace(noise, '')
  const before = caret < 0 ? -1 : input.slice(0, caret).trimStart().replace(noise, '').length

  return { text, caret: before }
}

export function maskInput (
  segments: readonly Segment[],
  input: string,
  noise: RegExp,
  caret = -1,
  decorate?: (masked: MaskResult, raw: string) => string,
): MaskEditResult {
  const raw = input.trimStart()
  const source = toMaskSource(input, noise, caret)
  const masked = maskSegmentsFrom(segments, source.text, 0, source.caret)
  const value = decorate ? decorate(masked, raw) : masked.value

  return {
    value,
    caret: masked.caret < 0 ? value.length : masked.caret,
    width: masked.width,
    gaps: masked.gaps,
    complete: masked.complete,
  }
}
