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
import type { PropType } from 'vue'
import type { VFieldSlots } from '@/components/VField/VField'
import type { VInputSlots } from '@/components/VInput/VInput'

type VNumberInputSlots = Omit<VInputSlots & VFieldSlots, 'default'>

type ControlVariant = 'default' | 'stacked' | 'split'

const makeVNumberInputProps = propsFactory({
  controlReversed: Boolean,
  controlVariant: {
    type: String as PropType<ControlVariant>,
    default: 'default',
  },
  inset: Boolean,
  hideInput: Boolean,
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

    function incrementalClick () {
      model.value++
    }
    function decrementalClick () {
      model.value--
    }

    useRender(() => {
      const defaultControl = () => (
        <div
          class={[
            'v-number-input__control',
            'v-number-input__control--default',
          ]}
        >
          <VBtn
            icon="mdi-chevron-down"
            rounded="0"
            height="100%"
            size="small"
            onClick={ decrementalClick }
            flat
          />
          <VDivider vertical />
          <VBtn
            icon="mdi-chevron-up"
            height="100%"
            rounded="0"
            size="small"
            onClick={ incrementalClick }
            flat
          />
        </div>
      )

      const stackedControl = () => (
        <div
          class={[
            'v-number-input__control',
            'v-number-input__control--stacked',
          ]}
        >
          <VBtn
            flat
            height="auto"
            icon="mdi-chevron-down"
            rounded="0"
            size="small"
            onClick={ decrementalClick }
          />
          <VDivider />
          <VBtn
            flat
            height="auto"
            icon="mdi-chevron-up"
            onClick={ incrementalClick }
            rounded="0"
            size="small"
          />
        </div>
      )

      const getControlNode = () => {
        if (props.controlVariant === 'stacked') {
          return stackedControl
        } else {
          return defaultControl
        }
      }
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
                    }) => (
                      <input
                        type="number"
                        value={ model.value }
                        class={ fieldClass }
                      />
                    ),
                    'append-inner': props.controlVariant === 'split' ? () => (
                      <>
                        <VBtn
                          flat
                          height="auto"
                          icon="mdi-chevron-down"
                          rounded="0"
                          size="small"
                          onClick={ incrementalClick }
                        />
                      </>
                    ) : (!props.controlReversed ? getControlNode() : undefined),
                    'prepend-inner': props.controlVariant === 'split' ? () => (
                      <>
                        <VBtn
                          flat
                          height="auto"
                          icon="mdi-chevron-up"
                          rounded="0"
                          size="small"
                          onClick={ decrementalClick }
                        />
                      </>
                    ) : (props.controlReversed ? getControlNode() : undefined),
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
