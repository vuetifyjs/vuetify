// Styles
import './VOtpInput.sass'

// Components
import { makeVFieldProps, VField } from '@/components/VField/VField'
import { VOverlay } from '@/components/VOverlay/VOverlay'
import { VProgressCircular } from '@/components/VProgressCircular/VProgressCircular'

// Composables
import { provideDefaults } from '@/composables/defaults'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeFocusProps, useFocus } from '@/composables/focus'
import { useIntersectionObserver } from '@/composables/intersectionObserver'
import { useLocale, useRtl } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useToggleScope } from '@/composables/toggleScope'

// Utilities
import { computed, effectScope, ref, toRef, watch, watchEffect } from 'vue'
import { filterInputAttrs, genericComponent, pick, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export type VOtpInputSlots = {
  default: never
  loader: never
}

const OtpInputPatterns = {
  numeric: /[0-9]/,
  alpha: /[a-zA-Z]/,
  alphanumeric: /[a-zA-Z0-9]/,
} as const

type OtpInputPattern = keyof typeof OtpInputPatterns

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
  masked: Boolean,
  modelValue: {
    type: [Number, String],
    default: undefined,
  },
  pattern: {
    type: [String, Object] as PropType<OtpInputPattern | RegExp>,
    default: undefined,
  },
  placeholder: String,
  type: {
    type: String as PropType<'text' | 'password' | 'number'>,
    default: 'number',
  },

  ...makeDensityProps(),
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
    finish: (_val: string) => true,
    'update:focused': (_val: boolean) => true,
    'update:modelValue': (_val: string) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const { densityClasses } = useDensity(props)
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
    const { isRtl } = useRtl()

    const length = computed(() => Number(props.length))
    const isMasked = computed(() => props.masked || props.type === 'password')
    const effectivePattern = computed(() => {
      if (props.pattern instanceof RegExp) return props.pattern
      if (props.pattern != null) return OtpInputPatterns[props.pattern as OtpInputPattern] ?? null
      if (props.type === 'number') return OtpInputPatterns.numeric
      return null
    })
    const inputRef = ref<HTMLInputElement>()

    const renderSelectionStart = ref<number | null>(null)
    const renderSelectionEnd = ref<number | null>(null)

    let prevSelection: [number | null, number | null, 'forward' | 'backward' | 'none' | null] = [null, null, null]

    // selectionchange is not in InputHTMLAttributes types
    watch(inputRef, (input, _, onCleanup) => {
      if (!input) return
      input.addEventListener('selectionchange', onSelectionChange)
      onCleanup(() => input.removeEventListener('selectionchange', onSelectionChange))
    }, { immediate: true })

    useToggleScope(() => props.autofocus, () => {
      const intersectScope = effectScope()
      intersectScope.run(() => {
        const { intersectionRef, isIntersecting } = useIntersectionObserver()
        watchEffect(() => {
          intersectionRef.value = inputRef.value
        })
        watch(isIntersecting, v => {
          if (!v) return
          intersectionRef.value?.focus()
          intersectScope.stop()
        })
      })
    })

    // Forces the selection to always cover at least 1 character
    function onSelectionChange () {
      const input = inputRef.value
      if (!input) {
        renderSelectionStart.value = null
        renderSelectionEnd.value = null
        return
      }

      const initialStart = input.selectionStart
      const initialEnd = input.selectionEnd
      const initialDirection = input.selectionDirection
      const inputValue = input.value
      const maxLength = input.maxLength

      let start = -1
      let end = -1
      let direction: 'forward' | 'backward' | 'none' | undefined

      if (inputValue.length !== 0 && initialStart !== null && initialEnd !== null) {
        const isSingleCaret = initialStart === initialEnd
        const isInsertMode = initialStart === inputValue.length && inputValue.length < maxLength

        if (isSingleCaret && !isInsertMode) {
          if (initialStart === 0) {
            start = 0
            end = 1
            direction = 'forward'
          } else if (initialStart === maxLength) {
            start = initialStart - 1
            end = initialStart
            direction = 'backward'
          } else if (maxLength > 1 && inputValue.length > 1) {
            let offset = 0
            if (prevSelection[0] !== null && prevSelection[1] !== null) {
              direction = initialStart < prevSelection[1] ? 'backward' : 'forward'
              const wasPreviouslyInserting = prevSelection[0] === prevSelection[1] && prevSelection[0] < maxLength
              if (direction === 'backward' && !wasPreviouslyInserting) {
                offset = -1
              }
            }
            start = offset + initialStart
            end = offset + initialStart + 1
          }

          if (start !== -1 && end !== -1) {
            input.setSelectionRange(start, end, direction)
          }
        }
      }

      const finalStart = start !== -1 ? start : initialStart
      const finalEnd = end !== -1 ? end : initialEnd
      renderSelectionStart.value = finalStart
      renderSelectionEnd.value = finalEnd
      prevSelection = [finalStart, finalEnd, direction ?? initialDirection]
    }

    const otpSlots = computed(() => {
      return Array.from({ length: length.value }, (_, i) => {
        const char = model.value[i] ?? null
        const displayChar = char !== null && isMasked.value ? '•' : char

        const isActive =
          isFocused.value &&
          renderSelectionStart.value !== null &&
          renderSelectionEnd.value !== null &&
          (
            (renderSelectionStart.value === renderSelectionEnd.value && i === renderSelectionStart.value) ||
            (i >= renderSelectionStart.value && i < renderSelectionEnd.value)
          )

        return {
          char: displayChar,
          placeholderChar: props.placeholder ?? null,
          isActive,
          hasFakeCaret: isActive && char === null,
        }
      })
    })

    function onInput (e: Event) {
      const target = e.target as HTMLInputElement
      let filtered = target.value
      if (effectivePattern.value) {
        filtered = filtered.split('').filter(c => effectivePattern.value!.test(c)).join('')
      }
      filtered = filtered.slice(0, length.value)
      target.value = filtered
      model.value = filtered.split('')
    }

    function onFocus () {
      focus()
      const input = inputRef.value
      if (!input) return
      const start = Math.min(input.value.length, length.value - 1)
      const end = input.value.length
      input.setSelectionRange(start, end)
      renderSelectionStart.value = start
      renderSelectionEnd.value = end
    }

    function onBlur () {
      blur()
      renderSelectionStart.value = null
      renderSelectionEnd.value = null
    }

    // Shared logic for word/line bulk deletes used inside onKeydown and onBeforeinput
    function applyBulkDelete (isBackward: boolean) {
      const input = inputRef.value!
      const newVal = isBackward
        ? input.value.slice(renderSelectionEnd.value ?? input.value.length)
        : input.value.slice(0, renderSelectionStart.value ?? 0)

      input.value = newVal
      model.value = newVal.split('')

      let newStart: number
      let newEnd: number
      if (newVal.length === 0) {
        newStart = 0
        newEnd = 0
      } else if (isBackward) {
        newStart = 0
        newEnd = 1
      } else {
        newStart = newVal.length
        newEnd = newVal.length
      }
      input.setSelectionRange(newStart, newEnd)
      renderSelectionStart.value = newStart
      renderSelectionEnd.value = newEnd
    }

    function onKeydown (e: KeyboardEvent) {
      // Intercept Bulk Delete
      // Since default browser behavior on selection is to trigger DeleteContentForward/Backward whatever the key pressed
      if (e.key !== 'Backspace' && e.key !== 'Delete') return
      if (!e.metaKey && !e.ctrlKey && !e.altKey) return
      e.preventDefault()
      applyBulkDelete(e.key === 'Backspace')
    }

    function onBeforeinput (e: InputEvent) {
      if (e.inputType === 'insertText' && e.data && effectivePattern.value && !effectivePattern.value.test(e.data)) {
        e.preventDefault()
        return
      }

      // Keep selection at slot i after forward deletion
      if (e.inputType === 'deleteContentForward') {
        e.preventDefault()
        const input = inputRef.value!
        const start = renderSelectionStart.value ?? 0
        const end = renderSelectionEnd.value ?? input.value.length
        const newVal = input.value.slice(0, start) + input.value.slice(end)
        input.value = newVal
        model.value = newVal.split('')
        const newEnd = Math.min(start + 1, newVal.length)
        input.setSelectionRange(start, newEnd)
        renderSelectionStart.value = start
        renderSelectionEnd.value = newEnd
        return
      }

      // Since some IME keyboards don't fire proper key events, we need to check the input type.
      // This can be unreliable since browsers always trigger DeleteContentForward/Backward,
      // but some keyboards can force their own input type.
      const isBackward = [
        'deleteWordBackward',
        'deleteSoftLineBackward',
        'deleteHardLineBackward',
      ].includes(e.inputType)
      const isForward = [
        'deleteWordForward',
        'deleteSoftLineForward',
        'deleteHardLineForward',
      ].includes(e.inputType)
      if (!isBackward && !isForward) return
      e.preventDefault()
      applyBulkDelete(isBackward)
    }

    function onPaste (e: ClipboardEvent) {
      e.preventDefault()
      const input = inputRef.value!
      const text = e.clipboardData?.getData('text/plain').trim() ?? ''
      const filtered = effectivePattern.value
        ? text.split('').filter(c => effectivePattern.value!.test(c)).join('')
        : text

      const start = renderSelectionStart.value ?? 0
      const end = renderSelectionEnd.value ?? input.value.length
      const newVal = (input.value.slice(0, start) + filtered + input.value.slice(end)).slice(0, length.value)

      model.value = newVal.split('')
      input.value = newVal

      const insertEnd = start + filtered.length
      const newPos = Math.min(insertEnd, length.value - 1)
      const newEnd = Math.min(insertEnd, newVal.length)
      input.setSelectionRange(newPos, newEnd)
      renderSelectionStart.value = newPos
      renderSelectionEnd.value = newEnd
    }

    function reset () {
      model.value = []
    }

    provideDefaults({
      VField: {
        color: toRef(() => props.color),
        bgColor: toRef(() => props.color),
        baseColor: toRef(() => props.baseColor),
        disabled: toRef(() => props.disabled),
        error: toRef(() => props.error),
        variant: toRef(() => props.variant),
        rounded: toRef(() => props.rounded),
      },
    }, { scoped: true })

    watch(model, val => {
      if (val.length === length.value) {
        emit('finish', val.join(''))
      }
    }, { deep: true })

    useRender(() => {
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)

      return (
        <div
          class={[
            'v-otp-input',
            {
              'v-otp-input--divided': !!props.divider,
            },
            densityClasses.value,
            props.class,
          ]}
          style={[props.style]}
          { ...rootAttrs }
        >
          <div
            class="v-otp-input__content"
            style={[dimensionStyles.value]}
            dir={ isRtl.value ? 'rtl' : 'ltr' }
          >
            { otpSlots.value.map((slot, i) => (
              <>
                { props.divider && i !== 0 && (
                  <span class="v-otp-input__divider">{ props.divider }</span>
                )}

                <VField
                  focused={ (isFocused.value && props.focusAll) || slot.isActive }
                  key={ i }
                >
                  {{
                    ...slots,
                    loader: undefined,
                    default: () => (
                      <div class="v-otp-input__field">
                        { slot.hasFakeCaret ? (
                          <span class="v-otp-input__caret" />
                        ) : (
                          <span class={ !slot.char ? 'v-otp-input__placeholder' : undefined }>
                            { slot.char ?? slot.placeholderChar ?? '' }
                          </span>
                        )}
                      </div>
                    ),
                  }}
                </VField>
              </>
            ))}

            <div class="v-otp-input__input-wrapper">
              <input
                ref={ inputRef }
                class="v-otp-input__input"
                type="text"
                inputmode={ effectivePattern.value === OtpInputPatterns.numeric ? 'numeric' : 'text' }
                dir={ isRtl.value ? 'rtl' : 'ltr' }
                autocomplete="one-time-code"
                maxlength={ length.value }
                disabled={ props.disabled }
                aria-label={ t(props.label, 1) }
                value={ model.value.join('') }
                { ...inputAttrs }
                onInput={ onInput }
                onKeydown={ onKeydown }
                onBeforeinput={ onBeforeinput }
                onFocus={ onFocus }
                onBlur={ onBlur }
                onPaste={ onPaste }
              />
            </div>

            <VOverlay
              contained
              contentClass="v-otp-input__loader"
              modelValue={ !!props.loading }
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
        inputRef.value?.blur()
      },
      focus: () => {
        inputRef.value?.focus()
      },
      reset,
      isFocused,
    }
  },
})

export type VOtpInput = InstanceType<typeof VOtpInput>
