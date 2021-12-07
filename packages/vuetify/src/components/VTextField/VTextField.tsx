// Styles
import './VTextField.sass'

// Components
import { filterFieldProps, makeVFieldProps } from '@/components/VField/VField'
import { VCounter } from '@/components/VCounter'
import { VField } from '@/components/VField'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Directives
import Intersect from '@/directives/intersect'

// Utilities
import { computed, ref } from 'vue'
import { defineComponent, filterInputAttrs, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

const dirtyTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month']

export const VTextField = defineComponent({
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

    ...makeVFieldProps(),
  },

  emits: {
    'update:modelValue': (val: string) => true,
  },

  setup (props, { attrs, slots }) {
    const model = useProxiedModel(props, 'modelValue')

    const internalDirty = ref(false)
    const isDirty = computed(() => {
      return internalDirty.value || !!model.value || dirtyTypes.includes(props.type)
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

    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue)
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
      const [fieldProps, _] = filterFieldProps(props)

      return (
        <VField
          ref={ fieldRef }
          class={[
            'v-text-field',
            {
              'v-text-field--prefixed': props.prefix,
              'v-text-field--suffixed': props.suffix,
            },
          ]}
          active={ isDirty.value }
          onUpdate:active={ val => internalDirty.value = val }
          onClick:control={ focus }
          onClick:clear={ e => {
            e.stopPropagation()

            model.value = ''
          }}
          role="textbox"
          { ...rootAttrs }
          { ...fieldProps }
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
                    <span class="v-text-field__prefix" style={{ opacity: showPlaceholder ? undefined : '0' }}>
                      { props.prefix }
                    </span>
                  ) }

                  <input
                    class={ fieldClass }
                    style={{ opacity: showPlaceholder ? undefined : '0' }} // can't this just be a class?
                    v-model={ model.value }
                    v-intersect={[{
                      handler: onIntersect,
                    }, null, ['once']]}
                    ref={ inputRef }
                    autofocus={ props.autofocus }
                    readonly={ isReadonly.value }
                    disabled={ isDisabled.value }
                    placeholder={ props.placeholder }
                    size={ 1 }
                    type={ props.type }
                    { ...slotProps }
                    { ...inputAttrs }
                  />

                  { props.suffix && (
                    <span class="v-text-field__suffix" style={{ opacity: showPlaceholder ? undefined : '0' }}>
                      { props.suffix }
                    </span>
                  ) }
                </>
              )
            },
            details: hasCounter ? ({ isFocused }) => (
              <>
                <span />

                <VCounter
                  active={ props.persistentCounter || isFocused }
                  value={ counterValue.value }
                  max={ max.value }
                  v-slots={ slots.counter }
                />
              </>
            ) : undefined,
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

export type VTextField = InstanceType<typeof VTextField>
