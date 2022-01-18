// Styles
import './VTextField.sass'

// Components
import { filterInputProps, makeVInputProps, VInput } from '@/components/VInput/VInput'
import { filterFieldProps, makeVFieldProps, VField } from '@/components/VField/VField'
import { VCounter } from '@/components/VCounter'

// Composables
import { useForwardRef } from '@/composables/forwardRef'
import { useProxiedModel } from '@/composables/proxiedModel'

// Directives
import Intersect from '@/directives/intersect'

// Utilities
import { computed, ref } from 'vue'
import { filterInputAttrs, genericComponent, useRender } from '@/util'

// Types
import type { MakeSlots } from '@/util'
import type { PropType } from 'vue'

const activeTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month']

export const VTextField = genericComponent<new <T>() => {
  $slots: MakeSlots<{}>
}>()({
  name: 'VTextField',

  directives: { Intersect },

  inheritAttrs: false,

  props: {
    autofocus: Boolean,
    counter: [Boolean, Number, String] as PropType<true | number | string>,
    counterValue: Function as PropType<(value: any) => number>,
    prefix: String,
    placeholder: String,
    persistentPlaceholder: Boolean,
    persistentCounter: Boolean,
    suffix: String,
    type: {
      type: String,
      default: 'text',
    },

    ...makeVInputProps(),
    ...makeVFieldProps(),
  },

  emits: {
    blur: (e: FocusEvent) => true,
    focus: (e: FocusEvent) => true,
    'click:control': (e: MouseEvent) => true,
    'update:modelValue': (val: string) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const counterValue = computed(() => {
      return typeof props.counterValue === 'function'
        ? props.counterValue(model.value)
        : (model.value || '').toString().length
    })
    const max = computed(() => {
      if (attrs.maxlength) return attrs.maxlength as undefined

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

    const isFocused = ref(false)
    const inputRef = ref<HTMLInputElement>()
    const isActive = computed(() => (
      isFocused.value ||
      activeTypes.includes(props.type) ||
      props.persistentPlaceholder
    ))
    function onFocus (e: FocusEvent) {
      isFocused.value = true

      emit('focus', e)

      if (inputRef.value === document.activeElement) return

      inputRef.value?.focus()
    }
    function onBlur (e: FocusEvent) {
      isFocused.value = false

      emit('blur', e)
    }
    function onControlClick (e: MouseEvent) {
      emit('click:control', e)

      inputRef.value?.focus()
    }

    const vInputRef = ref<VInput>()
    const vFieldRef = ref<VInput>()

    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue)
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
      const [inputProps] = filterInputProps(props)
      const [fieldProps] = filterFieldProps(props)

      return (
        <VInput
          ref={ vInputRef }
          v-model={ model.value }
          class={[
            'v-text-field',
            {
              'v-text-field--prefixed': props.prefix,
              'v-text-field--suffixed': props.suffix,
            },
          ]}
          focused={ isFocused.value }
          { ...rootAttrs }
          { ...inputProps }
        >
          {{
            ...slots,
            default: ({
              isDisabled,
              isDirty,
              isReadonly,
            }) => (
              <VField
                ref={ vFieldRef }
                active={ isDirty.value || isActive.value }
                focused={ isFocused.value }
                onMousedown={ (e: MouseEvent) => {
                  if (e.target === inputRef.value) return

                  e.preventDefault()
                }}
                onClick:control={ onControlClick }
                onClick:clear={ e => {
                  e.stopPropagation()

                  model.value = ''
                }}
                role="textbox"
                { ...fieldProps }
              >
                {{
                  ...slots,
                  default: ({
                    props: { class: fieldClass, ...slotProps },
                  }) => {
                    return (
                      <>
                        { props.prefix && (
                          <span class="v-text-field__prefix">
                            { props.prefix }
                          </span>
                        ) }

                        { slots.default?.() }

                        <input
                          ref={ inputRef }
                          class={ fieldClass }
                          v-model={ model.value }
                          v-intersect={[{
                            handler: onIntersect,
                          }, null, ['once']]}
                          autofocus={ props.autofocus }
                          readonly={ isReadonly.value }
                          disabled={ isDisabled.value }
                          placeholder={ props.placeholder }
                          size={ 1 }
                          type={ props.type }
                          onFocus={ onFocus }
                          onBlur={ onBlur }
                          { ...slotProps }
                          { ...inputAttrs }
                        />

                        { props.suffix && (
                          <span class="v-text-field__suffix">
                            { props.suffix }
                          </span>
                        ) }
                      </>
                    )
                  },
                }}
              </VField>
            ),
            details: hasCounter ? ({ isFocused }) => (
              <>
                <span />

                <VCounter
                  active={ props.persistentCounter || isFocused.value }
                  value={ counterValue.value }
                  max={ max.value }
                  v-slots={ slots.counter }
                />
              </>
            ) : undefined,
          }}
        </VInput>
      )
    })

    return useForwardRef({
      focus,
      blur,
    }, vInputRef, vFieldRef)
  },
})

export type VTextField = InstanceType<typeof VTextField>
