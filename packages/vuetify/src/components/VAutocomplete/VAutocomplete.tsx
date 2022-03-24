// Components
import { VCombobox } from '../VCombobox'

// Utility
import type { PropType } from 'vue'
import { computed, ref, watch } from 'vue'
import { genericComponent, useRender } from '@/util'

// Types
import type { MakeSlots } from '@/util'
import { useProxiedModel } from '@/composables/proxiedModel'
import type { SelectItem } from '../VSelect/VSelect'

export const VAutocomplete = genericComponent<new <T>() => {
  $slots: MakeSlots<{
    default: []
  }>
}>()({
  name: 'VAutocomplete',

  props: {
    hideNoData: Boolean,
    items: {
      type: Array as PropType<SelectItem[]>,
      default: () => ([]),
    },
    modelValue: {
      type: [Number, String, Array],
      default: () => ([]),
    },
  },

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const vComboboxRef = ref()
    const model = useProxiedModel(props, 'modelValue')
    const search = ref('')

    function onBlur () {
      // clear search
    }

    function onUpdate (v: any) {
      if (v !== 'Bar') return

      emit('update:modelValue', v)
    }

    watch(search, val => {
      // does value exist in items
      // if - update model
      // else do nothing
    })

    useRender(() => (
      <VCombobox
        v-model={ search.value }
        ref={ vComboboxRef }
        hideNoData={ props.hideNoData }
        onBlur={ onBlur }
        items={ props.items }
      >
        { slots?.default?.() }
      </VCombobox>
    ))

    return {}
  },
})

export type VAutocomplete = InstanceType<typeof VAutocomplete>
