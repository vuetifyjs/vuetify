// Utilities
import { normalizeKey } from './key-aliases'
import { consoleWarn, includes } from '@/util'

// Types
export type KeyCombination = Sequence | Alternate | Combo | Key

export interface Sequence {
  type: 'sequence'
  parts: (Alternate | Combo | Key)[]
}

export interface Alternate {
  type: 'alternate'
  parts: (Combo | Key)[]
}

export interface Combo {
  type: 'combo'
  parts: Key[]
}

export type Key = string

class ParseError extends Error {}

/**
 * Splits a single combination string into individual key parts.
 * Grammar:
 *
 * sequence   = alternate *('-' alternate)
 * alternate  = combo *('/' combo)
 * combo      = key *(('+' | '_') key)
 * key        = /./ *(/[^-/+_ ]/)
 *
 */
export function parseKeyCombination (input: string) {
  let pos = 0

  try {
    const result = parseSequence()
    if (!atEnd()) {
      throw new ParseError(`Unexpected character '${peek()}' at position ${pos}`)
    }
    return result
  } catch (err) {
    if (err instanceof ParseError) {
      consoleWarn(`Invalid hotkey combination: ${err.message}\n  ${input}\n  ${' '.repeat(pos)}^`)
      return ''
    } else {
      throw err
    }
  }

  function peek (ahead = 0): string | null {
    return pos + ahead < input.length
      ? input[pos + ahead]
      : null
  }

  function consume (): string {
    if (pos >= input.length) {
      throw new ParseError('Unexpected end of input')
    }
    return input[pos++]
  }

  function atEnd (): boolean {
    return pos >= input.length
  }

  // sequence = alternate *('-' alternate)
  function parseSequence (): KeyCombination {
    const parts: (Alternate | Combo | Key)[] = [parseAlternate()]
    while (peek() === '-') {
      consume()
      parts.push(parseAlternate())
    }
    if (parts.length === 1) return parts[0]
    return { type: 'sequence', parts }
  }

  // alternate = combo *('/' combo)
  function parseAlternate (): Alternate | Combo | Key {
    const parts: (Combo | Key)[] = [parseCombo()]
    while (peek() === '/') {
      consume()
      parts.push(parseCombo())
    }
    if (parts.length === 1) return parts[0]
    return { type: 'alternate', parts }
  }

  // combo = key *(('+' | '_') key)
  function parseCombo (): Combo | Key {
    const keys: Key[] = [parseKey()]
    while (includes(['+', '_'], peek())) {
      consume()
      keys.push(parseKey())
    }
    if (keys.length === 1) return keys[0]
    return {
      type: 'combo',
      parts: keys,
    }
  }

  // key = /./ *(/[^-/+_ ]/)
  function parseKey (): Key {
    const ch = peek()
    if (ch == null) {
      throw new ParseError('Unexpected end of input')
    }
    const next = peek(1)
    if (isSep(ch) && next != null && !isSep(next)) {
      throw new ParseError(`Unexpected separator '${ch}' at position ${pos}`)
    }
    const first = consume()
    // separator keys are always a single character
    if (isSep(first)) return first
    const chars: Key[] = [first]
    while (!atEnd() && !isSep(peek()) && peek() !== ' ') {
      chars.push(consume())
    }
    return normalizeKey(chars.join(''))
  }
}

function isSep (char: string | null) {
  return includes(['-', '/', '+', '_'], char)
}
