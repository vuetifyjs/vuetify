export interface DelayProps {
  closeDelay: number | string
  openDelay: number | string
}

export function delayProps (
  defaults: Partial<DelayProps> = {}
) {
  return {
    closeDelay: {
      type: [Number, String],
      default: defaults.closeDelay,
    },
    openDelay: {
      type: [Number, String],
      default: defaults.openDelay,
    },
  }
}

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
        cb && cb(active) // eslint-disable-line standard/no-callback-literal
        resolve(active)
      }, parseInt(props[prop], 10))
    })
  }

  return {
    runCloseDelay: runDelayFactory('closeDelay'),
    runOpenDelay: runDelayFactory('openDelay'),
  }
}
