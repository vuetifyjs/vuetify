// Styles
import './VIconBtn.scss'

// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { VProgressCircular } from '@/components/VProgressCircular'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeComponentProps } from '@/composables/component'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'

// Utilities
import { toDisplayString, toRef } from 'vue'
import { convertToUnit, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { IconValue } from '@/composables/icons'
import type { Variant } from '@/composables/variant'

export type VIconBtnSlots = {
  default: never
  loader: never
}

export type VIconBtnSizes = 'x-small' | 'small' | 'default' | 'large' | 'x-large'

export const makeVIconBtnProps = propsFactory({
  active: {
    type: Boolean,
    default: undefined,
  },
  activeColor: String,
  activeIcon: [String, Function, Object] as PropType<IconValue>,
  activeVariant: String as PropType<Variant>,
  baseVariant: {
    type: String as PropType<Variant>,
    default: 'tonal',
  },
  disabled: Boolean,
  height: [Number, String],
  width: [Number, String],
  hideOverlay: Boolean,
  icon: [String, Function, Object] as PropType<IconValue>,
  iconColor: String,
  iconSize: {
    type: [Number, String] as PropType<VIconBtnSizes | number | string>,
    default: 'default',
  },
  iconSizes: {
    type: Array as PropType<[VIconBtnSizes, number][]>,
    default: () => ([
      ['x-small', 10],
      ['small', 16],
      ['default', 24],
      ['large', 28],
      ['x-large', 32],
    ]),
  },
  loading: Boolean,
  opacity: [Number, String],
  readonly: Boolean,
  rotate: [Number, String],
  size: {
    type: [Number, String] as PropType<VIconBtnSizes | number | string>,
    default: 'default',
  },
  sizes: {
    type: Array as PropType<[VIconBtnSizes, number][]>,
    default: () => ([
      ['x-small', 16],
      ['small', 24],
      ['default', 40],
      ['large', 48],
      ['x-large', 56],
    ]),
  },
  text: {
    type: [String, Number, Boolean],
    default: undefined,
  },

  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeTagProps({ tag: 'button' }),
  ...makeThemeProps(),
  ...makeVariantProps({ variant: 'flat' } as const),
}, 'VIconBtn')

export const VIconBtn = genericComponent<VIconBtnSlots>()({
  name: 'VIconBtn',

  props: makeVIconBtnProps(),

  emits: {
    'update:active': (value: boolean) => true,
  },

  setup (props, { attrs, slots }) {
    const isActive = useProxiedModel(props, 'active')

    const { themeClasses } = provideTheme(props)
    const { borderClasses } = useBorder(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)

    const { colorClasses, colorStyles, variantClasses } = useVariant(toRef(() => ({
      color: (() => {
        if (props.disabled) return undefined
        if (!isActive.value) return props.color
        // Use an inline fallback as opposed to setting a default color
        // because non-toggle buttons are default flat whereas toggle
        // buttons are default tonal and active flat. The exact use
        // case for this is a toggle button with no active color.
        return props.activeColor ?? props.color ?? 'surface-variant'
      })(),
      variant: (() => {
        if (isActive.value === undefined) return props.variant
        if (isActive.value) return props.activeVariant ?? props.variant
        return props.baseVariant ?? props.variant
      })(),
    })))

    const btnSizeMap = new Map(props.sizes)
    const iconSizeMap = new Map(props.iconSizes)

    function onClick () {
      if (
        props.disabled ||
        props.readonly ||
        isActive.value === undefined ||
        (props.tag === 'a' && attrs.href)
      ) return

      isActive.value = !isActive.value
    }

    useRender(() => {
      const icon = isActive.value ? props.activeIcon ?? props.icon : props.icon

      const size = props.size as VIconBtnSizes
      const hasNamedSize = btnSizeMap.has(size)
      const btnSize = hasNamedSize ? btnSizeMap.get(size) : size
      const btnHeight = props.height ?? btnSize
      const btnWidth = props.width ?? btnSize

      const _iconSize = hasNamedSize ? size : (props.iconSize as VIconBtnSizes ?? size)
      const iconSize = iconSizeMap.get(_iconSize) ?? _iconSize

      const iconProps = { icon, size: iconSize, iconColor: props.iconColor, opacity: props.opacity }

      return (
        <props.tag
          class={[
            {
              'v-icon-btn': true,
              'v-icon-btn--active': isActive.value,
              'v-icon-btn--disabled': props.disabled,
              'v-icon-btn--loading': props.loading,
              'v-icon-btn--readonly': props.readonly,
              [`v-icon-btn--${props.size}`]: true,
            },
            themeClasses.value,
            colorClasses.value,
            borderClasses.value,
            elevationClasses.value,
            roundedClasses.value,
            variantClasses.value,
            props.class,
          ]}
          style={[
            {
              '--v-icon-btn-rotate': convertToUnit(props.rotate, 'deg'),
              '--v-icon-btn-height': convertToUnit(btnHeight),
              '--v-icon-btn-width': convertToUnit(btnWidth),
            },
            colorStyles.value,
            props.style,
          ]}
          tabindex={ props.disabled || props.readonly ? -1 : 0 }
          onClick={ onClick }
        >
          { genOverlays(!props.hideOverlay, 'v-icon-btn') }

          <div class="v-icon-btn__content" data-no-activator="">
            { (!slots.default && icon) ? (
              <VIcon
                key="content-icon"
                { ...iconProps }
              />
            ) : (
              <VDefaultsProvider
                key="content-defaults"
                disabled={ !icon }
                defaults={{ VIcon: { ...iconProps } }}
                v-slots={{
                  default: () => slots.default?.() ?? toDisplayString(props.text),
                }}
              />
            )}
          </div>

          { !!props.loading && (
            <span key="loader" class="v-icon-btn__loader">
              { slots.loader?.() ?? (
                <VProgressCircular
                  color={ typeof props.loading === 'boolean' ? undefined : props.loading }
                  indeterminate="disable-shrink"
                  width="2"
                  size={ iconSize }
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
