// Styles
import './VHotkey.scss'

// Utilities
import { computed } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

/**
 * Utility function to capitalize the first letter of a string
 * Used for formatting key names in text display mode
 */
function capitalize (str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Props factory for VHotkey component
 * @param keys - String representing keyboard shortcuts (e.g., "ctrl+k", "meta+shift+p")
 * @param displayMode - How to display keys: 'symbol' uses special characters (⌘, ⌃), 'text' uses words
 */
export const makeVHotkeyProps = propsFactory({
  keys: String,
  displayMode: {
    type: String as PropType<'symbol' | 'text'>,
    default: 'symbol',
  },
}, 'VHotkey')

export const VHotkey = genericComponent()({
  name: 'VHotkey',
  props: makeVHotkeyProps(),
  setup (props) {
    // Detect if user is on Mac for platform-specific key handling
    const isMac = typeof navigator !== 'undefined' && /macintosh/i.test(navigator.userAgent)

    /**
     * Main computed property that parses the keys string and converts it into
     * a structured format for rendering. Handles multiple key combinations
     * separated by spaces (e.g., "ctrl+k meta+p" becomes two separate combinations)
     */
    const keyCombinations = computed(() => {
      if (!props.keys) return []

      // Split by spaces to handle multiple key combinations
      // Example: "ctrl+k meta+p" -> ["ctrl+k", "meta+p"]
      return props.keys.split(' ').map(combination => {
        // Split each combination by + or _ to get individual key parts
        // Example: "ctrl+k" -> ["ctrl", "k"]
        const parts = combination.split(/_|\+/)

        // Parse modifier keys from the parts array
        const modifiers = {
          meta: parts.some(p => ['meta', 'cmd'].includes(p.toLowerCase())),
          ctrl: parts.some(p => p.toLowerCase() === 'ctrl'),
          alt: parts.some(p => p.toLowerCase() === 'alt'),
          shift: parts.some(p => p.toLowerCase() === 'shift'),
        }

        // Mac-specific logic: Convert ctrl to meta (cmd key) on Mac
        // unless meta is already explicitly specified
        if (isMac && modifiers.ctrl && !modifiers.meta) {
          modifiers.meta = true
          modifiers.ctrl = false
        }

        // Find the main key (non-modifier key) from the parts
        // Example: from ["ctrl", "k"], "k" is the main key
        const mainKey = parts.find(p => !['meta', 'cmd', 'ctrl', 'alt', 'shift'].includes(p.toLowerCase()))

        // Define the order in which modifiers should be displayed
        // This ensures consistent ordering across different key combinations
        const modifierDisplayOrder: (keyof typeof modifiers)[] = ['meta', 'ctrl', 'alt', 'shift']
        const sortedModifiers = modifierDisplayOrder.filter(mod => modifiers[mod])

        // Combine sorted modifiers with the main key
        // Result: ["meta", "shift", "k"] for cmd+shift+k on Mac
        const keyParts = mainKey ? [...sortedModifiers, mainKey] : [...sortedModifiers]

        // Transform each key part into its display representation
        return keyParts.map(key => {
          const lowerKey = key.toLowerCase()

          // Symbol display mode: Use special Unicode characters for common keys
          if (props.displayMode === 'symbol') {
            switch (lowerKey) {
              case 'ctrl': return isMac ? '⌃' : 'Ctrl' // Control symbol on Mac, text on others
              case 'meta': return '⌘' // Command symbol
              case 'shift': return '⇧' // Shift symbol
              case 'alt': return isMac ? '⌥' : 'Alt' // Option symbol on Mac, Alt text on others
              case 'enter': return '↵' // Return symbol
              case 'arrowup': return '↑' // Up arrow
              case 'arrowdown': return '↓' // Down arrow
              case 'arrowleft': return '←' // Left arrow
              case 'arrowright': return '→' // Right arrow
              case 'backspace': return '⌫' // Backspace symbol
              case 'escape': return 'Esc' // Escape abbreviation
              default: return key.toUpperCase() // Regular keys in uppercase
            }
          } else {
            // Text display mode: Use descriptive words for all keys
            switch (lowerKey) {
              case 'ctrl': return 'Control'
              case 'meta': return isMac ? 'Command' : 'Ctrl' // Platform-specific naming
              case 'shift': return 'Shift'
              case 'alt': return isMac ? 'Option' : 'Alt' // Platform-specific naming
              case 'enter': return 'Enter'
              case 'arrowup': return 'Up Arrow'
              case 'arrowdown': return 'Down Arrow'
              case 'arrowleft': return 'Left Arrow'
              case 'arrowright': return 'Right Arrow'
              case 'backspace': return 'Backspace'
              case 'escape': return 'Escape'
              // For regular keys: single characters get uppercased, longer strings get capitalized
              default: return key.length === 1 ? key.toUpperCase() : capitalize(key)
            }
          }
        })
      })
    })

    /**
     * Render function that creates the visual representation of the keyboard shortcuts
     * Structure:
     * - Container div with v-hotkey class
     * - Each key combination gets a span with v-hotkey__combination class
     * - Each individual key gets wrapped in a <kbd> element with v-hotkey__key class
     * - Keys within a combination are separated by '+' dividers
     * - Multiple combinations are separated by spaces
     */
    useRender(() => (
      <div class="v-hotkey">
        { keyCombinations.value.map((combination, comboIndex) => (
          <span class="v-hotkey__combination" key={ comboIndex }>
            { combination.map((key, keyIndex) => (
              <span key={ keyIndex }>
                { /* Individual key display */ }
                <kbd class="v-hotkey__key">{ key }</kbd>
                { /* Add '+' divider between keys in the same combination, but not after the last key */ }
                { keyIndex < combination.length - 1 && <span class="v-hotkey__divider">+</span> }
              </span>
            ))}
            { /* Add space between different key combinations, but not after the last combination */ }
            { comboIndex < keyCombinations.value.length - 1 && <span>&nbsp;</span> }
          </span>
        ))}
      </div>
    ))
  },
})
