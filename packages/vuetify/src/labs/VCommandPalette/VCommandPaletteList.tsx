// Styles
import './VCommandPalette.scss'

// Components
import { VList, VListItem } from '@/components/VList'
import { InternalListItem, makeVListProps } from '@/components/VList/VList'
import { genericComponent, omit, propsFactory } from '@/util'

// Composables
import { useRender } from '@/util/useRender'
import { PropType } from 'vue'


export const makeVCommandPaletteListProps = propsFactory({
  ...omit(makeVListProps(), [
    'items',
    'itemChildren',
    'itemType',
    'itemValue',
    'itemProps',
  ]),
  items: {
    type: Array as PropType<InternalListItem[]>,
    default: () => ([] as InternalListItem[]),
  },
}, 'VCommandPaletteList')

export type VCommandPaletteListSlots = {

}

export const VCommandPaletteList = genericComponent<VCommandPaletteListSlots>()({
  name: 'VCommandPaletteList',
  props: makeVCommandPaletteListProps(),
  setup(props) {

    const vListProps = VList.filterProps(omit(props, ['items']))


    useRender(() => (
      <VList {...vListProps}>
        {props.items.map((item) => {
          return (
            <VListItem item={item} />
          )
        })}
      </VList>
    ))
  }
})
