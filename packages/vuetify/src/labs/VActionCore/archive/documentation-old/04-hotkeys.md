# 4. Mastering Hotkeys

Keyboard hotkeys are a hallmark of productive and accessible applications. ActionCore provides a sophisticated, yet easy-to-use system for defining hotkeys associated with your actions, built upon the simplified `useKeyBindings` composable. This guide delves into the nuances of hotkey definition, platform considerations, and advanced configurations to help you craft an intuitive keyboard-driven experience.

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
    // ignoreKeyRepeat?: boolean; // Note: ignoreKeyRepeat is not directly passed to the simplified useKeyBindings
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

*   **Key Combinations (Modifiers):** Combine modifier keys (`Ctrl`, `Alt`, `Shift`, `Meta/Cmd`) with other keys using `_` or `+`.
    ```typescript
    hotkey: 'ctrl_s'       // Control + S (or ctrl+s)
    hotkey: 'meta+shift+z' // Command/Windows Key + Shift + Z
    hotkey: 'alt_o'         // Alt + O (Option + O on macOS)
    ```
    The order of modifiers (e.g., `ctrl_shift_s` vs. `shift_ctrl_s`) does not matter.

*   **Key Sequences:** For actions triggered by a sequence of key presses (e.g., press 'g' then 'i' to go to inbox), separate keys with a `-`.
    ```typescript
    hotkey: 'g-i'          // Press g, then i
    hotkey: 'ctrl_k-ctrl_x' // Press Ctrl+K, then Ctrl+X
    ```
    `useKeyBindings` has a default timeout (around 800ms) for completing a sequence.

### Multiple Hotkeys for One Action

You can assign multiple hotkeys to a single action by providing an array of strings:

```typescript
const openSettingsAction: ActionDefinition = {
  id: 'settings.open',
  title: 'Open Settings',
  hotkey: ['ctrl_,', 'meta_,', 'f10'], // Ctrl/Cmd + Comma, or F10
  handler: () => { /* ... */ }
};
```
This is useful for providing common platform-specific alternatives (like `Ctrl_,` on Windows/Linux and `Cmd_,` on macOS for settings) or simply multiple ways to trigger the same command.

## Key Names and Aliases

Key names generally follow `KeyboardEvent.key` values, normalized to lowercase. `useKeyBindings` handles minimal internal aliasing (e.g., `esc` for `escape`, `cmd` for `meta`).

**Commonly Used Modifiers & Aliases:**

*   `meta`: Represents Command (⌘) on macOS and Windows/Super key on others. Normalized to `ctrl` on non-Mac for combinations by `useKeyBindings` if `ctrl` isn't also specified.
*   `ctrl`: Control key.
*   `alt`: Alt key (Option `⌥` on macOS).
*   `shift`: Shift key.
*   `cmd`, `command`: Aliased to `meta` during parsing by `useKeyBindings`.
*   `control`: Aliased to `ctrl` by `useKeyBindings`.
*   `option`: Aliased to `alt` by `useKeyBindings`.

## Platform-Specific Behavior: `meta` vs. `ctrl`

Understanding how `meta` and `ctrl` are handled is vital for cross-platform consistency:

*   **Using `meta` (e.g., `hotkey: 'meta_s'`)**: Recommended for common OS-level shortcuts.
    *   **On macOS:** Interpreted as `Command_S`.
    *   **On Windows/Linux:** `useKeyBindings` (used by ActionCore) normalizes `meta` to `ctrl` in combinations, effectively making it `Ctrl_S`.
    *   This provides the most natural user experience for these standard shortcuts.

*   **Using `ctrl` (e.g., `hotkey: 'ctrl_b'`)**: Explicitly targets the Control key.
    *   **On macOS:** Interpreted as `Control_B` (⌃B) – distinct from `Command_B`.
    *   **On Windows/Linux:** Interpreted as `Ctrl_B`.
    *   Use this when you specifically need the Control key on macOS, perhaps for shortcuts that don't have a direct Command key equivalent or to offer an alternative binding.

**In summary for platform conventions:**
*   For "Save", "Copy", "Paste", "Undo", "Redo": Use `meta_s`, `meta_c`, `meta_v`, `meta_z`, `meta_shift_z`.
*   For other shortcuts, decide if you need the Mac Command key behavior (use `meta`) or the literal Control key behavior on all platforms (use `ctrl`).

## Advanced Hotkey Options (`hotkeyOptions`)

The `hotkeyOptions` object in `ActionDefinition` allows fine-tuning for each hotkey binding:

```typescript
const actionWithOptions: ActionDefinition = {
  id: 'editor.submitComment',
  title: 'Submit Comment',
  hotkey: 'ctrl_enter',
  hotkeyOptions: {
    preventDefault: true,
    stopPropagation: false,
    // ignoreKeyRepeat: true, // This is no longer a direct option for useKeyBindings
  },
  handler: () => { /* ... */ }
};
```

