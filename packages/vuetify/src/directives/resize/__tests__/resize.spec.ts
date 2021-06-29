import { describe, expect, it } from '@jest/globals'

// Setup
import { h } from 'vue'

// Directives
import Resize from '../'

describe('v-resize', () => {
  it('should bind event on inserted', () => {
    const callback = jest.fn()

    jest.spyOn(window, 'addEventListener')
    jest.spyOn(window, 'removeEventListener')

    const el = {}

    Resize.mounted!(el as HTMLElement, { value: callback } as any)
    expect(callback).toHaveBeenCalled()
    expect(window.addEventListener).toHaveBeenCalledWith('resize', callback, { passive: true })

    Resize.unmounted!(el as HTMLElement)
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', callback, { passive: true })

    ;(window.addEventListener as jest.Mock).mockClear()
    ;(window.removeEventListener as jest.Mock).mockClear()
  })

  it('should not run the callback in quiet mode', () => {
    const callback = jest.fn()

    jest.spyOn(window, 'addEventListener')
    jest.spyOn(window, 'removeEventListener')

    const el = {}

    Resize.mounted!(el as HTMLElement, { value: callback, modifiers: { quiet: true } } as any)
    expect(callback).not.toHaveBeenCalled()
    expect(window.addEventListener).toHaveBeenCalledWith('resize', callback, { passive: true })

    Resize.unmounted!(el as HTMLElement)
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', callback, { passive: true })

    ;(window.addEventListener as jest.Mock).mockClear()
    ;(window.removeEventListener as jest.Mock).mockClear()
  })
})
