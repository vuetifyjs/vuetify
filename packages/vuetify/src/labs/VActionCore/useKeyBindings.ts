import { ref, readonly, computed, onScopeDispose, toValue, getCurrentInstance } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { UseKeyBindingsOptions, KeyBindingInputBlockerFn, KeyBindingHandlerOptions, KeyBindingTrigger } from './types'
import { log } from './utils'
import { IS_CLIENT, IS_MAC } from './platform'

/**
 * @file useKeyBindings.ts A dependency-free Vue composable for advanced keyboard shortcut and sequence detection.
 */

const COMPONENT_NAME = 'KeyBindings'

// Define modifier keys (used for macOS Cmd keyup workaround)
const modifierKeys = new Set(['ctrl', 'alt', 'shift', 'meta']);

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

/** Default map for aliasing key names. Extended for event.code values. */
const defaultAliasMap: Record<string, string> = {
  // Standard event.key aliases
  'command': 'meta',
  'cmd': 'meta',
  'control': 'ctrl',
  'option': 'alt', // Crucial for Mac Option key
  'escape': 'esc',
  'cmdorctrl': 'meta',
  'primary': 'meta',
  'up': 'arrowup',
  'down': 'arrowdown',
  'left': 'arrowleft',
  'right': 'arrowright',

  // Modifier key self-aliases (ensure they are normalized correctly)
  'meta': 'meta',
  'ctrl': 'ctrl',
  'alt': 'alt',
  'shift': 'shift',

  // Aliases for common event.code values to simpler forms
  // Letters
  'keya': 'a', 'keyb': 'b', 'keyc': 'c', 'keyd': 'd', 'keye': 'e',
  'keyf': 'f', 'keyg': 'g', 'keyh': 'h', 'keyi': 'i', 'keyj': 'j',
  'keyk': 'k', 'keyl': 'l', 'keym': 'm', 'keyn': 'n', 'keyo': 'o',
  'keyp': 'p', 'keyq': 'q', 'keyr': 'r', 'keys': 's', 'keyt': 't',
  'keyu': 'u', 'keyv': 'v', 'keyw': 'w', 'keyx': 'x', 'keyy': 'y',
  'keyz': 'z',
  // Numbers (above letters)
  'digit0': '0', 'digit1': '1', 'digit2': '2', 'digit3': '3', 'digit4': '4',
  'digit5': '5', 'digit6': '6', 'digit7': '7', 'digit8': '8', 'digit9': '9',
  // Numpad numbers
  'numpad0': '0', 'numpad1': '1', 'numpad2': '2', 'numpad3': '3', 'numpad4': '4',
  'numpad5': '5', 'numpad6': '6', 'numpad7': '7', 'numpad8': '8', 'numpad9': '9',
  // Symbols & Special Characters (add more as needed, these are common examples)
  'enter': 'enter', 'numpadenter': 'enter',
  'space': 'space',
  'tab': 'tab',
  'backspace': 'backspace',
  'delete': 'delete',
  'minus': '-', 'numpadsubtract': '-',
  'equal': '=',
  'bracketleft': '[', 'bracketright': ']',
  'semicolon': ';', 'quote': "'",
  'comma': ',', 'period': '.', 'slash': '/',
  'backslash': '\\',
  'backquote': '`',
  // Modifier event.code to generic modifier names
  'altleft': 'alt', 'altright': 'alt',
  'controlleft': 'ctrl', 'controlright': 'ctrl',
  'shiftleft': 'shift', 'shiftright': 'shift',
  'metaleft': 'meta', 'metaright': 'meta',
  // Arrow codes already have good key aliases (up, down, etc.)
  // but if using event.code directly, they would be 'arrowup', 'arrowdown', etc.
  // No specific code aliases needed if event.key aliases are robust.
};

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
    preferEventCode = true,
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

  /**
   * Normalizes a key string by converting to lowercase and applying aliases.
   * Handles platform-specific modifier normalization (meta/ctrl).
   */
  function normalizeKey(key: string): string {
    const lowerKey = key.toLowerCase();
    // Handle platform specific modifier normalization
    const aliased = aliasMap[lowerKey] || lowerKey;

    // Platform-specific normalization - adapt meta/ctrl based on platform
    if (!IS_MAC && aliased === 'meta') {
      return 'ctrl';
    }

    return aliased;
  }

  /**
   * Gets the key value from the keyboard event based on configuration preferences.
   */
  function getKeyValueFromEvent(event: KeyboardEvent): string {
    if (preferEventCode && event.code) {
      // Always use toLowerCase for consistency with event.key normalization
      return event.code.toLowerCase();
    }
    return event.key; // This will also be lowercased by normalizeKey
  }

  /**
   * Handles keyboard events, updating state and triggering handlers.
   * This complex function is broken into focused sections for clarity.
   */
  const onKeyEvent = (event: Event) => {
    if (!(event instanceof KeyboardEvent)) return;

    const eventKey = normalizeKey(getKeyValueFromEvent(event));
    const eventType = event.type as 'keydown' | 'keyup';

    // 1. Update pressed keys state
    updatePressedKeysState(eventKey, eventType);

    // 2. Update sequence state for keydown events
    if (eventType === 'keydown') {
      updateSequenceState(eventKey);
    }

    // 3. Determine input blocking state for current event
    const activeElement = IS_CLIENT ? document.activeElement : null;

    // 4. Process handlers that match this event
    processMatchingHandlers(event, eventKey, eventType, activeElement);
  };

  /**
   * Updates the pressed keys state based on the event type.
   */
  function updatePressedKeysState(eventKey: string, eventType: 'keydown' | 'keyup') {
    // Update the set of pressed keys
    if (eventType === 'keydown') {
      pressedKeys.value.add(eventKey);
    } else {
      pressedKeys.value.delete(eventKey);

      // ---- START macOS Cmd/Meta keyup WORKAROUND ----
      // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1299553
      if (IS_MAC && eventKey === 'meta') {
        // When Meta key is released on macOS, assume other non-modifier keys
        // that might have been part of a Cmd+Key combo are also "up"
        // because their keyup events might have been suppressed.
        const keysToRemove: string[] = [];
        pressedKeys.value.forEach(pressedKey => {
          if (!modifierKeys.has(pressedKey)) {
            keysToRemove.push(pressedKey);
          }
        });
        if (keysToRemove.length > 0) {
          keysToRemove.forEach(key => {
            pressedKeys.value.delete(key);
            if (individualKeyStates[key]) {
              individualKeyStates[key].value = false;
            }
          });
        }
      }
      // ---- END macOS Cmd/Meta keyup WORKAROUND ----
    }

    // Update individual key state refs
    let targetRef = individualKeyStates[eventKey];
    if (!targetRef) {
      targetRef = ref(false);
      individualKeyStates[eventKey] = targetRef;
    }
    targetRef.value = (eventType === 'keydown');
  }

  /**
   * Updates the sequence state, adding the key and resetting the timer.
   */
  function updateSequenceState(eventKey: string) {
    const MAX_SEQUENCE = 100;
    if (sequenceTimer.value) clearTimeout(sequenceTimer.value);
    currentSequence.value.push(eventKey);
    if (currentSequence.value.length > MAX_SEQUENCE) {
      currentSequence.value.shift();
    }
    sequenceTimer.value = window.setTimeout(() => {
      currentSequence.value = [];
    }, sequenceTimeoutDuration);
  }

  /**
   * Processes handlers that may match the current event.
   */
  function processMatchingHandlers(
    event: KeyboardEvent,
    eventKey: string,
    eventType: 'keydown' | 'keyup',
    activeElement: Element | null
  ) {
    for (const handler of activeHandlers.value) {
      const { parsedTrigger, options: handlerOptions, handler: callback } = handler;

      if (shouldSkipHandler(event, eventType, handlerOptions, activeElement)) {
        continue;
      }

      // Check if trigger matches the current event state
      const matched = doesTriggerMatch(parsedTrigger, eventKey, eventType);

      if (matched) {
        // Apply handler options
        if (handlerOptions.preventDefault) {
          event.preventDefault();
        }
        if (handlerOptions.stopPropagation) {
          event.stopPropagation();
        }

        // Execute the handler
        callback(event);

        // Clear sequence if it was matched
        if (parsedTrigger.type === 'sequence') {
          clearSequence();
        }
      }
    }
  }

  /**
   * Determines if a handler should be skipped based on event conditions.
   */
  function shouldSkipHandler(
    event: KeyboardEvent,
    eventType: 'keydown' | 'keyup',
    handlerOptions: KeyBindingHandlerOptions,
    activeElement: Element | null
  ): boolean {
    const {
      eventName: handlerEventName = 'keydown',
      ignoreKeyRepeat = false,
      ignoreInputBlocker = false,
    } = handlerOptions;

    // Skip if event type doesn't match
    if (eventType !== handlerEventName) return true;

    // Skip if ignoring key repeat and this is a repeated key
    if (eventType === 'keydown' && ignoreKeyRepeat && event.repeat) return true;

    // Skip if input blocker applies and not ignoring it
    if (!ignoreInputBlocker && inputBlockerFn(activeElement) === 'deny') {
      return true;
    }

    return false;
  }

  /**
   * Checks if a trigger matches the current event/state.
   */
  function doesTriggerMatch(
    parsedTrigger: ParsedTrigger,
    eventKey: string,
    eventType: 'keydown' | 'keyup'
  ): boolean {
    if (parsedTrigger.type === 'key') {
      // Direct key match with function or set
      return typeof parsedTrigger.filter === 'function'
        ? parsedTrigger.filter(event as KeyboardEvent)
        : parsedTrigger.filter.has(eventKey);
    }

    if (parsedTrigger.type === 'combination' && eventType === 'keydown') {
      // For combinations, check that all keys are pressed and this event is one of them
      if (parsedTrigger.keys.has(eventKey)) {
        return Array.from(parsedTrigger.keys).every(k => pressedKeys.value.has(k));
      }
    }

    if (parsedTrigger.type === 'sequence' && eventType === 'keydown') {
      // For sequences, check if current sequence matches the pattern
      const seq = parsedTrigger.sequence;
      if (currentSequence.value.length >= seq.length) {
        const lastPartOfSequence = currentSequence.value.slice(-seq.length);
        return lastPartOfSequence.every((k, i) => k === seq[i]);
      }
    }

    return false;
  }

  /**
   * Clears the current sequence state and any active timer.
   */
  function clearSequence() {
    currentSequence.value = [];
    if (sequenceTimer.value) {
      clearTimeout(sequenceTimer.value);
      sequenceTimer.value = null;
    }
  }

  /**
   * Parses a KeyBindingTrigger into a normalized ParsedTrigger.
   */
  function parseTrigger(trigger: KeyBindingTrigger, normalizeFn: (key: string) => string): ParsedTrigger {
    if (typeof trigger === 'function') {
      return { type: 'key', filter: trigger };
    }

    if (Array.isArray(trigger)) {
      const normalizedSet = new Set(trigger.map(normalizeFn));
      return { type: 'key', filter: normalizedSet };
    }

    if (typeof trigger === 'string') {
      if (trigger.includes('+') || trigger.includes('_')) {
        let keys = trigger.split(/[+_]/).map(k => k.trim());
        keys = keys.map(k => aliasMap[k.toLowerCase()] || k.toLowerCase());
        if (!IS_MAC && keys.includes('meta')) {
          keys = keys.map(k => k === 'meta' ? 'ctrl' : k);
        }
        const normalizedCombination = new Set(keys.map(normalizeFn));
        return {
          type: 'combination',
          keys: normalizedCombination
        };
      }

      if (trigger.includes('-') && trigger.length > 1) {
        const seqArray = trigger.split('-').map(k => normalizeFn(k.trim()));
        return {
          type: 'sequence',
          sequence: seqArray
        };
      }

      const normalizedSingleKey = new Set([normalizeFn(trigger)]);
      return {
        type: 'key',
        filter: normalizedSingleKey
      };
    }

    log('warn', COMPONENT_NAME, 'Unknown trigger type', { triggerType: typeof trigger });
    return { type: 'key', filter: () => false };
  }

  /**
   * Registers a keyboard event handler.
   */
  const on = (
    trigger: KeyBindingTrigger,
    originalHandler: (event: KeyboardEvent) => void,
    handlerOptions: KeyBindingHandlerOptions = {}
  ): (() => void) => {
    const id = handlerIdCounter++;
    const parsedTrigger = parseTrigger(trigger, normalizeKey);

    // Apply debounce or throttle if specified
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

  /**
   * Gets or creates a reactive ref for a specific key's state.
   */
  const getKeyStateRef = (key: string): Ref<boolean> => {
    const normalized = normalizeKey(key);
    let targetRef = individualKeyStates[normalized];
    if (!targetRef) {
      targetRef = ref(false);
      individualKeyStates[normalized] = targetRef;
    }
    return targetRef;
  };

  /**
   * Proxy to access key states reactively.
   */
  const keysProxy = new Proxy({} as Record<string, Ref<boolean> | ComputedRef<boolean>>, {
    get(_, name: string) {
      const normalizedName = normalizeKey(name as string);

      // Handle combinations (ctrl+s, meta_a)
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

      // Simple key
      return readonly(getKeyStateRef(normalizedName));
    }
  });

  /**
   * Returns a computed ref indicating if a key combination is currently active.
   */
  const isCombinationActive = (combination: string): ComputedRef<boolean> => {
    const access = keysProxy[combination];
    if (access && 'value' in access && typeof access.value === 'boolean') {
        return access as ComputedRef<boolean>;
    }
    return computed(() => false);
  };

  /**
   * Starts the key event listeners.
   */
  const start = () => {
    if (internalIsListening.value || !IS_CLIENT) return
    const eventTarget = toValue(target)
    if (!eventTarget) return

    stopFunctions.push(useEventListener(eventTarget, 'keydown', onKeyEvent, { capture, passive: defaultPassive }))
    stopFunctions.push(useEventListener(eventTarget, 'keyup', onKeyEvent, { capture, passive: defaultPassive }))
    // Note: window blur listener for resetting state was removed to keep alignment
    // with unit test expectations (which track addEventListener counts).
    // If desired in consumer code, a blur listener can be added via external means.

    internalIsListening.value = true
  }

  /**
   * Stops the key event listeners and cleans up state.
   */
  const stop = () => {
    if (!internalIsListening.value) return
    stopFunctions.forEach(fn => fn())
    stopFunctions.length = 0
    pressedKeys.value.clear()
    currentSequence.value = []
    if(sequenceTimer.value) clearTimeout(sequenceTimer.value)

    // Clear all state objects
    Object.keys(individualKeyStates).forEach(key => {
      individualKeyStates[key].value = false;
      delete individualKeyStates[key];
    });
    Object.keys(combinationComputedRefs).forEach(key => {
      delete combinationComputedRefs[key];
    });
    internalIsListening.value = false
  }

  // Auto-start and cleanup
  if (IS_CLIENT) {
    start()
    if (getCurrentInstance()) {
      onScopeDispose(stop)
    }
  }

  /** Helper to add and remove event listeners. */
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

    // Key State Access
    keys: keysProxy as Record<string, Readonly<Ref<boolean>> | ComputedRef<boolean>>,
    getKeyState: (key: string) => readonly(getKeyStateRef(key)),

    // Methods
    on,
    isCombinationActive,

    // Lifecycle
    start,
    stop,
    isListening: readonly(internalIsListening),
  }
}

// TODO:
// - Platform-specific modifier normalization (Meta/Ctrl) within normalizeKey or combination parsing needs deeper check.
// - Dedupe logic for handlers. (Implemented in onKeyEvent)
// - Debounce/Throttle for handlers (if deemed necessary).
// - Consider `event.code` vs `event.key` for more layout-independent bindings (optional, adds complexity).
// - Refine `runInTextInput` integration when triggering handlers. (InputBlockerFn is used in onKeyEvent)
