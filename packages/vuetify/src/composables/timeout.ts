// Utilities
import { onScopeDispose } from 'vue'

export function useTimeout () {
  let timerId = -1

  onScopeDispose(clear)

  function start (ms: number, cb: () => void) {
    clear()
    if (ms > 0) {
      timerId = window.setTimeout(() => {
        timerId = -1
        cb()
      }, ms)
    }
  }

  function clear () {
    window.clearTimeout(timerId)
    timerId = -1
  }

  return { start, clear }
}
