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

describe('mutate.ts', () => {
  it('should bind event on inserted', () => {
    const callback = jest.fn()
    const el = document.createElement('div') as any
    document.body.appendChild(el)

    Mutate.inserted(el, {
      value: callback,
    } as any)

    expect(el._mutate).toBeTruthy()
    expect(callback).not.toHaveBeenCalled()

    document.body.removeChild(el)

    Mutate.unbind(el)

    expect(el._mutate).toBeFalsy()
  })

  it('should fire event on mutation', () => {
    const callback = jest.fn()
    const el = document.createElement('div') as any
    document.body.appendChild(el)

    Mutate.inserted(el, {
      value: callback,
    } as any)

    el._mutate.observer.trigger([{}])

    expect(callback).toHaveBeenCalledTimes(1)

    document.body.removeChild(el)

    Mutate.unbind(el)
  })

  it('should fire event once', () => {
    const callback = jest.fn()
    const el = document.createElement('div') as any
    document.body.appendChild(el)

    Mutate.inserted(el, {
      value: callback,
      modifiers: {
        once: true,
      },
    } as any)

    el._mutate.observer.trigger([{}])

    expect(callback).toHaveBeenCalledTimes(1)
    expect(el._mutate).toBeFalsy()

    document.body.removeChild(el)
  })

  it('should work with object value', () => {
    const callback = jest.fn()
    const el = document.createElement('div') as any
    document.body.appendChild(el)

    Mutate.inserted(el, {
      value: {
        options: {
          attributes: false,
          subtree: true,
        },
        handler: callback,
      },
    } as any)

    el._mutate.observer.trigger([{}])

    expect(callback).toHaveBeenCalledTimes(1)
    expect(el._mutate.observer._observe).toHaveBeenLastCalledWith({ attributes: false, subtree: true })

    document.body.removeChild(el)

    Mutate.unbind(el)
  })

  it('should work with observer modifiers', () => {
    const callback = jest.fn()
    const el = document.createElement('div') as any
    document.body.appendChild(el)

    Mutate.inserted(el, {
      value: callback,
      modifiers: {
        attr: true,
        child: true,
        sub: true,
      },
    } as any)

    el._mutate.observer.trigger([{}])

    expect(callback).toHaveBeenCalledTimes(1)
    expect(el._mutate.observer._observe).toHaveBeenLastCalledWith({ attributes: true, childList: true, subtree: true })

    document.body.removeChild(el)

    Mutate.unbind(el)
  })
})
