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
import { computed, ref, watchEffect } from 'vue'
import { clamp, filterInputAttrs, genericComponent, getDecimals, only, propsFactory, useRender } from '@/util'

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
  min: {
    type: Number,
    default: -Infinity,
  },
  max: {
    type: Number,
    default: Infinity,
  },
  step: {
    type: Number,
    default: 1,
  },

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
      type: Number,
      default: undefined,
    },
  },

  emits: {
    'update:modelValue': (val: number) => true,
  },

  setup (props, { attrs, emit, slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const { isFocused, focus, blur } = useFocus(props)
    const inputRef = ref<HTMLInputElement>()

    const stepDecimals = computed(() => getDecimals(props.step))
    const modelDecimals = computed(() => model.value != null ? getDecimals(model.value) : 0)

    const canIncrease = computed(() => {
      if (model.value == null) return true
      return model.value + props.step <= props.max
    })
    const canDecrease = computed(() => {
      if (model.value == null) return true
      return model.value - props.step >= props.min
    })

    watchEffect(() => {
      if (model.value != null && (model.value < props.min || model.value > props.max)) {
        model.value = clamp(model.value, props.min, props.max)
      }
    })

    function onFocus () {
      if (!isFocused.value) focus()
    }

    const controlVariant = computed(() => {
      return props.hideInput ? 'stacked' : props.controlVariant
    })

    const incrementSlotProps = computed(() => ({ click: onClickUp }))

    const decrementSlotProps = computed(() => ({ click: onClickDown }))

    function toggleUpDown (increment = true) {
      if (model.value == null) {
        model.value = 0
        return
      }

      const decimals = Math.max(modelDecimals.value, stepDecimals.value)
      if (increment) {
        if (canIncrease.value) model.value = +(((model.value + props.step).toFixed(decimals)))
      } else {
        if (canDecrease.value) model.value = +(((model.value - props.step).toFixed(decimals)))
      }
    }

    function onClickUp () {
      toggleUpDown()
    }

    function onClickDown () {
      toggleUpDown(false)
    }

    function onKeydown (e: KeyboardEvent) {
      if (
        ['Enter', 'ArrowLeft', 'ArrowRight', 'Backspace'].includes(e.key) ||
        e.ctrlKey
      ) return

      if (['ArrowDown'].includes(e.key)) {
        e.preventDefault()
        toggleUpDown(false)
        return
      }
      if (['ArrowUp'].includes(e.key)) {
        e.preventDefault()
        toggleUpDown()
        return
      }

      // Only numbers, +, - & . are allowed
      if (!/^[0-9\-+.]+$/.test(e.key)) {
        e.preventDefault()
      }
    }

    function onInput (e: Event) {
      const el = e.target as HTMLInputElement
      model.value = el.value ? +(el.value) : undefined
    }

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
                  disabled={ !canDecrease.value }
                  flat
                  key="decrement-btn"
                  height={ defaultHeight }
                  name="decrement-btn"
                  icon="$expand"
                  size="small"
                  onClick={ onClickDown }
                />
              ) : (
                <VDefaultsProvider
                  key="decrement-defaults"
                  defaults={{
                    VBtn: {
                      flat: true,
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
                  disabled={ !canIncrease.value }
                  flat
                  key="increment-btn"
                  height={ defaultHeight }
                  name="increment-btn"
                  icon="$collapse"
                  onClick={ onClickUp }
                  size="small"
                />
              ) : (
                <VDefaultsProvider
                  key="increment-defaults"
                  defaults={{
                    VBtn: {
                      flat: true,
                      height: defaultHeight,
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
                      type="text"
                      value={ model.value }
                      onInput={ onInput }
                      onKeydown={ onKeydown }
                      class={ fieldClass }
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
