// Styles
import './VInfiniteScroll.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VProgressCircular } from '@/components/VProgressCircular'

// Composables
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { useIntersectionObserver } from '@/composables/intersectionObserver'
import { useLocale } from '@/composables/locale'

// Utilities
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { convertToUnit, defineComponent, genericComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export type InfiniteScrollSide = 'start' | 'end' | 'both'
export type InfiniteScrollStatus = 'ok' | 'empty' | 'loading' | 'error'

type InfiniteScrollSlot = {
  side: InfiniteScrollSide
  props: {
    onClick: () => (side: InfiniteScrollSide) => void
    color: string | undefined
  }
}

type VInfiniteScrollSlots = {
  start: []
  end: []
  default: [InfiniteScrollSlot]
  loading: [InfiniteScrollSlot]
  error: [InfiniteScrollSlot]
  empty: [InfiniteScrollSlot]
  'load-more': [InfiniteScrollSlot]
}

export const VInfiniteScrollIntersect = genericComponent()({
  name: 'VInfiniteScrollIntersect',

  props: {
    side: {
      type: String as PropType<InfiniteScrollSide>,
      required: true,
    },
    rootRef: null,
    rootMargin: String,
  },

  emits: {
    intersect: (side: InfiniteScrollSide) => true,
  },

  setup (props, { emit }) {
    const { intersectionRef, isIntersecting } = useIntersectionObserver(entries => {
    }, props.rootMargin ? {
      root: props.rootRef,
      rootMargin: props.rootMargin,
    } : undefined)

    watch(isIntersecting, async val => {
      if (val) emit('intersect', props.side)
    })

    useRender(() => (
      <div class="v-infinite-scroll-intersect" ref={ intersectionRef }>&nbsp;</div>
    ))

    return {}
  },
})

export const VInfiniteScroll = genericComponent<VInfiniteScrollSlots>()({
  name: 'VInfiniteScroll',

  props: {
    color: String,
    direction: {
      type: String as PropType<'vertical' | 'horizontal'>,
      default: 'vertical',
      validator: (v: any) => ['vertical', 'horizontal'].includes(v),
    },
    side: {
      type: String as PropType<InfiniteScrollSide>,
      default: 'end',
      validator: (v: any) => ['start', 'end', 'both'].includes(v),
    },
    mode: {
      type: String as PropType<'intersect' | 'manual'>,
      default: 'intersect',
      validator: (v: any) => ['intersect', 'manual'].includes(v),
    },
    margin: [Number, String],
    loadMoreText: {
      type: String,
      default: '$vuetify.infiniteScroll.loadMore',
    },
    emptyText: {
      type: String,
      default: '$vuetify.infiniteScroll.empty',
    },
    items: Array,

    ...makeDimensionProps(),
  },

  emits: {
    load: (options: { side: InfiniteScrollSide }) => true,
  },

  setup (props, { slots, emit }) {
    const rootEl = ref<HTMLDivElement>()
    const margin = computed(() => convertToUnit(props.margin))

    function setScrollAmount (amount: number) {
      if (!rootEl.value) return

      const property = props.direction === 'vertical' ? 'scrollTop' : 'scrollLeft'
      rootEl.value[property] = amount
    }

    function getScrollAmount () {
      if (!rootEl.value) return 0

      const property = props.direction === 'vertical' ? 'scrollTop' : 'scrollLeft'
      return rootEl.value[property]
    }

    function getScrollSize () {
      if (!rootEl.value) return 0

      const property = props.direction === 'vertical' ? 'scrollHeight' : 'scrollWidth'
      return rootEl.value[property]
    }

    function getContainerSize () {
      if (!rootEl.value) return 0

      const property = props.direction === 'vertical' ? 'clientHeight' : 'clientWidth'
      return rootEl.value[property]
    }

    onMounted(() => {
      if (!rootEl.value) return

      if (props.side === 'start') {
        setScrollAmount(getScrollSize())
      } else if (props.side === 'both') {
        setScrollAmount(getScrollSize() / 2 - getContainerSize() / 2)
      }
    })

    let previousScrollSize = 0
    let previousLoadSide: string | null = null

    function handleIntersect (side: InfiniteScrollSide) {
      previousScrollSize = getScrollSize()
      previousLoadSide = side

      emit('load', { side })
    }

    watch(() => props.items, () => {
      nextTick(() => {
        if (previousLoadSide === 'start') {
          setScrollAmount(getScrollSize() - previousScrollSize + getScrollAmount())
        }
      })
    })

    const { dimensionStyles } = useDimension(props)

    useRender(() => {
      const hasStartIntersect = props.side === 'start' || props.side === 'both'
      const hasEndIntersect = props.side === 'end' || props.side === 'both'
      const intersectMode = props.mode === 'intersect'

      return (
        <div
          ref={ rootEl }
          class={[
            'v-infinite-scroll',
            `v-infinite-scroll--${props.direction}`,
            {
              'v-infinite-scroll--start': hasStartIntersect,
              'v-infinite-scroll--end': hasEndIntersect,
            },
          ]}
          style={ dimensionStyles.value }
        >
          <div class="v-infinite-scroll__side">
            { slots.start?.() }
          </div>

          { rootEl.value && hasStartIntersect && intersectMode && (
            <VInfiniteScrollIntersect
              key="start"
              side="start"
              onIntersect={ handleIntersect }
              rootRef={ rootEl.value }
              rootMargin={ margin.value }
            />
          )}

          { slots.default?.({ items: props.items }) }

          { rootEl.value && hasEndIntersect && intersectMode && (
            <VInfiniteScrollIntersect
              key="end"
              side="end"
              onIntersect={ handleIntersect }
              rootRef={ rootEl.value }
              rootMargin={ margin.value }
            />
          )}

          <div class="v-infinite-scroll__side">
            { slots.end?.() }
          </div>
        </div>
      )
    })
  },
})

export type VInfiniteScroll = InstanceType<typeof VInfiniteScroll>
