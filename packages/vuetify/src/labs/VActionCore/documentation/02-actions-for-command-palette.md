# 2. Defining Actions for the Command Palette

Actions are the heart of `VCommandPalette`. They define what commands appear, how they look, and what they do. This guide dives deeper into crafting `ActionDefinition` objects tailored for the command palette.

## Key `ActionDefinition` Properties

While `ActionDefinition` has many properties, these are most commonly used for command palette actions:

*   **`id: string` (Required)**
    *   A unique identifier for your action (e.g., `user.viewProfile`, `editor.saveFile`).
    *   Used internally and for programmatically triggering actions.

*   **`title: string | Ref<string>` (Required)**
    *   The primary text displayed for the action in the palette.
    *   Can be a simple string or a Vue `Ref` for reactive titles (e.g., `title: computed(() => isActive.value ? 'Disable Feature' : 'Enable Feature')`).

*   **`handler?: (context: ActionContext) => void | Promise<void>`**
    *   The function that executes when the action is selected from the palette.
    *   It receives an `ActionContext` object, which can be useful for more advanced scenarios.
    *   Can be synchronous or `async` (returning a `Promise`).

*   **`icon?: string | Ref<string>`**
    *   An optional MDI icon name (e.g., `mdi-content-save`) or a Vue `Ref` for a reactive icon.
    *   Displayed next to the action title.

*   **`subtitle?: string | Ref<string>`**
    *   Optional secondary text displayed below the title, providing additional context.

*   **`keywords?: string | string[]`**
    *   An array of strings (or a single comma/space-separated string) that users might type to find this action. Enhances searchability.
    *   Example: For a "Save File" action, `keywords: ['disk', 'persist', 'write']`.

*   **`group?: string`**
    *   Assigns the action to a named group in the palette. Actions with the same group are often displayed under a shared header.
    *   Example: `group: 'File Operations'`.

*   **`order?: number`**
    *   Influences the sort order of actions, especially within the same group. Lower numbers appear first.

## Binding Component Methods or Existing Functions

You'll often want a command palette action to call a method in one of your Vue components or an existing utility function.

**Example: Calling a Component Method**

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useActionCore, type ActionDefinition } from 'vuetify/labs/VActionCore'; // Adjust path

const actionCore = useActionCore();
let sourceKey: symbol | null = null;
const userName = ref('Alice');

// Method within your component
function showWelcomeMessage() {
  alert(`Welcome, ${userName.value}!`);
}

const componentActions: ActionDefinition[] = [
  {
    id: 'component.showWelcome',
    title: 'Show Welcome',
    icon: 'mdi-message-text',
    // The handler directly calls our component method
    handler: () => {
      showWelcomeMessage();
    }
  }
];

onMounted(() => {
  if (actionCore) {
    sourceKey = actionCore.registerActionsSource(componentActions);
  }
});

onUnmounted(() => {
  if (actionCore && sourceKey) {
    actionCore.unregisterActionsSource(sourceKey);
  }
});
</script>
```

**Example: Using an Imported Utility Function**

```typescript
// src/utils/notifications.ts
export function showSuccessNotification(message: string) {
  // Imagine this uses a Vuetify snackbar or other notification system
  console.log(`SUCCESS: ${message}`);
}
```

```typescript
// src/actions/appNotifications.ts
import type { ActionDefinition } from 'vuetify/labs/VActionCore'; // Adjust path
import { showSuccessNotification } from '@/utils/notifications'; // Adjust path

export const notificationActions: ActionDefinition[] = [
  {
    id: 'notifications.showSuccess',
    title: 'Show Success Message',
    icon: 'mdi-check-circle',
    handler: () => {
      showSuccessNotification('Operation completed successfully!');
    }
  }
];

// Remember to register `notificationActions` with ActionCore
// e.g., in your main app setup or a relevant composable.
</script>
```

## Implementing Navigation Actions

Command palettes are often used for quick navigation. Here's how to integrate with Vue Router:

1.  **Ensure Vue Router is Set Up:** You should have Vue Router installed and configured in your project.

2.  **Define Navigation Actions:** The `handler` for a navigation action will use `router.push()`.

    ```typescript
    // src/actions/navigationActions.ts
    import type { ActionDefinition } from 'vuetify/labs/VActionCore'; // Adjust path
    import router from '@/router'; // Your Vue Router instance

    export const navActions: ActionDefinition[] = [
      {
        id: 'navigate.home',
        title: 'Go to Homepage',
        icon: 'mdi-home',
        keywords: ['dashboard', 'main'],
        group: 'Navigation',
        handler: async () => {
          try {
            await router.push('/');
          } catch (error) {
            // Handle Vue Router navigation errors (e.g., NavigationDuplicated)
            if (error.name !== 'NavigationDuplicated') {
              console.error('Navigation failed:', error);
            }
          }
        }
      },
      {
        id: 'navigate.settings',
        title: 'Open Settings',
        icon: 'mdi-cog',
        group: 'Navigation',
        handler: async () => {
          try {
            await router.push('/settings');
          } catch (error) {
            if (error.name !== 'NavigationDuplicated') {
              console.error('Navigation failed:', error);
            }
          }
        }
      }
    ];

    // Register `navActions` with ActionCore.
    ```

**Tip for Centralized Navigation Definitions:**
If you have many navigation links, consider defining them centrally and then generating both your `<router-link>` UI elements and your `ActionDefinition` objects from this single source of truth. This avoids duplication. (See the `09-component-integration.md` in the advanced documentation for a pattern).

## Action Context (`ActionContext`)

The `handler` function receives an `ActionContext` object as its argument. For basic command palette usage, you might not need it immediately, but it becomes useful for advanced scenarios (e.g., if an action behaves differently based on how it was triggered).

```typescript
handler: (context: ActionContext) => {
  console.log('Action triggered via:', context.trigger); // e.g., 'palette', 'hotkey'
  // context.data might contain info if the action was invoked with specific data
  // context.event would be the original DOM event if applicable
}
```

By mastering these `ActionDefinition` properties and patterns, you can populate your `VCommandPalette` with a rich set of useful and easily discoverable commands.

---
Next: [**Adding Hotkeys to Actions**](./03-hotkeys.md)
