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

export function useDelay (props: DelayProps, activate: (value: boolean) => void) {
  const delays: Partial<Record<keyof DelayProps, number>> = {}

  const runDelayFactory = (prop: keyof DelayProps) => (cb?: () => void) => {
    const delay = parseInt(props[prop], 10)

    delays.closeDelay && window.clearTimeout(delays.closeDelay)
    delete delays.closeDelay

    delays.openDelay && window.clearTimeout(delays.openDelay)
    delete delays.openDelay

    delays[prop] = window.setTimeout(cb || (() => activate(prop === 'openDelay')), delay)
  }

  return {
    runCloseDelay: runDelayFactory('closeDelay'),
    runOpenDelay: runDelayFactory('openDelay'),
  }
}
