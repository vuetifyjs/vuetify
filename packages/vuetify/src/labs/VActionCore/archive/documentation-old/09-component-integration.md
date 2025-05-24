# 9. Integrating Actions with Your UI (Application-Level Focus)

This chapter outlines the recommended strategies for connecting ActionCore actions to your Vuetify UI components. The emphasis is on **application-level integration**, where your application logic or custom components bridge ActionCore functionalities with UI elements.

## Core Principles of Application-Level Integration

### 1. Access ActionCore
Ensure `ActionCore` is initialized (e.g., via `app.use(createVuetify({ actionCore: { /* options */ } }))`) and provided in your application. You can then access the ActionCore instance in your Vue components or composables using `useActionCore()`:

```typescript
// In your component's setup or a composable
import { useActionCore } from '@/labs/VActionCore'; // Ensure path is correct

const actionCore = useActionCore();

if (!actionCore) {
  // Handle cases where ActionCore might not be available, if necessary
  console.warn('ActionCore instance not found. UI interactions may not be fully functional.');
}
```

### 2. Trigger Actions from Component Events
In your component's template or `<script setup>`, call `actionCore.executeAction()` in response to user interactions, such as button clicks or list item selections. Provide a relevant `ActionContext`.

```vue
<template>
  <v-btn @click="triggerSave">Save Document</v-btn>
</template>

<script setup lang="ts">
import { useActionCore } from '@/labs/VActionCore';

const actionCore = useActionCore();

const triggerSave = async () => {
  if (!actionCore) return;
  try {
    // Provide a descriptive trigger and any relevant data
    await actionCore.executeAction('file.save', {
      trigger: 'ui-button-click',
      data: { sourceComponent: 'MyEditorToolbar' }
    });
    // Handle success (e.g., show notification)
  } catch (error) {
    // Handle error (e.g., show error message)
    console.error("Failed to execute 'file.save':", error);
  }
};
</script>
```

### 3. Reflect Action State in UI (Dynamically)
To make your UI components (buttons, menu items, etc.) dynamically reflect an action's state (e.g., its title, icon, or disabled status), you can retrieve the `ActionDefinition` using `actionCore.getAction(actionId)` and bind to its properties.

Since `actionCore.allActions` (which `getAction` uses) is reactive, you can use `computed` or `watchEffect` to keep your local reference to the action definition up-to-date.

```vue
<template>
  <v-btn
    :disabled="isActionDisabled"
    @click="handleActionExecution"
  >
    <v-icon v-if="actionDef?.icon" :start="!!actionDef.title">{{ actionDef.icon }}</v-icon>
    {{ actionDef?.title || 'Default Action Title' }}
  </v-btn>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, isRef } from 'vue';
import { useActionCore, type ActionDefinition } from '@/labs/VActionCore';

const props = defineProps<{ actionId: string }>();
const actionCore = useActionCore();
const actionDef = ref<ActionDefinition | undefined>();

watchEffect(() => {
  if (actionCore) {
    actionDef.value = actionCore.getAction(props.actionId);
  }
});

const isActionDisabled = computed(() => {
  if (!actionDef.value) return true;
  if (isRef(actionDef.value.disabled)) return actionDef.value.disabled.value;
  if (typeof actionDef.value.disabled === 'boolean') return actionDef.value.disabled;
  if (actionDef.value.canExecute) {
    // Note: canExecute might need a context. For a generic UI binding,
    // you might not have a rich context. Assume a basic one or make it conditional.
    return !actionDef.value.canExecute({ trigger: 'ui-check' });
  }
  return false;
});

const handleActionExecution = async () => {
  if (actionCore && actionDef.value && !isActionDisabled.value) {
    await actionCore.executeAction(actionDef.value.id, { trigger: `ui-element-${props.actionId}` });
  }
};
</script>
```
**Key points for dynamic state:**
*   `actionCore.getAction(actionId)` provides the *effective* action definition, including any active profile overrides.
*   Properties like `title`, `icon`, and `disabled` on an `ActionDefinition` can themselves be `Ref`s. Your template or computed properties should account for this (e.g., accessing `.value` or using `isRef`).

