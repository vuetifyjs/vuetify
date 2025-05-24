# ActionCore Design Document

## This document captures the implementation design for ActionCore, a centralized system for managing actions, hotkeys, search providers, and application context within a Vuetify application.

## 1. Core Architecture

ActionCore is designed as a reactive global store and service, enabling components and other systems to register, manage, and execute actions, as well as leverage a unified search and command execution interface.

### 1.1. Key Principles
- **Centralized Management**: A single source of truth for actions and their states.
- **Reactivity**: Changes in actions, bindings, or context automatically propagate.
- **Extensibility**: Pluggable search providers and customizable action definitions.
- **Decoupling**: ActionCore can operate independently, but seamlessly integrates with components like `VCommandPalette` and `VHotKey`.
- **Vuetify Integration**: Follows Vuetify's composable and service patterns.

### 1.2. Main Components
ActionCore's architecture revolves around several key internal components:

1.  **Action Registry**: Manages the lifecycle of `ActionDefinition` objects.
2.  **Binding Manager**: Integrates with `useKeyBindings` to manage hotkey assignments and detect collisions.
3.  **Context Manager**: Holds and updates the global `ApplicationContext`.
4.  **Search Orchestrator**: Manages `SearchProvider` registration and coordinates search queries (primarily leveraged by `VCommandPalette`).

### 1.3. Dual Index System for Actions and Bindings

ActionCore maintains two primary indexes:

1.  **Action Index (Action Registry)**
    *   **Structure**: `Map<actionId: string, Reactive<ActionDefinition>>`
    *   **Purpose**: Provides O(1) lookup for action details by ID. Stores reactive `ActionDefinition` objects to allow dynamic updates to properties like `title`, `disabled`, `visible`, etc.
    *   **Updates**: Modified when actions are registered, unregistered, or their definitions are updated.

2.  **Binding Index (Managed by Binding Manager)**
    *   **Structure**: `Map<hotkeyString: string, actionId: string[]>` (LIFO bucket strategy)
    *   **Purpose**: Maps a normalized hotkey string (e.g., "ctrl+s") to an array of `actionId`s. The last action registered for a given hotkey is considered the active one (LIFO).
    *   **Integration**: The Binding Manager uses an instance of `useKeyBindings` internally to listen for and process key events based on this index.
    *   **Collision Resolution**: When a hotkey is triggered, the Binding Manager consults this index. If multiple `actionId`s are present, the LIFO rule applies. ActionCore emits warnings for collisions.

### 1.4. Core Data Structures

#### 1.4.1. ActionDefinition Interface
```typescript
interface ActionDefinition {
  id: string; // Unique identifier (required)
  title: string; // Display title (required)
  description?: string; // Optional description for display
  icon?: string; // Optional icon identifier (e.g., mdi icon string)
  category?: string; // Optional category for grouping in UIs like VCommandPalette
  priority?: number; // Optional priority for display ordering within category

  hotkey?: string; // Optional default hotkey binding string (e.g., "Ctrl+S")
                 // This is registered with the Binding Manager.

  disabled?: boolean | ((context: ActionContext) => boolean); // Optional disabled state or function
  visible?: boolean | ((context: ActionContext) => boolean);  // Optional visibility state or function
                 // Note: Functions receive full ActionContext including current ApplicationContext

  isNavigationAction?: boolean; // Optional flag to identify navigation-only actions
                               // Used by VCommandPalette to filter actions from ActionCore results

  // Handler function, receives full context. Can be sync or async.
  handler?: (context: ActionContext) => void | Promise<void>;

  // Input context control for hotkeys (via useKeyBindings options)
  runInTextInput?: boolean | ((element: HTMLElement) => boolean);

  // Event modification options for hotkeys (via useKeyBindings options)
  preventDefault?: boolean;
  stopPropagation?: boolean;

  // Nested actions or dynamic sub-item fetching for VCommandPalette
  subItems?: ActionDefinition[] | (() => Promise<ActionDefinition[]>);

  // Custom data for application-specific needs
  meta?: Record<string, any>;

  // Source component ID for lifecycle management
  componentId?: string;
}
```

