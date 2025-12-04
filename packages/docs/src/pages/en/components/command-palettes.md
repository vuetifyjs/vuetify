---
emphasized: true
meta:
  nav: Command Palettes
  title: Command Palette component
  description: A keyboard-driven command palette component that provides a searchable dialog interface for executing commands and actions.
  keywords: command palette, keyboard shortcuts, vuetify command palette component, vue command palette component
related:
  - /components/dialogs/
  - /components/hotkeys/
  - /components/lists/
features:
  github: /labs/VCommandPalette/
  label: 'C: VCommandPalette'
  report: true
---

# Command Palettes

The `v-command-palette` component provides a keyboard-driven command interface that allows users to quickly search and execute commands. It's commonly used for quick navigation, command execution, and power-user workflows.

<PageFeatures />

::: success
This feature was introduced as a labs component and is available for testing and feedback.
:::

## Usage

The command palette displays a searchable list of commands in a dialog. Users can type to filter items and press Enter or click to execute commands. Use the **items** prop to provide commands and the **v-model** to control visibility.

<ExamplesUsage name="v-command-palette" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-command-palette](/api/v-command-palette/) | Primary Component |
| [v-dialog](/api/v-dialog/) | Base Component |

<ApiInline hide-links />

## Guide

The `v-command-palette` component is designed to provide a fast, keyboard-driven interface for executing commands and navigating your application. It's built on top of `v-dialog` and provides keyboard navigation, search filtering, and customizable hotkeys.

### Props

The component provides several props to customize the command palette's behavior and appearance.

#### Items

The **items** prop accepts an array of command palette items. Items support three types via a discriminated union:

- **Action items**: Interactive commands with optional icons, subtitles, navigation, and hotkeys
- **Subheaders**: Section labels to organize commands
- **Dividers**: Visual separators between command groups

Action items can include properties like `title`, `subtitle`, `prependIcon`, `appendIcon`, `value`, `onClick`, `to`, `href`, and `hotkey`.

<ExamplesExample file="v-command-palette/prop-items" />

#### Global Hotkey

Use the **hotkey** prop to register a global keyboard shortcut that toggles the command palette. The shortcut is automatically registered when the component mounts and unregistered when it's destroyed. Individual items can also have their own **hotkey** property for quick access to specific commands.

<ExamplesExample file="v-command-palette/prop-hotkey" />

#### Dialog Configuration

The command palette is built on `v-dialog` and supports dialog-related props. Use **location** to control positioning, **activator** for activation patterns, and **dialog-props** to pass additional props to the underlying dialog component.

<ExamplesExample file="v-command-palette/prop-dialog" />

#### Search and Filtering

The search input automatically filters items based on their **title** and **subtitle** properties. Use **v-model:search** to control or monitor the search query. The **filter-keys** prop can customize which item properties are searched.

The **placeholder** prop customizes the search input's placeholder text, while **no-data-text** customizes the message shown when no items match the search query.

### Slots

The component provides slots for customizing the command palette's layout.

#### Prepend

The **prepend** slot renders content above the search input, inside the command palette card. Use this for headers, instructions, or custom UI elements.

#### Append

The **append** slot renders content below the items list. Use this for footers, help text, or additional actions.

#### No-data

The **no-data** slot provides custom content when no items match the search query, replacing the default no-data message.

### Events

The component emits several events for tracking state and user interactions.

#### click:item

Emitted when a user clicks or activates a command (via Enter key). The event payload includes the selected item and the triggering event. The palette automatically closes after this event unless prevented.

```vue
<v-command-palette
  :items="items"
  @click:item="handleCommand"
/>
```

#### update:modelValue and update:search

Use `v-model` to control dialog visibility and `v-model:search` to monitor or control the search query.

### Keyboard Navigation

The command palette supports full keyboard navigation:

- **Arrow Up/Down**: Navigate through commands
- **Enter**: Execute the selected command
- **Escape**: Close the palette
- **Typing**: Filters commands by title and subtitle
- **Per-item hotkeys**: Execute specific commands directly (when palette is open)

### Accessibility

The command palette includes built-in accessibility features:

- Proper ARIA roles and labels for screen readers
- Keyboard navigation with focus management
- Active descendant tracking for assistive technologies
- Automatic focus return when closing

## Examples

The following examples demonstrate advanced usage patterns for the command palette component.

### With Router Navigation

Action items support the **to** prop for Vue Router navigation and **href** for external links:

```vue
<v-command-palette
  :items="[
    {
      title: 'Dashboard',
      to: '/dashboard',
      prependIcon: 'mdi-view-dashboard'
    },
    {
      title: 'Documentation',
      href: 'https://vuetifyjs.com',
      prependIcon: 'mdi-book-open-variant'
    }
  ]"
/>
```

### Custom onClick Handlers

Use the **onClick** property on action items to execute custom logic:

```vue
<script setup>
const items = [
  {
    title: 'Toggle Theme',
    subtitle: 'Switch between light and dark mode',
    prependIcon: 'mdi-theme-light-dark',
    onClick: () => {
      // Toggle theme logic
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }
  }
]
</script>
```

### Item Types

Organize commands with subheaders and dividers:

```vue
<script setup>
const items = [
  { title: 'New File', value: 'file' },
  { title: 'New Folder', value: 'folder' },
  { type: 'divider' },
  { type: 'subheader', title: 'Recent' },
  { title: 'Project Alpha', value: 'alpha' },
  { title: 'Project Beta', value: 'beta' },
]
</script>
```

## Accessibility

The `v-command-palette` component follows accessibility best practices:

- Uses semantic ARIA roles (`listbox` for the list, `option` for items)
- Provides descriptive labels for screen readers
- Implements `aria-activedescendant` for proper focus announcement
- Maintains focus within the dialog while open
- Returns focus to the previously focused element on close
- Supports full keyboard navigation without mouse interaction

