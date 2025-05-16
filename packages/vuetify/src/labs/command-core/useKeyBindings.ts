import { ref, readonly, computed, onScopeDispose, toValue, getCurrentInstance } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { UseKeyBindingsOptions, KeyBindingInputBlockerFn, KeyBindingHandlerOptions, KeyBindingTrigger } from './types'
import { IS_CLIENT, IS_MAC } from './platform'

/**
 * @file useKeyBindings.ts A dependency-free Vue composable for advanced keyboard shortcut and sequence detection.
 */

// --- Utility Functions ---

/**
 * Debounces a function, delaying its execution until after a specified wait time has passed since the last call.
 * @template T - The type of the function to debounce.
 * @param {T} fn - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {T} The debounced function.
 */
function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let timeoutId: number | undefined;
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => fn.apply(this, args), delay);
  } as T;
}

/**
 * Throttles a function, ensuring it's executed at most once per specified period.
 * The last call within a period is queued to execute at the end of the period.
 * @template T - The type of the function to throttle.
 * @param {T} fn - The function to throttle.
 * @param {number} delay - The throttle period in milliseconds.
 * @returns {T} The throttled function.
 */
function throttle<T extends (...args: any[]) => any>(fn: T, delay: number): T {
  let lastCallTime = 0;
  let timeoutId: number | undefined;
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    const now = Date.now();
    const remainingTime = delay - (now - lastCallTime);
    clearTimeout(timeoutId);
    if (remainingTime <= 0) {
      lastCallTime = now;
      fn.apply(this, args);
    } else {
      timeoutId = window.setTimeout(() => {
        lastCallTime = Date.now();
        fn.apply(this, args);
      }, remainingTime);
    }
  } as T;
}

/** Default function to determine if keybindings should be blocked based on the active element. */
const defaultInputBlockerFn: KeyBindingInputBlockerFn = (element) => {
  if (!element) return 'allow'
  const tagName = element.tagName?.toUpperCase()
  const contentEditable = (element as HTMLElement).isContentEditable

  if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT' || contentEditable) {
    // Could extend to check element.name here if needed, returning 'named'
    return 'deny'
  }
  return 'allow'
}

/** Default map for aliasing key names. */
const defaultAliasMap: Record<string, string> = {
  'command': 'meta',
  'cmd': 'meta',
  'control': 'ctrl',
  'option': 'alt',
  'escape': 'esc',
  // Add more common aliases
  'up': 'arrowup',
  'down': 'arrowdown',
  'left': 'arrowleft',
  'right': 'arrowright',
  // Modifier keys themselves if needed directly
  'meta': 'meta',
  'ctrl': 'ctrl',
  'shift': 'shift',
  'alt': 'alt',
}

// --- Type Aliases and Interfaces (Internal to useKeyBindings) ---

/** Normalized representation of a key filter after parsing. */
type NormalizedKeyFilter = Set<string> | ((event: KeyboardEvent) => boolean);

/** Normalized representation of a key combination trigger. */
interface NormalizedTriggerCombination {
  type: 'combination';
  keys: Set<string>; // Set of normalized keys that must all be pressed
}

/** Normalized representation of a key sequence trigger. */
interface NormalizedTriggerSequence {
  type: 'sequence';
  sequence: string[]; // Array of normalized keys in order
}

/** Normalized representation of a single key trigger (can be a set or predicate). */
interface NormalizedTriggerKey {
  type: 'key';
  filter: NormalizedKeyFilter; // Either a set of allowed keys or a predicate
}

/** Union type for all parsed trigger representations. */
type ParsedTrigger = NormalizedTriggerCombination | NormalizedTriggerSequence | NormalizedTriggerKey;

/** Internal structure to store registered handlers along with their parsed triggers and options. */
interface RegisteredHandler {
  id: number; // For easier removal
  trigger: KeyBindingTrigger;
  handler: (event: KeyboardEvent) => void;
  options: KeyBindingHandlerOptions;
  parsedTrigger: ParsedTrigger;
  // unregister: () => void; // Handled by removing from array
}

