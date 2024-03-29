// Styles
import './VNumberInput.sass'

// Components
import { VBtn } from '../../components/VBtn'
import { VDefaultsProvider } from '../../components/VDefaultsProvider'
import { VDivider } from '../../components/VDivider'
import { filterFieldProps, makeVFieldProps, VField } from '@/components/VField/VField'
import { makeVInputProps, VInput } from '@/components/VInput/VInput'

// Composables
import { makeFocusProps, useFocus } from '@/composables/focus'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref } from 'vue'
import { filterInputAttrs, genericComponent, only, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VFieldSlots } from '@/components/VField/VField'
import type { VInputSlots } from '@/components/VInput/VInput'

type ControlSlot = {
  click: () => void
}

type VNumberInputSlots = Omit<VInputSlots & VFieldSlots, 'default'> & {
  increment: ControlSlot
  decrement: ControlSlot
}

type ControlVariant = 'default' | 'stacked' | 'split'

const makeVNumberInputProps = propsFactory({
  controlVariant: {
    type: String as PropType<ControlVariant>,
    default: 'default',
  },
  inset: Boolean,
  hideInput: Boolean,
  min: Number,
  max: Number,
  step: Number,

  ...only(makeVInputProps(), [
    'density',
    'disabled',
    'focused',
    'hideDetails',
    'hint',
    'label',
    'persistentHint',
    'readonly',
  ]),
  ...only(makeVFieldProps(), [
    'baseColor',
    'bgColor',
    'class',
    'color',
    'disabled',
    'error',
    'loading',
    'reverse',
    'rounded',
    'style',
    'theme',
    'variant',
  ]),
  ...makeFocusProps(),
}, 'VNumberInput')

export const VNumberInput = genericComponent<VNumberInputSlots>()({
  name: 'VNumberInput',

  inheritAttrs: false,

  props: {
    ...makeVNumberInputProps(),

    modelValue: {
      type: [Number, String],
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
      return props.hideInput ? 'stacked' : props.controlVariant
    })

    function toggleUpDown (increment = true) {
      if (increment) {
        inputRef.value?.stepUp()
      } else {
        inputRef.value?.stepDown()
      }

      if (inputRef.value) model.value = parseInt(inputRef.value.value, 10)
    }

    function onClickUp () {
      toggleUpDown()
    }

    function onClickDown () {
      toggleUpDown(false)
    }

    const incrementSlotProps = computed(() => ({ click: onClickUp }))

    const decrementSlotProps = computed(() => ({ click: onClickDown }))

    useRender(() => {
      const fieldProps = filterFieldProps(props)
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
      const { modelValue: _, ...inputProps } = VInput.filterProps(props)

      function controlNode () {
        const defaultHeight = controlVariant.value === 'stacked' ? 'auto' : '100%'
        return (
          <div class="v-number-input__control">
            {
              !slots.decrement ? (
                <VBtn
                  flat
                  key="decrement-btn"
                  height={ defaultHeight }
                  icon="$expand"
                  rounded="0"
                  size="small"
                  onClick={ onClickDown }
                />
              ) : (
                <VDefaultsProvider
                  key="decrement-defaults"
                  defaults={{
                    VBtn: {
                      flat: true,
                      rounded: '0',
                      height: defaultHeight,
                      size: 'small',
                      icon: '$expand',
                    },
                  }}
                >
                  { slots.decrement(decrementSlotProps.value) }
                </VDefaultsProvider>
              )
            }

            <VDivider
              vertical={ controlVariant.value !== 'stacked' }
            />

            {
              !slots.increment ? (
                <VBtn
                  flat
                  key="increment-btn"
                  height={ defaultHeight }
                  icon="$collapse"
                  onClick={ onClickUp }
                  rounded="0"
                  size="small"
                />
              ) : (
                <VDefaultsProvider
                  key="increment-defaults"
                  defaults={{
                    VBtn: {
                      flat: true,
                      height: defaultHeight,
                      rounded: '0',
                      size: 'small',
                      icon: '$collapse',
                    },
                  }}
                >
                  { slots.increment(incrementSlotProps.value) }
                </VDefaultsProvider>
              )
            }
          </div>
        )
      }

      function dividerNode () {
        return !props.hideInput && !props.inset ? <VDivider vertical /> : undefined
      }

      return (
        <VInput
          class={[
            'v-number-input',
            {
              'v-number-input--default': controlVariant.value === 'default',
              'v-number-input--hide-input': props.hideInput,
              'v-number-input--inset': props.inset,
              'v-number-input--reverse': props.reverse,
              'v-number-input--split': controlVariant.value === 'split',
              'v-number-input--stacked': controlVariant.value === 'stacked',
            },
            props.class,
          ]}
          { ...rootAttrs }
          { ...inputProps }
          focused={ isFocused.value }
          style={ props.style }
        >
          {{
            ...slots,
            default: () => (
              <VField
                { ...fieldProps }
                active
                focused={ isFocused.value }
              >
                {{
                  ...slots,
                  default: ({
                    props: { class: fieldClass, ...slotProps },
                  }) => (
                    <input
                      ref={ inputRef }
                      type="number"
                      v-model={ model.value }
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
                    <div class="v-number-input__control">
                      <VDivider vertical />

                      <VBtn
                        flat
                        height="100%"
                        icon="$plus"
                        tile
                        onClick={ onClickUp }
                      />
                    </div>
                  ) : (!props.reverse
                    ? () => <>{ dividerNode() }{ controlNode() }</>
                    : undefined),
                  'prepend-inner': controlVariant.value === 'split' ? () => (
                    <div class="v-number-input__control">
                      <VBtn
                        flat
                        height="100%"
                        icon="$minus"
                        tile
                        onClick={ onClickDown }
                      />

                      <VDivider vertical />
                    </div>
                  ) : (props.reverse
                    ? () => <>{ controlNode() }{ dividerNode() }</>
                    : undefined),
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
