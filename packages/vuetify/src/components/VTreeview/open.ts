// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, toRaw, toValue, watch } from 'vue'

// Types
import type { MaybeRefOrGetter, Ref } from 'vue'
import type { ListItem } from '@/composables/list-items'
import type { EventProp } from '@/util'

type GetPath = (id: unknown) => unknown[]

interface OpenProps {
  opened: unknown[]
  'onUpdate:opened': EventProp | undefined
  openAll: boolean
  returnObject: boolean
  search: string | undefined
}

export function useOpened (
  props: OpenProps,
  items: Ref<ListItem[]>,
  filteredItems: Ref<ListItem[]>,
  getPath: MaybeRefOrGetter<GetPath | undefined>,
) {
  const opened = useProxiedModel(
    props,
    'opened',
    props.opened,
    (v): unknown[] => Array.isArray(v) ? v : [],
  )

  const revealedBySearch = new Set<unknown>()
  const collapsedByUser = new Set<unknown>()

  function idOf (item: ListItem) {
    return props.returnObject ? toRaw(item.raw) : item.props.value
  }

  function everyGroupId (items: ListItem[]): unknown[] {
    return items.flatMap(item => item.children
      ? [idOf(item), ...everyGroupId(item.children)]
      : []
    )
  }

  const allGroupIds = computed(() => {
    return props.openAll ? everyGroupId(items.value).map(toRaw) : []
  })

  watch(allGroupIds, (ids, previous = []) => {
    const open = new Set(opened.value.map(toRaw))
    const all = new Set(ids)

    const toOpen = ids.filter(id => !previous.includes(id) && !open.has(id))
    const toClose = previous.filter(id => !all.has(id) && open.has(id))

    if (!toOpen.length && !toClose.length) return

    toOpen.forEach(id => open.add(id))
    toClose.forEach(id => open.delete(id))

    opened.value = [...open]
  }, { immediate: true })

  const groupsRevealingMatches = computed<unknown[]>(() => {
    const getPathTo = toValue(getPath)

    if (!props.search || !getPathTo) return []

    const groups = filteredItems.value
      .flatMap(item => {
        const branch = getPathTo(idOf(item))
        return item.children ? branch : branch.slice(0, -1)
      })

    return [...new Set(groups.map(toRaw))]
  })

  watch(opened, val => {
    const open = new Set(val.map(toRaw))
    revealedBySearch.forEach(id => open.has(id) || collapsedByUser.add(id))
  })

  watch(() => props.search, () => collapsedByUser.clear())

  watch(groupsRevealingMatches, groups => {
    const open = new Set(opened.value.map(toRaw))
    const toOpen = groups.filter(id => !open.has(id) && !collapsedByUser.has(id))

    if (!toOpen.length) return

    toOpen.forEach(id => revealedBySearch.add(id))

    opened.value = [...opened.value, ...toOpen]
  })

  watch(() => !props.search, cleared => {
    if (!cleared || !revealedBySearch.size) return

    const getPathTo = toValue(getPath)

    const stillNeeded = new Set(
      opened.value
        .map(toRaw)
        .filter(id => !revealedBySearch.has(id))
        .flatMap(id => (getPathTo?.(id) ?? [id]))
        .map(toRaw)
    )

    opened.value = opened.value
      .map(toRaw)
      .filter(val => !revealedBySearch.has(val) || stillNeeded.has(val))

    revealedBySearch.clear()
  })

  return opened
}
