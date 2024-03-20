// Components
import { VDataTableGroupHeaderRow } from './VDataTableGroupHeaderRow'
import { VDataTableRow } from './VDataTableRow'

// Composables
import { useExpanded } from './composables/expand'
import { useGroupBy } from './composables/group'
import { useHeaders } from './composables/headers'
import { usePagination } from './composables/paginate'
import { useSelection } from './composables/select'
import { useLocale } from '@/composables/locale'

// Utilities
import { Fragment, mergeProps, ref } from 'vue'
import { genericComponent, getPrefixedEventHandlers, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { Group } from './composables/group'
import type { CellProps, DataTableItem, GroupHeaderSlot, ItemSlot, RowProps } from './types'
import type { VDataTableGroupHeaderRowSlots } from './VDataTableGroupHeaderRow'
import type { VDataTableRowSlots } from './VDataTableRow'
import type { GenericProps } from '@/util'

export type VDataTableRowsSlots<T> = VDataTableGroupHeaderRowSlots & VDataTableRowSlots<T> & {
  item: ItemSlot<T> & { props: Record<string, any> }
  loading: never
  'group-header': GroupHeaderSlot
  'no-data': never
  'expanded-row': ItemSlot<T>
}

export const makeVDataTableRowsProps = propsFactory({
  loading: [Boolean, String],
  loadingText: {
    type: String,
    default: '$vuetify.dataIterator.loadingText',
  },
  hideNoData: Boolean,
  items: {
    type: Array as PropType<readonly (DataTableItem | Group)[]>,
    default: () => ([]),
  },
  noDataText: {
    type: String,
    default: '$vuetify.noDataText',
  },
  rowProps: [Object, Function] as PropType<RowProps<any>>,
  cellProps: [Object, Function] as PropType<CellProps<any>>,
  navigable: Boolean,
}, 'VDataTableRows')

export const VDataTableRows = genericComponent<new <T>(
  props: {
    items?: readonly (DataTableItem<T> | Group<T>)[]
  },
  slots: VDataTableRowsSlots<T>,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VDataTableRows',

  inheritAttrs: false,

  props: makeVDataTableRowsProps(),

  setup (props, { attrs, slots }) {
    const { columns } = useHeaders()
    const { expandOnClick, toggleExpand, isExpanded } = useExpanded()
    const { isSelected, toggleSelect } = useSelection()
    const { toggleGroup, isGroupOpen } = useGroupBy()
    const { t } = useLocale()
    const { page, pageCount } = usePagination()
    const focusTask = ref(-1)

    useRender(() => {
      const refRows = ref<any[]>([])

      if (props.loading && (!props.items.length || slots.loading)) {
        return (
          <tr
            class="v-data-table-rows-loading"
            key="loading"
          >
            <td colspan={ columns.value.length }>
              { slots.loading?.() ?? t(props.loadingText) }
            </td>
          </tr>
        )
      }

      if (!props.loading && !props.items.length && !props.hideNoData) {
        return (
          <tr
            class="v-data-table-rows-no-data"
            key="no-data"
          >
            <td colspan={ columns.value.length }>
              { slots['no-data']?.() ?? t(props.noDataText) }
            </td>
          </tr>
        )
      }

      return (
        <>
          { props.items.map((item, index) => {
            if (item.type === 'group') {
              const slotProps = {
                index,
                item,
                columns: columns.value,
                isExpanded,
                toggleExpand,
                isSelected,
                toggleSelect,
                toggleGroup,
                isGroupOpen,
              } satisfies GroupHeaderSlot

              return slots['group-header'] ? slots['group-header'](slotProps) : (
                <VDataTableGroupHeaderRow
                  key={ `group-header_${item.id}` }
                  item={ item }
                  { ...getPrefixedEventHandlers(attrs, ':group-header', () => slotProps) }
                  v-slots={ slots }
                />
              )
            }

            const slotProps = {
              index,
              item: item.raw,
              internalItem: item,
              columns: columns.value,
              isExpanded,
              toggleExpand,
              isSelected,
              toggleSelect,
            } satisfies ItemSlot<any>

            const itemSlotProps = {
              ...slotProps,
              props: mergeProps(
                {
                  key: `item_${item.key ?? item.index}`,
                  onClick: expandOnClick.value ? () => {
                    toggleExpand(item)
                  } : undefined,
                  index,
                  item,
                  cellProps: props.cellProps,
                  navigable: props.navigable,
                },
                getPrefixedEventHandlers(attrs, ':row', () => slotProps),
                typeof props.rowProps === 'function'
                  ? props.rowProps({
                    item: slotProps.item,
                    index: slotProps.index,
                    internalItem: slotProps.internalItem,
                  })
                  : props.rowProps,
              ),
            }

            return (
              <Fragment key={ itemSlotProps.props.key as string } ref={ props.navigable ? el => { refRows.value[index] = el } : undefined }>
                { slots.item ? slots.item(itemSlotProps) : (
                  <VDataTableRow
                    { ...itemSlotProps.props }
                    v-slots={ slots }
                    onClick={ () => {
                      if (props.navigable) refRows.value[index].nextElementSibling.focus()
                    }
                  }
                  onKeyup={ (key: KeyboardEvent) => {
                    if (props.navigable) {
                      switch (key.code) {
                        case 'ArrowDown':
                          refRows.value[refRows.value.length - 1 === index ? 0 : index + 1].nextElementSibling.focus()
                          focusTask.value = -1
                          break

                        case 'ArrowUp':
                          refRows.value[index === 0 ? refRows.value.length - 1 : index - 1].nextElementSibling.focus()
                          focusTask.value = -1
                          break

                        case 'ArrowLeft':
                          if (page.value > 1) {
                            focusTask.value = 0
                            page.value -= 1
                          }
                          break

                        case 'ArrowRight':
                          if (page.value < pageCount.value) {
                            focusTask.value = 0
                            page.value += 1
                          }
                          break

                        case 'Escape':
                          refRows.value[index].nextElementSibling.blur()
                          break
                      }
                    }
                  }}
                  onVnodeMounted={ (el: any) => {
                    if (focusTask.value === index) {
                      el.el?.focus()
                      focusTask.value = -1
                    }
                  }}
                  />
                )}

                { isExpanded(item) && slots['expanded-row']?.(slotProps) }
              </Fragment>
            )
          })}
        </>
      )
    })

    return {}
  },
})

export type VDataTableRows = InstanceType<typeof VDataTableRows>
