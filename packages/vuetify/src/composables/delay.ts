// Utilities
import propsFactory from '@/util/propsFactory'

export interface DelayProps {
  closeDelay?: number | string
  openDelay?: number | string
}

export const makeDelayProps = propsFactory({
  closeDelay: {
    type: [Number, String],
  },
  openDelay: {
    type: [Number, String],
  },
})

export function useDelay (props: DelayProps, cb?: (value: boolean) => void) {
  const delays: Partial<Record<keyof DelayProps, number>> = {}

  const runDelayFactory = (prop: keyof DelayProps) => (): Promise<boolean> => {
    const active = prop === 'openDelay'

    delays.closeDelay && window.clearTimeout(delays.closeDelay)
    delete delays.closeDelay

    delays.openDelay && window.clearTimeout(delays.openDelay)
    delete delays.openDelay

    return new Promise(resolve => {
      delays[prop] = window.setTimeout(() => {
        cb?.(active)
        resolve(active)
      }, parseInt(props[prop] ?? 0, 10))
    })
  }

  return {
    runCloseDelay: runDelayFactory('closeDelay'),
    runOpenDelay: runDelayFactory('openDelay'),
  }
}
