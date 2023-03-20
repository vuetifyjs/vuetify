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
import { genericComponent, useRender } from '@/util'

// Types
import type { MakeSlots } from '@/util'
import type { PropType } from 'vue'

export type VBtnSlots = MakeSlots<{
  default: []
  prepend: []
  append: []
  loader: []
}>

export const VBtn = genericComponent<VBtnSlots>()({
  name: 'VBtn',

  directives: { Ripple },

  props: {
    active: {
      type: Boolean,
      default: undefined,
    },
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

  emits: {
    'group:selected': (val: { value: boolean }) => true,
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
    const { sizeClasses, sizeStyles } = useSize(props)
    const group = useGroupItem(props, props.symbol, false)
    const link = useLink(props, attrs)

    const isActive = computed(() => {
      if (props.active !== undefined) {
        return props.active
      }

      if (link.isLink.value) {
        return link.isActive?.value
      }

      return group?.isSelected.value
    })
    const isDisabled = computed(() => group?.disabled.value || props.disabled)
    const isElevated = computed(() => {
      return props.variant === 'elevated' && !(props.disabled || props.flat || props.border)
    })
    const valueAttr = computed(() => {
      if (props.value === undefined) return undefined

      return Object(props.value) === props.value
        ? JSON.stringify(props.value, null, 0) : props.value
    })

    useSelectLink(link, group?.select)

    useRender(() => {
      const Tag = (link.isLink.value) ? 'a' : props.tag
      const hasPrepend = !!(props.prependIcon || slots.prepend)
      const hasAppend = !!(props.appendIcon || slots.append)
      const hasIcon = !!(props.icon && props.icon !== true)
      const hasColor = (
        (group?.isSelected.value && (!link.isLink.value || link.isActive?.value)) ||
        (!group || link.isActive?.value)
      )

      return (
        <Tag
          type={ Tag === 'a' ? undefined : 'button' }
          class={[
            'v-btn',
            group?.selectedClass.value,
            {
              'v-btn--active': isActive.value,
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
            sizeStyles.value,
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
          }}
          value={ valueAttr.value }
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
              <span class="v-btn__prepend">
                { slots.prepend?.() ?? (<VIcon />) }
              </span>
            </VDefaultsProvider>
          )}

          <span class="v-btn__content" data-no-activator="">
            <VDefaultsProvider
              key="content"
              defaults={{
                VIcon: {
                  icon: hasIcon ? props.icon : undefined,
                },
              }}
            >
              { slots.default?.() ?? (
                hasIcon && (
                  <VIcon key="icon" />
                )
              )}
            </VDefaultsProvider>
          </span>

          { !props.icon && hasAppend && (
            <VDefaultsProvider
              key="append"
              defaults={{
                VIcon: {
                  icon: props.appendIcon,
                },
              }}
            >
              <span class="v-btn__append">
                { slots.append?.() ?? (<VIcon />) }
              </span>
            </VDefaultsProvider>
          )}

          { !!props.loading && (
            <span key="loader" class="v-btn__loader">
              { slots.loader?.() ?? (
                <VProgressCircular
                  color={ typeof props.loading === 'boolean' ? undefined : props.loading }
                  indeterminate
                  size="23"
                  width="2"
                />
              )}
            </span>
          )}
        </Tag>
      )
    })

    return {}
  },
})

export type VBtn = InstanceType<typeof VBtn>