*   **`preventDefault?: boolean`** (Default: `false`)
    *   If `true`, `event.preventDefault()` is called when the hotkey triggers. This is essential for overriding default browser actions (e.g., `Ctrl_S` opening the browser's save dialog if you have a custom save action, or `Cmd_K` focusing the browser's search bar).
    *   **Recommendation**: Set to `true` for most hotkeys that might conflict with standard browser behavior or when you want to ensure the action is the sole result of the hotkey.
    *   Note: Some browser-level shortcuts (e.g., `Cmd_T` for a new tab on macOS) may not be preventable by web applications.

*   **`stopPropagation?: boolean`** (Default: `false`)
    *   If `true`, `event.stopPropagation()` is called when the hotkey triggers. This prevents the event from bubbling up to parent DOM elements or being processed by other event listeners attached to the same element (especially those registered in later phases or by different parts of the system).
    *   **Use with Caution**: While useful for isolating event handling in complex DOM structures or nested components, `stopPropagation: true` should be used sparingly.
    *   **Potential Issues**:
        *   It can interfere with other parts of your application or third-party libraries that might rely on listening to the same events.
        *   **Crucially, when multiple ActionCore actions share the same hotkey and rely on contextual evaluation (via `canExecute` or `runInTextInput`) to determine the active handler, `stopPropagation: true` on one of those actions can prevent ActionCore from correctly evaluating other candidate actions for the same hotkey.** This was observed where a `Cmd_S` hotkey shared by two actions failed to trigger the appropriate contextual action when `stopPropagation: true` was enabled.
    *   **Recommendation**: Only set `stopPropagation: true` if you have a specific, well-understood reason to prevent the event from reaching other listeners and have tested its impact, especially if the hotkey is shared or involves complex contextual logic. In many cases, `preventDefault: true` is sufficient for managing hotkey behavior. If unsure, start with `stopPropagation: false`.

**Note on `ignoreKeyRepeat`**: The simplified `useKeyBindings` does not directly accept an `ignoreKeyRepeat` option per shortcut. If you need to prevent an action from firing multiple times on key repeat, this logic would need to be implemented within the action's `handler` by checking `event.repeat`.

## Hotkeys in Text Inputs (`runInTextInput`)

By default, ActionCore (via `useKeyBindings`) blocks most hotkeys when a text input (`<input>`, `<textarea>`, contentEditable elements) is focused to prevent interference with typing. The `runInTextInput` property provides granular control over this behavior.

*   **Type:** `boolean | 'only' | string | string[] | ((element: Element | null) => boolean)`
*   **Default (if `runInTextInput` is `undefined`):** Hotkey is generally blocked in inputs.

*   **`true`**: The hotkey **will run** even if an input is focused. Ideal for text-editing shortcuts (e.g., `Ctrl_B` for bolding text within an editor).
    ```typescript
    hotkey: 'ctrl_b', runInTextInput: true
    ```

*   **`false`**: The hotkey will **not run** if any input is focused. This explicitly enforces the blocking behavior.

*   **`'only'`:** The hotkey will **only run if a text input element is focused**. Useful for actions that are exclusively for text editing contexts (e.g., an `Enter` key action to submit a form field that should not trigger globally).
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
    hotkey: 'ctrl_shift_e',
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

## Debugging ActionCore

### Verbose Logging

ActionCore includes an optional verbose logging feature to help diagnose issues, particularly with hotkey registration and execution flow. When enabled, detailed logs are output to the browser console.

**Enabling Verbose Logging:**

To enable verbose logging, pass the `verboseLogging: true` option when initializing `ActionCore` via `useActionCore()`:

```typescript
// Example: typically in your main application setup or a specific playground
import { useActionCore } from '@/labs/VActionCore';
import type { ActionCoreOptions } from '@/labs/VActionCore/types';

const actionCoreOptions: ActionCoreOptions = {
  // ... other options ...
  verboseLogging: true,
};

const actionCore = useActionCore(actionCoreOptions);
```

**What it Logs:**

When enabled, verbose logging provides insights into:
*   Hotkey registration attempts for each action and binding.
*   The options being used for each hotkey binding.
*   When a hotkey is triggered.
*   The evaluation steps for `runInTextInput` conditions, showing the active element and the outcome.
*   The evaluation of `action.disabled` status.
*   The evaluation of `canExecute()` conditions and their results.
*   Confirmation before an action handler is executed.
*   Warnings for conditions that block hotkey execution (e.g., action not found, `canExecute` returning false, etc.).

This detailed output can be invaluable for understanding why a specific hotkey might not be behaving as expected.

Next: [**Executing Actions & Context**](./05-action-execution.md)
