# Design Requirements for actionCore

## This was authored by Matthew Ary and is the primary source of truth for actionCore. All code, tests, documentation and derived works cannot supersede the contents of this file.

actionCore (working title) is a collection of composables that provides a way to manage actions in a Vuetify application. It collectively is a global store that is used to manage registration of actions, and their hotkey bindings. It is the default way to manage actions in Vuetify's command palette. It's design allows the listed and searchable items in VCommandPalette to be context aware. When I say Context Aware, I mean that the listed and searchable items in VCommandPalette can be aware of the current context of the application, and can display different content based on the current context. For example, if the user is in a specific page, the listed and searchable items in VCommandPalette can display different content in different orders or groups based on the current page. This is done by allowing the developer to register actions when a component is mounted, and unregister them when the component is unmounted.

## Requirements

### Action Management

- **Action Registration**
  - The system SHALL provide a method to register actions with unique identifiers.
  - Each action SHALL have a required `id` property that uniquely identifies it within the system.
  - Each action SHALL have a required `title` property for display purposes.
  - Actions MAY have optional properties including `description`, `icon`, `group`, `hotkey`, `disabled`, `visible`, `keywords`, and `priority`.
  - Actions SHALL support a `keywords` property of type string array for enhanced search capabilities including synonyms, aliases, and alternative terms.
  - When an action with a `hotkey` property is registered, the system SHALL automatically register the hotkey binding in the binding index.
  - The system SHALL reject registration of actions with duplicate IDs and emit a warning.
  - The system SHALL allow re-registration of an action with the same ID, replacing the previous definition and updating any associated hotkey bindings.

- **Action Unregistration**
  - The system SHALL provide a method to unregister actions by their unique identifier.
  - Unregistering a non-existent action SHALL NOT cause an error but MAY emit a warning.
  - The system SHALL automatically clean up all associated hotkey bindings when an action is unregistered.

- **Action Lifecycle**
  - The system SHALL support automatic registration of actions originating from a Vue Component when the component is mounted.
  - The system SHALL support automatic unregistration of actions originating from a Vue Component when the component is unmounted.
  - The system SHALL provide lifecycle hooks that allow actions to be registered and unregistered reactively based on application state.
  - The system SHALL provide a method to register and unregister actions outside of a Vue Component and their lifecycle hooks.

### Group Management System

- **Group Registration**
  - The system SHALL provide methods to register and unregister group definitions.
  - Each group SHALL have a required `id` property that uniquely identifies it within the system.
  - Each group SHALL have an optional `title` property for display purposes.
  - Groups SHALL have optional properties including `priority`, `icon`, `separatorStart`, and `separatorEnd`.
  - The `separatorStart` and `separatorEnd` properties SHALL control whether HR separator tags are rendered before and/or after the group.
  - The system SHALL provide methods to register single groups and arrays of groups.
  - The system SHALL provide a method to retrieve all registered groups.

- **Action Group Assignment**
  - Actions SHALL reference groups using the `group` property that corresponds to a registered group ID.
  - Actions MAY be registered without a group assignment (ungrouped actions).
  - The system SHALL validate that action group references correspond to registered groups and emit warnings for invalid references.
  - The system SHALL allow actions to be assigned to groups that are registered after the action registration.

- **Group Ordering and Display**
  - Groups SHALL be ordered by their `priority` property, with lower numbers appearing first.
  - Actions within groups SHALL be ordered by their `priority` property, with lower numbers appearing first.
  - Ungrouped actions SHALL have a default priority for ordering relative to grouped actions.
  - The system SHALL provide utilities for UI components to retrieve ordered groups and actions for display.

### Action Middleware System

- **Middleware Registration**
  - The system SHALL provide methods to register and unregister action middleware.
  - Each middleware SHALL have a required `name` property that uniquely identifies it within the system.
  - Middleware SHALL support optional `beforeExecute`, `afterExecute`, and `onError` hooks.
  - The system SHALL execute middleware in registration order for before hooks and reverse order for after hooks.

