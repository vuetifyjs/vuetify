// Styles
import './VTextarea.sass'
import '../VTextField/VTextField.sass'

// Components
import { VCounter } from '@/components/VCounter/VCounter'
import { VField } from '@/components/VField'
import { makeVFieldProps } from '@/components/VField/VField'
import { makeVInputProps, VInput } from '@/components/VInput/VInput'

// Composables
import { useFocus } from '@/composables/focus'
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'

// Directives
import Intersect from '@/directives/intersect'

// Utilities
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch, watchEffect } from 'vue'
import { callEvent, clamp, convertToUnit, filterInputAttrs, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VCounterSlot } from '@/components/VCounter/VCounter'
import type { VFieldSlots } from '@/components/VField/VField'
import type { VInputSlots } from '@/components/VInput/VInput'

export const makeVTextareaProps = propsFactory({
  autoGrow: Boolean,
  autofocus: Boolean,
  counter: [Boolean, Number, String] as PropType<true | number | string>,
  counterValue: Function as PropType<(value: any) => number>,
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  noResize: Boolean,
  rows: {
    type: [Number, String],
    default: 5,
    validator: (v: any) => !isNaN(parseFloat(v)),
  },
  maxRows: {
    type: [Number, String],
    validator: (v: any) => !isNaN(parseFloat(v)),
  },
  suffix: String,
  modelModifiers: Object as PropType<Record<string, boolean>>,

  ...makeVInputProps(),
  ...makeVFieldProps(),
}, 'VTextarea')

type VTextareaSlots = Omit<VInputSlots & VFieldSlots, 'default'> & {
  counter: VCounterSlot
}

