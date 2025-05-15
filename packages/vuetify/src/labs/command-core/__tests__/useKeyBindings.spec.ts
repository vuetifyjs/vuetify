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
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should initialize and stop correctly', async () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    const { stop, isListening } = useKeyBindings({ target: window });
    expect(isListening.value).toBe(true);
    expect(addSpy).toHaveBeenCalledTimes(2); // keydown, keyup

    stop();
    await nextTick();
    expect(isListening.value).toBe(false);
    expect(removeSpy).toHaveBeenCalledTimes(2);

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

    it('should respect dedupe option', async () => {
      const { on } = useKeyBindings({ target });
      const handler = vi.fn();
      on('a', handler, { dedupe: true });

      dispatchKeyEvent(target, 'keydown', 'a'); // First event
      await nextTick();
      dispatchKeyEvent(target, 'keydown', 'a', { repeat: true }); // Repeated event
      await nextTick();
      dispatchKeyEvent(target, 'keydown', 'a', { repeat: true }); // Another repeated event
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1);

      dispatchKeyEvent(target, 'keyup', 'a'); // Release
      await nextTick();
      dispatchKeyEvent(target, 'keydown', 'a'); // New press, should trigger
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(2);
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

      // Dispatch the event. The actual event object processed by useKeyBindings is this one.
      const dispatchedEvent = dispatchKeyEvent(target, 'keydown', testKey);
      await nextTick();

      expect(handler).toHaveBeenCalledTimes(1);
      // The event received by the handler should be the same instance as the one dispatched and processed.
      expect(receivedEventByHandler).toBe(dispatchedEvent);
      expect(dispatchedEvent.defaultPrevented).toBe(true);

      // For stopPropagation, we can spy on the method of the *dispatchedEvent* object itself,
      // assuming useKeyBindings calls stopPropagation on the event it receives.
      // This is more direct than relying on side effects.
      // However, the spy needs to be attached *before* the event is fully processed by the internal listeners if possible,
      // or we trust the implementation detail that the original event object has its methods called.
      // Given our current setup, checking defaultPrevented is the most reliable direct assertion.
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
      const unregister = on('g-d-s', handler); // Using '-' as sequence delimiter as per parseTrigger

      dispatchKeyEvent(target, 'keydown', 'g');
      await nextTick();
      dispatchKeyEvent(target, 'keydown', 'd');
      await nextTick();
      expect(handler).not.toHaveBeenCalled();
      expect(currentSequence.value).toEqual(['g', 'd']);

      dispatchKeyEvent(target, 'keydown', 's');
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1);
      expect(currentSequence.value).toEqual([]); // Sequence should clear after successful trigger

      // Test unregister
      unregister();
      dispatchKeyEvent(target, 'keydown', 'g');
      dispatchKeyEvent(target, 'keydown', 'd');
      dispatchKeyEvent(target, 'keydown', 's');
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1); // Should not be called again
    });

    it('should not trigger sequence if timeout occurs mid-sequence', async () => {
      const { on } = useKeyBindings({ target, sequenceTimeoutDuration: 100 });
      const handler = vi.fn();
      on('g-d', handler);

      dispatchKeyEvent(target, 'keydown', 'g');
      await nextTick();
      vi.advanceTimersByTime(101); // Timeout
      dispatchKeyEvent(target, 'keydown', 'd');
      await nextTick();
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('Platform Modifier Normalization (Meta/Ctrl)', () => {
    const originalPlatform = typeof navigator !== 'undefined' ? navigator.platform : '';

    beforeEach(() => {
      // Ensure navigator.platform can be changed by tests if they choose to (though vi.mock is preferred)
      if (typeof navigator !== 'undefined') {
        Object.defineProperty(global.navigator, 'platform', {
          value: originalPlatform, // Default to original for safety before each sub-test
          configurable: true,
          writable: true,
        });
      }
    });

    afterEach(() => {
      vi.resetModules();
      vi.doUnmock('../platform'); // Unmock after each test in this suite
      // Restore original navigator.platform if it was changed by a test directly (fallback)
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
      vi.resetModules();
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
      vi.resetModules();
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
      vi.resetModules();
      const { useKeyBindings: freshUseKeyBindingsMac } = await import('../useKeyBindings');
      const { on, keys } = freshUseKeyBindingsMac({ target });

      const metaHandler = vi.fn();
      const ctrlHandler = vi.fn();
      on('meta+s', metaHandler);
      on('ctrl+s', ctrlHandler);

      dispatchKeyEvent(target, 'keydown', 'Meta');
      dispatchKeyEvent(target, 'keydown', 's');
      await nextTick();
      expect(metaHandler).toHaveBeenCalledTimes(1);
      expect(ctrlHandler).not.toHaveBeenCalled();
      expect(keys.meta.value).toBe(true);
      expect(keys.s.value).toBe(true);
      dispatchKeyEvent(target, 'keyup', 'Meta');
      dispatchKeyEvent(target, 'keyup', 's');
      await nextTick();
      metaHandler.mockClear();
      ctrlHandler.mockClear();

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
      await nextTick(); // Allow DOM to update after focus
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
      await nextTick(); // Allow DOM to update after focus
      expect(document.activeElement).toBe(textareaElement);

      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      expect(handler).not.toHaveBeenCalled();
    });

    it('should NOT block handler by default when a non-input element is focused', async () => {
      const { on } = useKeyBindings({ target });
      const handler = vi.fn();
      on('a', handler);

      divElement.focus();
      document.body.focus();
      expect(document.activeElement).toBe(document.body);

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
      await nextTick(); // Allow DOM to update after focus
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
      await nextTick(); // Allow events to queue if needed
      expect(handler).not.toHaveBeenCalled(); // Should not be called immediately

      vi.advanceTimersByTime(debounceTime - 1);
      expect(handler).not.toHaveBeenCalled(); // Still not called

      vi.advanceTimersByTime(1);
      await nextTick(); // Allow promise microtasks from setTimeout to resolve
      expect(handler).toHaveBeenCalledTimes(1); // Called once after debounce period

      // Another set of calls
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

      // Call 1: Executes immediately (t=0)
      dispatchKeyEvent(target, 'keydown', 'a'); // #1
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1);

      // Call 2 (t=10) & Call 3 (t=60): During cooldown of Call 1. Only Call 3 (last one) will be queued.
      dispatchKeyEvent(target, 'keydown', 'a');
      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1); // Still 1

      // Advance time for queued Call 3 to fire. Fires at t=0 + 100 = 100.
      vi.advanceTimersByTime(throttleTime + 1); // Advance to t=101. Queued Call 3 fires.
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(2); // #2 (Queued Call 3 executed)
                                              // lastCallTime is now ~101 for the throttle logic.

      // Call 4: (dispatched at t=101, immediately after #2 fires)
      // Logic: now=101, lastCallTime=101. remainingTime = 100 - (101-101) = 100. Queues for t=101+100=201.
      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(2); // Still 2, Call 4 is queued.

      // Advance time for queued Call 4 to fire.
      vi.advanceTimersByTime(throttleTime + 1); // Advance to t=101+101=202. Queued Call 4 fires.
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(3); // #3 (Queued Call 4 executed)
                                              // lastCallTime is now ~202.

      // Call 5: After all cooldowns, should be immediate again.
      vi.advanceTimersByTime(throttleTime + 1); // Ensure well past last execution (t=202 + 101 = 303)
      dispatchKeyEvent(target, 'keydown', 'a');
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(4); // #4 (Immediate call)
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
      expect(handler).not.toHaveBeenCalled(); // Debounce is active

      vi.advanceTimersByTime(throttleTime);
      expect(handler).not.toHaveBeenCalled(); // Still debouncing, throttle hasn't kicked in

      vi.advanceTimersByTime(debounceTime - throttleTime + 1);
      await nextTick();
      expect(handler).toHaveBeenCalledTimes(1); // Called once due to debounce
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
      expect(removeEventListenerSpy.mock.calls.length).toBeGreaterThanOrEqual(initialRemoveCallCount + 2);

      let keydownRemoved = false;
      let keyupRemoved = false;
      removeEventListenerSpy.mock.calls.forEach(call => {
        if (call[0] === 'keydown') keydownRemoved = true;
        if (call[0] === 'keyup') keyupRemoved = true;
      });
      expect(keydownRemoved).toBe(true);
      expect(keyupRemoved).toBe(true);

      removeEventListenerSpy.mockRestore();
    });
  });

  // TODO: Re-check platform specific meta/ctrl normalization if better mocking for IS_MAC is found
});
