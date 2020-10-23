// Setup
import { h } from 'vue'

// Directives
import Resize from '../'

describe('v-resize', () => {
  it('should bind event on inserted', () => {
    const callback = jest.fn()

    jest.spyOn(window, 'addEventListener')
    jest.spyOn(window, 'removeEventListener')

    const vnode = h('div')
    const el = {}

    Resize.mounted!(el as HTMLElement, { value: callback } as any, vnode, null)
    expect(callback).toHaveBeenCalled()
    expect(window.addEventListener).toHaveBeenCalledWith('resize', callback, { passive: true })

    Resize.unmounted!(el as HTMLElement, {} as any, vnode, vnode)
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', callback, { passive: true })

    ;(window.addEventListener as jest.Mock).mockClear()
    ;(window.removeEventListener as jest.Mock).mockClear()
  })

  it('should not run the callback in quiet mode', () => {
    const callback = jest.fn()

    jest.spyOn(window, 'addEventListener')
    jest.spyOn(window, 'removeEventListener')

    const vnode = h('div')
    const el = {}

    Resize.mounted!(el as HTMLElement, { value: callback, modifiers: { quiet: true } } as any, vnode, null)
    expect(callback).not.toHaveBeenCalled()
    expect(window.addEventListener).toHaveBeenCalledWith('resize', callback, { passive: true })

    Resize.unmounted!(el as HTMLElement, {} as any, vnode, vnode)
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', callback, { passive: true })

    ;(window.addEventListener as jest.Mock).mockClear()
    ;(window.removeEventListener as jest.Mock).mockClear()
  })
})
