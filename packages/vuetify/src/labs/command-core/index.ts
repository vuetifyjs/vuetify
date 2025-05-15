export { useCommandCore, destroyCommandCoreInstance, CommandCoreSymbol } from './commandCore';
// CommandCoreOptions is now in types.ts
// export type { CommandCoreOptions } from './commandCore';
export type { CommandCoreOptions } from './types'; // Correct: CommandCoreOptions is defined in types.ts

export { useKeyBindings } from './useKeyBindings';
export type {
  UseKeyBindingsOptions,
  KeyBindingInputBlockerFn,
  KeyFilter,
  KeyBindingHandlerOptions,
  KeyBindingTrigger,
  ActionDefinition,
  ActionContext,
  ActionsSource,
  RunInTextInputMatcher,
  CommandCorePublicAPI // Ensure CommandCorePublicAPI is exported here
} from './types';

// Platform utils (IS_CLIENT, IS_MAC) are primarily for internal use.
// export { IS_CLIENT, IS_MAC } from './platform';

// Export new useCommandable composable
export { useCommandable } from './composables/useCommandable';

// Also export UseCommandableProps from where it's defined if not in types.ts
// If UseCommandableProps is defined in useCommandable.ts, it needs a separate export line:
export type { UseCommandableProps } from './composables/useCommandable';
