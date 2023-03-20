// Components
import { VIcon } from '@/components/VIcon'

// Composables
import { IconValue } from '@/composables/icons'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeSizeProps, useSize } from '@/composables/size'
import { provideDefaults } from '@/composables/defaults'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { genericComponent, useRender } from '@/util'
import { toRef } from 'vue'

export const VTimelineDivider = genericComponent()({
  name: 'VTimelineDivider',

  props: {
    dotColor: String,
    fillDot: Boolean,
    hideDot: Boolean,
    icon: IconValue,
    iconColor: String,
    lineColor: String,

    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeElevationProps(),
  },

  setup (props, { slots }) {
    const { sizeClasses, sizeStyles } = useSize(props, 'v-timeline-divider__dot')
    const { backgroundColorStyles, backgroundColorClasses } = useBackgroundColor(toRef(props, 'dotColor'))
    const { roundedClasses } = useRounded(props, 'v-timeline-divider__dot')
    const { elevationClasses } = useElevation(props)
    const {
      backgroundColorClasses: lineColorClasses,
      backgroundColorStyles: lineColorStyles,
    } = useBackgroundColor(toRef(props, 'lineColor'))

    provideDefaults({
      VIcon: {
        color: toRef(props, 'iconColor'),
        icon: toRef(props, 'icon'),
        size: toRef(props, 'size'),
      },
    })

    useRender(() => (
      <div
        class={[
          'v-timeline-divider',
          {
            'v-timeline-divider--fill-dot': props.fillDot,
          },
        ]}
      >
        <div
          class={[
            'v-timeline-divider__before',
            lineColorClasses.value,
          ]}
          style={ lineColorStyles.value }
        />

        { !props.hideDot && (
          <div
            key="dot"
            class={[
              'v-timeline-divider__dot',
              elevationClasses.value,
              roundedClasses.value,
              sizeClasses.value,
            ]}
            style={ sizeStyles.value }
          >
            <div
              class={[
                'v-timeline-divider__inner-dot',
                backgroundColorClasses.value,
                roundedClasses.value,
              ]}
              style={ backgroundColorStyles.value }
            >
              { slots.default?.() ?? (props.icon ? (<VIcon />) : undefined) }
            </div>
          </div>
        )}

        <div
          class={[
            'v-timeline-divider__after',
            lineColorClasses.value,
          ]}
          style={ lineColorStyles.value }
        />
      </div>
    ))

    return {}
  },
})

export type VTimelineDivider = InstanceType<typeof VTimelineDivider>
