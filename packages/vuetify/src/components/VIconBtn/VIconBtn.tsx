// Styles
import './VIconBtn.scss'

// Components
import { VIcon } from '@/components/VIcon'
import { VProgressCircular } from '@/components/VProgressCircular'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { useBackgroundColor, useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { toRefs } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { IconValue } from '@/composables/icons'

export type VIconBtnSlots = {
  default: never
  loader: never
}

export const makeVIconBtnProps = propsFactory({
  bgColor: String,
  color: String,
  loading: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  icon: [String, Function, Object] as PropType<IconValue>,
  rotate: [Number, String],
  size: [Number, String],
  text: {
    type: [String, Number, Boolean],
    default: undefined,
  },

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VIconBtn')

export const VIconBtn = genericComponent<VIconBtnSlots>()({
  name: 'VIconBtn',

  props: makeVIconBtnProps(),

  setup (props, { slots }) {
    const { color, bgColor } = toRefs(props)

    const { themeClasses } = provideTheme(props)
    const { textColorClasses, textColorStyles } = useTextColor(color)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(bgColor)
    const { borderClasses } = useBorder(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)

    useRender(() => (
      <props.tag
        class={[
          'v-icon-btn',
          themeClasses.value,
          backgroundColorClasses.value,
          borderClasses.value,
          elevationClasses.value,
          roundedClasses.value,
          textColorClasses.value,
          props.class,
        ]}
        style={[
          backgroundColorStyles.value,
          textColorStyles.value,
          props.style,
          {
            '--v-icon-btn-rotate': props.rotate ? convertToUnit(props.rotate, 'deg') : undefined,
            '--v-icon-btn-height': props.size ? convertToUnit(props.size) : undefined,
            '--v-icon-btn-width': props.size ? convertToUnit(props.size) : undefined,
          },
        ]}
      >
        { slots.default?.() ?? (
          !props.icon ? props.text : (
            <VIcon
              key="icon"
              icon={ props.icon }
            />
          )
        )}

        { !!props.loading && (
            <span key="loader" class="v-icon-btn__loader">
              { slots.loader?.() ?? (
                <VProgressCircular
                  color={ typeof props.loading === 'boolean' ? undefined : props.loading }
                  indeterminate
                  width="2"
                />
              )}
            </span>
        )}
      </props.tag>
    ))

    return {}
  },
})

export type VIconBtn = InstanceType<typeof VIconBtn>
