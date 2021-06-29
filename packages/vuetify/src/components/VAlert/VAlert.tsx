// Styles
import './VAlert.sass'

// Components
import { VAvatar } from '@/components/VAvatar'
import { VBtn } from '@/components/VBtn'

// Composables
import { useBorder } from '@/composables/border'
import { useTextColor } from '@/composables/color'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { makeVariantProps, useVariant } from '@/composables/variant'

// Utilities
import { computed, defineComponent, toRef } from 'vue'
import { makeProps } from '@/util'

// Types
import type { PropType } from 'vue'

export default defineComponent({
  name: 'VAlert',

  props: makeProps({
    border: {
      type: [Boolean, String],
      validator (val: boolean | string) {
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
    type: {
      type: String,
      validator (val: string) {
        return [
          'info',
          'error',
          'success',
          'warning',
        ].includes(val)
      },
    },

    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps(),
  }),

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
    const vprops = computed(() => ({
      color: props.color ?? props.type,
      variant: props.variant,
    }))

    const { themeClasses } = useTheme(props)
    const { borderClasses } = useBorder(props, 'v-alert')
    const { colorClasses, colorStyles, variantClasses } = useVariant(vprops.value, 'v-alert')
    const { densityClasses } = useDensity(props, 'v-alert')
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props, 'v-alert')
    const { roundedClasses } = useRounded(props, 'v-alert')
    const { textColorClasses, textColorStyles } = useTextColor(toRef(props, 'borderColor'))

    function onCloseClick (e: MouseEvent) {
      isActive.value = false
    }

    return () => {
      const hasText = !!(slots.text || props.text)
      const hasPrepend = !!(slots.prepend || props.icon || props.type)
      const hasClose = !!(slots.close || props.closable)
      const border = props.border === true ? 'start' : props.border

      return isActive.value && (
        <props.tag
          class={[
            'v-alert',
            {
              [`v-alert--border-${border}`]: !!props.border,
              'v-alert--prominent': props.prominent,
            },
            themeClasses.value,
            borderClasses.value,
            colorClasses.value,
            densityClasses.value,
            elevationClasses.value,
            positionClasses.value,
            roundedClasses.value,
            variantClasses.value,
          ]}
          style={[
            colorStyles.value,
            positionStyles.value,
          ]}
          role="alert"
        >
          { props.border && (
            <div
              class={[
                'v-alert__border',
                textColorClasses.value,
              ]}
              style={ textColorStyles.value }
            ></div>
          ) }

          <div class="v-alert__underlay"></div>

          <div class="v-alert__content">
            { hasPrepend && (
              <div class="v-alert__avatar">
                { slots.prepend
                  ? slots.prepend()
                  : (
                    <VAvatar
                      density={ props.density }
                      icon={ icon.value }
                    />
                  )
                }
              </div>
            ) }

            { hasText && props.text }

            { slots.default?.() }

            { hasClose && (
              <div class="v-alert__close">
                { slots.close
                  ? slots.close({ props: { onClick: onCloseClick } })
                  : (
                    <VBtn
                      density={ props.density }
                      icon={ props.closeIcon }
                      size="x-small"
                      variant="text"
                      onClick={ onCloseClick }
                    />
                  )
                }
              </div>
            ) }
          </div>
        </props.tag>
      )
    }
  },
})
