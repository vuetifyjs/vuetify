// Styles
import './VTextField.sass'

// Components
import { VCounter } from '@/components/VCounter/VCounter'
import { makeVFieldProps, VField } from '@/components/VField/VField'
import { makeVInputProps, VInput } from '@/components/VInput/VInput'

// Composables
import { makeAutocompleteProps, useAutocomplete } from '@/composables/autocomplete'
import { useAutofocus } from '@/composables/autofocus'
import { useFocus } from '@/composables/focus'
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'

// Directives
import vIntersect from '@/directives/intersect'

// Utilities
import { cloneVNode, computed, nextTick, ref } from 'vue'
import { callEvent, filterInputAttrs, genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VCounterSlot } from '@/components/VCounter/VCounter'
import type { VFieldSlots } from '@/components/VField/VField'
import type { VInputSlots } from '@/components/VInput/VInput'

const activeTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month']

export const makeVTextFieldProps = propsFactory({
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: [Number, Function] as PropType<number | ((value: any) => number)>,
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  suffix: String,
  role: String,
  type: {
    type: String,
    default: 'text',
  },
  modelModifiers: Object as PropType<Record<string, boolean>>,

  ...makeAutocompleteProps(),
  ...makeVInputProps(),
  ...makeVFieldProps(),
}, 'VTextField')

export type VTextFieldSlots = Omit<VInputSlots & VFieldSlots, 'default'> & {
  default: never
  counter: VCounterSlot
}

export const VTextField = genericComponent<VTextFieldSlots>()({
  name: 'VTextField',

  directives: { vIntersect },

  inheritAttrs: false,

  props: makeVTextFieldProps(),

  emits: {
    'click:control': (e: MouseEvent) => true,
    'mousedown:control': (e: MouseEvent) => true,
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (val: string) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const { isFocused, focus, blur } = useFocus(props)
    const { onIntersect } = useAutofocus(props)
    const counterValue = computed(() => {
      return typeof props.counterValue === 'function' ? props.counterValue(model.value)
        : typeof props.counterValue === 'number' ? props.counterValue
        : (model.value ?? '').toString().length
    })
    const max = computed(() => {
      if (attrs.maxlength) return attrs.maxlength as unknown as undefined

      if (
        !props.counter ||
        (typeof props.counter !== 'number' &&
        typeof props.counter !== 'string')
      ) return undefined

      return props.counter
    })

    const isPlainOrUnderlined = computed(() => ['plain', 'underlined'].includes(props.variant))

    const vInputRef = ref<VInput>()
    const vFieldRef = ref<VField>()
    const inputRef = ref<HTMLInputElement>()
    const autocomplete = useAutocomplete(props)
    const isActive = computed(() => (
      activeTypes.includes(props.type) ||
      props.persistentPlaceholder ||
      isFocused.value ||
      props.active
    ))
    function onFocus () {
      if (autocomplete.isSuppressing.value) {
        autocomplete.update()
      }

      if (!isFocused.value) focus()

      nextTick(() => {
        if (inputRef.value !== document.activeElement) {
          inputRef.value?.focus()
        }
      })
    }
    function onControlMousedown (e: MouseEvent) {
      emit('mousedown:control', e)

      if (e.target === inputRef.value) return

      onFocus()
      e.preventDefault()
    }
    function onControlClick (e: MouseEvent) {
      emit('click:control', e)
    }
    function onClear (e: MouseEvent, reset: () => void) {
      e.stopPropagation()

      onFocus()

      nextTick(() => {
        reset()

        callEvent(props['onClick:clear'], e)
      })
    }
    function onInput (e: Event) {
      const el = e.target as HTMLInputElement
      model.value = el.value
      if (
        props.modelModifiers?.trim &&
        ['text', 'search', 'password', 'tel', 'url'].includes(props.type)
      ) {
        const caretPosition = [el.selectionStart, el.selectionEnd]
        nextTick(() => {
          el.selectionStart = caretPosition[0]
          el.selectionEnd = caretPosition[1]
        })
      }
    }

    useRender(() => {
      const hasCounter = !!(slots.counter || (props.counter !== false && props.counter != null))
      const hasDetails = !!(hasCounter || slots.details)
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
      const { modelValue: _, ...inputProps } = VInput.filterProps(props)
      const fieldProps = VField.filterProps(props)

      return (
        <VInput
          ref={ vInputRef }
          v-model={ model.value }
          class={[
            'v-text-field',
            {
              'v-text-field--prefixed': props.prefix,
              'v-text-field--suffixed': props.suffix,
              'v-input--plain-underlined': isPlainOrUnderlined.value,
            },
            props.class,
          ]}
          style={ props.style }
          { ...rootAttrs }
          { ...inputProps }
          centerAffix={ !isPlainOrUnderlined.value }
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
              hasDetails,
              reset,
            }) => (
              <VField
                ref={ vFieldRef }
                onMousedown={ onControlMousedown }
                onClick={ onControlClick }
                onClick:clear={ (e: MouseEvent) => onClear(e, reset) }
                role={ props.role }
                { ...omit(fieldProps, ['onClick:clear']) }
                id={ id.value }
                active={ isActive.value || isDirty.value }
                dirty={ isDirty.value || props.dirty }
                disabled={ isDisabled.value }
                focused={ isFocused.value }
                details={ hasDetails.value }
                error={ isValid.value === false }
              >
                {{
                  ...slots,
                  default: ({
                    props: { class: fieldClass, ...slotProps },
                    controlRef,
                  }) => {
                    const inputNode = (
                      <input
                        ref={ val => inputRef.value = controlRef.value = val as HTMLInputElement }
                        value={ model.value }
                        onInput={ onInput }
                        v-intersect={[{
                          handler: onIntersect,
                        }, null, ['once']]}
                        autofocus={ props.autofocus }
                        readonly={ isReadonly.value }
                        disabled={ isDisabled.value }
                        name={ autocomplete.fieldName.value }
                        autocomplete={ autocomplete.fieldAutocomplete.value }
                        placeholder={ props.placeholder }
                        size={ 1 }
                        role={ props.role }
                        type={ props.type }
                        onFocus={ focus }
                        onBlur={ blur }
                        { ...slotProps }
                        { ...inputAttrs }
                      />
                    )

                    return (
                      <>
                        { props.prefix && (
                          <span class="v-text-field__prefix">
                            <span class="v-text-field__prefix__text">
                              { props.prefix }
                            </span>
                          </span>
                        )}

                        { slots.default ? (
                          <div
                            class={ fieldClass }
                            data-no-activator=""
                          >
                            { slots.default() }
                            { inputNode }
                          </div>
                        ) : cloneVNode(inputNode, { class: fieldClass })}

                        { props.suffix && (
                          <span class="v-text-field__suffix">
                            <span class="v-text-field__suffix__text">
                              { props.suffix }
                            </span>
                          </span>
                        )}
                      </>
                    )
                  },
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

    return forwardRefs({}, vInputRef, vFieldRef, inputRef)
  },
})

export type VTextField = InstanceType<typeof VTextField>
