// Styles
import './VSwitch.sass'

// Components
import { VSelectionControl } from '@/components/VSelectionControl'
import { VInput } from '@/components/VInput'
import { filterInputAttrs } from '@/components/VInput/VInput'

// Utility
import { defineComponent } from 'vue'
import { useRender } from '@/util'
import { useProxiedModel } from '@/composables/proxiedModel'

export const VSwitch = defineComponent({
  name: 'VSwitch',

  inheritAttrs: false,

  props: {
    indeterminate: Boolean,
    inset: Boolean,
    loading: {
      type: [Boolean, String],
      default: false,
    },
    flat: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    'update:indeterminate': (val: boolean) => true,
  },

  setup (props, { attrs, slots }) {
    useRender(() => {
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
      const indeterminate = useProxiedModel(props, 'indeterminate')
      function onChange () {
        if (indeterminate.value) {
          indeterminate.value = false
        }
      }

      return (
        <VInput
          class={[
            'v-switch',
            { 'v-switch--indeterminate': indeterminate.value },
          ]}
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
