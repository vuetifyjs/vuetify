// Styles
import './VTextarea.sass'

// Components
import { filterFieldProps, makeVFieldProps } from '@/components/VField/VField'
import { filterInputProps, makeVInputProps, VInput } from '@/components/VInput/VInput'
import { VCounter } from '@/components/VCounter'
import { VField } from '@/components/VField'

// Directives
import Intersect from '@/directives/intersect'

// Composables
import { useForwardRef } from '@/composables/forwardRef'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { convertToUnit, defineComponent, filterInputAttrs, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const VTextarea = defineComponent({
  name: 'VTextarea',

  directives: { Intersect },

  inheritAttrs: false,

  props: {
    autoGrow: Boolean,
    autofocus: Boolean,
    counter: [Boolean, Number, String] as PropType<true | number | string>,
    counterValue: Function as PropType<(value: any) => number>,
    hint: String,
    persistentHint: Boolean,
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

    ...makeVInputProps(),
    ...makeVFieldProps(),
  },

  emits: {
    'click:clear': (e: MouseEvent) => true,
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

    const vInputRef = ref<VInput>()
    const vFieldRef = ref<VInput>()
    const isFocused = ref(false)
    const controlHeight = ref('auto')
    const textareaRef = ref<HTMLInputElement>()
    const isActive = computed(() => (
      isFocused.value ||
      props.persistentPlaceholder
    ))

    const messages = computed(() => {
      return props.messages.length
        ? props.messages
        : (isActive.value || props.persistentHint) ? props.hint : ''
    })

    function onFocus () {
      if (textareaRef.value !== document.activeElement) {
        textareaRef.value?.focus()
      }

      if (!isFocused.value) isFocused.value = true
    }
    function onControlClick (e: MouseEvent) {
      onFocus()

      emit('click:control', e)
    }
    function onClear (e: MouseEvent) {
      e.stopPropagation()

      onFocus()

      nextTick(() => {
        model.value = ''

        emit('click:clear', e)
      })
    }

    const sizerRef = ref<HTMLTextAreaElement>()
    function calculateInputHeight () {
      if (!props.autoGrow) return

      nextTick(() => {
        if (!sizerRef.value) return

        const style = getComputedStyle(sizerRef.value)

        const padding = parseFloat(style.getPropertyValue('--v-field-padding-top')) +
        parseFloat(style.getPropertyValue('--v-field-padding-bottom'))

        const height = sizerRef.value.scrollHeight
        const lineHeight = parseFloat(style.lineHeight)
        const minHeight = parseFloat(props.rows) * lineHeight + padding
        const maxHeight = parseFloat(props.maxRows!) * lineHeight + padding || Infinity

        controlHeight.value = convertToUnit(Math.min(maxHeight, Math.max(minHeight, height ?? 0)))
      })
    }

    onMounted(calculateInputHeight)
    watch(model, calculateInputHeight)
    watch(() => props.rows, calculateInputHeight)
    watch(() => props.maxRows, calculateInputHeight)

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
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
      const [{ modelValue: _, ...inputProps }] = filterInputProps(props)
      const [fieldProps] = filterFieldProps(props)

      return (
        <VInput
          v-model={ model.value }
          class={[
            'v-textarea',
            {
              'v-textarea--prefixed': props.prefix,
              'v-textarea--suffixed': props.suffix,
              'v-textarea--auto-grow': props.autoGrow,
              'v-textarea--no-resize': props.noResize || props.autoGrow,
            },
          ]}
          { ...rootAttrs }
          { ...inputProps }
          messages={ messages.value }
        >
          {{
            ...slots,
            default: ({
              isDisabled,
              isDirty,
              isReadonly,
              isValid,
            }) => (
              <VField
                style={{
                  '--v-input-control-height': controlHeight.value,
                }}
                onClick:control={ onControlClick }
                onClick:clear={ onClear }
                role="textbox"
                { ...fieldProps }
                active={ isActive.value || isDirty.value }
                dirty={ isDirty.value || props.dirty }
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
                      ) }

                      <textarea
                        ref={ textareaRef }
                        class={ fieldClass }
                        v-model={ model.value }
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
                        onBlur={ () => (isFocused.value = false) }
                        { ...slotProps }
                        { ...inputAttrs }
                      />

                      { props.autoGrow && (
                        <textarea
                          class={[
                            fieldClass,
                            'v-textarea__sizer',
                          ]}
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
                      ) }
                    </>
                  ),
                }}
              </VField>
            ),
            details: hasCounter ? () => (
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

    return useForwardRef({}, vInputRef, vFieldRef, textareaRef)
  },
})

export type VTextarea = InstanceType<typeof VTextarea>
