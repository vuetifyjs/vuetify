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
import { cloneVNode, computed, ref, watch } from 'vue'
import { convertToUnit, defineComponent, getUid, roundEven } from '@/util'

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
    const { ssrBootStyles, isBooted } = useSsrBoot()

    const labelRef = ref<ComponentPublicInstance>()
    const controlRef = ref<HTMLElement>()
    const fieldRef = ref<HTMLElement>()
    const isDirty = computed(() => (value.value != null && value.value !== ''))
    const isFocused = ref(false)
    const id = computed(() => props.id || `input-${uid}`)
    const hasState = computed(() => isFocused.value || isDirty.value)

    // const labelWidth = ref(0)
    // watch(() => [hasState.value, props.density, isBooted.value, props.variant], () => {
    //   if (hasState.value && props.variant === 'outlined') {
    //     console.log(labelRef.value?.$el?.scrollWidth)
    //     labelWidth.value = labelRef.value?.$el?.scrollWidth * 0.75 + 8
    //   }
    // }, { flush: 'post', immediate: true })

    // const hasPrepend = computed(() => slots.prepend || props.prependIcon)
    // const labelOffset = ref(0)
    // watch(() => [hasState.value, props.density, isBooted.value, props.variant], () => {
    //   if (hasState.value && ['outlined', 'single-line'].includes(props.variant)) {
    //     const fieldBox = fieldRef.value!.getBoundingClientRect()
    //     const controlBox = controlRef.value!.getBoundingClientRect()
    //
    //     labelOffset.value = roundEven(controlBox.left - fieldBox.left + 12)
    //   }
    // }, { flush: 'post', immediate: true })

    return () => {
      const isOutlined = props.variant === 'outlined'
      const hasPrepend = (slots.prepend || props.prependIcon)
      const hasPrependOuter = (slots.prependOuter || props.prependOuterIcon)
      const hasAppend = (slots.append || props.appendIcon)
      const hasAppendOuter = (slots.appendOuter || props.appendOuterIcon)

      const label = (
        <VInputLabel
          ref={ labelRef }
          for={ id.value }
          style={ ssrBootStyles.value }
        >
          { slots.label
            ? slots.label({
              label: props.label,
              props: { for: id.value },
            })
            : props.label
          }
        </VInputLabel>
      )

      return (
        <div
          class={[
            'v-input',
            {
              'v-input--prepended': hasPrepend,
              'v-input--appended': hasAppend,
              'v-input--dirty': hasState.value,
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
              { label }
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
                  <div class="v-input__outline__start" />

                  <div class="v-input__outline__notch">
                    {
                      cloneVNode(label, {
                        ariaHidden: true,
                        active: false,
                        for: null,
                      })
                    }
                  </div>

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
