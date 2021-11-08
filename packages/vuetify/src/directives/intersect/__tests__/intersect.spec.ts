// Directives
import Intersect from '../'

describe('intersect', () => {
  it('should bind event on inserted', () => {
    const callback = jest.fn()
    const el = document.createElement('div')
    document.body.appendChild(el)

    Intersect.inserted(el, {
      value: callback,
      modifiers: { quiet: true },
    } as any, { context: { _uid: 1 } } as any)

    expect((el as any)._observe).toBeTruthy()
    expect(callback).not.toHaveBeenCalled()

    document.body.removeChild(el)

    Intersect.unbind(el, {
      value: callback,
      modifiers: { quiet: true },
    } as any, { context: { _uid: 1 } } as any)

    expect((el as any)._observe[1]).toBeFalsy()
  })

  it('should invoke callback once and unbind', () => {
    const el = document.createElement('div')

    document.body.appendChild(el)

    const callback = jest.fn()

    Intersect.inserted(el, {
      value: callback,
      modifiers: { once: true },
    } as any, { context: { _uid: 1 } } as any)

    expect(callback).toHaveBeenCalledTimes(0)
    expect((el as any)._observe[1]).toBeTruthy()

    ;(el as any)._observe[1].observer.callback([{ isIntersecting: false }])

    expect(callback).toHaveBeenCalledTimes(1)
    expect((el as any)._observe[1]).toBeTruthy()

    ;(el as any)._observe[1].observer.callback([{ isIntersecting: true }])

    expect(callback).toHaveBeenCalledTimes(2)
    expect((el as any)._observe[1]).toBeFalsy()
  })
})
