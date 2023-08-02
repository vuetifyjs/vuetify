// Styles
import './VOtpInput.sass'

// Components
import { makeVFieldProps, VField } from '@/components/VField/VField'
import { VOverlay } from '@/components/VOverlay/VOverlay'
import { VProgressCircular } from '@/components/VProgressCircular/VProgressCircular'

// Composables
import { provideDefaults } from '@/composables/defaults'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeFocusProps, useFocus } from '@/composables/focus'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref, watch } from 'vue'
import { focusChild, genericComponent, IN_BROWSER, only, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

// Types
export type VOtpInputSlots = {
  default: never
  loader: never
}

export const makeVOtpInputProps = propsFactory({
  autofocus: Boolean,
  divider: String,
  focusAll: Boolean,
  label: {
    type: String,
    default: '$vuetify.input.otp',
  },
  length: {
    type: [Number, String],
    default: 6,
  },
  modelValue: {
    type: [Number, String],
    default: undefined,
  },
  placeholder: String,
  type: {
    type: String as PropType<'text' | 'password' | 'number'>,
    default: 'text',
  },

  ...makeDimensionProps(),
  ...makeFocusProps(),
  ...only(makeVFieldProps({
    variant: 'outlined' as const,
  }), [
    'baseColor',
    'bgColor',
    'class',
    'color',
    'disabled',
    'error',
    'loading',
    'rounded',
    'style',
    'theme',
    'variant',
  ]),
}, 'VOtpInput')

export const VOtpInput = genericComponent<VOtpInputSlots>()({
  name: 'VOtpInput',

  props: makeVOtpInputProps(),

  emits: {
    finish: (val: string) => true,
    'update:focused': (val: boolean) => true,
    'update:modelValue': (val: string) => true,
  },

  setup (props, { emit, slots }) {
    const { dimensionStyles } = useDimension(props)
    const { isFocused, focus, blur } = useFocus(props)
    const model = useProxiedModel(
      props,
      'modelValue',
      '',
      val => String(val).split(''),
      val => val.join('')
    )
    const { t } = useLocale()

    const fields = computed(() => Array(Number(props.length)).fill(0))
    const focusIndex = ref(-1)
    const contentRef = ref<HTMLElement>()
    const inputRef = ref<HTMLInputElement[]>([])
    const current = computed(() => inputRef.value[focusIndex.value])

    function onInput () {
      const array = model.value.slice()
      const value = current.value.value

      array[focusIndex.value] = value

      model.value = array
    }

    function onKeydown (e: KeyboardEvent) {
      const array = model.value.slice()
      const index = focusIndex.value
      let target: 'next' | 'prev' | 'first' | 'last' | number | null = null

      if (e.key === 'ArrowLeft') {
        target = 'prev'
      } else if (e.key === 'ArrowRight') {
        target = 'next'
      } else if (e.key === 'Backspace') {
        if (focusIndex.value > 0) {
          target = 'prev'
        }
      } else if (e.key === 'Delete') {
        array[focusIndex.value] = ''

        model.value = array

        requestAnimationFrame(() => {
          inputRef.value[index].select()
        })
      } else if (props.type === 'number' && isNaN(parseInt(e.key))) {
        return
      } else if (focusIndex.value > model.value.length) {
        target = model.value.length + 1
      } else if (focusIndex.value + 1 !== Number(props.length)) {
        target = 'next'
      } else {
        requestAnimationFrame(() => current.value?.blur())

        return
      }

      requestAnimationFrame(() => {
        if (target != null) {
          focusChild(contentRef.value!, target)
        }
      })
    }

    function onPaste (index: number, e: ClipboardEvent) {
      e.preventDefault()
      e.stopPropagation()

      model.value = (e?.clipboardData?.getData('Text') ?? '').split('')

      inputRef.value?.[index].blur()
    }

    function reset () {
      model.value = []
    }

    function onFocus (e: FocusEvent, index: number) {
      focus()

      focusIndex.value = index
    }

    function onBlur () {
      blur()

      focusIndex.value = -1
    }

    provideDefaults({
      VField: {
        disabled: computed(() => props.disabled),
        error: computed(() => props.error),
        variant: computed(() => props.variant),
      },
    }, { scoped: true })

    watch(model, val => {
      if (val.length === props.length) emit('finish', val.join(''))
    }, { deep: true })

    watch(focusIndex, val => {
      if (val < 0) return

      IN_BROWSER && window.requestAnimationFrame(() => {
        inputRef.value[val].select()
      })
    })

    useRender(() => {
      return (
        <div
          class={[
            'v-otp-input',
            {
              'v-otp-input--divided': !!props.divider,
            },
            props.class,
          ]}
          style={[
            props.style,
          ]}
        >
          <div
            ref={ contentRef }
            class="v-otp-input__content"
            style={[
              dimensionStyles.value,
            ]}
          >
            { fields.value.map((_, i) => (
              <>
                { props.divider && i !== 0 && (
                  <span class="v-otp-input__divider">{ props.divider }</span>
                )}

                <VField
                  focused={ (isFocused.value && props.focusAll) || focusIndex.value === i }
                  key={ i }
                >
                  {{
                    ...slots,
                    default: () => {
                      return (
                        <input
                          ref={ val => inputRef.value[i] = val as HTMLInputElement }
                          aria-label={ t(props.label, i + 1) }
                          autofocus={ i === 0 && props.autofocus }
                          autocomplete="one-time-code"
                          class={[
                            'v-otp-input__field',
                          ]}
                          inputmode="text"
                          min={ props.type === 'number' ? 0 : undefined }
                          maxlength="1"
                          placeholder={ props.placeholder }
                          type={ props.type }
                          value={ model.value[i] }
                          onInput={ onInput }
                          onFocus={ e => onFocus(e, i) }
                          onBlur={ onBlur }
                          onKeydown={ onKeydown }
                          onPaste={ event => onPaste(i, event) }
                        />
                      )
                    },
                  }}
                </VField>
              </>
            ))}

            <VOverlay
              contained
              content-class="v-otp-input__loader"
              model-value={ !!props.loading }
              persistent
            >
              { slots.loader?.() ?? (
                <VProgressCircular
                  color={ typeof props.loading === 'boolean' ? undefined : props.loading }
                  indeterminate
                  size="24"
                  width="2"
                />
              )}
            </VOverlay>

            { slots.default?.() }
          </div>
        </div>
      )
    })

    return {
      blur: () => {
        inputRef.value?.some(input => input.blur())
      },
      focus: () => {
        inputRef.value?.[0].focus()
      },
      reset,
      isFocused,
    }
  },
})

export type VOtpInput = InstanceType<typeof VOtpInput>
