export { useCommandCore, destroyCommandCoreInstance, CommandCoreSymbol } from './commandCore';
// CommandCoreOptions is now in types.ts
// export type { CommandCoreOptions } from './commandCore';
export type { CommandCoreOptions } from './types'; // CORRECTED: Export from types.ts

export { useKeyBindings } from './useKeyBindings';
export type {
  UseKeyBindingsOptions,
  KeyBindingInputBlockerFn,
  KeyFilter,
  KeyBindingHandlerOptions,
  KeyBindingTrigger
} from './types';

export type {
  ActionDefinition,
  ActionContext,
  ActionsSource,
  RunInTextInputMatcher
} from './types';

// Export platform utils if they are intended to be part of the public API from this module
// For now, IS_CLIENT and IS_MAC are primarily internal utils for useKeyBindings and commandCore init.
// If a user of the CommandCore lab feature needs them, they can be exported.
// export { IS_CLIENT, IS_MAC } from './platform';
