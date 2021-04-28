// Styles
import './VTimeline.sass'

// Types
import type { InjectionKey, Prop, Ref } from 'vue'

// Composables
import { makeTagProps } from '@/composables/tag'

// Helpers
import { computed, defineComponent, provide, ref } from 'vue'
import { makeProps } from '@/util'

export type TimelineDirection = 'vertical' | 'horizontal'
export type TimelineSide = 'before' | 'after' | undefined
export type TimelineDotAlignment = 'start' | 'end' | undefined
export type TimelineTruncateLine = 'start' | 'end' | 'both' | undefined

interface TimelineInstance {
  reverse: Ref<boolean>
  singleSide: Ref<TimelineSide>
  register: (id: number, index?: number) => { isEven: Ref<boolean> }
  unregister: (id: number) => void
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
    reverse: Boolean,
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
    ...makeTagProps(),
  }),

  setup (props, ctx) {
    const items = ref<number[]>([])

    function register (id: number, index?: number) {
      if (index) {
        items.value.splice(index, 0, id)
      } else {
        items.value.push(id)
      }

      const isEven = computed(() => items.value.indexOf(id) % 2 === 0)

      return { isEven }
    }

    function unregister (id: number) {
      items.value = items.value.filter(v => v !== id)
    }

    provide(VTimelineSymbol, {
      reverse: computed(() => props.reverse),
      singleSide: computed(() => props.singleSide),
      register,
      unregister,
    })

    const truncateLineClasses = computed(() => {
      const startClass = 'v-timeline--truncate-line-start'
      const endClass = 'v-timeline--truncate-line-end'

      switch (props.truncateLine) {
        case 'start': return startClass
        case 'end': return endClass
        case 'both': return [startClass, endClass]
        default: return null
      }
    })

    return () => (
      <props.tag
        class={[
          'v-timeline',
          `v-timeline--${props.direction}`,
          {
            'v-timeline--single-side': !!props.singleSide,
            'v-timeline--reverse': props.reverse,
          },
          truncateLineClasses.value,
        ]}
        style={{
          '--v-timeline-line-position': props.linePosition,
        }}
      >
        { ctx.slots.default?.() }
      </props.tag>
    )
  },
})
