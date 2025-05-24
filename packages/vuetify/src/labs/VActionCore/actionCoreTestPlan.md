# ActionCore Test Plan

## Overview
This document outlines the comprehensive testing strategy for ActionCore, covering all components, functionality, edge cases, and integration points. The test plan is organized by functional areas and includes unit tests, integration tests, and end-to-end scenarios.

## Dependencies and Prerequisites

### ActionCore ActionDefinition Interface
Several tests assume that ActionCore's `ActionDefinition` interface includes:
- `isNavigationAction?: boolean` - For filtering navigation actions from command palette
- `group?: string` - For result grouping and group management
- `enabled?: boolean` - For filtering disabled actions
- `keywords?: string[]` - For enhanced search capabilities
- `priority?: number` - For ordering within groups

These properties should be explicitly defined in the ActionCore design documentation to support VCommandPalette's functionality.

### Group Management System
Tests assume the existence of a group management system with:
- `GroupDefinition` interface with `id`, `title`, `priority`, `icon`, and `separator` properties
- Group registration and unregistration methods in ActionCore
- Group validation and ordering functionality

### Action Middleware System
Tests assume the existence of an action middleware system with:
- `ActionMiddleware` interface with `name`, `beforeExecute`, `afterExecute`, and `onError` properties
- Middleware registration and execution order management
- Middleware hook execution during action lifecycle

## Test Categories

### 1. Core Architecture Tests

#### 1.1. Service Pattern & Vuetify Integration
- **Test**: ActionCore service registration and injection
  - Verify `createActionCore()` returns instance with `install` method
  - Test `app.use(actionCore)` registers service correctly
  - Verify `useActionCore()` injection returns same instance
  - Test injection throws error when ActionCore not provided
  - Verify service is available in all child components

- **Test**: ActionCoreOptions configuration
  - Test all `ActionCoreOptions` properties are applied correctly
  - Verify `sequenceTimeout`, `detectCollisions`, `debug` passed to useKeyBindings
  - Test `defaultBindingContext` activates on initialization
  - Verify `actionDefaults` are merged with registered actions

#### 1.2. Defaults System Integration
- **Test**: Vuetify defaults merging
  - Test global `ActionDefinition` defaults from Vuetify config
  - Verify merge order: Vuetify < ActionCore options < specific action
  - Test boolean, string, and function default merging
  - Verify defaults don't override explicitly set action properties

### 2. Action Registry Tests

#### 2.1. Basic Action Management
- **Test**: Action registration
  - Register single action with `registerAction()`
  - Register multiple actions with `registerActions()`
  - Verify actions stored in reactive state
  - Test action retrieval with `getAction()`
  - Verify `getAllActions()` returns all registered actions

- **Test**: Action re-registration
  - Register action with ID 'test-action'
  - Re-register with same ID but different properties
  - Verify old action is replaced completely
  - Test hotkey cleanup when hotkey changes during re-registration
  - Verify listeners are notified of action updates

- **Test**: Action re-registration hotkey edge cases
  - Register action with hotkey "Ctrl+S"
  - Re-register same action without hotkey
  - Verify old hotkey is cleaned up from useKeyBindings
  - Register action without hotkey
  - Re-register same action with hotkey "Ctrl+T"
  - Verify new hotkey is registered correctly with useKeyBindings

- **Test**: Action unregistration
  - Register multiple actions
  - Unregister single action with `unregisterAction()`
  - Unregister multiple actions with `unregisterActions()`
  - Verify associated hotkeys are cleaned up
  - Test unregistering non-existent action (should not error)

#### 2.2. Action Validation
- **Test**: Required fields validation
  - Test action registration with missing `id` (should error)
  - Test action registration with missing `title` (should error)
  - Test action registration with empty string `id` (should error)
  - Verify valid minimal action registers successfully

- **Test**: Invalid configuration warnings
  - Register action with invalid hotkey pattern
  - Register action with malformed properties
  - Verify development warnings are emitted
  - Test production warning suppression

#### 2.3. Action State Management
- **Test**: Reactive action properties
  - Register action with reactive `title` property
  - Update title and verify consumers are notified
  - Test reactive `disabled` and `visible` properties
  - Verify function-based properties receive current context

- **Test**: Action metadata handling
  - Register action with `category`, `priority`, `icon`
  - Verify metadata is preserved and accessible
  - Test actions with `meta` custom data
  - Verify `componentId` tagging works correctly

### 3. Component Lifecycle Tests

#### 3.1. Component-Based Registration
- **Test**: Component action lifecycle
  - Register actions with `registerComponentActions()`
  - Verify actions are tagged with `componentId`
  - Test `unregisterComponentActions()` removes all component actions
  - Verify component unregistration cleans up hotkeys

