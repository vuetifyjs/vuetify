// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { IconValue } from '@/composables/icons'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeSizeProps, useSize } from '@/composables/size'

// Utilities
import { toRef } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVTimelineDividerProps = propsFactory({
  dotColor: String,
  fillDot: Boolean,
  hideDot: Boolean,
  icon: IconValue,
  iconColor: String,
  lineColor: String,

  ...makeComponentProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeElevationProps(),
}, 'v-timeline-divider')

export const VTimelineDivider = genericComponent()({
  name: 'VTimelineDivider',

  props: makeVTimelineDividerProps(),

  setup (props, { slots }) {
    const { sizeClasses, sizeStyles } = useSize(props, 'v-timeline-divider__dot')
    const { backgroundColorStyles, backgroundColorClasses } = useBackgroundColor(toRef(props, 'dotColor'))
    const { roundedClasses } = useRounded(props, 'v-timeline-divider__dot')
    const { elevationClasses } = useElevation(props)
    const {
      backgroundColorClasses: lineColorClasses,
      backgroundColorStyles: lineColorStyles,
    } = useBackgroundColor(toRef(props, 'lineColor'))

    useRender(() => (
      <div
        class={[
          'v-timeline-divider',
          {
            'v-timeline-divider--fill-dot': props.fillDot,
          },
          props.class,
        ]}
        style={ props.style }
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
              { !slots.default ? (
                <VIcon
                  key="icon"
                  color={ props.iconColor }
                  icon={ props.icon }
                  size={ props.size }
                />
              ) : (
                <VDefaultsProvider
                  key="icon-defaults"
                  disabled={ !props.icon }
                  defaults={{
                    VIcon: {
                      color: props.iconColor,
                      icon: props.icon,
                      size: props.size,
                    },
                  }}
                  v-slots:default={ slots.default }
                />
              )}
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
