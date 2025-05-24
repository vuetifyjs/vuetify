# 2. Defining Actions (`ActionDefinition`)

The cornerstone of ActionCore is the `ActionDefinition` interface. It's a comprehensive structure that allows you to meticulously define every aspect of an action, from its visual presentation and textual description to its execution logic and contextual availability.

Crafting a clear, expressive, and complete `ActionDefinition` is the first step towards building high-quality, maintainable interactions in your Vuetify application.

## The `ActionDefinition` Interface

Let's explore the key properties of the `ActionDefinition` interface. For the full type definition, refer to `packages/vuetify/src/labs/action-core/types.ts`.

```typescript
import type { Ref } from 'vue';
import type { ActionContext, RunInTextInputMatcher, AIActionMetadata, ActionProfileOverride } from './types'; // Simplified path for example

export interface ActionDefinition<T extends ActionContext = ActionContext> {
  id: string; // Unique identifier
  title: string | Ref<string>; // Display title (can be reactive)
  subtitle?: string | Ref<string>; // Optional subtitle (can be reactive)
  icon?: string | Ref<string>; // Icon identifier (e.g., mdi icon name, can be reactive)
  keywords?: string | string[]; // For search/palette filtering
  description?: string; // Detailed description for UI tooltips/cheatsheets
  handler?: (context: T) => void | Promise<void>; // Function to execute (can be async)
  hotkey?: string | string[]; // Hotkey combinations/sequences
  hotkeyOptions?: {
    preventDefault?: boolean;
    stopPropagation?: boolean;
    // Note: ignoreKeyRepeat is not a direct option for the underlying useKeyBindings composable.
    // If needed, this logic should be handled within the action's handler by checking event.repeat.
  }; // Fine-tune hotkey behavior
  runInTextInput?: boolean | 'only' | RunInTextInputMatcher; // Hotkey behavior in inputs
  canExecute?: (context: T) => boolean; // Synchronous predicate for executability
  disabled?: boolean | Ref<boolean>; // Reactive disabled state
  subItems?: (context: T) => ActionDefinition<T>[] | Promise<ActionDefinition<T>[]>; // For group actions
  meta?: Record<string, any>; // For custom flags or data
  order?: number; // For sorting in UIs
  group?: string; // For grouping in UIs (e.g., command palette)
  parametersSchema?: Record<string, any>; // JSON Schema for AI parameter understanding
  ai?: AIActionMetadata; // Metadata for AI interaction
  profiles?: Record<string, ActionProfileOverride<T>>; // Profile-specific overrides
}
```

### Core Identification & Display

*   **`id: string` (Required)**
    *   A **globally unique** string that identifies the action. This ID is crucial for executing the action programmatically, referencing it in components, and for internal management by ActionCore.
    *   **Best Practice:** Use a consistent, namespaced naming convention (e.g., `file.save`, `user.profile.view`, `theme.toggleDark`).

*   **`title: string | Ref<string>` (Required)**
    *   The primary human-readable name for the action. Displayed in buttons, menus, command palettes, etc.
    *   Can be a static `string` or a Vue `Ref<string>` for dynamic, reactive titles.
    *   **Example (Static):** `title: 'Save Document'`
    *   **Example (Reactive):**
        ```typescript
        import { ref, computed } from 'vue';
        const isDarkTheme = ref(true);
        const toggleThemeAction: ActionDefinition = {
          id: 'theme.toggle',
          title: computed(() => isDarkTheme.value ? 'Switch to Light Theme' : 'Switch to Dark Theme'),
          // ... other properties
        };
        ```

*   **`subtitle?: string | Ref<string>`**
    *   An optional secondary piece of text, often displayed below or alongside the title in UIs like command palettes or detailed list items. Can also be a `Ref<string>`.

*   **`icon?: string | Ref<string>`**
    *   An optional identifier for an icon to be displayed with the action (e.g., an MDI icon class like `'mdi-content-save'`). Can be a `Ref<string>`.

*   **`description?: string`**
    *   A more detailed explanation of what the action does. Useful for tooltips, accessibility (e.g., `aria-label` augmentation), or extended information displays.

*   **`keywords?: string | string[]`**
    *   An array of strings or a single string (comma/space-separated, though an array is cleaner) containing terms users might search for in a command palette to find this action. This enhances discoverability.
    *   **Example:** `keywords: ['save file', 'persist data', 'write to disk']`