- **Test**: Multiple component registration
  - Register actions from multiple components
  - Verify each component's actions are isolated
  - Test unregistering one component doesn't affect others
  - Verify component ID uniqueness enforcement

- **Test**: Component re-registration
  - Register component actions
  - Re-register same component with different actions
  - Verify old actions are cleaned up
  - Test hotkey updates during component re-registration

#### 3.2. Search Provider Component Lifecycle
- **Test**: Component-based search provider management
  - Register search provider with `componentId`
  - Verify provider is tagged correctly
  - Test `unregisterSearchProvidersByComponent()`
  - Verify provider cleanup on component unmount

### 4. Binding Manager Tests

#### 4.1. useKeyBindings Integration
- **Test**: Internal useKeyBindings instance
  - Verify BindingManager creates useKeyBindings instance
  - Test configuration options forwarding
  - Verify global document target by default
  - Test custom `listenerOptions` and `sequenceTimeout`

- **Test**: Hotkey registration with useKeyBindings
  - Register action with hotkey
  - Verify hotkey is added to useKeyBindings config
  - Test hotkey execution triggers action
  - Verify action receives correct `ActionContext`

- **Test**: Hotkey unregistration
  - Register action with hotkey
  - Unregister action
  - Verify hotkey is removed from useKeyBindings
  - Test hotkey no longer triggers action

#### 4.2. Collision Detection and LIFO Resolution
- **Test**: Hotkey collision detection
  - Register two actions with same hotkey
  - Verify collision warning is emitted
  - Test `getHotkeyCollisions()` returns collision info
  - Verify collision includes affected actionIds

- **Test**: LIFO collision resolution
  - Register action A with hotkey "Ctrl+S"
  - Register action B with same hotkey
  - Trigger "Ctrl+S"
  - Verify action B executes (most recent)
  - Unregister action B
  - Verify action A now executes

- **Test**: Sequence collision detection
  - Register action with sequence "g-g"
  - Register action with sequence "g-g-g"
  - Verify overlapping sequence warning
  - Test both sequences work correctly

#### 4.3. Action Options Forwarding
- **Test**: Hotkey execution options
  - Register action with `preventDefault: true`
  - Trigger hotkey and verify event.preventDefault() called
  - Test `stopPropagation` option
  - Verify `runInTextInput` option controls input execution

- **Test**: Input context handling
  - Register action with `runInTextInput: false`
  - Focus text input and trigger hotkey
  - Verify action does not execute
  - Test function-based `runInTextInput` evaluation

### 5. Binding Context System Tests

#### 5.1. Binding Context Registration
- **Test**: Context registration and management
  - Register binding context with `registerBindingContext()`
  - Verify context is stored and retrievable
  - Test `getAllBindingContexts()` includes new context
  - Test registering context with same name overwrites

- **Test**: Context activation
  - Register multiple binding contexts
  - Activate context with `setActiveBindingContext()`
  - Verify `getActiveBindingContextName()` returns correct name
  - Test setting context to null deactivates

- **Test**: Temporary context management
  - Register temporary binding context
  - Activate it temporarily
  - Use `unregisterBindingContext()` to clean up
  - Verify context no longer available

#### 5.2. Hotkey Override System
- **Test**: Basic hotkey overrides
  - Register action with default hotkey "Ctrl+S"
  - Create binding context overriding to "Ctrl+Alt+S"
  - Activate context
  - Verify effective hotkey is "Ctrl+Alt+S"
  - Test `getEffectiveHotkey()` returns override

- **Test**: Hotkey unbinding via context
  - Register action with default hotkey
  - Create context with `newHotkey: null`
  - Activate context
  - Verify action has no effective hotkey
  - Test hotkey no longer triggers action

- **Test**: Multiple override contexts
  - Register actions with default hotkeys
  - Create multiple binding contexts with different overrides
  - Test switching between contexts updates effective hotkeys
  - Verify useKeyBindings configuration updates correctly

#### 5.3. Context Fallback Behavior
- **Test**: Context fallback logic
  - Set default binding context in options
  - Call `getEffectiveHotkey()` without context parameter
  - Verify falls back to active context
  - Test when no context is active

- **Test**: No active context fallback
  - Register action with default hotkey "Ctrl+S"
  - Ensure no global binding context is active (set to null)
  - Call `getEffectiveHotkey(actionId)` without context parameter
  - Verify returns action's default hotkey "Ctrl+S"
  - Test this scenario doesn't break hotkey execution