## Detailed Integration Patterns

Here are specific recommended patterns for common UI integration scenarios:

### 1. Navigation Actions

For actions that trigger client-side navigation (e.g., using Vue Router), the goal is to maintain a single source of truth for routes, ensure accessibility (proper `<a>` tags with `href`), and integrate seamlessly with ActionCore.

**Recommended Pattern: Centralized Navigation Definitions**

1.  **Define Navigation Items Centrally:** Create an array or object with your navigation link definitions. Each definition should hold information for both `vue-router` (`<router-link>`) and `ActionCore`.

    ```typescript
    // src/config/navigation.ts (example)
    import type { RouteLocationRaw } from 'vue-router';

    export interface AppNavLink {
      id: string; // Unique ID for ActionCore
      text: string; // Link text and ActionCore title
      to: RouteLocationRaw; // For <router-link> & ActionCore handler
      icon?: string;
      keywords?: string[];
    }

    export const mainNavigationLinks: AppNavLink[] = [
      { id: 'nav-home', text: 'Home', to: '/', icon: 'mdi-home', keywords: ['dashboard'] },
      { id: 'nav-profile', text: 'Profile', to: '/profile', icon: 'mdi-account' },
    ];
    ```

2.  **Generate UI Elements:** Use these definitions to render your navigation UI (e.g., in a sidebar or menu), letting `vue-router` handle navigation.

    ```vue
    <!-- MySidebar.vue -->
    <template>
      <v-list>
        <v-list-item
          v-for="link in mainNavigationLinks"
          :key="link.id"
          :to="link.to"
          :prepend-icon="link.icon"
          :title="link.text"
          link
        />
      </v-list>
    </template>
    <script setup lang="ts">
    import { mainNavigationLinks } from '@/config/navigation';
    </script>
    ```

3.  **Register Actions with ActionCore:** Convert your navigation definitions into `ActionDefinition` objects. The action's `handler` will use the router to navigate.

    ```typescript
    // src/services/actionCoreSetup.ts (or similar)
    import { useActionCore, type ActionDefinition } from '@/labs/VActionCore';
    import { mainNavigationLinks } from '@/config/navigation';
    import router from '@/router'; // Your Vue Router instance

    export function registerNavigationActions() {
      const actionCore = useActionCore();
      if (!actionCore) return;

      const navigationActions: ActionDefinition[] = mainNavigationLinks.map(link => ({
        id: link.id,
        title: link.text,
        icon: link.icon,
        keywords: link.keywords,
        handler: async () => {
          try {
            await router.push(link.to);
          } catch (error) {
            console.error(`ActionCore: Navigation failed for "${link.id}":`, error);
          }
        },
        meta: { actionType: 'navigation', route: link.to }
      }));
      actionCore.registerActionsSource(navigationActions); // Simplified registration for example
    }
    // Call registerNavigationActions() during app setup.
    ```

**Benefits:** DRY (route defined once), accessible (uses `<router-link>`), maintainable, and robust.

### 2. Binding Actions to UI Elements (e.g., Buttons)

For actions triggered by buttons or other interactive elements, make the same logic invokable via UI click and ActionCore (command palette, hotkey).

**Recommended Pattern: Shared Function Logic**

1.  **Define Core Logic in a Reusable Function:**

    ```typescript
    // src/composables/useMyFeatureActions.ts
    export async function performSaveOperation(context?: { triggerSource: string }) {
      console.log('Saving data...', context);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async
      console.log('Data saved!');
    }
    ```

2.  **Call Function from UI Event Handler:**

    ```vue
    <!-- MyEditor.vue -->
    <template> <v-btn @click="handleSaveClick">Save Document</v-btn> </template>
    <script setup lang="ts">
    import { performSaveOperation } from '@/composables/useMyFeatureActions';
    async function handleSaveClick() {
      await performSaveOperation({ triggerSource: 'ui-button' });
    }
    </script>
    ```

