export default function (cb) {
  if (document.readyState === 'complete') {
    return setTimeout(cb, 0)
  }

  document.addEventListener('DOMContentLoaded', cb)
}