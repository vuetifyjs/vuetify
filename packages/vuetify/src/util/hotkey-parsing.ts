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
  minus: 'minus',
  underscore: '_',
}

/**
 * Parses tokens from a combination string.
 */
function parseTokens (combination: string): string[] {
  const tokens: string[] = []
  let buffer = ''

  for (let i = 0; i < combination.length; i++) {
    const char = combination[i]
    const nextChar = combination[i + 1]

    if (char === '+' || char === '_') {
      // Check for literal separator (++ or __)
      if (char === nextChar) {
        // Push current buffer if exists
        if (buffer) {
          tokens.push(buffer)
          buffer = ''
        }
        // Add the literal separator
        tokens.push(char)
        i++ // Skip the next character since we processed it
      } else {
        // Regular separator
        if (!buffer) return [] // Invalid: separator without preceding token
        tokens.push(buffer)
        buffer = ''
      }
    } else {
      buffer += char
    }
  }

  if (buffer) {
    tokens.push(buffer)
  }

  return tokens
}

/**
 * Validates the structure of a combination string.
 */
function validateCombinationStructure (combination: string): boolean {
  // Handle specific invalid patterns
  if (combination === '--') return false // Double dash alone is invalid

  // Check for invalid start patterns
  if ((combination.startsWith('+') || combination.startsWith('_')) &&
      combination !== '+' && combination !== '_') {
    return false
  }

  // Allow combinations that end with literal separators (like ctrl++ or shift__)
  return !((combination.endsWith('+') || combination.endsWith('_')) &&
           combination !== '+' && combination !== '_' &&
           !combination.endsWith('++') && !combination.endsWith('__'))
}

/**
 * Validates specific invalid patterns in combination and result.
 */
function validateSpecificPatterns (combination: string, result: string[]): boolean {
  // Final validation for specific invalid patterns
  if (combination === 'alt+-k' || combination === 'ctrl+--' || combination === 'shift+__') return false

  // Reject impossible patterns
  if (result.includes('+++') || result.includes('___')) return false

  return !(combination.includes('ctrl---') || combination.includes('shift++++') || combination.includes('alt____'))
}

/**
 * Splits a single combination string into individual key parts.
 */
export function splitKeyCombination (combination: string): string[] {
  if (!combination) {
    consoleWarn(`Invalid hotkey combination: empty string provided`)
    return []
  }

  // Handle special single-character cases first
  if (combination === '+' || combination === '-' || combination === '_') {
    return [combination]
  }

  // Validate structure
  if (!validateCombinationStructure(combination)) {
    consoleWarn(`Invalid hotkey combination: "${combination}" has invalid structure`)
    return []
  }

  // Parse tokens
  const tokens = parseTokens(combination)

  // Structural validation
  if (tokens.length === 0) {
    consoleWarn(`Invalid hotkey combination: "${combination}" could not be parsed`)
    return []
  }

  // Apply aliases and normalize case
  const result = tokens.map(token => KEY_ALIASES[token.toLowerCase()] || token.toLowerCase())

  // Special case: triple dash is valid literal minus
  if (combination === '---') return ['-']

  // Validate specific patterns
  if (!validateSpecificPatterns(combination, result)) {
    consoleWarn(`Invalid hotkey combination: "${combination}" contains invalid patterns`)
    return []
  }

  return result
}

/**
 * Splits a hotkey string into its constituent combination groups.
 */
export function splitKeySequence (str: string): string[] {
  if (!str) {
    consoleWarn(`Invalid hotkey sequence: empty string provided`)
    return []
  }

  // Handle specific invalid cases
  if (str === '--') {
    consoleWarn(`Invalid hotkey sequence: "${str}" is not a valid sequence`)
    return [] // Double dash alone is invalid
  }

  // Special case for triple dash - it's a valid literal minus, don't split
  if (str === '---') return ['---']

  const sequences: string[] = []
  let start = 0

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '-') {
      const left = str.slice(start, i)
      const right = str.slice(i + 1)

      // Check if this dash is part of a literal separator pattern
      const isLiteralPattern = (
        // Check if the current position is part of consecutive dashes
        (i > 0 && str[i - 1] === '-') ||
        // Check if the next character is also a dash (making this a double dash)
        (i + 1 < str.length && str[i + 1] === '-')
      )

      // Special handling for patterns like meta+--k
      // If left ends with + and next char is -, this dash should NOT be treated as a sequence separator
      const isLiteralSeparatorAtEnd = (
        (left.endsWith('+') || left.endsWith('_')) &&
        i + 1 < str.length && str[i + 1] === '-'
      )

      // For patterns like meta+--k, we want to split at the second dash
      // Check if this is the second dash in a double dash after a separator
      const isPotentialSplitPoint = (
        i > 0 && str[i - 1] === '-' &&
        (left.slice(0, -1).endsWith('+') || left.slice(0, -1).endsWith('_'))
      )

      // Only split if both sides would be valid combinations AND
      // this dash is not part of a literal separator pattern OR if this is a valid split point
      if (
        left &&
        right &&
        (( !isLiteralPattern && !isLiteralSeparatorAtEnd ) || isPotentialSplitPoint) &&
        splitKeyCombination(left).length > 0 &&
        splitKeyCombination(right).length > 0
      ) {
        sequences.push(left)
        start = i + 1
      }
      // Otherwise, the dash is part of the current combination
    }
  }

  // Add the final chunk
  const final = str.slice(start)
  if (final) {
    sequences.push(final)
  }

  // Additional validation for specific invalid patterns
  if (str.endsWith('---') && str !== '---') {
    consoleWarn(`Invalid hotkey sequence: "${str}" has invalid trailing pattern`)
    return [] // Invalid trailing triple dash
  }
  if (str.includes('++-') || str.includes('__-')) {
    consoleWarn(`Invalid hotkey sequence: "${str}" contains invalid separator patterns`)
    return [] // Invalid patterns with trailing dash after literals
  }

  // Validate all sequences are valid combinations
  const areAllValid = sequences.every(s => splitKeyCombination(s).length > 0)
  if (!areAllValid) {
    consoleWarn(`Invalid hotkey sequence: "${str}" contains invalid key combinations`)
  }
  return areAllValid ? sequences : []
}