3.  **Register ActionCore Action Calling the Same Function:**

    ```typescript
    // src/services/actionCoreSetup.ts
    import { useActionCore, type ActionDefinition } from '@/labs/VActionCore';
    import { performSaveOperation } from '@/composables/useMyFeatureActions';
    export function registerEditorActions() {
      const actionCore = useActionCore();
      if (!actionCore) return;
      const actions: ActionDefinition[] = [{
        id: 'editor-save',
        title: 'Save Document',
        icon: 'mdi-content-save',
        hotkey: 'meta_s',
        handler: async (ctx) => {
          await performSaveOperation({ triggerSource: `actioncore-${ctx.trigger}` });
        },
      }];
      actionCore.registerActionsSource(actions); // Simplified registration
    }
    ```

**Alternative: UI Triggers `actionCore.executeAction()`**
The button click handler could directly call `actionCore.executeAction('editor-save')`. This is viable if `ActionCore` adds significant value to *every* execution (e.g., complex `canExecute` or hooks being consistently applied). For most cases, the shared function is more straightforward and testable in isolation.

### 3. Contextual Actions for List Items

For actions on individual items in a list (e.g., Edit, Delete).

**Recommended Pattern: Generic Actions with Context via `executeAction`**

1.  **Define Generic Action Handlers:**

    ```typescript
    // src/composables/useItemActions.ts
    interface Item { id: string; name: string; }
    export async function editItem(itemId: string) { console.log(`Editing item ${itemId}`); }
    export async function deleteItem(item: Item) { console.log(`Deleting item ${item.name}`); }
    ```

2.  **UI Invokes ActionCore with Specific Item Data:**

    ```vue
    <!-- MyItemList.vue -->
    <template>
      <v-list-item v-for="item in items" :key="item.id" :title="item.name">
        <template #append>
          <v-btn icon="mdi-pencil" @click="triggerEdit(item.id)" size="small" />
          <v-btn icon="mdi-delete" @click="triggerDelete(item)" size="small" />
        </template>
      </v-list-item>
    </template>
    <script setup lang="ts">
    import { useActionCore } from '@/labs/VActionCore';
    interface Item { id: string; name: string; }
    const items: Item[] = [{ id: '1', name: 'One' }, { id: '2', name: 'Two' }];
    const actionCore = useActionCore();

    const triggerEdit = (itemId: string) => {
      if (!actionCore) return;
      actionCore.executeAction('item-edit', { data: { itemId }, trigger: 'ui-list-edit' });
    };
    const triggerDelete = (item: Item) => {
      if (!actionCore) return;
      actionCore.executeAction('item-delete', { data: { item }, trigger: 'ui-list-delete' });
    };
    </script>
    ```

3.  **Register Generic Actions; Handlers Use `ActionContext.data`:**

    ```typescript
    // src/services/actionCoreSetup.ts
    import { useActionCore, type ActionDefinition, type ActionContext } from '@/labs/VActionCore';
    import { editItem, deleteItem } from '@/composables/useItemActions';
    // Assume Item type is available
    // interface Item { id: string; name: string; }

    export function registerItemActions() {
      const actionCore = useActionCore();
      if (!actionCore) return;
      const actions: ActionDefinition[] = [
        {
          id: 'item-edit', title: 'Edit Item',
          handler: async (ctx: ActionContext) => {
            const itemId = ctx.data?.itemId;
            if (itemId) await editItem(itemId); else console.warn('No itemId for edit');
          },
          // canExecute: ctx => !!ctx.data?.itemId // If needed
        },
        {
          id: 'item-delete', title: 'Delete Item',
          handler: async (ctx: ActionContext) => {
            const item = ctx.data?.item; // as Item;
            if (item) await deleteItem(item); else console.warn('No item for delete');
          },
          // canExecute: ctx => !!ctx.data?.item
        }
      ];
      actionCore.registerActionsSource(actions); // Simplified registration
    }
    ```
This pattern keeps action definitions general; context is supplied at invocation time.

### 4. Batch Actions for Selected Items

For operations on multiple selected items.

**Recommended Pattern: Action Operates on a Shared Selection State (or receives data)**

