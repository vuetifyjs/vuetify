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
import { computed, nextTick, ref, watch } from 'vue'
import { filterInputAttrs, focusChild, genericComponent, pick, propsFactory, useRender } from '@/util'

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
    default: 'number',
  },

  ...makeDimensionProps(),
  ...makeFocusProps(),
  ...pick(makeVFieldProps({
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

  setup (props, { attrs, emit, slots }) {
    const { dimensionStyles } = useDimension(props)
    const { isFocused, focus, blur } = useFocus(props)
    const model = useProxiedModel(
      props,
      'modelValue',
      '',
      val => val == null ? [] : String(val).split(''),
      val => val.join('')
    )
    const { t } = useLocale()

    const length = computed(() => Number(props.length))
    const fields = computed(() => Array(length.value).fill(0))
    const focusIndex = ref(-1)
    const contentRef = ref<HTMLElement>()
    const inputRef = ref<HTMLInputElement[]>([])
    const current = computed(() => inputRef.value[focusIndex.value])

    function onInput () {
      // The maxlength attribute doesn't work for the number type input, so the text type is used.
      // The following logic simulates the behavior of a number input.
      if (isValidNumber(current.value.value)) {
        current.value.value = ''
        return
      }

      const array = model.value.slice()
      const value = current.value.value

      array[focusIndex.value] = value

      let target: any = null

      if (focusIndex.value > model.value.length) {
        target = model.value.length + 1
      } else if (focusIndex.value + 1 !== length.value) {
        target = 'next'
      }

      model.value = array

      if (target) focusChild(contentRef.value!, target)
    }

    function onKeydown (e: KeyboardEvent) {
      const array = model.value.slice()
      const index = focusIndex.value
      let target: 'next' | 'prev' | 'first' | 'last' | number | null = null

      if (![
        'ArrowLeft',
        'ArrowRight',
        'Backspace',
        'Delete',
      ].includes(e.key)) return

      e.preventDefault()

      if (e.key === 'ArrowLeft') {
        target = 'prev'
      } else if (e.key === 'ArrowRight') {
        target = 'next'
      } else if (['Backspace', 'Delete'].includes(e.key)) {
        array[focusIndex.value] = ''

        model.value = array

        if (focusIndex.value > 0 && e.key === 'Backspace') {
          target = 'prev'
        } else {
          requestAnimationFrame(() => {
            inputRef.value[index]?.select()
          })
        }
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

      const clipboardText = e?.clipboardData?.getData('Text').slice(0, length.value) ?? ''

      if (isValidNumber(clipboardText)) return

      model.value = clipboardText.split('')

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

    function isValidNumber (value: string) {
      return props.type === 'number' && /[^0-9]/g.test(value)
    }

    provideDefaults({
      VField: {
        color: computed(() => props.color),
        bgColor: computed(() => props.color),
        baseColor: computed(() => props.baseColor),
        disabled: computed(() => props.disabled),
        error: computed(() => props.error),
        variant: computed(() => props.variant),
      },
    }, { scoped: true })

    watch(model, val => {
      if (val.length === length.value) emit('finish', val.join(''))
    }, { deep: true })

    watch(focusIndex, val => {
      if (val < 0) return

      nextTick(() => {
        inputRef.value[val]?.select()
      })
    })

    useRender(() => {
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)

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
          { ...rootAttrs }
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
                    loader: undefined,
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
                          disabled={ props.disabled }
                          inputmode={ props.type === 'number' ? 'numeric' : 'text' }
                          min={ props.type === 'number' ? 0 : undefined }
                          maxlength={ i === 0 ? length.value : '1' }
                          placeholder={ props.placeholder }
                          type={ props.type === 'number' ? 'text' : props.type }
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

            <input
              class="v-otp-input-input"
              type="hidden"
              { ...inputAttrs }
              value={ model.value.join('') }
            />

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
