// Types
import type { HintToken } from './types'

export const rtlScript = /[\p{Script=Arabic}\p{Script=Hebrew}\p{Script=Thaana}]/u

export function hintToken (text: string, size: number): HintToken {
  return { text, size, fill: text.length === size && new Set(text).size === 1 }
}

// the value grows from the end the format is read from, the hint is the stretch it has not reached
export function remainingTokens (tokens: readonly HintToken[], width: number, fromEnd = false) {
  let left = width

  return tokens.map(({ text, size, fill }) => {
    if (left >= size) {
      left -= size
      return ''
    }

    const shown = fill
      ? (fromEnd ? text.slice(0, size - left) : text.slice(left))
      : (left ? '' : text)

    left = 0

    return shown
  })
}

// what is left of the format once the characters already on screen are struck off it,
// the mask having padded sections the display has not caught up with yet
export function remainingHint (masked: string, hint: string, shown: string) {
  const digitsLeft = (value: string, from: number) => /^\d*/.exec(value.slice(from))![0].length
  let at = 0
  let read = 0

  while (at < masked.length && read < shown.length) {
    if (masked[at] === shown[read]) {
      at++
      read++
    } else if (digitsLeft(masked, at) > digitsLeft(shown, read)) {
      at++
    } else {
      return ''
    }
  }

  let left = masked.slice(at) + hint

  for (const char of shown.slice(read)) {
    const next = left.indexOf(char)
    if (next < 0) return ''
    left = left.slice(next + 1)
  }

  return left
}
