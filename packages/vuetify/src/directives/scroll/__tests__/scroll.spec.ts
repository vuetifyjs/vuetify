// Directives
import Scroll from '../'

describe('scroll.ts', () => {
  it('shoud bind event on inserted (selector)', () => {
    const value = () => {}
    const options = {}
    const targetElement = { addEventListener: jest.fn(), removeEventListener: jest.fn() }
    const el = {}

    jest.spyOn(window.document, 'querySelector').mockImplementation(selector => selector === '.selector' ? targetElement : undefined)

    Scroll.inserted(el as HTMLElement, { value, arg: '.selector' } as any, null, null)
    expect(targetElement.addEventListener).toHaveBeenCalledWith('scroll', value, { passive: true })
    Scroll.unbind(el as HTMLElement, null, null, null)
    expect(targetElement.removeEventListener).toHaveBeenCalledWith('scroll', value, { passive: true })

    Scroll.inserted(el as HTMLElement, { value, arg: '.selector', options } as any, null, null)
    expect(targetElement.addEventListener).toHaveBeenCalledWith('scroll', value, options)
    Scroll.unbind(el as HTMLElement, null, null, null)
    expect(targetElement.removeEventListener).toHaveBeenCalledWith('scroll', value, options)
  })

  it('shoud bind event on inserted (window)', () => {
    const value = () => {}
    jest.spyOn(window, 'addEventListener')
    jest.spyOn(window, 'removeEventListener')
    const el = {}

    Scroll.inserted(el as HTMLElement, { value } as any, null, null)
    expect(window.addEventListener).toHaveBeenCalledWith('scroll', value, { passive: true })
    Scroll.unbind(el as HTMLElement, null, null, null)
    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', value, { passive: true })
  })

  it('should not fail when unbinding element without _onScroll', () => {
    Scroll.unbind({} as HTMLElement, null, null, null)
  })
})
