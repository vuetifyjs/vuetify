// Styles
import './VInput.sass'

// Components
import { VIcon } from '@/components/VIcon'

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

  setup (props, { attrs, slots }) {
    const { themeClasses } = useTheme(props)
    const { colorClasses, colorStyles, variantClasses } = useVariant(props, 'v-input')
    const { densityClasses } = useDensity(props, 'v-input')

    const uid = getUid()
    const id = computed(() => props.id || `input-${uid}`)
    const value = useProxiedModel(props, 'modelValue')

    return () => {
      const hasPrepend = (slots.prepend || props.prependIcon)
      const hasAppend = (slots.append || props.appendIcon)

      return (
        <div
          class={[
            'v-input',
            {
              'v-input--prepended': hasPrepend,
              'v-input--appended': hasAppend,
            },
            themeClasses.value,
            colorClasses.value,
            densityClasses.value,
            variantClasses.value,
          ]}
          style={[
            colorStyles.value,
          ]}
          { ...attrs }
        >
          <div class="v-input__control">
            { hasPrepend && (
              <div class="v-input__prepend">
                { slots.prepend
                  ? slots.prepend()
                  : (<VIcon icon={ props.prependIcon } />)
                }
              </div>
            ) }

            <div class="v-input__field">
              { slots.label
                ? slots.label({
                  label: props.label,
                  props: { for: id.value },
                })
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
                  onInput: (e: Event) => {
                    const el = e.target as HTMLInputElement

                    value.value = el.value
                  },
                },
              }) }
            </div>

            { hasAppend && (
              <div class="v-input__append">
                { slots.append
                  ? slots.append()
                  : (<VIcon icon={ props.appendIcon } />)
                }
              </div>
            ) }

            { props.variant === 'outlined' && (
              <div class="v-input__outline">
                <div class="v-input__outline__start" />

                <div class="v-input__outline__notch" />

                <div class="v-input__outline__end" />
              </div>
            )}
          </div>

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
