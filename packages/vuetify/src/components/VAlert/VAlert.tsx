// Styles
import './VAlert.sass'

// Components
import { VAlertTitle } from './VAlertTitle'
import { VBtn } from '@/components/VBtn'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'

// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { useDefaults, useSlotDefaults } from '@/composables/defaults'
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
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'

// Utilities
import { toRef } from 'vue'
import { genericComponent, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'

const allowedTypes = ['success', 'info', 'warning', 'error'] as const

type ContextualType = typeof allowedTypes[number]

export const makeVAlertProps = propsFactory({
  border: {
    type: [Boolean, String] as PropType<boolean | 'top' | 'end' | 'bottom' | 'start'>,
    validator: (val: boolean | string) => {
      return typeof val === 'boolean' || [
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
  ...makeVariantProps({ variant: 'flat' } as const),
}, 'VAlert')

export type VAlertSlots = {
  default: never
  prepend: never
  title: never
  text: never
  append: never
  close: { props: Record<string, any> }
}

export const VAlert = genericComponent<VAlertSlots>()({
  name: 'VAlert',

  props: makeVAlertProps(),

  emits: {
    'click:close': (e: MouseEvent) => true,
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { emit, slots }) {
    const _props = useDefaults(props)
    const { getSlotDefaultsInfo } = useSlotDefaults()
    const isActive = useProxiedModel(_props, 'modelValue')
    const icon = toRef(() => {
      if (_props.icon === false) return undefined
      if (!_props.type) return _props.icon

      return _props.icon ?? `$${_props.type}`
    })

    const { iconSize } = useIconSizes(_props, () => _props.prominent ? 44 : undefined)
    const { themeClasses } = provideTheme(_props)
    const { colorClasses, colorStyles, variantClasses } = useVariant(() => ({
      color: _props.color ?? _props.type,
      variant: _props.variant,
    }))
    const { densityClasses } = useDensity(_props)
    const { dimensionStyles } = useDimension(_props)
    const { elevationClasses } = useElevation(_props)
    const { locationStyles } = useLocation(_props)
    const { positionClasses } = usePosition(_props)
    const { roundedClasses } = useRounded(_props)
    const { textColorClasses, textColorStyles } = useTextColor(() => _props.borderColor)
    const { t } = useLocale()

    const closeProps = toRef(() => ({
      'aria-label': t(_props.closeLabel),
      onClick (e: MouseEvent) {
        isActive.value = false

        emit('click:close', e)
      },
    }))

    // Helper function to wrap slot content with defaults
    function wrapSlot(slotName: string, slotFn: (() => any) | undefined, fallbackContent?: any) {
      const slotDefaultsInfo = getSlotDefaultsInfo(slotName)
      
      if (!slotDefaultsInfo && !slotFn) {
        return fallbackContent
      }
      
      if (!slotDefaultsInfo) {
        return slotFn?.() ?? fallbackContent
      }
      
      const { componentDefaults, directProps } = slotDefaultsInfo
      
      return (
        <VDefaultsProvider defaults={componentDefaults as any}>
          <div {...directProps}>
            {slotFn?.() ?? fallbackContent}
          </div>
        </VDefaultsProvider>
      )
    }

    return () => {
      const hasPrepend = !!(slots.prepend || icon.value)
      const hasTitle = !!(slots.title || _props.title)
      const hasClose = !!(slots.close || _props.closable)

      const iconProps = {
        density: _props.density,
        icon: icon.value,
        size: _props.iconSize || _props.prominent
          ? iconSize.value
          : undefined,
      }

      return isActive.value && (
        <_props.tag
          class={[
            'v-alert',
            _props.border && {
              'v-alert--border': !!_props.border,
              [`v-alert--border-${_props.border === true ? 'start' : _props.border}`]: true,
            },
            {
              'v-alert--prominent': _props.prominent,
            },
            themeClasses.value,
            colorClasses.value,
            densityClasses.value,
            elevationClasses.value,
            positionClasses.value,
            roundedClasses.value,
            variantClasses.value,
            _props.class,
          ]}
          style={[
            colorStyles.value,
            dimensionStyles.value,
            locationStyles.value,
            _props.style,
          ]}
          role="alert"
        >
          { genOverlays(false, 'v-alert') }

          { _props.border && (
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
                >
                  { wrapSlot('prepend', slots.prepend) }
                </VDefaultsProvider>
              )}
            </div>
          )}

          <div class="v-alert__content">
            { hasTitle && (
              <VAlertTitle key="title">
                { wrapSlot('title', slots.title, _props.title) }
              </VAlertTitle>
            )}

            { wrapSlot('text', slots.text, _props.text) }

            { wrapSlot('default', slots.default) }
          </div>

          { slots.append && (
            <div key="append" class="v-alert__append">
              { wrapSlot('append', slots.append) }
            </div>
          )}

          { hasClose && (
            <div key="close" class="v-alert__close">
              { !slots.close ? (
                <VBtn
                  key="close-btn"
                  icon={ _props.closeIcon }
                  size="x-small"
                  variant="text"
                  { ...closeProps.value }
                />
              ) : (
                <VDefaultsProvider
                  key="close-defaults"
                  defaults={{
                    VBtn: {
                      icon: _props.closeIcon,
                      size: 'x-small',
                      variant: 'text',
                    },
                  }}
                >
                  { wrapSlot('close', () => slots.close?.({ props: closeProps.value })) }
                </VDefaultsProvider>
              )}
            </div>
          )}
        </_props.tag>
      )
    }
  },
})

export type VAlert = InstanceType<typeof VAlert>
