// Utilities
import { computed, watch } from 'vue'
import { deepEqual, getCurrentInstance } from '@/util'

// Types
import type { Ref } from 'vue'
import type { SortItem } from './sort'

export function useOptions ({
  page,
  itemsPerPage,
  sortBy,
  groupBy,
  search,
}: {
  page: Ref<number>
  itemsPerPage: Ref<number>
  sortBy: Ref<readonly SortItem[]>
  groupBy: Ref<readonly SortItem[]>
  search: Ref<string | undefined>
}) {
  const vm = getCurrentInstance('VDataTable')

  const options = computed(() => ({
    page: page.value,
    itemsPerPage: itemsPerPage.value,
    sortBy: sortBy.value,
    groupBy: groupBy.value,
    search: search.value,
  }))

  // Reset page when searching
  watch(() => search?.value, () => {
    page.value = 1
  })

  let oldOptions: unknown = null
  watch(options, () => {
    if (deepEqual(oldOptions, options.value)) return
    vm.emit('update:options', options.value)
    oldOptions = options.value
  }, { deep: true, immediate: true })
}
