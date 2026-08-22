// Utilities
import { shallowRef } from 'vue'

// Types
export type SegmentParts = Record<string, string>

export type ValueSegment = {
  type: 'value'
  key: string
  size: number
  max?: number
  // narrower limit read from the other sections, capped afterwards when they come later
  softMax?: (parts: SegmentParts) => number
  // completes a short section once a separator closes it, defaults to zero padding
  close?: (digits: string) => string
}

export type SeparatorSegment = {
  type: 'separator'
  value: string
}

export type Segment = ValueSegment | SeparatorSegment

export type MaskResult = {
  value: string
  index: number
  closed: boolean
  // caret mapped into the masked value, -1 when it sits past the end
  caret: number
  // how much of the format the value covers, empty sections included
  width: number
  // an empty section is kept in place when a later one still holds digits
  gaps: boolean
  // every section of the date got its digits
  complete: boolean
}

function readSection (segment: ValueSegment, text: string, start: number, tail: boolean, parts: SegmentParts) {
  const max = segment.max ?? 10 ** segment.size - 1
  const soft = segment.softMax?.(parts) ?? max
  let index = start
  let digits = ''
  let filled = false

  while (index < text.length && !filled && /\d/.test(text[index])) {
    const value = Number(digits + text[index])

    // a digit that does not fit belongs to the next section, e.g. 1 then 9 is January 9th
    // the narrower limit only rejects the digit just typed, and only while a next section can take it
    if (value > max || (value > soft && !tail && index === text.length - 1)) {
      filled = true
      break
    }

    digits += text[index++]
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
  filled ||= !!digits && Number(digits) * 10 ** (segment.size - digits.length) > soft

  return { digits, index, filled, closed: index > separatorStart }
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
    const editing = caret >= start && caret <= start + typed
    const holds = editing || (caret >= start && caret < index)

    if (!digits) {
      // a hole only ends the date when nothing comes after it
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

    if (typed < segment.size && done) {
      digits = segment.close?.(digits) ?? digits.padStart(segment.size, '0')
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
        : result.length - typed + (caret - start)
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

export function maskSegments (segments: readonly Segment[], input: string) {
  return maskSegmentsFrom(segments, input.trimStart()).value
}

// sections have a fixed width, so typing inside one overwrites instead of shifting
export function overtype (text: string, start: number, typed: string): [string, number] {
  const chars = [...text]
  const isDigit = (index: number) => /\d/.test(chars[index] ?? '')
  let caret = start

  for (const char of typed) {
    while (caret < chars.length && !isDigit(caret)) caret++

    if (!/\d/.test(char)) {
      // a typed separator jumps to the next section
      while (caret < chars.length && isDigit(caret)) caret++
    } else if (caret < chars.length) {
      chars[caret++] = char
    }
  }

  while (caret < chars.length && !isDigit(caret)) caret++

  return [chars.join(''), caret]
}

export type MaskEdit = (value: string, caret?: number) => Pick<MaskResult, 'value' | 'caret' | 'gaps'>

// deleting takes out digits but leaves the separators, so the sections keep their place
function keepSeparators (previous: string, start: number, removed: number, forward: boolean) {
  const cut = previous.slice(start, start + removed)
  const tail = previous.slice(start + removed)
  const kept = /\d/.test(tail) ? cut.replace(/\d/g, '') : ''
  const value = previous.slice(0, start) + kept + tail

  return {
    value: /\d/.test(value) ? value : '',
    // a separator that survived the delete is stepped over instead of removed
    caret: forward ? start + kept.length : start,
  }
}

export function createSegmentedEdit (mask: MaskEdit) {
  const text = shallowRef('')
  let edit: { value: string, start: number, end: number } | undefined

  function onBeforeinput (e: InputEvent) {
    const el = e.target as HTMLInputElement

    edit = { value: el.value, start: el.selectionStart ?? 0, end: el.selectionEnd ?? 0 }
  }

  function apply (el: HTMLInputElement, next: { value: string, caret: number }) {
    if (next.value !== el.value) el.value = next.value
    if (next.caret !== el.selectionStart) el.setSelectionRange(next.caret, next.caret)

    text.value = el.value
  }

  function onInput (e: InputEvent) {
    const el = e.target as HTMLInputElement
    const previous = edit?.value ?? ''
    const removed = previous.length - el.value.length

    if (e.isComposing) {
      text.value = el.value
      return
    }

    if (e.inputType?.startsWith('delete') && edit && removed > 0) {
      const collapsed = edit.start === edit.end
      const forward = collapsed && !!e.inputType.includes('Forward')

      apply(el, keepSeparators(previous, collapsed && !forward ? edit.start - removed : edit.start, removed, forward))
      return
    }

    const shaped = mask(previous)
    // a value the mask would rewrite has no sections to overwrite, e.g. after a backspace
    // and one that can still take another digit is edited by inserting, e.g. after a delete
    const isInside = !!edit && edit.start < previous.length &&
      edit.end - edit.start < previous.length &&
      // typing over a selection with fewer digits leaves a shorter section, so the mask re-shapes it
      el.value.length >= previous.length &&
      // an emptied section is typed into, only the digits around it are overwritten
      (!shaped.gaps || /\d/.test(previous[edit.start])) &&
      shaped.value === previous &&
      mask(previous + '0').value !== previous + '0'

    if (isInside) {
      const [value, caret] = overtype(
        previous,
        edit!.start,
        el.value.slice(edit!.start, el.value.length - previous.length + edit!.end)
      )

      // the mask has the last word on the sections the overwrite made invalid, e.g. February 31st
      apply(el, mask(value, caret))
    } else {
      apply(el, mask(el.value, el.selectionStart ?? el.value.length))
    }
  }

  return { onBeforeinput, onInput, text }
}

export function daysInMonth (parts: SegmentParts) {
  const days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][Number(parts.m) - 1] ?? 31
  const year = Number(parts.y)

  // February keeps the 29th until a whole year rules it out
  return days === 29 && parts.y?.length === 4 && (year % 4 || (!(year % 100) && year % 400)) ? 28 : days
}

export function dateSegments (order: string, separator: string, fixYear?: (year: number) => number): Segment[] {
  const value: Record<string, ValueSegment> = {
    y: { type: 'value', key: 'y', size: 4, max: 9999, close: digits => String(fixYear?.(Number(digits)) ?? digits) },
    m: { type: 'value', key: 'm', size: 2, max: 12 },
    d: { type: 'value', key: 'd', size: 2, max: 31, softMax: daysInMonth },
  }

  return [...order].flatMap((key, i) => [
    ...i ? [{ type: 'separator', value: separator } as const] : [],
    value[key],
  ])
}
