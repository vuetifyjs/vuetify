// Styles
import './VTimeline.sass'

// Types
import type { ComponentInternalInstance, InjectionKey, Prop, Ref } from 'vue'

// Composables
import { makeTagProps } from '@/composables/tag'
// import { useResizeObserver } from '@/composables/resizeObserver'

// Helpers
import { computed, defineComponent, onBeforeUpdate, provide, ref } from 'vue'
import { makeProps } from '@/util'
import VTimelineHorizontal from './VTimelineHorizontal'
import VTimelineVertical from './VTimelineVertical'

export type TimelineDirection = 'vertical' | 'horizontal'
export type TimelineSide = 'before' | 'after' | undefined
export type TimelineDotAlignment = 'start' | 'end' | undefined
export type TimelineTruncateLine = 'start' | 'end' | 'both' | undefined

type VNodeRef = (ComponentInternalInstance | Element | undefined | null)

interface TimelineInstance {
  mirror: Ref<boolean>
  singleSide: Ref<TimelineSide>
  register: (id: number, index?: number) => {
    isEven: Ref<boolean>,
    beforeRef: Ref<VNodeRef>,
    dividerRef: Ref<VNodeRef>,
    afterRef: Ref<VNodeRef>
  }
  unregister: (id: number) => void
  beforeRefs: Ref<VNodeRef[]>
  dividerRefs: Ref<VNodeRef[]>
  afterRefs: Ref<VNodeRef[]>
  items: Ref<number[]>
}

export const VTimelineSymbol: InjectionKey<TimelineInstance> = Symbol.for('vuetify:timeline')

export default defineComponent({
  name: 'VTimeline',

  props: makeProps({
    direction: {
      type: String,
      default: 'vertical',
      validator: (v: any) => ['vertical', 'horizontal'].includes(v),
    } as Prop<TimelineDirection>,
    mirror: Boolean,
    singleSide: {
      type: String,
      validator: (v: any) => v == null || ['after', 'before'].includes(v),
    } as Prop<TimelineSide>,
    truncateLine: {
      type: String,
      validator: (v: any) => v == null || ['start', 'end', 'both'].includes(v),
    } as Prop<TimelineDotAlignment>,
    linePosition: {
      type: String,
      default: '50%',
    },
    lineWidth: {
      type: [String, Number],
      default: 2,
    },
    lineColor: {
      type: String,
      default: 'secondary',
    },
    ...makeTagProps(),
  }),

  setup (props, ctx) {
    const items = ref<number[]>([])

    const beforeRefs = ref<VNodeRef[]>([])
    const dividerRefs = ref<VNodeRef[]>([])
    const afterRefs = ref<VNodeRef[]>([])

    onBeforeUpdate(() => {
      beforeRefs.value = []
      dividerRefs.value = []
      afterRefs.value = []
    })

    function register (id: number, index?: number) {
      if (index) {
        items.value.splice(index, 0, id)
      } else {
        items.value.push(id)
      }

      const isEven = computed(() => items.value.indexOf(id) % 2 === 0)
      const arrIndex = items.value.indexOf(id)

      return {
        isEven,
        beforeRef: computed(() => beforeRefs.value[arrIndex]),
        dividerRef: computed(() => dividerRefs.value[arrIndex]),
        afterRef: computed(() => afterRefs.value[arrIndex]),
      }
    }

    function unregister (id: number) {
      items.value = items.value.filter(v => v !== id)
    }

    provide(VTimelineSymbol, {
      mirror: computed(() => props.mirror),
      singleSide: computed(() => props.singleSide),
      register,
      unregister,
      items,
      beforeRefs,
      dividerRefs,
      afterRefs,
    })

    // const truncateLineClasses = computed(() => {
    //   const startClass = 'v-timeline--truncate-line-start'
    //   const endClass = 'v-timeline--truncate-line-end'

    //   switch (props.truncateLine) {
    //     case 'start': return startClass
    //     case 'end': return endClass
    //     case 'both': return [startClass, endClass]
    //     default: return null
    //   }
    // })

    // const truncateStart = ref(0)
    // const truncateEnd = ref(0)

    // const { resizeRef } = useResizeObserver(entries => {
    //   if (!entries.length) return

    //   const { target } = entries[0]
    //   const targetRect = target.getBoundingClientRect()

    //   const dots = target.querySelectorAll('.v-timeline-item__dot')

    //   if (!dots.length) return

    //   const firstDotRect = dots[0].getBoundingClientRect()
    //   const lastDotRect = dots[dots.length - 1].getBoundingClientRect()

    //   const startDirection = props.direction === 'vertical' ? 'top' : 'left'
    //   const endDirection = props.direction === 'vertical' ? 'bottom' : 'right'
    //   const sizeProperty = props.direction === 'vertical' ? 'height' : 'width'

    //   truncateStart.value = firstDotRect[startDirection] - targetRect[startDirection] + (firstDotRect[sizeProperty] / 2)
    //   truncateEnd.value = targetRect[endDirection] - lastDotRect[endDirection] + (lastDotRect[sizeProperty] / 2)
    // })

    // const truncateLineStyles = computed(() => {
    //   if (!props.truncateLine) return

    //   return {
    //     '--v-timeline-line-start': `${['start', 'both'].includes(props.truncateLine) ? truncateStart.value : 0}px`,
    //     '--v-timeline-line-end': `${['end', 'both'].includes(props.truncateLine) ? truncateEnd.value : 0}px`,
    //   }
    // })

    return () => {
      const DirectionalComponent = props.direction === 'horizontal' ? VTimelineHorizontal : VTimelineVertical
      return (
        <DirectionalComponent {...props} key="horizontal">{ ctx.slots.default?.() }</DirectionalComponent>
      )
    }

    // return () => (
    //   <props.tag
    //     ref={resizeRef}
    //     class={[
    //       'v-timeline',
    //       `v-timeline--${props.direction}`,
    //       {
    //         'v-timeline--single-side': !!props.singleSide,
    //       },
    //       truncateLineClasses.value,
    //     ]}
    //     style={{
    //       '--v-timeline-line-position': props.linePosition,
    //       '--v-timeline-line-width': convertToUnit(props.lineWidth),
    //       ...truncateLineStyles.value,
    //     }}
    //   >
    //     { ctx.slots.default?.() }
    //   </props.tag>
    // )
  },
})
