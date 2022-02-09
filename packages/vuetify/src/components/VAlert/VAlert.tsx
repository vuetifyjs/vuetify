// Styles
import './VAlert.sass'

// Components
import { VAlertContent } from './VAlertContent'
import { VAlertText } from './VAlertText'
import { VIcon } from '@/components/VIcon'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { makeVariantProps, useVariant } from '@/composables/variant'
import { useBorder } from '@/composables/border'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useTextColor } from '@/composables/color'

// Utilities
import { computed } from 'vue'
import { defineComponent } from '@/util'

// Types
import type { PropType } from 'vue'

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
    sticky: Boolean,
    text: String,
    tip: Boolean,
    type: {
      type: String as PropType<ContextualType>,
      validator: (val: ContextualType) => allowedTypes.includes(val),
    },

    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps(),
  },

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const borderProps = computed(() => ({
      border: props.border === true || props.tip ? 'start' : props.border,
    }))
    const isActive = useProxiedModel(props, 'modelValue')
    const icon = computed(() => {
      if (props.icon === false) return undefined
      if (!props.type) return props.icon

      return props.icon ?? `$${props.type}`
    })
    const variantProps = computed(() => ({
      color: props.color ?? props.type,
      textColor: props.textColor,
      variant: props.variant,
    }))

    const { themeClasses } = provideTheme(props)
    const { borderClasses } = useBorder(borderProps.value)
    const { colorClasses, colorStyles, variantClasses } = useVariant(variantProps)
    const { densityClasses } = useDensity(props)
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props)
    const { roundedClasses } = useRounded(props)
    const { textColorClasses, textColorStyles } = useTextColor(computed(() => {
      return props.borderColor ?? (props.tip ? variantProps.value.color : undefined)
    }))

    function onCloseClick (e: MouseEvent) {
      isActive.value = false
    }

    return () => {
      const hasBorder = !!borderProps.value.border
      const hasClose = !!(slots.close || props.closable)
      const hasIcon = !!(slots.icon || icon.value)
      const hasText = !!(slots.text || props.text)
      const hasContent = hasText || slots.default

      return isActive.value && (
        <props.tag
          class={[
            'v-alert',
            {
              [`v-alert--border-${borderProps.value.border}`]: hasBorder,
              'v-alert--prominent': props.prominent,
              'v-alert--tip': props.tip,
            },
            themeClasses.value,
            borderClasses.value,
            !props.tip && colorClasses.value,
            densityClasses.value,
            elevationClasses.value,
            positionClasses.value,
            roundedClasses.value,
            variantClasses.value,
          ]}
          style={[
            !props.tip && colorStyles.value,
            positionStyles.value,
          ]}
          role="alert"
        >
          { hasBorder && (
            <div
              class={[
                'v-alert__border',
                textColorClasses.value,
              ]}
              style={ textColorStyles.value }
            />
          ) }

          { hasIcon && (
            <VIcon
              class={[
                'v-alert__icon',
                props.tip && textColorClasses.value,
              ]}
              icon={ icon.value }
              style={ props.tip && textColorStyles.value }
            />
          ) }

          { hasContent && (
            <VAlertContent>
              <div class="v-alert__underlay" />

              { hasText && (
                <VAlertText>
                  { slots.text ? slots.text() : props.text }
                </VAlertText>
              ) }

              { slots.default?.() }
            </VAlertContent>
          ) }

          { hasClose && (
            <div
              class="v-alert__close"
              onClick={ onCloseClick }
            >
              { slots.close
                ? slots.close({ props: { onClick: onCloseClick } })
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