*   **`group?: string`**
    *   An optional string used to group related actions in UIs like a command palette. Actions with the same group name might be visually clustered under a common header.
    *   **Example:** `group: 'File Operations'`

*   **`order?: number`**
    *   A number that can be used by UIs to sort actions, especially within the same group or when a default sort order is desired. Lower numbers typically appear first.

### Behavior & Execution

*   **`handler?: (context: ActionContext) => void | Promise<void>`**
    *   The function that performs the action's logic when triggered. It receives an `ActionContext` object (see [Executing Actions & Context](./05-action-execution.md)).
    *   Can be a synchronous function or an `async` function returning a `Promise` for long-running or asynchronous tasks.
    *   **Example (Simple Sync):**
        ```typescript
        handler: () => {
          console.log('Action executed: About dialog opened.');
          // appState.isAboutDialogVisible = true;
        }
        ```
    *   **Example (Async with Context & Simulated Work):**
        ```typescript
        async handler: (ctx: ActionContext) => {
          const itemId = ctx.data?.itemId;
          if (!itemId) {
            console.warn('No item ID provided to delete action');
            return;
          }

          console.log(`Attempting to delete item ${itemId}. Trigger: ${ctx.trigger}`);
          // ActionCore sets its global isLoading around executeAction.
          // However, if a handler has multiple internal async steps,
          // you might manage a more granular loading state specific to this action.

          try {
            // Simulate an API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            // const success = await apiService.deleteItem(itemId);
            // if (success) {
            //   store.removeItemFromList(itemId);
            //   notificationsService.showSuccess('Item deleted successfully!');
            // } else {
            //   notificationsService.showError('Failed to delete item.');
            // }
            console.log(`Item ${itemId} deletion process completed.`);
          } catch (error) {
            console.error(`Error during deletion of item ${itemId}:`, error);
            // notificationsService.showError('An unexpected error occurred.');
          }
        }
        ```
    *   **Note:** An action doesn't strictly need a `handler` if its primary purpose is to expose `subItems` for UIs like command palettes (see [Sub-Items & Nested Commands](./07-sub-items-and-nesting.md)).

