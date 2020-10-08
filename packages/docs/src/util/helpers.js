// Globals
import { IN_BROWSER } from '@/util/globals'

export function copyElementContent (el) {
  if (!IN_BROWSER) return

  el.setAttribute('contenteditable', 'true')
  el.focus()

  document.execCommand('selectAll', false, null)
  document.execCommand('copy')

  el.removeAttribute('contenteditable')
}

export function getBranch () {
  const branch = IN_BROWSER
    ? window.location.hostname.split('.')[0]
    : 'master'

  return ['master', 'dev', 'next'].includes(branch) ? branch : 'master'
}

export const wait = timeout => {
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
