// Composables
import { useHotkey } from '../hotkey'

// Utilities
import { ref } from 'vue'

describe('hotkey.ts', () => {
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
  ])('should invoke callback when %s is pressed', (keys: string, eventProps: any) => {
    const callback = vi.fn()
    const cleanup = useHotkey(keys, callback)

    const event = new KeyboardEvent('keydown', {
      ctrlKey: eventProps.ctrlKey || false,
      shiftKey: eventProps.shiftKey || false,
      altKey: eventProps.altKey || false,
      metaKey: eventProps.metaKey || false,
      key: eventProps.key,
    })

    window.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(1)

    cleanup()
  })

  it('should invoke callback for key sequence', () => {
    const callback = vi.fn()
    const cleanup = useHotkey('g-g', callback)

    const event1 = new KeyboardEvent('keydown', { key: 'g' })
    const event2 = new KeyboardEvent('keydown', { key: 'g' })

    window.dispatchEvent(event1)
    window.dispatchEvent(event2)

    expect(callback).toHaveBeenCalledTimes(1)

    cleanup()
  })

  it('should NOT invoke callback for incomplete key sequence', () => {
    const callback = vi.fn()
    const cleanup = useHotkey('g-g', callback)

    const event1 = new KeyboardEvent('keydown', { key: 'g' })

    window.dispatchEvent(event1)

    expect(callback).not.toHaveBeenCalled()

    cleanup()
  })

  it('should reset sequence after timeout', async () => {
    const callback = vi.fn()
    const cleanup = useHotkey('g-g', callback)

    const event1 = new KeyboardEvent('keydown', { key: 'g' })
    const event2 = new KeyboardEvent('keydown', { key: 'g' })

    window.dispatchEvent(event1)

    await new Promise(resolve => setTimeout(resolve, 1100))

    window.dispatchEvent(event2)

    expect(callback).not.toHaveBeenCalled()

    cleanup()
  })

  it('should NOT invoke callback when extra modifiers are pressed', () => {
    const callback = vi.fn()
    const cleanup = useHotkey('ctrl+a', callback)

    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      shiftKey: true,
      key: 'a',
    })

    window.dispatchEvent(event)

    expect(callback).not.toHaveBeenCalled()

    cleanup()
  })

  it('should NOT invoke callback when pressing only modifiers without the main key', () => {
    const callback = vi.fn()
    const cleanup = useHotkey('ctrl+shift+b', callback)

    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      shiftKey: true,
      key: 'Control',
    })

    window.dispatchEvent(event)

    expect(callback).not.toHaveBeenCalled()

    cleanup()
  })

  it('should respect options.inputs setting', () => {
    const callback = vi.fn()

    const cleanup1 = useHotkey('ctrl+a', callback, { inputs: false })

    const input = document.createElement('input')
    document.body.appendChild(input)
    input.focus()

    const event1 = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'a',
    })

    window.dispatchEvent(event1)
    expect(callback).not.toHaveBeenCalled()

    cleanup1()

    const cleanup2 = useHotkey('ctrl+a', callback, { inputs: true })

    window.dispatchEvent(event1)
    expect(callback).toHaveBeenCalledTimes(1)

    cleanup2()
    document.body.removeChild(input)
  })

  it('should respect options.sequenceTimeout setting', async () => {
    const callback = vi.fn()
    const cleanup = useHotkey('g-g', callback, { sequenceTimeout: 500 })

    const event1 = new KeyboardEvent('keydown', { key: 'g' })
    const event2 = new KeyboardEvent('keydown', { key: 'g' })

    window.dispatchEvent(event1)

    await new Promise(resolve => setTimeout(resolve, 600))

    window.dispatchEvent(event2)

    expect(callback).not.toHaveBeenCalled()

    cleanup()
  })

  it('should map ctrl to meta key on Mac platform', () => {
    const callback = vi.fn()

    Object.defineProperty(window, 'navigator', {
      value: {
        // eslint-disable-next-line max-len
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      writable: true,
    })

    const cleanup = useHotkey('ctrl+s', callback)

    // On Mac, ctrl+s should actually respond to meta+s (cmd+s)
    const event = new KeyboardEvent('keydown', {
      metaKey: true,
      key: 's',
    })

    window.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(1)

    cleanup()
  })

  it('should respect options.event setting', () => {
    // Reset navigator to non-Mac for this test
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      writable: true,
    })

    const callback = vi.fn()

    // Test with keydown (default)
    const cleanup1 = useHotkey('ctrl+a', callback, { event: 'keydown' })

    const keydownEvent = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'a',
    })

    const keyupEvent = new KeyboardEvent('keyup', {
      ctrlKey: true,
      key: 'a',
    })

    // Should respond to keydown
    window.dispatchEvent(keydownEvent)
    expect(callback).toHaveBeenCalledTimes(1)

    // Should NOT respond to keyup
    window.dispatchEvent(keyupEvent)
    expect(callback).toHaveBeenCalledTimes(1) // Still 1, not 2

    cleanup1()

    // Test with keyup
    const cleanup2 = useHotkey('ctrl+a', callback, { event: 'keyup' })

    // Reset callback
    callback.mockClear()

    // Should NOT respond to keydown
    window.dispatchEvent(keydownEvent)
    expect(callback).not.toHaveBeenCalled()

    // Should respond to keyup
    window.dispatchEvent(keyupEvent)
    expect(callback).toHaveBeenCalledTimes(1)

    cleanup2()
  })

  it('should handle static hotkey strings', () => {
    const callback = vi.fn()

    // Test with a static string
    const cleanup = useHotkey('ctrl+a', callback)

    // Test the hotkey
    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'a',
    })
    window.dispatchEvent(event)
    expect(callback).toHaveBeenCalledTimes(1)

    cleanup()
  })

  it('should handle reactive keys (ref)', async () => {
    // Reset navigator to ensure consistent behavior
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      writable: true,
    })

    const callback = vi.fn()
    const hotkeyRef = ref<string>('ctrl+a')

    // Use a reactive ref
    const cleanup = useHotkey(hotkeyRef, callback)

    // Test initial hotkey
    let event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'a',
    })
    window.dispatchEvent(event)
    expect(callback).toHaveBeenCalledTimes(1)

    // Change the reactive key
    hotkeyRef.value = 'ctrl+b'

    // Wait for reactive update to be processed
    await new Promise(resolve => setTimeout(resolve, 10))

    // Should not respond to old hotkey
    event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'a',
    })
    window.dispatchEvent(event)
    expect(callback).toHaveBeenCalledTimes(1) // Still 1

    // Should respond to new hotkey
    event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'b',
    })
    window.dispatchEvent(event)
    expect(callback).toHaveBeenCalledTimes(2)

    // Change to undefined (disable hotkey)
    hotkeyRef.value = undefined as any

    // Wait for reactive update to be processed
    await new Promise(resolve => setTimeout(resolve, 10))

    // Should not respond to any hotkey when disabled
    event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'b',
    })
    window.dispatchEvent(event)
    expect(callback).toHaveBeenCalledTimes(2) // Still 2

    cleanup()
  })

  it('should handle undefined keys (disabled hotkey)', () => {
    const callback = vi.fn()
    const cleanup = useHotkey(undefined, callback)

    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'a',
    })
    window.dispatchEvent(event)

    expect(callback).not.toHaveBeenCalled()

    cleanup()
  })

  it('should respect options.preventDefault setting', () => {
    // Reset navigator to ensure consistent behavior
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      writable: true,
    })

    const callback = vi.fn()

    // Test with preventDefault: true (default)
    const cleanup1 = useHotkey('ctrl+a', callback, { preventDefault: true })

    const event1 = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'a',
    })

    // Mock preventDefault to track if it was called
    const preventDefaultSpy = vi.spyOn(event1, 'preventDefault')

    window.dispatchEvent(event1)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(preventDefaultSpy).toHaveBeenCalled()

    cleanup1()

    // Test with preventDefault: false
    const cleanup2 = useHotkey('ctrl+a', callback, { preventDefault: false })

    const event2 = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'a',
    })

    const preventDefaultSpy2 = vi.spyOn(event2, 'preventDefault')
    callback.mockClear()

    window.dispatchEvent(event2)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(preventDefaultSpy2).not.toHaveBeenCalled()

    cleanup2()
  })

  it('should handle textarea and contenteditable elements with inputs option', () => {
    // Reset navigator to ensure consistent behavior
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      writable: true,
    })

    const callback = vi.fn()

    // Test with textarea
    const cleanup1 = useHotkey('ctrl+a', callback, { inputs: false })

    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    textarea.focus()

    const event1 = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'a',
    })

    window.dispatchEvent(event1)
    expect(callback).not.toHaveBeenCalled()

    cleanup1()
    document.body.removeChild(textarea)

    // Test with contenteditable
    const cleanup2 = useHotkey('ctrl+a', callback, { inputs: false })

    const div = document.createElement('div')
    div.contentEditable = 'true'
    div.tabIndex = 0 // Make it focusable
    document.body.appendChild(div)
    div.focus()

    // Verify the element is actually focused and contentEditable
    expect(document.activeElement).toBe(div)
    expect(div.contentEditable).toBe('true')

    window.dispatchEvent(event1)
    expect(callback).not.toHaveBeenCalled()

    cleanup2()
    document.body.removeChild(div)

    // Test that it works when inputs: true
    const cleanup3 = useHotkey('ctrl+a', callback, { inputs: true })

    const input = document.createElement('input')
    document.body.appendChild(input)
    input.focus()

    window.dispatchEvent(event1)
    expect(callback).toHaveBeenCalledTimes(1)

    cleanup3()
    document.body.removeChild(input)
  })

  it('should handle cmd+key on Mac platform', () => {
    const callback = vi.fn()

    Object.defineProperty(window, 'navigator', {
      value: {
        // eslint-disable-next-line max-len
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      writable: true,
    })

    const cleanup = useHotkey('cmd+s', callback)

    // On Mac, cmd+s should respond to metaKey
    const event = new KeyboardEvent('keydown', {
      metaKey: true,
      key: 's',
    })

    window.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(1)

    cleanup()
  })

  it('should handle longer key sequences', () => {
    // Reset navigator to ensure consistent behavior
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      writable: true,
    })

    const callback = vi.fn()
    const cleanup = useHotkey('ctrl+k-p-s', callback)

    const event1 = new KeyboardEvent('keydown', { ctrlKey: true, key: 'k' })
    const event2 = new KeyboardEvent('keydown', { key: 'p' })
    const event3 = new KeyboardEvent('keydown', { key: 's' })

    // Incomplete sequence
    window.dispatchEvent(event1)
    window.dispatchEvent(event2)
    expect(callback).not.toHaveBeenCalled()

    // Complete sequence
    window.dispatchEvent(event3)
    expect(callback).toHaveBeenCalledTimes(1)

    cleanup()
  })

  it('should reset sequence on wrong key in middle', () => {
    const callback = vi.fn()
    const cleanup = useHotkey('a-b-c', callback)

    const eventA = new KeyboardEvent('keydown', { key: 'a' })
    const eventB = new KeyboardEvent('keydown', { key: 'b' })
    const eventC = new KeyboardEvent('keydown', { key: 'c' })
    const eventX = new KeyboardEvent('keydown', { key: 'x' })

    // Start sequence correctly
    window.dispatchEvent(eventA)
    window.dispatchEvent(eventB)

    // Wrong key should reset sequence
    window.dispatchEvent(eventX)

    // Now complete sequence from beginning
    window.dispatchEvent(eventA)
    window.dispatchEvent(eventB)
    window.dispatchEvent(eventC)

    expect(callback).toHaveBeenCalledTimes(1)

    cleanup()
  })

  it('should handle case insensitive keys', () => {
    // Reset navigator to ensure consistent behavior
    Object.defineProperty(window, 'navigator', {
      value: {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      writable: true,
    })

    const callback = vi.fn()
    const cleanup = useHotkey('CTRL+A', callback)

    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'A', // Uppercase in event
    })

    window.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(1)

    cleanup()
  })

  it('should handle missing actual key in hotkey definition', () => {
    const callback = vi.fn()
    const cleanup = useHotkey('ctrl+', callback) // Missing actual key

    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 'a',
    })

    window.dispatchEvent(event)

    // Should not trigger since actual key is undefined
    expect(callback).not.toHaveBeenCalled()

    cleanup()
  })

  it('should handle multiple sequence resets and completions', () => {
    const callback = vi.fn()
    const cleanup = useHotkey('g-g', callback)

    const eventG = new KeyboardEvent('keydown', { key: 'g' })

    // Complete sequence once
    window.dispatchEvent(eventG)
    window.dispatchEvent(eventG)
    expect(callback).toHaveBeenCalledTimes(1)

    // Complete sequence again
    window.dispatchEvent(eventG)
    window.dispatchEvent(eventG)
    expect(callback).toHaveBeenCalledTimes(2)

    cleanup()
  })

  it('should not interfere with browser when navigator is undefined', () => {
    // Mock navigator as undefined
    const originalNavigator = window.navigator
    Object.defineProperty(window, 'navigator', {
      value: undefined,
      writable: true,
    })

    const callback = vi.fn()
    const cleanup = useHotkey('ctrl+s', callback)

    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: 's',
    })

    window.dispatchEvent(event)

    expect(callback).toHaveBeenCalledTimes(1)

    cleanup()

    // Restore navigator
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      writable: true,
    })
  })
})
