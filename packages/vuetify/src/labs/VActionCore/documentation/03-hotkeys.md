# 3. Adding Hotkeys to Actions

Hotkeys provide a fast way for users to trigger actions without opening the command palette. `ActionCore` has a robust system for defining and managing keyboard shortcuts.

## Defining Hotkeys in `ActionDefinition`

You add hotkeys to an action using the `hotkey` property within its `ActionDefinition`.

```typescript
import type { ActionDefinition } from 'vuetify/labs/VActionCore'; // Adjust path

const myAction: ActionDefinition = {
  id: 'editor.save',
  title: 'Save Document',
  icon: 'mdi-content-save',
  handler: () => { console.log('Document saved!'); },
  hotkey: 'ctrl+s' // The hotkey definition
};
```

### Basic Syntax

*   **Key Combinations (Modifiers):** Combine modifier keys (`Ctrl`, `Alt`, `Shift`, `Meta/Cmd`) with other keys using `+`.
    *   `'ctrl+s'`
    *   `'alt+o'`
    *   `'shift+meta+z'` (Meta is Cmd on macOS, Win/Super key on others)
    The order of modifiers doesn't matter (`ctrl+shift+k` is same as `shift+ctrl+k`).

*   **Key Sequences:** For actions triggered by pressing keys one after another (e.g., press 'g' then 'i'), separate keys with a `-` or a space. Spaces are often clearer for simple sequences.
    *   `'g-i'` or `'g i'` (Press 'g', then 'i')
    *   `'ctrl+k-ctrl+x'` (Press Ctrl+K, then release, then press Ctrl+X)
    There's a default timeout (around 1.5 seconds) to complete a sequence.

### Multiple Hotkeys

You can assign several hotkeys to one action by providing an array of strings:

```typescript
const openSettingsAction: ActionDefinition = {
  id: 'settings.open',
  title: 'Open Settings',
  // CtrlOrCmd + Comma, OR F10
  hotkey: ['ctrl+,', 'meta+,', 'f10'],
  handler: () => { /* ... */ }
};
```
This is useful for common platform alternatives (like `Ctrl+,` and `Cmd+,`) or just offering multiple ways to trigger an action.

## Important: `Ctrl` vs. `Meta` (Cmd/Windows Key)

For cross-platform consistency with common shortcuts:

*   **Use `meta` for common OS-level shortcuts:**
    *   Examples: `meta+s` (Save), `meta+c` (Copy), `meta+v` (Paste).
    *   **On macOS:** This becomes `Command+S` (⌘S).
    *   **On Windows/Linux:** `ActionCore` interprets this as `Ctrl+S`.
    This provides the most natural user experience.

*   **Use `ctrl` for explicit Control key behavior:**
    *   Example: `ctrl+b`.
    *   **On macOS:** This becomes `Control+B` (⌃B), which is different from `Command+B`.
    *   **On Windows/Linux:** This is `Ctrl+B`.
    Use this if you specifically need the Control key on macOS or for shortcuts that aren't standard OS commands.

**Key Names:** Generally, use lowercase key names (e.g., `a`, `enter`, `arrowup`). `ActionCore` has aliases for common keys like `escape` (`esc`), `cmd` (`meta`), `option` (`alt`).

## Preventing Default Browser Actions (`hotkeyOptions`)

Sometimes, your hotkey might conflict with a default browser action (e.g., `ctrl+p` for print). You can prevent this:

```typescript
const customPrintAction: ActionDefinition = {
  id: 'print.custom',
  title: 'Custom Print Preview',
  handler: () => { /* your custom print logic */ },
  hotkey: 'ctrl+p',
  hotkeyOptions: {
    preventDefault: true // Stops the browser's default print dialog
  }
};
```

Other `hotkeyOptions` like `stopPropagation` or `ignoreKeyRepeat` exist for more advanced control (see advanced documentation if needed).

## Hotkeys in Text Inputs (`runInTextInput`)

By default, most hotkeys are disabled when you're typing in an input field (`<input>`, `<textarea>`) to avoid interfering with text entry. You can change this with `runInTextInput`:

*   **`runInTextInput: true`**: The hotkey will work even if an input is focused. Good for text editing shortcuts (e.g., `ctrl+b` for bold in a rich text editor).
    ```typescript
    hotkey: 'ctrl+b', runInTextInput: true
    ```

*   **`runInTextInput: 'only'`**: The hotkey *only* works if an input is focused. Useful for actions like submitting a form with Enter.

*   **`runInTextInput: (element) => boolean`**: For fine-grained control, provide a function that receives the focused element and returns `true` if the hotkey should run.

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
          <!-- VHotKey will look up the 'editor.save' action -->
          <!-- and display its primary hotkey -->
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

`<VHotKey>` automatically displays hotkeys in a platform-aware way (e.g., showing `⌘S` on Mac and `Ctrl+S` on Windows for `meta+s`).

Adding hotkeys can significantly improve your application's usability and accessibility. By understanding these basics, you can effectively integrate keyboard shortcuts with your command palette actions.

---
Next: [**Advanced Command Palette Features**](./04-advanced-palette-features.md)
