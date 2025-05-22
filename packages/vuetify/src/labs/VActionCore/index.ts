// /*! IMPORTANT: This is a labs feature and may change or be removed in any release. */

// Public API for VActionCore

// Core classes, composables, and symbols (values)
export { ActionCore, useActionCore, destroyActionCoreInstance, ActionCoreSymbol } from './actionCore'
export { ShowSubItemsUISymbol } from './types' // Defined and exported in types.ts
export { useKeyBindings } from './useKeyBindings'

// All relevant types from types.ts (type-only exports)
export type {
  ActionDefinition,
  ActionContext,
  // ActionHandler, // Not directly exported
  ActionsSource,
  ActionCoreOptions,
  ActionCorePublicAPI,
  KeyBindingTrigger,
  KeyBindingInputBlockerFn,
  KeyBindingHandlerOptions,
  UseKeyBindingsOptions,
  KeyFilter,
  RunInTextInputMatcher,
  ActionProfileOverride,
  AIActionMetadata,
  AIActionExample,
  DiscoverableActionInfo,
} from './types'

// Export the generic log function from utils.ts
export { log } from './utils'

// Export all components from the components directory
export * from './components'

// Other utils - utils.ts does not export COMPONENT_NAME
// export { COMPONENT_NAME } from './utils' // Removed
