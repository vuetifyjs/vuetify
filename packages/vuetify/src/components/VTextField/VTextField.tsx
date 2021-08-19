// Styles
import './VTextField.sass'

// Components
import { VField } from '@/components/VField'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Directives
import VIntersect from '@/directives/intersect'

// Utilities
import { computed, ref } from 'vue'
import { defineComponent } from '@/util'

// Types
import type { VFieldSlot } from '@/components/VField/VField'

const dirtyTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month']

export const VTextField = defineComponent({
  name: 'VTextField',

  directives: { VIntersect },

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

    function onIntersect (
      isIntersecting: boolean,
      entries: IntersectionObserverEntry[]
    ) {
      if (!isIntersecting) return

      (entries[0].target as HTMLInputElement)?.focus?.()
    }

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
                v-intersect={[{
                  handler: onIntersect,
                }, null, ['once']]}
                ref={ inputRef }
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
