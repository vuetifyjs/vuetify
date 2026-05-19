// Styles
import './VOtpInput.sass'

// Components
import { VOtpField } from './VOtpField'
import { VOtpGroup } from './VOtpGroup'
import { VOtpSeparator } from './VOtpSeparator'
import { makeVFieldProps } from '@/components/VField/VField'
import { VOverlay } from '@/components/VOverlay/VOverlay'
import { VProgressCircular } from '@/components/VProgressCircular/VProgressCircular'

// Composables
import { useOtpInput } from './useOtpInput'
import { provideDefaults } from '@/composables/defaults'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeFocusProps, useFocus } from '@/composables/focus'
import { useIntersectionObserver } from '@/composables/intersectionObserver'
import { useLocale, useRtl } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useToggleScope } from '@/composables/toggleScope'

// Utilities
import { effectScope, provide, ref, toRef, watch, watchEffect } from 'vue'
import { filterInputAttrs, genericComponent, pick, propsFactory, useRender } from '@/util'

// Types
import type { InjectionKey, PropType, Ref } from 'vue'
import type { OtpInputPattern, OtpSlotData } from './useOtpInput'

export type { OtpSlotData, OtpInputPattern } from './useOtpInput'

export interface VOtpInputContext {
  otpSlots: Readonly<Ref<OtpSlotData[]>>
  isFocused: Ref<boolean>
  focusAll: Ref<boolean>
  divider: Ref<string | undefined>
  merged: Ref<boolean>
  focusAt: (index: number) => void
}

export const VOtpInputSymbol: InjectionKey<VOtpInputContext> = Symbol.for('vuetify:v-otp-input')

export type VOtpInputSlots = {
  default: never
  fields: never
  divider: { index: number }
  loader: never
}

