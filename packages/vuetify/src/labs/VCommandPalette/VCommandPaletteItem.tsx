/**
 * VCommandPaletteItem Subcomponent
 *
 * Renders individual items in the command palette list.
 * Handles action items, subheaders, and dividers with appropriate styling.
 */

// Components
import { VDivider } from '@/components/VDivider'
import { VListItem, VListSubheader } from '@/components/VList'
import { VHotkey } from '@/labs/VHotkey'

// Utilities
import { computed } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType, VNode } from 'vue'

// Internal
import { isActionItem, isDivider, isSubheader } from './types'

// Types
import type { VCommandPaletteItem } from './types'

export const makeVCommandPaletteItemProps = propsFactory({
  item: {
    type: Object as PropType<VCommandPaletteItem>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
  onExecute: Function as PropType<(event: MouseEvent | KeyboardEvent) => void>,
}, 'VCommandPaletteItem')

export const VCommandPaletteItemComponent = genericComponent()({
  name: 'VCommandPaletteItem',

  props: makeVCommandPaletteItemProps(),

  setup (props) {
    const itemId = computed(() => `v-command-palette-item-${props.index}`)

    function handleClick (event: MouseEvent | KeyboardEvent) {
      props.onExecute?.(event)
    }

    useRender((): VNode => {
      if (isDivider(props.item)) {
        return <VDivider key={ `divider-${props.index}` } />
      }

      if (isSubheader(props.item)) {
        const item = props.item
        return (
          <VListSubheader
            key={ `subheader-${props.index}` }
            title={ item.title }
          />
        )
      }

      if (isActionItem(props.item)) {
        const item = props.item
        return (
          <VListItem
            key={ `item-${props.index}` }
            id={ itemId.value }
            title={ item.title }
            subtitle={ item.subtitle }
            prependIcon={ item.prependIcon }
            prependAvatar={ item.prependAvatar }
            appendIcon={ item.appendIcon }
            appendAvatar={ item.appendAvatar }
            active={ props.isSelected }
            onClick={ handleClick }
            role="option"
            aria-selected={ props.isSelected }
            v-slots={{
              append: item.hotkey ? () => <VHotkey keys={ item.hotkey } /> : undefined,
            }}
          />
        )
      }

      return <div key={ `item-${props.index}` } />
    })
  },
})

export type VCommandPaletteItemComponent = InstanceType<typeof VCommandPaletteItemComponent>
