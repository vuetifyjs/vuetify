// Styles
import './VTextarea.sass'

// Components
import { makeVFieldProps } from '@/components/VField/VField'
import { VCounter } from '@/components/VCounter'
import { VField } from '@/components/VField'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Directives
import Intersect from '@/directives/intersect'

// Utilities
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { convertToUnit, defineComponent, pick, useRender } from '@/util'

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
    prefix: String,
    placeholder: String,
    persistentPlaceholder: Boolean,
    persistentCounter: Boolean,
    noResize: Boolean,
    rowHeight: {
      type: [Number, String],
      default: 24,
      validator: (v: any) => !isNaN(parseFloat(v)),
    },
    rows: {
      type: [Number, String],
      default: 5,
      validator: (v: any) => !isNaN(parseInt(v, 10)),
    },
    suffix: String,

    ...makeVFieldProps(),
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

    const fieldRef = ref<VField>()
    function focus () {
      fieldRef.value?.inputRef?.focus()
    }
    function blur () {
      fieldRef.value?.inputRef?.blur()
    }

    function calculateInputHeight () {
      if (!props.autoGrow) return

      controlHeight.value = 'auto'

      nextTick(() => {
        if (!fieldRef?.value?.inputRef) return

        const height = fieldRef.value.inputRef.scrollHeight
        const minHeight = parseInt(props.rows, 10) * parseFloat(getComputedStyle(fieldRef.value.inputRef).lineHeight)

        controlHeight.value = convertToUnit(Math.max(minHeight, height ?? 0))
      })
    }

    watch(model, calculateInputHeight)

    onMounted(calculateInputHeight)

    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue)
      const [_, restAttrs] = pick(attrs, ['class'])

      return (
        <VField
          ref={ fieldRef }
          class={[
            'v-textarea',
            {
              'v-textarea--prefixed': props.prefix,
              'v-textarea--suffixed': props.suffix,
              'v-textarea--auto-grow': props.autoGrow,
              'v-textarea--no-resize': props.noResize || props.autoGrow,
            },
            attrs.class,
          ]}
          style={{
            '--v-input-control-height': controlHeight.value,
          }}
          active={ isDirty.value }
          onUpdate:active={ val => internalDirty.value = val }
          onClick:control={ focus }
          onClick:clear={ e => {
            e.stopPropagation()

            model.value = ''
          }}
          role="textbox"
          { ...attrs }
          { ...props }
          v-slots={{
            ...slots,
            default: ({
              isActive,
              isDisabled,
              isReadonly,
              inputRef,
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
                    class={ fieldClass }
                    style={{ opacity: showPlaceholder ? undefined : '0' }} // can't this just be a class?
                    v-model={ model.value }
                    v-intersect={[{
                      handler: onIntersect,
                    }, null, ['once']]}
                    ref={ inputRef }
                    autofocus={ props.autofocus }
                    readonly={ isReadonly }
                    disabled={ isDisabled }
                    placeholder={ props.placeholder }
                    rows={ props.rows }
                    { ...slotProps }
                    { ...restAttrs }
                  />

                  { props.suffix && (
                    <span class="v-textarea__suffix" style={{ opacity: showPlaceholder ? undefined : '0' }}>
                      { props.suffix }
                    </span>
                  ) }
                </>
              )
            },
            details: hasCounter && (({ isFocused }) => (
              <>
                <span />

                <VCounter
                  active={ props.persistentCounter || isFocused }
                  value={ counterValue.value }
                  max={ max.value }
                  v-slots={ slots.counter }
                />
              </>
            )),
          }}
        />
      )
    })

    return {
      fieldRef,
      focus,
      blur,
    }
  },
})

export type VTextarea = InstanceType<typeof VTextarea>