export const VTextarea = genericComponent<VTextareaSlots>()({
  name: 'VTextarea',

  directives: { Intersect },

  inheritAttrs: false,

  props: makeVTextareaProps(),

  emits: {
    'click:control': (e: MouseEvent) => true,
    'mousedown:control': (e: MouseEvent) => true,
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (val: string) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const { isFocused, focus, blur } = useFocus(props)
    const counterValue = computed(() => {
      return typeof props.counterValue === 'function'
        ? props.counterValue(model.value)
        : (model.value || '').toString().length
    })
    const max = computed(() => {
      if (attrs.maxlength) return attrs.maxlength as string | number

      if (
        !props.counter ||
        (typeof props.counter !== 'number' &&
        typeof props.counter !== 'string')
      ) return undefined

      return props.counter
    })

    function onIntersect (
      isIntersecting: boolean,
      entries: IntersectionObserverEntry[]
    ) {
      if (!props.autofocus || !isIntersecting) return

      (entries[0].target as HTMLInputElement)?.focus?.()
    }

    const vInputRef = ref<VInput>()
    const vFieldRef = ref<VInput>()
    const controlHeight = shallowRef('')
    const textareaRef = ref<HTMLInputElement>()
    const isActive = computed(() => (
      props.persistentPlaceholder ||
      isFocused.value ||
      props.active
    ))

    function onFocus () {
      if (textareaRef.value !== document.activeElement) {
        textareaRef.value?.focus()
      }

      if (!isFocused.value) focus()
    }
    function onControlClick (e: MouseEvent) {
      onFocus()

      emit('click:control', e)
    }
    function onControlMousedown (e: MouseEvent) {
      emit('mousedown:control', e)
    }
    function onClear (e: MouseEvent) {
      e.stopPropagation()

      onFocus()

      nextTick(() => {
        model.value = ''

        callEvent(props['onClick:clear'], e)
      })
    }
    function onInput (e: Event) {
      const el = e.target as HTMLTextAreaElement
      model.value = el.value
      if (props.modelModifiers?.trim) {
        const caretPosition = [el.selectionStart, el.selectionEnd]
        nextTick(() => {
          el.selectionStart = caretPosition[0]
          el.selectionEnd = caretPosition[1]
        })
      }
    }

    const sizerRef = ref<HTMLTextAreaElement>()
    const rows = ref(Number(props.rows))
    const isPlainOrUnderlined = computed(() => ['plain', 'underlined'].includes(props.variant))
    watchEffect(() => {
      if (!props.autoGrow) rows.value = Number(props.rows)
    })
    function calculateInputHeight () {
      if (!props.autoGrow) return

      nextTick(() => {
        if (!sizerRef.value || !vFieldRef.value) return

        const style = getComputedStyle(sizerRef.value)
        const fieldStyle = getComputedStyle(vFieldRef.value.$el)

        const padding = parseFloat(style.getPropertyValue('--v-field-padding-top')) +
          parseFloat(style.getPropertyValue('--v-input-padding-top')) +
          parseFloat(style.getPropertyValue('--v-field-padding-bottom'))

        const height = sizerRef.value.scrollHeight
        const lineHeight = parseFloat(style.lineHeight)
        const minHeight = Math.max(
          parseFloat(props.rows) * lineHeight + padding,
          parseFloat(fieldStyle.getPropertyValue('--v-input-control-height'))
        )
        const maxHeight = parseFloat(props.maxRows!) * lineHeight + padding || Infinity
        const newHeight = clamp(height ?? 0, minHeight, maxHeight)
        rows.value = Math.floor((newHeight - padding) / lineHeight)

        controlHeight.value = convertToUnit(newHeight)
      })
    }

    onMounted(calculateInputHeight)
    watch(model, calculateInputHeight)
    watch(() => props.rows, calculateInputHeight)
    watch(() => props.maxRows, calculateInputHeight)
    watch(() => props.density, calculateInputHeight)

    let observer: ResizeObserver | undefined
    watch(sizerRef, val => {
      if (val) {
        observer = new ResizeObserver(calculateInputHeight)
        observer.observe(sizerRef.value!)
      } else {
        observer?.disconnect()
      }
    })
    onBeforeUnmount(() => {
      observer?.disconnect()
    })

    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue)
      const hasDetails = !!(hasCounter || slots.details)
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
      const { modelValue: _, ...inputProps } = VInput.filterProps(props)
      const fieldProps = VField.filterProps(props)

      return (
        <VInput
          ref={ vInputRef }
          v-model={ model.value }
          class={[
            'v-textarea v-text-field',
            {
              'v-textarea--prefixed': props.prefix,
              'v-textarea--suffixed': props.suffix,
              'v-text-field--prefixed': props.prefix,
              'v-text-field--suffixed': props.suffix,
              'v-textarea--auto-grow': props.autoGrow,
              'v-textarea--no-resize': props.noResize || props.autoGrow,
              'v-input--plain-underlined': isPlainOrUnderlined.value,
            },
            props.class,
          ]}
          style={ props.style }
          { ...rootAttrs }
          { ...inputProps }
          centerAffix={ rows.value === 1 && !isPlainOrUnderlined.value }
          focused={ isFocused.value }
        >
          {{
            ...slots,
            default: ({
              id,
              isDisabled,
              isDirty,
              isReadonly,
              isValid,
            }) => (
              <VField
                ref={ vFieldRef }
                style={{
                  '--v-textarea-control-height': controlHeight.value,
                }}
                onClick={ onControlClick }
                onMousedown={ onControlMousedown }
                onClick:clear={ onClear }
                onClick:prependInner={ props['onClick:prependInner'] }
                onClick:appendInner={ props['onClick:appendInner'] }
                { ...fieldProps }
                id={ id.value }
                active={ isActive.value || isDirty.value }
                centerAffix={ rows.value === 1 && !isPlainOrUnderlined.value }
                dirty={ isDirty.value || props.dirty }
                disabled={ isDisabled.value }
                focused={ isFocused.value }
                error={ isValid.value === false }
              >
                {{
                  ...slots,
                  default: ({
                    props: { class: fieldClass, ...slotProps },
                  }) => (
                    <>
                      { props.prefix && (
                        <span class="v-text-field__prefix">
                          { props.prefix }
                        </span>
                      )}

                      <textarea
                        ref={ textareaRef }
                        class={ fieldClass }
                        value={ model.value }
                        onInput={ onInput }
                        v-intersect={[{
                          handler: onIntersect,
                        }, null, ['once']]}
                        autofocus={ props.autofocus }
                        readonly={ isReadonly.value }
                        disabled={ isDisabled.value }
                        placeholder={ props.placeholder }
                        rows={ props.rows }
                        name={ props.name }
                        onFocus={ onFocus }
                        onBlur={ blur }
                        { ...slotProps }
                        { ...inputAttrs }
                      />

                      { props.autoGrow && (
                        <textarea
                          class={[
                            fieldClass,
                            'v-textarea__sizer',
                          ]}
                          id={ `${slotProps.id}-sizer` }
                          v-model={ model.value }
                          ref={ sizerRef }
                          readonly
                          aria-hidden="true"
                        />
                      )}

                      { props.suffix && (
                        <span class="v-text-field__suffix">
                          { props.suffix }
                        </span>
                      )}
                    </>
                  ),
                }}
              </VField>
            ),
            details: hasDetails ? slotProps => (
              <>
                { slots.details?.(slotProps) }

                { hasCounter && (
                  <>
                    <span />

                    <VCounter
                      active={ props.persistentCounter || isFocused.value }
                      value={ counterValue.value }
                      max={ max.value }
                      disabled={ props.disabled }
                      v-slots:default={ slots.counter }
                    />
                  </>
                )}
              </>
            ) : undefined,
          }}
        </VInput>
      )
    })

    return forwardRefs({}, vInputRef, vFieldRef, textareaRef)
  },
})

export type VTextarea = InstanceType<typeof VTextarea>
