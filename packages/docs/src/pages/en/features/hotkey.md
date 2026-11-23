---
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

The `useHotkey` composable calls a function when the user presses a key combination.

<PageFeatures />

<PromotedEntry />

## Quick start

```html { resource="path/to/Component.vue"}
<script setup>
  import { useHotkey } from 'vuetify'

  useHotkey('ctrl+s', () => {
    console.log('Save action')
  })
</script>
```

## Usage

The listener is attached to `window` and removed when the component unmounts.

<ExamplesUsage name="hotkey" />

## API

| Composable | Description |
| - | - |
| [useHotkey](/api/use-hotkey/) | The useHotkey composable |

## Guide

### Basic hotkeys

<ExamplesExample file="hotkey/basic" />

### Key sequences

Separate steps with a dash. The user has one second to press each next step, see **sequenceTimeout** below.

<ExamplesExample file="hotkey/sequences" />

### Platform awareness

`cmd` and `meta` match <v-kbd>⌘</v-kbd> on Mac and <v-kbd>Ctrl</v-kbd> elsewhere. Use them for shortcuts that should follow platform conventions, and `ctrl` when you mean the Control key on every platform.

<ExamplesExample file="hotkey/platform" />

### Reactive hotkeys

Pass a ref or a getter to change the combination at runtime. An empty value removes the listener.

<ExamplesExample file="hotkey/reactive" />

### Options

The third argument takes options. Each of them also accepts a ref.

| Option | Default | Description |
| - | - | - |
| **event** | `'keydown'` | With `'keydown'`, holding the keys calls the function repeatedly. `'keyup'` calls it once, on release |
| **inputs** | `false` | Hotkeys are ignored while an input, textarea or contenteditable element has focus. Set to `true` for shortcuts such as <v-kbd>Ctrl</v-kbd>+<v-kbd>S</v-kbd> that should work while typing |
| **preventDefault** | `true` | Set to `false` to keep the browser's own action for the same keys |
| **sequenceTimeout** | `1000` | Milliseconds allowed between the steps of a sequence |

<ExamplesExample file="hotkey/options" />

## Key combination syntax

- `+` or `_` combines keys: `ctrl+s`, `ctrl_s`
- `/` separates alternatives: `ctrl+k/ctrl+f`, `up/down`
- `-` separates the steps of a sequence: `ctrl+k-p` is <v-kbd>Ctrl</v-kbd>+<v-kbd>K</v-kbd>, then <v-kbd>P</v-kbd>
- Alternatives bind tighter than sequences: `ctrl+k/ctrl+f-p` is <v-kbd>Ctrl</v-kbd>+<v-kbd>K</v-kbd> or <v-kbd>Ctrl</v-kbd>+<v-kbd>F</v-kbd>, then <v-kbd>P</v-kbd>
- Keys are case-insensitive

Modifiers are `ctrl`, `shift`, `alt` and `cmd` / `meta`. Any other key is matched by its [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values) value, such as `enter`, `arrowup` or `f1`.

Aliases cover keys that are long to type or collide with the syntax:

| Alias | Key |
| - | - |
| `up`, `down`, `left`, `right` | Arrow keys |
| `esc`, `space`, `return`, `del` | <v-kbd>Escape</v-kbd>, <v-kbd>Space</v-kbd>, <v-kbd>Enter</v-kbd>, <v-kbd>Delete</v-kbd> |
| `control`, `command`, `option` | `ctrl`, `cmd`, `alt` |
| `plus`, `slash`, `underscore`, `minus` / `hyphen` | <v-kbd>+</v-kbd>, <v-kbd>/</v-kbd>, <v-kbd>_</v-kbd>, <v-kbd>-</v-kbd> |

## Manual cleanup

`useHotkey` returns a function that removes the listener. Call it when you register a hotkey outside of a component's setup, or need to remove it before unmount.

```js
const cleanup = useHotkey('ctrl+s', save)

cleanup()
```

## Key binding conflicts

The operating system handles some shortcuts, such as <v-kbd>Alt</v-kbd>+<v-kbd>Tab</v-kbd>, before the page sees them. Browsers also keep a few for themselves, such as <v-kbd>Ctrl</v-kbd>+<v-kbd>T</v-kbd> and <v-kbd>Ctrl</v-kbd>+<v-kbd>W</v-kbd>, and **preventDefault** cannot override them. Test your shortcuts in the browsers and operating systems you target.
