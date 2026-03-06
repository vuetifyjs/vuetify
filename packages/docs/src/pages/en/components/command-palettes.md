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

The command palette displays a searchable list of commands in a dialog. Users can type to filter items and press Enter or click to execute commands.

<ExamplesUsage name="v-command-palette" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-command-palette](/api/v-command-palette/) | Primary Component |
| [v-dialog](/api/v-dialog/) | Base Component |

<ApiInline hide-links />

## Examples

Below is a collection of simple to complex examples.

### Props

#### Items

The **items** prop accepts an array of command palette items. Items support action items (interactive commands), subheaders (section labels), and dividers (visual separators).

<ExamplesExample file="v-command-palette/prop-items" />

#### Hotkey

Use the **hotkey** prop to register a global keyboard shortcut that toggles the command palette. Individual items can also have their own **hotkey** property for quick access.

<ExamplesExample file="v-command-palette/prop-hotkey" />

#### Dialog configuration

The command palette is built on `v-dialog` and accepts most of the props while passing **class** and **style** values to the `v-sheet` content container.

<ExamplesExample file="v-command-palette/prop-dialog" />

### Slots

The command palette provides several slots for customizing the display of items and other elements.

#### Item prepend

Use the **#item.prepend** slot to customize the prepend area of each item. This slot receives the current **item** and **index** as slot props.

<ExamplesExample file="v-command-palette/slot-item-prepend" />

#### Item append

Similarly **#item.append** slot and allows you to include supplemental information (replaces hotkey).

<ExamplesExample file="v-command-palette/slot-item-append" />

### Filtering

The search input automatically filters items based on their **title** and **subtitle** properties. Use **v-model:search** to control or monitor the search query. The **filter-keys** prop can customize which item properties are searched.

The **placeholder** prop customizes the search input's placeholder text, while **no-data-text** customizes the message shown when no items match the search query.

### Keyboard navigation

The command palette supports full keyboard navigation:

- **Arrow Up/Down**: Navigate through commands
- **Enter**: Execute the selected command
- **Escape**: Close the palette
- **Typing**: Filters commands by title and subtitle
- **Per-item hotkeys**: Execute specific commands directly (when palette is open)

## Accessibility

The `v-command-palette` component follows accessibility best practices:

- Uses semantic ARIA roles (`listbox` for the list, `option` for items)
- Provides descriptive labels for screen readers
- Implements `aria-activedescendant` for proper focus announcement
- Maintains focus within the dialog while open
- Returns focus to the previously focused element on close
- Supports full keyboard navigation without mouse interaction
