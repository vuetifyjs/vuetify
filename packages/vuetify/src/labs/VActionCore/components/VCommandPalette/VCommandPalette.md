# VCommandPalette

The `VCommandPalette` component provides a powerful, keyboard-driven interface for users to quickly find and execute commands within your application. It integrates deeply with `VActionCore` for action management and keyboard navigation.

## Features

- Fuzzy search for commands.
- Nested command structures (sub-items).
- Customizable UI through a comprehensive set of slots.
- Keyboard navigation managed by `VActionCore`, allowing user-profile-based keybinding overrides.
- Easy way to display current keybindings to the user.

## Props

The `VCommandPalette` component accepts the following props:

| Name             | Type                  | Default                | Description                                                                 |
|------------------|-----------------------|------------------------|-----------------------------------------------------------------------------|
| `modelValue`     | `Boolean`             | -                      | Controls the visibility of the command palette dialog.                        |
| `placeholder`    | `String`              | 'Search commands...'   | Placeholder text for the search input.                                      |
| `closeOnExecute` | `Boolean`             | `true`                 | If `true`, the palette closes after an action is executed.                  |
| `width`          | `String` \| `Number`  | `600`                  | Width of the command palette dialog.                                        |
| `title`          | `String`              | 'Command Palette'      | Default title for the palette, used in the header and as `aria-label`.      |
| `class`          | `any`                 | -                      | Standard Vue class binding.                                                 |
| `style`          | `any`                 | -                      | Standard Vue style binding.                                                 |
| `theme`          | `String`              | -                      | Applies a theme to the component.                                           |

## Events

| Name                | Payload     | Description                                           |
|---------------------|-------------|-------------------------------------------------------|
| `update:modelValue` | `boolean`   | Emitted when the `modelValue` (visibility) changes.   |
| `update:list`       | `undefined` | Emitted by the core logic for testing purposes.         |

## Slots

`VCommandPalette` offers extensive customization through slots.

### `header`
Allows replacing the entire header section.

-   **Scope:**
    -   `parentAction?: ActionDefinition`: The parent action if navigating sub-items.
    -   `navigateBack: () => void`: Function to navigate to the previous level.
    -   `title?: string`: The current title for the header.

### `searchControls`
Allows replacing the search input area.

-   **Scope:**
    -   `searchText: Ref<string>`: Reactive reference to the current search text.
    -   `placeholder?: string`: The placeholder prop value.
    -   `inputRef: Ref<VTextField | null>`: Ref to the underlying `VTextField` instance (if using default).
    -   `searchComponentRef: Ref<VCommandPaletteSearch | null>`: Ref to the `VCommandPaletteSearch` component instance (if using default).
    -   `listId: string`: ID for ARIA linking with the list.
    -   `activeDescendantId?: string`: ID of the currently active list item for ARIA.
    -   `ariaHasPopup: 'listbox' | undefined`
    -   `ariaExpanded: 'true' | 'false'`
    -   `ariaControls: string`
    -   `ariaLabelledby?: string`

### `listWrapper`
Allows replacing the component that wraps the list of actions.

-   **Scope:**
    -   `actions: readonly (ActionDefinition | { isHeader: true, title: string, id: string })[]`: The actions to display.
    -   `selectedIndex: Ref<number>`: Reactive reference to the currently selected index.
    -   `listId: string`: ID of the list for ARIA.
    -   `listRef: Ref<CommandPaletteListRef | null>`: Ref to the list component instance.
    -   `searchText: Ref<string>`: Current search text.
    -   `handleItemActivated: (action: ActionDefinition) => Promise<void>`: Function to call when an item is activated.
    -   `isLoading: Ref<boolean>`: Whether sub-items are currently loading.
    -   `itemSlot?: (scope: VCommandPaletteListItemScope) => VNode[]`: The `item` slot, if provided to `VCommandPalette`.
    -   `noResultsSlot?: (scope: VCommandPaletteListNoResultsScope) => VNode[]`: The `no-results` slot, if provided.

