// Composables
import { useHotkey } from '../hotkey'

// Utilities
import { wait } from '@test'
import { nextTick, ref } from 'vue'

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
    ['shift+tab', { shiftKey: true, key: 'tab' }],
    ['ctrl+alt+delete', { ctrlKey: true, altKey: true, key: 'delete' }],
    ['escape', { key: 'escape' }],
    ['f1', { key: 'f1' }],
    ['enter', { key: 'enter' }],
    ['space', { key: ' ' }],
    ['plus', { key: '+' }],
    ['shift+plus', { shiftKey: true, key: '+' }],
    ['ctrl+plus', { ctrlKey: true, key: '+' }],
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

  it('handles centralized key aliases', () => {
    const cb = vi.fn()
    const stop = useHotkey('control+k', cb)

    window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'k' }))

    expect(cb).toHaveBeenCalledTimes(1)

    stop()
  })

  it('handles arrow key aliases', () => {
    const cb = vi.fn()
    const stop = useHotkey('up', cb)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))

    expect(cb).toHaveBeenCalledTimes(1)

    stop()
  })

  describe('Cross-platform meta key behavior (Nuxt UI style)', () => {
    const originalNavigator = window.navigator

    afterEach(() => {
      Object.defineProperty(window, 'navigator', { value: originalNavigator, writable: true })
    })

    it('should handle meta+s as cmd+s on Mac (metaKey)', () => {
      Object.defineProperty(window, 'navigator', { value: { userAgent: 'Mozilla/5.0 (Macintosh)' }, writable: true })
      const cb = vi.fn()
      const stop = useHotkey('meta+s', cb)

      // On Mac, meta+s should trigger with metaKey (Command key)
      window.dispatchEvent(new KeyboardEvent('keydown', { metaKey: true, key: 's' }))
      expect(cb).toHaveBeenCalledTimes(1)

      // Should NOT trigger with ctrlKey on Mac
      window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 's' }))
      expect(cb).toHaveBeenCalledTimes(1) // Still 1, not 2

      stop()
    })

    it('should handle meta+s as ctrl+s on PC (ctrlKey)', () => {
      Object.defineProperty(window, 'navigator', { value: { userAgent: 'Windows NT 10.0' }, writable: true })
      const cb = vi.fn()
      const stop = useHotkey('meta+s', cb)

      // On PC, meta+s should trigger with ctrlKey
      window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 's' }))
      expect(cb).toHaveBeenCalledTimes(1)

      // Should NOT trigger with metaKey on PC
      window.dispatchEvent(new KeyboardEvent('keydown', { metaKey: true, key: 's' }))
      expect(cb).toHaveBeenCalledTimes(1) // Still 1, not 2

      stop()
    })

    it('should handle cmd+s consistently across platforms', () => {
      // Test on Mac
      Object.defineProperty(window, 'navigator', { value: { userAgent: 'Mozilla/5.0 (Macintosh)' }, writable: true })
      const cbMac = vi.fn()
      const stopMac = useHotkey('cmd+s', cbMac)

      window.dispatchEvent(new KeyboardEvent('keydown', { metaKey: true, key: 's' }))
      expect(cbMac).toHaveBeenCalledTimes(1)
      stopMac()

      // Test on PC
      Object.defineProperty(window, 'navigator', { value: { userAgent: 'Windows NT 10.0' }, writable: true })
      const cbPc = vi.fn()
      const stopPc = useHotkey('cmd+s', cbPc)

      window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 's' }))
      expect(cbPc).toHaveBeenCalledTimes(1)
      stopPc()
    })

    it('should handle explicit ctrl+s as ctrl on all platforms', () => {
      // Test on Mac - ctrl should always be ctrl, never cmd
      Object.defineProperty(window, 'navigator', { value: { userAgent: 'Mozilla/5.0 (Macintosh)' }, writable: true })
      const cbMac = vi.fn()
      const stopMac = useHotkey('ctrl+s', cbMac)

      // Should trigger with ctrlKey even on Mac
      window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 's' }))
      expect(cbMac).toHaveBeenCalledTimes(1)

      // Should NOT trigger with metaKey on Mac when using explicit ctrl
      window.dispatchEvent(new KeyboardEvent('keydown', { metaKey: true, key: 's' }))
      expect(cbMac).toHaveBeenCalledTimes(1) // Still 1, not 2
      stopMac()

      // Test on PC
      Object.defineProperty(window, 'navigator', { value: { userAgent: 'Windows NT 10.0' }, writable: true })
      const cbPc = vi.fn()
      const stopPc = useHotkey('ctrl+s', cbPc)

      window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 's' }))
      expect(cbPc).toHaveBeenCalledTimes(1)
      stopPc()
    })

    it('should handle complex combinations with meta key', () => {
      // Test meta+shift+z on Mac
      Object.defineProperty(window, 'navigator', { value: { userAgent: 'Mozilla/5.0 (Macintosh)' }, writable: true })
      const cbMac = vi.fn()
      const stopMac = useHotkey('meta+shift+z', cbMac)

      window.dispatchEvent(new KeyboardEvent('keydown', { metaKey: true, shiftKey: true, key: 'z' }))
      expect(cbMac).toHaveBeenCalledTimes(1)
      stopMac()

      // Test meta+shift+z on PC
      Object.defineProperty(window, 'navigator', { value: { userAgent: 'Windows NT 10.0' }, writable: true })
      const cbPc = vi.fn()
      const stopPc = useHotkey('meta+shift+z', cbPc)

      window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, shiftKey: true, key: 'z' }))
      expect(cbPc).toHaveBeenCalledTimes(1)
      stopPc()
    })
  })

  describe('Key aliases cross-platform behavior', () => {
    const originalNavigator = window.navigator

    afterEach(() => {
      Object.defineProperty(window, 'navigator', { value: originalNavigator, writable: true })
    })

    it('should handle command alias on Mac', () => {
      Object.defineProperty(window, 'navigator', { value: { userAgent: 'Mozilla/5.0 (Macintosh)' }, writable: true })
      const cb = vi.fn()
      const stop = useHotkey('command+k', cb)

      window.dispatchEvent(new KeyboardEvent('keydown', { metaKey: true, key: 'k' }))
      expect(cb).toHaveBeenCalledTimes(1)

      stop()
    })

    it('should handle command alias on PC', () => {
      Object.defineProperty(window, 'navigator', { value: { userAgent: 'Windows NT 10.0' }, writable: true })
      const cb = vi.fn()
      const stop = useHotkey('command+k', cb)

      window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'k' }))
      expect(cb).toHaveBeenCalledTimes(1)

      stop()
    })

    it('should handle option alias on Mac', () => {
      Object.defineProperty(window, 'navigator', { value: { userAgent: 'Mozilla/5.0 (Macintosh)' }, writable: true })
      const cb = vi.fn()
      const stop = useHotkey('option+tab', cb)

      window.dispatchEvent(new KeyboardEvent('keydown', { altKey: true, key: 'tab' }))
      expect(cb).toHaveBeenCalledTimes(1)

      stop()
    })

    it('should handle control alias consistently', () => {
      // Test on Mac
      Object.defineProperty(window, 'navigator', { value: { userAgent: 'Mozilla/5.0 (Macintosh)' }, writable: true })
      const cbMac = vi.fn()
      const stopMac = useHotkey('control+r', cbMac)

      window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'r' }))
      expect(cbMac).toHaveBeenCalledTimes(1)
      stopMac()

      // Test on PC
      Object.defineProperty(window, 'navigator', { value: { userAgent: 'Windows NT 10.0' }, writable: true })
      const cbPc = vi.fn()
      const stopPc = useHotkey('control+r', cbPc)

      window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'r' }))
      expect(cbPc).toHaveBeenCalledTimes(1)
      stopPc()
    })

    it('should handle arrow key aliases', () => {
      const testCases = [
        ['up', 'ArrowUp'],
        ['down', 'ArrowDown'],
        ['left', 'ArrowLeft'],
        ['right', 'ArrowRight'],
      ]

      testCases.forEach(([alias, key]) => {
        const cb = vi.fn()
        const stop = useHotkey(alias, cb)

        window.dispatchEvent(new KeyboardEvent('keydown', { key }))
        expect(cb).toHaveBeenCalledTimes(1)

        stop()
      })
    })

    it('should handle common key aliases', () => {
      const testCases = [
        ['esc', 'Escape'],
        ['return', 'Enter'],
        ['del', 'Delete'],
      ]

      testCases.forEach(([alias, key]) => {
        const cb = vi.fn()
        const stop = useHotkey(alias, cb)

        window.dispatchEvent(new KeyboardEvent('keydown', { key }))
        expect(cb).toHaveBeenCalledTimes(1)

        stop()
      })
    })

    it('should handle symbol aliases', () => {
      const testCases = [
        ['minus', '-'],
        ['hyphen', '-'],
      ]

      testCases.forEach(([alias, key]) => {
        const cb = vi.fn()
        const stop = useHotkey(alias, cb)

        window.dispatchEvent(new KeyboardEvent('keydown', { key }))
        expect(cb).toHaveBeenCalledTimes(1)

        stop()
      })
    })

    it('should handle mixed aliases and modifiers', () => {
      const cb = vi.fn()
      const stop = useHotkey('control+up', cb)

      window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'ArrowUp' }))
      expect(cb).toHaveBeenCalledTimes(1)

      stop()
    })

    it('should handle case insensitive aliases', () => {
      const cb = vi.fn()
      const stop = useHotkey('CONTROL+ESC', cb)

      window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'Escape' }))
      expect(cb).toHaveBeenCalledTimes(1)

      stop()
    })

    it('should handle undefined navigator with aliases', () => {
      Object.defineProperty(window, 'navigator', { value: undefined, writable: true })
      const cb = vi.fn()
      const stop = useHotkey('command+s', cb)

      // Should default to PC behavior (ctrlKey) when navigator is undefined
      window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 's' }))
      expect(cb).toHaveBeenCalledTimes(1)

      stop()
    })
  })

  describe('Platform detection edge cases', () => {
    const originalNavigator = window.navigator

    afterEach(() => {
      Object.defineProperty(window, 'navigator', { value: originalNavigator, writable: true })
    })

    it('should handle null navigator', () => {
      Object.defineProperty(window, 'navigator', { value: null, writable: true })
      const cb = vi.fn()
      const stop = useHotkey('meta+s', cb)

      // Should default to PC behavior when navigator is null
      window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 's' }))
      expect(cb).toHaveBeenCalledTimes(1)

      stop()
    })

    it('should handle navigator without userAgent', () => {
      Object.defineProperty(window, 'navigator', { value: {}, writable: true })
      const cb = vi.fn()
      const stop = useHotkey('meta+s', cb)

      // Should default to PC behavior when userAgent is missing
      window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 's' }))
      expect(cb).toHaveBeenCalledTimes(1)

      stop()
    })

    it('should handle different Mac user agent strings', () => {
      const macUserAgents = [
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'Mozilla/5.0 (Macintosh; Apple Silicon Mac OS X 12_0_0)',
        'Mozilla/5.0 (Macintosh)',
      ]

      macUserAgents.forEach(userAgent => {
        Object.defineProperty(window, 'navigator', { value: { userAgent }, writable: true })
        const cb = vi.fn()
        const stop = useHotkey('meta+s', cb)

        window.dispatchEvent(new KeyboardEvent('keydown', { metaKey: true, key: 's' }))
        expect(cb).toHaveBeenCalledTimes(1)

        stop()
      })
    })

    it('should handle non-Mac user agent strings', () => {
      const nonMacUserAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Mozilla/5.0 (X11; Linux x86_64)',
        'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1)',
        '',
      ]

      nonMacUserAgents.forEach(userAgent => {
        Object.defineProperty(window, 'navigator', { value: { userAgent }, writable: true })
        const cb = vi.fn()
        const stop = useHotkey('meta+s', cb)

        window.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 's' }))
        expect(cb).toHaveBeenCalledTimes(1)

        stop()
      })
    })
  })

  it('reactive options', async () => {
    const preventDefault = ref(false)
    const inputs = ref(false)
    const cb = vi.fn()

    const stop = useHotkey('ctrl+a', cb, { preventDefault, inputs })

    // Test with initial values
    const event1 = new KeyboardEvent('keydown', { ctrlKey: true, key: 'a' })
    Object.defineProperty(event1, 'preventDefault', { value: vi.fn() })

    window.dispatchEvent(event1)
    expect(cb).toHaveBeenCalledTimes(1)
    expect(event1.preventDefault).not.toHaveBeenCalled()

    // Change preventDefault to true
    preventDefault.value = true
    await nextTick()

    const event2 = new KeyboardEvent('keydown', { ctrlKey: true, key: 'a' })
    Object.defineProperty(event2, 'preventDefault', { value: vi.fn() })

    window.dispatchEvent(event2)
    expect(cb).toHaveBeenCalledTimes(2)
    expect(event2.preventDefault).toHaveBeenCalled()

    // Test inputs reactivity
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.focus()

    const event3 = new KeyboardEvent('keydown', { ctrlKey: true, key: 'a' })
    window.dispatchEvent(event3)
    expect(cb).toHaveBeenCalledTimes(2) // Should not fire because inputs=false

    // Enable inputs
    inputs.value = true
    await nextTick()

    const event4 = new KeyboardEvent('keydown', { ctrlKey: true, key: 'a' })
    window.dispatchEvent(event4)
    expect(cb).toHaveBeenCalledTimes(3) // Should fire because inputs=true

    document.body.removeChild(input)
    stop()
  })
})
