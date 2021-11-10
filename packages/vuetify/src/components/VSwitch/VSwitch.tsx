// Styles
import './VSwitch.sass'

// Components
import { VSelectionControl } from '@/components/VSelectionControl'
import { VInput } from '@/components/VInput'
import { filterInputAttrs } from '@/components/VInput/VInput'

// Utility
import { defineComponent } from 'vue'
import { useRender } from '@/util'

export const VSwitch = defineComponent({
  name: 'VSwitch',

  inheritAttrs: false,

  props: {
    inset: Boolean,
    loading: {
      type: [Boolean, String],
      default: false,
    },
    flat: {
      type: Boolean,
      default: false,
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
    useRender(() => {
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)

      return (
        <VInput
          class="v-switch"
          { ...rootAttrs }
          v-slots={{
            ...slots,
            default: () => (
              <VSelectionControl
                type="checkbox"
                model-value={ props.modelValue }
                { ...inputAttrs }
                v-slots={{
                  default: () => (<div class="v-switch__track"></div>),
                  input: ({ textColorClasses }) => (
                    <div
                      class={[
                        'v-switch__thumb',
                        textColorClasses.value,
                      ]}
                    />
                  ),
                }}
              />
            ),
          }}
        />
      )
    })

    return {}
  },
})

export type VSwitch = InstanceType<typeof VSwitch>
