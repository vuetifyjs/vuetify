// Utilities
import { consoleWarn } from './console'

// Types
export const MODIFIERS = ['ctrl', 'shift', 'alt', 'meta', 'cmd']

// All keys are normalized to lowercase strings
const KEY_ALIASES: Record<string, string> = {
  control: 'ctrl',
  command: 'cmd',
  option: 'alt',
  windows: 'meta',
  plus: '+',
  minus: '-',
  underscore: '_',
}

/**
 * Splits a single combination string into individual key parts.
 *
 * A combination is a set of keys that must be pressed simultaneously.
 * e.g. `ctrl+k`, `shift--`, `alt++`
 */
export function splitKeyCombination (combination: string, isInternal = false): string[] {
  if (!combination) {
    if (!isInternal) consoleWarn('Invalid hotkey combination: empty string provided')
    return []
  }

  // --- VALIDATION ---
  const hasInvalidStructure = (
    // Starts with a separator (and is not a single literal key)
    (combination.length > 1 && (combination.startsWith('+') || combination.startsWith('_'))) ||
    // Ends with a separator that is not part of a doubled literal
    (combination.length > 1 && (combination.endsWith('+') || combination.endsWith('_')) && combination.at(-2) !== combination.at(-1)) ||
    // Standalone doubled separators
    combination === '++' || combination === '--' || combination === '__'
  )

  if (hasInvalidStructure) {
    if (!isInternal) consoleWarn(`Invalid hotkey combination: "${combination}" has invalid structure`)
    return []
  }

  const keys: string[] = []
  let buffer = ''

  const flushBuffer = () => {
    if (buffer) {
      keys.push(KEY_ALIASES[buffer.toLowerCase()] || buffer.toLowerCase())
      buffer = ''
    }
  }

  for (let i = 0; i < combination.length; i++) {
    const char = combination[i]
    const nextChar = combination[i + 1]

    if (char === '+' || char === '_' || char === '-') {
      if (char === nextChar) {
        flushBuffer()
        keys.push(char)
        i++
      } else if (char === '+' || char === '_') {
        flushBuffer()
      } else {
        buffer += char
      }
    } else {
      buffer += char
    }
  }
  flushBuffer()

  // Combinations like `ctrl-b` are not valid, `-` is a sequence separator.
  // `-` is only a valid key if it's on its own.
  const hasInvalidMinus = keys.some(key => key.length > 1 && key.includes('-') && key !== '--')
  if (hasInvalidMinus) {
    if (!isInternal) consoleWarn(`Invalid hotkey combination: "${combination}" has invalid structure`)
    return []
  }

  if (keys.length === 0 && combination) {
    return [KEY_ALIASES[combination.toLowerCase()] || combination.toLowerCase()]
  }

  return keys
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
  const hasInvalidStart = str.startsWith('-') && !['---', '--+'].includes(str)
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
      // Check if this hyphen is part of a combination (preceded by + or _)
      if (i > 0 && (str[i - 1] === '+' || str[i - 1] === '_')) {
        buffer += char
        i++
      } else {
        // This is a sequence separator
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
  const areAllValid = collapsed.every(s => splitKeyCombination(s, true).length > 0)

  if (!areAllValid) {
    consoleWarn(`Invalid hotkey sequence: "${str}" contains invalid combinations`)
    return []
  }

  return collapsed
}
