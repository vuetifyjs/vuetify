# 3. Adding Hotkeys to Actions

Hotkeys provide a fast way for users to trigger actions without opening the command palette. `ActionCore` has a robust system for defining and managing keyboard shortcuts, leveraging the `useKeyBindings` composable.

## Defining Hotkeys in `ActionDefinition`

You add hotkeys to an action using the `hotkey` property within its `ActionDefinition`.

```typescript
import type { ActionDefinition } from 'vuetify/labs/VActionCore'; // Adjust path

const myAction: ActionDefinition = {
  id: 'editor.save',
  title: 'Save Document',
  icon: 'mdi-content-save',
  handler: () => { console.log('Document saved!'); },
  hotkey: 'ctrl_s' // The hotkey definition (can also be ctrl+s)
};
```

### Basic Syntax

*   **Key Combinations (Modifiers):** Combine modifier keys (`Ctrl`, `Alt`, `Shift`, `Meta/Cmd`) with other keys using `_` or `+`.
    *   `'ctrl_s'` or `'ctrl+s'`
    *   `'alt_o'` or `'alt+o'`
    *   `'shift_meta_z'` or `'shift+meta+z'` (Meta is Cmd on macOS, Win/Super key on others)
    The order of modifiers doesn't matter (`ctrl_shift_k` is same as `shift_ctrl_k`).

*   **Key Sequences:** For actions triggered by pressing keys one after another (e.g., press 'g' then 'i'), separate keys with a `-`.
    *   `'g-i'` (Press 'g', then 'i')
    *   `'ctrl_k-ctrl_x'` (Press Ctrl_K, then release, then press Ctrl_X)
    There's a default timeout (around 800ms as per `useKeyBindings`) to complete a sequence.

### Multiple Hotkeys

You can assign several hotkeys to one action by providing an array of strings:

```typescript
const openSettingsAction: ActionDefinition = {
  id: 'settings.open',
  title: 'Open Settings',
  // CtrlOrCmd + Comma, OR F10
  hotkey: ['ctrl_,', 'meta_,', 'f10'], // Using underscore for consistency
  handler: () => { /* ... */ }
};
```
This is useful for common platform alternatives (like `Ctrl_,` and `Cmd_,`) or just offering multiple ways to trigger an action.

## Important: `Ctrl` vs. `Meta` (Cmd/Windows Key)

For cross-platform consistency with common shortcuts:

*   **Use `meta` for common OS-level shortcuts:**
    *   Examples: `meta_s` (Save), `meta_c` (Copy), `meta_v` (Paste).
    *   **On macOS:** This becomes `Command_S` (⌘S).
    *   **On Windows/Linux:** `useKeyBindings` (used by ActionCore) interprets this as `Ctrl_S` if `ctrl` isn't also specified.
    This provides the most natural user experience.

*   **Use `ctrl` for explicit Control key behavior:**
    *   Example: `ctrl_b`.
    *   **On macOS:** This becomes `Control_B` (⌃B), which is different from `Command_B`.
    *   **On Windows/Linux:** This is `Ctrl_B`.
    Use this if you specifically need the Control key on macOS or for shortcuts that aren't standard OS commands.

**Key Names:** Generally, use lowercase key names (e.g., `a`, `enter`, `arrowup`). `useKeyBindings` has minimal internal aliasing (e.g., `esc` for `escape`, `cmd` for `meta`).

## Preventing Default Browser Actions (`hotkeyOptions`)

Sometimes, your hotkey might conflict with a default browser action (e.g., `ctrl_p` for print). You can prevent this using the `hotkeyOptions` property in `ActionDefinition`.

```typescript
const customPrintAction: ActionDefinition = {
  id: 'print.custom',
  title: 'Custom Print Preview',
  handler: () => { /* your custom print logic */ },
  hotkey: 'ctrl_p',
  hotkeyOptions: {
    preventDefault: true // Stops the browser's default print dialog
    // stopPropagation: false // Default, can be set to true if needed
  }
};
```

*   **`preventDefault?: boolean`** (Default: `false`)
    *   If `true`, `event.preventDefault()` is called when the hotkey triggers.
*   **`stopPropagation?: boolean`** (Default: `false`)
    *   If `true`, `event.stopPropagation()` is called. Use with caution as it can affect other listeners.

(Note: `ignoreKeyRepeat` is not directly passed to the simplified `useKeyBindings`. If key repeat needs to be ignored, the action handler itself would need to check `event.repeat`.)

## Hotkeys in Text Inputs (`runInTextInput`)

By default, most hotkeys are disabled when you're typing in an input field (`<input>`, `<textarea>`) to avoid interfering with text entry. `ActionDefinition.runInTextInput` controls this:

*   **`runInTextInput: true`**: The hotkey will generally work even if an input is focused.
*   **`runInTextInput: false` (or `undefined`)**: The hotkey will generally be blocked if an input is focused.
*   **`runInTextInput: 'myInputName'` (string)**: The hotkey works only if the focused input's `name` attribute is "myInputName".
*   **`runInTextInput: 'only'` or `string[]` or `((element) => boolean)`**: These more complex conditions are evaluated by `ActionCore` *within the action's hotkey handler*. For `useKeyBindings`, ActionCore might pass `usingInput: true` to ensure the event reaches the handler, which then performs the finer-grained check.

```typescript
// Example: Allow Ctrl+B in any input
hotkey: 'ctrl_b', runInTextInput: true

// Example: Ctrl+Enter only in an input named 'mainCommentBox'
hotkey: 'ctrl_enter', runInTextInput: 'mainCommentBox'
```

## Displaying Hotkeys with `<VHotKey>`

Vuetify provides the `<VHotKey>` component to easily display the hotkey associated with an action in your UI (e.g., next to a menu item or button).

```vue
<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn v-bind="props">File</v-btn>
    </template>
    <v-list>
      <v-list-item @click="executeSave">
        <v-list-item-title>Save</v-list-item-title>
        <template #append>
          <VHotKey action-id="editor.save" />
        </template>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { VHotKey, useActionCore } from 'vuetify/labs/VActionCore'; // Adjust path
// ... other imports

const actionCore = useActionCore();

function executeSave() {
  if(actionCore) actionCore.executeAction('editor.save');
}

// Assume 'editor.save' action with a hotkey is registered elsewhere
</script>
```

`<VHotKey>` automatically displays hotkeys in a platform-aware way.

Adding hotkeys can significantly improve your application's usability and accessibility. By understanding these basics, you can effectively integrate keyboard shortcuts with your command palette actions.

---
Next: [**Advanced Command Palette Features**](./04-advanced-palette-features.md)
