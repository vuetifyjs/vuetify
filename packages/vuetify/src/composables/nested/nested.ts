// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, inject, onBeforeUnmount, provide, ref, shallowRef, toRaw } from 'vue'
import { listOpenStrategy, multipleOpenStrategy, singleOpenStrategy } from './openStrategies'
import {
  classicSelectStrategy,
  independentSelectStrategy,
  independentSingleSelectStrategy,
  leafSelectStrategy,
  leafSingleSelectStrategy,
} from './selectStrategies'
import { getCurrentInstance, getUid, propsFactory } from '@/util'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'
import type { OpenStrategy } from './openStrategies'
import type { SelectStrategyFn } from './selectStrategies'

export type SelectStrategy = 'single-leaf' | 'leaf' | 'independent' | 'single-independent' | 'classic' | SelectStrategyFn
export type OpenStrategyProp = 'single' | 'multiple' | 'list' | OpenStrategy

export interface NestedProps {
  selectStrategy: SelectStrategy | undefined
  openStrategy: OpenStrategyProp | undefined
  selected: readonly unknown[] | undefined
  opened: readonly unknown[] | undefined
  mandatory: boolean
  'onUpdate:selected': ((val: unknown[]) => void) | undefined
  'onUpdate:opened': ((val: unknown[]) => void) | undefined
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
  }
}

export const VNestedSymbol: InjectionKey<NestedProvide> = Symbol.for('vuetify:nested')

export const emptyNested: NestedProvide = {
  id: shallowRef(),
  root: {
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
  },
}

export const makeNestedProps = propsFactory({
  selectStrategy: [String, Function] as PropType<SelectStrategy>,
  openStrategy: [String, Object] as PropType<OpenStrategyProp>,
  opened: Array as PropType<readonly unknown[]>,
  selected: Array as PropType<readonly unknown[]>,
  mandatory: Boolean,
}, 'nested')

export const useNested = (props: NestedProps) => {
  let isUnmounted = false
  const children = ref(new Map<unknown, unknown[]>())
  const parents = ref(new Map<unknown, unknown>())

  const opened = useProxiedModel(props, 'opened', props.opened, v => new Set(v), v => [...v.values()])

  const selectStrategy = computed(() => {
    if (typeof props.selectStrategy === 'object') return props.selectStrategy

    switch (props.selectStrategy) {
      case 'single-leaf': return leafSingleSelectStrategy(props.mandatory)
      case 'leaf': return leafSelectStrategy(props.mandatory)
      case 'independent': return independentSelectStrategy(props.mandatory)
      case 'single-independent': return independentSingleSelectStrategy(props.mandatory)
      case 'classic':
      default: return classicSelectStrategy(props.mandatory)
    }
  })

  const openStrategy = computed(() => {
    if (typeof props.openStrategy === 'object') return props.openStrategy

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
    props.selected,
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

  const vm = getCurrentInstance('nested')

  const nested: NestedProvide = {
    id: shallowRef(),
    root: {
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

        isGroup && children.value.set(id, [])

        if (parentId != null) {
          children.value.set(parentId, [...children.value.get(parentId) || [], id])
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
        })
        newSelected && (selected.value = newSelected)

        nested.root.openOnSelect(id, value, event)
      },
      children,
      parents,
    },
  }

  provide(VNestedSymbol, nested)

  return nested.root
}

export const useNestedItem = (id: Ref<unknown>, isGroup: boolean) => {
  const parent = inject(VNestedSymbol, emptyNested)

  const uidSymbol = Symbol(getUid())
  const computedId = computed(() => id.value ?? uidSymbol)

  const item = {
    ...parent,
    id: computedId,
    open: (open: boolean, e: Event) => parent.root.open(computedId.value, open, e),
    openOnSelect: (open: boolean, e?: Event) => parent.root.openOnSelect(computedId.value, open, e),
    isOpen: computed(() => parent.root.opened.value.has(computedId.value)),
    parent: computed(() => parent.root.parents.value.get(computedId.value)),
    select: (selected: boolean, e?: Event) => parent.root.select(computedId.value, selected, e),
    isSelected: computed(() => parent.root.selected.value.get(toRaw(computedId.value)) === 'on'),
    isIndeterminate: computed(() => parent.root.selected.value.get(computedId.value) === 'indeterminate'),
    isLeaf: computed(() => !parent.root.children.value.get(computedId.value)),
    isGroupActivator: parent.isGroupActivator,
  }

  !parent.isGroupActivator && parent.root.register(computedId.value, parent.id.value, isGroup)

  onBeforeUnmount(() => {
    !parent.isGroupActivator && parent.root.unregister(computedId.value)
  })

  isGroup && provide(VNestedSymbol, item)

  return item
}

export const useNestedGroupActivator = () => {
  const parent = inject(VNestedSymbol, emptyNested)

  provide(VNestedSymbol, { ...parent, isGroupActivator: true })
}
