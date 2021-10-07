// Styles
import './VRadio.sass'

// Components
import { VSelectionControl } from '@/components/VSelectionControl'

// Utility
import { defineComponent } from 'vue'
import { pick, useRender } from '@/util'

export const VRadio = defineComponent({
  name: 'VRadio',

  inheritAttrs: false,

  props: {
    offIcon: {
      type: String,
      default: '$radioOff',
    },
    onIcon: {
      type: String,
      default: '$radioOn',
    },
  },

  setup (props, { attrs, slots }) {
    useRender(() => {
      const [_, restAttrs] = pick(attrs, ['class', 'label'])

      return (
        <VSelectionControl
          class="v-radio"
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
                  type="radio"
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

export type VRadio = InstanceType<typeof VRadio>
