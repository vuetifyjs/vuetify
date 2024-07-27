// Styles
import './VNumberInput.sass'

// Components
import { VBtn } from '../../components/VBtn'
import { VDefaultsProvider } from '../../components/VDefaultsProvider'
import { VDivider } from '../../components/VDivider'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'

// Composables
import { useForm } from '@/composables/form'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, onMounted, ref } from 'vue'
import { clamp, genericComponent, getDecimals, omit, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VTextFieldSlots } from '@/components/VTextField/VTextField'

type ControlSlot = {
  click: (e: MouseEvent) => void
}

type VNumberInputSlots = Omit<VTextFieldSlots, 'default'> & {
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
  modelValue: {
    type: Number as PropType<Number | null>,
    default: null,
  },
  min: {
    type: Number,
    default: Number.MIN_SAFE_INTEGER,
  },
  max: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER,
  },
  step: {
    type: Number,
    default: 1,
  },

  ...omit(makeVTextFieldProps({}), ['appendInnerIcon', 'modelValue', 'prependInnerIcon']),
}, 'VNumberInput')

export const VNumberInput = genericComponent<VNumberInputSlots>()({
  name: 'VNumberInput',

  props: {
    ...makeVNumberInputProps(),
  },

  emits: {
    'update:modelValue': (val: number) => true,
  },

  setup (props, { slots }) {
    const model = useProxiedModel(props, 'modelValue')

    const vTextFieldRef = ref<VTextField | undefined>()

    const stepDecimals = computed(() => getDecimals(props.step))
    const modelDecimals = computed(() => typeof model.value === 'number' ? getDecimals(model.value) : 0)

    const form = useForm()
    const controlsDisabled = computed(() => (
      props.disabled || props.readonly || form?.isReadonly.value
    ))

    const canIncrease = computed(() => {
      if (controlsDisabled.value) return false
      return (model.value ?? 0) as number + props.step <= props.max
    })
    const canDecrease = computed(() => {
      if (controlsDisabled.value) return false
      return (model.value ?? 0) as number - props.step >= props.min
    })

    const controlVariant = computed(() => {
      return props.hideInput ? 'stacked' : props.controlVariant
    })

    const incrementIcon = computed(() => controlVariant.value === 'split' ? '$plus' : '$collapse')
    const decrementIcon = computed(() => controlVariant.value === 'split' ? '$minus' : '$expand')
    const controlNodeSize = computed(() => controlVariant.value === 'split' ? 'default' : 'small')
    const controlNodeDefaultHeight = computed(() => controlVariant.value === 'stacked' ? 'auto' : '100%')

    const incrementSlotProps = computed(() => ({ click: onClickUp }))

    const decrementSlotProps = computed(() => ({ click: onClickDown }))

    onMounted(() => {
      if (!props.readonly && !props.disabled) {
        clampModel()
      }
    })

    function toggleUpDown (increment = true) {
      if (controlsDisabled.value) return
      if (model.value == null) {
        model.value = clamp(0, props.min, props.max)
        return
      }

      const decimals = Math.max(modelDecimals.value, stepDecimals.value)
      if (increment) {
        if (canIncrease.value) model.value = +((((model.value as number) + props.step).toFixed(decimals)))
      } else {
        if (canDecrease.value) model.value = +((((model.value as number) - props.step).toFixed(decimals)))
      }
    }

    function onClickUp (e: MouseEvent) {
      e.stopPropagation()
      toggleUpDown()
    }

    function onClickDown (e: MouseEvent) {
      e.stopPropagation()
      toggleUpDown(false)
    }

    function onBeforeinput (e: InputEvent) {
      if (!e.data) return
      const existingTxt = (e.target as HTMLInputElement)?.value
      const selectionStart = (e.target as HTMLInputElement)?.selectionStart
      const selectionEnd = (e.target as HTMLInputElement)?.selectionEnd
      const potentialNewInputVal =
        existingTxt
          ? existingTxt.slice(0, selectionStart as number | undefined) + e.data + existingTxt.slice(selectionEnd as number | undefined)
          : e.data
      // Only numbers, "-", "." are allowed
      // AND "-", "." are allowed only once
      // AND "-" is only allowed at the start
      if (!/^-?(\d+(\.\d*)?|(\.\d+)|\d*|\.)$/.test(potentialNewInputVal)) {
        e.preventDefault()
      }
    }

    function onKeydown (e: KeyboardEvent) {
      if (
        ['Enter', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab'].includes(e.key) ||
        e.ctrlKey
      ) return

      if (['ArrowDown'].includes(e.key)) {
        e.preventDefault()
        toggleUpDown(false)
      }
      if (['ArrowUp'].includes(e.key)) {
        e.preventDefault()
        toggleUpDown()
      }
    }

    function onControlMousedown (e: MouseEvent) {
      e.stopPropagation()
    }

    function clampModel () {
      if (!vTextFieldRef.value) return
      const inputText = vTextFieldRef.value.value
      if (inputText && !isNaN(+inputText)) {
        model.value = clamp(+(inputText), props.min, props.max)
      } else {
        model.value = null
      }
    }

    useRender(() => {
      const { modelValue: _, ...textFieldProps } = VTextField.filterProps(props)

      function incrementControlNode () {
        return !slots.increment ? (
          <VBtn
            disabled={ !canIncrease.value }
            flat
            key="increment-btn"
            height={ controlNodeDefaultHeight.value }
            name="increment-btn"
            icon={ incrementIcon.value }
            onClick={ onClickUp }
            onMousedown={ onControlMousedown }
            size={ controlNodeSize.value }
            tabindex="-1"
          />
        ) : (
          <VDefaultsProvider
            key="increment-defaults"
            defaults={{
              VBtn: {
                disabled: !canIncrease.value,
                flat: true,
                height: controlNodeDefaultHeight.value,
                size: controlNodeSize.value,
                icon: incrementIcon.value,
              },
            }}
          >
            { slots.increment(incrementSlotProps.value) }
          </VDefaultsProvider>
        )
      }

      function decrementControlNode () {
        return !slots.decrement ? (
          <VBtn
            disabled={ !canDecrease.value }
            flat
            key="decrement-btn"
            height={ controlNodeDefaultHeight.value }
            name="decrement-btn"
            icon={ decrementIcon.value }
            size={ controlNodeSize.value }
            tabindex="-1"
            onClick={ onClickDown }
            onMousedown={ onControlMousedown }
          />
        ) : (
          <VDefaultsProvider
            key="decrement-defaults"
            defaults={{
              VBtn: {
                disabled: !canDecrease.value,
                flat: true,
                height: controlNodeDefaultHeight.value,
                size: controlNodeSize.value,
                icon: decrementIcon.value,
              },
            }}
          >
            { slots.decrement(decrementSlotProps.value) }
          </VDefaultsProvider>
        )
      }

      function controlNode () {
        return (
          <div class="v-number-input__control">
            { decrementControlNode() }

            <VDivider
              vertical={ controlVariant.value !== 'stacked' }
            />

            { incrementControlNode() }
          </div>
        )
      }

      function dividerNode () {
        return !props.hideInput && !props.inset ? <VDivider vertical /> : undefined
      }

      const appendInnerControl =
        controlVariant.value === 'split'
          ? (
            <div class="v-number-input__control">
              <VDivider vertical />

              { incrementControlNode() }
            </div>
          ) : (!props.reverse
            ? <>{ dividerNode() }{ controlNode() }</>
            : undefined)

      const hasAppendInner = slots['append-inner'] || appendInnerControl

      const prependInnerControl =
        controlVariant.value === 'split'
          ? (
            <div class="v-number-input__control">
              { decrementControlNode() }

              <VDivider vertical />
            </div>
          ) : (props.reverse
            ? <>{ controlNode() }{ dividerNode() }</>
            : undefined)

      const hasPrependInner = slots['prepend-inner'] || prependInnerControl

      return (
        <VTextField
          ref={ vTextFieldRef }
          modelValue={ model.value }
          onBeforeinput={ onBeforeinput }
          onChange={ clampModel }
          onKeydown={ onKeydown }
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
          { ...textFieldProps }
          style={ props.style }
          inputmode="decimal"
        >
          {{
            ...slots,
            'append-inner': hasAppendInner ? (...args) => (
              <>
                { slots['append-inner']?.(...args) }
                { appendInnerControl }
              </>
            ) : undefined,
            'prepend-inner': hasPrependInner ? (...args) => (
              <>
                { prependInnerControl }
                { slots['prepend-inner']?.(...args) }
              </>
            ) : undefined,
          }}
        </VTextField>
      )
    })
  },
})

export type VNumberInput = InstanceType<typeof VNumberInput>
