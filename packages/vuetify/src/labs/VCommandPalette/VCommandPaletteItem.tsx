// Components
import { VDivider } from '@/components/VDivider'
import { VHotkey } from '@/components/VHotkey'
import { VListItem, VListSubheader } from '@/components/VList'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType, VNode } from 'vue'
import type { VCommandPaletteItem } from './types'
import { isActionItem, isDivider, isSubheader } from './types'

export const makeVCommandPaletteItemProps = propsFactory({
  item: {
    type: Object as PropType<VCommandPaletteItem>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  onExecute: Function as PropType<(event: MouseEvent | KeyboardEvent) => void>,
}, 'VCommandPaletteItem')

export const VCommandPaletteItemComponent = genericComponent()({
  name: 'VCommandPaletteItem',

  props: makeVCommandPaletteItemProps(),

  setup (props) {
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
            index={ props.index }
            title={ item.title }
            subtitle={ item.subtitle }
            prependIcon={ item.prependIcon }
            prependAvatar={ item.prependAvatar }
            appendIcon={ item.appendIcon }
            appendAvatar={ item.appendAvatar }
            onClick={ handleClick }
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
