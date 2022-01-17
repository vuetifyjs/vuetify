// Styles
import './VTextarea.sass'

// Components
import { filterFieldProps, makeVFieldProps } from '@/components/VField/VField'
import { VCounter } from '@/components/VCounter'
import { VField } from '@/components/VField'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Directives
import Intersect from '@/directives/intersect'

// Utilities
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { convertToUnit, defineComponent, filterInputAttrs, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import { filterInputProps, makeVInputProps, VInput } from '@/components/VInput/VInput'

export const VTextarea = defineComponent({
  name: 'VTextarea',

  directives: { Intersect },

  inheritAttrs: false,

  props: {
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

    ...makeVInputProps(),
    ...makeVFieldProps(),
  },

  emits: {
    'update:modelValue': (val: string) => true,
  },

  setup (props, { attrs, slots }) {
    const model = useProxiedModel(props, 'modelValue')

    const controlHeight = ref('auto')
    const internalDirty = ref(false)
    const isDirty = computed(() => {
      return internalDirty.value || !!model.value
    })

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
    function focus () {
      inputRef.value?.focus()
    }
    function blur () {
      inputRef.value?.blur()
    }
    function onFocus (e: FocusEvent) {
      isFocused.value = true
    }
    function onBlur (e: FocusEvent) {
      isFocused.value = false
    }
    function clear (e?: Event) {
      e?.stopPropagation()

      model.value = ''
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
      const [inputProps] = filterInputProps(props)
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
        >
          {{
            ...slots,
            default: ({ isDisabled, isReadonly }) => (
              <VField
                style={{
                  '--v-input-control-height': controlHeight.value,
                }}
                active={ isDirty.value }
                onUpdate:active={ val => internalDirty.value = val }
                onClick:control={ focus }
                onClick:clear={ clear }
                role="textbox"
                { ...fieldProps }
              >
                {{
                  ...slots,
                  default: ({
                    isActive,
                    props: { class: fieldClass, ...slotProps },
                  }) => {
                    const showPlaceholder = isActive || props.persistentPlaceholder
                    return (
                      <>
                        { props.prefix && (
                          <span class="v-textarea__prefix" style={{ opacity: showPlaceholder ? undefined : '0' }}>
                            { props.prefix }
                          </span>
                        ) }

                        <textarea
                          ref={ inputRef }
                          class={ fieldClass }
                          style={{ opacity: showPlaceholder ? undefined : '0' }} // can't this just be a class?
                          v-model={ model.value }
                          v-intersect={[{
                            handler: onIntersect,
                          }, null, ['once']]}
                          autofocus={ props.autofocus }
                          readonly={ isReadonly.value }
                          disabled={ isDisabled.value }
                          placeholder={ props.placeholder }
                          rows={ props.rows }
                          onFocus={ onFocus }
                          onBlur={ onBlur }
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
                          <span class="v-textarea__suffix" style={{ opacity: showPlaceholder ? undefined : '0' }}>
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

    return {
      focus,
      blur,
    }
  },
})

export type VTextarea = InstanceType<typeof VTextarea>
