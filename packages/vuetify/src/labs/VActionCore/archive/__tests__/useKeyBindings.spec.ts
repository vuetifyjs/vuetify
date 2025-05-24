/**
 * @vitest-environment jsdom
 */
// Utilities
import { defineComponent, nextTick, ref } from 'vue'
import type { App as VueApp } from 'vue' // Import App for createApp
// Static import of useKeyBindings - aliased to avoid conflict in platform tests
import { useKeyBindings as staticUseKeyBindings, type KeyBindingConfig, type KeyBindingOptions } from '../useKeyBindings'

// Control variable for platform mocking
let isMacMockValue = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

vi.mock('../platform', () => ({
  IS_CLIENT: true,
  get IS_MAC() {
    // console.log('[Mock Platform] Getter: IS_MAC returning:', isMacMockValue);
    return isMacMockValue;
  },
}));

// Helper to dispatch keyboard events
function dispatchKeyEvent (target: EventTarget, type: 'keydown' | 'keyup', key: string, options: KeyboardEventInit = {}) {
  const event = new KeyboardEvent(type, { key, bubbles: true, cancelable: true, ...options })
  target.dispatchEvent(event)
  return event
}

describe('useKeyBindings', () => {
  let target: HTMLElement
  let stopShortcuts: (() => void) | null = null

  // General beforeEach for all useKeyBindings tests
  beforeEach(() => {
    target = document.createElement('div');
    document.body.appendChild(target);
    vi.useFakeTimers();
    isMacMockValue = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    // vi.resetModules(); // Let afterEach handle for general isolation
  });

  afterEach(() => {
    if (stopShortcuts) {
      stopShortcuts();
      stopShortcuts = null;
    }
    if (target.parentNode === document.body) {
      document.body.removeChild(target);
    }
    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.resetModules(); // Reset all modules after each test
  });

  it('should register and trigger a simple shortcut', async () => {
    const handler = vi.fn()
    const shortcuts: KeyBindingConfig = { a: handler }
    stopShortcuts = staticUseKeyBindings(shortcuts, { target })

    dispatchKeyEvent(target, 'keydown', 'a')
    await nextTick()
    expect(handler).toHaveBeenCalledTimes(1)

    stopShortcuts()
    dispatchKeyEvent(target, 'keydown', 'a')
    await nextTick()
    expect(handler).toHaveBeenCalledTimes(1) // Should not be called after stop
  })

  it('should register and trigger a combination shortcut (ctrl+k)', async () => {
    const handler = vi.fn()
    const shortcuts: KeyBindingConfig = { 'ctrl+k': handler }
    stopShortcuts = staticUseKeyBindings(shortcuts, { target })

    dispatchKeyEvent(target, 'keydown', 'k', { ctrlKey: true })
    await nextTick()
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should register and trigger a chained shortcut (g-d)', async () => {
    const handler = vi.fn()
    const shortcuts: KeyBindingConfig = { 'g-d': handler }
    stopShortcuts = staticUseKeyBindings(shortcuts, { target, chainDelay: 100 })

    dispatchKeyEvent(target, 'keydown', 'g')
    await nextTick()
    expect(handler).not.toHaveBeenCalled()

    dispatchKeyEvent(target, 'keydown', 'd')
    await nextTick()
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should clear chained shortcut after timeout', async () => {
    const handler = vi.fn()
    const shortcuts: KeyBindingConfig = { 'g-d': handler }
    const chainDelay = 100
    stopShortcuts = staticUseKeyBindings(shortcuts, { target, chainDelay })

    dispatchKeyEvent(target, 'keydown', 'g')
    await nextTick()
    vi.advanceTimersByTime(chainDelay + 10)
    await nextTick()

    dispatchKeyEvent(target, 'keydown', 'd')
    await nextTick()
    expect(handler).not.toHaveBeenCalled() // Chain should have timed out
  })

  describe('usingInput option', () => {
    let inputElement: HTMLInputElement
    let otherElement: HTMLDivElement

    beforeEach(() => {
      inputElement = document.createElement('input')
      inputElement.setAttribute('name', 'testInput')
      document.body.appendChild(inputElement)

      otherElement = document.createElement('div')
      otherElement.setAttribute('tabindex', '-1') // Make it focusable
      document.body.appendChild(otherElement)
    })

    afterEach(() => {
      inputElement.remove()
      otherElement.remove()
      if (document.activeElement && (document.activeElement as HTMLElement).blur) {
        (document.activeElement as HTMLElement).blur()
      }
    })

    it('should trigger shortcut if usingInput is undefined/false and not in input', async () => {
      const handler = vi.fn()
      const shortcuts: KeyBindingConfig = { x: { handler, usingInput: false } }
      stopShortcuts = staticUseKeyBindings(shortcuts, { target })

      otherElement.focus()
      await nextTick()
      dispatchKeyEvent(target, 'keydown', 'x')
      await nextTick()
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('should NOT trigger shortcut if usingInput is undefined/false and in input', async () => {
      const handler = vi.fn()
      const shortcuts: KeyBindingConfig = { x: { handler, usingInput: false } }
      stopShortcuts = staticUseKeyBindings(shortcuts, { target })

      inputElement.focus()
      await nextTick()
      dispatchKeyEvent(target, 'keydown', 'x')
      await nextTick()
      expect(handler).not.toHaveBeenCalled()
    })

    it('should trigger shortcut if usingInput is true and in input', async () => {
      const handler = vi.fn()
      const shortcuts: KeyBindingConfig = { x: { handler, usingInput: true } }
      stopShortcuts = staticUseKeyBindings(shortcuts, { target })

      inputElement.focus()
      await nextTick()
      dispatchKeyEvent(target, 'keydown', 'x')
      await nextTick()
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('should NOT trigger shortcut if usingInput is true and NOT in input', async () => {
      const handler = vi.fn()
      const shortcuts: KeyBindingConfig = { x: { handler, usingInput: true } }
      stopShortcuts = staticUseKeyBindings(shortcuts, { target })

      otherElement.focus()
      await nextTick()
      dispatchKeyEvent(target, 'keydown', 'x')
      await nextTick()
      expect(handler).not.toHaveBeenCalled()
    })

    it('should trigger shortcut if usingInput is string (name) and named input is focused', async () => {
      const handler = vi.fn()
      const shortcuts: KeyBindingConfig = { x: { handler, usingInput: 'testInput' } }
      stopShortcuts = staticUseKeyBindings(shortcuts, { target })

      inputElement.focus()
      await nextTick()
      dispatchKeyEvent(target, 'keydown', 'x')
      await nextTick()
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('should NOT trigger shortcut if usingInput is string (name) and different input is focused', async () => {
      const handler = vi.fn()
      const shortcuts: KeyBindingConfig = { x: { handler, usingInput: 'otherInputName' } }
      stopShortcuts = staticUseKeyBindings(shortcuts, { target })

      inputElement.focus()
      await nextTick()
      dispatchKeyEvent(target, 'keydown', 'x')
      await nextTick()
      expect(handler).not.toHaveBeenCalled()
    })
  })

  it('should call preventDefault if specified', async () => {
    const handler = vi.fn()
    const shortcuts: KeyBindingConfig = { p: { handler, preventDefault: true } }
    stopShortcuts = staticUseKeyBindings(shortcuts, { target })

    const event = dispatchKeyEvent(target, 'keydown', 'p')
    await nextTick()
    expect(handler).toHaveBeenCalledTimes(1)
    expect(event.defaultPrevented).toBe(true)
  })

  it('should call stopPropagation if specified', async () => {
    const handler = vi.fn()
    const shortcuts: KeyBindingConfig = { q: { handler, stopPropagation: true } }
    stopShortcuts = staticUseKeyBindings(shortcuts, { target })

    const event = dispatchKeyEvent(target, 'keydown', 'q')
    await nextTick()
    expect(handler).toHaveBeenCalledTimes(1)
  })

  describe('Platform Modifier Normalization (Meta/Ctrl)', () => {
    beforeEach(() => {
      // No vi.resetModules() here, rely on afterEach of parent describe, or specific test if needed
    });

    afterEach(() => {
      vi.resetModules(); // Ensure modules are reset for other tests outside this describe block
    });

    it('should treat "meta+s" as "ctrl+s" on non-Mac', async () => {
      vi.resetModules(); // Reset before import to get fresh module with new mock value

      vi.doMock('../platform', () => ({
        IS_CLIENT: true,
        IS_MAC: false, // Directly mock IS_MAC as false for this test
      }));

      const { useKeyBindings } = await import('../useKeyBindings'); // Dynamic import for this test

      const handler = vi.fn();
      const shortcuts: KeyBindingConfig = { 'meta+s': handler };
      stopShortcuts = useKeyBindings(shortcuts, { target });

      dispatchKeyEvent(target, 'keydown', 's', { ctrlKey: true });
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should treat "meta+s" as "meta+s" (not "ctrl+s") on Mac', async () => {
      vi.resetModules();

      vi.doMock('../platform', () => ({
        IS_CLIENT: true,
        IS_MAC: true, // Directly mock IS_MAC as true for this test
      }));
      const { useKeyBindings } = await import('../useKeyBindings'); // Dynamic import

      const metaHandler = vi.fn();
      const ctrlHandler = vi.fn();
      const shortcuts: KeyBindingConfig = {
        'meta+s': metaHandler,
        'ctrl+s': ctrlHandler,
      };
      stopShortcuts = useKeyBindings(shortcuts, { target });

      dispatchKeyEvent(target, 'keydown', 's', { metaKey: true });
      await nextTick();
      expect(metaHandler).toHaveBeenCalledTimes(1);
      expect(ctrlHandler).not.toHaveBeenCalled();

      metaHandler.mockClear();
      ctrlHandler.mockClear();

      dispatchKeyEvent(target, 'keydown', 's', { ctrlKey: true });
      await nextTick();
      expect(metaHandler).not.toHaveBeenCalled();
      expect(ctrlHandler).toHaveBeenCalledTimes(1);
    });
  });

  it('should use global capture and passive options for the event listener', async () => {
    const addEventListenerSpy = vi.spyOn(target, 'addEventListener')
    const handler = vi.fn()
    const shortcuts: KeyBindingConfig = { 'c': handler }

    stopShortcuts = staticUseKeyBindings(shortcuts, { target, capture: true, passive: true })
    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function), { capture: true, passive: true })
    stopShortcuts(); stopShortcuts = null; addEventListenerSpy.mockClear()

    stopShortcuts = staticUseKeyBindings(shortcuts, { target })
    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function), { capture: false, passive: false })
    addEventListenerSpy.mockRestore()
  })

  it('should correctly parse keys with multiple modifiers (ctrl_shift_alt_m)', async () => {
    const handler = vi.fn()
    const shortcuts: KeyBindingConfig = { 'ctrl_shift_alt_m': handler }
    stopShortcuts = staticUseKeyBindings(shortcuts, { target })
    dispatchKeyEvent(target, 'keydown', 'm', { ctrlKey: true, shiftKey: true, altKey: true })
    await nextTick()
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should handle special keys like Escape and Enter', async () => {
    const escapeHandler = vi.fn()
    const enterHandler = vi.fn()
    const shortcuts: KeyBindingConfig = { escape: escapeHandler, enter: enterHandler }
    stopShortcuts = staticUseKeyBindings(shortcuts, { target })
    dispatchKeyEvent(target, 'keydown', 'Escape'); await nextTick(); expect(escapeHandler).toHaveBeenCalledTimes(1)
    dispatchKeyEvent(target, 'keydown', 'Enter'); await nextTick(); expect(enterHandler).toHaveBeenCalledTimes(1)
  })

  it('should handle reactive shortcut configurations', async () => {
    const handler1 = vi.fn()
    const handler2 = vi.fn()
    const reactiveConfig = ref<KeyBindingConfig>({ 'a': handler1 })
    stopShortcuts = staticUseKeyBindings(reactiveConfig, { target })

    dispatchKeyEvent(target, 'keydown', 'a'); await nextTick(); expect(handler1).toHaveBeenCalledTimes(1)
    expect(handler2).not.toHaveBeenCalled()

    reactiveConfig.value = { 'b': handler2 }; await nextTick()

    dispatchKeyEvent(target, 'keydown', 'a'); await nextTick(); expect(handler1).toHaveBeenCalledTimes(1)
    dispatchKeyEvent(target, 'keydown', 'b'); await nextTick(); expect(handler2).toHaveBeenCalledTimes(1)
  })

   it('should not trigger shortcut if handler is null or undefined in config', async () => {
    const handlerA = vi.fn()
    const shortcuts: KeyBindingConfig = { a: handlerA, b: null, c: undefined }
    stopShortcuts = staticUseKeyBindings(shortcuts, { target })
    dispatchKeyEvent(target, 'keydown', 'a'); await nextTick(); expect(handlerA).toHaveBeenCalledTimes(1)
    dispatchKeyEvent(target, 'keydown', 'b'); await nextTick(); expect(handlerA).toHaveBeenCalledTimes(1)
    dispatchKeyEvent(target, 'keydown', 'c'); await nextTick(); expect(handlerA).toHaveBeenCalledTimes(1)
  })

  it('should allow plain function as shortcut config value', async () => {
    const handler = vi.fn()
    const shortcuts: KeyBindingConfig = { f: handler }
    stopShortcuts = staticUseKeyBindings(shortcuts, { target })
    dispatchKeyEvent(target, 'keydown', 'f'); await nextTick(); expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should not affect other shortcuts if one has an invalid key', async () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const validHandler = vi.fn()
    if (stopShortcuts) stopShortcuts(); // Clear previous from other tests
    const simpleShortcuts: KeyBindingConfig = { v: validHandler, '': () => {} }
    stopShortcuts = staticUseKeyBindings(simpleShortcuts, { target })

    dispatchKeyEvent(target, 'keydown', 'v'); await nextTick(); expect(validHandler).toHaveBeenCalledTimes(1)
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('Could not parse key for shortcut: ""'));
    consoleWarnSpy.mockRestore()
  })
});

