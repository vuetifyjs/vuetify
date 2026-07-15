// Utilities
import { watch } from 'vue'
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

  const options = () => ({
    page: page.value,
    itemsPerPage: itemsPerPage.value,
    sortBy: sortBy.value,
    groupBy: groupBy.value,
    search: search.value,
  })

  let oldOptions: ReturnType<typeof options> | null = null
  watch(options, value => {
    if (deepEqual(oldOptions, value)) return

    // Reset page when searching
    if (oldOptions && oldOptions.search !== value.search) {
      page.value = 1
    }

    vm.emit('update:options', value)
    oldOptions = value
  }, { deep: true, immediate: true })
}
