import Resize from '@/directives/resize'
import { test } from '@/test'

test('resize.js', () => {
  it('shoud bind event on inserted', () => {
    const callback = jest.fn()
    global.addEventListener = jest.fn()
    global.removeEventListener = jest.fn()
    const el = {}

    Resize.inserted(el, { value: callback })
    expect(callback).toBeCalled()
    expect(window.addEventListener).toBeCalledWith('resize', callback, { passive: true })
    Resize.unbind(el)
    expect(window.removeEventListener).toBeCalledWith('resize', callback, { passive: true })
  })

  it('shoud not run the callback in quiet mode', () => {
    const callback = jest.fn()
    global.addEventListener = jest.fn()
    global.removeEventListener = jest.fn()
    const el = {}

    Resize.inserted(el, { value: callback, modifiers: { quiet: true } })
    expect(callback).not.toBeCalled()
    expect(window.addEventListener).toBeCalledWith('resize', callback, { passive: true })
    Resize.unbind(el)
    expect(window.removeEventListener).toBeCalledWith('resize', callback, { passive: true })
  })
})
