# ActionCore Hotkey Specification Guide

This guide provides comprehensive instructions on how to define hotkeys for actions within the Vuetify ActionCore system. Understanding these conventions is crucial for creating intuitive and platform-aware keyboard shortcuts.

## Table of Contents

1.  [Basic Hotkey Syntax](#basic-hotkey-syntax)
    *   [Single Keys](#single-keys)
    *   [Key Combinations (Modifiers)](#key-combinations-modifiers)
    *   [Key Sequences](#key-sequences)
2.  [Key Names and Aliases](#key-names-and-aliases)
    *   [Common Modifiers: `meta`, `ctrl`, `alt`, `shift`](#common-modifiers-meta-ctrl-alt-shift)
3.  [Platform-Specific Behavior (macOS vs. Other)](#platform-specific-behavior-macos-vs-other)
    *   [The `meta` Key (Cmd/Super/Win)](#the-meta-key-cmdsuperwin)
    *   [The `ctrl` Key](#the-ctrl-key)
    *   [The `alt` Key (Option on macOS)](#the-alt-key-option-on-macos)
    *   [Recommendations](#recommendations)
4.  [Multiple Hotkeys for One Action](#multiple-hotkeys-for-one-action)
5.  [Advanced Hotkey Options (`hotkeyOptions`)](#advanced-hotkey-options-hotkeyoptions)
    *   [`preventDefault`](#preventdefault)
    *   [`stopPropagation`](#stoppropagation)
    *   [`ignoreKeyRepeat`](#ignorekeyrepeat)
6.  [Hotkeys in Text Inputs (`runInTextInput`)](#hotkeys-in-text-inputs-runintextinput)
7.  [Displaying Hotkeys with `VHotKey`](#displaying-hotkeys-with-vhotkey)
    *   [Automatic Platform-Aware Display](#automatic-platform-aware-display)
    *   [The `displayMode` Prop](#the-displaymode-prop)
    *   [Accessibility Considerations](#accessibility-considerations)
8.  [Best Practices](#best-practices)
9.  [How Hotkeys are Processed by ActionCore](#how-hotkeys-are-processed-by-actioncore)
10. [Dynamic Hotkeys with Action Profiling](#dynamic-hotkeys-with-action-profiling)
11. [Hotkey Conflicts](#hotkey-conflicts)

## 1. Basic Hotkey Syntax

Hotkeys are defined in the `hotkey` property of an `ActionDefinition`.

### Single Keys

For actions triggered by a single key press, simply provide the key name.

```typescript
// Example: Action triggered by pressing 'O'
const openFileAction: ActionDefinition = {
  id: 'file-open',
  title: 'Open File',
  hotkey: 'o',
  handler: () => { /* ... */ }
};
```

### Key Combinations (Modifiers)

Combine modifier keys (like `Ctrl`, `Alt`, `Shift`, `Meta/Cmd`) with other keys using the `+` symbol.

```typescript
// Example: Save action
const saveAction: ActionDefinition = {
  id: 'file-save',
  title: 'Save File',
  hotkey: 'ctrl+s', // On non-Mac, Meta+S will also trigger this if Meta is normalized to Ctrl
  handler: () => { /* ... */ }
};

// Example: Using multiple modifiers
const complexAction: ActionDefinition = {
  id: 'editor-complex-format',
  title: 'Complex Format',
  hotkey: 'ctrl+alt+shift+f',
  handler: () => { /* ... */ }
};
```
The order of modifiers in the string does not matter (e.g., `ctrl+shift+s` is the same as `shift+ctrl+s`).

### Key Sequences

For actions triggered by a sequence of key presses (e.g., "g then d"), use the `-` symbol to separate keys in the sequence.

```typescript
// Example: Go to Dashboard action
const goToDashboardAction: ActionDefinition = {
  id: 'nav-dashboard',
  title: 'Go to Dashboard',
  hotkey: 'g-d', // Press 'g', then 'd' in sequence
  handler: () => { /* ... */ }
};
```
There's a default timeout for completing a sequence (around 1500ms).

## 2. Key Names and Aliases

Key names are generally based on `KeyboardEvent.key` values, normalized to lowercase.
However, `useKeyBindings` (the underlying engine for ActionCore hotkeys) now defaults to using `event.code` (`preferEventCode: true`) for more layout-independent bindings. The extensive `defaultAliasMap` within `useKeyBindings.ts` translates common `event.code` values (e.g., `KeyA`, `Digit1`, `AltLeft`) back to simpler, expected key names (e.g., `a`, `1`, `alt`). This means you can usually define hotkeys using the simple key names.

Common aliases are provided for convenience:
*   `cmd`, `command`, `super`, `win`: Aliased to `meta`
*   `control`: Aliased to `ctrl`
*   `option`: Aliased to `alt` (very important for Mac compatibility, as Macs have an Option key)
*   `escape`: Aliased to `esc`
*   `up`: Aliased to `arrowup`
*   `down`: Aliased to `arrowdown`
*   `left`: Aliased to `arrowleft`
*   `right`: Aliased to `arrowright`

Special purpose aliases (use with care, see platform behavior):
*   `cmdorctrl`: Aliased to `meta`. On non-Mac systems, this `meta` will be further normalized to `ctrl` in combinations.
*   `primary`: Aliased to `meta`. Similar normalization behavior as `cmdorctrl`.

For a comprehensive list, refer to the `defaultAliasMap` in `useKeyBindings.ts`.

### Common Modifiers: `meta`, `ctrl`, `alt`, `shift`

These are the primary modifier keys. Their interpretation and display can be platform-specific, as detailed below.

## 3. Platform-Specific Behavior (macOS vs. Other)

ActionCore aims to provide intuitive behavior across platforms, especially regarding the Command (⌘) key on macOS and the Control key on Windows/Linux.

### The `meta` Key (Cmd/Super/Win)

*   When you specify `meta` (or its aliases like `cmd`, `command`) in a hotkey string for a **combination**:
    *   **On macOS:** It maps to the Command (⌘) key.
    *   **On Windows/Linux:** It is automatically normalized to the `ctrl` key.
    *   Example: `hotkey: 'meta+s'`
        *   macOS: Triggers with `Cmd+S`.
        *   Windows/Linux: Triggers with `Ctrl+S`.

### The `ctrl` Key

*   When you specify `ctrl` in a hotkey string:
    *   **On macOS:** It maps to the actual Control (⌃) key.
    *   **On Windows/Linux:** It maps to the Control key.
    *   Example: `hotkey: 'ctrl+z'`
        *   macOS: Triggers with `Control+Z`.
        *   Windows/Linux: Triggers with `Ctrl+Z`.

**Important Note:** `useKeyBindings` does *not* automatically convert a specified `ctrl` key to `meta` on macOS. If your hotkey string is `'ctrl+c'`, it will listen for the literal Control key on Mac, not Command. This is by design to allow distinguishing between `Cmd+C` and `Ctrl+C` on macOS if needed.

### The `alt` Key (Option on macOS)

*   Mac keyboards have an `Option` key, while Windows/Linux keyboards have an `Alt` key.
*   `useKeyBindings.ts` includes an alias: `option` is treated as `alt`.
*   Therefore, if you define a hotkey using `alt`, it will work correctly on all platforms:
    *   `hotkey: 'alt+s'`
        *   **On macOS:** Users press `Option+S`.
        *   **On Windows/Linux:** Users press `Alt+S`.
*   The `VHotKey` component will display this appropriately (e.g., `⌥S` on Mac, `Alt+S` elsewhere by default).

### Recommendations

*   For common actions like Save, Copy, Paste, Undo, prefer using `meta` in your hotkey definition (e.g., `meta+s`, `meta+c`). This provides the most natural experience (`Cmd+S` on Mac, `Ctrl+S` on Windows/Linux).
*   If you need a hotkey that explicitly uses the Control key on macOS (distinct from Cmd), define it using `ctrl` (e.g., `ctrl+alt+del`).
*   For actions involving the `Alt` or `Option` key, consistently use `alt` in your `ActionDefinition` (e.g., `alt+o`). `useKeyBindings` handles the `option` alias automatically for Mac users, and `VHotKey` will render the correct symbol/text.

## 4. Multiple Hotkeys for One Action

You can assign multiple hotkeys to a single action in two ways:

1.  **Comma-separated string:**
    ```typescript
    const anAction: ActionDefinition = {
      id: 'action-multi',
      title: 'Action with Multiple Hotkeys',
      hotkey: 'ctrl+a, alt+shift+x', // Hotkey 1: Ctrl+A, Hotkey 2: Alt+Shift+X
      handler: () => { /* ... */ }
    };
    ```

2.  **Array of strings:**
    ```typescript
    const anotherAction: ActionDefinition = {
      id: 'action-multi-array',
      title: 'Another Multi-Hotkey Action',
      hotkey: ['meta+b', 'ctrl+shift+alt+y', 'f10'], // Hotkey 1, Hotkey 2, Hotkey 3
      handler: () => { /* ... */ }
    };
    ```
    The first hotkey in an array is often considered the "primary" one for display purposes (e.g., by `VHotKey`).

## 5. Advanced Hotkey Options (`hotkeyOptions`)

The `hotkeyOptions` property in `ActionDefinition` allows fine-tuning of how an individual hotkey behaves. These options are passed directly to the underlying `useKeyBindings` system.

```typescript
const actionWithOptions: ActionDefinition = {
  id: 'action-opts',
  title: 'Action with Hotkey Options',
  hotkey: 'ctrl+enter',
  hotkeyOptions: {
    preventDefault: true,
    stopPropagation: false,
    ignoreKeyRepeat: true,
  },
  handler: () => { /* ... */ }
};
```

### `preventDefault`
*   **Type:** `boolean`
*   **Default:** `false`
*   If `true`, `event.preventDefault()` will be called when the hotkey is triggered. This is useful to stop the browser's default action for that key combination (e.g., `Ctrl+S` opening the browser's save dialog).
*   **Note:** Some browser-level shortcuts (especially those managed directly by the browser's UI like `Cmd+T` for new tab) might not be preventable even with this option.

### `stopPropagation`
*   **Type:** `boolean`
*   **Default:** `false`
*   If `true`, `event.stopPropagation()` will be called. This prevents the event from bubbling up the DOM tree or being caught by other listeners on parent elements.

### `ignoreKeyRepeat`
*   **Type:** `boolean`
*   **Default:** `false` (meaning repeated keydown events for a held key can trigger the hotkey multiple times if not debounced/throttled).
*   If `true`, the hotkey handler will only be triggered for the initial `keydown` event and will ignore subsequent `keydown` events that occur while the key is held down (where `event.repeat` is true).

## 6. Hotkeys in Text Inputs (`runInTextInput`)

The `runInTextInput` property controls if a hotkey should be active when a text input element (`<input>`, `<textarea>`, contentEditable elements) is focused.

*   **Type:** `boolean | 'only' | string | string[] | ((element: Element | null) => boolean)`
*   **Default Behavior (if `runInTextInput` is `undefined`):** Most hotkeys are blocked by default when an input is focused to prevent conflicts with typing. `useKeyBindings` uses an `inputBlockerFn` which by default denies hotkeys in inputs.
*   **Values:**
    *   `true`: The hotkey *will* run even if an input is focused (overrides default blocking). Use for text-editing specific shortcuts like `Ctrl+B` for bold.
    *   `false`: The hotkey will *not* run if an input is focused. This is often redundant if the default input blocking behavior is already desired.
    *   `'only'`: The hotkey will *only* run if a text input (any text input) is focused.
    *   `string`: The hotkey will only run if the focused input's `name` attribute matches the provided string.
    *   `string[]`: The hotkey will only run if the focused input's `name` attribute matches one of the strings in the array.
    *   `(element: Element | null) => boolean`: A custom predicate function. The hotkey runs if the function returns `true`. The function receives the focused element.

```typescript
// Example: Submit action that only runs if a specific input is focused
const submitCommentAction: ActionDefinition = {
  id: 'comment-submit',
  title: 'Submit Comment',
  hotkey: 'enter',
  runInTextInput: (el) => el === document.getElementById('comment-textarea'),
  handler: () => { /* ... */ }
};

// Example: Global save that also works in inputs
const globalSaveAction: ActionDefinition = {
  id: 'global-save',
  title: 'Global Save',
  hotkey: 'meta+s',
  runInTextInput: true, // Allows Cmd/Ctrl+S even if in an input
  hotkeyOptions: { preventDefault: true },
  handler: () => { /* ... */ }
};
```

## 7. Displaying Hotkeys with `VHotKey`

The `<VHotKey>` component is designed to display hotkeys to the user.

### Automatic Platform-Aware Display
*   It attempts to show the platform-correct representation:
    *   `meta` key: `⌘` on macOS, `Ctrl` on other platforms.
    *   `alt` key: `⌥` on macOS (as Mac keyboards have `Option`), `Alt` on other platforms.
    *   `ctrl` key: `Ctrl` on all platforms (or `⌃` if a more compact symbol is preferred for Mac in future updates, but currently `Ctrl`).
    *   Other keys like `Shift`, `Enter`, arrow keys are displayed with common symbols (e.g., `↑`) or text.
*   It uses the `actionId` prop to look up the action and its hotkey from ActionCore. If an action has multiple hotkeys defined in an array, `VHotKey` typically displays the first one.
*   Alternatively, an explicit `hotkey` string can be passed directly to the component.

### The `displayMode` Prop

`VHotKey` accepts a `displayMode` prop to customize how keys are rendered:
*   **Type:** `'symbol' | 'text'`
*   **Default:** `'symbol'`

*   `displayMode: 'symbol'` (Default):
    *   Displays common symbols for modifier and special keys (e.g., `⌘`, `⌥`, `Ctrl`, `Shift`, `↑`, `Esc`).
    *   Example: `meta+alt+s` on Mac would display as `⌘⌥S`.
*   `displayMode: 'text'`:
    *   Displays the full text names for modifier keys.
    *   Example: `meta+alt+s` on Mac would display as `Command+Option+S`.
    *   Example: `meta+s` on Windows would display as `Control+S`.

```vue
<template>
  <VBtn>
    Save Editor
    <!-- Default symbol display -->
    <VHotKey action-id="save-editor-action" />
  </VBtn>

  <span>Open Menu: <VHotKey hotkey="alt+o" display-mode="text" /></span>
</template>
```

### Accessibility Considerations
*   The root element of `VHotKey` has `role="group"` and an `aria-label` describing the full hotkey string (e.g., "Hotkey: Command+S").
*   When `displayMode` is `'symbol'` and a symbolic representation is used (e.g., `⌘`, `⌥`, `↑`), individual `<kbd>` elements within `VHotKey` are given an `aria-label` with the full text name of that key part (e.g., `<kbd aria-label="Command">⌘</kbd>`). This ensures screen readers announce the key names clearly even when symbols are visually displayed.
*   When `displayMode` is `'text'`, the displayed text is self-descriptive, so additional `aria-label` attributes on individual key parts are generally not needed.

## 8. Best Practices

*   **Clarity and Convention:** Choose hotkeys that are common or intuitive for the action they perform (e.g., `meta+s` for save).
*   **Avoid Conflicts:** Be mindful of standard browser and OS shortcuts. Test your hotkeys thoroughly.
*   **`preventDefault`:** Use `hotkeyOptions: { preventDefault: true }` judiciously for hotkeys that are likely to conflict with browser defaults you want to override (like `Ctrl+P` for print if you have a custom print action).
*   **Test Across Platforms:** If your application targets multiple operating systems, test your hotkey behavior on each, especially those involving `meta` or `ctrl`.
*   **Provide Feedback:** Ensure users know what hotkeys are available, perhaps through tooltips, menus, or a dedicated help section incorporating `<VHotKey>`.
*   **Accessibility:** Clearly communicate hotkeys. Ensure that all functionality accessible via hotkeys is also accessible via other means (e.g., mouse clicks).

## 9. How Hotkeys are Processed by ActionCore

When you register actions with `ActionCore`:
1.  The `allActions` computed property aggregates all action definitions.
2.  Whenever `allActions` changes (e.g., due to registration, unregistration, or active profile change), a process is triggered to update hotkey bindings.
3.  For each action in `allActions` that has a `hotkey` property:
    *   Any existing hotkey bindings for that action's ID are first unregistered.
    *   New bindings are registered with the `useKeyBindings` service using the `hotkey` string and `hotkeyOptions` from the (effective) `ActionDefinition`.
    *   `ActionCore` determines whether the hotkey should be blocked in text inputs based on the `runInTextInput` property and passes an appropriate `ignoreInputBlocker` option to `useKeyBindings`.
4.  When a registered hotkey is triggered by `useKeyBindings`:
    *   The callback provided by `ActionCore` is invoked.
    *   This callback re-fetches the action by its ID (to get the latest state).
    *   It checks the action's `disabled` status and `canExecute(context)` method (if defined).
    *   It evaluates `runInTextInput` rules against the currently focused element.
    *   If all checks pass, `actionCore.executeAction(actionId, { trigger: 'hotkey', event })` is called.

## 10. Dynamic Hotkeys with Action Profiling

ActionCore now supports a native profiling system. If an `ActionDefinition` includes a `profiles` object, its `hotkey` (and other properties like `title` or `handler`) can be overridden when a specific profile is activated using `actionCore.setActiveProfile('profileName')`.

When the active profile changes:
1.  `ActionCore` re-evaluates the effective definitions for all actions.
2.  The `hotkey` property from the active profile (or the base definition if no profile applies) is used.
3.  The `processAndRegisterHotkeys` logic automatically unregisters the old hotkey (if it changed) and registers the new one.

This means that a single action ID can have different hotkeys active depending on the current global profile, and `VHotKey` components using `action-id` will reflect these changes automatically.

## 11. Hotkey Conflicts

Hotkey conflicts can occur when multiple actions have the same hotkey. To avoid conflicts, ensure that:
1.  Actions with the same hotkey are distinct in their functionality.
2.  Hotkeys are unique across the application.
3.  Conflicts are resolved through profiling or by explicitly defining different hotkeys for similar actions.
