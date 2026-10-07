// Composables
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import {
  computed,
  inject,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  onScopeDispose,
  provide,
  reactive,
  ref,
  shallowRef, toRef,
  useId,
  watch,
} from 'vue'
import {
  consoleWarn,
  convertToUnit,
  findChildrenWithProvide,
  getCurrentInstance,
  isPercentage,
  propsFactory,
  resolveSize,
} from '@/util'

// Types
import type { ComponentInternalInstance, CSSProperties, InjectionKey, Prop, Ref } from 'vue'

export type Position = 'top' | 'left' | 'right' | 'bottom'

interface Layer {
  top: number
  bottom: number
  left: number
  right: number
}

interface LayoutItem extends Layer {
  id: string
  size: number
  position: Position
}

interface LayoutProvide {
  register: (
    vm: ComponentInternalInstance,
    options: {
      id: string
      order: Ref<number>
      position: Ref<Position>
      layoutSize: Ref<number | string>
      elementSize: Ref<number | string | undefined>
      active: Ref<boolean>
      disableTransitions?: Ref<boolean>
      absolute: Ref<boolean | undefined>
    }
  ) => {
    layoutItemStyles: Ref<CSSProperties>
    layoutItemScrimStyles: Ref<CSSProperties>
    zIndex: Ref<number>
  }
  unregister: (id: string) => void
  mainRect: Ref<Layer>
  mainStyles: Ref<CSSProperties>
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
  order: {
    type: [Number, String],
    default: 0,
  },
  absolute: Boolean,
}, 'layout-item')

export function useLayout () {
  const layout = inject(VuetifyLayoutKey)

  if (!layout) throw new Error('[Vuetify] Could not find injected layout')

  return {
    getLayoutItem: layout.getLayoutItem,
    mainRect: layout.mainRect,
    mainStyles: layout.mainStyles,
    layoutRect: layout.layoutRect,
  }
}