- **Test**: Invalid context handling
  - Reference non-existent actionId in context override
  - Verify warning is emitted
  - Test context with invalid hotkey patterns
  - Verify error handling doesn't break system

- **Test**: Malformed BindingContextDefinition handling
  - Register binding context with malformed `overrides` (not an array)
  - Register binding context with null/undefined `name`
  - Test context with circular references in overrides
  - Verify system handles gracefully and emits appropriate warnings
  - Test system continues functioning after malformed context

### 6. Sequential Hotkey Assignment Tests

#### 6.1. Basic Sequential Assignment
- **Test**: Sequential hotkey generation
  - Create array of actions without hotkeys
  - Call `assignSequentialHotkeys(actions, "Alt+{n}", 3)`
  - Verify actions get hotkeys "Alt+1", "Alt+2", "Alt+3"
  - Test actions are registered/updated correctly

- **Test**: Pattern substitution
  - Test various base patterns: "Ctrl+{n}", "F{n}", "Shift+Alt+{n}"
  - Verify {n} replacement works correctly
  - Test with actions that already have hotkeys (should override)
  - Verify count parameter limits assignment

- **Test**: Edge cases
  - Test with empty actions array
  - Test with count greater than actions length
  - Test with count of 0 or negative
  - Test with invalid base pattern (should warn)

#### 6.2. Sequential Assignment Integration
- **Test**: Integration with binding system
  - Assign sequential hotkeys to actions
  - Verify all hotkeys are registered with BindingManager
  - Test hotkey execution triggers correct actions
  - Verify collision detection works with sequential hotkeys

- **Test**: Sequential hotkeys with binding context overrides
  - Assign sequential hotkeys to actions: "Alt+1", "Alt+2", "Alt+3"
  - Create binding context that overrides "Alt+2" to "Ctrl+Alt+2"
  - Activate binding context
  - Verify "Alt+1" and "Alt+3" still work as assigned
  - Verify "Alt+2" triggers nothing and "Ctrl+Alt+2" triggers second action
  - Test getEffectiveHotkey() returns override for second action

### 7. Action Execution Tests

#### 7.1. Programmatic Execution
- **Test**: Basic programmatic execution
  - Register action with handler
  - Call `executeAction(actionId)`
  - Verify handler is called with correct `ActionContext`
  - Test context includes `trigger: 'programmatic'`

- **Test**: Execution with custom context
  - Call `executeAction(actionId, { data: customData })`
  - Verify handler receives merged context
  - Test custom context overwrites defaults appropriately
  - Verify `applicationContext` is current state

- **Test**: Execution with search result context
  - Call `executeAction(actionId, { searchResult: { title: 'Test Result', data: { id: 123 } } })`
  - Verify handler receives `ActionContext` with `searchResult` property
  - Test search result data is accessible in action handler
  - Verify search result context merges with application context correctly

- **Test**: Async handler execution
  - Register action with async handler
  - Call `executeAction()` and verify Promise returned
  - Test Promise resolves when handler completes
  - Verify Promise rejects when handler throws

#### 7.2. Hotkey-Triggered Execution
- **Test**: Hotkey execution flow
  - Register action with hotkey
  - Trigger hotkey via keyboard event
  - Verify handler called with `trigger: 'keyboard'`
  - Test `event` property contains original KeyboardEvent

- **Test**: Execution context from hotkey
  - Trigger action via hotkey
  - Verify `ActionContext.trigger` is 'keyboard'
  - Test `event` property is populated
  - Verify `applicationContext` reflects current state

#### 7.3. Visibility and Disabled State Checks
- **Test**: Static visibility/disabled checks
  - Register action with `visible: false`
  - Attempt execution
  - Verify handler is not called
  - Test with `disabled: true`

- **Test**: Function-based visibility/disabled
  - Register action with `visible: (context) => context.applicationContext.view === 'editor'`
  - Set application context view to 'viewer'
  - Attempt execution
  - Verify handler not called due to visibility
  - Change context to 'editor' and verify execution succeeds

- **Test**: Context-dependent evaluation
  - Register action with disabled function checking user permissions
  - Update application context with different user
  - Verify visibility/disabled functions receive current context
  - Test functions are called at execution time, not registration

#### 7.4. Execution Error Handling
- **Test**: Programmatic execution error handling
  - Register action with handler that throws error
  - Call `executeAction()`
  - Verify Promise rejects with wrapped error
  - Test error is logged before re-throwing

- **Test**: Hotkey execution error handling
  - Register action with handler that throws error
  - Trigger via hotkey
  - Verify error is logged but not re-thrown
  - Test system continues to function after error

