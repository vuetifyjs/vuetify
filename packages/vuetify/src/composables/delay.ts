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

    const rawDelay = isOpening ? props.openDelay : props.closeDelay;
    const parsedDelay = Number(rawDelay);
    const safeDelay = Number.isFinite(parsedDelay) ? parsedDelay : 0;

    const normalizedDelay = Math.max(options?.minDelay ?? 0, safeDelay);

    return new Promise(resolve => {
      clearDelay = defer(normalizedDelay, () => {
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
