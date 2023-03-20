// Styles
import './VAlert.sass'

// Components
import { VAlertTitle } from './VAlertTitle'
import { VBtn } from '@/components/VBtn'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'

// Composables
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeLocationProps, useLocation } from '@/composables/location'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useTextColor } from '@/composables/color'
import { IconValue } from '@/composables/icons'

// Utilities
import { computed, toRef } from 'vue'
import { genericComponent } from '@/util'

// Types
import type { PropType } from 'vue'
import type { MakeSlots } from '@/util'

const allowedTypes = ['success', 'info', 'warning', 'error'] as const

type ContextualType = typeof allowedTypes[number]

export type VAlertSlots = MakeSlots<{
  default: []
  prepend: []
  title: []
  text: []
  append: []
  close: []
}>

export const VAlert = genericComponent<VAlertSlots>()({
  name: 'VAlert',

  props: {
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

    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeLocationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({ variant: 'flat' } as const),
  },

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const icon = computed(() => {
      if (props.icon === false) return undefined
      if (!props.type) return props.icon

      return props.icon ?? `$${props.type}`
    })
    const variantProps = computed(() => ({
      color: props.color ?? props.type,
      variant: props.variant,
    }))

    const { themeClasses } = provideTheme(props)
    const { colorClasses, colorStyles, variantClasses } = useVariant(variantProps)
    const { densityClasses } = useDensity(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { locationStyles } = useLocation(props)
    const { positionClasses } = usePosition(props)
    const { roundedClasses } = useRounded(props)
    const { textColorClasses, textColorStyles } = useTextColor(toRef(props, 'borderColor'))
    const { t } = useLocale()

    const closeProps = computed(() => ({
      'aria-label': t(props.closeLabel),
      onClick (e: MouseEvent) {
        isActive.value = false
      },
    }))

    return () => {
      const hasPrepend = !!(slots.prepend || icon.value)
      const hasTitle = !!(slots.title || props.title)
      const hasText = !!(props.text || slots.text)
      const hasClose = !!(slots.close || props.closable)

      return isActive.value && (
        <props.tag
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
          ]}
          style={[
            colorStyles.value,
            dimensionStyles.value,
            locationStyles.value,
          ]}
          role="alert"
        >
          { genOverlays(false, 'v-alert') }

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
            <VDefaultsProvider
              key="prepend"
              defaults={{
                VIcon: {
                  density: props.density,
                  icon: icon.value,
                  size: props.prominent ? 44 : 28,
                },
              }}
            >
              <div class="v-alert__prepend">
                { slots.prepend
                  ? slots.prepend()
                  : icon.value && (<VIcon />)
                }
              </div>
            </VDefaultsProvider>
          )}

          <div class="v-alert__content">
            { hasTitle && (
              <VAlertTitle key="title">
                { slots.title ? slots.title() : props.title }
              </VAlertTitle>
            )}

            { hasText && (
              slots.text ? slots.text() : props.text
            )}

            { slots.default?.() }
          </div>

          { slots.append && (
            <div key="append" class="v-alert__append">
              { slots.append() }
            </div>
          )}

          { hasClose && (
            <VDefaultsProvider
              key="close"
              defaults={{
                VBtn: {
                  icon: props.closeIcon,
                  size: 'x-small',
                  variant: 'text',
                },
              }}
            >
              <div class="v-alert__close">
                { slots.close?.({ props: closeProps.value }) ?? <VBtn { ...closeProps.value } /> }
              </div>
            </VDefaultsProvider>
          )}
        </props.tag>
      )
    }
  },
})

export type VAlert = InstanceType<typeof VAlert>
