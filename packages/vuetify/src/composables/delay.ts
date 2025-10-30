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

  function runDelay (isOpening: boolean, options?: { minDelay: number }) {
    clearDelay?.()

    const delay = Math.max(
      options?.minDelay ?? 0,
      Number(isOpening ? props.openDelay : props.closeDelay)
    )

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

  function runCloseDelay (options?: { minDelay: number }) {
    return runDelay(false, options)
  }

  return {
    clearDelay,
    runOpenDelay,
    runCloseDelay,
  }
}
