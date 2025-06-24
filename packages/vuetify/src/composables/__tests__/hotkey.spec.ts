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
    ['ctrl++', { ctrlKey: true, key: '+' }],
    ['alt+-', { altKey: true, key: '-' }],
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
  ])('%s g‑g sequence', (_, gap, seq, expected) => {
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
  ])('%s platform handling', (_, combo, evtProps, ua) => {
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

  it('case insensitive matching', () => {
    const cb = vi.fn()
    const stop = useHotkey('CTRL+A', cb)

    window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'A' }))

    expect(cb).toHaveBeenCalledTimes(1)

    stop()
  })

  it('long sequence ctrl+k-p-s', () => {
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

  it('handles sequence with literal symbols', () => {
    const cb = vi.fn()
    const stop = useHotkey('ctrl+a-shift+-', cb)

    // First part of sequence
    window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'a' }))
    expect(cb).toHaveBeenCalledTimes(0) // Should not trigger yet

    // Second part of sequence
    window.dispatchEvent(new KeyboardEvent('keydown', { shiftKey: true, key: '-' }))
    expect(cb).toHaveBeenCalledTimes(1) // Should trigger after complete sequence

    stop()
  })

  it('handles sequence timeout correctly', () => {
    vi.useFakeTimers()
    const cb = vi.fn()
    const stop = useHotkey('a-b', cb, { sequenceTimeout: 500 })

    // Start sequence
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    expect(cb).toHaveBeenCalledTimes(0)

    // Wait past timeout
    vi.advanceTimersByTime(600)

    // Try to complete sequence - should not work
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }))
    expect(cb).toHaveBeenCalledTimes(0)

    // Start fresh sequence
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }))
    expect(cb).toHaveBeenCalledTimes(1)

    stop()
    vi.useRealTimers()
  })

  it('handles custom event type', () => {
    const cb = vi.fn()
    const stop = useHotkey('ctrl+a', cb, { event: 'keyup' })

    // Should not trigger on keydown
    window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'a' }))
    expect(cb).toHaveBeenCalledTimes(0)

    // Should trigger on keyup
    window.dispatchEvent(new KeyboardEvent('keyup', { ctrlKey: true, key: 'a' }))
    expect(cb).toHaveBeenCalledTimes(1)

    stop()
  })

  it('cleans up event listeners on stop', () => {
    const cb = vi.fn()
    const stop = useHotkey('ctrl+a', cb)

    // Should work initially
    window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'a' }))
    expect(cb).toHaveBeenCalledTimes(1)

    // Stop the hotkey
    stop()

    // Should not work after stop
    window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'a' }))
    expect(cb).toHaveBeenCalledTimes(1)
  })

  it('resets sequence on non-matching key', () => {
    const cb = vi.fn()
    const stop = useHotkey('a-b-c', cb)

    // Start sequence
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }))
    expect(cb).toHaveBeenCalledTimes(0)

    // Press wrong key - should reset sequence
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'x' }))
    expect(cb).toHaveBeenCalledTimes(0)

    // Now complete sequence from beginning
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'c' }))
    expect(cb).toHaveBeenCalledTimes(1)

    stop()
  })
})
