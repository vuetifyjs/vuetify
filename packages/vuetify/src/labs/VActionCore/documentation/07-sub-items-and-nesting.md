# 7. Sub-Items & Nested Commands

ActionCore facilitates the creation of hierarchical command structures through the `subItems` property in `ActionDefinition`. This allows an action to act as a container or a group, which, when invoked or expanded in a UI, reveals a list of further executable actions. This feature is fundamental for building UIs like command palettes with nested menus, dynamic navigation systems, or context-sensitive action groups.

## The `subItems` Property

The `subItems` property in an `ActionDefinition` is a function that returns an array of `ActionDefinition` objects, or a `Promise` that resolves to such an array.

```typescript
// From ActionDefinition in types.ts
export interface ActionDefinition<T extends ActionContext = ActionContext> {
  // ... other properties (id, title, etc.)
  handler?: (context: T) => void | Promise<void>;
  subItems?: (context: T) => ActionDefinition<T>[] | Promise<ActionDefinition<T>[]>;
}
```

*   **Type:** `(context: ActionContext) => ActionDefinition[] | Promise<ActionDefinition[]>`
*   **`context: ActionContext`:** The function receives the `ActionContext` of the parent action's invocation. This allows the list of sub-items to be dynamically generated based on the context in which the parent group action was triggered.
*   **Return Value:**
    *   `ActionDefinition[]`: A synchronous array of further action definitions.
    *   `Promise<ActionDefinition[]>`: For cases where sub-items need to be fetched asynchronously (e.g., from an API, or based on other async operations).

**Key Characteristics:**

*   **No Direct Handler (Usually):** An action that primarily serves to provide `subItems` often won't have a `handler` itself. Its purpose is to expose the next level of actions.
    *   If `actionCore.executeAction()` is called on an action that *only* has `subItems` and no `handler`, ActionCore currently logs a debug message and does nothing further. The responsibility of invoking the `subItems` function and displaying the resulting actions lies with the UI component (e.g., a command palette) that is interacting with this group action.
*   **Recursive Structure:** Sub-items themselves can also have `subItems`, allowing for arbitrarily deep nesting of commands. However, for usability, aim for shallower hierarchies (see [Best Practices](./10-best-practices.md) and [Anti-Patterns](./11-anti-patterns.md)).

## Use Cases

1.  **Command Palette Navigation:**
    *   A top-level action like "File..." or "Preferences..." in a command palette.
    *   When selected, its `subItems` function is called to populate the palette with actual file operations ("Open", "Save", "Close") or specific preference categories.

2.  **Dynamic Menus:**
    *   A "Go to Recent Document..." action where `subItems` dynamically fetches and returns actions representing the 5 most recently opened files.

3.  **Contextual Action Groups:**
    *   An action "Format Selection..." whose `subItems` might present different formatting options based on the type of content currently selected in an editor (passed via `ActionContext.data`).

4.  **Developer Tools/Feature Flags:**
    *   An action "Toggle Feature Flag..." where `subItems` calls an API to get all available feature flags and presents each as a sub-action to toggle its state.

## Examples

### Synchronous Sub-Items

```typescript
import type { ActionDefinition, ActionContext } from '@/labs/action-core';

const navigationMenuAction: ActionDefinition = {
  id: 'menu.navigation',
  title: 'Navigation Menu',
  icon: 'mdi-menu',
  // No direct handler, its purpose is to show sub-items
  subItems: (ctx: ActionContext) => {
    console.log('Fetching subItems for Navigation Menu, context:', ctx);
    return [
      {
        id: 'nav.home',
        title: 'Go Home',
        icon: 'mdi-home',
        handler: () => console.log('Navigated to Home'),
      },
      {
        id: 'nav.settings',
        title: 'Go to Settings',
        icon: 'mdi-cog',
        handler: () => console.log('Navigated to Settings'),
      },
      {
        id: 'nav.userProfile',
        title: 'User Profile',
        icon: 'mdi-account',
        subItems: () => [ // Nested sub-items!
          { id: 'user.view', title: 'View Profile', handler: () => {} },
          { id: 'user.edit', title: 'Edit Profile', handler: () => {} },
        ]
      }
    ];
  }
};
```

