// Styles
import './VTextField.sass'

// Components
import { VField } from '@/components/VField/VField'

// Composables
import { useIntersectionObserver } from '@/composables/intersectionObserver'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { defineComponent, IN_BROWSER, isComponentInstance } from '@/util'
import { computed, ref } from 'vue'

// Types
import type { ComponentPublicInstance, Ref } from 'vue'
import type { VFieldSlot } from '@/components/VField/VField'

const dirtyTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month']

export function tryAutofocus (element: Ref<ComponentPublicInstance | HTMLElement | undefined>) {
  if (!IN_BROWSER) return

  const el = isComponentInstance(element) ? element.$el : element

  el?.focus?.()
}

export default defineComponent({
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

    const { intersectionRef, isIntersecting } = useIntersectionObserver(() => {
      if (props.autofocus && isIntersecting) {
        tryAutofocus(intersectionRef)
      }
    })

    return () => {
      return (
        <VField
          ref={ intersectionRef }
          class={[
            'v-text-field',
          ]}
          active={ isDirty.value }
          onUpdate:active={ val => internalDirty.value = val }
          role="textbox"
          { ...attrs }
          v-slots={{
            ...slots,
            default: ({ inputRef, props: slotProps }: VFieldSlot) => {
              intersectionRef.value = inputRef.value

              return (
                <input
                  v-model={ value.value }
                  ref={ inputRef }
                  type={ props.type }
                  size={ 1 }
                  { ...slotProps }
                  autofocus={ props.autofocus }
                />
              )
            },
          }}
        />
      )
    }
  },
})
