import Scroll from '@/directives/scroll'
import { test } from '@/test'

test('scroll.js', () => {
  it('shoud bind event on inserted (selector)', () => {
    const value = () => {}
    const options = {}
    const targetElement = { addEventListener: jest.fn(), removeEventListener: jest.fn() }
    const el = {}

    jest.spyOn(global.document, 'querySelector').mockImplementation(selector => selector === '.selector' ? targetElement : undefined)

    Scroll.inserted(el, { value, arg: '.selector' })
    expect(targetElement.addEventListener).toHaveBeenCalledWith('scroll', value, { passive: true })
    Scroll.unbind(el)
    expect(targetElement.removeEventListener).toHaveBeenCalledWith('scroll', value, { passive: true })

    Scroll.inserted(el, { value, arg: '.selector', options })
    expect(targetElement.addEventListener).toHaveBeenCalledWith('scroll', value, options)
    Scroll.unbind(el)
    expect(targetElement.removeEventListener).toHaveBeenCalledWith('scroll', value, options)
  })

  it('shoud bind event on inserted (window)', () => {
    const value = () => {}
    jest.spyOn(global, 'addEventListener')
    jest.spyOn(global, 'removeEventListener')
    const el = {}

    Scroll.inserted(el, { value })
    expect(global.addEventListener).toHaveBeenCalledWith('scroll', value, { passive: true })
    Scroll.unbind(el)
    expect(global.removeEventListener).toHaveBeenCalledWith('scroll', value, { passive: true })
  })

  it('should not fail when unbinding element without _onScroll', () => {
    Scroll.unbind({})
  })
})
