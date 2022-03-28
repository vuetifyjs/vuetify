// Styles
import './VTimeline.sass'

// Composables
import { makeTagProps } from '@/composables/tag'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Helpers
import { computed, provide, toRef } from 'vue'
import { convertToUnit, defineComponent } from '@/util'
import { VTimelineSymbol } from './shared'

// Types
import type { Prop } from 'vue'

export type TimelineDirection = 'vertical' | 'horizontal'
export type TimelineSide = 'start' | 'end' | undefined
export type TimelineAlign = 'center' | 'start'
export type TimelineTruncateLine = 'start' | 'end' | 'both' | undefined

export const VTimeline = defineComponent({
  name: 'VTimeline',

  props: {
    align: {
      type: String,
      default: 'center',
      validator: (v: any) => ['center', 'start'].includes(v),
    } as Prop<TimelineAlign>,
    direction: {
      type: String,
      default: 'vertical',
      validator: (v: any) => ['vertical', 'horizontal'].includes(v),
    } as Prop<TimelineDirection>,
    side: {
      type: String,
      validator: (v: any) => v == null || ['start', 'end'].includes(v),
    } as Prop<TimelineSide>,
    lineInset: {
      type: [String, Number],
      default: 0,
    },
    lineThickness: {
      type: [String, Number],
      default: 2,
    },
    lineColor: String,
    truncateLine: {
      type: String,
      validator: (v: any) => ['start', 'end', 'both'].includes(v),
    } as Prop<TimelineTruncateLine>,

    ...makeDensityProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { densityClasses } = useDensity(props)

    provide(VTimelineSymbol, {
      density: toRef(props, 'density'),
      lineColor: toRef(props, 'lineColor'),
    })

    const sideClass = computed(() => {
      const side = props.side ? props.side : props.density !== 'default' ? 'end' : null

      return side && `v-timeline--side-${side}`
    })

    const truncateClasses = computed(() => {
      const classes = [
        'v-timeline--truncate-line-start',
        'v-timeline--truncate-line-end',
      ]

      switch (props.truncateLine) {
        case 'both': return classes
        case 'start': return classes[0]
        case 'end': return classes[1]
        default: return null
      }
    })

    return () => (
      <props.tag
        class={[
          'v-timeline',
          `v-timeline--${props.direction}`,
          `v-timeline--align-${props.align}`,
          !props.lineInset && truncateClasses.value,
          {
            'v-timeline--inset-line': !!props.lineInset,
          },
          themeClasses.value,
          densityClasses.value,
          sideClass.value,
        ]}
        style={{
          '--v-timeline-line-thickness': convertToUnit(props.lineThickness),
          '--v-timeline-line-inset': convertToUnit(props.lineInset),
        }}
      >
        { slots.default?.() }
      </props.tag>
    )
  },
})
