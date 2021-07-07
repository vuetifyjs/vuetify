// Styles
import './VInput.sass'

// Components
import { VIcon } from '@/components/VIcon'

// Utilities
import { computed } from 'vue'
import { defineComponent, getUid } from '@/util'

// Types
import type { PropType } from 'vue'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeVariantProps, useVariant } from '@/composables/variant'
import { useProxiedModel } from '@/composables/proxiedModel'

export default defineComponent({
  name: 'VInput',

  inheritAttrs: false,

  props: {
    appendIcon: String,
    hideDetails: [Boolean, String] as PropType<boolean | 'auto'>,
    hideSpinButtons: Boolean,
    hint: String,
    id: String,
    label: String,
    loading: Boolean,
    persistentHint: Boolean,
    prependIcon: String,
    modelValue: null as any as PropType<any>,
    backgroundColor: String,

    ...makeThemeProps(),
    ...makeDensityProps(),
    ...makeVariantProps({ variant: 'contained' } as const),
  },

  setup (props, { attrs, slots }) {
    const uid = getUid()
    const id = computed(() => props.id || `input-${uid}`)
    const value = useProxiedModel(props, 'modelValue')
    const { themeClasses } = useTheme(props)
    const { colorClasses, colorStyles, variantClasses } = useVariant(props, 'v-input')
    const { densityClasses } = useDensity(props, 'v-input')

    return () => {
      return (
        <div
          class={[
            'v-input',
            themeClasses.value,
            colorClasses.value,
            variantClasses.value,
            densityClasses.value,
          ]}
          style={[
            colorStyles.value,
          ]}
        >
          { slots.prepend?.() }

          <div class="v-input__control">
            { slots.label ? slots.label() : (
              <label
                for={ id.value }
                class="v-label"
              >{ props.label }</label>
            )}

            { slots.default?.({
              uid,
              props: {
                id: id.value,
                value: value.value,
                on: (val: any) => value.value = val,
              },
            })}

            { props.variant === 'outlined' && (
              <div class="v-input__outline">
                <div class="v-input__outline__start"></div>
                <div class="v-input__outline__notch"></div>
                <div class="v-input__outline__end"></div>
              </div>
            )}
          </div>

          { slots.append?.() }

          <div class="v-input__details">
            { props.hint }
          </div>
        </div>
      )
    }
  },
})
