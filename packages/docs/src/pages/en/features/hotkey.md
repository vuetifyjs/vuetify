---
emphasized: true
meta:
  nav: Hotkeys
  title: Hotkeys
  description: Handle keyboard shortcuts within your application using the useHotkey composable
  keywords: hotkeys, keyboard shortcuts, composable, useHotkey, key bindings
related:
  - /components/hotkeys/
  - /features/accessibility/
  - /features/global-configuration/
features:
  github: /composables/hotkey
  label: 'E: hotkey'
  report: true
---

# Hotkeys

Provides a simple and powerful way to register keyboard shortcuts that work across different platforms and input contexts.

::: info
This is a new feature! Be sure to [report any issues you may encounter](https://issues.vuetifyjs.com/).
:::

<PageFeatures />

<PromotedEntry />

::: success
This feature was introduced in [v3.9.0](/getting-started/release-notes/?version=v3.9.0)
:::

## Quick start

To get started, import the `useHotkey` composable:

```html { resource="path/to/Component.vue"}
<script setup>
  import { useHotkey } from 'vuetify'

  useHotkey('ctrl+s', () => {
    console.log('Save action')
  })
</script>
```

## Usage

The **hotkey** composable takes a key combination string and a callback function. It automatically handles platform differences, key sequences, and provides options for customizing behavior.

<ExamplesUsage name="hotkey" />

## API

| Composable | Description |
| - | - |
| [useHotkey](/api/use-hotkey/) | The useHotkey composable |

## Guide

The `useHotkey` composable provides a declarative way to handle keyboard shortcuts in your Vue applications. It automatically cleans up event listeners when components are unmounted and supports reactive key combinations.

### Basic hotkeys

Register simple keyboard shortcuts by passing a key combination string and callback function:

<ExamplesExample file="hotkey/basic" />

### Key sequences

Create multi-step keyboard shortcuts by separating keys with dashes. Users must press keys in sequence within the timeout period:

<ExamplesExample file="hotkey/sequences" />

### Platform awareness

The composable automatically handles platform differences. Use `cmd` for cross-platform compatibility or specific modifiers for platform-specific behavior:

<ExamplesExample file="hotkey/platform" />

### Reactive hotkeys

Key combinations can be reactive, allowing you to change hotkeys dynamically:

<ExamplesExample file="hotkey/reactive" />

### Options

Customize hotkey behavior with options for event type, input handling, and more:

<ExamplesExample file="hotkey/options" />

## Configuration options

The `useHotkey` composable accepts an optional third parameter of type `HotkeyOptions` to customize its behavior:

```typescript
interface HotkeyOptions {
  event?: 'keydown' | 'keyup'
  inputs?: boolean
  preventDefault?: boolean
  sequenceTimeout?: number
}
```

### Event type

Control which keyboard event triggers the hotkey:

```js
// Trigger on key press (default)
useHotkey('ctrl+s', handleSave, { event: 'keydown' })

// Trigger on key release
useHotkey('ctrl+s', handleSave, { event: 'keyup' })
```

**When to use:**

- `keydown`: For actions that should trigger immediately when pressed (most common)
- `keyup`: For actions that should wait until the key is released, useful for preventing repeated triggers

### Input handling

By default, hotkeys are disabled when input elements are focused to prevent conflicts with typing:

```js
// Default: hotkeys disabled in input fields
useHotkey('ctrl+s', handleSave)

// Allow hotkeys even when inputs are focused
useHotkey('ctrl+s', handleSave, { inputs: true })
```

**Best practices:**

- Keep `inputs: false` (default) for global shortcuts like save/copy/paste
- Use `inputs: true` for application-specific shortcuts that should work everywhere
- Consider using different key combinations for input-specific actions

### Prevent default behavior

Control whether the browser's default behavior for the key combination is prevented:

```js
// Prevent browser default (recommended for most cases)
useHotkey('ctrl+s', handleSave, { preventDefault: true })

// Allow browser default behavior
useHotkey('f5', handleRefresh, { preventDefault: false })
```

**When to disable:**

- When you want to enhance rather than replace browser behavior
- For accessibility keys that should maintain their original function
- When testing or debugging hotkey interactions

### Sequence timeout

For key sequences, control how long users have between keystrokes:

```js
// Default: 1 second between sequence steps
useHotkey('ctrl+k-p', openPalette)

// Faster timeout for expert users
useHotkey('ctrl+k-p', openPalette, { sequenceTimeout: 500 })

// Longer timeout for accessibility
useHotkey('ctrl+k-p', openPalette, { sequenceTimeout: 2000 })
```

## Key combination syntax

The hotkey string supports various modifiers and special keys:

### Modifiers

- <v-kbd>cmd</v-kbd> / <v-kbd>meta</v-kbd> - Command key (Mac) / Control key (PC) - **recommended over <v-kbd>ctrl</v-kbd> for cross-platform**
- <v-kbd>ctrl</v-kbd> - Control key (all platforms)
- <v-kbd>alt</v-kbd> - Alt key (all platforms)
- <v-kbd>shift</v-kbd> - Shift key (all platforms)

### Special keys

- <v-kbd>enter</v-kbd>, <v-kbd>escape</v-kbd>, <v-kbd>tab</v-kbd>, <v-kbd>space</v-kbd>, <v-kbd>backspace</v-kbd>, <v-kbd>delete</v-kbd>
- <v-kbd>arrowup</v-kbd>, <v-kbd>arrowdown</v-kbd>, <v-kbd>arrowleft</v-kbd>, <v-kbd>arrowright</v-kbd>
- <v-kbd>home</v-kbd>, <v-kbd>end</v-kbd>, <v-kbd>pageup</v-kbd>, <v-kbd>pagedown</v-kbd>
- <v-kbd>f1</v-kbd> through <v-kbd>f12</v-kbd>

### Syntax rules

- Parsing is performed left to right, so `ctrl+s-a` will produce "`ctrl+s` and then `a`"
- Use `+` to combine modifiers with keys: `ctrl+s`
- Use `-` to create sequences: `ctrl+k-p` (press Ctrl+K, then P)
- Keys are case-insensitive: `Ctrl+S` equals `ctrl+s`
- Spaces are ignored: `ctrl + s` equals `ctrl+s`

Check out [all possible keycodes](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values).

## Manual cleanup

The composable automatically manages cleanup during the Vue component's unmount lifecycle event. If you need to perform manual cleanup, you can save the cleanup function returned by the composable. Executing this function will remove the hotkey listener.

```js
const cleanup = useHotkey('ctrl+s', () => {
  console.log('Save action')
})

// Later, manually cleanup
cleanup()
```

## Avoiding key binding conflicts

Prevent conflicts by avoiding reserved shortcuts and organizing hotkeys systematically:

### Common conflicts to avoid

```js
// ❌ Browser shortcuts
useHotkey('f5', handleAction)        // Refresh
useHotkey('ctrl+t', handleAction)    // New tab
useHotkey('ctrl+w', handleAction)    // Close tab

// ❌ OS shortcuts
useHotkey('alt+tab', handleAction)   // Window switching

// ✅ Safe alternatives
useHotkey('cmd+shift+r', handleAction)
useHotkey('cmd+k-t', handleAction)
useHotkey('alt+1', handleAction)
```

## Best practices

::: info
Hotkeys are a powerful feature, but they utilize APIs that are managed by the browser and the operating system. The reliability of the key bindings you make are subject to factors that can be difficult to control. It's recommended you test your key bindings in the browsers and operating systems you are targeting.
:::

- **Test cross-platform**: _Verify shortcuts work_ on Windows, macOS, and Linux!
- **Use modifier combinations**: Prefer `Ctrl+Shift+Key` for custom actions
- **Document your shortcuts**: Maintain a list of all application hotkeys in your application
