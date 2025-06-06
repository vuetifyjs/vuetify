// Styles
import './VCommandPalette.scss'

// Components
import { VActionHotkey } from './VActionHotkey'
import { VList, VListItem } from '@/components/VList'
import { makeVListProps } from '@/components/VList/VList'

// Composables
import { useLocale } from '@/composables/locale' // For default no-data text

// Utilities
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { InternalListItem } from '@/components/VList/VList'

export const makeVCommandPaletteListProps = propsFactory({
  ...omit(makeVListProps({
    density: 'compact' as const,
    nav: true,
  }), [
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
  selectedIndex: {
    type: Number,
    default: -1,
  },
}, 'VCommandPaletteList')

// Scope for the item slot, should match what VCommandPalette provides
export type VCommandPaletteListItemSlotScope = {
  item: any
  props: Record<string, any>
}

export type VCommandPaletteListSlots = {
  item: VCommandPaletteListItemSlotScope
  'no-data': never // Use 'never' for slots with no scope
  'prepend-item': never
  'append-item': never
}

export const VCommandPaletteList = genericComponent<VCommandPaletteListSlots>()({
  name: 'VCommandPaletteList',
  props: makeVCommandPaletteListProps(),
  emits: {
    'click:item': (item: InternalListItem, event: MouseEvent | KeyboardEvent) => true,
  },
  setup (props, { emit, slots }) {
    const { t } = useLocale()
    const vListProps = VList.filterProps(omit(props, ['items', 'selectedIndex']))

    function handleExecute (item: InternalListItem) {
      emit('click:item', item, new KeyboardEvent('keydown'))
    }

    useRender(() => (
      <VList { ...vListProps }>
        { slots['prepend-item']?.() }
        { props.items.length > 0
          ? (
            props.items.map((item, index) => {
              const slotProps = {
                item: item.raw,
                props: {
                  ...item.props,
                  active: props.selectedIndex === index,
                  onClick: (e: MouseEvent | KeyboardEvent) => emit('click:item', item, e),
                },
              }
              const itemSlot = slots.item

              const itemContent = itemSlot
                ? itemSlot(slotProps)
                : (
                  <VListItem { ...slotProps.props }>
                    { item.props.title }
                  </VListItem>
                )

              return (
                <>
                  <VActionHotkey item={ item } onExecute={ handleExecute } />
                  { itemContent }
                </>
              )
            })
          )
          : (
            slots['no-data']?.() ??
              <VListItem key="no-data-fallback" title={ t('$vuetify.noDataText') } />
          )
        }
        { slots['append-item']?.() }
      </VList>
    ))
  },
})
