// Styles
import './VNumberInput.sass'

// Components
import { VBtn } from '../VBtn'
import { VDivider } from '../VDivider'
import { makeVFieldProps, VField } from '@/components/VField/VField'
import { makeVInputProps, VInput } from '@/components/VInput/VInput'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { VFieldSlots } from '@/components/VField/VField'
import type { VInputSlots } from '@/components/VInput/VInput'

type VNumberInputSlots = Omit<VInputSlots & VFieldSlots, 'default'>

const makeVNumberInputProps = propsFactory({
  ...makeVInputProps(),
  ...makeVFieldProps(),
}, 'VNumberInput')

export const VNumberInput = genericComponent<VNumberInputSlots>()({
  name: 'VNumberInput',

  inheritAttrs: false,

  props: {
    ...makeVNumberInputProps(),
    modelValue: {
      type: Number,
      default: 0,
    },
  },

  emits: {
    'update:modelValue': (val: number) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const model = useProxiedModel(props, 'modelValue')

    useRender(() => {
      return (
          <VInput
            class={[
              'v-number-input',
              props.class,
            ]}
            style={ props.style }
          >
            {{
              default: () => (
                <VField
                  class={[
                    'v-number-input',
                  ]}
                  variant="outlined"
                >
                  {{
                    default: ({
                      props: { class: fieldClass, ...slotProps },
                    }) => {
                      return (
                        <input
                          type="number"
                          value={ model.value }
                          class={ fieldClass }
                        />
                      )
                    },
                    'append-inner': () => (
                      <>
                        <VDivider vertical />
                        <VBtn
                          icon="mdi-chevron-down"
                          rounded="0"
                          size="small"
                          onClick={ () => model.value-- }
                          flat
                        />
                        <VDivider vertical />
                        <VBtn
                          icon="mdi-chevron-up"
                          rounded="0"
                          size="small"
                          onClick={ () => model.value++ }
                          flat
                        />
                      </>
                    ),
                  }}
                </VField>
              ),
            }}
          </VInput>
      )
    })
  },
})

export type VNumberInput = InstanceType<typeof VNumberInput>
