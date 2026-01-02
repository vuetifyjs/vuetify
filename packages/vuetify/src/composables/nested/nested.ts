// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import {
  computed,
  inject,
  nextTick,
  onBeforeMount,
  onBeforeUnmount,
  provide,
  ref,
  shallowRef,
  toRaw,
  toRef,
  toValue,
  watch,
} from 'vue'
import {
  independentActiveStrategy,
  independentSingleActiveStrategy,
  leafActiveStrategy,
  leafSingleActiveStrategy,
} from './activeStrategies'
import { listOpenStrategy, multipleOpenStrategy, singleOpenStrategy } from './openStrategies'
import {
  branchSelectStrategy,
  classicSelectStrategy,
  independentSelectStrategy,
  independentSingleSelectStrategy,
  leafSelectStrategy,
  leafSingleSelectStrategy,
  trunkSelectStrategy,
} from './selectStrategies'
import { consoleError, getCurrentInstance, propsFactory, throttle } from '@/util'

// Types
import type { InjectionKey, MaybeRefOrGetter, PropType, Ref } from 'vue'
import type { ActiveStrategy } from './activeStrategies'
import type { OpenStrategy } from './openStrategies'
import type { SelectStrategy } from './selectStrategies'
import type { ListItem } from '@/composables/list-items'
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
  | 'trunk'
  | 'branch'
  | SelectStrategy
  | ((mandatory: boolean) => SelectStrategy)
export type OpenStrategyProp = 'single' | 'multiple' | 'list' | OpenStrategy
export type ItemsRegistrationType = 'props' | 'render'

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
  itemsRegistration: ItemsRegistrationType
  'onUpdate:activated': EventProp<[any]> | undefined
  'onUpdate:selected': EventProp<[any]> | undefined
  'onUpdate:opened': EventProp<[any]> | undefined
}

type NestedProvide = {
  id: Ref<unknown>
  isGroupActivator?: boolean
  tags: Ref<{ item: string | undefined, group: string }>
  root: {
    children: Ref<Map<unknown, unknown[]>>
    parents: Ref<Map<unknown, unknown>>
    disabled: Ref<Set<unknown>>
    activatable: Ref<boolean>
    selectable: Ref<boolean>
    opened: Ref<Set<unknown>>
    activated: Ref<Set<unknown>>
    scrollToActive: Ref<boolean>
    selected: Ref<Map<unknown, 'on' | 'off' | 'indeterminate'>>
    selectedValues: Ref<unknown[]>
    itemsRegistration: Ref<ItemsRegistrationType>
    register: (id: unknown, parentId: unknown, isDisabled: boolean, isGroup?: boolean) => void
    unregister: (id: unknown) => void
    updateDisabled: (id: unknown, isDisabled: boolean) => void
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
  tags: computed(() => ({ item: undefined, group: 'div' })),
  root: {
    itemsRegistration: ref('render'),
    register: () => null,
    unregister: () => null,
    updateDisabled: () => null,
    children: ref(new Map()),
    parents: ref(new Map()),
    disabled: ref(new Set()),
    open: () => null,
    openOnSelect: () => null,
    activate: () => null,
    select: () => null,
    activatable: ref(false),
    scrollToActive: ref(false),
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
  itemsRegistration: {
    type: String as PropType<ItemsRegistrationType>,
    default: 'render',
  },
}, 'nested')

export const useNested = (
  props: NestedProps,
  {
    tags,
    items,
    returnObject,
    scrollToActive,
  }: {
    tags: MaybeRefOrGetter<{ item: string | undefined, group: string }>
    items: Ref<ListItem[]>
    returnObject: MaybeRefOrGetter<boolean>
    scrollToActive: MaybeRefOrGetter<boolean>
  },
) => {
  let isUnmounted = false
  const children = shallowRef(new Map<unknown, unknown[]>())
  const parents = shallowRef(new Map<unknown, unknown>())
  const disabled = shallowRef(new Set<unknown>())

  const opened = useProxiedModel(
    props,
    'opened',
    props.opened,
    v => new Set(Array.isArray(v) ? v.map(i => toRaw(i)) : v),
    v => [...v.values()],
  )

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
      case 'trunk': return trunkSelectStrategy(props.mandatory)
      case 'branch': return branchSelectStrategy(props.mandatory)
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
    v => selectStrategy.value.in(v, children.value, parents.value, disabled.value),
    v => selectStrategy.value.out(v, children.value, parents.value),
  )

  onBeforeUnmount(() => {
    isUnmounted = true
  })

  function getPath (id: unknown) {
    const path: unknown[] = []
    let parent: unknown = toRaw(id)

    while (parent !== undefined) {
      path.unshift(parent)
      parent = parents.value.get(parent)
    }

    return path
  }

  const vm = getCurrentInstance('nested')

  const nodeIds = new Set<unknown>()

  const itemsUpdatePropagation = throttle(() => {
    nextTick(() => {
      children.value = new Map(children.value)
      parents.value = new Map(parents.value)
    })
  }, 100)

  watch(() => [items.value, toValue(returnObject)], () => {
    if (props.itemsRegistration === 'props') {
      updateInternalMaps()
    }
  }, { immediate: true })

  function updateInternalMaps () {
    const _parents = new Map()
    const _children = new Map()
    const _disabled = new Set()

    const getValue = toValue(returnObject)
      ? (item: ListItem) => toRaw(item.raw)
      : (item: ListItem) => item.value

    const stack = [...items.value]
    let i = 0
    while (i < stack.length) {
      const item = stack[i++]
      const itemValue = getValue(item)

      if (item.children) {
        const childValues = []
        for (const child of item.children) {
          const childValue = getValue(child)
          _parents.set(childValue, itemValue)
          childValues.push(childValue)
          stack.push(child)
        }
        _children.set(itemValue, childValues)
      }

      if (item.props.disabled) {
        _disabled.add(itemValue)
      }
    }

    children.value = _children
    parents.value = _parents
    disabled.value = _disabled
  }

  const nested: NestedProvide = {
    id: shallowRef(),
    tags: toRef(() => toValue(tags)),
    root: {
      opened,
      activatable: toRef(() => props.activatable),
      scrollToActive: toRef(() => toValue(scrollToActive)),
      selectable: toRef(() => props.selectable),
      activated,
      selected,
      selectedValues: computed(() => {
        const arr = []

        for (const [key, value] of selected.value.entries()) {
          if (value === 'on') arr.push(key)
        }

        return arr
      }),
      itemsRegistration: toRef(() => props.itemsRegistration),
      register: (id, parentId, isDisabled, isGroup) => {
        if (nodeIds.has(id)) {
          const path = getPath(id).map(String).join(' -> ')
          const newPath = getPath(parentId).concat(id).map(String).join(' -> ')
          consoleError(`Multiple nodes with the same ID\n\t${path}\n\t${newPath}`)
          return
        } else {
          nodeIds.add(id)
        }

        parentId && id !== parentId && parents.value.set(id, parentId)

        isDisabled && disabled.value.add(id)
        isGroup && children.value.set(id, [])

        if (parentId != null) {
          children.value.set(parentId, [...children.value.get(parentId) || [], id])
        }
        itemsUpdatePropagation()
      },
      unregister: id => {
        if (isUnmounted) return

        nodeIds.delete(id)
        children.value.delete(id)
        disabled.value.delete(id)
        const parent = parents.value.get(id)
        if (parent) {
          const list = children.value.get(parent) ?? []
          children.value.set(parent, list.filter(child => child !== id))
        }
        parents.value.delete(id)
        itemsUpdatePropagation()
      },
      updateDisabled: (id, isDisabled) => {
        if (isDisabled) {
          disabled.value.add(id)
        } else {
          disabled.value.delete(id)
        }
        // classic selection requires refresh to re-evaluate on/off/indeterminate but
        // currently it is only run for selection interactions, so it will set new disabled
        // to "off" and the visual state becomes out of sync
        // -- selected.value = new Map(selected.value)
        // it is not clear if the framework should un-select when disabled changed to true
        // more discussion is needed
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
          disabled: disabled.value,
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

        if (newActivated.size !== activated.value.size) {
          activated.value = newActivated
        } else {
          for (const value of newActivated) {
            if (!activated.value.has(value)) {
              activated.value = newActivated
              return
            }
          }
          for (const value of activated.value) {
            if (!newActivated.has(value)) {
              activated.value = newActivated
              return
            }
          }
        }
      },
      children,
      parents,
      disabled,
      getPath,
    },
  }

  provide(VNestedSymbol, nested)

  return nested.root
}

