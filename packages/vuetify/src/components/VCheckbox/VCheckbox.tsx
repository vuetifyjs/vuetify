// Styles
import './VCheckbox.sass'

// Components
import { VSelectionControl } from '@/components/VSelectionControl'
import { VInput } from '@/components/VInput'
import { filterInputAttrs } from '@/components/VInput/VInput'

// Utility
import { computed, defineComponent, ref } from 'vue'
import { pick, useRender } from '@/util'

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

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { attrs, slots }) {
    const indeterminate = ref(props.indeterminate)

    useRender(() => {
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)

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

      return (
        <VInput
          class="v-checkbox"
          { ...rootAttrs }
          v-slots={{
            ...slots,
            default: () => (
              <VSelectionControl
                type="checkbox"
                onChange={ onChange }
                model-value={ props.modelValue }
                onIcon={ props.onIcon }
                offIcon={ offIcon.value }
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
