// Styles
import './VNumberInput.sass'

// Components
import { VBtn } from '../VBtn'
import { VDivider } from '../VDivider'
import { allowedVariants, filterFieldProps, makeVFieldProps, VField } from '@/components/VField/VField'
import { makeVInputProps, VInput } from '@/components/VInput/VInput'

// Composables
import { useFocus } from '@/composables/focus'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref } from 'vue'
import { filterInputAttrs, genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { Variant, VFieldSlots } from '@/components/VField/VField'
import type { VInputSlots } from '@/components/VInput/VInput'

type VNumberInputSlots = Omit<VInputSlots & VFieldSlots, 'default'>

type ControlVariant = 'default' | 'stacked' | 'split'

const makeVNumberInputProps = propsFactory({
  controlReverse: Boolean,
  controlVariant: {
    type: String as PropType<ControlVariant>,
    default: 'default',
  },
  inset: Boolean,
  hideInput: Boolean,
  min: Number,
  max: Number,
  step: Number,
  ...makeVInputProps(),
  ...omit(makeVFieldProps(), ['appendInnerIcon', 'clearable', 'clearIcon', 'persistentClear', 'prependInnerIcon']),
  variant: {
    type: String as PropType<Variant>,
    default: 'filled',
    validator: (v: any) => allowedVariants.includes(v),
  },
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
    const { isFocused, focus, blur } = useFocus(props)
    const inputRef = ref<HTMLInputElement>()

    function onFocus () {
      if (!isFocused.value) focus()
    }

    const controlVariant = computed(() => {
      if (props.hideInput) return 'stacked'
      return props.controlVariant
    })

    const controlClasses = computed(() => {
      const classes: string[] = ['v-number-input__control']

      if (props.hideInput || props.inset) classes.push('v-number-input__control--borderless')

      return classes
    })

    function toggleUpDown (increment = true) {
      if (increment) {
        inputRef.value?.stepUp()
      } else {
        inputRef.value?.stepDown()
      }

      if (inputRef.value) model.value = parseInt(inputRef.value.value, 10)
    }

    useRender(() => {
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
      const controlNode = () => (
          <div
            class={ controlClasses.value }
          >
            <VBtn
              flat
              height={ controlVariant.value === 'stacked' ? 'auto' : '100%' }
              icon="mdi-chevron-down"
              rounded="0"
              size="small"
              onClick={ () => toggleUpDown(false) }
            />
            <VDivider
              vertical={ controlVariant.value !== 'stacked' }
            />
            <VBtn
              flat
              height={ controlVariant.value === 'stacked' ? 'auto' : '100%' }
              icon="mdi-chevron-up"
              onClick={ () => toggleUpDown() }
              rounded="0"
              size="small"
            />
          </div>
      )

      const fieldProps = filterFieldProps(props)
      const { modelValue: _, ...inputProps } = VInput.filterProps(props)

      return (
          <VInput
            class={[
              'v-number-input',
              {
                'v-number-input--control-reverse': props.controlReverse,
                'v-number-input--default': controlVariant.value === 'default',
                'v-number-input--hide-input': props.hideInput,
                'v-number-input--inset': props.inset,
                'v-number-input--split': controlVariant.value === 'split',
                'v-number-input--stacked': controlVariant.value === 'stacked',
              },
            ]}
            { ...rootAttrs }
            { ...inputProps }
            focused={ isFocused.value }
          >
            {{
              default: () => (
                <VField
                  { ...fieldProps }
                  active
                  focused={ isFocused.value }
                >
                  {{
                    default: ({
                      props: { class: fieldClass, ...slotProps },
                    }) => (
                      <input
                        ref={ inputRef }
                        type="number"
                        value={ model.value }
                        class={ fieldClass }
                        max={ props.max }
                        min={ props.min }
                        step={ props.step }
                        onFocus={ onFocus }
                        onBlur={ blur }
                        { ...inputAttrs }
                      />
                    ),
                    'append-inner': controlVariant.value === 'split' ? () => (
                      <div
                        class={
                          [
                            'v-number-input__control--borderless',
                            ...controlClasses.value,
                          ]
                        }
                      >
                        <VDivider vertical />
                        <VBtn
                          flat
                          height="100%"
                          icon="mdi-plus"
                          rounded="0"
                          onClick={ () => toggleUpDown() }
                        />
                      </div>
                    ) : (!props.controlReverse ? controlNode : undefined),
                    'prepend-inner': controlVariant.value === 'split' ? () => (
                      <div
                        class={[
                          'v-number-input__control--borderless',
                          ...controlClasses.value,
                        ]}
                      >
                        <VBtn
                          flat
                          height="100%"
                          icon="mdi-minus"
                          rounded="0"
                          onClick={ () => toggleUpDown(false) }
                        />
                        <VDivider vertical />
                      </div>
                    ) : (props.controlReverse ? controlNode : undefined),
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