export function useLayoutItem (options: {
  id: string | undefined
  order: Ref<number>
  position: Ref<Position>
  layoutSize: Ref<number | string>
  elementSize: Ref<number | string | undefined>
  active: Ref<boolean>
  disableTransitions?: Ref<boolean>
  absolute: Ref<boolean | undefined>
}) {
  const layout = inject(VuetifyLayoutKey)

  if (!layout) throw new Error('[Vuetify] Could not find injected layout')

  const id = options.id ?? `layout-item-${useId()}`

  const vm = getCurrentInstance('useLayoutItem')

  provide(VuetifyLayoutItemKey, { id })

  const isKeptAlive = shallowRef(false)
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
  sizeOf: (value: number | string | undefined, position: Position) => number,
  percentOf: (value: number | string | undefined) => number,
): { id: string, layer: Layer, percent: Layer }[] => {
  let previousLayer: Layer = { top: 0, left: 0, right: 0, bottom: 0 }
  let previousPercent: Layer = { ...previousLayer }
  const layers = [{ id: '', layer: { ...previousLayer }, percent: { ...previousPercent } }]
  for (const id of layout) {
    const position = positions.get(id)
    const amount = layoutSizes.get(id)
    const active = activeItems.get(id)
    if (!position || !amount || !active) continue

    const layer = {
      ...previousLayer,
      [position.value]: previousLayer[position.value] + (active.value ? sizeOf(amount.value, position.value) : 0),
    }

    const percent = {
      ...previousPercent,
      [position.value]: previousPercent[position.value] + (active.value ? percentOf(amount.value) : 0),
    }

    layers.push({
      id,
      layer,
      percent,
    })

    previousLayer = layer
    previousPercent = percent
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

  function sizeOf (value: number | string | undefined, position: Position) {
    const span = position === 'left' || position === 'right'
      ? layoutRect.value?.width
      : layoutRect.value?.height

    return resolveSize(value, span ?? 0)
  }

  // before the layout is measured, percentages go to CSS as calc(...).
  // VMain's top/bottom padding would resolve them against the width, so it skips them until then
  function percentOf (value: number | string | undefined) {
    return !layoutRect.value && isPercentage(value) ? parseFloat(value) : 0
  }

  function toOffset (px: number, percent: number) {
    return percent ? `calc(${percent}% + ${px}px)` : `${px}px`
  }

  const isResizing = shallowRef(false)
  let resizeTimeout = -1
  watch(() => [layoutRect.value?.width, layoutRect.value?.height], () => {
    isResizing.value = true
    window.clearTimeout(resizeTimeout)
    resizeTimeout = window.setTimeout(() => (isResizing.value = false), 100)
  })
  onScopeDispose(() => window.clearTimeout(resizeTimeout))

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

      map.set(bottom, { position: topPosition.value, amount: sizeOf(topAmount.value, topPosition.value) })
      map.set(top, { position: bottomPosition.value, amount: -sizeOf(bottomAmount.value, bottomPosition.value) })
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
    return generateLayers(layout, positions, layoutSizes, activeItems, sizeOf, percentOf)
  })

  const transitionsEnabled = computed(() => {
    return !isResizing.value && !Array.from(disabledTransitions.values()).some(ref => ref.value)
  })

  const mainRect = computed(() => {
    return layers.value[layers.value.length - 1].layer
  })

  const mainStyles = toRef(() => {
    const { percent } = layers.value[layers.value.length - 1]
    return {
      '--v-layout-left': toOffset(mainRect.value.left, percent.left),
      '--v-layout-right': toOffset(mainRect.value.right, percent.right),
      '--v-layout-top': toOffset(mainRect.value.top, 0),
      '--v-layout-bottom': toOffset(mainRect.value.bottom, 0),
      ...(transitionsEnabled.value ? undefined : { transition: 'none' }),
    } satisfies CSSProperties
  })

  const items = computed(() => {
    return layers.value.slice(1).map(({ id }, index) => {
      const { layer } = layers.value[index]
      const size = layoutSizes.get(id)
      const position = positions.get(id)

      return {
        id,
        ...layer,
        size: sizeOf(size!.value, position!.value),
        position: position!.value,
      }
    })
  })

  const getLayoutItem = (id: string) => {
    return items.value.find(item => item.id === id)
  }

  const rootVm = getCurrentInstance('createLayout')

  const isMounted = shallowRef(false)
  onMounted(() => {
    isMounted.value = true
  })

  provide(VuetifyLayoutKey, {
    register: (
      vm: ComponentInternalInstance,
      {
        id,
        order,
        position,
        layoutSize,
        elementSize,
        active,
        disableTransitions,
        absolute,
      }
    ) => {
      priorities.set(id, order)
      positions.set(id, position)
      layoutSizes.set(id, layoutSize)
      activeItems.set(id, active)
      disableTransitions && disabledTransitions.set(id, disableTransitions)

      const instances = findChildrenWithProvide(VuetifyLayoutItemKey, rootVm?.vnode)
      const instanceIndex = instances.indexOf(vm)

      if (instanceIndex > -1) registered.value.splice(instanceIndex, 0, id)
      else registered.value.push(id)

      const index = computed(() => items.value.findIndex(i => i.id === id))
      // later siblings aren't registered yet when SSR renders an item, counting them would tie z-indexes
      const zIndex = computed(() => rootZIndex.value - (index.value * 2) + (isMounted.value ? layers.value.length * 2 : 0))

      const layoutItemStyles = computed<CSSProperties>(() => {
        const isHorizontal = position.value === 'left' || position.value === 'right'
        const isOppositeHorizontal = position.value === 'right'
        const isOppositeVertical = position.value === 'bottom'
        const direction = isOppositeHorizontal || isOppositeVertical ? 1 : -1
        const offscreen = `calc(${100 * direction}% + ${direction}px)`
        const transformFunction = `translate${isHorizontal ? 'X' : 'Y'}`

        // percentages stay in CSS until the layout is measured
        const measuredSize = isPercentage(elementSize.value) && layoutRect.value
          ? sizeOf(elementSize.value, position.value)
          : elementSize.value

        const item = { ...items.value[index.value] }

        if (!items.value[index.value]) consoleWarn(`[Vuetify] Could not find layout item "${id}"`)

        const overlap = computedOverlaps.value.get(id)
        if (overlap) {
          item[overlap.position] += overlap.amount
        }

        const { percent } = layers.value[index.value]
        const left = toOffset(item.left, percent.left)
        const right = toOffset(item.right, percent.right)
        const top = toOffset(item.top, percent.top)
        const bottom = toOffset(item.bottom, percent.bottom)

        return {
          left: isOppositeHorizontal ? undefined : left,
          right: isOppositeHorizontal ? right : undefined,
          top: position.value !== 'bottom' ? top : undefined,
          bottom: position.value !== 'top' ? bottom : undefined,
          width: !isHorizontal ? `calc(100% - ${left} - ${right})`
          : measuredSize ? convertToUnit(measuredSize)
          : undefined,
          height: isHorizontal ? `calc(100% - ${top} - ${bottom})`
          : measuredSize ? convertToUnit(measuredSize)
          : undefined,
          zIndex: zIndex.value,
          transform: `${transformFunction}(${active.value ? '0px' : offscreen})`,
          position: absolute.value || rootZIndex.value !== ROOT_ZINDEX ? 'absolute' : 'fixed',
          ...(transitionsEnabled.value ? undefined : { transition: 'none' }),
        }
      })
      const layoutItemScrimStyles = computed<CSSProperties>(() => ({
        zIndex: zIndex.value - 1,
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
    mainRect,
    mainStyles,
    getLayoutItem,
    items,
    layoutRect,
    rootZIndex,
  })

  const layoutClasses = toRef(() => [
    'v-layout',
    { 'v-layout--full-height': props.fullHeight },
  ])

  const layoutStyles = toRef(() => ({
    zIndex: parentLayout ? rootZIndex.value : undefined,
    position: parentLayout ? 'relative' as const : undefined,
    overflow: parentLayout ? 'hidden' : undefined,
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