export const useNestedItem = (id: MaybeRefOrGetter<unknown>, isDisabled: MaybeRefOrGetter<boolean>, isGroup: boolean) => {
  const parent = inject(VNestedSymbol, emptyNested)

  const uidSymbol = Symbol('nested item')
  const computedId = computed(() => {
    const idValue = toRaw(toValue(id))
    return idValue !== undefined ? idValue : uidSymbol
  })

  const item = {
    ...parent,
    id: computedId,
    open: (open: boolean, e: Event) => parent.root.open(computedId.value, open, e),
    openOnSelect: (open: boolean, e?: Event) => parent.root.openOnSelect(computedId.value, open, e),
    isOpen: computed(() => parent.root.opened.value.has(computedId.value)),
    parent: computed(() => parent.root.parents.value.get(computedId.value)),
    activate: (activated: boolean, e?: Event) => parent.root.activate(computedId.value, activated, e),
    isActivated: computed(() => parent.root.activated.value.has(computedId.value)),
    scrollToActive: parent.root.scrollToActive,
    select: (selected: boolean, e?: Event) => parent.root.select(computedId.value, selected, e),
    isSelected: computed(() => parent.root.selected.value.get(computedId.value) === 'on'),
    isIndeterminate: computed(() => parent.root.selected.value.get(computedId.value) === 'indeterminate'),
    isLeaf: computed(() => !parent.root.children.value.get(computedId.value)),
    isGroupActivator: parent.isGroupActivator,
  }

  onBeforeMount(() => {
    if (parent.isGroupActivator || parent.root.itemsRegistration.value === 'props') return
    nextTick(() => {
      parent.root.register(computedId.value, parent.id.value, toValue(isDisabled), isGroup)
    })
  })

  onBeforeUnmount(() => {
    if (parent.isGroupActivator || parent.root.itemsRegistration.value === 'props') return
    parent.root.unregister(computedId.value)
  })

  watch(computedId, (val, oldVal) => {
    if (parent.isGroupActivator || parent.root.itemsRegistration.value === 'props') return
    parent.root.unregister(oldVal)
    nextTick(() => {
      parent.root.register(val, parent.id.value, toValue(isDisabled), isGroup)
    })
  })

  watch(() => toValue(isDisabled), val => {
    parent.root.updateDisabled(computedId.value, val)
  })

  isGroup && provide(VNestedSymbol, item)

  return item
}

export const useNestedGroupActivator = () => {
  const parent = inject(VNestedSymbol, emptyNested)

  provide(VNestedSymbol, { ...parent, isGroupActivator: true })
}
