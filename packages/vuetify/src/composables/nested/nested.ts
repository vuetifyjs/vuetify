import { useProxiedModel } from '@/composables/proxiedModel'
import { getCurrentInstance, getUid, propsFactory } from '@/util'
import { computed, inject, onBeforeUnmount, provide, ref, toRef } from 'vue'
import { listOpenStrategy, multipleOpenStrategy, singleOpenStrategy } from './openStrategies'
import {
  classicLeafSelectStrategy,
  classicSelectStrategy,
  independentSelectStrategy,
  independentSingleSelectStrategy,
  leafSelectStrategy,
  leafSingleSelectStrategy,
} from './selectStrategies'

// Types
import type { InjectionKey, Prop, Ref } from 'vue'
import type { SelectStrategy } from './selectStrategies'
import type { OpenStrategy } from './openStrategies'

export type SelectStrategyValue =
  | 'single-leaf'
  | 'leaf'
  | 'independent'
  | 'single-independent'
  | 'classic'
  | 'classic-leaf'
  | SelectStrategy
export type OpenStrategyValue = 'single' | 'multiple' | 'list' | OpenStrategy

export interface NestedProps {
  selected: unknown[] | undefined
  opened: unknown[] | undefined
  selectStrategy: SelectStrategyValue | undefined
  openStrategy: OpenStrategyValue | undefined
  mandatory: boolean
  'onUpdate:selected': ((val: unknown[]) => void) | undefined
  'onUpdate:opened': ((val: unknown[]) => void) | undefined
  selectedClass: string | undefined
}

type NestedProvide = {
  id: Ref<unknown>
  isGroupActivator?: boolean
  root: {
    children: Ref<Map<unknown, unknown[]>>
    parents: Ref<Map<unknown, unknown>>
    opened: Ref<Set<unknown>>
    selected: Ref<Map<unknown, 'on' | 'off' | 'indeterminate'>>
    selectedValues: Ref<unknown[]>
    register: (id: unknown, parentId: unknown, isGroup?: boolean) => void
    unregister: (id: unknown) => void
    open: (id: unknown, value: boolean, event?: Event) => void
    select: (id: unknown, value: boolean, event?: Event) => void
    openOnSelect: (id: unknown, value: boolean, event?: Event) => void
    emit: (event: string, value: any) => void
    selectedClass: Ref<string | undefined>
    getPath: (id: unknown) => unknown[]
    getChildren: (id: unknown) => unknown[]
    selectable: (id: unknown) => boolean
  }
}

export const VNestedSymbol: InjectionKey<NestedProvide> = Symbol.for('vuetify:nested')

export const emptyNested: NestedProvide = {
  id: ref(),
  root: {
    emit: () => null,
    register: () => null,
    unregister: () => null,
    parents: ref(new Map()),
    children: ref(new Map()),
    open: () => null,
    openOnSelect: () => null,
    select: () => null,
    opened: ref(new Set()),
    selected: ref(new Map()),
    selectedValues: ref([]),
    selectedClass: ref(),
    getPath: () => [],
    getChildren: () => [],
    selectable: () => true,
  },
}

export const makeNestedProps = propsFactory({
  opened: Array as Prop<unknown[]>,
  selected: Array as Prop<unknown[]>,
  selectStrategy: [String, Object] as Prop<SelectStrategyValue>,
  openStrategy: [String, Object] as Prop<OpenStrategyValue>,
  selectedClass: String,
  mandatory: Boolean,
}, 'nested')

