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
import { computed } from 'vue'
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

    const controlClasses = computed(() => {
      const classes: string[] = ['v-number-input__control']

      if (props.inset) classes.push('v-number-input__control--inset')

      return classes
    })

    function incrementalClick () {
      model.value++
    }
    function decrementalClick () {
      model.value--
    }

    useRender(() => {
      const controlNode = () => (
          <div
            class={ controlClasses.value }
          >
            <VBtn
              flat
              height={ props.controlVariant === 'stacked' ? 'auto' : '100%' }
              icon="mdi-chevron-down"
              rounded="0"
              size="small"
              onClick={ decrementalClick }
            />
            <VDivider
              vertical={ props.controlVariant !== 'stacked' }
            />
            <VBtn
              flat
              height={ props.controlVariant === 'stacked' ? 'auto' : '100%' }
              icon="mdi-chevron-up"
              onClick={ incrementalClick }
              rounded="0"
              size="small"
            />
          </div>
      )

      return (
          <VInput
            class={[
              'v-number-input',
              {
                'v-number-input--default': props.controlVariant === 'default',
                'v-number-input--stacked': props.controlVariant === 'stacked',
              },
            ]}
            style={ props.style }
          >
            {{
              default: () => (
                <VField
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
                      <div
                        class={ controlClasses.value }
                      >
                        <VDivider vertical />
                        <VBtn
                          flat
                          height="100%"
                          icon="mdi-plus"
                          rounded="0"
                          onClick={ incrementalClick }
                        />
                      </div>
                    ) : (!props.controlReversed ? controlNode : undefined),
                    'prepend-inner': props.controlVariant === 'split' ? () => (
                      <div
                        class={ controlClasses.value }
                      >
                        <VBtn
                          flat
                          height="100%"
                          icon="mdi-minus"
                          rounded="0"
                          onClick={ decrementalClick }
                        />
                        <VDivider vertical />
                      </div>
                    ) : (props.controlReversed ? controlNode : undefined),
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
