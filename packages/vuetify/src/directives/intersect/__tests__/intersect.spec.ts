import { describe, expect, it } from '@jest/globals'

// Libraries
import { h } from 'vue'

// Directives
import Intersect from '../'

describe('v-intersect', () => {
  it('should bind event on mounted', () => {
    const callback = jest.fn()
    const vnode = h('div')
    const el = document.createElement('div')
    document.body.appendChild(el)

    Intersect.mounted(
      el,
      {
        value: callback,
        modifiers: { quiet: true },
        instance: {
          $: { uid: 1 },
        },
      } as any,
      vnode,
      null
    )

    expect((el as any)._observe).toBeTruthy()
    expect(callback).not.toHaveBeenCalled()

    document.body.removeChild(el)

    Intersect.unmounted(el, {
      instance: {
        $: { uid: 1 },
      },
    } as any, vnode, vnode)

    expect((el as any)._observe[1]).toBeUndefined()
  })

  it('should invoke callback once and unmount', () => {
    const vnode = h('div')
    const el = document.createElement('div')

    document.body.appendChild(el)

    const callback = jest.fn()

    Intersect.mounted(el, {
      value: callback,
      modifiers: { once: true },
      instance: {
        $: { uid: 1 },
      },
    } as any, vnode, null)

    expect(callback).toHaveBeenCalledTimes(0)
    expect((el as any)._observe[1]).toBeTruthy()

    ;(el as any)._observe[1].observer.callback([{ isIntersecting: false }])

    expect(callback).toHaveBeenCalledTimes(1)
    expect((el as any)._observe[1]).toBeTruthy()

    ;(el as any)._observe[1].observer.callback([{ isIntersecting: true }])

    expect(callback).toHaveBeenCalledTimes(2)
    expect((el as any)._observe[1]).toBeUndefined()
  })
})