export const useNested = (props: NestedProps) => {
  let isUnmounted = false
  const children = ref(new Map<unknown, unknown[]>())
  const parents = ref(new Map<unknown, unknown>())

  const opened = useProxiedModel(props, 'opened', undefined, v => new Set(v), v => [...v.values()])

  const selectStrategy = computed(() => {
    if (props.selectStrategy && typeof props.selectStrategy !== 'string') return props.selectStrategy

    switch (props.selectStrategy) {
      case 'single-leaf': return leafSingleSelectStrategy
      case 'leaf': return leafSelectStrategy
      case 'independent': return independentSelectStrategy
      case 'single-independent': return independentSingleSelectStrategy
      case 'classic-leaf': return classicLeafSelectStrategy
      case 'classic':
      default: return classicSelectStrategy
    }
  })

  const openStrategy = computed(() => {
    if (props.openStrategy && typeof props.openStrategy !== 'string') return props.openStrategy

    switch (props.openStrategy) {
      case 'list': return listOpenStrategy
      case 'single': return singleOpenStrategy
      case 'multiple':
      default: return multipleOpenStrategy
    }
  })

  const selected = useProxiedModel(
    props,
    'selected',
    undefined,
    v => selectStrategy.value.in(v, children.value, parents.value),
    v => selectStrategy.value.out(v, children.value, parents.value),
  )

  onBeforeUnmount(() => {
    isUnmounted = true
  })

  function getPath (id: unknown) {
    const path: unknown[] = []
    let parent: unknown = id

    while (parent != null) {
      path.unshift(parent)
      parent = parents.value.get(parent)
    }

    return path
  }

  function getChildren (id: unknown) {
    const arr: unknown[] = []
    const queue = (children.value.get(id) ?? []).slice()

    while (queue.length) {
      const child = queue.shift()

      if (!child) continue

      arr.push(child)

      queue.push(...(children.value.get(child) ?? []))
    }

    return arr
  }

  const vm = getCurrentInstance('nested')

  const nested: NestedProvide = {
    id: ref(),
    root: {
      emit: vm.emit,
      opened,
      selected,
      selectedValues: computed(() => {
        const arr = []

        for (const [key, value] of selected.value.entries()) {
          if (value === 'on') arr.push(key)
        }

        return arr
      }),
      register: (id, parentId, isGroup) => {
        parentId && id !== parentId && parents.value.set(id, parentId)

        isGroup && !children.value.has(id) && children.value.set(id, [])

        if (parentId != null) {
          children.value.set(parentId, [...(children.value.get(parentId) ?? []), id])
        }
      },
      unregister: id => {
        if (isUnmounted) return

        children.value.delete(id)
        const parent = parents.value.get(id)
        if (parent) {
          const list = children.value.get(parent) ?? []
          children.value.set(parent, list.filter(child => child !== id))
        }
        parents.value.delete(id)
        opened.value.delete(id)
      },
      open: (id, value, event) => {
        vm.emit('click:open', { id, value, path: getPath(id), event })

        const newOpened = openStrategy.value.open({
          id,
          value,
          opened: new Set(opened.value),
          children: children.value,
          parents: parents.value,
          event,
        })

        newOpened && (opened.value = newOpened)
      },
      openOnSelect: (id, value, event) => {
        const newOpened = openStrategy.value.select({
          id,
          value,
          selected: new Map(selected.value),
          opened: new Set(opened.value),
          children: children.value,
          parents: parents.value,
          event,
        })
        newOpened && (opened.value = newOpened)
      },
      select: (id, value, event) => {
        vm.emit('click:select', { id, value, path: getPath(id), event })

        const newSelected = selectStrategy.value.select({
          id,
          value,
          selected: new Map(selected.value),
          children: children.value,
          parents: parents.value,
          event,
          mandatory: props.mandatory,
        })
        newSelected && (selected.value = newSelected)

        nested.root.openOnSelect(id, value, event)
      },
      selectable: id => selectStrategy.value.selectable({
        id,
        children: children.value,
        parents: parents.value,
      }),
      children,
      parents,
      selectedClass: toRef(props, 'selectedClass'),
      getPath,
      getChildren,
    },
  }

  provide(VNestedSymbol, nested)

  return nested.root
}

export const useNestedItem = (id: Ref<unknown>, isGroup: boolean) => {
  const parent = inject(VNestedSymbol, emptyNested)

  const computedId = computed<unknown>(() => id.value ?? getUid().toString())

  const root = parent.root

  const isSelected = computed(() => root.selected.value.get(computedId.value) === 'on')

  const item = {
    ...parent,
    id: computedId,
    open: (open: boolean, e?: Event) => root.open(computedId.value, open, e),
    openOnSelect: (open: boolean, e?: Event) => root.openOnSelect(computedId.value, open, e),
    isOpen: computed(() => root.opened.value.has(computedId.value)),
    parent: computed(() => root.parents.value.get(computedId.value)),
    select: (selected: boolean, e?: Event) => root.select(computedId.value, selected, e),
    isSelected,
    isSelectable: computed(() => root.selectable(computedId.value)),
    isIndeterminate: computed(() => root.selected.value.get(computedId.value) === 'indeterminate'),
    isLeaf: computed(() => !root.children.value.get(computedId.value)),
    selectedClass: computed(() => isSelected.value && [root.selectedClass.value]),
    isGroupActivator: parent.isGroupActivator,
  }

  !parent.isGroupActivator && root.register(computedId.value, parent.id.value, isGroup)

  onBeforeUnmount(() => {
    !parent.isGroupActivator && root.unregister(computedId.value)
  })

  isGroup && provide(VNestedSymbol, item)

  return item
}

export const useNestedGroupActivator = () => {
  const parent = inject(VNestedSymbol, emptyNested)

  provide(VNestedSymbol, { ...parent, isGroupActivator: true })
}
