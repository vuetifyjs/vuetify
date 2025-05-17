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
  hotkeyOptions?: { /* ... */ }; // Fine-tune hotkey behavior
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
          console.log('Action executed!');
          // Update application state, call a service, etc.
        }
        ```
    *   **Example (Async with Context):**
        ```typescript
        async handler: (ctx: ActionContext) => {
          const itemId = ctx.data?.itemId;
          if (!itemId) {
            console.warn('No item ID provided to delete action');
            return;
          }
          // const success = await apiService.deleteItem(itemId);
          // if (success) store.removeItem(itemId);
          console.log(`Item ${itemId} delete attempt made. Trigger: ${ctx.trigger}`);
        }
        ```
    *   **Note:** An action doesn't strictly need a handler if it primarily serves to expose `subItems` (see [Sub-Items & Nested Commands](./07-sub-items-and-nesting.md)).

*   **`canExecute?: (context: ActionContext) => boolean`**
    *   A **synchronous** predicate function that determines if the action is currently allowed to execute. It receives the `ActionContext` that *would be* passed to the handler.
    *   If `canExecute` returns `false`, ActionCore will prevent the `handler` from being called. This is crucial for context-sensitive actions.
    *   UI elements bound to this action should ideally use this (or the `disabled` property) to reflect the action's availability (e.g., disabling a button).
    *   **Example:**
        ```typescript
        canExecute: (ctx: ActionContext) => {
          // Only allow saving if the document has unsaved changes and the user is logged in.
          return document.hasUnsavedChanges && authStore.isLoggedIn;
        }
        ```
    *   **Important:** This function must be synchronous. For asynchronous conditions, manage the `disabled` state reactively.

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

*   **`hotkey?: string | string[]`**: Defines the keyboard shortcut(s).
*   **`hotkeyOptions?: { /* ... */ }`**: Advanced options like `preventDefault`.
*   **`runInTextInput?: boolean | 'only' | RunInTextInputMatcher`**: Controls hotkey activation in text input fields.

### Advanced Features

These properties enable more sophisticated scenarios and are detailed in their respective chapters:

*   **`subItems?: (context: T) => ActionDefinition<T>[] | Promise<ActionDefinition<T>[]>`**: For actions that act as containers for other actions. See [Sub-Items & Nested Commands](./07-sub-items-and-nesting.md).
*   **`profiles?: Record<string, ActionProfileOverride<T>>`**: For defining variations of an action based on a global profile. See [Action Profiling](./06-action-profiling.md).
*   **`parametersSchema?: Record<string, any>`** and **`ai?: AIActionMetadata`**: For integrating with AI systems. See [AI Integration](./08-ai-integration.md).

### Custom Data

*   **`meta?: Record<string, any>`**
    *   A general-purpose object to attach any custom data or flags to your action that aren't covered by standard properties. This is useful for plugin authors or for application-specific logic that needs to be associated with an action.
    *   **Example:** `meta: { requiresAdmin: true, auditEventName: 'document_created' }`

## Crafting Your Definitions

When defining actions, strive for:

*   **Completeness:** Provide all relevant information (ID, title, handler, descriptive text, hotkeys where appropriate).
*   **Clarity:** Ensure titles, descriptions, and icons clearly communicate the action's purpose.
*   **Context-Awareness:** Use `canExecute` and `disabled` effectively to manage when an action is available.
*   **Reactivity:** Leverage `Ref`s for properties like `title` or `disabled` when they need to change dynamically based on application state.

Well-defined `ActionDefinition`s are the foundation of a robust and maintainable ActionCore implementation.

---

Next: [**Action Sources (`ActionsSource`)**](./03-action-sources.md)
