// /*! IMPORTANT: This is a labs feature and may change or be removed in any release. */

// Types and Symbols
// CommandCoreSymbol is defined in commandCore.ts alongside useCommandCore for providing the instance.
// Public types are primarily from types.ts.
export type {
  ActionDefinition,
  ActionContext,
  CommandCoreOptions,
  CommandCorePublicAPI,
  KeyBindingTrigger,
  KeyBindingHandlerOptions,
  UseKeyBindingsOptions, // This is a KeyBinding related option type, often in types.ts or with useKeyBindings
  ActionsSource, // Also a core type from types.ts
  RunInTextInputMatcher // from types.ts
  // Add any other specific public types from types.ts that clients might need.
} from './types';

// Main service composable and its symbol for injection
export { useCommandCore, destroyCommandCoreInstance, CommandCoreSymbol } from './commandCore';
// The CommandCore class itself might not need to be part of the public API if useCommandCore is the sole entry point.

// Composables
// useKeyBindings is directly in command-core, not a subdirectory.
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