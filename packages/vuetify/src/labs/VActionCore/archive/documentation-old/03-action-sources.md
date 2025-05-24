# 3. Action Sources (`ActionsSource`)

Once you have crafted your `ActionDefinition` objects, you need a way to provide them to ActionCore. This is done through "Action Sources." An `ActionsSource` is a flexible mechanism that tells ActionCore where to find and how to retrieve action definitions.

Understanding and correctly utilizing action sources is key to managing the lifecycle of your actions, especially in dynamic applications where the set of available actions might change based on user context, loaded plugins, or application state.

## The `ActionsSource` Type

ActionCore accepts action sources in several forms, offering flexibility for different scenarios:

```typescript
import type { Ref } from 'vue';
import type { ActionDefinition } from './types'; // Simplified path for example

export type ActionsSource =
  | ActionDefinition[] // A static array of action definitions
  | Ref<ActionDefinition[]> // A reactive Vue Ref containing an array of actions
  | (() => ActionDefinition[] | Promise<ActionDefinition[]>); // A function (sync or async) that returns an array of actions
```

Let's break down each type:

### 1. Static Array: `ActionDefinition[]`

This is the simplest form. You provide a direct array of `ActionDefinition` objects. This is suitable for actions that are globally available and don't change throughout the application's lifecycle.

*   **Use Case:** Core application actions that are always present (e.g., "Open Command Palette," "Toggle Theme").
*   **Example:**
    ```typescript
    // in a file like core-actions.ts
    import type { ActionDefinition } from '@/labs/action-core';

    export const globalActions: ActionDefinition[] = [
      {
        id: 'palette.open',
        title: 'Open Command Palette',
        hotkey: 'ctrl_shift_p',
        handler: (ctx) => { /* logic to open palette */ },
      },
      {
        id: 'theme.toggle',
        title: 'Toggle Dark Mode',
        hotkey: 'ctrl_alt_t',
        handler: () => { /* logic to toggle theme */ },
      },
    ];

    // When registering with ActionCore:
    actionCore.registerActionsSource(globalActions);
    ```

### 2. Reactive Array: `Ref<ActionDefinition[]>`

For actions that need to change dynamically based on Vue's reactivity system, you can provide a `Ref` that wraps an array of `ActionDefinition` objects. ActionCore will watch this `Ref` and automatically update its internal list of actions (and associated hotkeys) whenever the `Ref`'s value changes.

*   **Use Case:** Actions that appear/disappear or change based on application state, user roles, or dynamically loaded modules. For example, actions specific to a selected item in a list, or actions that become available after a user logs in.
*   **Example:**
    ```typescript
    // In a Vue component or composable
    import { ref, computed } from 'vue';
    import type { ActionDefinition, ActionCore } from '@/labs/action-core';
    import { useCurrentUser } from './authService'; // Fictional auth service

    export function useUserSpecificActions(actionCore: ActionCore) {
      const { currentUser } = useCurrentUser();
      const userActions = ref<ActionDefinition[]>([]);

      // Watch for changes in currentUser and update actions
      watch(currentUser, (newUser) => {
        if (newUser && newUser.isAdmin) {
          userActions.value = [
            {
              id: 'admin.viewPanel',
              title: 'View Admin Panel',
              icon: 'mdi-security',
              handler: () => { /* ... */ },
            },
          ];
        } else {
          userActions.value = [];
        }
      }, { immediate: true });

      // Register the reactive source
      const sourceKey = actionCore.registerActionsSource(userActions);

      // Clean up when the scope is disposed (e.g., component unmounts)
      onUnmounted(() => {
        actionCore.unregisterActionsSource(sourceKey);
      });
    }
    ```

### 3. Function Source: `() => ActionDefinition[] | Promise<ActionDefinition[]>`

You can also provide a function that, when called, returns an array of `ActionDefinition` objects. This function can be synchronous or asynchronous (returning a `Promise`).

*   **Synchronous Function: `() => ActionDefinition[]`**
    *   ActionCore will call this function once during the registration process to get the list of actions. This is useful if the action definitions depend on some setup logic that runs at the time of registration.
    *   **Use Case:** Actions generated based on initial application configuration or environment.
