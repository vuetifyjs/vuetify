# 4. Mastering Hotkeys

Keyboard hotkeys are a hallmark of productive and accessible applications. ActionCore provides a sophisticated, yet easy-to-use system for defining hotkeys associated with your actions. This guide delves into the nuances of hotkey definition, platform considerations, and advanced configurations to help you craft an intuitive keyboard-driven experience.

This guide is based on the more detailed `HOTKEY_GUIDE.md` within the ActionCore source, focusing on the most critical aspects for developers integrating actions.

## Hotkey Definition in `ActionDefinition`

Hotkeys are specified in the `hotkey` property of an `ActionDefinition`.

```typescript
// From ActionDefinition
export interface ActionDefinition {
  // ... other properties
  hotkey?: string | string[];
  hotkeyOptions?: {
    preventDefault?: boolean;
    stopPropagation?: boolean;
    ignoreKeyRepeat?: boolean;
  };
  runInTextInput?: boolean | 'only' | RunInTextInputMatcher; // Detailed further below
}
```

### Basic Syntax

*   **Single Keys:** For actions triggered by a single key (e.g., 'F' for fullscreen, 'Escape' to close a dialog).
    ```typescript
    hotkey: 'f'
    hotkey: 'escape'
    ```

*   **Key Combinations (Modifiers):** Combine modifier keys (`Ctrl`, `Alt`, `Shift`, `Meta/Cmd`) with other keys using `+`.
    ```typescript
    hotkey: 'ctrl+s'       // Control + S
    hotkey: 'meta+shift+z' // Command/Windows Key + Shift + Z
    hotkey: 'alt+o'         // Alt + O (Option + O on macOS)
    ```
    The order of modifiers (e.g., `ctrl+shift+s` vs. `shift+ctrl+s`) does not matter.

*   **Key Sequences:** For actions triggered by a sequence of key presses (e.g., press 'g' then 'i' to go to inbox), separate keys with a `-` or a space. Spaces are preferred for readability when modifiers are not involved in the sequence parts.
    ```typescript
    hotkey: 'g-i'          // Press g, then i
    hotkey: 'g i'          // Press g, then i (alternative, often clearer)
    hotkey: 'ctrl+k-ctrl+x' // Press Ctrl+K, then Ctrl+X
    ```
    ActionCore has a default timeout (around 1500ms) for completing a sequence.

### Multiple Hotkeys for One Action

You can assign multiple hotkeys to a single action by providing an array of strings:

```typescript
const openSettingsAction: ActionDefinition = {
  id: 'settings.open',
  title: 'Open Settings',
  hotkey: ['ctrl+,', 'meta+,', 'f10'], // CtrlOrCmd + Comma, or F10
  handler: () => { /* ... */ }
};
```
This is useful for providing common platform-specific alternatives (like `Ctrl+,` on Windows/Linux and `Cmd+,` on macOS for settings) or simply multiple ways to trigger the same command.

## Key Names and Aliases

Key names generally follow `KeyboardEvent.key` values, normalized to lowercase. ActionCore's underlying `useKeyBindings` system primarily uses `event.code` for layout-independent bindings and includes an extensive alias map (`defaultAliasMap` in `useKeyBindings.ts`) to translate common `event.code` values back to simpler, expected key names.

**Commonly Used Modifiers & Aliases:**

*   `meta`: Represents the Command key (⌘) on macOS and the Windows/Super key on other platforms. **Crucially, in combinations, `meta` is often normalized to `ctrl` on non-macOS systems for common patterns like `meta+s` becoming `Ctrl+S` on Windows/Linux.**
*   `ctrl`: Represents the Control key on all platforms.
*   `alt`: Represents the Alt key (Option key `⌥` on macOS).
*   `shift`: Represents the Shift key.
*   `cmd`, `command`, `super`, `win`: Aliased to `meta`.
*   `control`: Aliased to `ctrl`.
*   `option`: Aliased to `alt` (important for Mac `Option` key users).
*   `escape`: Aliased to `esc`.
*   `arrowup`, `arrowdown`, `arrowleft`, `arrowright`: For arrow keys (can also use `up`, `down`, `left`, `right` as aliases).

## Platform-Specific Behavior: `meta` vs. `ctrl`

Understanding how `meta` and `ctrl` are handled is vital for cross-platform consistency:

*   **Using `meta` (e.g., `hotkey: 'meta+c'`)**: This is the **recommended approach for common operating system level shortcuts** like copy, paste, save.
    *   **On macOS:** Interpreted as `Command+C` (⌘C).
    *   **On Windows/Linux:** ActionCore (via `useKeyBindings`) normalizes `meta` to `ctrl` in combinations, so it's interpreted as `Ctrl+C`.
    *   This provides the most natural user experience for these standard shortcuts.

