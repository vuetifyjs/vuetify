// Styles
import './VNumberInput.sass'

// Components
import { VBtn } from '../../components/VBtn'
import { VDefaultsProvider } from '../../components/VDefaultsProvider'
import { VDivider } from '../../components/VDivider'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'

// Composables
import { useForm } from '@/composables/form'
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, nextTick, onMounted, ref } from 'vue'
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
    type: [Number, String],
    default: Number.MIN_SAFE_INTEGER,
  },
  max: {
    type: [Number, String],
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
    const _model = useProxiedModel(props, 'modelValue')

    const min = computed(() => Math.max(Number.isFinite(parseFloat(props.min)) ? parseFloat(props.min) : Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER))
    const max = computed(() => Math.min(Number.isFinite(parseFloat(props.max)) ? parseFloat(props.max) : Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER))

    const model = computed({
      get: () => _model.value,
      // model.value could be empty string from VTextField
      // but _model.value should be eventually kept in type Number | null
      set (val: Number | null | string) {
        if (val === null || val === '') {
          _model.value = null
          return
        }

        const value = Number(val)
        if (!isNaN(value) && value <= max.value && value >= min.value) {
          _model.value = value
        }
      },
    })

    const vTextFieldRef = ref<VTextField | undefined>()

    const stepDecimals = computed(() => getDecimals(props.step))
    const modelDecimals = computed(() => typeof model.value === 'number' ? getDecimals(model.value) : 0)

    const form = useForm(props)
    const controlsDisabled = computed(() => (
      form.isDisabled.value || form.isReadonly.value
    ))

    const canIncrease = computed(() => {
      if (controlsDisabled.value) return false
      return (model.value ?? 0) as number + props.step <= max.value
    })
    const canDecrease = computed(() => {
      if (controlsDisabled.value) return false
      return (model.value ?? 0) as number - props.step >= min.value
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
      if (!controlsDisabled.value) {
        clampModel()
      }
    })

    function toggleUpDown (increment = true) {
      if (controlsDisabled.value) return
      if (model.value == null) {
        model.value = clamp(0, min.value, max.value)
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

    async function onKeydown (e: KeyboardEvent) {
      if (
        ['Enter', 'ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab'].includes(e.key) ||
        e.ctrlKey
      ) return

      if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault()
        clampModel()
        // _model is controlled, so need to wait until props['modelValue'] is updated
        await nextTick()
        if (e.key === 'ArrowDown') {
          toggleUpDown(false)
        } else {
          toggleUpDown()
        }
      }
    }

    function onControlMousedown (e: MouseEvent) {
      e.stopPropagation()
    }

    function clampModel () {
      if (!vTextFieldRef.value) return
      const inputText = vTextFieldRef.value.value
      if (inputText && !isNaN(+inputText)) {
        model.value = clamp(+(inputText), min.value, max.value)
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
            data-testid="increment"
            aria-hidden="true"
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
            data-testid="decrement"
            aria-hidden="true"
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
          ) : (props.reverse
            ? undefined
            : <>{ dividerNode() }{ controlNode() }</>)

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
          v-model={ model.value }
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

    return forwardRefs({}, vTextFieldRef)
  },
})

export type VNumberInput = InstanceType<typeof VNumberInput>
