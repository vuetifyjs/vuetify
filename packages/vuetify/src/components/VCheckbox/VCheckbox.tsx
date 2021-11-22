// Styles
import './VCheckbox.sass'

// Components
import { VInput } from '@/components/VInput'
import { VSelectionControl } from '@/components/VSelectionControl'

// Utility
import { computed, defineComponent, ref } from 'vue'
import { filterInputAttrs } from '@/components/VInput/VInput'
import { useRender } from '@/util'

export const VCheckbox = defineComponent({
  name: 'VCheckbox',

  inheritAttrs: false,

  props: {
    indeterminate: Boolean,
    indeterminateIcon: {
      type: String,
      default: '$checkboxIndeterminate',
    },
    offIcon: {
      type: String,
      default: '$checkboxOff',
    },
    onIcon: {
      type: String,
      default: '$checkboxOn',
    },
    modelValue: {
      type: null,
      default: undefined as any,
    },
  },

  setup (props, { attrs, slots }) {
    const indeterminate = ref(props.indeterminate)
    const offIcon = computed(() => {
      return indeterminate.value
        ? props.indeterminateIcon
        : props.offIcon
    })

    function onChange () {
      if (indeterminate.value) {
        indeterminate.value = false
      }
    }

    useRender(() => {
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)

      return (
        <VInput
          class="v-checkbox"
          { ...rootAttrs }
          v-slots={{
            ...slots,
            default: ({
              isDisabled,
              isReadonly,
            }) => (
              <VSelectionControl
                type="checkbox"
                disabled={ isDisabled.value }
                readonly={ isReadonly.value }
                onUpdate:modelValue={ onChange }
                offIcon={ offIcon.value }
                onIcon={ props.onIcon }
                aria-checked={ indeterminate.value ? 'mixed' : undefined }
                { ...inputAttrs }
              />
            ),
          }}
        />
      )
    })

    return {}
  },
})

export type VCheckbox = InstanceType<typeof VCheckbox>
