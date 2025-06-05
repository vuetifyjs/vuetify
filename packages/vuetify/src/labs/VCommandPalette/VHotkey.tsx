// Styles
import './VHotkey.scss'

// Utilities
import { computed } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVHotkeyProps = propsFactory({
  keys: String,
}, 'VHotkey')

export const VHotkey = genericComponent()({
  name: 'VHotkey',
  props: makeVHotkeyProps(),
  setup (props) {
    const isMac = typeof navigator !== 'undefined' && /macintosh/i.test(navigator.userAgent)

    const parsedKeys = computed(() => {
      return props.keys?.split(/[ +]/).map(key => {
        switch (key.toLowerCase()) {
          case 'ctrl':
            return isMac ? '⌃' : 'Ctrl'
          case 'meta':
          case 'cmd':
            return '⌘'
          case 'shift':
            return '⇧'
          case 'alt':
            return isMac ? '⌥' : 'Alt'
          case 'enter':
            return '↵'
          case 'arrowup':
            return '↑'
          case 'arrowdown':
            return '↓'
          case 'arrowleft':
            return '←'
          case 'arrowright':
            return '→'
          case 'backspace':
            return '⌫'
          case 'escape':
            return 'esc'
          default:
            return key.toUpperCase()
        }
      }) ?? []
    })

    useRender(() => (
      <div class="v-hotkey">
        { parsedKeys.value.map((key, i) => (
          <>
            <kbd class="v-hotkey__key">{ key }</kbd>
            { i < parsedKeys.value.length - 1 && <span class="v-hotkey__divider">+</span> }
          </>
        ))}
      </div>
    ))
  },
})
