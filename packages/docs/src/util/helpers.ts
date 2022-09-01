// Globals
import { IN_BROWSER } from '@/util/globals'

export function copyElementContent (el: HTMLElement) {
  if (!IN_BROWSER) return

  el.setAttribute('contenteditable', 'true')
  el.focus()

  document.execCommand('selectAll', false, undefined)
  document.execCommand('copy')

  el.removeAttribute('contenteditable')
}

export function getBranch () {
  const branch = IN_BROWSER
    ? window.location.hostname.split('.')[0]
    : 'master'

  return ['master', 'dev', 'next'].includes(branch) ? branch : 'master'
}

export const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

export async function waitForReadystate () {
  if (
    !IN_BROWSER ||
    document.readyState === 'interactive'
  ) return

  await new Promise(resolve => {
    const cb = () => {
      window.requestAnimationFrame(resolve)
      window.removeEventListener('DOMContentLoaded', cb)
    }

    window.addEventListener('DOMContentLoaded', cb)
  })
}

/** Jaro-Winkler distance between two strings */
// eslint-disable-next-line max-statements
export function distance (s1: string, s2: string) {
  // Exit early if either are empty.
  if (s1.length === 0 || s2.length === 0) {
    return 0
  }

  // Exit early if they're an exact match.
  if (s1 === s2) {
    return 1
  }

  const range = (Math.floor(Math.max(s1.length, s2.length) / 2)) - 1
  const s1Matches = new Array(s1.length)
  const s2Matches = new Array(s2.length)

  let m = 0
  for (let i = 0; i < s1.length; i++) {
    const low = (i >= range) ? i - range : 0
    const high = (i + range <= (s2.length - 1)) ? (i + range) : (s2.length - 1)

    for (let j = low; j <= high; j++) {
      if (s1Matches[i] !== true && s2Matches[j] !== true && s1[i] === s2[j]) {
        ++m
        s1Matches[i] = s2Matches[j] = true
        break
      }
    }
  }

  // Exit early if no matches were found.
  if (m === 0) {
    return 0
  }

  // Count the transpositions.
  let j; let k = 0
  let numTrans = 0

  for (let i = 0; i < s1.length; i++) {
    if (s1Matches[i] === true) {
      for (j = k; j < s2.length; j++) {
        if (s2Matches[j] === true) {
          k = j + 1
          break
        }
      }

      if (s1[i] !== s2[j]) {
        ++numTrans
      }
    }
  }

  let weight = (m / s1.length + m / s2.length + (m - (numTrans / 2)) / m) / 3
  let l = 0
  const p = 0.1

  if (weight > 0.7) {
    while (s1[l] === s2[l] && l < 4) {
      ++l
    }

    weight = weight + l * p * (1 - weight)
  }

  return weight
}

export function getMatchMedia () {
  if (!IN_BROWSER) return

  return window.matchMedia('(prefers-color-scheme: dark)')
}

export function propsToString (props: Record<string, any>, indent = 1) {
  const displayedProps =
    Object.entries(props)
      .filter(([k, v]) => v !== undefined)
      .map(([k, v]) => {
        if (v === true) return k

        return `${k}="${v}"`
      })

  const propsString = displayedProps.join(' ')

  const shouldWrap = propsString.length > 50
  if (!shouldWrap) {
    return ' ' + propsString
  } else {
    return '\n' + displayedProps.map(v => '  '.repeat(indent) + v).join('\n') + '\n'
  }
}
