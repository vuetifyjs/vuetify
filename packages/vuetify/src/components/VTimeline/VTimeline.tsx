// Styles
import './VTimeline.sass'

// Types
import type { InjectionKey, Prop, Ref } from 'vue'
import { Density, useDensity } from '@/composables/density'

// Composables
import { makeTagProps } from '@/composables/tag'

// Helpers
import { computed, defineComponent, provide, ref, toRef } from 'vue'
import { convertToUnit, makeProps } from '@/util'
import { makeDensityProps } from '../../composables/density'
import { useTheme } from '@/composables/theme'

export type TimelineDirection = 'vertical' | 'horizontal'
export type TimelineSide = 'before' | 'after' | undefined
export type TimelineDotAlignment = 'start' | 'end' | undefined
export type TimelineTruncateLine = 'start' | 'end' | 'both' | undefined

interface TimelineInstance {
  mirror: Ref<boolean>
  side: Ref<TimelineSide>
  density: Ref<Density>
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
    side: {
      type: String,
      validator: (v: any) => v == null || ['after', 'before'].includes(v),
    } as Prop<TimelineSide>,
    lineInset: {
      type: [String, Number],
      default: 0,
    },
    lineThickness: {
      type: [String, Number],
      default: 2,
    },
    lineColor: {
      type: String,
      default: 'secondary',
    },
    ...makeDensityProps(),
    ...makeTagProps(),
  }),

  setup (props, ctx) {
    const items = ref<number[]>([])
    const { themeClasses } = useTheme()
    const { densityClasses } = useDensity(props, 'v-timeline')

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
      side: computed(() => props.side),
      density: toRef(props, 'density'),
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
            {
              [`v-timeline--${props.side ?? 'after'}`]: props.density !== 'default',
            },
            themeClasses.value,
            densityClasses.value,
          ]}
          style={{
            // @ts-expect-error
            '--v-timeline-line-thickness': convertToUnit(props.lineThickness),
            '--v-timeline-line-inset': convertToUnit(props.lineInset),
          }}
        >
          { ctx.slots.default?.() }
        </div>
      )
    }
  },
})
