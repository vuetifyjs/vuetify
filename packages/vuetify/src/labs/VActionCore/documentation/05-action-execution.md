# 5. Executing Actions & Understanding Context

Defining actions is only half the story; the other half is triggering them and understanding the context in which they execute. ActionCore provides a unified method for invoking actions, `actionCore.executeAction()`, and a rich `ActionContext` object that provides handlers with vital information about the invocation.

## The `actionCore.executeAction()` Method

This is the primary method for programmatically triggering an action.

```typescript
// From ActionCorePublicAPI interface
export interface ActionCorePublicAPI {
  // ... other methods
  executeAction(actionId: string, invocationContext?: ActionContext): Promise<void>;
}
```

*   **`actionId: string` (Required):** The unique ID of the action you want to execute.
*   **`invocationContext?: ActionContext` (Optional):** An object providing details about how and why the action is being triggered. This allows for more flexible and context-aware action handlers.

When you call `executeAction()`:

1.  ActionCore retrieves the `ActionDefinition` matching the `actionId` (considering the currently active profile).
2.  It checks if the action is `disabled` (either its boolean value or the `.value` of its `Ref`).
3.  It calls the action's `canExecute(context)` method, if defined, passing the `invocationContext` (or a default one if not provided).
4.  If the action is not disabled and `canExecute` returns `true` (or is undefined), ActionCore then calls the action's `handler(context)` function, again passing the `invocationContext`.
5.  The method returns a `Promise<void>` that resolves when the action's handler completes (or immediately if the handler is synchronous or if execution was blocked).

**Example:**

```typescript
import { useActionCore } from '@/labs/action-core';

const actionCore = useActionCore();

async function handleButtonClick() {
  try {
    await actionCore.executeAction('file.save', {
      trigger: 'button-click',
      data: { sourceComponent: 'MyEditorToolbar' }
    });
    console.log('File save action completed or was not executed.');
  } catch (error) {
    console.error('Error during file.save execution:', error);
    // Note: executeAction itself generally doesn't throw for canExecute=false
    // or disabled. It would throw if the handler itself throws an unhandled error.
  }
}
```

## The `ActionContext` Interface

The `ActionContext` object is crucial for providing action handlers (`handler`) and conditional logic (`canExecute`) with information about the invocation event.

```typescript
// From types.ts
export interface ActionContext {
  trigger?: 'hotkey' | 'palette' | 'programmatic' | 'notification' | 'ai_assistant' | string;
  event?: Event; // Original DOM event, if any
  data?: any; // Arbitrary data relevant to the action
}
```

*   **`trigger?: string`**
    *   Indicates how the action was initiated. Common values include:
        *   `'hotkey'`: Triggered by a registered keyboard shortcut.
        *   `'palette'`: Selected from a command palette UI.
        *   `'programmatic'`: Called directly via `actionCore.executeAction()` from application code.
        *   `'component-click'` (or similar, e.g., `'component-vbtn'`): Often used by integrated components (like `VBtn` with a `command` prop) to signify a UI component triggered it.
        *   `'notification'`: Triggered by interacting with an in-app notification.
        *   `'ai_assistant'`: Triggered by an AI system.
    *   You can use custom string values for `trigger` if needed.
    *   **Pro Tip:** Handlers can use `trigger` to adapt their behavior. For instance, an action might perform a slightly different logging or UI feedback operation if triggered by AI versus a direct user hotkey.

*   **`event?: Event`**
    *   If the action was triggered by a DOM event (e.g., a key press for a hotkey, a click event for a button), this property will hold the original `Event` object. This can be useful for accessing event details like `event.target`, coordinates, or specific key event properties if not already handled by ActionCore's hotkey system.

*   **`data?: any`**
    *   A flexible property to pass arbitrary data to the action handler. This is extremely powerful for contextual actions.
    *   **Examples:**
        *   When executing an action from a context menu on a list item, `data` could contain the ID or the full object of the item that was right-clicked.
            ```typescript
            // In a component handling a context menu click:
            const selectedItem = { id: 'xyz', name: 'Product Alpha' };
            actionCore.executeAction('item.edit', {
              trigger: 'context-menu',
              data: selectedItem
            });

            // In the 'item.edit' action handler:
            handler: (ctx: ActionContext) => {
              const itemToEdit = ctx.data; // Contains { id: 'xyz', name: 'Product Alpha' }
              // Open editor for itemToEdit
            }
            ```
        *   A command palette might use `data` to pass along the search query that led to the action if the action needs it.
        *   An AI assistant would use `data` to pass the structured parameters derived from natural language, matching the action's `parametersSchema`.

## Patterns for Programmatic Execution

Beyond user-initiated triggers like hotkeys or UI clicks, `actionCore.executeAction()` is essential for a variety of programmatic scenarios:

*   **Tutorial Systems/User Onboarding:** Guide users by programmatically triggering actions like "Open Settings Dialog" or "Focus Help Panel."
*   **Automated Workflows:** Chain multiple actions together. A handler for one action might call `executeAction()` for another as part of a sequence.
    ```typescript
    // Action A handler
    async handler: async (ctxA) => {
      // Do something for Action A
      await someAsyncStep();

      // Now trigger Action B
      await actionCore.executeAction('actionB.id', {
        trigger: 'programmatic-chain',
        data: { originatingData: ctxA.data } // Pass relevant data along
      });
    }
    ```
*   **Responding to Server Events (e.g., WebSockets):** A WebSocket message might trigger a client-side action to update UI or fetch new data.
*   **Deep Linking/URL Handling:** A specific URL route could trigger an action upon application load.
*   **Integrating with External Systems:** An external event or message (e.g., from a browser extension or a native wrapper) could be marshaled into an `executeAction` call.

**Considerations for Programmatic Execution:**

*   **Context is Key:** Even for programmatic calls, provide a meaningful `trigger` in the `ActionContext`. This helps in debugging and allows handlers to behave contextually if needed.
*   **`canExecute` and `disabled` are Respected:** ActionCore still honors `canExecute` checks and the `disabled` state even for programmatic calls. This ensures consistency and prevents actions from running when they shouldn't.
*   **Error Handling:** Wrap `executeAction` calls in `try...catch` blocks if the action's handler might throw errors that need to be handled by the calling code.

By leveraging `executeAction` and the `ActionContext`, developers can build highly dynamic, interconnected, and contextually rich applications, where actions are not just simple fire-and-forget commands but integral parts of sophisticated user and system workflows.

---

Next: [**Action Profiling (Modes & Overrides)**](./06-action-profiling.md)
