// Styles
import './VTextField.sass'

// Components
import { VField } from '@/components/VField/VField'

// Composables
import { useIntersectionObserver } from '@/composables/intersectionObserver'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { defineComponent, isComponentInstance } from '@/util'
import { computed, ref } from 'vue'

// Types
import type { VFieldSlot } from '@/components/VField/VField'

const dirtyTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month']

export const VTextField = defineComponent({
  name: 'VTextField',

  inheritAttrs: false,

  props: {
    autofocus: Boolean,
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
    const isDirty = computed(() => {
      return internalDirty.value || !!value.value || dirtyTypes.includes(props.type)
    })

    const { intersectionRef, isIntersecting } = useIntersectionObserver((_, observer) => {
      if (props.autofocus && isIntersecting) {
        const el = isComponentInstance(intersectionRef) ? intersectionRef.$el : intersectionRef

        if (!el.value) return

        el.value.focus()

        observer.unobserve(el.value)
      }
    })

    return () => {
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
            default: ({ inputRef, props: slotProps }: VFieldSlot) => (
              <input
                v-model={ value.value }
                ref={ el => inputRef.value = intersectionRef.value = el as HTMLInputElement
                }
                type={ props.type }
                size={ 1 }
                { ...slotProps }
                autofocus={ props.autofocus }
              />
            ),
          }}
        />
      )
    }
  },
})
