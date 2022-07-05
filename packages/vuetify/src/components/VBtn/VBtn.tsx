// Styles
import './VBtn.sass'

// Components
import { VBtnToggleSymbol } from '@/components/VBtnToggle/VBtnToggle'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { VProgressCircular } from '@/components/VProgressCircular'

// Directives
import { Ripple } from '@/directives/ripple'

// Composables
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'
import { IconValue } from '@/composables/icons'
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { makeLoaderProps, useLoader } from '@/composables/loader'
import { makeLocationProps, useLocation } from '@/composables/location'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeRouterProps, useLink } from '@/composables/router'
import { makeSizeProps, useSize } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useSelectLink } from '@/composables/selectLink'

// Utilities
import { computed } from 'vue'
import { defineComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const VBtn = defineComponent({
  name: 'VBtn',

  directives: { Ripple },

  props: {
    active: Boolean,
    symbol: {
      type: null,
      default: VBtnToggleSymbol,
    },
    flat: Boolean,
    icon: [Boolean, String, Function, Object] as PropType<boolean | IconValue>,
    prependIcon: IconValue,
    appendIcon: IconValue,

    block: Boolean,
    stacked: Boolean,

    ripple: {
      type: Boolean,
      default: true,
    },

    ...makeBorderProps(),
    ...makeRoundedProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeGroupItemProps(),
    ...makeLoaderProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRouterProps(),
    ...makeSizeProps(),
    ...makeTagProps({ tag: 'button' }),
    ...makeThemeProps(),
    ...makeVariantProps({ variant: 'elevated' } as const),
  },

  setup (props, { attrs, slots }) {
    const { themeClasses } = provideTheme(props)
    const { borderClasses } = useBorder(props)
    const { colorClasses, colorStyles, variantClasses } = useVariant(props)
    const { densityClasses } = useDensity(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { loaderClasses } = useLoader(props)
    const { locationStyles } = useLocation(props)
    const { positionClasses } = usePosition(props)
    const { roundedClasses } = useRounded(props)
    const { sizeClasses } = useSize(props)
    const group = useGroupItem(props, props.symbol, false)
    const link = useLink(props, attrs)
    const isDisabled = computed(() => group?.disabled.value || props.disabled)
    const isElevated = computed(() => {
      return props.variant === 'elevated' && !(props.disabled || props.flat || props.border)
    })

    useSelectLink(link, group?.select)

    useRender(() => {
      const Tag = (link.isLink.value) ? 'a' : props.tag
      const hasColor = !group || group.isSelected.value
      const hasPrepend = !!(props.prependIcon || slots.prepend)
      const hasAppend = !!(props.appendIcon || slots.append)

      return (
        <Tag
          type={ Tag === 'a' ? undefined : 'button' }
          class={[
            'v-btn',
            group?.selectedClass.value,
            {
              'v-btn--active': props.active,
              'v-btn--block': props.block,
              'v-btn--disabled': isDisabled.value,
              'v-btn--elevated': isElevated.value,
              'v-btn--flat': props.flat,
              'v-btn--icon': !!props.icon,
              'v-btn--loading': props.loading,
              'v-btn--stacked': props.stacked,
            },
            themeClasses.value,
            borderClasses.value,
            hasColor ? colorClasses.value : undefined,
            densityClasses.value,
            elevationClasses.value,
            loaderClasses.value,
            positionClasses.value,
            roundedClasses.value,
            sizeClasses.value,
            variantClasses.value,
          ]}
          style={[
            hasColor ? colorStyles.value : undefined,
            dimensionStyles.value,
            locationStyles.value,
          ]}
          disabled={ isDisabled.value || undefined }
          href={ link.href.value }
          v-ripple={[
            !isDisabled.value && props.ripple,
            null,
            props.icon ? ['center'] : null,
          ]}
          onClick={ (e: MouseEvent) => {
            if (isDisabled.value) return

            link.navigate?.(e)
            group?.toggle()
          } }
        >
          { genOverlays(true, 'v-btn') }

          { !props.icon && hasPrepend && (
            <VDefaultsProvider
              key="prepend"
              defaults={{
                VIcon: {
                  icon: props.prependIcon,
                },
              }}
            >
              <div class="v-btn__prepend">
                { slots.prepend?.() ?? (<VIcon />) }
              </div>
            </VDefaultsProvider>
          ) }

          <div class="v-btn__content" data-no-activator="">
            <VDefaultsProvider
              key="content"
              defaults={{
                VIcon: {
                  icon: typeof props.icon === 'string'
                    ? props.icon
                    : undefined,
                },
              }}
            >
              { slots.default?.() ?? (
                typeof props.icon === 'string' && (
                  <VIcon key="icon" />
                )
              ) }
            </VDefaultsProvider>
          </div>

          { !props.icon && hasAppend && (
            <VDefaultsProvider
              key="append"
              defaults={{
                VIcon: {
                  icon: props.appendIcon,
                },
              }}
            >
              <div class="v-btn__append">
                { slots.append?.() ?? (<VIcon />) }
              </div>
            </VDefaultsProvider>
          ) }

          { !!props.loading && (
            <span key="loader" class="v-btn__loader">
              { slots.loader?.() ?? (
                <VProgressCircular
                  color={ typeof props.loading === 'boolean' ? undefined : props.loading }
                  indeterminate
                  size="23"
                  width="2"
                />
              ) }
            </span>
          ) }
        </Tag>
      )
    })

    return {}
  },
})

export type VBtn = InstanceType<typeof VBtn>
