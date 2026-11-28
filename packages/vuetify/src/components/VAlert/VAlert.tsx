// Styles
import './VAlert.sass'

// Components
import { VAlertTitle } from './VAlertTitle'
import { VExpandTransition } from '@/components/transitions'
import { VBtn } from '@/components/VBtn'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { VProgressCircular } from '@/components/VProgressCircular'
import { VProgressLinear } from '@/components/VProgressLinear'

// Composables
import { useAutoDismiss } from './autoDismiss'
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { IconValue } from '@/composables/icons'
import { makeIconSizeProps, useIconSizes } from '@/composables/iconSizes'
import { useLocale } from '@/composables/locale'
import { makeLocationProps, useLocation } from '@/composables/location'
import { makePositionProps, usePosition } from '@/composables/position'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'

// Utilities
import { toRef } from 'vue'
import { genericComponent, isBoolean, propsFactory } from '@/util'

// Types
import type { Component, PropType } from 'vue'
import type { VAlertSlots } from './VAlert.types'

export type { VAlertSlots }

const allowedTypes = ['success', 'info', 'warning', 'error'] as const

type ContextualType = typeof allowedTypes[number]

export const makeVAlertProps = propsFactory({
  border: {
    type: [Boolean, String] as PropType<boolean | 'top' | 'end' | 'bottom' | 'start'>,
    validator: (val: boolean | string) => {
      return isBoolean(val) || [
        'top',
        'end',
        'bottom',
        'start',
      ].includes(val)
    },
  },
  borderColor: String,
  closable: Boolean,
  closeIcon: {
    type: IconValue,
    default: '$close',
  },
  closeLabel: {
    type: String,
    default: '$vuetify.close',
  },
  icon: {
    type: [Boolean, String, Function, Object] as PropType<false | IconValue>,
    default: null,
  },
  modelValue: {
    type: Boolean,
    default: true,
  },
  prominent: Boolean,
  title: String,
  text: String,
  timeout: {
    type: [Number, String],
    default: -1,
  },
  timer: [Boolean, String] as PropType<boolean | 'top' | 'bottom' | 'close'>,
  type: {
    type: String as PropType<ContextualType>,
    validator: (val: ContextualType) => allowedTypes.includes(val),
  },

  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeIconSizeProps(),
  ...makeLocationProps(),
  ...makePositionProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeTransitionProps({
    transition: { component: VExpandTransition as Component },
  }),
  ...makeVariantProps({ variant: 'flat' } as const),
}, 'VAlert')

export const VAlert = genericComponent<VAlertSlots>()({
  name: 'VAlert',

  props: makeVAlertProps(),

  emits: {
    'click:close': (e: MouseEvent) => true,
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { emit, slots }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const icon = toRef(() => {
      if (props.icon === false) return undefined
      if (!props.type) return props.icon

      return props.icon ?? `$${props.type}`
    })

    const { iconSize } = useIconSizes(props, () => props.prominent ? 44 : undefined)
    const { themeClasses } = provideTheme(props)
    const { colorClasses, colorStyles, variantClasses } = useVariant(() => ({
      color: props.color ?? props.type,
      variant: props.variant,
    }))
    const { densityClasses } = useDensity(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { locationStyles } = useLocation(props)
    const { positionClasses } = usePosition(props)
    const { roundedClasses, roundedStyles } = useRounded(props)
    const { textColorClasses, textColorStyles } = useTextColor(() => props.borderColor)
    const { t } = useLocale()

    const { rootEl, progress, events } = useAutoDismiss(isActive, () => Number(props.timeout))

    const closeProps = toRef(() => ({
      'aria-label': t(props.closeLabel),
      onClick (e: MouseEvent) {
        isActive.value = false

        emit('click:close', e)
      },
    }))

    return () => {
      const hasPrepend = !!(slots.prepend || icon.value)
      const hasTitle = !!(slots.title || props.title)
      const hasClose = !!(slots.close || props.closable)
      const hasTimer = !!props.timer && Number(props.timeout) > 0

      const iconProps = {
        density: props.density,
        icon: icon.value,
        size: props.iconSize || props.prominent
          ? iconSize.value
          : undefined,
      }

      return (
        <MaybeTransition transition={ props.transition }>
          { isActive.value && (
            <props.tag
              ref={ rootEl }
              class={[
                'v-alert',
                props.border && {
                  'v-alert--border': !!props.border,
                  [`v-alert--border-${props.border === true ? 'start' : props.border}`]: true,
                },
                {
                  'v-alert--prominent': props.prominent,
                },
                themeClasses.value,
                colorClasses.value,
                densityClasses.value,
                elevationClasses.value,
                positionClasses.value,
                roundedClasses.value,
                variantClasses.value,
                props.class,
              ]}
              style={[
                colorStyles.value,
                dimensionStyles.value,
                locationStyles.value,
                roundedStyles.value,
                props.style,
              ]}
              role="alert"
              { ...events }
            >
              { genOverlays(false, 'v-alert') }

              { hasTimer && props.timer !== 'close' && (
                <VProgressLinear
                  key="timer"
                  class="v-alert__timer"
                  absolute
                  location={ props.timer === 'bottom' ? 'bottom' : 'top' }
                  modelValue={ progress.value }
                  shape="flat"
                />
              )}

              { props.border && (
                <div
                  key="border"
                  class={[
                    'v-alert__border',
                    textColorClasses.value,
                  ]}
                  style={ textColorStyles.value }
                />
              )}

              { hasPrepend && (
                <div key="prepend" class="v-alert__prepend">
                  { !slots.prepend ? (
                    <VIcon key="prepend-icon" { ...iconProps } />
                  ) : (
                    <VDefaultsProvider
                      key="prepend-defaults"
                      disabled={ !icon.value }
                      defaults={{ VIcon: { ...iconProps } }}
                      v-slots:default={ slots.prepend }
                    />
                  )}
                </div>
              )}

              <div class="v-alert__content">
                { hasTitle && (
                  <VAlertTitle key="title">
                    { slots.title?.() ?? props.title }
                  </VAlertTitle>
                )}

                { slots.text?.() ?? props.text }

                { slots.default?.() }
              </div>

              { slots.append && (
                <div key="append" class="v-alert__append">
                  { slots.append() }
                </div>
              )}

              { hasClose && (
                <div key="close" class="v-alert__close">
                  { !slots.close ? (
                    <VBtn
                      key="close-btn"
                      icon={ props.closeIcon }
                      size="x-small"
                      variant="text"
                      { ...closeProps.value }
                    />
                  ) : (
                    <VDefaultsProvider
                      key="close-defaults"
                      defaults={{
                        VBtn: {
                          icon: props.closeIcon,
                          size: 'x-small',
                          variant: 'text',
                        },
                      }}
                    >
                      { slots.close?.({ props: closeProps.value, timerProgress: progress.value }) }
                    </VDefaultsProvider>
                  )}

                  { hasTimer && props.timer === 'close' && (
                    <VProgressCircular
                      key="timer"
                      class="v-alert__timer v-alert__timer--close"
                      modelValue={ progress.value }
                      shape="flat"
                      width={ 2 }
                    />
                  )}
                </div>
              )}
            </props.tag>
          )}
        </MaybeTransition>
      )
    }
  },
})

export type VAlert = InstanceType<typeof VAlert>
