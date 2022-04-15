// Styles
import './VAlert.sass'

// Components
import { VAlertIcon } from './VAlertIcon'
import { VAlertText } from './VAlertText'
import { VAlertTitle } from './VAlertTitle'
import { VIcon } from '@/components/VIcon'

// Composables
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useTextColor } from '@/composables/color'

// Utilities
import { computed, toRef } from 'vue'
import { defineComponent } from '@/util'

// Types
import type { PropType } from 'vue'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { provideDefaults } from '@/composables/defaults'

const allowedTypes = ['success', 'info', 'warning', 'error'] as const

type ContextualType = typeof allowedTypes[number]

export const VAlert = defineComponent({
  name: 'VAlert',

  props: {
    border: {
      type: [Boolean, String],
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
      type: String,
      default: '$close',
    },
    closeLabel: {
      type: String,
      default: '$vuetify.close',
    },
    icon: {
      type: [Boolean, String] as PropType<false | string>,
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
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({ variant: 'contained-flat' } as const),
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
    const { positionClasses, positionStyles } = usePosition(props)
    const { roundedClasses } = useRounded(props)
    const { textColorClasses, textColorStyles } = useTextColor(toRef(props, 'borderColor'))

    function onCloseClick (e: MouseEvent) {
      isActive.value = false
    }

    provideDefaults({
      VAlertIcon: {
        density: toRef(props, 'density'),
        icon: computed(() => icon.value),
        size: computed(() => props.prominent ? 44 : 'default'),
      },
    })

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
            positionStyles.value,
          ]}
          role="alert"
        >
          { genOverlays(false, 'v-alert') }

          { props.border && (
            <div
              class={[
                'v-alert__border',
                textColorClasses.value,
              ]}
              style={ textColorStyles.value }
            />
          ) }

          { hasPrepend && (
            <>
              { slots.prepend
                ? (
                  <div class="v-banner__prepend">
                    { slots.prepend() }
                  </div>
                )
                : icon.value && (<VAlertIcon />)
              }
            </>
          ) }

          { hasTitle && (
            <VAlertTitle>
              { slots.title ? slots.title() : props.title }
            </VAlertTitle>
          ) }

          { hasText && (
            <VAlertText>
              { slots.text ? slots.text() : props.text }
            </VAlertText>
          ) }

          { slots.default?.() }

          { hasClose && (
            <div
              class="v-alert__close"
              onClick={ onCloseClick }
            >
              { slots.close
                ? slots.close()
                : (
                  <VIcon
                    icon={ props.closeIcon }
                    size="small"
                  />
                )
              }
            </div>
          ) }
        </props.tag>
      )
    }
  },
})

export type VAlert = InstanceType<typeof VAlert>
