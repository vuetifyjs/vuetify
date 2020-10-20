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
      } as any,
      vnode,
      null
    )

    expect((el as any)._observe).toBeTruthy()
    expect(callback).not.toHaveBeenCalled()

    document.body.removeChild(el)

    Intersect.unmounted(el, {}, vnode, vnode)

    expect((el as any)._observe).toBeUndefined()
  })

  it('should invoke callback once and unmount', () => {
    const vnode = h('div')
    const el = document.createElement('div')

    document.body.appendChild(el)

    const callback = jest.fn()

    Intersect.mounted(el, {
      value: callback,
      modifiers: { once: true },
    } as any, vnode, null)

    expect(callback).toHaveBeenCalled()
    expect((el as any)._observe).toBeTruthy()

    if ((el as any)._observe) {
      (el as any)._observe.observer.callback()
    }

    expect(callback).toHaveBeenCalledTimes(2)
    expect((el as any)._observe).toBeUndefined()
  })
})
