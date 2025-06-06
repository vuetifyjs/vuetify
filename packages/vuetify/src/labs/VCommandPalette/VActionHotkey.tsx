// Composables
import { useHotkey } from '../../composables/useHotkey'

// Utilities
import { genericComponent, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { InternalListItem } from '@/components/VList/VList'

export const makeVActionHotkeyProps = propsFactory({
  item: {
    type: Object as PropType<InternalListItem>,
    required: true,
  },
  onExecute: {
    type: Function as PropType<(item: InternalListItem, e: KeyboardEvent) => void>,
    required: true,
  },
}, 'VActionHotkey')

export const VActionHotkey = genericComponent()({
  name: 'VActionHotkey',
  props: makeVActionHotkeyProps(),
  setup (props) {
    if (props.item.raw?.hotkey) {
      useHotkey(props.item.raw.hotkey, e => {
        props.onExecute(props.item, e)
      }, { inputs: true })
    }

    return () => null // This is a renderless component
  },
})
