import { useProxiedModel } from '@/composables/proxiedModel'
import { getUid, propsFactory } from '@/util'
import { computed, inject, onBeforeUnmount, onMounted, provide, ref } from 'vue'
import { multipleOpenStrategy, singleOpenStrategy } from './openStrategies'
import { classicSelectStrategy, independentSelectStrategy, leafSelectStrategy } from './selectStrategies'

// Types
import type { InjectionKey, Prop, Ref } from 'vue'
import type { SelectStrategyFn } from './selectStrategies'
import type { OpenStrategyFn } from './openStrategies'

export type SelectStrategy = 'single-leaf' | 'leaf' | 'independent' | 'classic' | SelectStrategyFn
export type OpenStrategy = 'single' | 'multiple' | OpenStrategyFn

export interface NestedProps {
  selectStrategy?: SelectStrategy
  openStrategy?: OpenStrategy
  opened?: string[]
  selected?: string[]
}

const VNestedSymbol: InjectionKey<any> = Symbol.for('vuetify:nested')

const emptyNested = {
  id: ref(null),
  root: {
    register: () => null,
    unregister: () => null,
    parents: ref(new Map()),
    children: ref(new Map()),
    open: () => null,
    select: () => null,
    opened: ref(new Set()),
    selected: ref(new Map()),
  },
}

export const makeNestedProps = propsFactory({
  selectStrategy: [String, Function] as Prop<SelectStrategy>,
  openStrategy: [String, Function] as Prop<OpenStrategy>,
  opened: Array as Prop<string[]>,
  selected: Array as Prop<string[]>,
}, 'nested')

export const useNested = (props: NestedProps) => {
  const children = ref(new Map<string, string[]>())
  const parents = ref(new Map<string, string>())

  const opened = useProxiedModel(
    props,
    'opened',
    props.opened,
    v => {
      return new Set(v)
    },
    v => {
      return [...v.values()]
    }
  )

  const selectStrategy = computed(() => {
    if (typeof props.selectStrategy === 'object') return props.selectStrategy

    switch (props.selectStrategy) {
      case 'single-leaf': return leafSelectStrategy(true)
      case 'leaf': return leafSelectStrategy()
      case 'independent': return independentSelectStrategy
      case 'classic':
      default: return classicSelectStrategy
    }
  })

  const openStrategy = computed(() => {
    if (typeof props.openStrategy === 'function') return props.openStrategy

    switch (props.openStrategy) {
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

  function openParents (id: string) {
    let parent = parents.value.get(id)

    while (parent) {
      opened.value.add(parent)
      parent = parents.value.get(parent)
    }
  }

  // onMounted(() => {
  //   for (const key of selected.value.keys()) {
  //     openParents(key)
  //   }
  // })

  function showAllSelected () {
    for (const key of selected.value.keys()) {
      openParents(key)
    }
  }

  const root = {
    id: ref(null),
    root: {
      showAllSelected,
      opened,
      selected,
      selectedValues: computed(() => {
        const arr = []

        for (const [key, value] of selected.value.entries()) {
          if (value === 'on') arr.push(key)
        }

        return arr
      }),
      register: (id: string, parentId: string, isGroup: boolean) => {
        parents.value.set(id, parentId)
        isGroup && children.value.set(id, [])

        if (parentId != null) {
          children.value.set(parentId, [...children.value.get(parentId) || [], id])
        }
      },
      unregister: (groupId: string) => {
        children.value.delete(groupId)
        parents.value.delete(groupId)
      },
      open: (id: string, value: boolean, e: Event) => {
        const newOpened = openStrategy.value({
          id,
          value,
          opened: opened.value,
          children: children.value,
          parents: parents.value,
          event: e,
        })

        newOpened && (opened.value = newOpened)
      },
      select: (id: string, value: boolean, e: Event) => {
        selected.value = selectStrategy.value.select({
          id,
          value,
          selected: new Map(selected.value),
          children: children.value,
          parents: parents.value,
          event: e,
        })
      },
      children,
      parents,
    },
  }

  provide(VNestedSymbol, root)

  return root
}

export const useNestedItem = (id: Ref<string | undefined>) => {
  const parent = inject(VNestedSymbol, emptyNested)

  const computedId = computed(() => id.value ?? getUid())

  const item = {
    ...parent,
    id: computedId,
    parent: computed(() => parent.root.parents.value.get(computedId.value)),
    select: (selected: boolean, e: Event) => parent.root.select(computedId.value, selected, e),
    isSelected: computed(() => parent.root.selected.value.get(computedId.value) === 'on'),
  }

  parent.root.register(computedId.value, parent.id.value, false)

  onBeforeUnmount(() => {
    parent.root.unregister(computedId.value)
  })

  return item
}

export const useNestedGroup = (props: { value: string }) => {
  const parent = inject(VNestedSymbol, emptyNested)

  const id = computed(() => props.value ?? getUid())

  const group = {
    ...parent,
    id,
    open: (open: boolean, e: Event) => parent.root.open(id.value, open, e),
    isOpen: computed(() => parent.root.opened.value.has(id.value)),
    isSelected: computed(() => parent.root.selected.value.get(id.value) === 'on'),
    isIndeterminate: computed(() => parent.root.selected.value.get(id.value) === 'indeterminate'),
  }

  parent.root.register(id.value, parent.id.value, true)

  onBeforeUnmount(() => {
    parent.root.unregister(id.value)
  })

  provide(VNestedSymbol, group)

  return group
}
