---
emphasized: true
meta:
  nav: Command Palettes
  title: Command Palette Component
  description: The command palette component provides a keyboard-driven interface for executing commands, navigating, and searching within your application.
  keywords: v-command-palette, command palette, command menu, keyboard shortcuts, vuetify
related:
  - /components/dialogs/
  - /components/lists/
  - /features/hotkeys/
features:
  github: /labs/VCommandPalette/
  label: 'C: VCommandPalette'
  report: true
---

# VCommandPalette

The `VCommandPalette` is a powerful, keyboard-centric component that provides users with a quick and efficient way to access commands, perform searches, and navigate through your application. It's highly customizable and can be triggered by a global hotkey.

<PageFeatures />

## Usage

The `VCommandPalette` is most commonly used as a dialog that overlays your application content. You control its visibility with `v-model`.

<ExamplesUsage name="v-command-palette" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-command-palette](/api/v-command-palette/) | Primary Component |
| [v-command-palette-list](/api/v-command-palette-list/) | Sub-component used to display the list of items. |
| [v-command-palette-item](/api/v-command-palette-item/) | Sub-component used to display an individual item. |
| [v-command-palette-items](/api/v-command-palette-items/) | Sub-component used to display the items. Contains `v-command-palette-item` components. |
| [v-command-palette-search](/api/v-command-palette-search/) | Sub-component used to display the search input. |
| [v-command-palette-instructions](/api/v-command-palette-instructions/) | Sub-component used to display the instructions. |

<ApiInline hide-links />

## Guide

The `VCommandPalette` is designed to be the central hub for your application's actions. It can be populated with a simple array of items, or more complex hierarchical and grouped data structures.

### Item Structure

The `items` prop accepts an array of objects, where each object can be one of several types, allowing for rich and organized command lists.

- **Action/Link Items**: The most basic item type. They can either have a `handler` function to execute an action or a `to`/`href` property for navigation.
- **Parent Items**: Used to create nested menus. A parent item has a `children` array, and selecting it will navigate into that list of children.
- **Group Items**: Visually group related items under a non-selectable subheader. This helps organize long lists of commands.

#### Hierarchical Navigation

Create nested menus by defining items with `type: 'parent'`. When a user selects a parent item, the palette will display the `children` of that item, with a "Go Back" instruction to return to the previous level.

<ExamplesExample file="v-command-palette/hierarchical" />

#### Groups

Organize your commands with `type: 'group'`. This will render a `VListSubheader` and is not a selectable item.

<ExamplesExample file="v-command-palette/groups" />

### Hotkeys

You can define a global `hotkey` to toggle the visibility of the command palette from anywhere in your application. Additionally, individual items can have their own `hotkey` property, which will execute the item's handler when pressed while the palette is open.

<ExamplesExample file="v-command-palette/item-hotkeys" />

### Search & Filtering

The command palette includes a powerful, built-in search that filters items by `title` and `subtitle` by default. You can enhance the search by providing an array of `keywords` for any item.

<ExamplesExample file="v-command-palette/search-keywords" />

### Custom Layouts

For advanced use cases, the `v-command-palette` provides a `default` scoped slot that gives you full control over the layout. The slot provides `items`, `rootProps`, and `getItemProps` to help you build accessible custom layouts. For convenience, you can use the `VCommandPaletteItems` and `VCommandPaletteItem` helper components.

Here is an example of a grid-based layout:

<ExamplesExample file="v-command-palette/custom-layout-grid" />

You can also customize the rendering of individual items in the default list layout by using the `item` slot.

<ExamplesExample file="v-command-palette/custom-item-slot" />

### Contained Usage

While the default behavior is to render as a dialog, you can use the `contained` prop to render the component inline. This is useful for embedding the command palette within another component or page layout.

<ExamplesExample file="v-command-palette/contained" />

## Accessibility

The `VCommandPalette` is designed with accessibility in mind and follows WAI-ARIA patterns.

- When opened, focus is automatically trapped within the palette and placed on the search input.
- When closed, focus is returned to the element that triggered it.
- Keyboard navigation is fully supported, including `ArrowUp`, `ArrowDown`, `Enter`, `Escape`, and `Backspace` for hierarchy navigation.
- The component uses `aria-activedescendant` to manage selection, ensuring screen readers announce the currently focused item correctly.
- Custom layouts are supported with accessibility in mind through the provided `rootProps` and `getItemProps` in the default slot.