/** Counter for generating unique handler IDs. */
let handlerIdCounter = 0;

/**
 * A Vue composable for managing keyboard shortcuts, combinations, and sequences.
 * It provides reactive states for pressed keys and allows registering handlers for various key events.
 *
 * @param {UseKeyBindingsOptions} [options={}] - Configuration options for the keybindings manager.
 * @returns {object} The public API of the `useKeyBindings` composable.
 * @property {Readonly<Ref<Set<string>>>} pressedKeys - A reactive set of currently pressed (normalized) key names.
 * @property {Readonly<Ref<string[]>>} currentSequence - A reactive array of keys pressed in sequence.
 * @property {Record<string, Readonly<Ref<boolean>> | ComputedRef<boolean>>} keys - A proxy for reactive access to individual key states (e.g., `keys.a.value`) and combination states (e.g., `keys['ctrl+s'].value`).
 * @property {(key: string) => Readonly<Ref<boolean>>} getKeyState - Function to get a reactive boolean ref for a single key's pressed state.
 * @property {(trigger: KeyBindingTrigger, handler: (event: KeyboardEvent) => void, options?: KeyBindingHandlerOptions) => () => void} on - Registers a key event handler. Returns a function to unregister it.
 * @property {(combination: string) => ComputedRef<boolean>} isCombinationActive - Returns a computed ref indicating if a specific key combination is active.
 * @property {() => void} start - Manually starts event listeners if not auto-started (e.g., if `target` was initially undefined).
 * @property {() => void} stop - Manually stops event listeners and cleans up state.
 * @property {Readonly<Ref<boolean>>} isListening - Reactive boolean indicating if event listeners are active.
 */
