// Styles
import './VAlert.sass'

// Components
import VAlertText from './VAlertText'
import { VAvatar } from '@/components/VAvatar'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { makeVariantProps, useVariant } from '@/composables/variant'

// Utilities
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'

import { makeProps } from '@/util'

export default defineComponent({
  name: 'VAlert',

  props: makeProps({
    closeLabel: {
      type: String,
      default: '$vuetify.close',
    },
    icon: {
      type: [Boolean, String] as PropType<false | string>,
      default: null,
    },
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

    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps(),
  }),

  setup (props, { slots }) {
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

    return () => {
      const hasText = !!(slots.text || props.text)
      const hasPrepend = !!(slots.prepend || props.icon || props.type)

      return (
        <props.tag
          class={[
            'v-alert',
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
          {/* v-alert does not support active states */}
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

            { hasText && (
              <VAlertText>
                { slots.text ? slots.text() : props.text }
              </VAlertText>
            ) }

            { slots.default?.() }

          </div>
        </props.tag>
      )
    }
  },
})
