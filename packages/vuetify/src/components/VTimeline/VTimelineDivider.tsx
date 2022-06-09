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
import { computed, toRef } from 'vue'
import { defineComponent, useRender } from '@/util'

export const VTimelineDivider = defineComponent({
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
    const slotProps = computed(() => ({
      icon: props.icon,
      iconColor: props.iconColor,
      size: props.size,
    }))

    provideDefaults({
      VIcon: { ...slotProps.value },
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
        { !props.hideDot && (
          <div
            class={[
              'v-timeline-divider__dot',
              elevationClasses.value,
              roundedClasses.value,
              sizeClasses.value,
            ]}
            // @ts-expect-error: null
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
              { slots.default
                ? slots.default(slotProps.value)
                : props.icon ? (<VIcon />) : undefined
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
    ))

    return {}
  },
})

export type VTimelineDivider = InstanceType<typeof VTimelineDivider>