- **Test**: Error context logging
  - Trigger execution error
  - Verify log includes actionId, trigger type, and error details
  - Test different error types (sync/async, different exception types)

### 8. Application Context Management Tests

#### 8.1. Context State Management
- **Test**: Basic context operations
  - Get initial context with `getContext()`
  - Update context with `updateContext(partialContext)`
  - Verify updates are merged correctly
  - Test context is readonly when returned

- **Test**: Context reactivity
  - Subscribe to context updates
  - Update context
  - Verify subscribers are notified
  - Test subscriber receives new context state

- **Test**: Partial context updates
  - Set initial context with multiple properties
  - Update single property
  - Verify other properties are preserved
  - Test nested object merging behavior

#### 8.2. Context Subscription System
- **Test**: Subscription management
  - Subscribe to context updates with callback
  - Verify subscription returns unsubscribe function
  - Test callback is called on context changes
  - Verify unsubscribe function stops notifications

- **Test**: Multiple subscribers
  - Add multiple context subscribers
  - Update context
  - Verify all subscribers are notified
  - Test independent unsubscription

- **Test**: Subscription cleanup
  - Subscribe to context updates
  - Unsubscribe using returned function
  - Update context
  - Verify unsubscribed callback is not called

#### 8.3. Context Integration with Actions
- **Test**: Action visibility with context
  - Register action with context-dependent visibility
  - Update application context
  - Verify action visibility updates reactively
  - Test `getVisibleActions()` reflects changes

- **Test**: Action execution with context
  - Register action handler that uses context
  - Update application context
  - Execute action
  - Verify handler receives current context state

### 9. Search Provider System Tests

#### 9.1. Search Provider Registration
- **Test**: Basic provider registration
  - Register search provider with `registerSearchProvider()`
  - Verify provider appears in `getActiveSearchProviders()`
  - Test provider with all optional properties
  - Verify provider metadata is preserved

- **Test**: Provider unregistration
  - Register multiple providers
  - Unregister specific provider with `unregisterSearchProvider()`
  - Verify provider is removed from active list
  - Test unregistering non-existent provider (should not error)

- **Test**: Component-based provider lifecycle
  - Register provider with `componentId`
  - Use `unregisterSearchProvidersByComponent()`
  - Verify all providers for component are removed
  - Test multiple components with providers

#### 9.2. Search Provider Utilities
- **Test**: Provider ordering utility
  - Register providers with different priorities
  - Call `getOrderedSearchProviders()`
  - Verify providers are returned in priority order
  - Test context-dependent priority functions

- **Test**: Provider grouping utility
  - Register provider with group definitions
  - Call `getSearchProviderGroups(providerId)`
  - Verify correct groups are returned
  - Test provider without groups returns empty array

- **Test**: Provider validation
  - Register provider with missing required fields
  - Verify appropriate warnings are emitted
  - Test provider with invalid search function
  - Verify system handles malformed providers gracefully

#### 9.3. Search Provider Integration
- **Test**: Provider search interface
  - Create mock search provider
  - Verify search method signature matches interface
  - Test provider receives query and context parameters
  - Verify search results match expected format

- **Test**: Provider timeout handling
  - Register provider with timeout setting
  - Verify timeout is respected during searches (integration concern)
  - Test provider without timeout uses system default

- **Test**: Dynamic action generation via getActions
  - Register search provider with `getActions` method
  - Create mock search result with specific data
  - Call provider's `getActions(searchResult, applicationContext)`
  - Verify returned `ActionDefinition[]` are correctly formatted
  - Test executing unregistered dynamic actions works correctly
  - Verify dynamic action handlers receive search result context

- **Test**: Inline actions in SearchResult
  - Register search provider that returns `SearchResult` with `inlineActions`
  - Verify `inlineActions` array contains executable action definitions
  - Test executing inline actions from search results
  - Verify inline action handlers receive correct context including search result
  - Test inline actions work independently of registered actions

### 10. Integration Tests

#### 10.1. Action and Hotkey Integration
- **Test**: End-to-end action execution via hotkey
  - Register action with hotkey and handler
  - Simulate keyboard event
  - Verify complete execution flow
  - Test context propagation through all layers

- **Test**: Complex hotkey scenarios
  - Register actions with sequences and combinations
  - Test collision resolution with real key events
  - Verify LIFO execution order
  - Test context switching with different bindings

#### 10.2. Search Provider and Action Integration
- **Test**: Action-based search results
  - Register actions that can be found via search
  - Register search provider that returns actions
  - Verify action integration in search results
  - Test execution of actions from search results
  - Verify executed actions receive `searchResult` in `ActionContext`
  - Test both registered actions and inline actions from search results

