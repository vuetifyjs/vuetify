import Scroll from '@/directives/scroll'
import { test } from '@/test'

test('scroll.js', () => {
  it('shoud bind event on inserted (selector)', () => {
    const value = () => {}
    const options = {}
    const addEventListener = jest.fn()
    const removeEventListener = jest.fn()
    const targetElement = { addEventListener, removeEventListener }
    const el = {
      ownerDocument: {
        querySelector: selector => selector === '.selector' ? targetElement : undefined
      }
    }

    Scroll.inserted(el, { value, arg: '.selector' })
    expect(addEventListener).toBeCalledWith('scroll', value, { passive: true })
    Scroll.unbind(el)
    expect(removeEventListener).toBeCalledWith('scroll', value, { passive: true })

    Scroll.inserted(el, { value, arg: '.selector', options })
    expect(addEventListener).toBeCalledWith('scroll', value, options)
    Scroll.unbind(el)
    expect(removeEventListener).toBeCalledWith('scroll', value, options)
  })

  it('shoud bind event on inserted (window)', () => {
    const value = () => {}
    const options = {}
    const addEventListener = jest.fn()
    const removeEventListener = jest.fn()
    const window = { addEventListener, removeEventListener }
    const el = {
      ownerDocument: { defaultView: window }
    }

    Scroll.inserted(el, { value })
    expect(addEventListener).toBeCalledWith('scroll', value, { passive: true })
    Scroll.unbind(el)
    expect(removeEventListener).toBeCalledWith('scroll', value, { passive: true })
  })

  it('should not fail when unbinding element without _onScroll', () => {
    Scroll.unbind({})
  })
})
