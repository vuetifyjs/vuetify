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

The `v-hotkey` component renders keyboard shortcuts in a visually consistent and accessible way. It handles complex key combination parsing, platform-specific differences (Mac vs PC), and provides multiple display modes for different design needs.

<PageFeatures />

<DocIntroduced version="3.11.0" />

## Usage

Hotkeys display keyboard shortcuts with proper styling and platform awareness. The component automatically handles platform differences like showing <v-kbd>⌘</v-kbd> on Mac and <v-kbd>Ctrl</v-kbd> on PC.

<ExamplesUsage name="v-hotkey" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-hotkey](/api/v-hotkey/) | Primary Component |

<ApiInline hide-links />

## Guide

The `v-hotkey` component is designed to display keyboard shortcuts consistently across your application. It's commonly used in command palettes, help documentation, tooltips, and anywhere you need to show keyboard shortcuts to users.

::: info
The `v-hotkey` component serves solely as a visual tool for displaying keyboard shortcuts. It does not generate or manage keyboard shortcuts itself. To implement functional keyboard shortcuts, utilize the [useHotkey](/features/hotkey/) composable.
:::

### Props

The component provides several props to customize how keyboard shortcuts are displayed and parsed. This component is designed to work seamlessly across different platforms, automatically adjusting key representations based on the user's operating system.

#### Keys

The **keys** prop accepts a string representing keyboard shortcuts in various formats:

<ExamplesExample file="v-hotkey/prop-keys" />

#### Display modes

The **display-mode** prop controls how keys are visually represented. Choose from **icon** (default), **symbol**, or **text** modes:

<ExamplesExample file="v-hotkey/prop-display-mode" />

#### Platform awareness

The component automatically detects the user's platform and adjusts key representations accordingly:

<ExamplesExample file="v-hotkey/prop-platform-aware" />

#### Custom key mapping

::: info
It is recommended to set the **key-map** prop at the application level via global component defaults rather than per-instance for consistency.
:::

Use the **key-map** prop to customize how specific keys are displayed. You can import and modify the exported `hotkeyMap` to create custom configurations:

```typescript
import { hotkeyMap } from 'vuetify/labs/VHotkey'

const customKeyMap = {
  ...hotkeyMap,
  ctrl: {
    default: { text: 'Control', icon: '$ctrl' },
    mac: { symbol: '⌃', icon: '$ctrl', text: 'Control' }
  }
}
```

<ExamplesExample file="v-hotkey/prop-key-map" />

#### Inline display

The **inline** prop optimizes the component for integration within text content, documentation, and flowing paragraphs. This mode applies specialized styling for seamless text flow and improved readability:

<ExamplesExample file="v-hotkey/prop-inline" />

**Layout considerations:** When using multiple inline hotkeys within the same paragraph, consider increasing the `line-height` of the containing text to provide adequate vertical spacing. This prevents visual overlap when hotkey components wrap to new lines, ensuring clean separation and improved readability.

## Accessibility

The `v-hotkey` component is designed with accessibility in mind. It uses semantic HTML elements and ARIA attributes to ensure that screen readers can interpret the displayed keyboard shortcuts correctly.

### ARIA attributes

The component uses the `aria-label` attribute to provide a clear description of the keyboard shortcut. This is automatically generated based on the current keys.

```html
<v-hotkey keys="ctrl+s" />
```

will generate the following HTML:

```html
<div class="v-hotkey" role="img" aria-label="Keyboard shortcut: Ctrl plus S">
  <span class="v-hotkey__combination">
    <div class="v-kbd v-hotkey__key" aria-hidden="true">Ctrl</div>
    <span class="v-hotkey__divider" aria-hidden="true">+</span>
    <div class="v-kbd v-hotkey__key" aria-hidden="true">S</div>
  </span>
</div>
```

::: info
The HTML structure varies by variant. Standard variants use individual `VKbd` components, while the `contained` variant uses nested `<kbd>` elements within a single wrapper.
:::

Key accessibility features:

- **Screen reader support**: Uses `role="img"` with descriptive `aria-label`
- **Visual elements hidden**: Individual keys and separators use `aria-hidden="true"`
- **Sequence notation**: Dash separators display as "then" for screen readers (e.g., `ctrl+k-p` becomes "Ctrl plus K then P")
- **Tooltips**: Icon and symbol modes include `title` attributes for enhanced usability
