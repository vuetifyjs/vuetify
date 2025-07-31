// Utilities
import { defer, propsFactory } from '@/util'

// Types
export interface DelayProps {
  closeDelay?: number | string
  openDelay?: number | string
}

// Composables
export const makeDelayProps = propsFactory({
  closeDelay: [Number, String],
  openDelay: [Number, String],
}, 'delay')

export function useDelay (props: DelayProps, cb?: (value: boolean) => void) {
  let clearDelay: (() => void) = () => {}

  function runDelay (isOpening: boolean) {
    clearDelay?.()

    const delay = Number(isOpening ? props.openDelay : props.closeDelay)

    return new Promise(resolve => {
      clearDelay = defer(delay, () => {
        cb?.(isOpening)
        resolve(isOpening)
      })
    })
  }

  function runOpenDelay () {
    return runDelay(true)
  }

  function runCloseDelay () {
    return runDelay(false)
  }

  return {
    clearDelay,
    runOpenDelay,
    runCloseDelay,
  }
}
