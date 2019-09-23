// Directives
import Intersect from '../'

export function IntersectionObserverMock () {
  (global as any).IntersectionObserver = class IntersectionObserver {
    callback: (entries: any, observer: any) => {}

    constructor (callback, options) {
      this.callback = callback
    }

    observe () {
      this.callback([], this)
      return null
    }

    unobserve () {
      this.callback = undefined
      return null
    }
  }
}

describe('resize.ts', () => {
  beforeEach(() => {
    IntersectionObserverMock()
  })

  it('should bind event on inserted', () => {
    const callback = jest.fn()
    const el = document.createElement('div')
    document.body.appendChild(el)

    Intersect.inserted(el, {
      value: callback,
      modifiers: { quiet: true } } as any
    )

    expect((el as any)._observe).toBeTruthy()
    expect(callback).not.toHaveBeenCalled()

    document.body.removeChild(el)

    Intersect.unbind(el)

    expect((el as any)._observe).toBeFalsy()
  })

  it('should invoke callback once and unbind', () => {
    const el = document.createElement('div')

    document.body.appendChild(el)

    const callback = jest.fn()

    Intersect.inserted(el, {
      value: callback,
      modifiers: { once: true },
    } as any)

    expect(callback).toHaveBeenCalled()
    expect((el as any)._observe).toBeTruthy()

    if ((el as any)._observe) {
      (el as any)._observe.observer.callback()
    }

    expect(callback).toHaveBeenCalledTimes(2)
    expect((el as any)._observe).toBeFalsy()
  })
})