- **Middleware Execution**
  - The `beforeExecute` hook SHALL receive the action definition and execution context and MAY return a modified context or false to prevent execution.
  - The `afterExecute` hook SHALL receive the action definition, execution context, and execution result for post-execution processing.
  - The `onError` hook SHALL receive the action definition, execution context, and error for error handling and logging.
  - Middleware execution SHALL NOT prevent other middleware from running unless explicitly designed to do so.

- **Middleware Use Cases**
  - Middleware SHALL enable developers to implement analytics tracking, logging, permission checks, and execution monitoring.
  - Middleware SHALL provide hooks for custom behavior injection without modifying action definitions.

### Action Execution and Context

- **Context-Aware Execution**
  - Actions SHALL be able to receive execution context data when triggered.
  - The system SHALL support passing dynamic context information to action handlers at execution time.
  - Actions SHALL be able to access application state and selected items or other contextual data during execution.

- **Programmatic Action Triggering**
  - The system SHALL provide methods to programmatically trigger actions by their ID.
  - Programmatic triggering SHALL support passing context data to the action handler.
  - The system SHALL validate that actions are available and enabled before allowing programmatic execution.
  - Programmatic triggering SHALL respect the same execution rules as keyboard or UI-triggered actions.

- **Action Handler Interface**
  - Action handlers SHALL receive a standardized context object containing execution information.
  - The context object SHALL include information about how the action was triggered (keyboard, UI click, programmatic, etc.).
  - Action handlers SHALL be able to return results or throw errors that can be handled by the calling system.
  - The system SHALL support both synchronous and asynchronous action handlers.

- **Usage Tracking and Analytics**
  - The system SHALL provide hooks for developers to track action execution, timing, and usage patterns.
  - The system SHALL support optional callback functions for action execution events including start, completion, and error states.
  - Usage tracking SHALL be opt-in and configurable by developers to implement their own analytics and learning systems.
  - The system SHALL provide execution duration information to tracking callbacks.

### Hotkey Management

- **Hotkey Binding**
  - The system SHALL support binding keyboard shortcuts to registered actions.
  - Hotkey strings SHALL follow the standardized format defined by the useKeyBindings composable.
  - The system SHALL validate hotkey string formats using validation logic from useKeyBindings.
  - The system SHALL support hotkey sequences (multiple keys pressed in order) in addition to combinations (keys pressed simultaneously) as defined by useKeyBindings.

- **Dynamic Hotkey Assignment**
  - The system SHALL support programmatic assignment of temporary hotkey bindings.
  - Temporary hotkey bindings SHALL have a defined scope and SHALL be automatically cleaned up when the scope ends.
  - The system SHALL support contextual hotkey bindings that are only active under specific conditions.
  - Dynamic hotkey assignments SHALL NOT conflict with permanent bindings and SHALL emit warnings if conflicts are detected.
  - The system SHALL provide methods to assign sequential hotkeys to a list of actions (e.g., Alt+1 through Alt+9).

- **Hotkey Execution**
  - The system SHALL execute the associated action when a bound hotkey is triggered.
  - The system SHALL respect action execution context and prevent execution of disabled or hidden actions.
  - The system SHALL provide options to control whether hotkeys execute in text input fields.
  - The system SHALL provide options to prevent default browser behavior when hotkeys are triggered.

- **Hotkey Conflicts**
  - The system SHALL detect and handle conflicting hotkey bindings.
  - When conflicts are detected, the system SHALL emit warnings and allow the most recently registered action to take precedence.
  - The system SHALL provide methods to query for conflicting hotkeys.

### Search Enhancement

- **Action Search Utilities**
  - The system SHALL provide utilities to search and filter actions within its own registry.
  - The system SHALL support searching action titles, descriptions, and keywords.
  - Search utilities SHALL enable matching of synonyms, aliases, and alternative terms through the keywords property.
  - The system SHALL provide efficient search methods that can be used by UI components like VCommandPalette.
  - Search utilities SHALL support context-aware filtering based on action visibility and enabled state.

