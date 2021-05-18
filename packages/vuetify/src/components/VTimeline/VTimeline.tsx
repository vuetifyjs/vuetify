// Styles
import './VTimeline.sass'

// Types
import type { InjectionKey, Prop, Ref } from 'vue'

// Composables
import { makeTagProps } from '@/composables/tag'

// Helpers
import { computed, defineComponent, provide, ref } from 'vue'
import { convertToUnit, makeProps } from '@/util'

export type TimelineDirection = 'vertical' | 'horizontal'
export type TimelineSide = 'before' | 'after' | undefined
export type TimelineDotAlignment = 'start' | 'end' | undefined
export type TimelineTruncateLine = 'start' | 'end' | 'both' | undefined

interface TimelineInstance {
  mirror: Ref<boolean>
  singleSide: Ref<TimelineSide>
  register: (id: number, index?: number) => {
    isEven: Ref<boolean>,
  }
  unregister: (id: number) => void
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
      mirror: computed(() => props.mirror),
      singleSide: computed(() => props.singleSide),
      register,
      unregister,
      items,
    })

    return () => {
      return (
        <div
          class={[
            'v-timeline',
            `v-timeline--${props.direction}`,
          ]}
          style={{
            // @ts-expect-error
            '--v-timeline-line-width': convertToUnit(props.lineWidth),
          }}
        >
          { ctx.slots.default?.() }
        </div>
      )
    }
  },
})
