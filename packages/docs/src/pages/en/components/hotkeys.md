---
meta:
  nav: Hotkeys
  title: Hotkey component
  description: The hotkey component displays keyboard shortcuts in a visually consistent and platform-aware manner.
  keywords: hotkeys, keyboard shortcuts, vuetify hotkey component, vue hotkey component
related:
  - /components/buttons/
  - /components/icons/
  - /components/toolbars/
features:
  github: /components/VHotkey/
  label: 'C: VHotkey'
  report: true
---

# Hotkeys

The `v-hotkey` component displays a keyboard shortcut, such as in a menu, a tooltip or a command palette.

<PageFeatures />

## Usage

Modifiers follow the user's platform, so `cmd` shows <v-kbd>⌘</v-kbd> on Mac and <v-kbd>Ctrl</v-kbd> elsewhere.

<ExamplesUsage name="v-hotkey" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-hotkey](/api/v-hotkey/) | Primary Component |

<ApiInline hide-links />

## Guide

::: info
`v-hotkey` only displays a shortcut. To make the shortcut work, register it with the [useHotkey](/features/hotkey/) composable.
:::

### Props

#### Keys

**keys** uses the same syntax as `useHotkey`. See [Key combination syntax](/features/hotkey/#key-combination-syntax).

<ExamplesExample file="v-hotkey/prop-keys" />

#### Display modes

**display-mode** chooses between icons, symbols and text for keys that have them.

<ExamplesExample file="v-hotkey/prop-display-mode" />

#### Platform

The platform is detected from the user agent. Set **platform** to `mac` or `pc` to show one platform's keys to everyone, for example in documentation written for one operating system.

<ExamplesExample file="v-hotkey/prop-platform-aware" />

#### Custom key mapping

**key-map** changes how keys are labeled. It replaces the built-in map rather than extending it, so include every key you display. Keys missing from the map are shown as uppercase text. Set it once through [global defaults](/features/global-configuration/) to keep shortcuts consistent across the application.

<ExamplesExample file="v-hotkey/prop-key-map" />

#### Inline

Use **inline** for shortcuts within a paragraph. When several of them can wrap onto separate lines, increase the paragraph's `line-height` so they don't overlap.

<ExamplesExample file="v-hotkey/prop-inline" />

## Accessibility

Screen readers announce the whole shortcut as one image with a label such as "Keyboard shortcut, Ctrl plus S". Sequences read with "then", so `ctrl+k-p` becomes "Ctrl plus K then P". In icon and symbol modes, each key also has a `title` with its name.
