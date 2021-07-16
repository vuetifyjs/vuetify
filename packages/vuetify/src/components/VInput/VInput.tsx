// Styles
import './VInput.sass'

// Components
import { VIcon } from '@/components/VIcon'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref } from 'vue'
import { convertToUnit, defineComponent, getUid } from '@/util'

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
    variant: {
      type: String,
      default: 'filled',
      // required: true,
    },

    ...makeThemeProps(),
    ...makeDensityProps(),
  },

  setup (props, { attrs, slots }) {
    const { themeClasses } = useTheme(props)
    const { densityClasses } = useDensity(props, 'v-input')

    const uid = getUid()
    const id = computed(() => props.id || `input-${uid}`)
    const value = useProxiedModel(props, 'modelValue')
    const prependRef = ref<HTMLElement>()
    const labelRef = ref<HTMLElement>()
    const isFocused = ref(false)
    const left = ref(16)
    const isDirty = computed(() => (value.value != null && value.value !== ''))

    return () => {
      const hasPrepend = (slots.prepend || props.prependIcon)
      const hasAppend = (slots.append || props.appendIcon)
      const labelWidth = labelRef.value ? labelRef.value?.scrollWidth - 5 : undefined
      const isFloating = isFocused.value || isDirty.value

      if (props.variant === 'outlined') {
        left.value = isFloating ? 4 : (prependRef.value?.scrollWidth ?? 16) - 12
      }

      return (
        <div
          class={[
            'v-input',
            {
              'v-input--prepended': hasPrepend,
              'v-input--appended': hasAppend,
              'v-input--dirty': isDirty.value,
              'v-input--focused': isFocused.value,
              [`v-input--variant-${props.variant}`]: true,
            },
            themeClasses.value,
            densityClasses.value,
          ]}
          { ...attrs }
        >
          <div class="v-input__control">
            { hasPrepend && (
              <div
                class="v-input__prepend"
                ref={ prependRef }
              >
                { slots.prepend
                  ? slots.prepend()
                  : (<VIcon icon={ props.prependIcon } />)
                }
              </div>
            ) }

            <div class="v-input__field">
              { slots.default?.({
                uid,
                props: {
                  id: id.value,
                  value: value.value,
                  onFocus: () => (isFocused.value = true),
                  onBlur: () => (isFocused.value = false),
                  onInput: (e: Event) => {
                    const el = e.target as HTMLInputElement

                    value.value = el.value
                  },
                  onChange: (e: Event) => {
                    const el = e.target as HTMLInputElement

                    if (value.value === el.value) return

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

            <div class="v-input__outline">
              <div class="v-input__outline__start" />

              <div
                class="v-input__outline__notch"
                style={{ width: convertToUnit(labelWidth) }}
              >
                { slots.label
                  ? slots.label({
                    label: props.label,
                    props: { for: id.value },
                  })
                  : (
                    <label
                      ref={ labelRef }
                      for={ id.value }
                      class="v-label"
                      style={{
                        left: convertToUnit(left.value),
                      }}
                    >
                      { props.label }
                    </label>
                  )
                }
              </div>

              <div class="v-input__outline__end" />
            </div>
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
