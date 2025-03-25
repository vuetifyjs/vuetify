// Styles
import './VIconBtn.scss'

// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { VProgressCircular } from '@/components/VProgressCircular'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'

// Utilities
import { computed, toDisplayString, toRefs } from 'vue'
import { convertToUnit, genericComponent, pick, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { IconValue } from '@/composables/icons'
import type { Variant } from '@/composables/variant'

export type VIconBtnSlots = {
  default: never
  loader: never
}

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
  ...pick(makeDimensionProps(), ['height', 'width']),
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

  setup (props, { slots, emit }) {
    const { activeColor, color } = toRefs(props)
    const isActive = useProxiedModel(props, 'active')

    const { themeClasses } = provideTheme(props)
    const { borderClasses } = useBorder(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { roundedClasses } = useRounded(props)

    const computedColor = computed(() => {
      if (props.disabled) return undefined

      return isActive.value ? activeColor.value ?? color.value : color.value
    })

    const variantProps = computed(() => ({
      color: computedColor.value,
      variant: typeof isActive.value === 'boolean' && isActive.value
        ? props.activeVariant ?? props.variant
        : props.baseVariant ?? props.variant,
    }))

    const { colorClasses, colorStyles, variantClasses } = useVariant(variantProps)

    const computedIcon = computed(() => {
      return isActive.value && props.activeIcon ? props.activeIcon : props.icon
    })

    function onClick () {
      if (
        props.disabled ||
        props.readonly ||
        typeof isActive.value !== 'boolean'
      ) return

      isActive.value = !isActive.value
    }

    useRender(() => {
      const hasIcon = !!(props.icon || props.activeIcon)

      return (
        <props.tag
          class={[
            {
              'v-icon-btn': true,
              'v-icon-btn--active': isActive.value,
              'v-icon-btn--disabled': props.disabled,
              'v-icon-btn--readonly': props.readonly,
              'v-icon-btn--loading': props.loading,
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
              '--v-icon-btn-height': props.size ? convertToUnit(props.size) : undefined,
              '--v-icon-btn-width': props.size ? convertToUnit(props.size) : undefined,
            },
            colorStyles.value,
            dimensionStyles.value,
            props.style,
          ]}
          tabindex={ props.disabled || props.readonly ? -1 : 0 }
          onClick={ onClick }
        >
          { genOverlays(true, 'v-icon-btn') }

          <div class="v-icon-btn__content" data-no-activator="">
            { (!slots.default && hasIcon) ? (
              <VIcon
                key="content-icon"
                icon={ computedIcon.value }
                opacity={ props.opacity }
                color={ props.iconColor }
              />
            ) : (
              <VDefaultsProvider
                key="content-defaults"
                disabled={ !hasIcon }
                defaults={{
                  VIcon: {
                    icon: computedIcon.value,
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