1.  **Maintain Selection State:** Use a reactive store (e.g., Pinia) or a local `ref` to track selected item IDs.

    ```typescript
    // MySelectableList.vue
    const selectedItemIds = ref<string[]>([]);
    // ... logic to update selectedItemIds from UI ...
    ```

2.  **UI Triggers Action on Selection:** Button click handler reads selection state and passes it as data.

    ```vue
    <!-- MySelectableList.vue -->
    <template>
      <v-btn :disabled="!selectedItemIds.length" @click="handleDeleteSelected">
        Delete Selected ({{ selectedItemIds.length }})
      </v-btn>
      <!-- ... list with checkboxes bound to selectedItemIds ... -->
    </template>
    <script setup lang="ts">
    import { ref } from 'vue';
    import { useActionCore } from '@/labs/VActionCore';
    // Assume selectedItemIds is managed here or imported from a composable/store
    const selectedItemIds = ref<string[]>([]);
    const actionCore = useActionCore();

    async function handleDeleteSelected() {
      if (!actionCore || !selectedItemIds.value.length) return;
      // Pass the array of IDs directly.
      await actionCore.executeAction('batch-delete', {
        data: { itemIds: [...selectedItemIds.value] }, // Pass a snapshot
        trigger: 'ui-batch-delete'
      });
      // Optionally clear selection: selectedItemIds.value = [];
    }
    </script>
    ```

3.  **ActionCore Action Reads Selection State (from `ActionContext.data`):**

    ```typescript
    // src/services/actionCoreSetup.ts
    import { useActionCore, type ActionDefinition, type ActionContext } from '@/labs/VActionCore';
    // Assume performBatchDelete(itemIds: string[]) is defined
    async function performBatchDelete(itemIds: string[]) {
      console.log('Batch deleting item IDs:', itemIds);
      // Actual deletion logic
    }

    export function registerBatchActions() {
      const actionCore = useActionCore();
      if (!actionCore) return;
      const actions: ActionDefinition[] = [{
        id: 'batch-delete',
        title: 'Delete Selected Items',
        handler: async (ctx: ActionContext) => {
          const itemIds = ctx.data?.itemIds as string[];
          if (!itemIds || itemIds.length === 0) {
            console.warn('ActionCore: No items provided for batch delete.'); return;
          }
          await performBatchDelete(itemIds);
        },
        canExecute: (ctx: ActionContext) => { // Check if data with itemIds exists
          const itemIds = ctx.data?.itemIds as string[];
          return !!itemIds && itemIds.length > 0;
        },
        // Note: For a command palette to enable/disable this action based on *live* selection,
        // the `canExecute` or `disabled` property of the ActionDefinition would need
        // reactive access to that selection state (e.g., via a Pinia store getter).
        // If invoked only from UI with data, the above `canExecute` is sufficient for that call.
      }];
      actionCore.registerActionsSource(actions); // Simplified registration
    }
    ```
    If `canExecute` for a command palette needs to be truly reactive to the live selection state (not just data passed at invocation), that selection state must be accessible to the `ActionDefinition` (e.g., via a store/global ref) and its `disabled` or `canExecute` properties made reactive to it.

## General Considerations for UI Integration

*   **Error Handling & User Feedback:** Implement robust error handling in action handlers. Provide feedback to the user whether an action is triggered via UI or `ActionCore`.
*   **Asynchronous Operations:** Clearly indicate loading states (e.g., using `actionCore.isLoading` or custom states) for actions that take time.
*   **`VHotKey` for Display:** The `<VHotKey action-id="your-action-id" />` component remains useful for displaying the hotkey associated with an action, and it will react to changes from profiles.
*   **Keep it Simple:** Start with straightforward patterns. Not every UI interaction needs to be a global `ActionCore` action. Use ActionCore where it adds clear value (discoverability, hotkeys, centralized command logic, undo/redo, profiles).

By following these application-level integration patterns, you can effectively connect your UI to ActionCore, creating a responsive, maintainable, and powerful user experience.

---

Next: [**Best Practices for Quality Actions**](./10-best-practices.md)
