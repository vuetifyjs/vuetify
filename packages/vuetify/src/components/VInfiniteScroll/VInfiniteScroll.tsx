// Styles
import './VInfiniteScroll.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VProgressCircular } from '@/components/VProgressCircular'

// Composables
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { useIntersectionObserver } from '@/composables/intersectionObserver'
import { useLocale } from '@/composables/locale'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { computed, nextTick, onMounted, ref, shallowRef, watch } from 'vue'
import { convertToUnit, defineComponent, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export type InfiniteScrollSide = 'start' | 'end' | 'both'
export type InfiniteScrollStatus = 'ok' | 'empty' | 'loading' | 'error'

type InfiniteScrollSlot = {
  side: InfiniteScrollSide
  props: Record<string, any>
}

type VInfiniteScrollSlots = {
  default: never
  loading: InfiniteScrollSlot
  error: InfiniteScrollSlot
  empty: InfiniteScrollSlot
  'load-more': InfiniteScrollSlot
}

export const makeVInfiniteScrollProps = propsFactory({
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

  ...makeDimensionProps(),
  ...makeTagProps(),
}, 'VInfiniteScroll')

export const VInfiniteScrollIntersect = defineComponent({
  name: 'VInfiniteScrollIntersect',

  props: {
    side: {
      type: String as PropType<InfiniteScrollSide>,
      required: true,
    },
    rootMargin: String,
  },

  emits: {
    intersect: (side: InfiniteScrollSide, isIntersecting: boolean) => true,
  },

  setup (props, { emit }) {
    const { intersectionRef, isIntersecting } = useIntersectionObserver()

    watch(isIntersecting, async val => {
      emit('intersect', props.side, val)
    })

    useRender(() => (
      <div
        class="v-infinite-scroll-intersect"
        style={{
          '--v-infinite-margin-size': props.rootMargin,
        }}
        ref={ intersectionRef }
      >&nbsp;</div>
    ))

    return {}
  },
})

export const VInfiniteScroll = genericComponent<VInfiniteScrollSlots>()({
  name: 'VInfiniteScroll',

  props: makeVInfiniteScrollProps(),

  emits: {
    load: (options: { side: InfiniteScrollSide, done: (status: InfiniteScrollStatus) => void }) => true,
  },

  setup (props, { slots, emit }) {
    const rootEl = ref<HTMLDivElement>()
    const startStatus = shallowRef<InfiniteScrollStatus>('ok')
    const endStatus = shallowRef<InfiniteScrollStatus>('ok')
    const margin = computed(() => convertToUnit(props.margin))
    const isIntersecting = shallowRef(false)

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
    function handleIntersect (side: InfiniteScrollSide, _isIntersecting: boolean) {
      isIntersecting.value = _isIntersecting
      if (isIntersecting.value) {
        intersecting(side)
      }
    }

    function intersecting (side: InfiniteScrollSide) {
      if (props.mode !== 'manual' && !isIntersecting.value) return

      const status = getStatus(side)
      if (!rootEl.value || ['empty', 'loading'].includes(status)) return

      previousScrollSize = getScrollSize()
      setStatus(side, 'loading')

      function done (status: InfiniteScrollStatus) {
        setStatus(side, status)

        nextTick(() => {
          if (status === 'empty' || status === 'error') return

          if (status === 'ok' && side === 'start') {
            setScrollAmount(getScrollSize() - previousScrollSize + getScrollAmount())
          }
          if (props.mode !== 'manual') {
            nextTick(() => {
              window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                  window.requestAnimationFrame(() => {
                    intersecting(side)
                  })
                })
              })
            })
          }
        })
      }

      emit('load', { side, done })
    }

    const { t } = useLocale()

    function renderSide (side: InfiniteScrollSide, status: InfiniteScrollStatus) {
      if (props.side !== side && props.side !== 'both') return

      const onClick = () => intersecting(side)
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
      const Tag = props.tag
      const hasStartIntersect = props.side === 'start' || props.side === 'both'
      const hasEndIntersect = props.side === 'end' || props.side === 'both'
      const intersectMode = props.mode === 'intersect'

      return (
        <Tag
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

          { hasStartIntersect && intersectMode && (
            <VInfiniteScrollIntersect
              key="start"
              side="start"
              onIntersect={ handleIntersect }
              rootMargin={ margin.value }
            />
          )}

          { slots.default?.() }

          { hasEndIntersect && intersectMode && (
            <VInfiniteScrollIntersect
              key="end"
              side="end"
              onIntersect={ handleIntersect }
              rootMargin={ margin.value }
            />
          )}

          <div class="v-infinite-scroll__side">
            { renderSide('end', endStatus.value) }
          </div>
        </Tag>
      )
    })
  },
})

export type VInfiniteScroll = InstanceType<typeof VInfiniteScroll>