- **Swappable Search Algorithm**
  - The system SHALL support custom search algorithm implementations for searching its own action registry.
  - Custom search algorithms SHALL receive the search query, action list, and application context.
  - Custom search algorithms SHALL return filtered and ordered action results according to their own logic.
  - The system SHALL provide a default search algorithm that efficiently handles title, description, and keyword matching.
  - Custom search algorithms SHALL be configurable during ActionCore initialization through ActionCoreOptions.
  - The system SHALL use the configured search algorithm for all internal action searching operations.

- **Search Algorithm Interface**
  - Custom search algorithms SHALL implement the ActionSearchAlgorithm interface.
  - The interface SHALL define a search method that receives: query string, action array, and application context.
  - The search method SHALL return an array of filtered and ordered ActionDefinition objects.
  - Custom algorithms SHALL handle empty queries, null contexts, and edge cases gracefully.
  - The system SHALL provide TypeScript interfaces for strong typing of custom search implementations.

- **Search Provider Integration**
  - The system SHALL support pluggable search providers that can query external data sources.
  - Search providers SHALL be able to return results that integrate seamlessly with action results in UI components.
  - The system SHALL support search provider registration and lifecycle management.
  - Search providers SHALL support context-aware result ordering and filtering.
  - The system SHALL act as a registry for search providers but SHALL NOT orchestrate search execution across providers.

### Context Awareness

- **Dynamic Action Availability**
  - Actions SHALL be able to specify conditions under which they are visible or enabled.
  - The system SHALL evaluate action visibility and enabled state reactively based on application context.
  - The system SHALL support context-based filtering of actions for display in command palettes or other interfaces.

- **Action Grouping and Ordering**
  - Actions MAY specify category or group information for organizational purposes.
  - The system SHALL support custom sorting and grouping logic for action display.
  - The system SHALL allow actions to specify priority or order hints for display ordering.

### Global State Management

- **Centralized Store**
  - The system SHALL maintain a centralized, reactive store of all registered actions.
  - The store SHALL be accessible globally throughout the Vuetify application.
  - Changes to the action store SHALL trigger reactive updates in dependent components.

- **State Queries**
  - The system SHALL provide methods to query registered actions by ID, category, or other criteria.
  - The system SHALL provide methods to get all currently available actions.
  - The system SHALL provide reactive computed properties that update when the action store changes.

### Integration and API

- **Component Integration**
  - The system SHALL provide a public API for integration with VCommandPalette.
  - The system SHALL provide a public API for integration with VHotKey and other display components.
  - The system SHALL expose methods for retrieving effective hotkey bindings for display purposes.
  - The system SHALL provide a method to query action definitions by ID.
  - The system SHALL provide methods to retrieve all registered actions and filtered action lists.
  - The system SHALL provide methods for programmatic action execution with context data.
  - The system SHALL provide methods to query all registered actions regardless of visibility state for debugging purposes.
  - The system SHALL provide methods to retrieve complete hotkey binding data for all actions for hotkey map display.
  - The system SHALL provide utilities to export action and hotkey data in formats suitable for debugging tools and documentation.

- **Vuetify Service Integration**
  - The system SHALL follow Vuetify's service pattern using injection/provide with a Symbol-based injection key.
  - The system SHALL integrate with Vuetify's installation and initialization patterns.
  - The system SHALL support Vuetify plugin installation through `app.use()`.
  - The system SHALL integrate with Vuetify's defaults system for action default properties.
  - The system SHALL provide proper TypeScript interfaces for all public APIs.
  - The system SHALL follow Vuetify's error handling and warning patterns (development vs production).

- **Component Action Registration**
  - The system SHALL provide methods for components to register temporary actions.
  - Component actions SHALL be automatically unregistered when components are destroyed or unmounted.
  - The system SHALL provide methods to distinguish between user actions and component-internal actions.

