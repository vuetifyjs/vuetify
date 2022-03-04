// Utility
import { computed, defineComponent, ref } from 'vue'
import { useRender, wrapInArray } from '@/util'
import { VAutocomplete } from '../VAutocomplete'
import { useProxiedModel } from '@/composables/proxiedModel'

export const VCombobox = defineComponent({
  name: 'VCombobox',

  props: {
    hideNoData: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array,
      default: () => ([]),
    },
    modelValue: {
      type: [Number, String, Array],
      default: () => ([]),
    },
    multiple: Boolean,
    search: String,
  },

  emits: {
    'item:new': (val: any) => true,
    'update:search': (val: any) => true,
    'update:modelValue': (val: any) => true,
  },

  setup (props, { emit, slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const search = useProxiedModel(props, 'search', '')
    const vAutocompleteRef = ref()
    const filteredItems = computed(() => {
      return vAutocompleteRef.value?.filteredItems.value ?? []
    })
    const items = computed(() => {
      const array = [...props.items]

      for (const value of wrapInArray(model.value)) {
        if (!array.includes(value) && value) {
          array.push(value)
        }
      }

      return array
    })

    function onKeydown (e: KeyboardEvent) {
      if (
        ['Enter'].includes(e.key) &&
        filteredItems.value.length === 0 &&
        search.value != null
      ) {
        if (props.multiple) {
          model.value = [
            ...wrapInArray(model.value),
            search.value,
          ]
          search.value = ''
        } else {
          model.value = search.value
        }

        emit('item:new', search.value)
      }
    }

    useRender(() => (
      <VAutocomplete
        v-model={ model.value }
        v-model:search={ search.value }
        ref={ vAutocompleteRef }
        items={ items.value as any }
        hide-no-data={ props.hideNoData }
        onKeydown={ onKeydown }
        multiple={ props.multiple }
      >
        { slots?.default?.() }
      </VAutocomplete>
    ))

    return {}
  },
})
