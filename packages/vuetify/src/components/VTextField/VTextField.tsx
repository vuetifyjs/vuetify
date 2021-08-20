// Styles
import './VTextField.sass'

// Components
import { VCounter } from '@/components/VCounter'
import { VField } from '@/components/VField'
import { VFadeTransition } from '@/components/transitions'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Directives
import VIntersect from '@/directives/intersect'

// Utilities
import { computed, ref } from 'vue'
import { defineComponent } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VFieldSlot } from '@/components/VField/VField'

const dirtyTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month']

export const VTextField = defineComponent({
  name: 'VTextField',

  directives: { VIntersect },

  inheritAttrs: false,

  props: {
    autofocus: Boolean,
    counter: Boolean,
    counterValue: Function as PropType<(value: any) => number>,
    prefix: String,
    placeholder: String,
    persistentPlaceholder: Boolean,
    suffix: String,
    type: {
      type: String,
      default: 'text',
    },
    modelValue: String,
  },

  emits: {
    'update:modelValue': (val: string) => true as any,
  },

  setup (props, { attrs, slots }) {
    const value = useProxiedModel(props, 'modelValue')

    const internalDirty = ref(false)
    const isDirty = computed(() => {
      return internalDirty.value || !!value.value || dirtyTypes.includes(props.type)
    })

    const counterValue = computed(() => {
      return typeof props.counterValue === 'function'
        ? props.counterValue(value.value)
        : value.value?.toString().length
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

    return () => {
      const hasCounter = (slots.counter || props.counter)

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
          role="textbox"
          { ...attrs }
          v-slots={{
            ...slots,
            default: ({
              isActive,
              inputRef,
              props: { class: fieldClass, ...slotProps },
            }: VFieldSlot) => {
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
                    style={{ opacity: showPlaceholder ? undefined : '0' }}
                    v-model={ value.value }
                    v-intersect={[{
                      handler: onIntersect,
                    }, null, ['once']]}
                    ref={ inputRef }
                    type={ props.type }
                    size={ 1 }
                    placeholder={ props.placeholder }
                    { ...slotProps }
                    autofocus={ props.autofocus }
                  />

                  { props.suffix && (
                    <span class="v-text-field__suffix" style={{ opacity: showPlaceholder ? undefined : '0' }}>
                      { props.suffix }
                    </span>
                  ) }
                </>
              )
            },
            details: hasCounter ? () => (
              <>
                <span />

                <VCounter
                  value={ counterValue.value }
                  max={ attrs.maxlength as undefined }
                  v-slots={ slots.counter }
                />
              </>
            ) : undefined,
          }}
        />
      )
    }
  },
})
