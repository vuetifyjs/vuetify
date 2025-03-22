// Styles
import './VIconBtn.scss'

// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { VProgressCircular } from '@/components/VProgressCircular'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { useBackgroundColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed, toDisplayString, toRefs } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { IconValue } from '@/composables/icons'

export type VIconBtnSlots = {
  default: never
  loader: never
}

export const makeVIconBtnProps = propsFactory({
  active: Boolean,
  activeColor: String,
  color: String,
  disabled: Boolean,
  icon: [String, Function, Object] as PropType<IconValue>,
  iconColor: String,
  loading: Boolean,
  opacity: [Number, String],
  readonly: Boolean,
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
    const { active, activeColor, color: _color } = toRefs(props)

    const { themeClasses } = provideTheme(props)
    const { borderClasses } = useBorder(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)

    const color = computed(() => active.value ? activeColor.value ?? _color.value : _color.value)

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(color)

    useRender(() => {
      const hasIcon = !!(props.icon)

      return (
        <props.tag
          class={[
            {
              'v-icon-btn': true,
              'v-icon-btn--disabled': props.disabled,
              'v-icon-btn--readonly': props.readonly,
              'v-icon-btn--loading': props.loading,
            },
            themeClasses.value,
            backgroundColorClasses.value,
            borderClasses.value,
            elevationClasses.value,
            roundedClasses.value,
            props.class,
          ]}
          style={[
            {
              '--v-icon-btn-rotate': convertToUnit(props.rotate, 'deg'),
              '--v-icon-btn-height': props.size ? convertToUnit(props.size) : undefined,
              '--v-icon-btn-width': props.size ? convertToUnit(props.size) : undefined,
            },
            backgroundColorStyles.value,
            props.style,
          ]}
          tabindex={ props.disabled || props.readonly ? -1 : 0 }
        >
          <div class="v-icon-btn__content" data-no-activator="">
            { (!slots.default && hasIcon) ? (
              <VIcon
                key="content-icon"
                icon={ props.icon }
                opacity={ props.opacity }
                color={ props.iconColor }
              />
            ) : (
              <VDefaultsProvider
                key="content-defaults"
                disabled={ !hasIcon }
                defaults={{
                  VIcon: {
                    icon: props.icon,
                    opacity: props.opacity,
                    color: props.iconColor,
                  },
                }}
              >
                { slots.default?.() ?? toDisplayString(props.text) }
              </VDefaultsProvider>
            )}
          </div>

          { !!props.loading && (
            <span key="loader" class="v-icon-btn__loader">
              { slots.loader?.() ?? (
                <VProgressCircular
                  color={ typeof props.loading === 'boolean' ? undefined : props.loading }
                  indeterminate="disable-shrink"
                  width="2"
                  size="20"
                />
              )}
            </span>
          )}
        </props.tag>
      )
    })

    return {}
  },
})

export type VIconBtn = InstanceType<typeof VIconBtn>
