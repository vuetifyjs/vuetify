// Components
import { VIcon } from '@/components'
import { VTimelineSymbol } from './VTimeline'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeSizeProps, useSize } from '@/composables/size'
import { makeRoundedProps, useRounded } from '@/composables/rounded'

// Utilities
import { defineComponent, inject, toRef } from 'vue'

export default defineComponent({
  name: 'VTimelineDivider',

  props: {
    hideDot: Boolean,
    lineColor: String,
    icon: String,
    iconColor: String,
    fillDot: Boolean,
    dotColor: String,
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeElevationProps(),
  },

  setup (props, { slots }) {
    const timeline = inject(VTimelineSymbol)

    if (!timeline) throw new Error('[Vuetify] Could not find v-timeline provider')

    const { sizeClasses, sizeStyles } = useSize(props, 'v-timeline-divider__dot')
    const { backgroundColorStyles, backgroundColorClasses } = useBackgroundColor(toRef(props, 'dotColor'))
    const { backgroundColorStyles: lineColorStyles, backgroundColorClasses: lineColorClasses } = useBackgroundColor(timeline.lineColor)
    const { roundedClasses } = useRounded(props, 'v-timeline-divider__dot')
    const { elevationClasses } = useElevation(props)

    return () => (
      <div
        class={[
          'v-timeline-divider',
          {
            'v-timeline-divider--fill-dot': props.fillDot,
          },
        ]}
      >
        { !props.hideDot && (
          <div
            class={[
              'v-timeline-divider__dot',
              roundedClasses.value,
              sizeClasses.value,
              elevationClasses.value,
            ]}
            style={ sizeStyles.value as any } // TODO: Fix this!
          >
            <div
              class={[
                'v-timeline-divider__inner-dot',
                roundedClasses.value,
                backgroundColorClasses.value,
              ]}
              style={ backgroundColorStyles.value }
            >
              {
                slots.default ? slots.default({ icon: props.icon, iconColor: props.iconColor, size: props.size })
                : props.icon ? <VIcon icon={ props.icon } color={ props.iconColor } size={ props.size } />
                : undefined
              }
            </div>
          </div>
        ) }
        <div
          class={[
            'v-timeline-divider__line',
            lineColorClasses.value,
          ]}
          style={ lineColorStyles.value }
        />
      </div>
    )
  },
})
