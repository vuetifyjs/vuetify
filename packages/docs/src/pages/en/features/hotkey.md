---
emphasized: true
meta:
  title: Hotkey composable
  description: Handle keyboard shortcuts within your application using the useHotkey composable
  keywords: hotkeys, keyboard shortcuts, composable, useHotkey, key bindings
related:
  - /components/hotkeys/
  - /features/accessibility/
  - /features/global-configuration/
features:
  github: /composables/hotkey.ts
  label: 'E: useHotkey'
  report: true
---

# Hotkey composable

Handle keyboard shortcuts within your application using the **useHotkey** composable. This composable provides a simple and powerful way to register keyboard shortcuts that work across different platforms and input contexts.

<PageFeatures />

<PromotedEntry />

## Usage

The **useHotkey** composable takes a key combination string and a callback function. It automatically handles platform differences, key sequences, and provides options for customizing behavior.

<ExamplesExample file="hotkey/usage" />

## API

| Composable | Description |
| - | - |
| [useHotkey](/api/use-hotkey/) | The useHotkey composable |

<ApiInline hide-links />

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

## Key combination syntax

The hotkey string supports various modifiers and special keys:

### Modifiers

- <v-kbd>ctrl</v-kbd> - Control key (all platforms)
- <v-kbd>cmd</v-kbd> - Command key (Mac) / Control key (PC) - recommended for cross-platform
- <v-kbd>meta</v-kbd> - Meta key (Command key on Mac, Windows key on PC)
- <v-kbd>alt</v-kbd> - Alt key (all platforms)
- <v-kbd>shift</v-kbd> - Shift key (all platforms)

### Special keys

- <v-kbd>enter</v-kbd>, <v-kbd>escape</v-kbd>, <v-kbd>tab</v-kbd>, <v-kbd>space</v-kbd>, <v-kbd>backspace</v-kbd>, <v-kbd>delete</v-kbd>
- <v-kbd>arrowup</v-kbd>, <v-kbd>arrowdown</v-kbd>, <v-kbd>arrowleft</v-kbd>, <v-kbd>arrowright</v-kbd>
- <v-kbd>home</v-kbd>, <v-kbd>end</v-kbd>, <v-kbd>pageup</v-kbd>, <v-kbd>pagedown</v-kbd>
- <v-kbd>f1</v-kbd> through <v-kbd>f12</v-kbd>

### Syntax rules

- Use `+` to combine modifiers with keys: `ctrl+s`
- Use `-` to create sequences: `ctrl+k-p` (press Ctrl+K, then P)
- Keys are case-insensitive: `Ctrl+S` equals `ctrl+s`
- Spaces are ignored: `ctrl + s` equals `ctrl+s`

## Manual cleanup

The composable automatically manages cleanup during the Vue component's unmount lifecycle event. If you need to perform manual cleanup, you can save the cleanup function returned by the composable. Executing this function will remove the hotkey listener.

```js
const cleanup = useHotkey('ctrl+s', () => {
  console.log('Save action')
})

// Later, manually cleanup
cleanup()
```
