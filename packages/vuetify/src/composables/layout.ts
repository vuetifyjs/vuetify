// Composables
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { computed, inject, onActivated, onBeforeUnmount, onDeactivated, onMounted, provide, reactive, ref } from 'vue'
import { convertToUnit, findChildrenWithProvide, getCurrentInstance, getUid, propsFactory } from '@/util'

// Types
import type { ComponentInternalInstance, InjectionKey, Prop, Ref } from 'vue'

type Position = 'top' | 'left' | 'right' | 'bottom'

type LayoutItem = {
  id: string
  top: number
  bottom: number
  left: number
  right: number
  size: number
}

interface LayoutProvide {
  register: (
    vm: ComponentInternalInstance,
    options: {
      id: string
      priority: Ref<number>
      position: Ref<Position>
      layoutSize: Ref<number | string>
      elementSize: Ref<number | string | undefined>
      active: Ref<boolean>
      disableTransitions?: Ref<boolean>
      absolute: Ref<boolean | undefined>
    }
  ) => {
    layoutItemStyles: Ref<Record<string, unknown>>
    layoutItemScrimStyles: Ref<Record<string, unknown>>
    zIndex: Ref<number>
  }
  unregister: (id: string) => void
  mainStyles: Ref<Record<string, unknown>>
  getLayoutItem: (id: string) => LayoutItem | undefined
  items: Ref<LayoutItem[]>
  layoutRect: Ref<DOMRectReadOnly | undefined>
  rootZIndex: Ref<number>
}

export const VuetifyLayoutKey: InjectionKey<LayoutProvide> = Symbol.for('vuetify:layout')
export const VuetifyLayoutItemKey: InjectionKey<{ id: string }> = Symbol.for('vuetify:layout-item')

const ROOT_ZINDEX = 1000

export const makeLayoutProps = propsFactory({
  overlaps: {
    type: Array,
    default: () => ([]),
  } as Prop<string[]>,
  fullHeight: Boolean,
}, 'layout')

// Composables
export const makeLayoutItemProps = propsFactory({
  name: {
    type: String,
  },
  priority: {
    type: [Number, String],
    default: 0,
  },
  absolute: Boolean,
}, 'layout-item')

export function useLayout () {
  const layout = inject(VuetifyLayoutKey)

  if (!layout) throw new Error('Could not find injected Vuetify layout')

  return layout
}

export function useLayoutItem (options: {
  id: string | undefined
  priority: Ref<number>
  position: Ref<Position>
  layoutSize: Ref<number | string>
  elementSize: Ref<number | string | undefined>
  active: Ref<boolean>
  disableTransitions?: Ref<boolean>
  absolute: Ref<boolean | undefined>
}) {
  const layout = inject(VuetifyLayoutKey)

  if (!layout) throw new Error('Could not find injected Vuetify layout')

  const id = options.id ?? `layout-item-${getUid()}`

  const vm = getCurrentInstance('useLayoutItem')

  provide(VuetifyLayoutItemKey, { id })

  const isKeptAlive = ref(false)
  onDeactivated(() => isKeptAlive.value = true)
  onActivated(() => isKeptAlive.value = false)

  const {
    layoutItemStyles,
    layoutItemScrimStyles,
  } = layout.register(vm, {
    ...options,
    active: computed(() => isKeptAlive.value ? false : options.active.value),
    id,
  })

  onBeforeUnmount(() => layout.unregister(id))

  return { layoutItemStyles, layoutRect: layout.layoutRect, layoutItemScrimStyles }
}

const generateLayers = (
  layout: string[],
  positions: Map<string, Ref<Position>>,
  layoutSizes: Map<string, Ref<number | string>>,
  activeItems: Map<string, Ref<boolean>>,
) => {
  let previousLayer = { top: 0, left: 0, right: 0, bottom: 0 }
  const layers = [{ id: '', layer: { ...previousLayer } }]
  for (const id of layout) {
    const position = positions.get(id)
    const amount = layoutSizes.get(id)
    const active = activeItems.get(id)
    if (!position || !amount || !active) continue

    const layer = {
      ...previousLayer,
      [position.value]: parseInt(previousLayer[position.value], 10) + (active.value ? parseInt(amount.value, 10) : 0),
    }

    layers.push({
      id,
      layer,
    })

    previousLayer = layer
  }

  return layers
}

