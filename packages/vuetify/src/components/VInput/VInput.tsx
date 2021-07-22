// Styles
import './VInput.sass'

// Components
import { VIcon } from '@/components/VIcon'
import VInputLabel from './VInputLabel'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref } from 'vue'
import { convertToUnit, defineComponent, getUid } from '@/util'

// Types
import type { ComponentPublicInstance, PropType } from 'vue'
import { useSsrBoot } from '@/composables/ssrBoot'

export default defineComponent({
  name: 'VInput',

  inheritAttrs: false,

  props: {
    appendIcon: String,
    appendOuterIcon: String,
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
    prependOuterIcon: String,
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
    const value = useProxiedModel(props, 'modelValue')
    const uid = getUid()
    const { ssrBootStyles } = useSsrBoot()

    const labelRef = ref<ComponentPublicInstance>()
    const controlRef = ref<HTMLElement>()
    const fieldRef = ref<HTMLElement>()
    const isDirty = computed(() => (value.value != null && value.value !== ''))
    const isFocused = ref(false)
    const id = computed(() => props.id || `input-${uid}`)

    return () => {
      const isOutlined = props.variant === 'outlined'
      const hasPrepend = (slots.prepend || props.prependIcon)
      const hasPrependOuter = (slots.prependOuter || props.prependOuterIcon)
      const hasAppend = (slots.append || props.appendIcon)
      const hasAppendOuter = (slots.appendOuter || props.appendOuterIcon)
      const hasState = isFocused.value || isDirty.value
      const labelWidth = labelRef.value?.$el?.scrollWidth * (hasState ? 0.75 : 1) + 8
      const prependWidth = (fieldRef.value?.offsetLeft || 16) + (hasPrepend ? 6 : 0)
      const controlRefHeight = controlRef.value?.clientHeight ?? 0

      let translateX = 0
      let translateY = 0

      if (props.variant === 'outlined') {
        translateX = -prependWidth + 16
        translateY = controlRefHeight / -2 + 4
      } else if (props.variant !== 'contained') {
        translateY = controlRefHeight / -6
      }

      if (props.variant === 'single-line') {
        translateX = -prependWidth + 16
        translateY -= 8
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
          { hasPrependOuter && (
            <div
              class="v-input__prepend-outer"
            >
              { slots.prependOuter
                ? slots.prependOuter()
                : (<VIcon icon={ props.prependOuterIcon } />)
              }
            </div>
          ) }

          <div
            ref={ controlRef }
            class="v-input__control"
          >
            { hasPrepend && (
              <div
                class="v-input__prepend"
              >
                { slots.prepend
                  ? slots.prepend()
                  : (<VIcon icon={ props.prependIcon } />)
                }
              </div>
            ) }

            <div class="v-input__field" ref={ fieldRef }>
              { slots.label
                ? slots.label({
                  label: props.label,
                  props: { for: id.value },
                })
                : (
                  <VInputLabel
                    ref={ labelRef }
                    for={ id.value }
                    active={ hasState }
                    text={ props.label }
                    translateX={ translateX }
                    translateY={ translateY }
                    style={ ssrBootStyles.value }
                  />
                )
              }
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
              { isOutlined && (
                <>
                  <div
                    class="v-input__outline__start"
                    style={{
                      width: convertToUnit((hasState ? 0 : labelWidth / 2) + 12),
                    }}
                  />

                  <div
                    class="v-input__outline__notch"
                    style={{ width: convertToUnit(hasState ? labelWidth : 0) }}
                  />

                  <div class="v-input__outline__end" />
                </>
              ) }
            </div>
          </div>

          { hasAppendOuter && (
            <div
              class="v-input__append-outer"
            >
              { slots.appendOuter
                ? slots.appendOuter()
                : (<VIcon icon={ props.appendOuterIcon } />)
              }
            </div>
          ) }

          { slots.messages && (
            <div class="v-input__details">
              { slots.messages() }
            </div>
          ) }
        </div>
      )
    }
  },
})
