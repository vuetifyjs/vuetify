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
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { clamp, genericComponent, omit, propsFactory, useRender } from '@/util'

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
    type: Number as PropType<number | null>,
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
  precision: {
    type: Number,
    default: 0,
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
    const vTextFieldRef = ref<VTextField | undefined>()
    const _inputText = ref<string | null>(null)

    const form = useForm(props)
    const controlsDisabled = computed(() => (
      form.isDisabled.value || form.isReadonly.value
    ))

    const isFocused = ref(false)
    function correctPrecision (val: number) {
      return isFocused.value
        ? Number(val.toFixed(props.precision)).toString() // trim zeros
        : val.toFixed(props.precision)
    }

    const model = useProxiedModel(props, 'modelValue', null,
      val => {
        if (isFocused.value && !controlsDisabled.value) {
          // ignore external changes
        } else if (val == null || controlsDisabled.value) {
          _inputText.value = val && !isNaN(val) ? String(val) : null
        } else if (!isNaN(val)) {
          _inputText.value = correctPrecision(val)
        }
        return val ?? null
      },
      val => val == null
        ? val ?? null
        : clamp(+val, props.min, props.max)
    )

    watch(model, () => {
      // ensure proxiedModel transformIn is being called when readonly
    }, { immediate: true })

    const inputText = computed<string | null>({
      get: () => _inputText.value,
      set (val) {
        if (val === null || val === '') {
          model.value = null
          _inputText.value = null
          return
        }

        if (!isNaN(+val) && +val <= props.max && +val >= props.min) {
          model.value = val as any
          _inputText.value = val
        }
      },
    })

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

    watch(() => props.precision, () => formatInputValue())

    onMounted(() => {
      clampModel()
    })

    function toggleUpDown (increment = true) {
      if (controlsDisabled.value) return
      if (model.value == null) {
        inputText.value = correctPrecision(clamp(0, props.min, props.max))
        return
      }

      if (increment) {
        if (canIncrease.value) inputText.value = correctPrecision(model.value + props.step)
      } else {
        if (canDecrease.value) inputText.value = correctPrecision(model.value - props.step)
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
      // Ignore decimal digits above precision limit
      if (potentialNewInputVal.split('.')[1]?.length > props.precision) {
        e.preventDefault()
      }
      // Ignore decimal separator when precision = 0
      if (props.precision === 0 && potentialNewInputVal.includes('.')) {
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
      if (controlsDisabled.value) return
      if (!vTextFieldRef.value) return
      const actualText = vTextFieldRef.value.value
      if (actualText && !isNaN(+actualText)) {
        inputText.value = correctPrecision(clamp(+actualText, props.min, props.max))
      } else {
        inputText.value = null
      }
    }

    function formatInputValue () {
      if (controlsDisabled.value) return
      if (model.value === null || isNaN(model.value)) {
        inputText.value = null
        return
      }
      inputText.value = model.value.toFixed(props.precision)
    }

    function trimDecimalZeros () {
      if (controlsDisabled.value) return
      if (model.value === null || isNaN(model.value)) {
        inputText.value = null
        return
      }
      inputText.value = model.value.toString()
    }

    function onFocus () {
      isFocused.value = true
      trimDecimalZeros()
    }

    function onBlur () {
      isFocused.value = false
      clampModel()
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
          v-model={ inputText.value }
          onBeforeinput={ onBeforeinput }
          onFocus={ onFocus }
          onBlur={ onBlur }
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
