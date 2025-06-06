// Styles
import './VHotkey.scss'

// Utilities
import { computed } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

function capitalize (str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

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
    const isMac = typeof navigator !== 'undefined' && /macintosh/i.test(navigator.userAgent)

    const keyCombinations = computed(() => {
      if (!props.keys) return []

      return props.keys.split(' ').map(combination => {
        const parts = combination.split(/_|\+/)

        const modifiers = {
          meta: parts.some(p => ['meta', 'cmd'].includes(p.toLowerCase())),
          ctrl: parts.some(p => p.toLowerCase() === 'ctrl'),
          alt: parts.some(p => p.toLowerCase() === 'alt'),
          shift: parts.some(p => p.toLowerCase() === 'shift'),
        }

        if (isMac && modifiers.ctrl && !modifiers.meta) {
          modifiers.meta = true
          modifiers.ctrl = false
        }

        const mainKey = parts.find(p => !['meta', 'cmd', 'ctrl', 'alt', 'shift'].includes(p.toLowerCase()))

        const modifierDisplayOrder: (keyof typeof modifiers)[] = ['meta', 'ctrl', 'alt', 'shift']
        const sortedModifiers = modifierDisplayOrder.filter(mod => modifiers[mod])

        const keyParts = mainKey ? [...sortedModifiers, mainKey] : [...sortedModifiers]

        return keyParts.map(key => {
          const lowerKey = key.toLowerCase()

          if (props.displayMode === 'symbol') {
            switch (lowerKey) {
              case 'ctrl': return isMac ? '⌃' : 'Ctrl'
              case 'meta': return '⌘'
              case 'shift': return '⇧'
              case 'alt': return isMac ? '⌥' : 'Alt'
              case 'enter': return '↵'
              case 'arrowup': return '↑'
              case 'arrowdown': return '↓'
              case 'arrowleft': return '←'
              case 'arrowright': return '→'
              case 'backspace': return '⌫'
              case 'escape': return 'Esc'
              default: return key.toUpperCase()
            }
          } else {
            switch (lowerKey) {
              case 'ctrl': return 'Control'
              case 'meta': return isMac ? 'Command' : 'Ctrl'
              case 'shift': return 'Shift'
              case 'alt': return isMac ? 'Option' : 'Alt'
              case 'enter': return 'Enter'
              case 'arrowup': return 'Up Arrow'
              case 'arrowdown': return 'Down Arrow'
              case 'arrowleft': return 'Left Arrow'
              case 'arrowright': return 'Right Arrow'
              case 'backspace': return 'Backspace'
              case 'escape': return 'Escape'
              default: return key.length === 1 ? key.toUpperCase() : capitalize(key)
            }
          }
        })
      })
    })

    useRender(() => (
      <div class="v-hotkey">
        { keyCombinations.value.map((combination, comboIndex) => (
          <span class="v-hotkey__combination" key={ comboIndex }>
            { combination.map((key, keyIndex) => (
              <span key={ keyIndex }>
                <kbd class="v-hotkey__key">{ key }</kbd>
                { keyIndex < combination.length - 1 && <span class="v-hotkey__divider">+</span> }
              </span>
            ))}
            { comboIndex < keyCombinations.value.length - 1 && <span>&nbsp;</span> }
          </span>
        ))}
      </div>
    ))
  },
})