### `item`
Passed through to the `VCommandPaletteList` (or your custom list via `listWrapper`). Defines the rendering of each action item.

-   **Scope:** (from `VCommandPaletteListItemScope`)
    -   `action: ActionDefinition`: The action definition for the item.
    -   `index: number`: The index of the item in the list.
    -   `isSelected: boolean`: Whether the item is currently selected (based on `selectedIndex`).
    -   `isFocused: boolean`: Whether the item is visually focused (same as `isSelected` in typical keyboard nav).
    -   `getItemHtmlId: (action: ActionDefinition, index: number) => string`: Function to get unique HTML ID for the item.
    -   `searchText?: string`: The current search text.

### `no-results`
Passed through to the `VCommandPaletteList` (or your custom list via `listWrapper`). Content to display when a search yields no results.

-   **Scope:** (from `VCommandPaletteListNoResultsScope`)
    -   `searchText: string`: The current search text.

### `loader`
Allows replacing the loading indicator shown when asynchronous sub-items are being fetched.

-   **Scope:**
    -   `isLoading: Ref<boolean>`: Reactive boolean indicating if loading is in progress.

### `footer`
Allows adding a custom footer to the command palette. Ideal for displaying keybinding hints.

-   **Scope:**
    -   `navigationActions: ActionDefinition[]`: Array of navigation action definitions used by the palette.
    -   `actionCoreInstance?: ActionCorePublicAPI | null`: The `VActionCore` instance.
    -   `core: ReturnType<typeof useCommandPaletteCore>`: The entire core composable's return value for advanced use.

### `empty-state`
Content to display if the command palette is opened and there are no actions registered with `VActionCore` (or none are visible to the palette).

-   **Scope:**
    -   `core: ReturnType<typeof useCommandPaletteCore>`: The command palette's core logic instance.

## Keyboard Navigation & VActionCore

Keyboard navigation within `VCommandPalette` is managed by `VActionCore`. This means that hotkeys for navigating the palette (Up, Down, Enter, Escape, etc.) are defined as `VActionCore` actions.

**Default Navigation Actions & Hotkeys:**

| Action Title              | Default Hotkey | ID (`commandPalette.*`) |
|---------------------------|----------------|-------------------------|
| Navigate Down             | `ArrowDown`    | `navigateDown`          |
| Navigate Up               | `ArrowUp`      | `navigateUp`            |
| Navigate Page Down        | `PageDown`     | `navigatePageDown`      |
| Navigate Page Up          | `PageUp`       | `navigatePageUp`        |
| Navigate to Start         | `Home`         | `navigateToStart`       |
| Navigate to End           | `End`          | `navigateToEnd`         |
| Select Item               | `Enter`        | `selectItem`            |
| Navigate Back / Close     | `Escape`       | `navigateBackOrClose`   |

These navigation actions are configured with `runInTextInput: isCommandPaletteFocused` (a predicate function that checks if an element within the palette dialog is focused) and appropriate `preventDefault` options.

**Customizing Keybindings:**

Since these are standard `VActionCore` actions, users can customize their hotkeys using `VActionCore`'s **Profiling feature**. By defining an action profile and setting it as active, you can override the `hotkey` property (and others) for these navigation actions. Refer to the `VActionCore` documentation on Action Profiling for more details.

## Displaying Keybindings

You can display the current keybindings to the user, for example, in the `footer` slot. The `footer` slot provides `navigationActions` (the definitions) and `actionCoreInstance`. You can use the `getEffectiveHotkeyDisplay` utility function (imported from `../../utils/commandPaletteNavigationActions`) to get the currently active hotkey string for each navigation action.

**Example using the `footer` slot:**

