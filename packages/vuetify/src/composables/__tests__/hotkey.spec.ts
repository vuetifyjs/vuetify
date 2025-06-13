// Composables
import { useHotkey } from '../hotkey'

// Utilities
import { wait } from '@test'
import { ref } from 'vue'

describe('hotkey.ts', () => {
  const originalNavigator = window.navigator
  afterEach(() => {
    Object.defineProperty(window, 'navigator', { value: originalNavigator, writable: true })
  })

  it.each([
    ['ctrl+a', { ctrlKey: true, key: 'a' }],
    ['ctrl_a', { ctrlKey: true, key: 'a' }],
    ['ctrl+shift+b', { ctrlKey: true, shiftKey: true, key: 'b' }],
    ['ctrl_shift_b', { ctrlKey: true, shiftKey: true, key: 'b' }],
    ['alt+f4', { altKey: true, key: 'f4' }],
    ['meta+s', { metaKey: true, key: 's' }],
    ['shift+tab', { shiftKey: true, key: 'tab' }],
    ['ctrl+alt+delete', { ctrlKey: true, altKey: true, key: 'delete' }],
    ['meta+shift+z', { metaKey: true, shiftKey: true, key: 'z' }],
    ['escape', { key: 'escape' }],
    ['f1', { key: 'f1' }],
    ['enter', { key: 'enter' }],
    [' ', { key: ' ' }],
    ['ctrl+shift+alt+meta+x', { ctrlKey: true, shiftKey: true, altKey: true, metaKey: true, key: 'x' }],
  ])('fires on %s', (combo, props) => {
    const cb = vi.fn()
    const stop = useHotkey(combo, cb)

    window.dispatchEvent(new KeyboardEvent('keydown', { ...{ ctrlKey: false, shiftKey: false, altKey: false, metaKey: false }, ...props }))

    expect(cb).toHaveBeenCalledTimes(1)

    stop()
  })

  describe.each([
    ['complete', 0, ['g', 'g'], 1],
    ['incomplete', 0, ['g'], 0],
    ['timeout', 1100, ['g', 'g'], 0],
  ])('%s g‑g', (_, gap, seq, expected) => {
    it('callback count matches', async () => {
      vi.useFakeTimers()
      const cb = vi.fn()
      const stop = useHotkey('g-g', cb)

      window.dispatchEvent(new KeyboardEvent('keydown', { key: seq[0] }))
      vi.advanceTimersByTime(gap)
      // eslint-disable-next-line vitest/no-conditional-in-test
      if (seq[1]) window.dispatchEvent(new KeyboardEvent('keydown', { key: seq[1] }))
      expect(cb).toHaveBeenCalledTimes(expected)

      stop()

      vi.useRealTimers()
    })
  })

  it.each([
    ['extra modifiers', 'ctrl+a', { ctrlKey: true, shiftKey: true, key: 'a' }],
    ['modifiers only', 'ctrl+shift+b', { ctrlKey: true, shiftKey: true, key: 'Control' }],
  ])('%s ignored', (_, combo, evtProps) => {
    const cb = vi.fn()
    const stop = useHotkey(combo, cb)

    window.dispatchEvent(new KeyboardEvent('keydown', evtProps))

    expect(cb).not.toHaveBeenCalled()

    stop()
  })

  describe.each([
    [false, 'input', () => document.createElement('input')],
    [false, 'contentEditable', () => Object.assign(document.createElement('div'), { contentEditable: 'true', tabIndex: 0 })],
    [true, 'input allowed', () => document.createElement('input')],
  ])('inputs=%s (%s)', (flag, _label, factory) => {
    it('honours inputs flag', () => {
      const cb = vi.fn()
      const stop = useHotkey('ctrl+a', cb, { inputs: flag })
      const el = factory(); document.body.appendChild(el); el.focus()

      window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'a' }))

      expect(cb).toHaveBeenCalledTimes(flag ? 1 : 0)

      stop(); document.body.removeChild(el)
    })
  })

  it.each([[true, true], [false, false]])('preventDefault=%s', (setting, shouldCall) => {
    const cb = vi.fn()
    const stop = useHotkey('ctrl+a', cb, { preventDefault: setting })
    const evt = new KeyboardEvent('keydown', { ctrlKey: true, key: 'a' })
    const spy = vi.spyOn(evt, 'preventDefault')

    window.dispatchEvent(evt)

    expect(cb).toHaveBeenCalledTimes(1)

    expect(spy).toHaveBeenCalledTimes(shouldCall ? 1 : 0)

    stop()
  })

  it.each([
    ['Mac ctrl', 'ctrl+s', { ctrlKey: true, key: 's' }, 'Macintosh'],
    ['Mac cmd', 'cmd+s', { metaKey: true, key: 's' }, 'Macintosh'],
  ])('%s', (_, combo, evtProps, ua) => {
    const cb = vi.fn()
    Object.defineProperty(window, 'navigator', { value: { userAgent: `Mozilla/5.0 (${ua})` }, writable: true })
    const stop = useHotkey(combo, cb)

    window.dispatchEvent(new KeyboardEvent('keydown', evtProps))

    expect(cb).toHaveBeenCalledTimes(1)

    stop()
  })

  it('reactive ref & disabled', async () => {
    const cb = vi.fn()
    const keyRef = ref<string>('ctrl+a')
    const stop = useHotkey(keyRef, cb)

    window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'a' }))
    expect(cb).toHaveBeenCalledTimes(1)

    keyRef.value = 'ctrl+b'
    await wait(10)
    window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'a' }))
    expect(cb).toHaveBeenCalledTimes(1)

    window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'b' }))
    expect(cb).toHaveBeenCalledTimes(2)

    keyRef.value = undefined as any
    await wait(10)
    window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'b' }))
    expect(cb).toHaveBeenCalledTimes(2)

    stop()
  })

  it.each([
    ['case insensitive', 'CTRL+A', { ctrlKey: true, key: 'A' }, 1],
    ['missing key', 'ctrl+', { ctrlKey: true, key: 'a' }, 0],
  ])('%s', (_, combo, evtProps, exp) => {
    const cb = vi.fn()
    const stop = useHotkey(combo as any, cb)

    window.dispatchEvent(new KeyboardEvent('keydown', evtProps))

    expect(cb).toHaveBeenCalledTimes(exp)

    stop()
  })

  it('long ctrl+k-p-s sequence', () => {
    const cb = vi.fn()
    const stop = useHotkey('ctrl+k-p-s', cb)

    window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'k' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'p' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 's' }))

    expect(cb).toHaveBeenCalledTimes(1)

    stop()
  })

  it('multiple g-g completions', () => {
    const cb = vi.fn()
    const stop = useHotkey('g-g', cb)
    for (let i = 0; i < 2; i++) {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'g' }))
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'g' }))
    }

    expect(cb).toHaveBeenCalledTimes(2)

    stop()
  })

  it('handles undefined navigator gracefully', () => {
    const orig = window.navigator
    Object.defineProperty(window, 'navigator', { value: undefined, writable: true })
    try {
      const cb = vi.fn()
      const stop = useHotkey('ctrl+s', cb)

      window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 's' }))

      expect(cb).toHaveBeenCalledTimes(1)

      stop()
    } finally {
      Object.defineProperty(window, 'navigator', { value: orig, writable: true })
    }
  })

  describe('alt ± combos', () => {
    it.each([
      ['alt--', '-'],
      ['alt++', '+'],
      ['alt+-', '-'],
      ['alt-+', '+'],
    ])('%s triggers', (combo, key) => {
      const cb = vi.fn()
      const stop = useHotkey(combo, cb)

      window.dispatchEvent(new KeyboardEvent('keydown', { altKey: true, key }))

      expect(cb).toHaveBeenCalledTimes(1)

      const wrong = key === '-' ? '+' : '-'
      window.dispatchEvent(new KeyboardEvent('keydown', { altKey: true, key: wrong }))

      expect(cb).toHaveBeenCalledTimes(1)

      window.dispatchEvent(new KeyboardEvent('keydown', { key }))

      expect(cb).toHaveBeenCalledTimes(1)
      stop()
    })
  })

  describe('alt _ combos', () => {
    it.each([
      ['alt__', '_'],
      ['alt_+', '+'],
      ['alt_-', '-'],
      ['alt+_', '_'],
    ])('%s triggers', (combo, key) => {
      const cb = vi.fn()
      const stop = useHotkey(combo, cb)

      window.dispatchEvent(new KeyboardEvent('keydown', { altKey: true, key }))

      expect(cb).toHaveBeenCalledTimes(1)

      const wrong = key === '_' ? '+' : '_'

      window.dispatchEvent(new KeyboardEvent('keydown', { altKey: true, key: wrong }))

      expect(cb).toHaveBeenCalledTimes(1)

      window.dispatchEvent(new KeyboardEvent('keydown', { key }))

      expect(cb).toHaveBeenCalledTimes(1)

      stop()
    })
  })
})
