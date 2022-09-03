import { getCurrentInstance } from '@/util'
import type { Ref } from 'vue'
import { computed, watch } from 'vue'
import type { SortItem } from './sort'

export function useOptions ({
  page,
  itemsPerPage,
  sortBy,
  startIndex,
  stopIndex,
  pageCount,
}: {
  page: Ref<number>
  itemsPerPage: Ref<number>
  sortBy: Ref<readonly SortItem[]>
  startIndex: Ref<number>
  stopIndex: Ref<number>
  pageCount: Ref<number>
}) {
  const vm = getCurrentInstance('VDataTable')

  const options = computed(() => ({
    page: page.value,
    itemsPerPage: itemsPerPage.value,
    startIndex: startIndex.value,
    stopIndex: stopIndex.value,
    pageCount: pageCount.value,
    sortBy: sortBy.value,
  }))

  // Reset page when sorting changes
  watch(sortBy, () => {
    page.value = 1
  }, { deep: true })

  // Reset page when items-per-page changes
  watch(itemsPerPage, () => {
    page.value = 1
  })

  watch(options, () => {
    vm.emit('update:options', options.value)
  }, { deep: true })
}
