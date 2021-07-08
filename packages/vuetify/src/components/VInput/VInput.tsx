// Styles
import './VInput.sass'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { makeVariantProps, useVariant } from '@/composables/variant'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed } from 'vue'
import { defineComponent, getUid } from '@/util'

// Types
import type { PropType } from 'vue'

export default defineComponent({
  name: 'VInput',

  inheritAttrs: false,

  props: {
    appendIcon: String,
    backgroundColor: String,
    hideDetails: [Boolean, String] as PropType<boolean | 'auto'>,
    hideSpinButtons: Boolean,
    hint: String,
    id: String,
    label: String,
    loading: Boolean,
    modelValue: null as any as PropType<any>,
    persistentHint: Boolean,
    prependIcon: String,

    ...makeThemeProps(),
    ...makeDensityProps(),
    ...makeVariantProps({ variant: 'contained' } as const),
  },

  setup (props, { slots }) {
    const { themeClasses } = useTheme(props)
    const { colorClasses, colorStyles, variantClasses } = useVariant(props, 'v-input')
    const { densityClasses } = useDensity(props, 'v-input')

    const uid = getUid()
    const id = computed(() => props.id || `input-${uid}`)
    const value = useProxiedModel(props, 'modelValue')

    return () => {
      return (
        <div
          class={[
            'v-input',
            themeClasses.value,
            colorClasses.value,
            densityClasses.value,
            variantClasses.value,
          ]}
          style={[
            colorStyles.value,
          ]}
        >
          { slots.prepend?.() }

          <div class="v-input__control">
            { slots.label
              ? slots.label()
              : (
                <label
                  for={ id.value }
                  class="v-label"
                >
                  { props.label }
                </label>
              )
            }

            { slots.default?.({
              uid,
              props: {
                id: id.value,
                value: value.value,
                on: (val: any) => value.value = val,
              },
            }) }

            { props.variant === 'outlined' && (
              <div class="v-input__outline">
                <div class="v-input__outline__start" />

                <div class="v-input__outline__notch" />

                <div class="v-input__outline__end" />
              </div>
            )}
          </div>

          { slots.append?.() }

          { props.hint && (
            <div class="v-input__details">
              { props.hint }
            </div>
          ) }
        </div>
      )
    }
  },
})
