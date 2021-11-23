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
    'update:indeterminate': (val: boolean) => true,
    'update:modelValue': (val: any) => true,
  },

  setup (props, { attrs, slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const indeterminate = useProxiedModel(props, 'indeterminate')
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
                v-model={ model.value }
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
