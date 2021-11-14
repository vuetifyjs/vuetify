// Styles
import './VCheckbox.sass'

// Components
import { filterInputAttrs } from '@/components/VInput/VInput'
import { VInput } from '@/components/VInput'
import { VSelectionControl } from '@/components/VSelectionControl'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utility
import { computed, defineComponent } from 'vue'
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

  emits: {
    'update:indeterminate': (val: any) => true,
    'update:modelValue': (val: any) => true,
  },

  setup (props, { attrs, slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const indeterminate = useProxiedModel(props, 'indeterminate')

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
                v-model={ model.value }
                onUpdate:modelValue={ onChange }
                offIcon={ offIcon.value }
                onIcon={ props.onIcon }
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
