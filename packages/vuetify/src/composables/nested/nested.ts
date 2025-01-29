// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import {
  computed,
  inject,
  onBeforeMount,
  onBeforeUnmount,
  provide,
  ref,
  shallowRef,
  toRaw,
  toRef,
} from 'vue'
import {
  independentActiveStrategy,
  independentSingleActiveStrategy,
  leafActiveStrategy,
  leafSingleActiveStrategy,
} from './activeStrategies'
import { listOpenStrategy, multipleOpenStrategy, singleOpenStrategy } from './openStrategies'
import {
  classicSelectStrategy,
  independentSelectStrategy,
  independentSingleSelectStrategy,
  leafSelectStrategy,
  leafSingleSelectStrategy,
} from './selectStrategies'
import { consoleError, getCurrentInstance, getUid, propsFactory } from '@/util'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'
import type { ActiveStrategy } from './activeStrategies'
import type { OpenStrategy } from './openStrategies'
import type { SelectStrategy } from './selectStrategies'
import type { EventProp } from '@/util'

export type ActiveStrategyProp =
  | 'single-leaf'
  | 'leaf'
  | 'independent'
  | 'single-independent'
  | ActiveStrategy
  | ((mandatory: boolean) => ActiveStrategy)
export type SelectStrategyProp =
  | 'single-leaf'
  | 'leaf'
  | 'independent'
  | 'single-independent'
  | 'classic'
  | SelectStrategy
  | ((mandatory: boolean) => SelectStrategy)
export type OpenStrategyProp = 'single' | 'multiple' | 'list' | OpenStrategy

export interface NestedProps {
  activatable: boolean
  selectable: boolean
  activeStrategy: ActiveStrategyProp | undefined
  selectStrategy: SelectStrategyProp | undefined
  openStrategy: OpenStrategyProp | undefined
  activated: any
  selected: any
  opened: any
  mandatory: boolean
  'onUpdate:activated': EventProp<[any]> | undefined
  'onUpdate:selected': EventProp<[any]> | undefined
  'onUpdate:opened': EventProp<[any]> | undefined
}

type NestedProvide = {
  id: Ref<unknown>
  isGroupActivator?: boolean
  root: {
    children: Ref<Map<unknown, unknown[]>>
    parents: Ref<Map<unknown, unknown>>
    activatable: Ref<boolean>
    selectable: Ref<boolean>
    opened: Ref<Set<unknown>>
    activated: Ref<Set<unknown>>
    selected: Ref<Map<unknown, 'on' | 'off' | 'indeterminate'>>
    selectedValues: Ref<unknown[]>
    register: (id: unknown, parentId: unknown, isGroup?: boolean) => void
    unregister: (id: unknown) => void
    open: (id: unknown, value: boolean, event?: Event) => void
    activate: (id: unknown, value: boolean, event?: Event) => void
    select: (id: unknown, value: boolean, event?: Event) => void
    openOnSelect: (id: unknown, value: boolean, event?: Event) => void
    getPath: (id: unknown) => unknown[]
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
    activate: () => null,
    select: () => null,
    activatable: ref(false),
    selectable: ref(false),
    opened: ref(new Set()),
    activated: ref(new Set()),
    selected: ref(new Map()),
    selectedValues: ref([]),
    getPath: () => [],
  },
}

export const makeNestedProps = propsFactory({
  activatable: Boolean,
  selectable: Boolean,
  activeStrategy: [String, Function, Object] as PropType<ActiveStrategyProp>,
  selectStrategy: [String, Function, Object] as PropType<SelectStrategyProp>,
  openStrategy: [String, Object] as PropType<OpenStrategyProp>,
  opened: null,
  activated: null,
  selected: null,
  mandatory: Boolean,
}, 'nested')

