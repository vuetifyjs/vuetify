// Directives
import Mutate from '..'

// Utilities

// Utilities

(global as any).MutationObserver = class { // Mock MutationObserver
  _callback: Function

  _observe = vi.fn()

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

const instance = {
  $: { uid: 1 },
}

describe('v-mutate', () => {
  it('should bind event on mounted', () => {
    const callback = vi.fn()
    const el = document.createElement('div')
    document.body.appendChild(el)

    Mutate.mounted(el, {
      value: callback,
      modifiers: {},
      instance,
    } as any)

    expect(el._mutate).toBeTruthy()
    expect(callback).not.toHaveBeenCalled()

    document.body.removeChild(el)

    Mutate.unmounted(el, { instance } as any)

    expect(el._mutate![1]).toBeUndefined()
  })

  it('should invoke callback once and then unmount', async () => {
    const callback = vi.fn()
    const el = document.createElement('div')
    document.body.appendChild(el)

    Mutate.mounted(el, {
      value: callback,
      modifiers: { once: true },
      instance,
    } as any)

    expect(callback).not.toHaveBeenCalled()
    expect(el._mutate).toBeTruthy()

    ;(el._mutate![1]!.observer as any)?.trigger([])

    expect(callback).toHaveBeenCalledTimes(1)
    expect(el._mutate![1]).toBeUndefined()
  })

  it('should invoke callback on mount, on mutation and then unmount', async () => {
    const callback = vi.fn()
    const el = document.createElement('div')
    document.body.appendChild(el)

    Mutate.mounted(el, {
      value: callback,
      modifiers: { immediate: true, once: true },
      instance,
    } as any)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(el._mutate).toBeTruthy()

    ;(el._mutate![1]!.observer as any)?.trigger([])

    expect(callback).toHaveBeenCalledTimes(2)
    expect(el._mutate![1]).toBeUndefined()
  })
})
