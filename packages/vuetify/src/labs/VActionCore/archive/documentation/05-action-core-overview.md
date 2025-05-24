# 5. ActionCore: Beyond the Palette

While `VCommandPalette` is a primary way users interact with actions, the underlying `ActionCore` system offers much more. It's a centralized engine for managing all user-triggerable operations in your application. This guide provides a brief overview of some `ActionCore` capabilities for more advanced use cases.

## What is ActionCore?

Think of `ActionCore` as the brain for your application's commands. It allows you to:

*   **Define actions centrally:** Each action (`ActionDefinition`) includes its logic (`handler`), display properties (`title`, `icon`), hotkeys, and conditions for execution.
*   **Decouple actions from UI:** Define an action once and trigger it from buttons, menus, hotkeys, the command palette, or even programmatically.
*   **Manage action lifecycle:** Register and unregister sets of actions (action sources) dynamically.
*   **Apply global variations:** Use profiles to change action properties (like hotkeys or handlers) based on application mode (e.g., beginner vs. advanced).

When you use `VCommandPalette`, you're already interacting with `ActionCore` as it provides the actions to the palette and handles their execution.

## Accessing ActionCore

You typically get the `ActionCore` instance using the `useActionCore()` composable:

```typescript
import { useActionCore } from 'vuetify/labs/VActionCore'; // Adjust path

const actionCore = useActionCore();

if (actionCore) {
  // You can now use actionCore methods
}
```

## Programmatic Action Execution

You can trigger any registered action from your JavaScript/TypeScript code using `actionCore.executeAction()`.

```typescript
async function triggerSaveAndNotify() {
  if (!actionCore) return;

  try {
    // Execute the 'file.save' action
    await actionCore.executeAction('file.save', {
      trigger: 'programmatic-custom-workflow', // Describe how it was triggered
      data: { initiatedBy: 'auto-save-feature' } // Pass any relevant data
    });

    // After saving, maybe trigger a notification action
    await actionCore.executeAction('notifications.showSimple', {
      trigger: 'programmatic-custom-workflow',
      data: { message: 'File saved successfully by auto-save!' }
    });

  } catch (error) {
    console.error('Error in custom workflow:', error);
  }
}
```

*   **`actionId: string`**: The unique ID of the action to run.
*   **`invocationContext?: ActionContext`**: An optional object where you can specify:
    *   `trigger: string`: How the action was started (e.g., `'programmatic'`, `'ui-event'`).
    *   `data: any`: Any data the action's `handler` might need.
    *   `event?: Event`: The original DOM event, if applicable.

`ActionCore` still respects `disabled` and `canExecute` checks even for programmatic calls.

## Action Sources & Lifecycle

Actions are provided to `ActionCore` through "Action Sources." A source can be:

*   A static array of `ActionDefinition` objects.
*   A reactive Vue `Ref` containing an array of actions (ActionCore watches this for changes).
*   A function (sync or async) that returns an array of actions.

```typescript
// Example: Registering a reactive source
import { ref, onMounted, onUnmounted } from 'vue';
import { useActionCore, type ActionDefinition } from 'vuetify/labs/VActionCore';

const dynamicActions = ref<ActionDefinition[]>([]);
let sourceKey: symbol | null = null;
const actionCore = useActionCore();

onMounted(() => {
  if (actionCore) {
    sourceKey = actionCore.registerActionsSource(dynamicActions);
  }
  // Later, you can update dynamicActions.value and ActionCore will react.
  // dynamicActions.value = [ { id: 'new.action', title: 'New', handler: () => {} } ];
});

onUnmounted(() => {
  if (actionCore && sourceKey) {
    // Important to unregister to prevent memory leaks!
    actionCore.unregisterActionsSource(sourceKey);
  }
});
```

Properly managing the lifecycle of action sources (especially unregistering them when no longer needed) is crucial.

## Action Profiling (Brief Overview)

Action Profiling allows a single `ActionDefinition` to have multiple variations based on a globally active "profile" (e.g., a 'beginner' mode vs. an 'advanced' mode).

```typescript
const myProfileAction: ActionDefinition = {
  id: 'app.doSomethingComplex',
  title: 'Do Something',
  hotkey: 'ctrl_x',
  handler: () => { console.log('Standard way'); },
  profiles: {
    advancedUser: {
      title: 'Do Something (Advanced)',
      hotkey: 'ctrl_shift_x', // Different hotkey for advanced users
      handler: () => { console.log('Advanced way with more options!'); }
    }
  }
};

// To activate a profile:
// if (actionCore) {
//   actionCore.setActiveProfile('advancedUser');
// }

// To revert to base definitions:
// if (actionCore) {
//   actionCore.setActiveProfile(null);
// }
```
When a profile is active, `ActionCore` automatically uses the overridden properties (like `title`, `hotkey`, or even `handler`) for actions that define that profile. UI components like `<VHotKey>` will also reflect these changes.

## Further Exploration

`ActionCore` has more advanced capabilities, including:

*   **Fine-tuned hotkey options:** Control `preventDefault`, `stopPropagation` (via `ActionDefinition.hotkeyOptions`).
*   **`canExecute` and `disabled`:** For sophisticated conditional logic.
*   **`meta` property:** For attaching custom data to actions.
*   **Internal loading state:** `actionCore.isLoading` (a `Ref<boolean>`) indicates if any action handler is currently executing (useful for global loading indicators).

This overview provides a glimpse into `ActionCore`'s capabilities beyond just populating the `VCommandPalette`. For an exhaustive understanding, you might refer to the source code or more detailed technical documentation if available.

By leveraging `ActionCore` directly, you can build highly dynamic, context-aware, and robust interaction systems throughout your Vuetify application.

---
This concludes the introductory guide to `VCommandPalette` and `ActionCore`.
Return to [Main README](./README.md)
