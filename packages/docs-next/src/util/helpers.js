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
