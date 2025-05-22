// Types
import type { ActionContext, ActionDefinition } from '../types'

// Helper function to determine if the command palette (or its search input) is the active context
// This will be used in the `runInTextInput` predicate for most navigation actions.
// It ensures that these hotkeys are only active when the command palette dialog is open
// and an element within it (like the search input) is focused.
const isCommandPaletteFocused = (activeElement: Element | null): boolean => {
  if (!activeElement) return false
  // Check if the active element is the search input or within the dialog
  const paletteDialog = activeElement.closest('.v-command-palette-dialog__content')
  return !!paletteDialog
}

export const commandPaletteNavigationActions: ActionDefinition[] = [
  {
    id: 'commandPalette.navigateDown',
    title: 'Navigate Down',
    hotkey: 'arrowdown',
    hotkeyOptions: { preventDefault: true, ignoreKeyRepeat: true },
    runInTextInput: isCommandPaletteFocused,
    // Handler will be set in useCommandPaletteCore to call specific navigation logic
  },
  {
    id: 'commandPalette.navigateUp',
    title: 'Navigate Up',
    hotkey: 'arrowup',
    hotkeyOptions: { preventDefault: true, ignoreKeyRepeat: true },
    runInTextInput: isCommandPaletteFocused,
    // Handler will be set in useCommandPaletteCore
  },
  {
    id: 'commandPalette.navigatePageDown',
    title: 'Navigate Page Down',
    hotkey: 'pagedown',
    hotkeyOptions: { preventDefault: true, ignoreKeyRepeat: true },
    runInTextInput: isCommandPaletteFocused,
    // Handler will be set in useCommandPaletteCore
  },
  {
    id: 'commandPalette.navigatePageUp',
    title: 'Navigate Page Up',
    hotkey: 'pageup',
    hotkeyOptions: { preventDefault: true, ignoreKeyRepeat: true },
    runInTextInput: isCommandPaletteFocused,
    // Handler will be set in useCommandPaletteCore
  },
  {
    id: 'commandPalette.navigateToStart',
    title: 'Navigate to Start',
    hotkey: 'home',
    hotkeyOptions: { preventDefault: true, ignoreKeyRepeat: true },
    runInTextInput: isCommandPaletteFocused,
    // Handler will be set in useCommandPaletteCore
  },
  {
    id: 'commandPalette.navigateToEnd',
    title: 'Navigate to End',
    hotkey: 'end',
    hotkeyOptions: { preventDefault: true, ignoreKeyRepeat: true },
    runInTextInput: isCommandPaletteFocused,
    // Handler will be set in useCommandPaletteCore
  },
  {
    id: 'commandPalette.selectItem',
    title: 'Select Item',
    hotkey: 'enter',
    hotkeyOptions: { preventDefault: true }, // Allow repeat for quick selection if needed, or set ignoreKeyRepeat
    runInTextInput: isCommandPaletteFocused,
    // Handler will be set in useCommandPaletteCore
  },
  {
    id: 'commandPalette.navigateBackOrClose',
    title: 'Navigate Back / Close',
    hotkey: 'escape',
    hotkeyOptions: { preventDefault: true },
    runInTextInput: isCommandPaletteFocused, // Escape should work if palette is focused
    // Handler will be set in useCommandPaletteCore, will check isRootLevel
  },
  // Potentially add an action to focus the search input if it loses focus but palette is open
  // {
  //   id: 'commandPalette.focusSearch',
  //   title: 'Focus Search',
  //   hotkey: 'ctrl+l', // Example, could be something else
  //   hotkeyOptions: { preventDefault: true },
  //   runInTextInput: (el) => { // Only if palette is open but search is not focused
  //     const paletteDialog = el?.closest('.v-command-palette-dialog__content');
  //     if (!paletteDialog) return false;
  //     return el !== searchInputRef.value?.$el.querySelector('input'); // Needs access to searchInputRef
  //   },
  //   // Handler will call focusSearchInput()
  // }
]

// Function to get the effective hotkey for an action, considering profiles
// This could be a utility if needed elsewhere, or used directly where action definitions are displayed.
export function getEffectiveHotkeyDisplay (action: ActionDefinition, actionCore?: ActionCorePublicAPI | null): string | undefined {
  if (!actionCore || !actionCore.activeProfile.value) {
    return Array.isArray(action.hotkey) ? action.hotkey.join(', ') : action.hotkey
  }
  const profileOverride = action.profiles?.[actionCore.activeProfile.value]
  const effectiveHotkey = profileOverride?.hotkey ?? action.hotkey
  return Array.isArray(effectiveHotkey) ? effectiveHotkey.join(', ') : effectiveHotkey
}
