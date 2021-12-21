import { getCurrentInstance, getObjectValueByPath } from '@/util'
import { computed, inject, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'

import type { InjectionKey, Ref } from 'vue'
import type { DataTableHeader } from './types'

export const useVirtual = (props: { height?: string | number, itemHeight: string | number }, itemsLength: Ref<number>) => {
  const vm = getCurrentInstance('useVirtual')

  const containerRef = ref<HTMLElement>()
  const itemHeight = computed(() => parseInt(props.itemHeight, 10))
  const totalHeight = computed(() => itemsLength.value * itemHeight.value)
  // const scrollTop = ref(0) // TODO: Scroll threshold should be relative to current position to avoid fixed load positions
  // const chunkSize = ref(10) // TODO: Should reflect height of container
  // const windowSize = computed(() => itemHeight.value * (chunkSize.value * 3))
  const windowSize = computed(() => {
    if (!containerRef.value) return 500

    // @ts-ignore
    const el = containerRef.value.$el ?? containerRef.value

    return el.clientHeight
  })
  const visibleItems = computed(() => (windowSize.value / itemHeight.value) * 3)
  // const windowMidPoint = computed(() => scrollTop.value + (windowSize.value / 2))
  // const scrollIndex = computed(() => Math.floor(scrollTop.value / itemHeight.value))
  // const chunkIndex = computed(() => Math.floor(scrollIndex.value / chunkSize.value))
  // const startIndex = computed(() => Math.max(0, (chunkIndex.value * chunkSize.value) - chunkSize.value))
  const startIndex = ref(0)
  const stopIndex = computed(() => Math.min(startIndex.value + visibleItems.value, itemsLength.value))
  const visibleItemsHeight = computed(() => (stopIndex.value - startIndex.value) * itemHeight.value)
  const topOffset = computed(() => Math.max(0, startIndex.value * itemHeight.value))
  const bottomOffset = computed(() => Math.min(itemsLength.value * itemHeight.value, stopIndex.value * itemHeight.value))
  const visibleItemsMidPoint = computed(() => bottomOffset.value - (visibleItemsHeight.value / 3))
  const beforeHeight = computed(() => topOffset.value)
  const afterHeight = computed(() => Math.max(0, totalHeight.value - visibleItemsHeight.value - beforeHeight.value))
  const offsetStart = computed(() => Math.max(0, startIndex.value * itemHeight.value))
  const isScrolling = ref(false)

  const startOffset = computed(() => itemHeight.value * startIndex.value)

  let scrollTimeout: any = null

  watch(startIndex, val => {
    vm.emit('load', { startIndex: startIndex.value, stopIndex: stopIndex.value })
  }, {
    immediate: true,
  })

  let startScroll: undefined | number
  let scrollTop: number

  function tableScroll () {
    if (!containerRef.value) return

    if (!startScroll) startScroll = containerRef.value.scrollTop

    isScrolling.value = true

    const direction = containerRef.value.scrollTop < scrollTop ? -1 : 1
    scrollTop = containerRef.value.scrollTop
    const windowMidPoint = scrollTop + (windowSize.value / 2)

    if (direction === 1 && windowMidPoint > visibleItemsMidPoint.value) {
      startIndex.value = Math.max(0, Math.floor((scrollTop - (visibleItemsHeight.value / 3)) / itemHeight.value))
      // console.log('forward', startIndex.value)
    } else if (direction === -1 && scrollTop - startOffset.value < visibleItemsHeight.value / 3) {
      startIndex.value = Math.max(0, Math.floor((scrollTop - visibleItemsHeight.value / 2) / itemHeight.value))
      // console.log('back', startIndex.value)
    }

    clearTimeout(scrollTimeout)

    scrollTimeout = setTimeout(() => {
      if (!containerRef.value) return

      // isScrolling.value = false

      // const newScrollTop = (containerRef.value?.scrollTop ?? 0)
      // const direction = newScrollTop > scrollTop.value ? 1 : -1

      // scrollTop.value = newScrollTop

      // const diff = Math.abs(newScrollTop - (direction < 0 ? startOffset.value : startOffset.value + windowSize.value))
      // const delta = windowSize.value / 4

      // console.log({
      //   direction,
      //   newScrollTop,
      //   startOffset: startOffset.value,
      //   windowSize: windowSize.value,
      //   diff,
      //   delta,
      // })
      // const scrollDistance = Math.abs(containerRef.value.scrollTop - (startScroll ?? 0))

      // // console.log('scroll stop', scrollDistance, scrollTop, startScroll, windowSize.value)

      // if (scrollDistance === 0) return
      // // if (diff < delta || diff > windowSize.value / 2) {
      // //   startIndex.value = Math.floor(Math.max(0, (newScrollTop - (windowSize.value / 2))) / itemHeight.value)
      // // }
      // if (scrollDistance > visibleItemsHeight.value || scrollTop === 0 || scrollTop > totalHeight.value - (visibleItemsHeight.value / 2)) {
      //   startIndex.value = Math.max(0, Math.floor((scrollTop - (visibleItemsHeight.value / 2)) / itemHeight.value))
      //   console.log('start timeout', startIndex.value)
      // }

      isScrolling.value = false
      startScroll = undefined
    }, 100)
  }

  onMounted(() => {
    if (!containerRef.value) return

    // @ts-ignore
    const el = containerRef.value.$el ?? containerRef.value
    el.addEventListener('scroll', tableScroll, { passive: true })
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
    afterHeight,
    beforeHeight,
  }
}

export const VDataTableExpandedKey: InjectionKey<{
  expand: (item: any, value: boolean) => void
  expanded: Ref<Set<string>>
}> = Symbol.for('vuetify:datatable:expanded')

export const createExpanded = () => {
  const expanded = ref(new Set<string>())

  function expand (item: any, value: boolean) {
    if (!value) {
      expanded.value.delete(item.id)
    } else {
      expanded.value.add(item.id)
    }
  }

  provide(VDataTableExpandedKey, { expand, expanded })

  return { expanded }
}

export const useExpanded = () => {
  const data = inject(VDataTableExpandedKey)

  if (!data) throw new Error('foo')

  return data
}

export const useHeaders = (props: { headers: DataTableHeader[] | DataTableHeader[][] }) => {
  const headers = computed(() => Array.isArray(props.headers[0]) ? props.headers as DataTableHeader[][] : [props.headers as DataTableHeader[]])
  const columns = computed(() => headers.value.flatMap(row => row.filter(col => col.id)))

  return { headers, columns }
}

// export const combine = (composables: ) => {

// }

export const useFilter = () => {

}

function sortItems<T extends any, K extends keyof T> (
  items: T[],
  sortBy: {
    key: string
    order: string
  }[],
  locale: string,
  // customSorters?: Record<K, DataTableCompareFunction<T[K]>>
): T[] {
  if (sortBy === null || !sortBy.length) return items
  const stringCollator = new Intl.Collator(locale, { sensitivity: 'accent', usage: 'sort' })

  return [...items].sort((a, b) => {
    for (let i = 0; i < sortBy.length; i++) {
      const { key, order } = sortBy[i]

      let sortA = getObjectValueByPath(a, key)
      let sortB = getObjectValueByPath(b, key)

      if (order === 'desc') {
        [sortA, sortB] = [sortB, sortA]
      }

      // if (customSorters?.[sortKey as K]) {
      //   const customResult = customSorters[sortKey as K](sortA, sortB)

      //   if (!customResult) continue

      //   return customResult
      // }

      // Check if both cannot be evaluated
      if (sortA === null && sortB === null) {
        continue
      }

      // Dates should be compared numerically
      if (sortA instanceof Date && sortB instanceof Date) {
        return sortA.getTime() - sortB.getTime()
      }

      [sortA, sortB] = [sortA, sortB].map(s => (s || '').toString().toLocaleLowerCase())

      if (sortA !== sortB) {
        if (!isNaN(sortA) && !isNaN(sortB)) return Number(sortA) - Number(sortB)
        return stringCollator.compare(sortA, sortB)
      }
    }

    return 0
  })
}

export const useSort = (items: Ref<any[]>, sortBy: Ref<{ key: string, order: string }[] | undefined>, mustSort: Ref<boolean>) => {
  const sortedItems = computed(() => {
    if (!sortBy.value?.length) return items.value

    return sortItems(items.value, sortBy.value, 'en')
  })

  const toggleSort = (key: string) => {
    let newSortBy = sortBy.value?.map(x => ({ ...x })) ?? []
    const item = newSortBy.find(x => x.key === key)

    if (!item) {
      newSortBy = [...newSortBy, { key, order: 'asc' }]
    } else if (item.order === 'desc') {
      if (mustSort.value) {
        item.order = 'asc'
      } else {
        newSortBy = newSortBy.filter(x => x.key !== key)
      }
    } else {
      item.order = 'desc'
    }

    sortBy.value = newSortBy
  }

  return { items: sortedItems, toggleSort }
}

export const usePagination = (items: Ref<any[]>, itemsPerPage: Ref<number>, page: Ref<number>) => {
  const paginatedItems = computed(() => {
    if (itemsPerPage.value <= 0) return items.value

    const startIndex = itemsPerPage.value * (page.value - 1)
    const stopIndex = startIndex + itemsPerPage.value

    return items.value.slice(startIndex, stopIndex)
  })

  return { items: paginatedItems }
}

export const useGroupBy = (items: Ref<any[]>, groupBy: Ref<string | undefined>) => {
  const groupByOpen = ref(new Set<string>())

  const groupedItems = computed(() => {
    const groups = new Map<string, any[]>()

    if (!groupBy.value) return groups

    for (const item of items.value) {
      const value = item[groupBy.value]
      const group = groups.get(value) ?? []
      group.push(item)
      groups.set(value, group)
    }

    return groups
  })

  const flatItems = computed(() => {
    if (!groupBy.value) return items.value

    const flatItems = []

    for (const [key, value] of groupedItems.value.entries()) {
      flatItems.push({ $type: 'group-header', groupBy: groupBy.value, groupByValue: key })
      if (groupByOpen.value.has(key)) flatItems.push(...value)
    }

    return flatItems
  })

  const toggleGroup = (group: string, value?: boolean) => {
    const open = value == null ? !groupByOpen.value.has(group) : value
    if (open) groupByOpen.value.add(group)
    else groupByOpen.value.delete(group)
  }

  return { items: flatItems, groupedItems, toggleGroup }
}
