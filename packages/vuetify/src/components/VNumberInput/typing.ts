// Utilities
import { escapeForRegex, extractNumber } from '@/util'

type GroupingOption = 'always' | 'auto' | 'min2' | boolean

interface GroupedInputOptions {
  groupSeparator: string
  decimalSeparator: string
  precision: number | null
  grouping: GroupingOption
  locale: string
}

interface InputResult {
  text: string
  cursor: number
}

function stripGrouping (text: string, groupSeparator: string): string {
  return text.replaceAll(groupSeparator, '')
}

/** Fallback: fixed 3-digit groups */
function formatWithoutLocale (digits: string, groupSeparator: string, grouping: GroupingOption): string {
  if (grouping === 'min2' && digits.length <= 4) {
    return digits
  }

  const groups: string[] = []
  for (let i = digits.length; i > 0; i -= 3) {
    groups.unshift(digits.slice(Math.max(0, i - 3), i))
  }

  return groups.join(groupSeparator)
}

function addGrouping (
  raw: string,
  groupSeparator: string,
  decimalSeparator: string,
  grouping: GroupingOption,
  locale?: string,
): string {
  if (!grouping) return raw

  const decimalIndex = raw.indexOf(decimalSeparator)
  const integerPart = decimalIndex >= 0 ? raw.slice(0, decimalIndex) : raw
  const rest = decimalIndex >= 0 ? raw.slice(decimalIndex) : ''

  const sign = integerPart.startsWith('-') ? '-' : ''
  const digits = sign ? integerPart.slice(1) : integerPart

  if (!digits) return raw

  if (locale) {
    const num = Number(digits)
    if (!Number.isFinite(num)) return raw
    const grouped = new Intl.NumberFormat(locale, {
      useGrouping: grouping,
      numberingSystem: 'latn',
    })
      .formatToParts(num)
      .map(p => p.type === 'group' ? groupSeparator : p.value)
      .join('')
    return sign + grouped + rest
  }

  return sign + formatWithoutLocale(digits, groupSeparator, grouping) + rest
}

/** Count non-separator characters before displayPosition */
function toLogicalPosition (text: string, groupSeparator: string, displayPosition: number): number {
  let logical = 0
  for (let i = 0; i < displayPosition && i < text.length; i++) {
    if (text[i] !== groupSeparator) logical++
  }
  return logical
}

function toDisplayPosition (text: string, groupSeparator: string, logicalPosition: number): number {
  let logical = 0
  for (let i = 0; i <= text.length; i++) {
    if (logical === logicalPosition) return i
    if (i < text.length && text[i] !== groupSeparator) logical++
  }
  return text.length
}

/**
 * Process a beforeinput event for plain (non-grouped) number input.
 * Returns { text, cursor } when the input needs correction, or null to let browser handle it.
 */
export function processPlainInput (
  data: string | null,
  value: string,
  selectionStart: number,
  selectionEnd: number,
  options: { decimalSeparator: string, precision: number | null },
): InputResult | null {
  if (!data) return null

  const { decimalSeparator, precision } = options

  const potentialNewInputVal = value
    ? value.slice(0, selectionStart) + data + value.slice(selectionEnd)
    : data

  const cleaned = extractNumber(potentialNewInputVal, precision, decimalSeparator)
  const validPattern = new RegExp(`^-?\\d*${escapeForRegex(decimalSeparator)}?\\d*$`)

  if (!validPattern.test(potentialNewInputVal)) {
    return { text: cleaned, cursor: cleaned.length }
  }

  if (precision == null) return null

  if (potentialNewInputVal.split(decimalSeparator)[1]?.length > precision) {
    const cursor = selectionStart + data.length
    return { text: cleaned, cursor }
  }

  if (precision === 0 && potentialNewInputVal.endsWith(decimalSeparator)) {
    return { text: cleaned, cursor: cleaned.length }
  }

  return null
}

/**
 * Process a beforeinput event for grouped number input.
 * Returns { text, cursor } to apply, or null for interactions that do not need override
 */