export function createLayout (props: { overlaps?: string[], fullHeight?: boolean }) {
  const parentLayout = inject(VuetifyLayoutKey, null)
  const rootZIndex = computed(() => parentLayout ? parentLayout.rootZIndex.value - 100 : ROOT_ZINDEX)
  const registered = ref<string[]>([])
  const positions = reactive(new Map<string, Ref<Position>>())
  const layoutSizes = reactive(new Map<string, Ref<number | string>>())
  const priorities = reactive(new Map<string, Ref<number>>())
  const activeItems = reactive(new Map<string, Ref<boolean>>())
  const disabledTransitions = reactive(new Map<string, Ref<boolean>>())
  const { resizeRef, contentRect: layoutRect } = useResizeObserver()

  const computedOverlaps = computed(() => {
    const map = new Map<string, { position: Position, amount: number }>()
    const overlaps = props.overlaps ?? []
    for (const overlap of overlaps.filter(item => item.includes(':'))) {
      const [top, bottom] = overlap.split(':')
      if (!registered.value.includes(top) || !registered.value.includes(bottom)) continue

      const topPosition = positions.get(top)
      const bottomPosition = positions.get(bottom)
      const topAmount = layoutSizes.get(top)
      const bottomAmount = layoutSizes.get(bottom)

      if (!topPosition || !bottomPosition || !topAmount || !bottomAmount) continue

      map.set(bottom, { position: topPosition.value, amount: parseInt(topAmount.value, 10) })
      map.set(top, { position: bottomPosition.value, amount: -parseInt(bottomAmount.value, 10) })
    }

    return map
  })

  const layers = computed(() => {
    const uniquePriorities = [...new Set([...priorities.values()].map(p => p.value))].sort((a, b) => a - b)
    const layout = []
    for (const p of uniquePriorities) {
      const items = registered.value.filter(id => priorities.get(id)?.value === p)
      layout.push(...items)
    }
    return generateLayers(layout, positions, layoutSizes, activeItems)
  })

  const transitionsEnabled = computed(() => {
    return !Array.from(disabledTransitions.values()).some(ref => ref.value)
  })

  const mainStyles = computed(() => {
    const layer = layers.value[layers.value.length - 1].layer

    return {
      position: 'relative',
      paddingLeft: convertToUnit(layer.left),
      paddingRight: convertToUnit(layer.right),
      paddingTop: convertToUnit(layer.top),
      paddingBottom: convertToUnit(layer.bottom),
      ...(transitionsEnabled.value ? undefined : { transition: 'none' }),
    }
  })

  const items = computed(() => {
    return layers.value.slice(1).map(({ id }, index) => {
      const { layer } = layers.value[index]
      const size = layoutSizes.get(id)

      return {
        id,
        ...layer,
        size: Number(size!.value),
      }
    })
  })

  const getLayoutItem = (id: string) => {
    return items.value.find(item => item.id === id)
  }

  const rootVm = getCurrentInstance('createLayout')

  const isMounted = ref(false)
  onMounted(() => {
    isMounted.value = true
  })

  provide(VuetifyLayoutKey, {
    register: (
      vm: ComponentInternalInstance,
      {
        id,
        priority,
        position,
        layoutSize,
        elementSize,
        active,
        disableTransitions,
        absolute,
      }
    ) => {
      priorities.set(id, priority)
      positions.set(id, position)
      layoutSizes.set(id, layoutSize)
      activeItems.set(id, active)
      disableTransitions && disabledTransitions.set(id, disableTransitions)

      const instances = findChildrenWithProvide(VuetifyLayoutItemKey, rootVm?.vnode)
      const instanceIndex = instances.indexOf(vm)

      if (instanceIndex > -1) registered.value.splice(instanceIndex, 0, id)
      else registered.value.push(id)

      const index = computed(() => items.value.findIndex(i => i.id === id))
      const zIndex = computed(() => rootZIndex.value + (layers.value.length * 2) - (index.value * 2))

      const layoutItemStyles = computed(() => {
        const isHorizontal = position.value === 'left' || position.value === 'right'
        const isOppositeHorizontal = position.value === 'right'
        const isOppositeVertical = position.value === 'bottom'

        const styles = {
          [position.value]: 0,
          zIndex: zIndex.value,
          transform: `translate${isHorizontal ? 'X' : 'Y'}(${(active.value ? 0 : -110) * (isOppositeHorizontal || isOppositeVertical ? -1 : 1)}%)`,
          position: absolute.value || rootZIndex.value !== ROOT_ZINDEX ? 'absolute' : 'fixed',
          ...(transitionsEnabled.value ? undefined : { transition: 'none' }),
        }

        if (!isMounted.value) return styles

        if (index.value < 0) throw new Error(`Layout item "${id}" is missing`)

        const item = items.value[index.value]

        if (!item) throw new Error(`Could not find layout item "${id}`)

        const overlap = computedOverlaps.value.get(id)
        if (overlap) {
          item[overlap.position] += overlap.amount
        }

        return {
          ...styles,
          height: isHorizontal ? `calc(100% - ${item.top}px - ${item.bottom}px)` : elementSize.value ? `${elementSize.value}px` : undefined,
          marginLeft: isOppositeHorizontal ? undefined : `${item.left}px`,
          marginRight: isOppositeHorizontal ? `${item.right}px` : undefined,
          marginTop: position.value !== 'bottom' ? `${item.top}px` : undefined,
          marginBottom: position.value !== 'top' ? `${item.bottom}px` : undefined,
          width: !isHorizontal ? `calc(100% - ${item.left}px - ${item.right}px)` : elementSize.value ? `${elementSize.value}px` : undefined,
        }
      })

      const layoutItemScrimStyles = computed(() => ({
        zIndex: zIndex.value - 1,
        position: rootZIndex.value === ROOT_ZINDEX ? 'fixed' : 'absolute',
      }))

      return { layoutItemStyles, layoutItemScrimStyles, zIndex }
    },
    unregister: (id: string) => {
      priorities.delete(id)
      positions.delete(id)
      layoutSizes.delete(id)
      activeItems.delete(id)
      disabledTransitions.delete(id)
      registered.value = registered.value.filter(v => v !== id)
    },
    mainStyles,
    getLayoutItem,
    items,
    layoutRect,
    rootZIndex,
  })

  const layoutClasses = computed(() => [
    'v-layout',
    { 'v-layout--full-height': props.fullHeight },
  ])

  const layoutStyles = computed(() => ({
    zIndex: rootZIndex.value,
  }))

  return {
    layoutClasses,
    layoutStyles,
    getLayoutItem,
    items,
    layoutRect,
    layoutRef: resizeRef,
  }
}
