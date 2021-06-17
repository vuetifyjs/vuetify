// Styles
import './VBtn.sass'

// Components
import { VIcon } from '@/components'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { makeVariantProps, useVariant } from '@/composables/variant'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { computed, defineComponent } from 'vue'
import { makeProps } from '@/util'

import { makeSizeProps, useSize } from '@/composables/size'

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
    ...makeVariantProps({ variant: 'contained' }),
  }),

  setup (props, { slots }) {
    const { themeClasses } = useTheme(props)
    const { borderClasses } = useBorder(props, 'v-btn')
    const { colorClasses, colorStyles, variantClasses } = useVariant(props, 'v-btn')
    const { roundedClasses } = useRounded(props, 'v-btn')
    const { densityClasses } = useDensity(props, 'v-btn')
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props, 'v-btn')
    const { sizeClasses } = useSize(props, 'v-btn')

    const isElevated = computed(() => {
      return props.variant === 'contained' && !(props.disabled || props.flat)
    })

    return () => (
      <props.tag
        type="button"
        class={[
          'v-btn',
          {
            // 'v-btn--contained': isContained.value,
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
          variantClasses.value,
        ]}
        style={[
          colorStyles.value,
          dimensionStyles.value,
          positionStyles.value,
        ]}
        disabled={ props.disabled }
        v-ripple={[
          !props.disabled,
          null,
          props.icon ? ['center'] : null,
        ]}
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
      </props.tag>
    )
  },
})
