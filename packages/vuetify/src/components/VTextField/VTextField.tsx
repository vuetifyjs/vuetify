// Styles
import './VTextField.sass'

// Components
import { VCounter } from '@/components/VCounter'
import { VField } from '@/components/VField'

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
    const counterValue = computed(() => {
      return typeof props.counterValue === 'function'
        ? props.counterValue(value.value)
        : value.value?.toString().length
    })
    const isDirty = computed(() => {
      return internalDirty.value || !!value.value || dirtyTypes.includes(props.type)
    })

    function onIntersect (
      isIntersecting: boolean,
      entries: IntersectionObserverEntry[]
    ) {
      if (!props.autofocus || !isIntersecting) return

      (entries[0].target as HTMLInputElement)?.focus?.()
    }

    return () => {
      const hasCounter = (slots.counter || props.counter)

      return (
        <VField
          class={[
            'v-text-field',
          ]}
          active={ isDirty.value }
          onUpdate:active={ val => internalDirty.value = val }
          role="textbox"
          { ...attrs }
          v-slots={{
            ...slots,
            default: ({
              isActive,
              inputRef,
              props: { class: fieldClass, ...slotProps },
            }: VFieldSlot) => (
              <div class={ fieldClass }>
                { props.prefix && isActive && (
                  <span class="v-text-field__prefix">
                    { props.prefix }
                  </span>
                ) }

                <input
                  v-model={ value.value }
                  v-intersect={[{
                    handler: onIntersect,
                  }, null, ['once']]}
                  ref={ inputRef }
                  type={ props.type }
                  size={ 1 }
                  { ...slotProps }
                  autofocus={ props.autofocus }
                />

                { props.suffix && (
                  <span class="v-text-field__suffix">
                    { props.suffix }
                  </span>
                ) }
              </div>
            ),
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
