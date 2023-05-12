// Styles
import './VVirtualScroll.sass'

// Components
import { VVirtualScrollItem } from './VVirtualScrollItem'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { useDisplay } from '@/composables/display'
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { computed, onMounted, ref, shallowRef, watch, watchEffect } from 'vue'
import {
  clamp,
  convertToUnit,
  createRange,
  genericComponent,
  propsFactory,
  useRender,
} from '@/util'

// Types
import type { GenericProps } from '@/util'

const UP = -1
const DOWN = 1

export interface VVirtualScrollSlot<T> {
  item: T
  index: number
}

export const makeVVirtualScrollProps = propsFactory({
  items: {
    type: Array,
    default: () => ([]),
  },
  itemHeight: [Number, String],

  ...makeComponentProps(),
  ...makeDimensionProps(),
}, 'v-virtual-scroll')

export const VVirtualScroll = genericComponent<new <T>(
  props: {
    items?: readonly T[]
  },
  slots: {
    default: [VVirtualScrollSlot<T>]
  }
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VVirtualScroll',

  props: makeVVirtualScrollProps(),

  setup (props, { slots }) {
    const first = shallowRef(0)
    const baseItemHeight = shallowRef(props.itemHeight)
    const itemHeight = computed({
      get: () => parseInt(baseItemHeight.value ?? 0, 10),
      set (val) {
        baseItemHeight.value = val
      },
    })
    const rootEl = ref<HTMLDivElement>()
    const { resizeRef, contentRect } = useResizeObserver()
    watchEffect(() => {
      resizeRef.value = rootEl.value
    })
    const display = useDisplay()

    const sizeMap = new Map<any, number>()
    let sizes = createRange(props.items.length).map(() => itemHeight.value)
    const visibleItems = computed(() => {
      return Math.max(12,
        Math.ceil(((contentRect.value?.height ?? display.height.value) / itemHeight.value) * 1.7 + 1)
      )
    })

    function handleItemResize (index: number, height: number) {
      itemHeight.value = Math.max(itemHeight.value, height)
      sizes[index] = height
      sizeMap.set(props.items[index], height)
    }

    function calculateOffset (index: number) {
      return sizes.slice(0, index).reduce((curr, value) => curr + (value || itemHeight.value), 0)
    }

    function calculateMidPointIndex (scrollTop: number) {
      const end = props.items.length

      let middle = 0
      let middleOffset = 0
      while (middleOffset < scrollTop && middle < end) {
        middleOffset += sizes[middle++] || itemHeight.value
      }

      return middle - 1
    }

    let lastScrollTop = 0
    function handleScroll () {
      if (!rootEl.value || !contentRect.value) return

      const height = contentRect.value.height
      const scrollTop = rootEl.value.scrollTop
      const direction = scrollTop < lastScrollTop ? UP : DOWN

      const midPointIndex = calculateMidPointIndex(scrollTop + height / 2)
      const buffer = Math.round(visibleItems.value / 3)
      if (direction === UP && midPointIndex <= first.value + (buffer * 2) - 1) {
        first.value = clamp(midPointIndex - buffer, 0, props.items.length)
      } else if (direction === DOWN && midPointIndex >= first.value + (buffer * 2) - 1) {
        first.value = clamp(midPointIndex - buffer, 0, props.items.length - visibleItems.value)
      }

      lastScrollTop = rootEl.value.scrollTop
    }

    function scrollToIndex (index: number) {
      if (!rootEl.value) return

      const offset = calculateOffset(index)
      rootEl.value.scrollTop = offset
    }

    const items = computed(() => props.items.map((item, index) => ({
      raw: item,
      index,
    })))
    const last = computed(() => Math.min(props.items.length, first.value + visibleItems.value))
    const computedItems = computed(() => items.value.slice(first.value, last.value))
    const paddingTop = computed(() => calculateOffset(first.value))
    const paddingBottom = computed(() => calculateOffset(props.items.length) - calculateOffset(last.value))

    const { dimensionStyles } = useDimension(props)

    onMounted(() => {
      if (!itemHeight.value) {
        // If itemHeight prop is not set, then calculate an estimated height from the average of inital items
        itemHeight.value = sizes.slice(first.value, last.value).reduce((curr, height) => curr + height, 0) / (visibleItems.value)
      }
    })

    watch(() => props.items.length, () => {
      sizes = createRange(props.items.length).map(() => itemHeight.value)
      sizeMap.forEach((height, item) => {
        const index = props.items.indexOf(item)
        if (index === -1) {
          sizeMap.delete(item)
        } else {
          sizes[index] = height
        }
      })
    })

    useRender(() => (
      <div
        ref={ rootEl }
        class={[
          'v-virtual-scroll',
          props.class,
        ]}
        onScroll={ handleScroll }
        style={[
          dimensionStyles.value,
          props.style,
        ]}
      >
        <div
          class="v-virtual-scroll__container"
          style={{
            paddingTop: convertToUnit(paddingTop.value),
            paddingBottom: convertToUnit(paddingBottom.value),
          }}
        >
          { computedItems.value.map(item => (
            <VVirtualScrollItem
              key={ item.index }
              dynamicHeight={ !props.itemHeight }
              onUpdate:height={ height => handleItemResize(item.index, height) }
            >
              { slots.default?.({ item: item.raw, index: item.index }) }
            </VVirtualScrollItem>
          ))}
        </div>
      </div>
    ))

    return {
      scrollToIndex,
    }
  },
})

export type VVirtualScroll = InstanceType<typeof VVirtualScroll>
