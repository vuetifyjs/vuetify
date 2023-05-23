// Styles
import './VBtn.sass'

// Components
import { VBtnToggleSymbol } from '@/components/VBtnToggle/VBtnToggle'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { VProgressCircular } from '@/components/VProgressCircular'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { IconValue } from '@/composables/icons'
import { makeLoaderProps, useLoader } from '@/composables/loader'
import { makeLocationProps, useLocation } from '@/composables/location'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeRouterProps, useLink } from '@/composables/router'
import { useSelectLink } from '@/composables/selectLink'
import { makeSizeProps, useSize } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { computed } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export type VBtnSlots = {
  default: never
  prepend: never
  append: never
  loader: never
}

export const makeVBtnProps = propsFactory({
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

  text: String,

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeLoaderProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeRouterProps(),
  ...makeSizeProps(),
  ...makeTagProps({ tag: 'button' }),
  ...makeThemeProps(),
  ...makeVariantProps({ variant: 'elevated' } as const),
}, 'v-btn')

export const VBtn = genericComponent<VBtnSlots>()({
  name: 'VBtn',

  directives: { Ripple },

  props: makeVBtnProps(),

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

    function onClick (e: MouseEvent) {
      if (isDisabled.value) return

      link.navigate?.(e)
      group?.toggle()
    }

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
            props.class,
          ]}
          style={[
            hasColor ? colorStyles.value : undefined,
            dimensionStyles.value,
            locationStyles.value,
            sizeStyles.value,
            props.style,
          ]}
          disabled={ isDisabled.value || undefined }
          href={ link.href.value }
          v-ripple={[
            !isDisabled.value && props.ripple,
            null,
            props.icon ? ['center'] : null,
          ]}
          onClick={ onClick }
          value={ valueAttr.value }
        >
          { genOverlays(true, 'v-btn') }

          { !props.icon && hasPrepend && (
            <span key="prepend" class="v-btn__prepend">
              { !slots.prepend ? (
                <VIcon
                  key="prepend-icon"
                  icon={ props.prependIcon }
                />
              ) : (
                <VDefaultsProvider
                  key="prepend-defaults"
                  disabled={ !props.prependIcon }
                  defaults={{
                    VIcon: {
                      icon: props.prependIcon,
                    },
                  }}
                  v-slots:default={ slots.prepend }
                />
              )}
            </span>
          )}

          <span class="v-btn__content" data-no-activator="">
            { (!slots.default && hasIcon) ? (
              <VIcon
                key="content-icon"
                icon={ props.icon }
              />
            ) : (
              <VDefaultsProvider
                key="content-defaults"
                disabled={ !hasIcon }
                defaults={{
                  VIcon: {
                    icon: props.icon,
                  },
                }}
              >
                { slots.default?.() ?? props.text }
              </VDefaultsProvider>
            )}
          </span>

          { !props.icon && hasAppend && (
            <span key="append" class="v-btn__append">
              { !slots.append ? (
                <VIcon
                  key="append-icon"
                  icon={ props.appendIcon }
                />
              ) : (
                <VDefaultsProvider
                  key="append-defaults"
                  disabled={ !props.appendIcon }
                  defaults={{
                    VIcon: {
                      icon: props.appendIcon,
                    },
                  }}
                  v-slots:default={ slots.append }
                />
              )}
            </span>
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