#### 1.4.2. ActionContext Interface
Passed to action handlers, providing details about the execution trigger.
```typescript
interface ActionContext {
  trigger: 'keyboard' | 'ui' | 'programmatic' | 'search-result'; // How the action was invoked
  event?: KeyboardEvent | MouseEvent; // Original browser event, if applicable
  data?: any; // Additional arbitrary data passed during execution

  // Available when triggered via VCommandPalette from a search result
  searchResult?: SearchResult;

  // Current application context at the time of execution
  applicationContext: Readonly<ApplicationContext>;
}
```

#### 1.4.3. ApplicationContext Interface
Represents the global state of the application relevant to actions and search.
```typescript
interface ApplicationContext {
  view?: string; // Identifier for the current application view/page/route
  selectedItems?: any[]; // Array of currently selected items/entities
  currentUser?: { id: string, name: string, permissions: string[] }; // User information
  entityContext?: { [entityType: string]: any }; // Context of a specific entity (e.g., current project, open document)
  custom?: { [key: string]: any }; // Application-specific custom data
}
```

## 2. Binding Management (`BindingManager`)

The `BindingManager` is responsible for all hotkey-related functionality within ActionCore.

### 2.1. `useKeyBindings` Integration
-   The `BindingManager` instantiates and manages its own instance of `useKeyBindings`.
-   It transforms ActionCore's `Binding Index` (`hotkeyString -> actionId[]`) into a configuration object suitable for `useKeyBindings`.
    -   When a hotkey is pressed that matches an entry in `useKeyBindings`, the handler provided to `useKeyBindings` will look up the LIFO `actionId` from ActionCore's `Binding Index` and attempt to execute it.
-   **Global Target**: By default, `useKeyBindings` is configured to listen on `document` to capture global hotkeys.
-   **Options Forwarding**: `runInTextInput`, `preventDefault`, `stopPropagation` from `ActionDefinition` are passed as options to the respective bindings in `useKeyBindings`.
-   **Configuration**: Options like `sequenceTimeout`, `listenerOptions`, `detectCollisions`, and `debug` can be configured via `ActionCoreOptions` and are passed to the internal `useKeyBindings` instance.

### 2.2. Hotkey Registration and Unregistration
-   When an action with a `hotkey` property is registered with ActionCore, the `BindingManager` updates its internal `Binding Index` and subsequently updates the configuration passed to `useKeyBindings`.
-   If multiple actions are registered for the same hotkey, they are added to the LIFO bucket for that hotkey string. The `useKeyBindings` instance will only have one handler for that hotkey string, which then defers to ActionCore's LIFO logic to pick the actual action to execute.
-   When an action is unregistered, or its hotkey changes, the `BindingManager` updates its state and the `useKeyBindings` configuration.

### 2.3. Collision Detection
-   `useKeyBindings` provides utilities for detecting basic collisions (identical hotkey patterns).
-   ActionCore's `BindingManager` uses these utilities and its own `Binding Index` to report collisions, including which `actionId`s are involved.
-   **LIFO Resolution**: ActionCore enforces a LIFO (Last In, First Out) strategy for resolving hotkey collisions. The most recently registered action for a given hotkey takes precedence. Warnings are emitted for detected collisions.
-   **Sequence Conflicts**: The `BindingManager` also leverages `useKeyBindings` utilities to detect and warn about overlapping key sequences (e.g., "g-g" vs "g-g-g").

### 2.4. Binding Context System (User Customization)

ActionCore supports user-defined "Binding Contexts" that allow overriding default action properties, primarily hotkeys.

#### 2.4.1. Design Approach:
-   ActionCore maintains the base `ActionDefinition` (including the default `hotkey`).
-   A `BindingContext` is a named set of overrides. An override specifies an `actionId` and the new `hotkey` string.
    ```typescript
    interface BindingContextOverride {
      actionId: string;
      newHotkey: string | null; // null to unbind
    }
    interface BindingContextDefinition {
      name: string;
      overrides: BindingContextOverride[];
    }
    ```
