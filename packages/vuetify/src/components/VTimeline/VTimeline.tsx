// Styles
import './VTimeline.sass'

// Components
import { VTimelineItem } from '.'

// Composables
import { makeTagProps } from '@/composables/tag'
import { makeDensityProps, useDensity } from '@/composables/density'
import { useTheme } from '@/composables/theme'

// Helpers
import { computed, defineComponent, provide, toRef } from 'vue'
import { convertToUnit, makeProps } from '@/util'

// Types
import type { InjectionKey, Prop, Ref } from 'vue'
import type { Density } from '@/composables/density'

export type TimelineDirection = 'vertical' | 'horizontal'
export type TimelineSide = 'before' | 'after' | undefined

interface TimelineInstance {
  density: Ref<Density>
  lineColor: Ref<string>
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
    truncateLine: {
      type: String,
      default: 'start',
      validator: (v: any) => ['none', 'start', 'end', 'both'].includes(v),
    },
    ...makeDensityProps(),
    ...makeTagProps(),
  }),

  setup (props, { slots }) {
    const { themeClasses } = useTheme()
    const { densityClasses } = useDensity(props, 'v-timeline')

    provide(VTimelineSymbol, {
      density: toRef(props, 'density'),
      lineColor: toRef(props, 'lineColor'),
    })

    const sideClass = computed(() => {
      const side = props.side ? props.side : props.density !== 'default' ? 'after' : null

      return side && `v-timeline--side-${side}`
    })

    return () => (
      <props.tag
        class={[
          'v-timeline',
          `v-timeline--${props.direction}`,
          {
            'v-timeline--inset-line': !!props.lineInset,
            'v-timeline--truncate-line-end': props.truncateLine === 'end' || props.truncateLine === 'both',
          },
          sideClass.value,
          themeClasses.value,
          densityClasses.value,
        ]}
        style={{
          '--v-timeline-line-thickness': convertToUnit(props.lineThickness),
          '--v-timeline-line-inset': convertToUnit(props.lineInset || undefined),
        }}
      >
        { props.truncateLine === 'none' || props.truncateLine === 'end' ? (
          <VTimelineItem hideDot />
        ) : undefined }

        { slots.default?.() }
      </props.tag>
    )
  },
})
