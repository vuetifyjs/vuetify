// Styles
import './VBtn.sass'

// Components
import { VIcon } from '@/components'

// Composables
import { makeRouterProps, useLink } from '@/composables/router'
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeSizeProps, useSize } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { useColor } from '@/composables/color'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { computed, defineComponent } from 'vue'
import { makeProps } from '@/util'

export default defineComponent({
  name: 'VBtn',

  directives: { Ripple },

  props: makeProps({
    text: Boolean,
    flat: Boolean,
    plain: Boolean,
    icon: [Boolean, String],
    prependIcon: String,
    appendIcon: String,

    block: Boolean,
    stacked: Boolean,

    href: String,
    color: String,
    disabled: Boolean,
    ...makeBorderProps(),
    ...makeRoundedProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeSizeProps(),
    ...makeTagProps({ tag: 'button' }),
    ...makeThemeProps(),
    ...makeRouterProps(),
  }),

  setup (props, { slots }) {
    const { themeClasses } = useTheme(props)
    const { borderClasses } = useBorder(props, 'v-btn')
    const { roundedClasses } = useRounded(props, 'v-btn')
    const { densityClasses } = useDensity(props, 'v-btn')
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props, 'v-btn')
    const { sizeClasses } = useSize(props, 'v-btn')
    const link = useLink(props)

    const isContained = computed(() => {
      return !(props.text || props.plain || props.outlined || props.border !== false)
    })

    const isElevated = computed(() => {
      return isContained.value && !(props.disabled || props.flat)
    })

    const { colorClasses, colorStyles } = useColor(computed(() => ({
      [isContained.value ? 'background' : 'text']: props.color,
    })))

    return () => {
      const Tag = (props.to || props.href) ? 'a' : props.tag

      return (
        <Tag
          type={ Tag === 'a' ? undefined : 'button' }
          class={[
            'v-btn',
            {
              'v-btn--contained': isContained.value,
              'v-btn--elevated': isElevated.value,
              'v-btn--icon': !!props.icon,
              'v-btn--plain': props.plain,
              'v-btn--block': props.block,
              'v-btn--disabled': props.disabled,
              'v-btn--stacked': props.stacked,
            },
            themeClasses.value,
            borderClasses.value,
            colorClasses.value,
            densityClasses.value,
            elevationClasses.value,
            positionClasses.value,
            roundedClasses.value,
            sizeClasses.value,
          ]}
          style={[
            colorStyles.value,
            dimensionStyles.value,
            positionStyles.value,
          ]}
          disabled={ props.disabled || undefined }
          href={ link?.href.value ?? props.href }
          v-ripple={[
            !props.disabled,
            null,
            props.icon ? ['center'] : null,
          ]}
          onClick={ props.disabled || link?.navigate }
        >
          <span class="v-btn__overlay" />

          { !props.icon && props.prependIcon && (
            <VIcon
              class="v-btn__icon"
              icon={ props.prependIcon }
              left={ !props.stacked }
            />
          )}

          { typeof props.icon === 'boolean'
            ? slots.default?.()
            : (
              <VIcon
                class="v-btn__icon"
                icon={ props.icon }
                size={ props.size }
              />
            )
          }

          { !props.icon && props.appendIcon && (
            <VIcon
              class="v-btn__icon"
              icon={ props.appendIcon }
              right={ !props.stacked }
            />
          )}
        </Tag>
      )
    }
  },
})
