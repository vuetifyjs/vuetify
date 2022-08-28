// Styles
import './VInfiniteScroll.sass'

// Composables
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { useIntersectionObserver } from '@/composables/intersectionObserver'

// Utilities
import { computed, defineComponent, nextTick, onMounted, ref, watch } from 'vue'
import { convertToUnit, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import { VProgressCircular } from '../VProgressCircular'
import { VBtn } from '../VBtn'
import { useLocale } from '@/composables'

const VInfiniteScrollIntersect = defineComponent({
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

    watch(isIntersecting, async () => {
      if (isIntersecting.value) {
        emit('intersect', props.side)
      }
    })

    useRender(() => (
      <div class="v-infinite-scroll-intersect" ref={ intersectionRef }>&nbsp;</div>
    ))
  },
})

export type InfiniteScrollSide = 'start' | 'end' | 'both'
export type InfiniteScrollStatus = 'ok' | 'empty' | 'loading' | 'error'

export const VInfiniteScroll = defineComponent({
  name: 'VInfiniteScroll',

  props: {
    color: String,
    load: {
      type: Function as PropType<(side: InfiniteScrollSide) => Promise<InfiniteScrollStatus>>,
      required: true,
    },
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

    ...makeDimensionProps(),
  },

  setup (props, { slots }) {
    const rootEl = ref<HTMLDivElement>()
    const startStatus = ref<InfiniteScrollStatus>('ok')
    const endStatus = ref<InfiniteScrollStatus>('ok')
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

    function setStatus (side: InfiniteScrollSide, status: InfiniteScrollStatus) {
      if (side === 'start') {
        startStatus.value = status
      } else if (side === 'end') {
        endStatus.value = status
      }
    }

    function getStatus (side: string) {
      return side === 'start' ? startStatus.value : endStatus.value
    }

    let previousScrollSize = 0
    async function handleIntersect (side: InfiniteScrollSide) {
      const status = getStatus(side)
      if (!rootEl.value || status === 'loading') return

      try {
        previousScrollSize = getScrollSize()
        setStatus(side, 'loading')
        const status = await props.load(side)
        setStatus(side, status)
      } catch (err) {
        setStatus(side, 'error')
        throw err
      } finally {
        nextTick(() => {
          if (side === 'start') {
            setScrollAmount(getScrollSize() - previousScrollSize + getScrollAmount())
          }
        })
      }
    }

    const { t } = useLocale()

    function renderSide (side: InfiniteScrollSide, status: InfiniteScrollStatus) {
      if (props.side !== side && props.side !== 'both') return

      const onClick = () => handleIntersect(side)
      const slotProps = { side, props: { onClick, color: props.color } }

      if (status === 'error') return slots.error?.(slotProps)

      if (status === 'empty') return slots.empty?.(slotProps) ?? <div>{ t(props.emptyText) }</div>

      if (props.mode === 'manual') {
        if (status === 'loading') {
          return slots.loading?.(slotProps) ?? (
            <VProgressCircular indeterminate color={ props.color } />
          )
        }

        return slots['load-more']?.(slotProps) ?? (
          <VBtn variant="outlined" color={ props.color } onClick={ onClick }>
            { t(props.loadMoreText) }
          </VBtn>
        )
      }

      return slots.loading?.(slotProps) ?? (
        <VProgressCircular indeterminate color={ props.color } />
      )
    }

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
            { renderSide('start', startStatus.value) }
          </div>
          { rootEl.value && hasStartIntersect && intersectMode && (
            <VInfiniteScrollIntersect
              key="start"
              side="start"
              onIntersect={ handleIntersect }
              rootRef={ rootEl.value }
              rootMargin={ margin.value }
            />
          ) }
          { slots.default?.() }
          { rootEl.value && hasEndIntersect && intersectMode && (
            <VInfiniteScrollIntersect
              key="end"
              side="end"
              onIntersect={ handleIntersect }
              rootRef={ rootEl.value }
              rootMargin={ margin.value }
            />
          ) }
          <div class="v-infinite-scroll__side">
            { renderSide('end', endStatus.value) }
          </div>
        </div>
      )
    })
  },
})
