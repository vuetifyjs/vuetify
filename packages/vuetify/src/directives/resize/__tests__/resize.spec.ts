// Directives
import Resize from '../'

// Utilities
import { expect, it } from 'vitest'

// Types
import type { Mock } from 'vitest'

const instance = {
  $: { uid: 1 },
}

describe('v-resize', () => {
  it('should bind event on inserted', () => {
    const callback = vi.fn()

    vi.spyOn(window, 'addEventListener')
    vi.spyOn(window, 'removeEventListener')

    const el = {}

    Resize.mounted!(el as HTMLElement, { value: callback, instance } as any)
    expect(callback).toHaveBeenCalled()
    expect(window.addEventListener).toHaveBeenCalledWith('resize', callback, { passive: true })

    Resize.unmounted!(el as HTMLElement, { value: callback, instance } as any)
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', callback, { passive: true })

    ;(window.addEventListener as Mock).mockClear()
    ;(window.removeEventListener as Mock).mockClear()
  })

  it('should not run the callback in quiet mode', () => {
    const callback = vi.fn()

    vi.spyOn(window, 'addEventListener')
    vi.spyOn(window, 'removeEventListener')

    const el = {}

    Resize.mounted!(el as HTMLElement, { value: callback, modifiers: { quiet: true }, instance } as any)
    expect(callback).not.toHaveBeenCalled()
    expect(window.addEventListener).toHaveBeenCalledWith('resize', callback, { passive: true })

    Resize.unmounted!(el as HTMLElement, { value: callback, modifiers: { quiet: true }, instance } as any)
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', callback, { passive: true })

    ;(window.addEventListener as Mock).mockClear()
    ;(window.removeEventListener as Mock).mockClear()
  })
})