export function useKeyBindings(options: UseKeyBindingsOptions = {}) {
  const {
    target = IS_CLIENT ? window : undefined,
    aliasMap: userAliasMap = {},
    sequenceTimeoutDuration = 1500,
    inputBlockerFn = defaultInputBlockerFn,
    capture = false,
    passive: defaultPassive,
  } = options

  const aliasMap = { ...defaultAliasMap, ...userAliasMap }

  // --- Core Reactive State ---
  const pressedKeys = ref<Set<string>>(new Set()) // Stores normalized event.key values
  const currentSequence = ref<string[]>([])
  const sequenceTimer = ref<number | null>(null)

  // Use a plain object to store refs for individual key states
  const individualKeyStates: Record<string, Ref<boolean>> = {}
  // Cache for combination computed refs (plain object is fine here too)
  const combinationComputedRefs: Record<string, ComputedRef<boolean>> = {}

  const activeHandlers = ref<RegisteredHandler[]>([])
  const internalIsListening = ref(false) // Internal ref for listening state

  // --- Event Listeners ---
  const stopFunctions: (() => void)[] = []

  /** Normalizes a key string by converting to lowercase and applying aliases. */
  function normalizeKey(key: string): string {
    const lowerKey = key.toLowerCase();
    // Handle platform specific modifier normalization for 'meta' and 'ctrl'
    // If meta is used in a combo, and not on mac, it implies ctrl.
    // If ctrl is used in a combo, and on mac, it can imply meta (this is more of a consumer choice, stick to direct for now)
    // For now, aliasMap handles common cases. Specific platform swap can be added if complex combos need it.
    return aliasMap[lowerKey] || lowerKey;
  }

  /**
   * Central event handler for 'keydown' and 'keyup' events.
   * Updates internal state (pressedKeys, individualKeyStates, currentSequence)
   * and iterates through registered handlers to check for matches.
   * @param {Event} event - The keyboard event.
   */
  const onKeyEvent = (event: Event) => {
    if (!(event instanceof KeyboardEvent)) return;

    // IMPORTANT: Do not call preventDefault/stopPropagation directly in onKeyEvent
    // Handler-specific options should determine this.

    const eventKey = normalizeKey(event.key);
    const eventType = event.type as 'keydown' | 'keyup';

    // 1. Update `pressedKeys` set
    if (eventType === 'keydown') {
      pressedKeys.value.add(eventKey);
    } else {
      pressedKeys.value.delete(eventKey);
    }
    // Vue 3 refs of Sets are reactive to add/delete, direct reassignment is not usually needed.
    // pressedKeys.value = new Set(pressedKeys.value);

    // 2. Update individual key states - Robustly
    let targetRef = individualKeyStates[eventKey];
    if (!targetRef) {
      targetRef = ref(false);
      individualKeyStates[eventKey] = targetRef; // Add to plain object
    }
    // At this point, targetRef is the correct Ref object, either pre-existing or newly added and reactive.
    targetRef.value = (eventType === 'keydown');

    // 3. Determine input blocking state for current event
    const activeElement = IS_CLIENT ? document.activeElement : null;
    const inputBlockResult = inputBlockerFn(activeElement);

    // 4. Update sequence for keydown events
    if (eventType === 'keydown') {
      if (sequenceTimer.value) clearTimeout(sequenceTimer.value);
      currentSequence.value.push(eventKey);
      sequenceTimer.value = window.setTimeout(() => {
        currentSequence.value = [];
      }, sequenceTimeoutDuration);
    } // Keyup typically doesn't modify the sequence buffer directly for matching.

    // 5. Iterate over `activeHandlers` and trigger matching ones
    for (const handler of activeHandlers.value) {
      const { parsedTrigger, options: handlerSpecificOptions, handler: callback } = handler;
      const {
        eventName: handlerEventName = 'keydown',
        ignoreKeyRepeat = false,
        ignoreInputBlocker = false,
        preventDefault = false,
        stopPropagation = false,
      } = handlerSpecificOptions;

      let shouldContinue = false;
      if (eventType !== handlerEventName) shouldContinue = true;
      if (!shouldContinue && eventType === 'keydown' && ignoreKeyRepeat && event.repeat) shouldContinue = true;

      const currentInputBlockResult = inputBlockerFn(activeElement);

      if (!shouldContinue && !ignoreInputBlocker && currentInputBlockResult === 'deny') {
        shouldContinue = true;
      }

      if (shouldContinue) continue;

      let matched = false;

      if (parsedTrigger.type === 'key') {
        if (typeof parsedTrigger.filter === 'function') {
          if (parsedTrigger.filter(event)) {
            matched = true;
          }
        } else { // Set<string>
          if (parsedTrigger.filter.has(eventKey)) {
            matched = true;
          }
        }
      } else if (parsedTrigger.type === 'combination') {
        // Combinations are typically checked on keydown for all keys in the combo.
        // The check ensures all keys in the combo are currently in pressedKeys.
        // And that the current event key is one of the keys in the combination (it's the last one pressed to complete it).
        if (eventType === 'keydown' && parsedTrigger.keys.has(eventKey)) {
          const allPressed = Array.from(parsedTrigger.keys).every(k => pressedKeys.value.has(k));
          if (allPressed) {
             // Ensure no other keys that are not part of the combination are pressed (strict check - optional)
            // For example, if combo is ctrl+s, ctrl+shift+s should not trigger it unless shift is also part of combo.
            // This can be controlled by an option if desired. For now, allow extra modifiers.
            // if (pressedKeys.value.size === parsedTrigger.keys.size) {
            matched = true;
            // }
          }
        }
      } else if (parsedTrigger.type === 'sequence') {
        // Sequences are typically checked on keydown of the last key in the sequence.
        if (eventType === 'keydown') {
          const seq = parsedTrigger.sequence;
          if (currentSequence.value.length >= seq.length) {
            const lastPartOfSequence = currentSequence.value.slice(-seq.length);
            if (lastPartOfSequence.every((k, i) => k === seq[i])) {
              matched = true;
            }
          }
        }
      }

      if (matched) {
        if (preventDefault) {
          event.preventDefault();
        }
        if (stopPropagation) {
          event.stopPropagation();
        }
        callback(event);

        // If a sequence was matched and triggered, clear the sequence buffer and timer.
        if (parsedTrigger.type === 'sequence') {
          currentSequence.value = [];
          if (sequenceTimer.value) {
            clearTimeout(sequenceTimer.value);
            sequenceTimer.value = null;
          }
        }
      }
    }
  };

  /**
   * Parses a `KeyBindingTrigger` into a normalized `ParsedTrigger` object.
   * Handles single keys, arrays of keys (as a set), predicate functions,
   * string combinations (e.g., "ctrl+s"), and string sequences (e.g., "g-d-s").
   * Also applies platform-specific modifier normalization (meta/ctrl) for combinations.
   * @param {KeyBindingTrigger} trigger - The trigger to parse.
   * @param {(key: string) => string} normalizeFn - The function used to normalize individual key names.
   * @returns {ParsedTrigger} The parsed and normalized trigger representation.
   */
  function parseTrigger(trigger: KeyBindingTrigger, normalizeFn: (key: string) => string): ParsedTrigger {
    if (typeof trigger === 'function') {
      return { type: 'key', filter: trigger };
    }
    if (Array.isArray(trigger)) {
      return { type: 'key', filter: new Set(trigger.map(normalizeFn)) };
    }
    if (typeof trigger === 'string') {
      if (trigger.includes('+') || trigger.includes('_')) {
        let keys = trigger.split(/[+_]/).map(k => k.trim());
        keys = keys.map(k => aliasMap[k.toLowerCase()] || k.toLowerCase());
        if (!IS_MAC && keys.includes('meta')) {
          keys = keys.map(k => k === 'meta' ? 'ctrl' : k);
        }
        const normalizedKeys = keys.map(normalizeFn);
        return { type: 'combination', keys: new Set(normalizedKeys) };
      } else if (trigger.includes('-') && trigger.length > 1) {
        const sequence = trigger.split('-').map(k => normalizeFn(k.trim()));
        return { type: 'sequence', sequence };
      } else {
        return { type: 'key', filter: new Set([normalizeFn(trigger)]) };
      }
    }
    console.warn('[useKeyBindings] Unknown trigger type:', trigger);
    return { type: 'key', filter: () => false };
  }

  // --- Public API ---
  const on = (
    trigger: KeyBindingTrigger,
    originalHandler: (event: KeyboardEvent) => void,
    handlerOptions: KeyBindingHandlerOptions = {}
  ): (() => void) => {
    const id = handlerIdCounter++;
    const parsedTrigger = parseTrigger(trigger, normalizeKey);

    let finalHandler = originalHandler;
    if (handlerOptions.debounce && handlerOptions.debounce > 0) {
      finalHandler = debounce(originalHandler, handlerOptions.debounce);
    } else if (handlerOptions.throttle && handlerOptions.throttle > 0) {
      finalHandler = throttle(originalHandler, handlerOptions.throttle);
    }

    const registeredHandler: RegisteredHandler = {
      id,
      trigger,
      handler: finalHandler,
      options: { ...handlerOptions },
      parsedTrigger,
    };

    activeHandlers.value.push(registeredHandler);

    const unregister = () => {
      activeHandlers.value = activeHandlers.value.filter(h => h.id !== id);
    };
    return unregister;
  }

  const getKeyStateRef = (key: string): Ref<boolean> => {
    const normalized = normalizeKey(key);
    let targetRef = individualKeyStates[normalized];
    if (!targetRef) {
      targetRef = ref(false);
      individualKeyStates[normalized] = targetRef; // Add to plain object
    }
    // Always return the ref from the *current* individualKeyStates object
    return targetRef;
  };

  const keysProxy = new Proxy({} as Record<string, Ref<boolean> | ComputedRef<boolean>>, {
    get(_, name: string) {
      const normalizedName = normalizeKey(name as string);
      if ((name as string).includes('+') || (name as string).includes('_')) {
        if (!combinationComputedRefs[normalizedName]) {
          const parsed = parseTrigger(name as string, normalizeKey);
          if (parsed.type === 'combination') {
            combinationComputedRefs[normalizedName] = computed(() =>
              parsed.keys.size > 0 && Array.from(parsed.keys).every(k => getKeyStateRef(k).value)
            );
          } else {
            combinationComputedRefs[normalizedName] = computed(() => false);
          }
        }
        return combinationComputedRefs[normalizedName];
      }
      // Simple key - temporarily return the Ref directly without readonly for debugging
      const keyRef = getKeyStateRef(normalizedName);
      return readonly(keyRef); // Restore readonly()
    }
  });

  // Deprecate or remove isCombinationActive if keysProxy['ctrl+s'] is preferred
  const isCombinationActive = (combination: string): ComputedRef<boolean> => {
    const access = keysProxy[combination]; // Leverage the proxy
    if (access && 'value' in access && typeof access.value === 'boolean') {
        return access as ComputedRef<boolean>; // Assuming combinations always return a ComputedRef<boolean>
    }
    return computed(() => false); // Fallback for invalid combo strings
  };

  const start = () => {
    if (internalIsListening.value || !IS_CLIENT) return
    const eventTarget = toValue(target)
    if (!eventTarget) return

    const add = eventTarget.addEventListener.bind(eventTarget)

    stopFunctions.push(useEventListener(eventTarget, 'keydown', onKeyEvent, { capture, passive: defaultPassive }))
    stopFunctions.push(useEventListener(eventTarget, 'keyup', onKeyEvent, { capture, passive: defaultPassive }))
    // Potentially listen to blur/focus on window to reset state if needed
    // stopFunctions.push(useEventListener(window, 'blur', resetPressedKeys, { capture, passive: true }))

    internalIsListening.value = true
  }

  const stop = () => {
    if (!internalIsListening.value) return
    stopFunctions.forEach(fn => fn())
    stopFunctions.length = 0
    pressedKeys.value.clear()
    currentSequence.value = []
    if(sequenceTimer.value) clearTimeout(sequenceTimer.value)
    // Clear individualKeyStates by reassigning to empty object
    Object.keys(individualKeyStates).forEach(key => delete individualKeyStates[key]);
    Object.keys(combinationComputedRefs).forEach(key => delete combinationComputedRefs[key]);
    internalIsListening.value = false
  }

  // Auto-start and cleanup
  if (IS_CLIENT) {
    start()
    if (getCurrentInstance()) {
      onScopeDispose(stop)
    }
  }

  /** Helper to add and remove event listeners, abstracted for potential non-DOM targets if needed. */
  function useEventListener(
    eventTarget: EventTarget,
    event: string,
    listener: EventListener,
    options?: AddEventListenerOptions
  ): () => void {
    eventTarget.addEventListener(event, listener, options)
    return () => eventTarget.removeEventListener(event, listener, options)
  }

  // --- Return Value ---
  return {
    // Reactive State
    pressedKeys: readonly(pressedKeys),
    currentSequence: readonly(currentSequence),

    // Individual & Combination Key State Access via Proxy
    keys: keysProxy as Record<string, Readonly<Ref<boolean>> | ComputedRef<boolean>>, // Restore original type

    // Direct method if proxy isn't used or for specific cases
    getKeyState: (key: string) => readonly(getKeyStateRef(key)),

    // Methods
    on,
    isCombinationActive, // Kept for now, but keys.ctrl_s preferred

    // Lifecycle
    start, // Manually start listeners if not auto-started
    stop,  // Manually stop listeners / cleanup
    isListening: readonly(internalIsListening), // Expose readonly version of internal listening state
  }
}

// TODO:
// - Platform-specific modifier normalization (Meta/Ctrl) within normalizeKey or combination parsing needs deeper check.
// - Dedupe logic for handlers. (Implemented in onKeyEvent)
// - Debounce/Throttle for handlers (if deemed necessary).
// - Consider `event.code` vs `event.key` for more layout-independent bindings (optional, adds complexity).
// - Refine `runInTextInput` integration when triggering handlers. (InputBlockerFn is used in onKeyEvent)