- **Test**: Dynamic action generation from search
  - Register search provider with `getActions` method
  - Verify dynamic actions are generated correctly
  - Test execution of dynamically generated actions
  - Verify actions receive search result context

#### 10.3. Context and Reactivity Integration
- **Test**: Context-driven action updates
  - Register actions with context-dependent properties
  - Update application context
  - Verify action visibility/disabled states update
  - Test search provider re-queries on context changes

- **Test**: Complex reactivity scenarios
  - Set up multiple reactive dependencies
  - Trigger cascading context updates
  - Verify all dependent systems update correctly
  - Test performance with many reactive watchers

### 11. Performance Tests

#### 11.1. Large Dataset Handling
- **Test**: Many actions performance
  - Register 1000+ actions
  - Measure registration time
  - Test action lookup performance
  - Verify memory usage is reasonable

- **Test**: Many hotkeys performance
  - Register actions with many unique hotkeys
  - Test hotkey execution performance
  - Verify collision detection scales appropriately
  - Test binding context switching performance

#### 11.2. Reactivity Performance
- **Test**: Context update performance
  - Register many context-dependent actions
  - Update application context frequently
  - Measure update propagation time
  - Test debouncing effectiveness

- **Test**: Memory management
  - Register and unregister actions repeatedly
  - Verify no memory leaks
  - Test event listener cleanup
  - Verify reactive watchers are disposed properly

### 12. Error Handling and Edge Cases

#### 12.1. Malformed Input Handling
- **Test**: Invalid action definitions
  - Register action with null/undefined properties
  - Test action with circular references
  - Verify system handles gracefully
  - Test recovery after invalid input

- **Test**: Invalid hotkey patterns
  - Register action with malformed hotkey string
  - Verify useKeyBindings integration handles errors
  - Test system continues functioning
  - Verify appropriate warnings are emitted

#### 12.2. System State Edge Cases
- **Test**: Uninitialized system access
  - Attempt to use ActionCore before initialization
  - Verify appropriate errors are thrown
  - Test graceful degradation where possible

- **Test**: Concurrent modification scenarios
  - Register/unregister actions simultaneously
  - Update context during action execution
  - Test system maintains consistency
  - Verify no race conditions

#### 12.3. Development vs Production Behavior
- **Test**: Warning behavior in development
  - Trigger various warning conditions
  - Verify detailed warnings are emitted
  - Test warning includes helpful context

- **Test**: Production warning suppression
  - Set production environment
  - Trigger warning conditions
  - Verify warnings are suppressed or minimal
  - Test system performance is not impacted

### 13. Debugging and Introspection Tests

#### 13.1. State Export Functionality
- **Test**: Registry state export
  - Register various actions, bindings, contexts
  - Activate binding context with hotkey overrides
  - Call `exportRegistryState()`
  - Verify complete state is captured including both base and effective hotkeys
  - Test export shows default action hotkeys and active context overrides separately
  - Verify export includes current active binding context information
  - Test export format is useful for debugging with clear separation of base vs effective state

- **Test**: Debug information accuracy
  - Enable debug mode
  - Perform various operations
  - Verify debug output is accurate and helpful
  - Test debug mode performance impact

#### 13.2. Collision and Warning Reporting
- **Test**: Comprehensive collision reporting
  - Create various collision scenarios
  - Verify `getHotkeyCollisions()` captures all cases
  - Test collision report format
  - Verify actionId mapping is correct

## Test Implementation Guidelines

### Testing Tools and Framework
- **Unit Tests**: Vitest for isolated component testing
- **Integration Tests**: Vue Test Utils for component integration
- **E2E Tests**: Playwright for full application scenarios
- **Performance Tests**: Custom benchmarking utilities

### Test Data Management
- Use consistent test data factories for actions, contexts, and providers
- Implement cleanup utilities to reset state between tests
- Create realistic test scenarios that mirror actual usage

### Mocking Strategy
- Mock useKeyBindings for isolated ActionCore tests
- Create mock search providers for testing provider system
- Use fake timers for testing timing-dependent features

### Coverage Requirements
- Aim for 95%+ line coverage on core ActionCore logic
- Ensure all error paths and edge cases are tested
- Verify integration points with external dependencies

### Continuous Integration
- Run full test suite on all commits
- Include performance regression tests
- Test across multiple Vue.js and Vuetify versions

This comprehensive test plan ensures ActionCore is thoroughly validated across all functional areas, performance characteristics, and edge cases, providing confidence in the system's reliability and maintainability.
