import Scroll from '@/directives/scroll'
import { test } from '@/test'

test('scroll.js', () => {
  it('shoud bind event on inserted (selector)', () => {
    const value = () => {}
    const options = {}
    const targetElement = { addEventListener: jest.fn(), removeEventListener: jest.fn() }
    const el = {}

    global.document.querySelector = jest.fn().mockImplementation(selector => selector === '.selector' ? targetElement : undefined)

    Scroll.inserted(el, { value, arg: '.selector' })
    expect(targetElement.addEventListener).toBeCalledWith('scroll', value, { passive: true })
    Scroll.unbind(el)
    expect(targetElement.removeEventListener).toBeCalledWith('scroll', value, { passive: true })

    Scroll.inserted(el, { value, arg: '.selector', options })
    expect(targetElement.addEventListener).toBeCalledWith('scroll', value, options)
    Scroll.unbind(el)
    expect(targetElement.removeEventListener).toBeCalledWith('scroll', value, options)
  })

  it('shoud bind event on inserted (window)', () => {
    const value = () => {}
    global.addEventListener = jest.fn()
    global.removeEventListener = jest.fn()
    const el = {}

    Scroll.inserted(el, { value })
    expect(global.addEventListener).toBeCalledWith('scroll', value, { passive: true })
    Scroll.unbind(el)
    expect(global.removeEventListener).toBeCalledWith('scroll', value, { passive: true })
  })

  it('should not fail when unbinding element without _onScroll', () => {
    Scroll.unbind({})
  })
})