*   **`canExecute?: (context: ActionContext) => boolean`**
    *   A **synchronous** predicate function that determines if the action is currently allowed to execute. It's a gatekeeper just before the `handler` is called.
    *   It receives the `ActionContext` that *would be* passed to the handler, allowing the decision to be context-sensitive.
    *   If `canExecute` returns `false`, ActionCore will prevent the `handler` from being called. The `executeAction` promise will still resolve, but the action's core logic won't run.
    *   **When is `canExecute` evaluated?**
        *   **By ActionCore:** Just before attempting to run the `handler` when `actionCore.executeAction()` is called (either directly, via a hotkey, or component integration).
        *   **By UI Components (Potentially):** UI elements (like buttons or list items bound to actions) *may* also call `canExecute` (or observe a state derived from it) to dynamically update their visual state (e.g., appearing enabled/disabled). This is a common pattern for providing immediate feedback to the user.
    *   **Use Cases for `canExecute`:**
        *   **Context-Dependent Conditions:** When an action's executability depends on data available only at the moment of invocation (e.g., data passed in `ActionContext.data`, or the state of `document.activeElement` if `ctx.event` refers to a keyboard event).
            ```typescript
            // Example: Action to apply formatting only if a text input is focused and has selected text
            canExecute: (ctx: ActionContext) => {
              const activeEl = document.activeElement as HTMLInputElement | HTMLTextAreaElement;
              return (
                activeEl &&
                typeof activeEl.selectionStart === 'number' &&
                activeEl.selectionStart !== activeEl.selectionEnd
              );
            }
            ```
        *   **Dynamic Role/Permission Checks (Simple Cases):** If a role/permission check is simple, synchronous, and can be determined from readily available state (e.g., a global store that's already populated).
            ```typescript
            canExecute: (ctx: ActionContext) => {
              // return userStore.hasPermission('editSettings');
              return true; // Simplified for example
            }
            ```
            For more complex or asynchronous permission models, relying on the `disabled: Ref<boolean>` property (which can be updated from anywhere) might be more appropriate.
        *   **Preventing Execution Based on Invocation Data:** Checking if `ctx.data` contains required parameters before proceeding to a handler that depends on them.
            ```typescript
            canExecute: (ctx: ActionContext) => {
              return !!ctx.data?.targetFileId;
            }
            ```
    *   **`canExecute` vs. `disabled` Property:**
        *   Use `canExecute` for conditions that are best checked *at the moment of execution*, often using data from the `ActionContext`.
        *   Use the `disabled: Ref<boolean>` property for conditions that are based on broader, reactive application state that might change at any time, independent of a specific action invocation (e.g., `isSystemBusy`, `isUserLoggedIn`). ActionCore automatically respects the `.value` of this `Ref`.
        *   Both are checked; if an action `disabled` ref is true OR `canExecute()` returns false, the action won't run.
    *   **Important:** `canExecute` **must be synchronous**. For conditions requiring asynchronous checks, update the `disabled: Ref<boolean>` property of the action when the async check completes.

*   **`disabled?: boolean | Ref<boolean>`**
    *   A reactive way to disable an action. If `true` (or a `Ref<boolean>` whose `.value` is `true`), the action cannot be executed, and UIs should reflect this disabled state.
    *   This often works in tandem with or as an alternative to `canExecute`. `disabled` is useful when the disabled state is derived from reactive Vue state that might change outside of an action execution attempt.
    *   ActionCore checks both `disabled` and `canExecute`. If either prevents execution, the action is blocked.
    *   **Example:**
        ```typescript
        import { ref, computed } from 'vue';
        const isSystemBusy = ref(false);
        const deployAction: ActionDefinition = {
          id: 'system.deploy',
          title: 'Deploy to Production',
          disabled: isSystemBusy, // Disables action if isSystemBusy.value is true
          handler: async () => { /* ... */ },
        };
        ```

### Hotkeys & Input Behavior

These properties are covered in detail in the [Mastering Hotkeys](./04-hotkeys.md) chapter.

*   **`hotkey?: string | string[]`**: Defines the keyboard shortcut(s). Uses `_` or `+` for combinations, `-` for sequences.
*   **`hotkeyOptions?: { preventDefault?: boolean; stopPropagation?: boolean; }`**: Options passed to the underlying keybinding system. `ignoreKeyRepeat` is not directly supported by the simplified `useKeyBindings`; this logic should be in the handler if needed.
*   **`runInTextInput?: boolean | 'only' | RunInTextInputMatcher`**: Controls hotkey activation in text input fields. `ActionCore` translates this to `useKeyBindings`' simpler `usingInput` option, handling complex rules internally.

### Advanced Features

These properties enable more sophisticated scenarios and are detailed in their respective chapters:

*   **`subItems?: (context: T) => ActionDefinition<T>[] | Promise<ActionDefinition<T>[]>`**: For actions that act as containers for other actions. See [Sub-Items & Nested Commands](./07-sub-items-and-nesting.md).
*   **`profiles?: Record<string, ActionProfileOverride<T>>`**: For defining variations of an action based on a global profile. See [Action Profiling](./06-action-profiling.md).
*   **`parametersSchema?: Record<string, any>`**: Can be used by developers to define expected parameters for an action's handler, often useful if building systems that programmatically provide data to actions. (Previously associated with experimental AI integration, but can serve general programmatic use).
*   **`ai?: AIActionMetadata`**: Related to experimental AI features, not enabled by default. See [AI Integration (Future Possibility)](./08-ai-integration.md).

### Custom Data

*   **`meta?: Record<string, any>`**
    *   A general-purpose object to attach any custom data or flags to your action that aren't covered by standard properties. This is useful for plugin authors or for application-specific logic that needs to be associated with an action.
    *   **Example:** `meta: { requiresAdmin: true, auditEventName: 'document_created' }`

## Constructing Your Definitions

When defining actions, strive for:

*   **Completeness:** Provide all relevant information (ID, title, handler, descriptive text, hotkeys where appropriate).
*   **Clarity:** Ensure titles, descriptions, and icons clearly communicate the action's purpose.
*   **Context-Awareness:** Use `canExecute` and `disabled` effectively to manage when an action is available.
*   **Reactivity:** Leverage `Ref`s for properties like `title` or `disabled` when they need to change dynamically based on application state.

Well-defined `ActionDefinition`s are the foundation of a robust and maintainable ActionCore implementation.

---

Next: [**Action Sources (`ActionsSource`)**](./03-action-sources.md)