export const makeVOtpInputProps = propsFactory({
  autofocus: Boolean,
  divider: String,
  focusAll: Boolean,
  merged: Boolean,
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
    const { isFocused } = useFocus(props)
    const { t } = useLocale()
    const { isRtl } = useRtl()

    const model = useProxiedModel(props, 'modelValue', '', val => val == null ? '' : String(val))
    const inputRef = ref<HTMLInputElement>()
    const length = toRef(() => Number(props.length))
    let focusAtPending = false

    const otp = useOtpInput({
      value: model,
      length,
      pattern: () => props.pattern,
      type: () => props.type,
      masked: () => props.masked,
      placeholder: () => props.placeholder,
      isFocused,
    })

    function applySelection () {
      const input = inputRef.value
      const sel = otp.selection.value
      if (!input || !sel) return
      input.setSelectionRange(sel.start, sel.end, sel.direction)
    }

    function syncDOM () {
      const input = inputRef.value
      if (!input) return
      if (input.value !== otp.value.value) input.value = otp.value.value
      applySelection()
    }

    function onSelectionChange () {
      const input = inputRef.value
      if (!input) {
        otp.clearSelection()
        return
      }
      const result = otp.syncSelection({
        value: input.value,
        selectionStart: input.selectionStart,
        selectionEnd: input.selectionEnd,
        selectionDirection: input.selectionDirection,
        maxLength: input.maxLength,
      })
      if (!result) return
      if (input.selectionStart !== result.start || input.selectionEnd !== result.end) {
        input.setSelectionRange(result.start, result.end, result.direction)
      }
    }

    function onInput (e: Event) {
      const ev = e as InputEvent
      const target = e.target as HTMLInputElement
      const composing = ev.isComposing || otp.isComposing.value

      if (composing) {
        if (otp.isImeText(target.value)) return
        if (otp.isComposing.value) {
          otp.endComposition()
          onSelectionChange()
        }
      }

      const next = otp.setValue(target.value)
      if (target.value !== next) target.value = next
    }

    function onCompositionstart () {
      otp.startComposition()
    }

    function onCompositionupdate (e: CompositionEvent) {
      otp.updateComposition(e.data ?? '')
    }

    function onCompositionend (e: CompositionEvent) {
      otp.endComposition()
      onInput(e)
    }

    function onFocus () {
      isFocused.value = true
      if (focusAtPending) return
      if (!inputRef.value) return
      otp.selectAtEnd()
      applySelection()
    }

    function onBlur () {
      isFocused.value = false
      otp.clearSelection()
    }

    function onKeydown (e: KeyboardEvent) {
      if (e.key !== 'Backspace' && e.key !== 'Delete') return
      if (!e.metaKey && !e.ctrlKey && !e.altKey) return
      e.preventDefault()
      otp.bulkDelete(e.key === 'Backspace')
      syncDOM()
    }

    function onBeforeinput (e: InputEvent) {
      if (e.inputType === 'insertText' && e.data && otp.effectivePattern.value && !otp.effectivePattern.value.test(e.data)) {
        e.preventDefault()
        return
      }

      if (e.inputType === 'deleteContentForward') {
        e.preventDefault()
        const input = inputRef.value
        if (!input) return
        const sel = otp.selection.value
        const start = sel?.start ?? 0
        const end = sel?.end ?? input.value.length
        otp.deleteRange(start, end)
        syncDOM()
        return
      }

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
      otp.bulkDelete(isBackward)
      syncDOM()
    }

    function onPaste (e: ClipboardEvent) {
      e.preventDefault()
      const input = inputRef.value
      if (!input) return
      const text = e.clipboardData?.getData('text/plain').trim() ?? ''
      const sel = otp.selection.value
      otp.insert(text, {
        start: sel?.start ?? 0,
        end: sel?.end ?? input.value.length,
      })
      syncDOM()
    }

    function focusAt (index: number) {
      const input = inputRef.value
      if (!input) return
      focusAtPending = true
      input.focus()
      focusAtPending = false
      otp.selectSlot(index)
      applySelection()
    }

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

    watch(model, val => {
      if (otp.isComposing.value) return
      if (val.length === length.value) emit('finish', val)
    })

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

    provide(VOtpInputSymbol, {
      otpSlots: otp.slots,
      isFocused,
      focusAll: toRef(() => props.focusAll),
      divider: toRef(() => props.divider),
      merged: toRef(() => props.merged),
      focusAt,
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
            { slots.fields ? slots.fields() : props.merged
              ? (
                <VOtpGroup merged>
                  { Array.from({ length: length.value }, (_, i) => (
                    <VOtpField index={ i } key={ i } />
                  ))}
                </VOtpGroup>
              )
              : Array.from({ length: length.value }, (_, i) => (
                <>
                  { (props.divider || slots.divider) && i !== 0 && (
                    <VOtpSeparator key={ `d-${i}` }>
                      { slots.divider?.({ index: i - 1 }) ?? props.divider }
                    </VOtpSeparator>
                  )}
                  <VOtpField index={ i } key={ i } />
                </>
              ))
            }

            <input
              ref={ inputRef }
              class="v-otp-input__input"
              type="text"
              inputmode={ otp.inputMode.value }
              dir={ isRtl.value ? 'rtl' : 'ltr' }
              autocomplete="one-time-code"
              autocorrect="off"
              autocapitalize="off"
              spellcheck={ false }
              maxlength={ length.value }
              disabled={ props.disabled }
              aria-label={ t(props.label) }
              value={ model.value }
              { ...inputAttrs }
              onInput={ onInput }
              onKeydown={ onKeydown }
              onBeforeinput={ onBeforeinput }
              onFocus={ onFocus }
              onBlur={ onBlur }
              onPaste={ onPaste }
              onCompositionstart={ onCompositionstart }
              onCompositionupdate={ onCompositionupdate }
              onCompositionend={ onCompositionend }
            />

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
      blur: () => { inputRef.value?.blur() },
      focus: () => { inputRef.value?.focus() },
      reset: otp.reset,
      isFocused,
    }
  },
})

export type VOtpInput = InstanceType<typeof VOtpInput>

export { useOtpInput, OtpInputPatterns } from './useOtpInput'
export type { OtpInputContext, OtpInputOptions } from './useOtpInput'