*   **Using `ctrl` (e.g., `hotkey: 'ctrl+b'`)**: This explicitly targets the Control key.
    *   **On macOS:** Interpreted as `Control+B` (⌃B) – distinct from `Command+B`.
    *   **On Windows/Linux:** Interpreted as `Ctrl+B`.
    *   Use this when you specifically need the Control key on macOS, perhaps for shortcuts that don't have a direct Command key equivalent or to offer an alternative binding.

**In summary for platform conventions:**
*   For "Save", "Copy", "Paste", "Undo", "Redo": Use `meta+s`, `meta+c`, `meta+v`, `meta+z`, `meta+shift+z`.
*   For other shortcuts, decide if you need the Mac Command key behavior (use `meta`) or the literal Control key behavior on all platforms (use `ctrl`).

## Advanced Hotkey Options (`hotkeyOptions`)

The `hotkeyOptions` object in `ActionDefinition` allows fine-tuning for each hotkey binding:

```typescript
const actionWithOptions: ActionDefinition = {
  id: 'editor.submitComment',
  title: 'Submit Comment',
  hotkey: 'ctrl+enter',
  hotkeyOptions: {
    preventDefault: true,
    stopPropagation: false,
    ignoreKeyRepeat: true,
  },
  handler: () => { /* ... */ }
};
```

*   **`preventDefault?: boolean`** (Default: `false`)
    *   If `true`, `event.preventDefault()` is called when the hotkey triggers. Essential for overriding default browser actions (e.g., `Ctrl+S` opening the browser's save dialog if you have a custom save action).
    *   Note: Some browser-level shortcuts (e.g., `Cmd+T` for new tab) may not be preventable.

*   **`stopPropagation?: boolean`** (Default: `false`)
    *   If `true`, `event.stopPropagation()` is called. Useful to prevent the event from bubbling up or being caught by other listeners, especially in complex DOM structures or nested components.

*   **`ignoreKeyRepeat?: boolean`** (Default: `false`)
    *   If `true`, the hotkey handler only triggers for the initial `keydown` event and ignores subsequent `keydown` events while the key is held down (`event.repeat === true`). Set this to `true` for most actions to prevent them from firing multiple times if a user holds down a key combination.

## Hotkeys in Text Inputs (`runInTextInput`)

By default, ActionCore (via `useKeyBindings`) blocks most hotkeys when a text input (`<input>`, `<textarea>`, contentEditable elements) is focused to prevent interference with typing. The `runInTextInput` property provides granular control over this behavior.

*   **Type:** `boolean | 'only' | string | string[] | ((element: Element | null) => boolean)`
*   **Default (if `runInTextInput` is `undefined`):** Hotkey is generally blocked in inputs.

*   **`true`**: The hotkey **will run** even if an input is focused. Ideal for text-editing shortcuts (e.g., `Ctrl+B` for bolding text within an editor).
    ```typescript
    hotkey: 'ctrl+b', runInTextInput: true
    ```

*   **`false`**: The hotkey will **not run** if any input is focused. This explicitly enforces the blocking behavior.

*   **`'only'`**: The hotkey will **only run if a text input element is focused**. Useful for actions that are exclusively for text editing contexts (e.g., an `Enter` key action to submit a form field that should not trigger globally).
    ```typescript
    hotkey: 'enter', runInTextInput: 'only'
    ```

*   **`string` (input name):** The hotkey runs only if the focused input's `name` attribute matches the provided string.
    ```typescript
    // Hotkey active only if <input name="searchQuery"> is focused
    hotkey: 'enter', runInTextInput: 'searchQuery'
    ```

*   **`string[]` (array of input names):** The hotkey runs if the focused input's `name` matches any of the strings in the array.

*   **`((element: Element | null) => boolean)` (Predicate function):** The most flexible option. The hotkey runs if the function returns `true`. The function receives the `document.activeElement`.
    ```typescript
    hotkey: 'ctrl+shift+e',
    runInTextInput: (el) => el?.classList.contains('custom-editor-field') ?? false
    ```

**Best Practices for Hotkeys:**

*   **Consistency:** Adhere to platform conventions and application-wide patterns.
*   **Discoverability:** Ensure users can find out what hotkeys are available (e.g., through tooltips, help menus, or a component like Vuetify's `<VHotKey>`).
*   **Avoid Conflicts:** Test thoroughly to prevent clashes with browser/OS shortcuts or other actions.
*   **User Intent:** For actions in inputs, carefully consider if the hotkey should aid text input (use `runInTextInput: true` or a specific matcher) or if it's a global action that should be temporarily suspended.
*   **`preventDefault` judiciously:** Use it when you *need* to override native browser behavior that shares the same shortcut.

By mastering these hotkey definition features, you can create a highly efficient and intuitive keyboard interface for your ActionCore-powered application.

---

Next: [**Executing Actions & Context**](./05-action-execution.md)
