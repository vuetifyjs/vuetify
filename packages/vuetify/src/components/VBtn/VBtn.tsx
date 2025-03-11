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
import { computed, toDisplayString, withDirectives } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { RippleDirectiveBinding } from '@/directives/ripple'

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
  activeColor: String,
  baseColor: String,
  symbol: {
    type: null,
    default: VBtnToggleSymbol,
  },
  flat: Boolean,
  icon: [Boolean, String, Function, Object] as PropType<boolean | IconValue>,
  prependIcon: IconValue,
  appendIcon: IconValue,

  block: Boolean,
  readonly: Boolean,
  slim: Boolean,
  stacked: Boolean,

  ripple: {
    type: [Boolean, Object] as PropType<RippleDirectiveBinding['value']>,
    default: true,
  },

  text: {
    type: [String, Number, Boolean],
    default: undefined,
  },

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
}, 'VBtn')

export const VBtn = genericComponent<VBtnSlots>()({
  name: 'VBtn',

  props: makeVBtnProps(),

  emits: {
    'group:selected': (val: { value: boolean }) => true,
  },

  setup (props, { attrs, slots }) {
    const { themeClasses } = provideTheme(props)
    const { borderClasses } = useBorder(props)
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

    const color = computed(() => isActive.value ? props.activeColor ?? props.color : props.color)
    const variantProps = computed(() => {
      const showColor = (
        (group?.isSelected.value && (!link.isLink.value || link.isActive?.value)) ||
        (!group || link.isActive?.value)
      )
      return ({
        color: showColor ? color.value ?? props.baseColor : props.baseColor,
        variant: props.variant,
      })
    })
    const { colorClasses, colorStyles, variantClasses } = useVariant(variantProps)

    const isDisabled = computed(() => group?.disabled.value || props.disabled)
    const isElevated = computed(() => {
      return props.variant === 'elevated' && !(props.disabled || props.flat || props.border)
    })
    const valueAttr = computed(() => {
      if (props.value === undefined || typeof props.value === 'symbol') return undefined

      return Object(props.value) === props.value
        ? JSON.stringify(props.value, null, 0)
        : props.value
    })

    function onClick (e: MouseEvent) {
      if (
        isDisabled.value ||
        (link.isLink.value && (
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          (e.button !== 0) ||
          attrs.target === '_blank'
        ))
      ) return

      link.navigate?.(e)
      group?.toggle()
    }

    useSelectLink(link, group?.select)

    useRender(() => {
      const Tag = (link.isLink.value) ? 'a' : props.tag
      const hasPrepend = !!(props.prependIcon || slots.prepend)
      const hasAppend = !!(props.appendIcon || slots.append)
      const hasIcon = !!(props.icon && props.icon !== true)

      return withDirectives(
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
              'v-btn--readonly': props.readonly,
              'v-btn--slim': props.slim,
              'v-btn--stacked': props.stacked,
            },
            themeClasses.value,
            borderClasses.value,
            colorClasses.value,
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
            colorStyles.value,
            dimensionStyles.value,
            locationStyles.value,
            sizeStyles.value,
            props.style,
          ]}
          aria-busy={ props.loading ? true : undefined }
          disabled={ isDisabled.value || undefined }
          tabindex={ props.loading || props.readonly ? -1 : undefined }
          onClick={ onClick }
          value={ valueAttr.value }
          { ...link.linkProps }
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
                { slots.default?.() ?? toDisplayString(props.text) }
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
                  width="2"
                />
              )}
            </span>
          )}
        </Tag>,
        [[
          Ripple,
          !isDisabled.value && props.ripple,
          '',
          { center: !!props.icon },
        ]]
      )
    })

    return { group }
  },
})

export type VBtn = InstanceType<typeof VBtn>
