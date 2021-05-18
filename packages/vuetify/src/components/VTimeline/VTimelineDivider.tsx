import { useBackgroundColor } from '@/composables/color'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeSizeProps, useSize } from '@/composables/size'
import { defineComponent } from 'vue'
import { VIcon } from '../VIcon'

export default defineComponent({
  name: 'VTimelineDivider',

  props: {
    direction: String,
    hideDot: Boolean,
    lineColor: {
      type: String,
      default: 'secondary',
    },
    icon: String,
    iconColor: String,
    alignDot: String,
    color: {
      type: String,
      default: 'secondary',
    },
    fillDot: Boolean,
    ...makeSizeProps(),
    ...makeElevationProps(),
  },

  setup (props, ctx) {
    const { sizeClasses, sizeStyles } = useSize(props, 'v-timeline-item__dot')
    const { backgroundColorStyles, backgroundColorClasses } = useBackgroundColor(props, 'color')
    const { backgroundColorStyles: lineColorStyles, backgroundColorClasses: lineColorClasses } = useBackgroundColor(props, 'lineColor')
    const { elevationClasses } = useElevation(props)

    return () => (
      <div
        class={[
          'v-timeline-item__divider',
        ]}
      >
        { !props.hideDot && (
          <div
            class={[
              'v-timeline-item__dot',
              sizeClasses.value,
              elevationClasses.value,
            ]}
            style={sizeStyles.value as any} // TODO: Fix this!
          >
            <div
              class={[
                'v-timeline-item__inner-dot',
                ...backgroundColorClasses.value,
              ]}
              style={backgroundColorStyles.value}
            >
              {
                ctx.slots.default ? ctx.slots.default({ icon: props.icon, iconColor: props.iconColor })
                : props.icon ? <VIcon icon={props.icon} color={props.iconColor} size={props.size} />
                : undefined
              }
            </div>
          </div>
        ) }
        <div class="v-timeline-item__line-wrapper">
          <div
            class={[
              'v-timeline-item__line',
              lineColorClasses.value,
            ]}
            style={{
              ...lineColorStyles.value,
            }}
          />
        </div>
      </div>
    )
  },
})