### Asynchronous Sub-Items

```typescript
import type { ActionDefinition, ActionContext } from '@/labs/action-core';

// Simulating an API call
async function fetchProjectTasks(projectId: string): Promise<ActionDefinition[]> {
  // const response = await fetch(`/api/projects/${projectId}/tasks`);
  // const tasks = await response.json();
  // return tasks.map(task => ({
  //   id: `task.view.${task.id}`,
  //   title: `View Task: ${task.name}`,
  //   handler: () => { /* navigate to task */ }
  // }));
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: `task.view.123`, title: `View Task: Design Homepage (Project ${projectId})`, handler: () => {} },
        { id: `task.view.456`, title: `View Task: API Integration (Project ${projectId})`, handler: () => {} },
      ]);
    }, 500);
  });
}

const projectTasksAction: ActionDefinition = {
  id: 'project.viewTasks',
  title: 'View Project Tasks',
  icon: 'mdi-format-list-bulleted-square',
  // This action might be triggered with project ID in context.data
  subItems: async (ctx: ActionContext) => {
    const projectId = ctx.data?.projectId;
    if (!projectId) {
      console.warn('Project ID missing for fetching tasks.');
      return [];
    }
    console.log(`Fetching tasks for project ${projectId}...`);
    return fetchProjectTasks(projectId);
  }
};
```

## UI Integration (`ShowSubItemsUISymbol`)

ActionCore itself does not dictate how `subItems` are displayed. It merely provides the mechanism for actions to define them. The UI component (like a command palette or a custom menu system) is responsible for:

1.  Detecting that an action has a `subItems` property.
2.  Calling the `subItems(ctx)` function, potentially passing a relevant `ActionContext`.
3.  Handling the `Promise` if the function is asynchronous (e.g., showing a loading indicator).
4.  Rendering the returned `ActionDefinition[]` as the next level of choices.

To facilitate this, particularly for generic components that might be linked to a group action (e.g. via a custom setup, not a direct `command` prop which is deprecated for this use), ActionCore can leverage an injection symbol: `ShowSubItemsUISymbol`. A command palette or a similar UI orchestrator can `provide` a function under this symbol. When a component (or custom logic interacting with actions) detects it's trying to "execute" an action that primarily has `subItems`, it can inject this symbol and call the provided function, passing the parent action. This allows the central UI orchestrator to take over and display the sub-items appropriately.

**Example (Conceptual - Command Palette Providing the Handler):**
```typescript
// In your Command Palette component
import { provide } from 'vue';
import { ShowSubItemsUISymbol, type ActionDefinition } from '@/labs/action-core';

// ... setup ...
function displaySubItemsForAction(parentAction: ActionDefinition) {
  // Logic to clear current palette list,
  // call parentAction.subItems(),
  // and display the new list, possibly pushing to an internal navigation stack.
  // openPaletteWithParent(parentAction); // Your specific palette logic
}
provide(ShowSubItemsUISymbol, displaySubItemsForAction);
```

## Crafting Hierarchical Actions

*   **Clarity of Purpose:** Ensure your group actions have clear titles that indicate they lead to more options (e.g., "File...", "Export As...").
*   **Contextual Relevance:** Use the `ActionContext` passed to `subItems` to make the list of sub-actions truly dynamic and relevant to the parent action's invocation context.
*   **Performance of Async Sub-Items:** If `subItems` involves API calls, ensure they are efficient. Cache results where appropriate if the data doesn't change frequently.
*   **User Experience:** Avoid excessively deep nesting. More than 2-3 levels can become cumbersome in most UIs. Consider alternative ways to structure or filter actions if hierarchies become too complex.

Sub-items are a powerful feature for creating structured and navigable command systems within your application, leading to a more organized and intuitive user experience.

---

Next: [**AI Integration**](./08-ai-integration.md)
