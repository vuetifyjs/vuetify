import type { Ref, ComputedRef } from 'vue'

// -------------- KeyBinding Types --------------

/** Function to determine if keybindings should be active based on the currently focused element. */
export type KeyBindingInputBlockerFn = (element: Element | null) => 'allow' | 'deny' | 'named';

export interface UseKeyBindingsOptions {
  /** Target element or window to attach listeners to. */
  target?: Window | HTMLElement | EventTarget | Ref<Window | HTMLElement | EventTarget | undefined>;
  /** Map of key aliases for normalizing key names. */
  aliasMap?: Record<string, string>;
  /** Duration in milliseconds to wait before clearing a key sequence. */
  sequenceTimeoutDuration?: number;
  /** Function to determine if key events should be blocked based on the active element. */
  inputBlockerFn?: KeyBindingInputBlockerFn;
  /** Whether to capture events in the capturing phase. */
  capture?: boolean;
  /** Whether events are passive (don't call preventDefault). */
  passive?: boolean;
  /** Whether to prefer event.code (layout-independent) over event.key for key identification. */
  preferEventCode?: boolean;
}

/** Type for a key filter when registering a handler */
export type KeyFilter = Set<string> | ((event: KeyboardEvent) => boolean);

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
  ignoreKeyRepeat?: boolean
  /** If true, this specific binding will ignore the result of `inputBlockerFn` (default: false) */
  ignoreInputBlocker?: boolean;
  /** If true, listener will be passive (default: from UseKeyBindingsOptions or false) */
  passive?: boolean
}

export type KeyBindingTrigger = string | string[] | ((event: KeyboardEvent) => boolean);

// -------------- ActionCore Action Types (derived from scratch/src/types/action.types.ts) --------------

/** Context passed to action handlers and canExecute checks. */
export interface ActionContext {
  /** The trigger for the action (e.g., 'hotkey-combination', 'hotkey-sequence', 'palette', 'component-click'). */
  trigger?: 'hotkey' | 'palette' | 'programmatic' | 'notification' | 'ai_assistant' | string;
  /** The original DOM event if the action was triggered by one. */
  event?: Event;
  /** Arbitrary data, e.g., from palette, notification, or programmatic call */
  data?: any;
}

/** Defines how a hotkey should behave regarding text input elements. */
export type RunInTextInputMatcher = string | string[] | ((element: Element | null) => boolean);

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
  keywords?: string | string[]
  /** The function to execute when the action is triggered. */
  handler?: (context: T) => void | Promise<void>
  /**
   * Hotkey definition.
   * Can be a string (e.g., "ctrl+s, command+s", "g d")
   * or an array of key sequences (e.g., [['g', 'd'], ['c', 'o', 'n', 'f', 'i', 'g']]).
   */
  hotkey?: string | string[]
  /**
   * Options for the hotkey binding, like preventDefault.
   * These would be passed to useKeyBindings.
   */
  hotkeyOptions?: {
    preventDefault?: boolean;
    stopPropagation?: boolean;
    ignoreKeyRepeat?: boolean;
    // Note: 'passive' could also be added if needed.
  };
  /**
   * Determines if the hotkey can be triggered when a text input is focused.
   * - `true`: Hotkey explicitly configured to run even when inputs are focused (overrides default blocking for non-input hotkeys).
   * - `false`: Hotkey explicitly configured to NOT run when inputs are focused.
   * - `'only'`: Hotkey only runs if a text input is focused.
   * - `string | string[]`: Hotkey only runs if focused input's `name` attribute matches (implies input focus).
   * - `function`: Custom predicate `(element: Element | null) => boolean` (implies input focus if element is an input).
   * - `undefined` (default): Behavior depends on the nature of the hotkey and default input blocking. For ActionCore, if undefined, it means the hotkey is subject to normal input blocking unless it's a known text editing shortcut.
   */
  runInTextInput?: boolean | 'only' | RunInTextInputMatcher;
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
  /** Optional description for the action */
  description?: string
  /** Optional group name for display in UI like command palettes. */
  group?: string
}

/** Represents a source of actions for the ActionCore store. */
export type ActionsSource =
  | ActionDefinition[]
  | Ref<ActionDefinition[]>
  | (() => ActionDefinition[] | Promise<ActionDefinition[]>);

/**
 * Configuration options for initializing a ActionCore instance.
 */
export interface ActionCoreOptions {
  /**
   * Controls whether Vuetify components (like VBtn, VListItem) integrate their `command` prop.
   * If `true`, all supported components attempt integration.
   * If an object, specifies per-component opt-in (e.g., `{ VBtn: true }`).
   * Defaults to `false` if not specified by the user, meaning no automatic component integration.
   */
  componentIntegration?: boolean | Record<string, boolean>;
  // Add any other future global ActionCore options here
}

/**
 * Defines the public API of the ActionCore service.
 */
export interface ActionCorePublicAPI {
  /** Reactive state indicating if any action is currently being executed. */
  readonly isLoading: Readonly<Ref<boolean>>;
  /** Computed property that aggregates all valid actions from all registered sources. */
  readonly allActions: ComputedRef<Readonly<ActionDefinition<any>[]>>;

  /** Registers a new source of actions. */
  registerActionsSource(source: ActionsSource): symbol;
  /** Unregisters an existing action source. */
  unregisterActionsSource(key: symbol): boolean;
  /** Retrieves a specific action definition by its ID. */
  getAction(actionId: string): ActionDefinition<any> | undefined;
  /** Executes a registered action by its ID. */
  executeAction(actionId: string, invocationContext?: ActionContext): Promise<void>;
  /** Checks if component integration is enabled for a specific component name. */
  isComponentIntegrationEnabled(componentName: string): boolean;
  /** Cleans up the ActionCore instance. */
  destroy(): void;
}
