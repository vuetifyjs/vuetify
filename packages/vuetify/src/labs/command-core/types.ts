import type { Ref } from 'vue'

// -------------- KeyBinding Types --------------

/** Function to determine if keybindings should be active based on the currently focused element. */
export type KeyBindingInputBlockerFn = (element: Element | null) => 'allow' | 'deny' | 'named';

export interface UseKeyBindingsOptions {
  /** Event target for listeners (default: window) */
  target?: EventTarget | Ref<EventTarget | null | undefined>
  /** Map for aliasing key names (e.g., { 'command': 'meta' }) */
  aliasMap?: Record<string, string>
  /** Timeout in ms for detecting key sequences (default: 1500) */
  sequenceTimeoutDuration?: number
  /**
   * Function to check if keybindings should be blocked based on the active element.
   * Default allows if not an input/textarea/select or contenteditable.
   */
  inputBlockerFn?: KeyBindingInputBlockerFn
  /** Whether to capture events (default: false) */
  capture?: boolean
  /** Initial passive option for event listeners (default: undefined, decided by browser or specific bindings) */
  passive?: boolean
}

/** Type for a key filter when registering a handler */
export type KeyFilter = string | string[] | ((event: KeyboardEvent) => boolean)

/** Options for a specific key binding handler */
export interface KeyBindingHandlerOptions {
  /** Type of event to listen for (default: 'keydown') */
  eventName?: 'keydown' | 'keyup'
  /** Prevent default behavior of the event (default: false) */
  preventDefault?: boolean
  /** Stop propagation of the event (default: false) */
  stopPropagation?: boolean
  /** Debounce the handler call in ms (default: 0). If > 0, handler is debounced. */
  debounce?: number
  /** Throttle the handler call in ms (default: 0). If > 0, handler is throttled. Debounce takes precedence. */
  throttle?: number
  /** For sequence triggers, specific timeout for this sequence (overrides global) */
  sequenceTimeout?: number
  /** Ignore repeated events when key is held down (default: false) - primarily for 'keydown' */
  dedupe?: boolean
  /** If true, listener will be passive (default: from UseKeyBindingsOptions or false) */
  passive?: boolean
  /** If true, this specific binding will ignore the result of `inputBlockerFn` (default: false) */
  ignoreInputBlocker?: boolean;
}

export type KeyBindingTrigger = KeyFilter | string // string for combination like 'ctrl+s' or sequence like 'a-b-c'

// -------------- CommandCore Action Types (derived from scratch/src/types/action.types.ts) --------------

/** Context passed to action handlers and canExecute checks. */
export interface ActionContext extends Record<string, any> {
  /** The trigger for the action (e.g., 'hotkey-combination', 'hotkey-sequence', 'palette', 'component-click'). */
  trigger?: string
  /** The original DOM event if the action was triggered by one. */
  event?: Event
}

/** Defines how a hotkey should behave regarding text input elements. */
export type RunInTextInputMatcher = boolean | 'only' | string | string[] | ((element: Element) => boolean)

export interface ActionDefinition<T extends ActionContext = ActionContext> {
  /** Unique identifier for the action. */
  id: string
  /** Title of the action, displayed in UI. Can be a string or a Ref for reactivity. */
  title: string | Ref<string>
  /** Optional subtitle or description. */
  subtitle?: string | Ref<string>
  /** Icon to display next to the action. */
  icon?: string | Ref<string> // Could be a string for icon font class, or a component
  /** Keywords for searching the action in a command palette. */
  keywords?: string[] | Ref<string[]>
  /** The function to execute when the action is triggered. */
  handler?: (context: T) => void | Promise<void>
  /**
   * Hotkey definition.
   * Can be a string (e.g., "ctrl+s, command+s", "g d")
   * or an array of key sequences (e.g., [['g', 'd'], ['c', 'o', 'n', 'f', 'i', 'g']]).
   */
  hotkey?: string | string[]
  /**
   * Determines if the hotkey can be triggered when a text input is focused.
   * - `true` (default): Hotkey runs everywhere.
   * - `false`: Hotkey does not run if a text input is focused.
   * - `'only'`: Hotkey only runs if a text input is focused.
   * - `string | string[]`: Hotkey only runs if focused input's `name` attribute matches.
   * - `function`: Custom predicate `(element: Element) => boolean`.
   */
  runInTextInput?: RunInTextInputMatcher
  /** Optional function to determine if the action can be executed. */
  canExecute?: (context: T) => boolean
  /** If this action represents a group, this function should return its sub-items. */
  subItems?: (context: T) => ActionDefinition<T>[] | Promise<ActionDefinition<T>[]>
  /** Custom data associated with the action. */
  meta?: Record<string, any>
  /** Order for sorting, lower numbers come first. */
  order?: number
  /** If true, the action is considered disabled and won't be executable or shown as enabled. */
  disabled?: boolean | Ref<boolean>
}

/** Represents a source of actions for the CommandCore store. */
export type ActionsSource =
  | Ref<Readonly<ActionDefinition<any>[]>>
  | Readonly<ActionDefinition<any>[]>
  | (() => Readonly<ActionDefinition<any>[]>)
  | (() => Promise<Readonly<ActionDefinition<any>[]>>);
