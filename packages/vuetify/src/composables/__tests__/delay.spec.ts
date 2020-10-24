// Effects
import {
  delayProps,
  useDelay,
} from '../delay'

describe('delay.ts', () => {
  describe('delayProps', () => {
    const props = delayProps({
      closeDelay: 42,
      openDelay: 7,
    })

    expect(props).toEqual({
      closeDelay: {
        type: [Number, String],
        default: 42,
      },
      openDelay: {
        type: [Number, String],
        default: 7,
      },
    })
  })

  describe('useDelay', () => {
    const delayCallbackTestFactory = (methodName: 'runOpenDelay' | 'runCloseDelay') => async () => {
      const cb = jest.fn()
      const runDelay = useDelay({
        openDelay: 50,
        closeDelay: 50,
      }, cb)[methodName]

      runDelay()

      await wait(30)
      expect(cb).not.toHaveBeenCalled()

      await wait(30)
      expect(cb).toHaveBeenCalledWith(methodName === 'runOpenDelay')
    }

    const delayPromiseTestFactory = (methodName: 'runOpenDelay' | 'runCloseDelay') => async () => {
      const cb = jest.fn()
      const runDelay = useDelay({
        openDelay: 50,
        closeDelay: 50,
      }, cb)[methodName]

      await Promise.race([
        runDelay(),
        wait(30),
      ])
      expect(cb).not.toHaveBeenCalled()

      await wait(30)
      expect(cb).toHaveBeenCalledWith(methodName === 'runOpenDelay')
    }

    const wait = (delay: number) => new Promise(resolve => setTimeout(resolve, delay))

    it('should call the callback on open', delayCallbackTestFactory('runOpenDelay'))

    it('should call the callback on close', delayCallbackTestFactory('runCloseDelay'))

    it('should return the promise on open', delayPromiseTestFactory('runOpenDelay'))

    it('should return the promise on close', delayPromiseTestFactory('runCloseDelay'))

    it('should cancel delay when running a new one', async () => {
      const cb = jest.fn()
      const { runOpenDelay, runCloseDelay } = useDelay({
        closeDelay: 50,
        openDelay: 50,
      }, cb)

      runOpenDelay()
      await wait(30)
      runCloseDelay()
      await wait(60)

      expect(cb).toHaveBeenCalledTimes(1)
      expect(cb).toHaveBeenCalledWith(false)
    })
  })
})