*   **Asynchronous Function: `() => Promise<ActionDefinition[]>`**
    *   ActionCore will call this function and await its `Promise`. The actions are registered once the promise resolves. This is ideal for actions that depend on data fetched from an API or other asynchronous setup.
    *   **Use Case:** Actions loaded from a remote configuration, actions representing data fetched from a server (e.g., a list of dynamic navigation targets).
    *   **Example (Async):**
        ```typescript
        // services/pluginActions.ts
        import type { ActionDefinition } from '@/labs/action-core';

        async function fetchPluginActionsFromServer(): Promise<ActionDefinition[]> {
          // const response = await fetch('/api/plugins/active-actions');
          // const data = await response.json();
          // return data.map(pluginAction => ({ /* map to ActionDefinition */ }));
          return Promise.resolve([
            { id: 'plugin.dynamic.action1', title: 'Fetched Action 1', handler: () => {} },
          ]);
        }

        // When registering with ActionCore:
        // actionCore.registerActionsSource(fetchPluginActionsFromServer);
        ```
*   **Important Note for Function Sources:** Unlike `Ref<ActionDefinition[]>` sources, standard function sources (both sync and async) are typically evaluated **once** by ActionCore upon registration to retrieve the initial set of actions. If the actions provided by the function need to change later, you would generally need to unregister the old source and register a new one, or use a `Ref` for true reactivity.

## Registering and Unregistering Action Sources

ActionCore provides methods to manage the lifecycle of your action sources:

*   **`actionCore.registerActionsSource(source: ActionsSource): symbol`**
    *   Adds your actions to ActionCore.
    *   Accepts any of the `ActionsSource` types described above.
    *   Returns a unique `symbol` key. This key is crucial for unregistering the source later.
    *   **Craftsmanship Tip:** Store this symbol carefully if you intend to unregister the source. For sources tied to a component's lifecycle, this is essential.

*   **`actionCore.unregisterActionsSource(key: symbol): boolean`**
    *   Removes the actions associated with the provided `symbol` key from ActionCore.
    *   All hotkeys defined by actions from this source are automatically unregistered.
    *   Returns `true` if a source was found and removed, `false` otherwise.

## Lifecycle Management

Properly managing the lifecycle of your action sources is vital for a well-behaved and performant application. Leaking action sources (registering them but never unregistering when they are no longer needed) can lead to:

*   Stale or irrelevant actions cluttering the system.
*   Unintended hotkey conflicts or behavior.
*   Memory bloat and performance degradation.

**Best Practices for Lifecycle Management:**

1.  **Global Static Actions:** For actions that are truly global and live for the entire duration of the application, you can register their source once (e.g., a static array) when ActionCore is initialized and typically don't need to unregister it.

2.  **Component-Scoped Actions:** If actions are specific to a Vue component (e.g., actions for a modal dialog, or context-specific editor commands):
    *   Register their source (often a `Ref<ActionDefinition[]>` or a function that generates actions based on component props/state) in the component's `setup` function or `onMounted` hook.
    *   **Crucially, unregister the source using the stored `symbol` key in the component's `onUnmounted` hook.** This prevents the actions and their hotkeys from persisting after the component is destroyed.

    ```typescript
    // Inside a Vue component's setup
    import { onMounted, onUnmounted, ref } from 'vue';
    import { useActionCore } from '@/labs/action-core'; // Assuming useActionCore injects the service
    import type { ActionDefinition } from '@/labs/action-core';

    const actionCore = useActionCore();
    const componentActions = ref<ActionDefinition[]>([]);
    let actionsSourceKey: symbol | null = null;

    onMounted(() => {
      // Define or compute componentActions.value here
      componentActions.value = [
        { id: 'component.specific.task', title: 'Do Task', handler: () => {} },
      ];
      if (actionCore) {
        actionsSourceKey = actionCore.registerActionsSource(componentActions);
      }
    });

    onUnmounted(() => {
      if (actionCore && actionsSourceKey) {
        actionCore.unregisterActionsSource(actionsSourceKey);
      }
    });
    ```

3.  **Plugin or Module Actions:** If a feature module or plugin provides actions:
    *   Register them when the module is initialized or enabled.
    *   Unregister them when the module is disabled or torn down.

By thoughtfully choosing the type of `ActionsSource` and diligently managing its lifecycle, you ensure that ActionCore always reflects the precise set of actions relevant to the current application state and user context, contributing to a clean, efficient, and predictable system.

---

Next: [**Mastering Hotkeys**](./04-hotkeys.md)