export function processGroupedInput (
  inputType: string,
  data: string | null,
  value: string,
  selectionStart: number,
  selectionEnd: number,
  options: GroupedInputOptions,
): InputResult | null {
  const { groupSeparator, decimalSeparator, precision, grouping, locale } = options
  const raw = stripGrouping(value, groupSeparator)
  const logicalStart = toLogicalPosition(value, groupSeparator, selectionStart)
  const logicalEnd = toLogicalPosition(value, groupSeparator, selectionEnd)
  const hasSelection = logicalStart !== logicalEnd

  let newRaw: string
  let newLogicalCursor: number

  switch (inputType) {
    case 'insertText': {
      if (!data) return null
      newRaw = raw.slice(0, logicalStart) + data + raw.slice(logicalEnd)
      newLogicalCursor = logicalStart + data.length
      break
    }
    case 'insertFromPaste':
    case 'insertFromDrop': {
      if (!data) return null
      const cleaned = extractNumber(data, precision, decimalSeparator)
      newRaw = raw.slice(0, logicalStart) + cleaned + raw.slice(logicalEnd)
      newLogicalCursor = logicalStart + cleaned.length
      break
    }
    case 'deleteContentBackward': {
      if (hasSelection) {
        newRaw = raw.slice(0, logicalStart) + raw.slice(logicalEnd)
        newLogicalCursor = logicalStart
      } else if (logicalStart > 0) {
        newRaw = raw.slice(0, logicalStart - 1) + raw.slice(logicalStart)
        newLogicalCursor = logicalStart - 1
      } else {
        // At the start, nothing to delete
        newRaw = raw
        newLogicalCursor = 0
      }
      break
    }
    case 'deleteContentForward': {
      if (hasSelection) {
        newRaw = raw.slice(0, logicalStart) + raw.slice(logicalEnd)
        newLogicalCursor = logicalStart
      } else if (logicalStart < raw.length) {
        newRaw = raw.slice(0, logicalStart) + raw.slice(logicalStart + 1)
        newLogicalCursor = logicalStart
      } else {
        // At the end, nothing to delete
        newRaw = raw
        newLogicalCursor = logicalStart
      }
      break
    }
    case 'deleteByCut': {
      newRaw = raw.slice(0, logicalStart) + raw.slice(logicalEnd)
      newLogicalCursor = logicalStart
      break
    }
    case 'deleteWordBackward': {
      if (hasSelection) {
        newRaw = raw.slice(0, logicalStart) + raw.slice(logicalEnd)
        newLogicalCursor = logicalStart
      } else {
        let deleteEnd = logicalStart
        // Skip non-digits first (e.g., decimal separator)
        while (deleteEnd > 0 && !/\d/.test(raw[deleteEnd - 1])) deleteEnd--
        // Then skip digits
        while (deleteEnd > 0 && /\d/.test(raw[deleteEnd - 1])) deleteEnd--
        newRaw = raw.slice(0, deleteEnd) + raw.slice(logicalStart)
        newLogicalCursor = deleteEnd
      }
      break
    }
    case 'deleteWordForward': {
      if (hasSelection) {
        newRaw = raw.slice(0, logicalStart) + raw.slice(logicalEnd)
        newLogicalCursor = logicalStart
      } else {
        let deleteEnd = logicalStart
        while (deleteEnd < raw.length && !/\d/.test(raw[deleteEnd])) deleteEnd++
        while (deleteEnd < raw.length && /\d/.test(raw[deleteEnd])) deleteEnd++
        newRaw = raw.slice(0, logicalStart) + raw.slice(deleteEnd)
        newLogicalCursor = logicalStart
      }
      break
    }
    case 'deleteSoftLineBackward': {
      newRaw = raw.slice(logicalEnd)
      newLogicalCursor = 0
      break
    }
    case 'deleteSoftLineForward': {
      newRaw = raw.slice(0, logicalStart)
      newLogicalCursor = logicalStart
      break
    }
    default:
      return null
  }

  const validPattern = new RegExp(`^-?\\d*${escapeForRegex(decimalSeparator)}?\\d*$`)
  if (!validPattern.test(newRaw)) {
    newRaw = extractNumber(newRaw, precision, decimalSeparator)
    newLogicalCursor = Math.min(newLogicalCursor, newRaw.length)
  }

  if (precision != null) {
    const parts = newRaw.split(decimalSeparator)
    if (parts[1]?.length > precision) {
      newRaw = parts[0] + decimalSeparator + parts[1].slice(0, precision)
      newLogicalCursor = Math.min(newLogicalCursor, newRaw.length)
    }
    if (precision === 0 && newRaw.endsWith(decimalSeparator)) {
      newRaw = newRaw.slice(0, -1)
      newLogicalCursor = Math.min(newLogicalCursor, newRaw.length)
    }
  }

  const formatted = addGrouping(newRaw, groupSeparator, decimalSeparator, grouping, locale)
  const cursor = toDisplayPosition(formatted, groupSeparator, newLogicalCursor)

  return { text: formatted, cursor }
}
