// /*! IMPORTANT: This is a labs feature and may change or be removed in any release. */

// Types and Symbols
// ActionCoreSymbol is defined in actionCore.ts alongside useActionCore for providing the instance.
// Public types are primarily from types.ts.
export type {
  ActionDefinition,
  ActionContext,
  ActionCoreOptions,
  ActionCorePublicAPI,
  KeyBindingTrigger,
  KeyBindingHandlerOptions,
  UseKeyBindingsOptions, // This is a KeyBinding related option type, often in types.ts or with useKeyBindings
  ActionsSource, // Also a core type from types.ts
  RunInTextInputMatcher, // from types.ts
  // ShowSubItemsUISymbol is an InjectionKey (a symbol), so it's a value, not just a type.
  // It will be exported as a value below. Its type can be inferred or imported if needed.
} from './types';

// Export ShowSubItemsUISymbol as a value
export { ShowSubItemsUISymbol } from './types';

// Main service composable and its symbol for injection
export { useActionCore, destroyActionCoreInstance, ActionCoreSymbol } from './actionCore';
// The ActionCore class itself might not need to be part of the public API if useActionCore is the sole entry point.

// Composables
// useKeyBindings is directly in action-core, not a subdirectory.
export { useKeyBindings } from './useKeyBindings';
// Types for useKeyBindings are usually co-located or in types.ts.
// UseKeyBindingsOptions is already listed from ./types.
// KeyBindingDeregisterHandle is not an explicitly exported type. The 'on' method returns () => void.
// export type { KeyBindingDeregisterHandle } from './useKeyBindings';

// Commandable composable for component integration
export { useCommandable } from './composables/useCommandable';
export type { UseCommandableProps } from './composables/useCommandable';

// UI Components
export * from './components';

// Platform utils (IS_MAC, etc.) are typically internal and not re-exported.
// Utility functions from utils.ts are also typically internal.
