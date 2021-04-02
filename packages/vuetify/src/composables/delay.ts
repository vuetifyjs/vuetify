// Utilities
import { IN_BROWSER, propsFactory } from '@/util'

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
  const delays: Partial<Record<keyof DelayProps, number>> = {}
  const runDelayFactory = (prop: keyof DelayProps) => (): Promise<boolean> => {
    // istanbul ignore next
    if (!IN_BROWSER) return Promise.resolve(true)

    const active = prop === 'openDelay'

    delays.closeDelay && window.clearTimeout(delays.closeDelay)
    delete delays.closeDelay

    delays.openDelay && window.clearTimeout(delays.openDelay)
    delete delays.openDelay

    return new Promise(resolve => {
      const delay = parseInt(props[prop] ?? 0, 10)

      delays[prop] = window.setTimeout(() => {
        cb?.(active)
        resolve(active)
      }, delay)
    })
  }

  return {
    runCloseDelay: runDelayFactory('closeDelay'),
    runOpenDelay: runDelayFactory('openDelay'),
  }
}
