import { describe, expect, it } from '@jest/globals'

// Libraries
import { h } from 'vue'

// Directives
import Mutate from '../'

(global as any).MutationObserver = class { // Mock MutationObserver
  _callback: Function

  _observe = jest.fn()

  constructor (callback) {
    this._callback = callback
  }

  disconnect () {}

  observe (_, options) {
    this._observe(options)
  }

  trigger (evts: MutationRecord[]) { // Trigger this manually in tests
    this._callback(evts, this)
  }
}

describe('v-mutate', () => {
  it('should bind event on mounted', () => {
    const callback = jest.fn()
    const vnode = h('div') as any
    const el = document.createElement('div')
    document.body.appendChild(el)

    Mutate.mounted?.(
      el,
      {
        value: callback,
        modifiers: {},
      } as any,
      vnode,
      null
    )

    expect((el as any)._mutate).toBeTruthy()
    expect(callback).not.toHaveBeenCalled()

    document.body.removeChild(el)

    Mutate.unmounted?.(el, {} as any, vnode, vnode)

    expect((el as any)._mutate).toBeUndefined()
  })

  it('should invoke callback once and unmount', () => {
    const vnode = h('div') as any
    const el = document.createElement('div')

    document.body.appendChild(el)

    const callback = jest.fn()

    Mutate.mounted?.(el, {
      value: callback,
      modifiers: { once: true },
    } as any, vnode, null)

    expect(callback).toHaveBeenCalledTimes(0)
    expect((el as any)._mutate).toBeTruthy()

    ;(el as any)._mutate.observer.trigger([{}])

    expect(callback).toHaveBeenCalledTimes(1)
    expect((el as any)._mutate).toBeUndefined()
  })
})
