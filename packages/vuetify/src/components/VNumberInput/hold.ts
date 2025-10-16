// Utilities
import { onScopeDispose } from 'vue'

const HOLD_REPEAT = 50
const HOLD_DELAY = 500

export function useHold ({ toggleUpDown }: { toggleUpDown: (increment: boolean) => void }) {
  let timeout = -1
  let interval = -1

  onScopeDispose(holdStop)

  function holdStart (value: 'up' | 'down') {
    holdStop()
    tick(value)
    window.addEventListener('pointerup', holdStop)
    document.addEventListener('blur', holdStop)
    timeout = window.setTimeout(() => {
      interval = window.setInterval(() => tick(value), HOLD_REPEAT)
    }, HOLD_DELAY)
  }

  function holdStop () {
    window.clearTimeout(timeout)
    window.clearInterval(interval)
    window.removeEventListener('pointerup', holdStop)
    document.removeEventListener('blur', holdStop)
  }

  function tick (value: 'up' | 'down') {
    toggleUpDown(value === 'up')
  }

  return { holdStart, holdStop }
}