-   ActionCore can have multiple `BindingContextDefinition`s registered.
-   An "active" `BindingContext` can be set globally.
-   When a `BindingContext` is active, the `BindingManager` computes the "effective hotkeys":
    1.  Start with default hotkeys from `ActionDefinition`.
    2.  Apply overrides from the active `BindingContext`.
    3.  This effective hotkey map is then used to configure `useKeyBindings`.
-   Changes to the active `BindingContext` trigger a re-evaluation of effective hotkeys and update `useKeyBindings`.

#### 2.4.2. Use Cases:
1.  **User-Customizable Hotkeys**: Users can define their own `BindingContext`.
2.  **Keyboard Layout Adaptation**: A `BindingContext` can remap hotkeys for Dvorak, AZERTY, etc. (though `useKeyBindings`'s `keyMappings` option is the primary mechanism for physical layout adaptation).
3.  **Mode-Specific Bindings**: Different modes of an application (e.g., "editing mode", "navigation mode") can activate different `BindingContexts`.
4.  **Accessibility Presets**: A context for simplified hotkeys or compatibility with screen readers.
5.  **Temporary Scoped Bindings**: For temporary hotkey bindings with defined scope (e.g., modal dialogs), a temporary `BindingContext` can be programmatically created, activated, and then deactivated/removed when the scope ends. This provides the scoped cleanup mechanism required for temporary bindings.

## 3. Action Lifecycle and Registration

### 3.1. Registration API
-   `actionCore.registerAction(definition: ActionDefinition): void`
-   `actionCore.registerActions(definitions: ActionDefinition[]): void`
    -   If an `actionId` already exists, the new definition replaces the old one (re-registration). Associated hotkeys are updated by first unregistering the old hotkey (if any), then registering the new hotkey (if provided).
    -   If `definition.hotkey` is provided, it's automatically registered with the `BindingManager`.

### 3.2. Unregistration API
-   `actionCore.unregisterAction(actionId: string): void`
-   `actionCore.unregisterActions(actionIds: string[]): void`
    -   Removes the action and any associated hotkey bindings.

### 3.3. Component-Based Lifecycle (`registerComponentActions`)
-   `actionCore.registerComponentActions(componentId: string, actions: ActionDefinition[]): void`
-   `actionCore.unregisterComponentActions(componentId: string): void`
    -   This allows actions to be tied to a component's lifecycle. `componentId` is a unique string identifying the owning component.
    -   Actions registered this way are internally tagged with the `componentId`.
    -   When `unregisterComponentActions(componentId)` is called (typically in `onBeforeUnmount`), all actions associated with that `componentId` are unregistered.
    -   This is useful for contextual actions that should only be available when a specific component is mounted.

### 3.4. Sequential Hotkey Assignment (`assignSequentialHotkeys`)
-   `actionCore.assignSequentialHotkeys(actions: ActionDefinition[], basePattern: string, count: number): void`
    -   Utility function for programmatically assigning sequential hotkeys (e.g., Alt+1 through Alt+9).
    -   Takes a base pattern like "Alt+{n}" where {n} is replaced with the sequence number.
    -   Updates the provided actions with the generated hotkey strings and registers/updates them.
    -   Useful for dynamic menus, toolbar items, or numbered options.

## 4. Action Execution

### 4.1. Programmatic Execution
-   `actionCore.executeAction(actionId: string, context?: Partial<ActionContext>): Promise<void>`
    -   Allows triggering an action by its ID.
    -   The provided `context` is merged with the current global `ApplicationContext` and passed to the handler.
    -   Checks `disabled` and `visible` states before execution.

### 4.2. Execution Flow
1.  Trigger (hotkey, UI click, programmatic call).
2.  ActionCore retrieves the `ActionDefinition` for the given `actionId`.
3.  **Visibility/Enabled Check**:
    -   Evaluates `action.visible` (if a function, call with current `ApplicationContext`). If not visible, stop.
    -   Evaluates `action.disabled` (if a function, call with current `ApplicationContext`). If disabled, stop.
4.  Construct `ActionContext`:
    -   `trigger`: based on invocation method.
    -   `event`: original browser event (if any).
    -   `applicationContext`: a readonly snapshot of the current global `ApplicationContext`.
    -   `data`, `searchResult`: as provided.
5.  Invoke `action.handler(fullContext)`.
6.  Handle `Promise` if handler is async.
7.  Catch and log errors from handlers. For programmatic execution via `executeAction()`, errors are logged and then re-thrown (wrapped in an ActionCoreError) so the caller can handle them. For hotkey-triggered execution, errors are only logged to prevent system crashes.

## 5. Application Context Management (`ContextManager`)

### 5.1. State Management
-   ActionCore maintains a single, global, reactive `ApplicationContext` object.
-   `actionCore.getContext(): Readonly<ApplicationContext>`
-   `actionCore.updateContext(updates: Partial<ApplicationContext>): void`
    -   Merges partial updates into the global context.
    -   This triggers reactivity for any consumers of the context (e.g., `visible`/`disabled` functions, search providers).

### 5.2. Context Update Strategies
-   Consumers (like `VCommandPalette` or dynamic action properties) can react to context changes.
-   `VCommandPalette` will re-query search providers when relevant parts of the `ApplicationContext` change (e.g., `view`, `selectedItems`). This can be debounced.

## 6. Search Provider System (Primarily for `VCommandPalette`)

ActionCore acts as a registry and source of context for search providers that `VCommandPalette` will use. While `VCommandPalette` handles the primary orchestration, ActionCore provides utility functions to assist with ordering and grouping when requested.

### 6.1. SearchProvider Interface
```typescript
interface SearchProvider {
  id: string; // Unique provider identifier

  // Performs the search. Receives query string and current application context.
  search(query: string, context: Readonly<ApplicationContext>): Promise<SearchResult[]>;

  // Optional: Generates dynamic ActionDefinitions based on a search result.
  // Useful for actions like "Open User Profile" for a user search result.
  getActions?(result: SearchResult, context: Readonly<ApplicationContext>): ActionDefinition[];

  // Static or context-dependent priority for ordering results from multiple providers.
  priority?: number | ((context: Readonly<ApplicationContext>) => number);

  timeout?: number; // Optional query timeout in ms for this provider.

  // Defines groups this provider can categorize its results into.
  groups?: SearchProviderGroupDefinition[];

  // For lifecycle management when registered by a component.
  componentId?: string;
}

interface SearchProviderGroupDefinition {
  id: string;         // Unique ID for this group within the provider
  title: string;      // Display title for the group
  priority?: number;   // Priority for ordering this group among others
  icon?: string;
  separator?: boolean; // Render a separator before this group
}

interface SearchResult {
  id: string;        // Unique ID for this result item
  title: string;     // Main display text
  description?: string; // Additional descriptive text
  icon?: string;      // Icon to display
  category?: string;  // Category (can be used for grouping if provider doesn't use explicit groups)
  type: string;      // e.g., 'user', 'issue', 'file', 'action-core-action'
  data: any;         // Provider-specific raw data for this result

  // Optional: ActionIDs from ActionCore that can be executed with this result.
  // VCommandPalette will use these to show executable actions.
  // These actions will receive this SearchResult in their ActionContext.
  actionIds?: string[];

  // Optional: Inline ActionDefinitions specific to this search result.
  // These are not registered globally in ActionCore but can be executed directly.
  // Useful for highly contextual, one-off actions.
  inlineActions?: ActionDefinition[];

  priority?: number;  // Fine-grained priority for this specific result.
  groupId?: string;   // ID of the SearchProviderGroupDefinition this result belongs to.
}
```

### 6.2. Search Provider Registration
-   `actionCore.registerSearchProvider(provider: SearchProvider): void`
-   `actionCore.unregisterSearchProvider(providerId: string): void`
-   `actionCore.unregisterSearchProvidersByComponent(componentId: string): void` (for lifecycle)
-   `actionCore.getActiveSearchProviders(): readonly SearchProvider[]`
    -   `VCommandPalette` uses this to get the list of providers to query.

### 6.3. `useContextualSearch` Composable (Helper for Components)
This helper composable simplifies registering/unregistering search providers tied to a component's lifecycle.
```typescript
// Example usage in a component:
// import { useContextualSearch, actionCore } from '@/actionCore'; // Assuming actionCore is injectable
//
// export default defineComponent({
//   setup() {
//     const currentIssueId = ref('issue-123');
//
//     useContextualSearch('issue-detail-page-search', [
//       {
//         id: 'issue-comments-provider',
//         search: async (query, context) => {
//           // Use context.entityContext?.issue?.id or currentIssueId.value
//           const issueId = context.entityContext?.activeIssueId ?? currentIssueId.value;
//           return searchCommentsInIssue(issueId, query);
//         },
//         priority: 10,
//       }
//     ]);
//
//     // ...
//   }
// });
```
- `useContextualSearch` internally calls `actionCore.registerSearchProvider` on mount (with `componentId`) and `actionCore.unregisterSearchProvidersByComponent` on unmount.

## 7. Dynamic Action Generation from Search Results

As seen in `SearchResult.actionIds` and `SearchResult.inlineActions`:
-   `actionIds`: `VCommandPalette` can look up these actions in ActionCore. When executed, the `SearchResult` data is passed in `ActionContext.searchResult`.
-   `inlineActions`: These are `ActionDefinition` objects directly provided by the search result. `VCommandPalette` can execute them directly. They are not registered in ActionCore's global registry. This is useful for actions that are highly specific to a single search result and don't need to be global.

## 8. Result Merging, Grouping, and Ordering (Concern of `VCommandPalette`)

While ActionCore provides actions and enables search providers, the responsibility of:
1.  Querying all search providers (and ActionCore actions if configured).
2.  Merging results.
3.  Applying sorting based on `priority` (provider, group, result).
4.  Grouping results (by `category` from ActionDefinition, or `groupId` from SearchResult referring to `SearchProviderGroupDefinition`).
... primarily lies with `VCommandPalette`. `VCommandPalette` will use the `resultOrdering` prop for this.

ActionCore's role is to provide the necessary data (`priority`, `category`, `groups` from providers) to enable `VCommandPalette` to do this effectively.

## 9. Public API (`ActionCoreInstance`)

```typescript
interface ActionCoreInstance {
  // Action Management
  registerAction(definition: ActionDefinition): void;
  registerActions(definitions: ActionDefinition[]): void;
  unregisterAction(actionId: string): void;
  unregisterActions(actionIds: string[]): void;
  getAction(actionId: string): Readonly<ActionDefinition> | undefined;
  getAllActions(): readonly Readonly<ActionDefinition>[]; // All registered, regardless of visibility/disabled
  getVisibleActions(context?: Readonly<ApplicationContext>): readonly Readonly<ActionDefinition>[]; // Filtered by visible state

  // Component Lifecycle Action Management
  registerComponentActions(componentId: string, actions: ActionDefinition[]): void;
  unregisterComponentActions(componentId: string): void;

  // Sequential Hotkey Assignment
  assignSequentialHotkeys(actions: ActionDefinition[], basePattern: string, count: number): void;

  // Action Execution
  executeAction(actionId: string, context?: Partial<ActionContext>): Promise<void>;

  // Hotkey & Binding Management
  getEffectiveHotkey(actionId: string, activeContextName?: string): string | undefined; // Considers active BindingContext, falls back to globally set active context if activeContextName not provided
  getHotkeyCollisions(): CollisionReport[]; // From useKeyBindings, adapted with actionIds

  // Binding Contexts
  registerBindingContext(contextDef: BindingContextDefinition): void;
  unregisterBindingContext(contextName: string): void; // For temporary contexts
  setActiveBindingContext(contextName: string | null): void;
  getActiveBindingContextName(): string | null;
  getAllBindingContexts(): readonly Readonly<BindingContextDefinition>[];

  // Application Context
  getContext(): Readonly<ApplicationContext>;
  updateContext(updates: Partial<ApplicationContext>): void;
  subscribeToContextUpdates(callback: (context: Readonly<ApplicationContext>) => void): () => void; // Returns unsubscribe function

  // Search Providers (for VCommandPalette)
  registerSearchProvider(provider: SearchProvider): void;
  unregisterSearchProvider(providerId: string): void;
  unregisterSearchProvidersByComponent(componentId: string): void;
  getActiveSearchProviders(): readonly Readonly<SearchProvider>[];

  // Search Provider Utilities (helper functions for VCommandPalette)
  getOrderedSearchProviders(context?: Readonly<ApplicationContext>): readonly Readonly<SearchProvider>[]; // Returns providers sorted by priority/context
  getSearchProviderGroups(providerId: string): readonly SearchProviderGroupDefinition[]; // Returns groups for a specific provider

  // Debugging & Data Export
  exportRegistryState(): { actions: ActionDefinition[], bindings: Record<string, string[]>, bindingContexts: BindingContextDefinition[] }; // Primarily for development/debugging

  // Vuetify Plugin Install
  install: (app: App) => void;
}
```

## 10. Vuetify Integration

### 10.1. Service Pattern
-   **Symbol**: `ActionCoreSymbol: InjectionKey<ActionCoreInstance>`
-   **Creation**: `createActionCore(options?: ActionCoreOptions): ActionCoreInstance & { install: (app: App) => void }`
-   **Injection**: `useActionCore(): ActionCoreInstance`
-   **Plugin**: `app.use(createActionCore(config))` registers the service.

#### 10.1.1. ActionCoreOptions Interface
```typescript
interface ActionCoreOptions {
  // useKeyBindings configuration options
  sequenceTimeout?: number;
  listenerOptions?: AddEventListenerOptions;
  detectCollisions?: boolean;
  debug?: boolean;

  // Default binding context
  defaultBindingContext?: string;

  // Global action defaults
  actionDefaults?: Partial<ActionDefinition>;
}
```

### 10.2. Defaults System
-   ActionCore can be configured with global defaults via Vuetify's defaults system (e.g., default `runInTextInput` for all actions).
    ```typescript
    // vuetify.js
    createVuetify({
      defaults: {
        ActionCore: { // Global defaults for ActionCore itself (e.g., default binding context name)
          defaultBindingContext: 'user-custom',
        },
        ActionDefinition: { // Defaults for all registered actions
          preventDefault: true,
          runInTextInput: false,
        }
      }
    })
    ```
-   When actions are registered, they merge with these global `ActionDefinition` defaults using the strategy: Vuetify defaults < ActionCore options actionDefaults < specific action definition properties (specific properties take precedence).

## 11. Error Handling
-   **Action Handler Errors**: Caught by ActionCore during `executeAction`. Logged with context (actionId, trigger). For programmatic execution, errors are re-thrown; for hotkey execution, only logged to prevent crashes.
-   **Search Provider Errors**: `VCommandPalette` (as the search orchestrator) should handle errors from individual providers (e.g., timeouts, network errors) gracefully, potentially showing partial results or error messages per provider.
-   **Configuration Errors**: Specific, actionable warnings including:
    -   "ActionID 'foo' already exists when registering action 'bar'. Previous action will be replaced."
    -   "ActionID 'xyz' not found when trying to execute."
    -   "Hotkey collision for 'Ctrl+S' between Action 'saveFile' and Action 'submitForm'. Last registered action takes precedence."
    -   "Invalid hotkey pattern 'Ctrl++' for action 'invalid-action'."
    -   "BindingContext 'custom-context' references unknown actionId 'missing-action'."
-   **Development vs. Production**: Warnings follow Vuetify conventions - detailed in development, suppressed or minimal in production.

## 12. Performance Considerations
-   **Reactive Updates**: Fine-grained reactivity for action properties, context changes.
-   **Debouncing**: Context updates triggering search re-queries in `VCommandPalette` should be debounced.
-   **Caching**:
    -   `useKeyBindings` handles parsed hotkey pattern caching.
    -   `VCommandPalette` might implement caching for search results based on query and context, if necessary.
-   **Large Datasets**: `VCommandPalette` relies on `useVirtual` for displaying large lists of actions/results. Search providers are responsible for their own performance when querying large data sources.

This design provides a comprehensive framework for ActionCore. Next steps would involve detailing specific algorithms for areas like effective hotkey computation with binding contexts and the interaction logic within `VCommandPalette`'s search orchestration.