```vue
<template>
  <VCommandPalette v-model="isPaletteOpen">
    <template #footer="{ navigationActions, actionCoreInstance }">
      <div class="keybinding-hints">
        <span v-for="navAction in navigationActions" :key="navAction.id" class="hint">
          <strong>{{ getHotkey(navAction, actionCoreInstance) }}</strong>: {{ navAction.title }}
        </span>
      </div>
    </template>
  </VCommandPalette>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VCommandPalette } from '@/labs/VActionCore/components'; // Adjust path as needed
import { getEffectiveHotkeyDisplay } from '@/labs/VActionCore/utils/commandPaletteNavigationActions'; // Adjust
import type { ActionDefinition, ActionCorePublicAPI } from '@/labs/VActionCore';

const isPaletteOpen = ref(false);

function getHotkey(action: ActionDefinition, ac?: ActionCorePublicAPI | null) {
  return getEffectiveHotkeyDisplay(action, ac);
}
</script>

<style scoped>
.keybinding-hints {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px; /* vertical and horizontal gap */
  padding: 8px 12px;
  font-size: 0.8em;
  color: #888; /* Example color */
  border-top: 1px solid #eee; /* Example separator */
}
.hint {
  display: inline-flex;
  align-items: center;
}
.hint strong {
  margin-right: 4px;
  padding: 2px 4px;
  border-radius: 3px;
  background-color: #f0f0f0; /* Example key style */
  color: #555;
}
</style>
```

## Programmatic Control

The `VCommandPalette` component instance (when accessed via `ref`) exposes:

-   `focus()`: Method to programmatically focus the search input.
-   `navigationActions: ActionDefinition[]`: The configured navigation actions.
-   `getEffectiveHotkey(actionId: string): string | undefined`: A method to get the display string for the effective hotkey of a given navigation action ID (or any action ID known to ActionCore, if used carefully).

## Basic Usage

```vue
<template>
  <div>
    <VBtn @click="isPaletteOpen = true">Open Command Palette</VBtn>
    <VCommandPalette v-model="isPaletteOpen" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VBtn } from 'vuetify/components'; // Assuming VBtn is used
import { VCommandPalette } from '@/labs/VActionCore/components'; // Adjust path

const isPaletteOpen = ref(false);

// Ensure VActionCore is provided and has actions registered for the palette to show.
</script>
```

## Advanced Customization Example (Custom Search and List)

```vue
<template>
  <VCommandPalette v-model="isPaletteOpen">
    <template #searchControls="{ searchText, placeholder, inputRef, ariaControls, activeDescendantId }">
      <div style="padding: 8px;">
        <input
          type="text"
          :ref="el => inputRef.value = el"
          :value="searchText.value"
          @input="searchText.value = $event.target.value"
          :placeholder="placeholder"
          :aria-controls="ariaControls"
          :aria-activedescendant="activeDescendantId"
          style="width: 100%; padding: 8px; border: 1px solid #ccc;"
        />
      </div>
    </template>

    <template #listWrapper="{ actions, selectedIndex, handleItemActivated, itemSlot, noResultsSlot, listId, listRef }">
      <div :id="listId" ref="listRef" style="max-height: 300px; overflow-y: auto;">
        <div v-if="!actions.length && noResultsSlot">
          <component :is="noResultsSlot({ searchText: '' })" />
        </div>
        <div v-else v-for="(action, index) in actions" :key="action.id">
          <div
            @click="!action.isHeader && handleItemActivated(action)"
            :style="{ padding: '8px 12px', backgroundColor: action.isHeader ? '#f0f0f0' : (selectedIndex.value === index ? '#e0e0e0' : 'transparent'), cursor: action.isHeader ? 'default' : 'pointer' }"
          >
            <template v-if="itemSlot && !action.isHeader">
              <component :is="itemSlot({ action, index, isSelected: selectedIndex.value === index, isFocused: selectedIndex.value === index, getItemHtmlId: () => '', searchText: '' })" />
            </template>
            <template v-else>
              {{ action.title }}
            </template>
          </div>
        </div>
      </div>
    </template>
  </VCommandPalette>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { VCommandPalette } from '@/labs/VActionCore/components';

const isPaletteOpen = ref(false);
</script>
```

This documentation provides a comprehensive overview. Remember to adjust import paths according to your project structure.
