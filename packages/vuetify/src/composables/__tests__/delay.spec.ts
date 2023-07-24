// Composables
import { makeDelayProps, useDelay } from '../delay'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { mount } from '@vue/test-utils'
import { wait } from '../../../test'

describe('delayProps', () => {
  it('should allow setting default values', () => {
    const wrapper = mount({
      template: '<div />',
      props: makeDelayProps({
        closeDelay: 42,
        openDelay: 7,
      }),
    })

    expect(wrapper.props()).toStrictEqual({
      closeDelay: 42,
      openDelay: 7,
    })
  })
})

describe('useDelay', () => {
  it.each(['runOpenDelay', 'runCloseDelay'] as const)('should call %s - callback', async methodName => {
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
  })

  it.each(['runOpenDelay', 'runCloseDelay'] as const)('should call %s - promise', async methodName => {
    const cb = jest.fn(val => val)
    const runDelay = useDelay({
      openDelay: 50,
      closeDelay: 50,
    })[methodName]

    const delay = runDelay().then(cb)

    await Promise.race([
      delay,
      wait(30),
    ])
    expect(cb).not.toHaveBeenCalled()

    await expect(delay).resolves.toBe(methodName === 'runOpenDelay')
  })

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
