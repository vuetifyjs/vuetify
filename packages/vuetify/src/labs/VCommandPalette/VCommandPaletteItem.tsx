// Components
import { VHotkey } from '@/components/VHotkey'
import { VListItem } from '@/components/VList'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VCommandPaletteActionItem } from './types'
import type { VCommandPaletteItemSlots } from './VCommandPaletteItem.types'

export type { VCommandPaletteItemSlots }

export const makeVCommandPaletteItemProps = propsFactory({
  item: {
    type: Object as PropType<VCommandPaletteActionItem>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  onExecute: Function as PropType<(event: MouseEvent | KeyboardEvent) => void>,
}, 'VCommandPaletteItem')

export const VCommandPaletteItem = genericComponent<VCommandPaletteItemSlots>()({
  name: 'VCommandPaletteItem',

  props: makeVCommandPaletteItemProps(),

  setup (props, { slots }) {
    useRender(() => (
      <VListItem
        index={ props.index }
        value={ props.item.value }
        title={ props.item.title }
        subtitle={ props.item.subtitle }
        prependIcon={ props.item.prependIcon }
        prependAvatar={ props.item.prependAvatar }
        appendIcon={ props.item.appendIcon }
        appendAvatar={ props.item.appendAvatar }
        onClick={ props.onExecute }
        v-slots={{
          prepend: slots.prepend,
          title: slots.title,
          append: slots.append ?? (props.item.hotkey ? () => <VHotkey keys={ props.item.hotkey } /> : undefined),
        }}
      />
    ))
  },
})

export type VCommandPaletteItem = InstanceType<typeof VCommandPaletteItem>
