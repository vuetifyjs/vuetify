// Directives
import Mutate from '..'

// Utilities
import { describe, expect, it } from '@jest/globals'
import { h } from 'vue'

(global as any).MutationObserver = class { // Mock MutationObserver
  _callback: Function

  _observe = jest.fn()

  constructor (callback: () => {}) {
    this._callback = callback
  }

  disconnect () {}

  observe (_: any, options = {}) {
    this._observe(options)
  }

  trigger (evts: MutationRecord[]) { // Trigger this manually in tests
    this._callback(evts, this)
  }
}

describe('v-mutate', () => {
  it('should bind event on mounted', () => {
    const callback = jest.fn()
    const el = document.createElement('div')
    const vnode = h('div') as any

    document.body.appendChild(el)

    Mutate.mounted?.(el, {
      value: callback,
      modifiers: {},
    } as any, vnode, null)

    expect(el._mutate).toBeTruthy()
    expect(callback).not.toHaveBeenCalled()

    document.body.removeChild(el)

    Mutate.unmounted?.(el, {} as any, vnode, vnode)

    expect(el._mutate).toBeUndefined()
  })

  it('should invoke callback once and then unmount', async () => {
    const callback = jest.fn()
    const el = document.createElement('div')
    const vnode = h('div') as any

    document.body.appendChild(el)

    Mutate.mounted?.(el, {
      value: callback,
      modifiers: { once: true },
    } as any, vnode, null)

    expect(callback).not.toHaveBeenCalled()
    expect(el._mutate).toBeTruthy()

    ;(el?._mutate?.observer as any)?.trigger([])

    expect(callback).toHaveBeenCalledTimes(1)
    expect(el._mutate).toBeUndefined()
  })

  it('should invoke callback on mount, on mutation and then unmount', async () => {
    const callback = jest.fn()
    const el = document.createElement('div')
    const vnode = h('div') as any

    document.body.appendChild(el)

    Mutate.mounted?.(el, {
      value: callback,
      modifiers: { immediate: true, once: true },
    } as any, vnode, null)

    expect(callback).toHaveBeenCalled()
    expect(el._mutate).toBeTruthy()

    ;(el?._mutate?.observer as any)?.trigger([])

    expect(callback).toHaveBeenCalledTimes(2)
    expect(el._mutate).toBeUndefined()
  })
})
