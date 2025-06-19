---
emphasized: true
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
  github: /labs/VHotkey/
  label: 'C: VHotkey'
  report: true
---

# Hotkeys

The `v-hotkey` component renders keyboard shortcuts in a visually consistent and accessible way. It handles complex key combination parsing, platform-specific differences (Mac vs PC), and provides multiple display modes for different design needs.

<PageFeatures />

## Usage

Hotkeys display keyboard shortcuts with proper styling and platform awareness. The component automatically handles platform differences like showing <v-kbd>⌘</v-kbd> on Mac and <v-kbd>Ctrl</v-kbd> on PC.

<ExamplesUsage name="v-hotkey" />

## API

| Component | Description |
| - | - |
| [v-hotkey](/api/v-hotkey/) | Primary Component |

<ApiInline hide-links />

## Guide

The `v-hotkey` component is designed to display keyboard shortcuts consistently across your application. It's commonly used in command palettes, help documentation, tooltips, and anywhere you need to show keyboard shortcuts to users.

### Props

The component provides several props to customize how keyboard shortcuts are displayed and parsed.

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

<Alert type="info" variant="tonal">
It is recommended to set the <b>key-map</b> prop at the application level via global component defaults rather than per-instance for consistency.
</Alert>

Use the **key-map** prop to customize how specific keys are displayed:

<ExamplesExample file="v-hotkey/prop-key-map" />
