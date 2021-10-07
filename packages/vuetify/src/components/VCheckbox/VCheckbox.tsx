// Styles
import './VCheckbox.sass'

// Components
import { VSelectionControl } from '@/components/VSelectionControl'

// Utility
import { defineComponent } from 'vue'
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
  },

  setup (props, { attrs, slots }) {
    useRender(() => {
      const [_, restAttrs] = pick(attrs, ['class'])

      return (
        <VSelectionControl
          class="v-checkbox"
          onIcon={ props.onIcon }
          offIcon={ props.offIcon }
          { ...attrs }
          v-slots={{
            ...slots,
            default: ({
              model,
              isReadonly,
              isDisabled,
              props,
            }) => {
              return (
                <input
                  v-model={ model.value }
                  readonly={ isReadonly.value }
                  disabled={ isDisabled.value }
                  type="checkbox"
                  { ...restAttrs }
                  { ...props }
                />
              )
            },
          }}
        />
      )
    })

    return {}
  },
})
