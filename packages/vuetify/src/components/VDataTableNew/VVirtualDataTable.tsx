import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { convertToUnit, defineComponent, getCurrentInstance } from '@/util'
import { VDataTableHeaders } from './VDataTableHeaders'
import './VDataTable.sass'

import type { PropType, Ref } from 'vue'
import { VDataTableRows } from './VDataTableRows'
import { createExpanded, useHeaders } from './VDataTable'
import { useProxiedModel } from '@/composables/proxiedModel'

type DataTableHeader = {
  id: string
  name: string
  colspan?: number
  rowspan?: number
  minWidth?: string
  maxWidth?: string
}

export type Column = DataTableHeader & {
  style: any
}

const useVirtual = (props: { height?: string | number, itemHeight: string | number }, itemsLength: Ref<number>) => {
  const vm = getCurrentInstance('useVirtual')

  const containerRef = ref<HTMLElement>()
  const itemHeight = computed(() => parseInt(props.itemHeight, 10))
  const totalHeight = computed(() => itemsLength.value * itemHeight.value)
  const scrollTop = ref(0) // TODO: Scroll threshold should be relative to current position to avoid fixed load positions
  const chunkSize = ref(30) // TODO: Should reflect height of container
  const windowSize = computed(() => itemHeight.value * (chunkSize.value * 3))
  // const scrollIndex = computed(() => Math.floor(scrollTop.value / itemHeight.value))
  // const chunkIndex = computed(() => Math.floor(scrollIndex.value / chunkSize.value))
  // const startIndex = computed(() => Math.max(0, (chunkIndex.value * chunkSize.value) - chunkSize.value))
  const startIndex = ref(0)
  const stopIndex = computed(() => Math.min(startIndex.value + (chunkSize.value * 3), itemsLength.value))
  const offsetStart = computed(() => Math.max(0, startIndex.value * itemHeight.value))
  const isScrolling = ref(false)

  const startOffset = computed(() => itemHeight.value * startIndex.value)

  let scrollTimeout: any = null

  watch(startIndex, val => {
    vm.emit('load', { startIndex: startIndex.value, stopIndex: stopIndex.value })
  }, {
    immediate: true,
  })

  function tableScroll () {
    isScrolling.value = true

    vm.emit('scroll', { startIndex: startIndex.value, stopIndex: stopIndex.value })

    if (scrollTimeout) clearTimeout(scrollTimeout)

    scrollTimeout = setTimeout(() => {
      isScrolling.value = false

      const newScrollTop = (containerRef.value?.scrollTop ?? 0)
      const direction = newScrollTop > scrollTop.value ? 1 : -1

      scrollTop.value = newScrollTop

      const diff = Math.abs(newScrollTop - (direction < 0 ? startOffset.value : startOffset.value + windowSize.value))

      console.log({
        direction,
        newScrollTop,
        startOffset: startOffset.value,
        windowSize: windowSize.value,
        diff,
      })

      const delta = windowSize.value / 4

      if (diff < delta || diff > windowSize.value) {
        startIndex.value = Math.floor(Math.max(0, (newScrollTop - (windowSize.value / 2))) / itemHeight.value)
      }
    }, 100)
  }

  onMounted(() => {
    if (!containerRef.value) return
    containerRef.value.addEventListener('scroll', tableScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    if (!containerRef.value) return
    containerRef.value.removeEventListener('scroll', tableScroll)
  })

  return {
    totalHeight,
    containerRef,
    offsetStart,
    startIndex,
    stopIndex,
    isScrolling,
    itemHeight,
    scrollTop,
  }
}

export const VVirtualDataTable = defineComponent({
  name: 'VVirtualDataTable',

  props: {
    headers: {
      type: Array as PropType<DataTableHeader[] | DataTableHeader[][]>,
      required: true,
    },
    items: {
      type: Array as PropType<any[]>,
      required: true,
    },
    height: [String, Number],
    itemHeight: {
      type: [String, Number],
      default: 48,
    },
    stickyHeader: Boolean,
    loading: Boolean,
    showLoader: Boolean,
    itemsLength: Number,
  },

  emits: {
    'update:loading': (loading: boolean) => true,
    scroll: () => true,
    load: () => true,
  },

  setup (props, { slots }) {
    const loading = useProxiedModel(props, 'loading')

    const { rowColumns, headerRows, tableGridStyles } = useHeaders(props)

    const { items: expandedItems } = createExpanded(props)

    const {
      totalHeight,
      containerRef,
      offsetStart,
      startIndex,
      stopIndex,
      isScrolling,
      itemHeight,
    } = useVirtual(props, computed(() => props.itemsLength ?? expandedItems.value.length))

    const items = computed(() => props.itemsLength ? expandedItems.value : expandedItems.value.slice(startIndex.value, stopIndex.value))

    watch(isScrolling, val => loading.value = val)

    return () => {
      return (
        <div
          ref={containerRef}
          class="v-data-table v-virtual-data-table"
          style={{
            height: convertToUnit(props.height),
          }}
        >
          <table
            class="v-data-table__table"
            style={{
              ...tableGridStyles.value,
              'grid-auto-rows': 'min-content',
              height: convertToUnit(totalHeight.value),
            }}
            role="table"
          >
            <thead class="v-data-table__thead" role="rowgroup">
              <VDataTableHeaders rows={ headerRows.value } rowHeight={ itemHeight.value } sticky={ props.stickyHeader } />
            </thead>
            <tbody class="v-data-table__tbody" role="rowgroup">
              <VDataTableRows
                showLoader={ props.showLoader }
                loading={ loading.value }
                columns={ rowColumns.value }
                items={ items.value }
                rowHeight={ itemHeight.value }
                offsetStart={ offsetStart.value }
                startIndex={ startIndex.value }
                stopIndex={ stopIndex.value }
                v-slots={ slots }
              />
            </tbody>
          </table>
        </div>
      )
    }
  },
})
