# 4. Advanced Command Palette Features

Beyond basic actions and hotkeys, `VCommandPalette` and `ActionCore` offer several features to create a more organized, powerful, and context-aware command experience.

## Grouping and Ordering Actions

As your list of actions grows, grouping and ordering them becomes essential for usability.

### Grouping Actions (`group`)

You can assign actions to a group using the `group` property in `ActionDefinition`. Actions with the same group name are typically displayed under a common header in the `VCommandPalette`.

```typescript
import type { ActionDefinition } from 'vuetify/labs/VActionCore'; // Adjust path

export const fileActions: ActionDefinition[] = [
  {
    id: 'file.open',
    title: 'Open File',
    group: 'File Operations',
    handler: () => { /* ... */ }
  },
  {
    id: 'file.save',
    title: 'Save File',
    group: 'File Operations',
    handler: () => { /* ... */ }
  },
  {
    id: 'edit.copy',
    title: 'Copy',
    group: 'Editing',
    handler: () => { /* ... */ }
  }
];

// Remember to register these actions with ActionCore.
```

By default, groups are sorted alphabetically, but `ActionCore` has internal priorities for common group names (e.g., 'Navigation', 'File', 'Edit' might appear before 'Other Actions').

### Ordering Actions (`order`)

The `order` property (a number) within an `ActionDefinition` allows you to influence the sort order of actions, particularly within the same group or among ungrouped actions. Lower numbers appear first.

```typescript
export const fileActionsWithOrder: ActionDefinition[] = [
  {
    id: 'file.new',
    title: 'New File',
    group: 'File Operations',
    order: 1, // Will appear first in "File Operations"
    handler: () => { /* ... */ }
  },
  {
    id: 'file.open',
    title: 'Open File',
    group: 'File Operations',
    order: 2, // Second
    handler: () => { /* ... */ }
  },
  {
    id: 'file.save',
    title: 'Save File',
    group: 'File Operations',
    order: 10, // Later in the group
    handler: () => { /* ... */ }
  }
];
```
Actions without an `order` property are typically sorted alphabetically after those with explicit orders.

## Nested Commands (Sub-Items)

Some actions naturally lead to a sub-menu of related commands. The `subItems` property allows you to create these nested structures.

```typescript
import type { ActionDefinition, ActionContext } from 'vuetify/labs/VActionCore'; // Adjust path

async function fetchExportOptions(): Promise<ActionDefinition[]> {
  // Simulate fetching dynamic options
  await new Promise(resolve => setTimeout(resolve, 200));
  return [
    { id: 'export.pdf', title: 'Export as PDF', handler: () => console.log('Exporting PDF...') },
    { id: 'export.csv', title: 'Export as CSV', handler: () => console.log('Exporting CSV...') },
  ];
}

export const documentActions: ActionDefinition[] = [
  {
    id: 'document.export',
    title: 'Export Document As...',
    icon: 'mdi-export',
    group: 'Document',
    // This function is called when "Export Document As..." is selected
    subItems: (context: ActionContext) => {
      console.log('Context for export:', context);
      // Can be synchronous: return [ { id: 'sub.action', ... } ];
      // Or asynchronous (returns a Promise):
      return fetchExportOptions();
    }
    // Note: An action with subItems usually doesn't have its own handler.
  }
];
```

When a user selects an action with `subItems` in `VCommandPalette`:
1.  The `subItems` function is called.
2.  If it returns a `Promise`, the palette may show a loading indicator.
3.  Once resolved, the returned `ActionDefinition[]` populates the palette as the new list of commands, often with a way to navigate back to the previous level.

This allows for creating hierarchical command structures, like "File" -> "Export As" -> "PDF".

## Conditionally Enabling/Disabling Actions

You can control whether an action is available or appears disabled in the palette.

### `disabled: boolean | Ref<boolean>`

The `disabled` property directly controls the enabled state. It can be a static boolean or a Vue `Ref<boolean>` for reactivity.

```typescript
import { ref }_ from 'vue';
import type { ActionDefinition } from 'vuetify/labs/VActionCore';

const isLoggedIn = ref(false); // Your app's reactive login state

export const userActions: ActionDefinition[] = [
  {
    id: 'user.logout',
    title: 'Logout',
    disabled: computed(() => !isLoggedIn.value), // Action is disabled if not logged in
    handler: () => { /* ...logout logic... */ isLoggedIn.value = false; }
  },
  {
    id: 'user.login',
    title: 'Login',
    disabled: isLoggedIn, // Action is disabled if logged in (same as computed above)
    handler: () => { /* ...login logic... */ isLoggedIn.value = true; }
  }
];
```
`VCommandPalette` will typically style disabled actions differently (e.g., grayed out) and prevent their execution.

### `canExecute: (context: ActionContext) => boolean`

For more dynamic, context-dependent checks, use `canExecute`. This function is evaluated by `ActionCore` just before attempting to run an action's `handler`.

```typescript
export const editorActions: ActionDefinition[] = [
  {
    id: 'editor.paste',
    title: 'Paste',
    // Only allow paste if clipboard has text (simplified example)
    canExecute: (context: ActionContext) => {
      // In a real scenario, you might check navigator.clipboard API
      // or some internal state representing clipboard content.
      // This context.data could be populated by a more advanced setup.
      return context.data?.clipboardHasText === true || Math.random() > 0.5; // Placeholder
    },
    handler: () => { console.log('Pasting content...'); }
  }
];
```
While `VCommandPalette` might not call `canExecute` for every item it renders (for performance), `ActionCore` itself *will* respect `canExecute` if the user manages to select and trigger the action.
For the palette to visually update based on `canExecute` that depends on live application state not passed in `ActionContext`, it's often better to use a reactive `disabled` property that reflects that state.

Both `disabled: true` and `canExecute: () => false` will prevent an action from running.

## Hiding Actions from the Palette (`meta.paletteHidden`)

Sometimes you might want to define an action (e.g., for a hotkey or programmatic use) but not have it appear in `VCommandPalette`.
You can achieve this using the `meta` property:

```typescript
export const backgroundSyncAction: ActionDefinition = [
  {
    id: 'system.backgroundSync',
    title: 'Perform Background Sync', // Title still good for debugging
    hotkey: 'ctrl_alt_shift_s', // Has a hotkey
    handler: () => { console.log('Background sync started...'); },
    meta: {
      paletteHidden: true // This action will not show up in VCommandPalette
    }
  }
];
```
This allows actions to be part of `ActionCore` for other purposes (hotkeys, programmatic execution) without cluttering the command palette UI.

These advanced features provide fine-grained control over how actions are presented and behave in `VCommandPalette`, enabling you to build a sophisticated and user-friendly command system.

---
Next: [**ActionCore: Beyond the Palette**](./05-action-core-overview.md)
