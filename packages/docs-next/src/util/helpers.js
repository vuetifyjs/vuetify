// Globals
import { IN_BROWSER, IS_PROD } from '@/util/globals'

export function copyElementContent (el) {
  el.setAttribute('contenteditable', 'true')
  el.focus()

  document.execCommand('selectAll', false, null)
  document.execCommand('copy')

  el.removeAttribute('contenteditable')
}

export function getBranch () {
  const branch = window
    ? window.location.hostname.split('.')[0]
    : 'master'

  return ['master', 'dev', 'next'].includes(branch) ? branch : 'master'
}

export const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

export async function waitForReadystate () {
  if (
    IN_BROWSER &&
    IS_PROD &&
    document.readyState !== 'complete'
  ) {
    await new Promise(resolve => {
      const cb = () => {
        window.requestAnimationFrame(resolve)
        window.removeEventListener('load', cb)
      }

      window.addEventListener('load', cb)
    })
  }
}
