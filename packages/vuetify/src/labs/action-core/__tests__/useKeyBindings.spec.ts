/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ref, nextTick, onScopeDispose, defineComponent, createApp } from 'vue';
import { useKeyBindings } from '../useKeyBindings';
import type { KeyBindingHandlerOptions } from '../types';

// Helper to dispatch keyboard events
function dispatchKeyEvent(target: EventTarget, type: 'keydown' | 'keyup', key: string, options: KeyboardEventInit = {}) {
  const event = new KeyboardEvent(type, { key, bubbles: true, cancelable: true, ...options });
  target.dispatchEvent(event);
  return event;
}

// Component to test onScopeDispose
const TestComponent = defineComponent({
  props: {
    setupFn: Function,
  },
  setup(props) {
    props.setupFn?.();
    return () => null; // Renderless component
  },
});

function mountTestComponent(setupFn: () => void) {
  const el = document.createElement('div');
  document.body.appendChild(el);
  const app = createApp(TestComponent, { setupFn });
  app.mount(el);
  return {
    unmount: () => {
      app.unmount();
      el.remove();
    },
    app,
  };
}

describe('useKeyBindings', () => {
  let target: HTMLElement;

  beforeEach(() => {
    target = document.createElement('div');
    document.body.appendChild(target);
    vi.useFakeTimers();
  });

  afterEach(() => {
    if (target.parentNode === document.body) {
      document.body.removeChild(target);
    }
    vi.clearAllMocks(); // Clear all mocks, including spies
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should initialize and stop correctly', async () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    const { stop, isListening } = useKeyBindings({ target: window });
    expect(isListening.value).toBe(true);
    // Check for specific listeners added by useKeyBindings
    expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function), expect.any(Object));
    expect(addSpy).toHaveBeenCalledWith('keyup', expect.any(Function), expect.any(Object));
    // Ensure only these two were added by this instance, filter out unrelated calls if necessary
    const relevantAddCalls = addSpy.mock.calls.filter(call => call[0] === 'keydown' || call[0] === 'keyup');
    expect(relevantAddCalls.length).toBe(2);

    stop();
    await nextTick();
    expect(isListening.value).toBe(false);
    // Check for specific listeners removed by useKeyBindings
    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function), expect.any(Object));
    expect(removeSpy).toHaveBeenCalledWith('keyup', expect.any(Function), expect.any(Object));
    const relevantRemoveCalls = removeSpy.mock.calls.filter(call => call[0] === 'keydown' || call[0] === 'keyup');
    expect(relevantRemoveCalls.length).toBe(2);

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it('should correctly reflect individual pressed keys via keys proxy', async () => {
    const { keys } = useKeyBindings({ target });

    expect(keys.a.value).toBe(false);
    dispatchKeyEvent(target, 'keydown', 'a');
    await nextTick();
    expect(keys.a.value).toBe(true);

    dispatchKeyEvent(target, 'keyup', 'a');
    await nextTick();
    expect(keys.a.value).toBe(false);
  });

  it('should handle key aliases with keys proxy', async () => {
    const { keys } = useKeyBindings({ target });

    expect(keys.escape.value).toBe(false);
    dispatchKeyEvent(target, 'keydown', 'Escape');
    await nextTick();
    expect(keys.escape.value).toBe(true);
    expect(keys.esc.value).toBe(true); // aliased

    dispatchKeyEvent(target, 'keyup', 'Escape');
    await nextTick();
    expect(keys.escape.value).toBe(false);
    expect(keys.esc.value).toBe(false);
  });

  it('should reflect pressedKeys set correctly', async () => {
    const { pressedKeys } = useKeyBindings({ target });
    expect(pressedKeys.value.size).toBe(0);

    dispatchKeyEvent(target, 'keydown', 'a');
    dispatchKeyEvent(target, 'keydown', 'Shift');
    await nextTick();
    expect(pressedKeys.value.has('a')).toBe(true);
    expect(pressedKeys.value.has('shift')).toBe(true);
    expect(pressedKeys.value.size).toBe(2);

    dispatchKeyEvent(target, 'keyup', 'a');
    await nextTick();
    expect(pressedKeys.value.has('a')).toBe(false);
    expect(pressedKeys.value.has('shift')).toBe(true);
    expect(pressedKeys.value.size).toBe(1);
  });

  it('should detect combinations via keys proxy', async () => {
    const { keys } = useKeyBindings({ target });

    expect(keys['ctrl+s'].value).toBe(false);

    dispatchKeyEvent(target, 'keydown', 'Control');
    await nextTick();
    expect(keys.ctrl.value).toBe(true);
    expect(keys['ctrl+s'].value).toBe(false);

    dispatchKeyEvent(target, 'keydown', 's');
    await nextTick();
    expect(keys.s.value).toBe(true);
    expect(keys['ctrl+s'].value).toBe(true);

    dispatchKeyEvent(target, 'keyup', 'Control');
    await nextTick();
    expect(keys.ctrl.value).toBe(false);
    expect(keys['ctrl+s'].value).toBe(false);

    dispatchKeyEvent(target, 'keyup', 's');
    await nextTick();
    expect(keys.s.value).toBe(false);
    expect(keys['ctrl+s'].value).toBe(false);
  });

  describe('on() method', () => {
    it('should trigger handler for a single key', async () => {
      const { on } = useKeyBindings({ target });
      const handler = vi.fn();
      const unregister = on('a', handler);

      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1);

      dispatchKeyEvent(target, 'keydown', 'b');
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1); // Not called for 'b'

      unregister();
      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1); // Not called after unregister
    });

    it('should trigger handler for a key combination', async () => {
      const { on } = useKeyBindings({ target });
      const handler = vi.fn();
      const unregister = on('ctrl+a', handler);

      dispatchKeyEvent(target, 'keydown', 'Control');
      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1);

      unregister();
      dispatchKeyEvent(target, 'keydown', 'Control');
      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1); // Not called after unregister
    });

    it('should respect eventName option (keyup)', async () => {
      const { on } = useKeyBindings({ target });
      const handler = vi.fn();
      on('a', handler, { eventName: 'keyup' });

      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      expect(handler).not.toHaveBeenCalled();

      dispatchKeyEvent(target, 'keyup', 'a');
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should respect ignoreKeyRepeat option (formerly dedupe)', async () => {
      const { on } = useKeyBindings({ target });
      const handler = vi.fn();
      on('a', handler, { ignoreKeyRepeat: true });

      dispatchKeyEvent(target, 'keydown', 'a'); // First event (event.repeat is false)
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1); // Should be called for the first non-repeated event

      dispatchKeyEvent(target, 'keydown', 'a', { repeat: true }); // Repeated event
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1); // Should NOT be called again due to ignoreKeyRepeat: true

      dispatchKeyEvent(target, 'keydown', 'a', { repeat: true }); // Another repeated event
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1); // Still should NOT be called again

      // Release the key and press again (new, non-repeated event)
      dispatchKeyEvent(target, 'keyup', 'a');
      await nextTick();
      dispatchKeyEvent(target, 'keydown', 'a'); // New press (event.repeat is false)
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(2); // Should be called for the new non-repeated event
    });

    it('should call preventDefault and stopPropagation if specified', async () => {
      const { on } = useKeyBindings({ target });
      const handler = vi.fn();
      const testKey = 'z';

      let receivedEventByHandler: KeyboardEvent | null = null;
      const handlerWithEventCapture = (e: KeyboardEvent) => {
        receivedEventByHandler = e;
        handler(e);
      };
      on(testKey, handlerWithEventCapture, { preventDefault: true, stopPropagation: true });

      const dispatchedEvent = dispatchKeyEvent(target, 'keydown', testKey);
      await nextTick();

      expect(handler).toHaveBeenCalledTimes(1);
      expect(receivedEventByHandler).toBe(dispatchedEvent);
      expect(dispatchedEvent.defaultPrevented).toBe(true);
      // stopPropagation is harder to assert directly without a more complex DOM setup or another listener
    });
  });

  describe('Sequences', () => {
    it('should update currentSequence correctly', async () => {
      const { currentSequence } = useKeyBindings({ target, sequenceTimeoutDuration: 100 });
      expect(currentSequence.value).toEqual([]);

      dispatchKeyEvent(target, 'keydown', 'g');
      await nextTick();
      expect(currentSequence.value).toEqual(['g']);

      dispatchKeyEvent(target, 'keydown', 'd');
      await nextTick();
      expect(currentSequence.value).toEqual(['g', 'd']);
    });

    it('should clear currentSequence after timeout', async () => {
      const { currentSequence } = useKeyBindings({ target, sequenceTimeoutDuration: 100 });

      dispatchKeyEvent(target, 'keydown', 'g');
      await nextTick();
      expect(currentSequence.value).toEqual(['g']);

      vi.advanceTimersByTime(50);
      dispatchKeyEvent(target, 'keydown', 'd');
      await nextTick();
      expect(currentSequence.value).toEqual(['g', 'd']); // Sequence continues

      vi.advanceTimersByTime(101); // Exceed timeout
      await nextTick();
      expect(currentSequence.value).toEqual([]); // Sequence cleared
    });

    it('should trigger handler for a sequence', async () => {
      const { on, currentSequence } = useKeyBindings({ target, sequenceTimeoutDuration: 100 });
      const handler = vi.fn();
      const unregister = on('g-d-s', handler);

      dispatchKeyEvent(target, 'keydown', 'g');
      await nextTick();
      dispatchKeyEvent(target, 'keydown', 'd');
      await nextTick();
      expect(handler).not.toHaveBeenCalled();
      expect(currentSequence.value).toEqual(['g', 'd']);

      dispatchKeyEvent(target, 'keydown', 's');
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1);
      expect(currentSequence.value).toEqual([]);

      unregister();
      dispatchKeyEvent(target, 'keydown', 'g');
      dispatchKeyEvent(target, 'keydown', 'd');
      dispatchKeyEvent(target, 'keydown', 's');
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should not trigger sequence if timeout occurs mid-sequence', async () => {
      const { on } = useKeyBindings({ target, sequenceTimeoutDuration: 100 });
      const handler = vi.fn();
      on('g-d', handler);

      dispatchKeyEvent(target, 'keydown', 'g');
      await nextTick();
      vi.advanceTimersByTime(101);
      dispatchKeyEvent(target, 'keydown', 'd');
      await nextTick();
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('Platform Modifier Normalization (Meta/Ctrl)', () => {
    const originalPlatform = typeof navigator !== 'undefined' ? navigator.platform : '';

    beforeEach(() => {
      if (typeof navigator !== 'undefined') {
        Object.defineProperty(global.navigator, 'platform', {
          value: originalPlatform,
          configurable: true,
          writable: true,
        });
      }
      // Ensure mocks are reset for platform module before each test in this describe block
      vi.resetModules();
      vi.doUnmock('../platform');
    });

    afterEach(() => {
      vi.resetModules();
      vi.doUnmock('../platform');
      if (typeof navigator !== 'undefined') {
        Object.defineProperty(global.navigator, 'platform', {
          value: originalPlatform,
          configurable: true,
          writable: true,
        });
      }
    });

    it('should treat "meta+s" as "ctrl+s" in combinations on non-Mac', async () => {
      vi.doMock('../platform', async (importOriginal) => {
        const original = await importOriginal() as any;
        return { ...original, IS_CLIENT: true, IS_MAC: false };
      });
      const { useKeyBindings: freshUseKeyBindings } = await import('../useKeyBindings');
      const { on, keys } = freshUseKeyBindings({ target });

      const metaHandler = vi.fn();
      on('meta+s', metaHandler);
      dispatchKeyEvent(target, 'keydown', 'Control');
      dispatchKeyEvent(target, 'keydown', 's');
      await nextTick();
      expect(metaHandler).toHaveBeenCalledTimes(1);
      expect(keys.ctrl.value).toBe(true);
      expect(keys.s.value).toBe(true);
    });

    it('should treat "command+s" (aliased to meta+s) as "ctrl+s" on non-Mac', async () => {
      vi.doMock('../platform', async (importOriginal) => {
        const original = await importOriginal() as any;
        return { ...original, IS_CLIENT: true, IS_MAC: false };
      });
      const { useKeyBindings: freshUseKeyBindings } = await import('../useKeyBindings');
      const { on, keys } = freshUseKeyBindings({ target });

      const commandHandler = vi.fn();
      on('command+s', commandHandler);
      dispatchKeyEvent(target, 'keydown', 'Control');
      dispatchKeyEvent(target, 'keydown', 's');
      await nextTick();
      expect(commandHandler).toHaveBeenCalledTimes(1);
      expect(keys.ctrl.value).toBe(true);
      expect(keys.s.value).toBe(true);
    });

    it('should treat "meta+s" as "meta+s" (not "ctrl+s") on Mac', async () => {
      vi.doMock('../platform', async (importOriginal) => {
        const original = await importOriginal() as any;
        return { ...original, IS_CLIENT: true, IS_MAC: true };
      });
      const { useKeyBindings: freshUseKeyBindingsMac } = await import('../useKeyBindings');
      const { on, keys } = freshUseKeyBindingsMac({ target });

      const metaHandler = vi.fn();
      const ctrlHandler = vi.fn();
      on('meta+s', metaHandler);
      on('ctrl+s', ctrlHandler);

      // Test Meta+S on Mac
      dispatchKeyEvent(target, 'keydown', 'Meta');
      dispatchKeyEvent(target, 'keydown', 's');
      await nextTick();
      expect(metaHandler).toHaveBeenCalledTimes(1);
      expect(ctrlHandler).not.toHaveBeenCalled(); // This was the failing assertion
      expect(keys.meta.value).toBe(true);
      expect(keys.s.value).toBe(true);
      dispatchKeyEvent(target, 'keyup', 'Meta');
      dispatchKeyEvent(target, 'keyup', 's');
      await nextTick();

      // Clear mocks before next set of dispatches
      metaHandler.mockClear();
      ctrlHandler.mockClear();

      // Test Ctrl+S on Mac
      dispatchKeyEvent(target, 'keydown', 'Control');
      dispatchKeyEvent(target, 'keydown', 's');
      await nextTick();
      expect(metaHandler).not.toHaveBeenCalled();
      expect(ctrlHandler).toHaveBeenCalledTimes(1);
      expect(keys.ctrl.value).toBe(true);
      expect(keys.s.value).toBe(true);
    });
  });

  describe('Input Blocking', () => {
    let inputElement: HTMLInputElement;
    let textareaElement: HTMLTextAreaElement;
    let divElement: HTMLDivElement;

    beforeEach(() => {
      inputElement = document.createElement('input');
      textareaElement = document.createElement('textarea');
      divElement = document.createElement('div');
      document.body.appendChild(inputElement);
      document.body.appendChild(textareaElement);
      document.body.appendChild(divElement);
    });

    afterEach(() => {
      inputElement.remove();
      textareaElement.remove();
      divElement.remove();
    });

    it('should block handler by default when an input is focused', async () => {
      const { on } = useKeyBindings({ target });
      const handler = vi.fn();
      on('a', handler);
      inputElement.focus();
      await nextTick();
      expect(document.activeElement).toBe(inputElement);
      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      expect(handler).not.toHaveBeenCalled();
    });

    it('should block handler by default when a textarea is focused', async () => {
      const { on } = useKeyBindings({ target });
      const handler = vi.fn();
      on('a', handler);
      textareaElement.focus();
      await nextTick();
      expect(document.activeElement).toBe(textareaElement);
      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      expect(handler).not.toHaveBeenCalled();
    });

    it('should NOT block handler by default when a non-input element is focused', async () => {
      const { on } = useKeyBindings({ target });
      const handler = vi.fn();
      on('a', handler);
      divElement.focus(); // Focus the div, not a standard input
      // In JSDOM, if div is not focusable or focus moves, activeElement might revert to body
      // For robustness, ensure the div IS the active element if it's focusable, or test against body
      if (document.activeElement !== divElement) {
        // Fallback: if div didn't take focus, ensure body is what we test against if that's JSDOM's behavior
        document.body.focus();
      }
      expect(document.activeElement === divElement || document.activeElement === document.body).toBe(true);
      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should NOT block handler by default when no element is focused (activeElement is body in JSDOM)', async () => {
      const { on } = useKeyBindings({ target });
      const handler = vi.fn();
      on('a', handler);
      if (document.activeElement && (document.activeElement as HTMLElement).blur) {
        (document.activeElement as HTMLElement).blur();
      }
      expect(document.activeElement).toBe(document.body);
      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should allow handler when ignoreInputBlocker is true, even if input is focused', async () => {
      const { on } = useKeyBindings({ target });
      const handler = vi.fn();
      on('a', handler, { ignoreInputBlocker: true });
      inputElement.focus();
      expect(document.activeElement).toBe(inputElement);
      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should respect a custom inputBlockerFn returning "deny" from options', async () => {
      const customBlocker = vi.fn((el: Element | null) => (el === inputElement ? 'deny' : 'allow') as 'allow' | 'deny' | 'named');
      const { on } = useKeyBindings({ target, inputBlockerFn: customBlocker });
      const handler = vi.fn();
      on('a', handler);
      inputElement.focus();
      await nextTick();
      expect(document.activeElement).toBe(inputElement);
      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      expect(handler).not.toHaveBeenCalled();
      expect(customBlocker).toHaveBeenCalledWith(inputElement);
    });
  });

  describe('Debounce and Throttle', () => {
    it('should debounce handler calls', async () => {
      const { on } = useKeyBindings({ target });
      const handler = vi.fn();
      const debounceTime = 100;
      on('a', handler, { debounce: debounceTime });
      dispatchKeyEvent(target, 'keydown', 'a');
      dispatchKeyEvent(target, 'keydown', 'a');
      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      expect(handler).not.toHaveBeenCalled();
      vi.advanceTimersByTime(debounceTime - 1);
      expect(handler).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1);
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1);
      dispatchKeyEvent(target, 'keydown', 'a');
      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      vi.advanceTimersByTime(debounceTime);
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(2);
    });

    it('should throttle handler calls for distinct execution windows', async () => {
      const { on } = useKeyBindings({ target });
      const handler = vi.fn();
      const throttleTime = 100;
      on('a', handler, { throttle: throttleTime });
      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1);
      dispatchKeyEvent(target, 'keydown', 'a');
      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1);
      vi.advanceTimersByTime(throttleTime + 1);
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(2);
      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(2);
      vi.advanceTimersByTime(throttleTime + 1);
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(3);
      vi.advanceTimersByTime(throttleTime + 1);
      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(4);
    });

    it('debounce should take precedence over throttle', async () => {
      const { on } = useKeyBindings({ target });
      const handler = vi.fn();
      const debounceTime = 100;
      const throttleTime = 50;
      on('a', handler, { debounce: debounceTime, throttle: throttleTime });
      dispatchKeyEvent(target, 'keydown', 'a');
      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      expect(handler).not.toHaveBeenCalled();
      vi.advanceTimersByTime(throttleTime);
      expect(handler).not.toHaveBeenCalled();
      vi.advanceTimersByTime(debounceTime - throttleTime + 1);
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('onScopeDispose behavior', () => {
    it('should call stop() when the component scope is disposed', async () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      let bindingsInstance: ReturnType<typeof useKeyBindings> | null = null;
      const setupFn = () => {
        bindingsInstance = useKeyBindings({ target: window });
      };
      const { unmount } = mountTestComponent(setupFn);
      expect(bindingsInstance).not.toBeNull();
      expect(bindingsInstance!.isListening.value).toBe(true);
      const initialRemoveCallCount = removeEventListenerSpy.mock.calls.length;
      unmount();
      await nextTick();
      expect(bindingsInstance!.isListening.value).toBe(false);
      // Check that the specific listeners were removed
      const relevantRemoveCalls = removeEventListenerSpy.mock.calls.slice(initialRemoveCallCount);
      expect(relevantRemoveCalls.some(call => call[0] === 'keydown')).toBe(true);
      expect(relevantRemoveCalls.some(call => call[0] === 'keyup')).toBe(true);
      expect(relevantRemoveCalls.length).toBe(2); // Exactly two relevant calls
      removeEventListenerSpy.mockRestore();
    });
  });
});
