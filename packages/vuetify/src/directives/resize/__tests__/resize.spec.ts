// Directives
import Resize from '../'

describe('resize.ts', () => {
  it('should bind event on inserted', () => {
    const callback = jest.fn()
    jest.spyOn(window, 'addEventListener')
    jest.spyOn(window, 'removeEventListener')
    const el = {}

    Resize.inserted(el as HTMLElement, { value: callback } as any, { context: { _uid: 1 } } as any)
    expect(callback).toHaveBeenCalled()
    expect(window.addEventListener).toHaveBeenCalledWith('resize', callback, { passive: true })
    Resize.unbind(el as HTMLElement, { value: callback } as any, { context: { _uid: 1 } } as any)
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', callback, { passive: true })
  })

  it('should not run the callback in quiet mode', () => {
    const callback = jest.fn()
    jest.spyOn(window, 'addEventListener')
    jest.spyOn(window, 'removeEventListener')
    const el = {}

    Resize.inserted(el as HTMLElement, { value: callback, modifiers: { quiet: true } } as any, { context: { _uid: 1 } } as any)
    expect(callback).not.toHaveBeenCalled()
    expect(window.addEventListener).toHaveBeenCalledWith('resize', callback, { passive: true })
    Resize.unbind(el as HTMLElement, { value: callback, modifiers: { quiet: true } } as any, { context: { _uid: 1 } } as any)
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', callback, { passive: true })
  })
})
