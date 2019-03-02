import Resize from '@/directives/resize'
import { test } from '@/test'

test('resize.js', () => {
  it('shoud bind event on inserted', () => {
    const callback = jest.fn()
    jest.spyOn(global, 'addEventListener')
    jest.spyOn(global, 'removeEventListener')
    const el = {}

    Resize.inserted(el, { value: callback })
    expect(callback).toHaveBeenCalled()
    expect(window.addEventListener).toHaveBeenCalledWith('resize', callback, { passive: true })
    Resize.unbind(el)
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', callback, { passive: true })
  })

  it('shoud not run the callback in quiet mode', () => {
    const callback = jest.fn()
    jest.spyOn(global, 'addEventListener')
    jest.spyOn(global, 'removeEventListener')
    const el = {}

    Resize.inserted(el, { value: callback, modifiers: { quiet: true } })
    expect(callback).not.toHaveBeenCalled()
    expect(window.addEventListener).toHaveBeenCalledWith('resize', callback, { passive: true })
    Resize.unbind(el)
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', callback, { passive: true })
  })
})
