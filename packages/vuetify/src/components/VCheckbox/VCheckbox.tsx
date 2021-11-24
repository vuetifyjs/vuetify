// Styles
import './VCheckbox.sass'

// Components
import { filterInputProps, makeVInputProps, VInput } from '@/components/VInput/VInput'
import { filterControlProps, makeSelectionControlProps, VSelectionControl } from '@/components/VSelectionControl/VSelectionControl'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utility
import { computed, defineComponent } from 'vue'
import { filterInputAttrs, useRender } from '@/util'

export const VCheckbox = defineComponent({
  name: 'VCheckbox',

  inheritAttrs: false,

  props: {
    indeterminate: Boolean,
    indeterminateIcon: {
      type: String,
      default: '$checkboxIndeterminate',
    },

    ...makeVInputProps(),
    ...makeSelectionControlProps(),

    offIcon: {
      type: String,
      default: '$checkboxOff',
    },
    onIcon: {
      type: String,
      default: '$checkboxOn',
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
    const onIcon = computed(() => {
      return indeterminate.value
        ? props.indeterminateIcon
        : props.onIcon
    })

    function onChange () {
      if (indeterminate.value) {
        indeterminate.value = false
      }
    }

    useRender(() => {
      const [inputAttrs, controlAttrs] = filterInputAttrs(attrs)
      const [inputProps, _1] = filterInputProps(props)
      const [controlProps, _2] = filterControlProps(props)

      return (
        <VInput
          class="v-checkbox"
          { ...inputAttrs }
          { ...inputProps }
          v-slots={{
            ...slots,
            default: ({
              isDisabled,
              isReadonly,
            }) => (
              <VSelectionControl
                type="checkbox"
                v-model={ model.value }
                onUpdate:modelValue={ onChange }
                offIcon={ offIcon.value }
                onIcon={ onIcon.value }
                aria-checked={ indeterminate.value ? 'mixed' : undefined }
                { ...controlAttrs }
                { ...controlProps }
                disabled={ isDisabled.value }
                readonly={ isReadonly.value }
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