- **Key Binding Data Collection**
  - The system SHALL use useKeyBindings composable to manage its own hotkey bindings.
  - The system SHALL support multiple useKeyBindings instances for different binding contexts.
  - The system SHALL properly coordinate with useKeyBindings for collision detection and resolution.

- **Collision Detection and Resolution**
  - The system SHALL detect collisions when multiple actions are bound to the same hotkey combination.
  - The system SHALL use a LIFO (Last In, First Out) strategy for resolving hotkey collisions.
  - The system SHALL emit warnings when hotkey collisions are detected.
  - The system SHALL provide utilities to query collision status for specific hotkeys.
  - The system SHALL provide methods to query which actions are affected by collisions.

- **UI Component Binding**
  - The system SHALL provide utilities for UI components to bind to and trigger actions.
  - UI components SHALL be able to query action state (enabled, disabled, visible, available) reactively.
  - The system SHALL provide composables that allow UI components to automatically update based on action state changes.
  - UI components SHALL be able to trigger actions and receive execution results or error feedback.
  - The system SHALL support binding multiple UI elements (buttons, menu items, etc.) to the same action for DRY principles.

- **Composable Interface**
  - The system SHALL be implemented as Vue 3 composables for optimal integration with the Composition API.
  - The system SHALL provide typed interfaces for all public methods and properties.
  - The system SHALL be tree-shakeable to support optimal bundle sizes.

### User Customization and Binding Contexts

- **Binding Context System**
  - The system SHALL support user-defined binding contexts that can override default action properties.
  - Binding contexts SHALL be able to modify hotkey bindings, visibility, enabled state, and other action properties.
  - The system SHALL support activation of different binding contexts to change the effective action configuration.
  - Binding context changes SHALL be applied reactively and immediately affect action behavior.
  - The system SHALL support multiple use cases including user-customizable hotkey bindings, keyboard layout adaptation, context-dependent binding sets, and accessibility compliance modes.

- **Hotkey Customization**
  - Users SHALL be able to override default hotkey bindings through the binding context system.
  - The system SHALL validate custom hotkey bindings and prevent invalid configurations.
  - Custom hotkey bindings SHALL take precedence over default bindings when a binding context is active.
  - The system SHALL support temporary binding contexts that can be activated and deactivated dynamically.

- **Change Notification**
  - The system SHALL provide reactive notifications when binding contexts are changed.
  - Components and useKeyBindings instances SHALL automatically receive updates when effective bindings change.
  - The system SHALL provide methods to query the currently active binding context.
  - Binding context changes SHALL trigger re-evaluation of collision detection and hotkey effectiveness.

### Initialization and Lifecycle

- **System Initialization**
  - The system SHALL provide a clear initialization method that sets up the global action store.
  - The system SHALL be designed to work with Vue 3's provide/inject pattern for dependency injection.
  - Initialization SHALL be required before any action registration or hotkey binding can occur.
  - The system SHALL accept ActionCoreOptions during initialization to configure system behavior.

- **ActionCoreOptions Interface**
  - The system SHALL accept a `searchAlgorithm` option that allows custom search algorithm implementations for searching actions within ActionCore's registry.
  - The system SHALL accept configuration options for useKeyBindings integration including `sequenceTimeout`, `listenerOptions`, `detectCollisions`, and `debug`.
  - The system SHALL accept a `defaultBindingContext` option to specify the initial binding context.
  - The system SHALL accept `actionDefaults` to provide default properties for all registered actions.
  - All options SHALL be optional with sensible defaults provided by the system.

- **Error Handling**
  - The system SHALL emit appropriate warnings when components attempt to use action IDs without proper initialization.
  - The system SHALL handle graceful degradation when initialization fails or is incomplete.
  - The system SHALL NOT cause application crashes due to action management errors.

### Performance and Scalability

