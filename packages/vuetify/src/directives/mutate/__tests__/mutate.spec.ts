// Directives
import Mutate from '../'

(global as any).MutationObserver = class { // Mock MutationObserver
  _callback: Function

  constructor (callback) {
    this._callback = callback
  }

  disconnect () {}

  observe () {}

  trigger (evts: MutationRecord[]) { // Trigger this manually in tests
    this._callback(evts, this)
  }
}

describe('mutate.ts', () => {
  it('should bind event on inserted', () => {
    const callback = jest.fn()
    const el = document.createElement('div')
    document.body.appendChild(el)

    Mutate.inserted(el, {
      value: callback,
    } as any)

    expect((el as any)._mutate).toBeTruthy()
    expect(callback).not.toHaveBeenCalled()

    document.body.removeChild(el)

    Mutate.unbind(el)

    expect((el as any)._mutate).toBeFalsy()
  })

  it('should fire event on mutation', () => {
    const callback = jest.fn()
    const el = document.createElement('div')
    document.body.appendChild(el)

    Mutate.inserted(el, {
      value: callback,
    } as any)

    ;(el as any)._mutate.observer.trigger([{}])

    expect(callback).toHaveBeenCalledTimes(1)

    document.body.removeChild(el)

    Mutate.unbind(el)
  })

  it('should fire event once', () => {
    const callback = jest.fn()
    const el = document.createElement('div')
    document.body.appendChild(el)

    Mutate.inserted(el, {
      value: callback,
      modifiers: {
        once: true,
      },
    } as any)

    ;(el as any)._mutate.observer.trigger([{}])

    expect(callback).toHaveBeenCalledTimes(1)
    expect((el as any)._mutate).toBeFalsy()

    document.body.removeChild(el)
  })
})
