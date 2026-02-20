// Utilities
import { normalizeKey } from './key-aliases'
import { consoleWarn } from '../../util/console'

// Types
export const MODIFIERS = ['ctrl', 'shift', 'alt', 'meta', 'cmd']

/**
 * Splits a single combination string into individual key parts.
 *
 * A combination is a set of keys that must be pressed simultaneously.
 * e.g. `ctrl+k`, `shift--`
 */
export function splitKeyCombination (combination: string, isInternal = false): { keys: string[], separators: string[] } {
  const emptyResult = { keys: [], separators: [] }
  if (!combination) {
    if (!isInternal) consoleWarn('Invalid hotkey combination: empty string provided')
    return emptyResult
  }

  // --- VALIDATION ---

  const hasInvalidLeadingSeparator = (
    combination.length > 1 &&
    // Starts with a single separator followed by a non-separator character (e.g. '+a', '_a')
    ['+', '/', '_'].some(v => combination.startsWith(v)) &&
    !['++', '//', '__'].some(v => combination.startsWith(v))
  )

  const hasInvalidStructure = (
    hasInvalidLeadingSeparator ||
    // Disallow literal + or _ keys (they require shift)
    combination.includes('++') || combination.includes('__') || combination === '+' || combination === '_' ||
    // Ends with a separator that is not part of a doubled literal
    (combination.length > 1 && (combination.endsWith('+') || combination.endsWith('_')) && combination.at(-2) !== combination.at(-1)) ||
    // Stand-alone doubled separators (dangling)
    combination === '++' || combination === '--' || combination === '__'
  )

  if (hasInvalidStructure) {
    if (!isInternal) consoleWarn(`Invalid hotkey combination: "${combination}" has invalid structure`)
    return emptyResult
  }

  const keys: string[] = []
  const separators: string[] = []
  let buffer = ''

  const flushBuffer = (separator?: string) => {
    if (buffer) {
      separator && separators.push(separator)
      keys.push(normalizeKey(buffer))
      buffer = ''
    }
  }

  for (let i = 0; i < combination.length; i++) {
    const char = combination[i]
    const nextChar = combination[i + 1]

    if (['+', '/', '_', '-'].includes(char)) {
      if (char === nextChar) {
        flushBuffer(char)
        keys.push(char)
        i++
      } else if (['+', '/', '_'].includes(char)) {
        flushBuffer(char)
      } else {
        buffer += char
      }
    } else {
      buffer += char
    }
  }
  flushBuffer()

  // Within a combination, `-` is only valid as a literal key (e.g., `ctrl+-`).
  // `-` cannot be part of a longer key name within a combination.
  const hasInvalidMinus = keys.some(key => key.length > 1 && key.includes('-') && key !== '--')
  if (hasInvalidMinus) {
    if (!isInternal) consoleWarn(`Invalid hotkey combination: "${combination}" has invalid structure`)
    return emptyResult
  }

  if (keys.length === 0 && combination) {
    return { keys: [normalizeKey(combination)], separators }
  }

  return { keys, separators }
}

/**
 * Splits a hotkey string into its constituent combination groups.
 *
 * A sequence is a series of combinations that must be pressed in order.
 * e.g. `a-b`, `ctrl+k-p`
 */
export function splitKeySequence (str: string): string[] {
  if (!str) {
    consoleWarn('Invalid hotkey sequence: empty string provided')
    return []
  }

  // A sequence is invalid if it starts or ends with a separator,
  // unless it is part of a combination (e.g., `shift+-`).
  const hasInvalidStart = str.startsWith('-') && str !== '-' && !['---', '--+'].includes(str)
  const hasInvalidEnd = str.endsWith('-') && !str.endsWith('+-') && !str.endsWith('_-') && str !== '-' && str !== '---'

  if (hasInvalidStart || hasInvalidEnd) {
    consoleWarn(`Invalid hotkey sequence: "${str}" contains invalid combinations`)
    return []
  }

  const result: string[] = []
  let buffer = ''
  let i = 0

  while (i < str.length) {
    const char = str[i]

    if (char === '-') {
      // Determine if this hyphen is part of the current combination
      const prevChar = str[i - 1]
      const prevPrevChar = i > 1 ? str[i - 2] : undefined

      const precededBySeparator = (
        (['+', '_'].includes(prevChar)) && !['+', '/'].includes(prevPrevChar ?? '')
      )

      if (precededBySeparator) {
        // Treat as part of the combination (e.g., 'ctrl+-')
        buffer += char
        i++
      } else {
        // Treat as sequence separator
        if (buffer) {
          result.push(buffer)
          buffer = ''
        } else {
          // Empty buffer means we have a literal '-' key
          result.push('-')
        }
        i++
      }
    } else {
      buffer += char
      i++
    }
  }

  // Add final buffer if it exists
  if (buffer) {
    result.push(buffer)
  }

  // Collapse runs of '-' so that every second '-' is removed
  const collapsed: string[] = []
  let minusCount = 0
  for (const part of result) {
    if (part === '-') {
      if (minusCount % 2 === 0) collapsed.push('-')
      minusCount++
    } else {
      minusCount = 0
      collapsed.push(part)
    }
  }

  // Validate that each part of the sequence is a valid combination
  const areAllValid = collapsed.every(s => splitKeyCombination(s, true).keys.length > 0)

  if (!areAllValid) {
    consoleWarn(`Invalid hotkey sequence: "${str}" contains invalid combinations`)
    return []
  }

  return collapsed
}