- **Efficient Updates**
  - The system SHALL minimize reactive updates and avoid unnecessary re-computation of action state.
  - Hotkey event handling SHALL be optimized to avoid performance impact on user interactions.
  - The system SHALL support lazy loading of action definitions when appropriate.

- **Memory Management**
  - The system SHALL properly clean up event listeners and reactive state when actions are unregistered.
  - The system SHALL avoid memory leaks when components are repeatedly mounted and unmounted.

### Development and Debugging

- **Development Tools**
  - The system SHALL provide debugging capabilities to inspect registered actions and their state.
  - The system SHALL emit helpful warnings and errors during development to aid in troubleshooting.
  - The system SHALL NOT emit warnings or debugging information in production builds.

- **Testing Support**
  - The system SHALL be designed to support unit and integration testing.
  - The system SHALL provide utilities for testing action registration, hotkey triggering, and state management.

### Application Context Management

- **Context State Management**
  - The system SHALL be able to maintain application context data provided to it including, but not limited to, active views, selected items, user permissions, and application state.
  - Context SHALL be reactive and automatically update when application state changes.
  - The system SHALL provide methods to update context data programmatically.
  - Context updates SHALL trigger reactive notifications to dependent components and search providers.

- **Context Scope and Structure**
  - The system SHALL support both global application context and component-specific context.
  - Context data SHALL include information about current views, selected entities, user roles, and active operations.
  - The system SHALL provide standardized context interfaces that work across different application architectures.
  - Context SHALL be efficiently serializable for passing to external search providers and remote services.

- **Context Integration with Actions**
  - Action execution SHALL receive current application context automatically.
  - Actions SHALL be responsible for handling their own context requirements and validation.
  - The system SHALL pass context data to action handlers without pre-validation.

### Dynamic Action Execution

- **Context-Driven Action Execution**
  - The system SHALL support executing actions with dynamically provided context data.
  - External search results SHALL be able to trigger action execution by providing action IDs and context data.
  - The system SHALL merge provided context with current application context appropriately.
  - Action handlers SHALL be responsible for validating context data compatibility.

- **External Action Integration**
  - The system SHALL provide methods for external systems to trigger action execution with context.
  - External action triggers SHALL follow the same execution patterns as internal actions.
  - External action execution SHALL respect user permissions and action availability rules.

### Search Provider Integration

- **Search Provider Context Support**
  - The system SHALL provide current application context to registered search providers.
  - Context updates SHALL trigger re-queries of active search providers when appropriate.
  - The system SHALL support different context update strategies (immediate, debounced, manual).
  - Search providers SHALL receive context in a standardized, serializable format.

- **Component-Based Provider Registration**
  - The system SHALL support search provider registration tied to component lifecycle.
  - Search providers SHALL be automatically unregistered when their registering component is unmounted.
  - The system SHALL support multiple search providers being registered and unregistered dynamically.
  - Component-based search providers SHALL enable contextual search capabilities based on current application views.

- **Context-Aware Result Ordering**
  - The system SHALL support dynamic ordering of search provider results based on current application context.
  - Search provider priority SHALL be configurable and context-dependent.
  - The system SHALL allow applications to control which search providers appear first based on current context.
  - Result ordering SHALL be reactive to context changes and update search provider priorities accordingly.

- **Search Provider Grouping**
  - Search providers SHALL support organizing their results into item groups.
  - Search provider groups SHALL integrate with ActionCore's grouping system for unified presentation.
  - The system SHALL support custom group titles, ordering, and visual organization for search provider results.
  - Search provider groups SHALL maintain consistent keyboard navigation and accessibility features.

- **Search Result Action Binding**
  - The system SHALL support dynamic action binding from external search results.
  - Search results SHALL be able to specify available actions using action IDs and context data.
  - The system SHALL validate that specified action IDs exist and are accessible to the current user.
  - Dynamic action binding SHALL integrate seamlessly with static action definitions.

