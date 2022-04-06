// Styles
import './VCheckbox.sass'

// Components
import { filterInputProps, makeVInputProps, VInput } from '@/components/VInput/VInput'
import { filterControlProps, makeSelectionControlProps, VSelectionControl } from '@/components/VSelectionControl/VSelectionControl'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utility
import { computed } from 'vue'
import { defineComponent, filterInputAttrs, useRender } from '@/util'

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

    falseIcon: {
      type: String,
      default: '$checkboxOff',
    },
    trueIcon: {
      type: String,
      default: '$checkboxOn',
    },
  },

  emits: {
    'update:indeterminate': (val: boolean) => true,
  },

  setup (props, { attrs, slots }) {
    const indeterminate = useProxiedModel(props, 'indeterminate')
    const falseIcon = computed(() => {
      return indeterminate.value
        ? props.indeterminateIcon
        : props.falseIcon
    })
    const trueIcon = computed(() => {
      return indeterminate.value
        ? props.indeterminateIcon
        : props.trueIcon
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
        >
          {{
            ...slots,
            default: ({
              isDisabled,
              isReadonly,
            }) => (
              <VSelectionControl
                { ...controlProps }
                type="checkbox"
                onUpdate:modelValue={ onChange }
                falseIcon={ falseIcon.value }
                trueIcon={ trueIcon.value }
                aria-checked={ indeterminate.value ? 'mixed' : undefined }
                disabled={ isDisabled.value }
                readonly={ isReadonly.value }
                { ...controlAttrs }
                v-slots={ slots }
              />
            ),
          }}
        </VInput>
      )
    })

    return {}
  },
})

export type VCheckbox = InstanceType<typeof VCheckbox>
