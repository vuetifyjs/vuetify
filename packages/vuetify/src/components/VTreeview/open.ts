// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, toRaw, watch } from 'vue'

// Types
import type { Ref } from 'vue'
import type { ListItem } from '@/composables/list-items'

type GetPath = (id: unknown) => unknown[]

interface OpenProps {
  opened: unknown[]
  openAll: boolean
  returnObject: boolean
  search: string | undefined
}

export function useOpened (
  props: OpenProps,
  items: Ref<ListItem[]>,
  filteredItems: Ref<ListItem[]>,
  getPath: () => GetPath | undefined,
) {
  const opened = useProxiedModel(
    props,
    'opened',
    props.opened,
    (v): unknown[] => Array.isArray(v) ? v : [],
  )

  const idOf = (item: ListItem) => props.returnObject ? toRaw(item.raw) : item.props.value

  function everyGroupId (items: ListItem[]): unknown[] {
    return items.flatMap(item => item.children
      ? [idOf(item), ...everyGroupId(item.children)]
      : []
    )
  }

  watch([() => props.openAll, items], ([openAll]) => {
    if (openAll) opened.value = everyGroupId(items.value)
  }, { immediate: true })

  const revealedBySearch = new Set<unknown>()

  const groupsRevealingMatches = computed<unknown[]>(() => {
    const getPathTo = getPath()
    if (!props.search || !getPathTo) return []
    return [...new Set(
      filteredItems.value.flatMap(item => {
        const branch = getPathTo(idOf(item))
        return item.children ? branch : branch.slice(0, -1)
      }).map(toRaw)
    )]
  })

  watch(groupsRevealingMatches, groups => {
    const open = new Set(opened.value.map(toRaw))
    const toOpen = groups.filter(id => !open.has(id))
    if (!toOpen.length) return
    toOpen.forEach(id => revealedBySearch.add(id))
    opened.value = [...opened.value, ...toOpen]
  })

  watch(() => !!props.search, searching => {
    if (searching || !revealedBySearch.size) return
    const getPathTo = getPath()
    const stillNeeded = new Set(
      opened.value
        .map(toRaw)
        .filter(id => !revealedBySearch.has(id))
        .flatMap(id => (getPathTo?.(id) ?? [id]).map(toRaw))
    )
    opened.value = opened.value.filter(id => {
      const raw = toRaw(id)
      return !revealedBySearch.has(raw) || stillNeeded.has(raw)
    })
    revealedBySearch.clear()
  })

  return opened
}
