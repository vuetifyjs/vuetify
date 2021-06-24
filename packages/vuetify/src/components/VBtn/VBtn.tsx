// Styles
import './VBtn.sass'

// Components
import { VIcon } from '@/components'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeRouterProps, useLink } from '@/composables/router'
import { makeSizeProps, useSize } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { makeVariantProps, useVariant } from '@/composables/variant'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { computed, defineComponent } from 'vue'
import { makeProps } from '@/util'

export default defineComponent({
  name: 'VBtn',

  directives: { Ripple },

  props: makeProps({
    flat: Boolean,
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
    ...makeRouterProps(),
    ...makeSizeProps(),
    ...makeTagProps({ tag: 'button' }),
    ...makeThemeProps(),
    ...makeVariantProps({ variant: 'contained' } as const),
  }),

  setup (props, { attrs, slots }) {
    const { themeClasses } = useTheme(props)
    const { borderClasses } = useBorder(props, 'v-btn')
    const { colorClasses, colorStyles, variantClasses } = useVariant(props, 'v-btn')
    const { densityClasses } = useDensity(props, 'v-btn')
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props, 'v-btn')
    const { roundedClasses } = useRounded(props, 'v-btn')
    const { sizeClasses } = useSize(props, 'v-btn')
    const link = useLink(props, attrs)

    const isElevated = computed(() => {
      return props.variant === 'contained' && !(props.disabled || props.flat || props.border)
    })

    return () => {
      const Tag = (link.isLink.value) ? 'a' : props.tag

      return (
        <Tag
          type={ Tag === 'a' ? undefined : 'button' }
          class={[
            'v-btn',
            {
              'v-btn--active': link.isExactActive?.value,
              'v-btn--block': props.block,
              'v-btn--disabled': props.disabled,
              'v-btn--elevated': isElevated.value,
              'v-btn--icon': !!props.icon,
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
          disabled={ props.disabled || undefined }
          href={ link.href.value }
          v-ripple={[
            !props.disabled,
            null,
            props.icon ? ['center'] : null,
          ]}
          onClick={ props.disabled || link.navigate }
        >
          <span class="v-btn__overlay" />

          { !props.icon && props.prependIcon && (
            <VIcon
              class="v-btn__icon"
              icon={ props.prependIcon }
              left={ !props.stacked }
            />
          ) }

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
          ) }
        </Tag>
      )
    }
  },
})
