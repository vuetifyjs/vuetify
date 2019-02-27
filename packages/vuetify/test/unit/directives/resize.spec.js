jest.mock('css-element-queries/src/ResizeSensor')
import Resize from '@/directives/resize'
import { test } from '@/test'
import ResizeSensor from 'css-element-queries/src/ResizeSensor'

test('resize.js', () => {
  it('shoud bind event on inserted', () => {
    const callback = jest.fn()
    const el = {}

    Resize.inserted(el, { value: callback })
    expect(callback).toBeCalled()
    expect(ResizeSensor).toBeCalledWith(el, callback)
    Resize.unbind(el)
    expect(el).not.toHaveProperty('_resizeSensor')
  })

  it('shoud not run the callback in quiet mode', () => {
    const callback = jest.fn()
    const el = {}

    Resize.inserted(el, { value: callback, modifiers: { quiet: true } })
    expect(callback).not.toBeCalled()
    expect(ResizeSensor).toBeCalledWith(el, callback)
    Resize.unbind(el)
    expect(el).not.toHaveProperty('_resizeSensor')
  })
})
