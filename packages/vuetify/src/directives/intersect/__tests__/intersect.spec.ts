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
    } as any)

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

    expect(callback).toHaveBeenCalledTimes(1)
    expect((el as any)._observe).toBeTruthy()

    ;(el as any)._observe.observer.callback([{ isIntersecting: false }])

    expect(callback).toHaveBeenCalledTimes(1)
    expect((el as any)._observe).toBeTruthy()

    ;(el as any)._observe.observer.callback([{ isIntersecting: true }])

    expect(callback).toHaveBeenCalledTimes(2)
    expect((el as any)._observe).toBeFalsy()
  })
})