export const useNested = (props: NestedProps) => {
  let isUnmounted = false
  const children = ref(new Map<unknown, unknown[]>())
  const parents = ref(new Map<unknown, unknown>())

  const opened = useProxiedModel(props, 'opened', props.opened, v => new Set(v), v => [...v.values()])

  const activeStrategy = computed(() => {
    if (typeof props.activeStrategy === 'object') return props.activeStrategy
    if (typeof props.activeStrategy === 'function') return props.activeStrategy(props.mandatory)

    switch (props.activeStrategy) {
      case 'leaf': return leafActiveStrategy(props.mandatory)
      case 'single-leaf': return leafSingleActiveStrategy(props.mandatory)
      case 'independent': return independentActiveStrategy(props.mandatory)
      case 'single-independent':
      default: return independentSingleActiveStrategy(props.mandatory)
    }
  })

  const selectStrategy = computed(() => {
    if (typeof props.selectStrategy === 'object') return props.selectStrategy
    if (typeof props.selectStrategy === 'function') return props.selectStrategy(props.mandatory)

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

  const activated = useProxiedModel(
    props,
    'activated',
    props.activated,
    v => activeStrategy.value.in(v, children.value, parents.value),
    v => activeStrategy.value.out(v, children.value, parents.value),
  )
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

  const nodeIds = new Set<unknown>()

  const nested: NestedProvide = {
    id: shallowRef(),
    root: {
      opened,
      activatable: toRef(props, 'activatable'),
      selectable: toRef(props, 'selectable'),
      activated,
      selected,
      selectedValues: computed(() => {
        const arr = []

        for (const [key, value] of selected.value.entries()) {
          if (value === 'on') arr.push(key)
        }

        return arr
      }),
      register: (id, parentId, isGroup) => {
        if (nodeIds.has(id)) {
          const path = getPath(id).map(String).join(' -> ')
          const newPath = getPath(parentId).concat(id).map(String).join(' -> ')
          consoleError(`Multiple nodes with the same ID\n\t${path}\n\t${newPath}`)
          return
        } else {
          nodeIds.add(id)
        }

        parentId && id !== parentId && parents.value.set(id, parentId)

        isGroup && children.value.set(id, [])

        if (parentId != null) {
          children.value.set(parentId, [...children.value.get(parentId) || [], id])
        }
      },
      unregister: id => {
        if (isUnmounted) return

        nodeIds.delete(id)
        children.value.delete(id)
        const parent = parents.value.get(id)
        if (parent) {
          const list = children.value.get(parent) ?? []
          children.value.set(parent, list.filter(child => child !== id))
        }
        parents.value.delete(id)
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
      activate: (id, value, event) => {
        if (!props.activatable) {
          return nested.root.select(id, true, event)
        }

        vm.emit('click:activate', { id, value, path: getPath(id), event })

        const newActivated = activeStrategy.value.activate({
          id,
          value,
          activated: new Set(activated.value),
          children: children.value,
          parents: parents.value,
          event,
        })

        newActivated && (activated.value = newActivated)
      },
      children,
      parents,
      getPath,
    },
  }

  provide(VNestedSymbol, nested)

  return nested.root
}

export const useNestedItem = (id: Ref<unknown>, isGroup: boolean) => {
  const parent = inject(VNestedSymbol, emptyNested)

  const uidSymbol = Symbol(getUid())
  const computedId = computed(() => id.value !== undefined ? id.value : uidSymbol)

  const item = {
    ...parent,
    id: computedId,
    open: (open: boolean, e: Event) => parent.root.open(computedId.value, open, e),
    openOnSelect: (open: boolean, e?: Event) => parent.root.openOnSelect(computedId.value, open, e),
    isOpen: computed(() => parent.root.opened.value.has(computedId.value)),
    parent: computed(() => parent.root.parents.value.get(computedId.value)),
    activate: (activated: boolean, e?: Event) => parent.root.activate(computedId.value, activated, e),
    isActivated: computed(() => parent.root.activated.value.has(toRaw(computedId.value))),
    select: (selected: boolean, e?: Event) => parent.root.select(computedId.value, selected, e),
    isSelected: computed(() => parent.root.selected.value.get(toRaw(computedId.value)) === 'on'),
    isIndeterminate: computed(() => parent.root.selected.value.get(toRaw(computedId.value)) === 'indeterminate'),
    isLeaf: computed(() => !parent.root.children.value.get(computedId.value)),
    isGroupActivator: parent.isGroupActivator,
  }

  onBeforeMount(() => {
    !parent.isGroupActivator && parent.root.register(computedId.value, parent.id.value, isGroup)
  })

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
