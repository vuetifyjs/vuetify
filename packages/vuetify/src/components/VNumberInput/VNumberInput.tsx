// Styles
import './VNumberInput.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VDivider } from '@/components/VDivider'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'

// Composables
import { useHold } from './hold'
import { useFocus } from '@/composables/focus'
import { useForm } from '@/composables/form'
import { forwardRefs } from '@/composables/forwardRefs'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, nextTick, onMounted, ref, shallowRef, toRef, watch, watchEffect } from 'vue'
import { clamp, escapeForRegex, extractNumber, genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VTextFieldSlots } from '@/components/VTextField/VTextField'

type ControlSlot = {
  props: Record<string, unknown>
}

type VNumberInputSlots = Omit<VTextFieldSlots, 'default'> & {
  increment: ControlSlot
  decrement: ControlSlot
}

type ControlVariant = 'default' | 'stacked' | 'split' | 'hidden'

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
    type: Number as PropType<number | null>,
    default: 0,
  },
  minFractionDigits: {
    type: Number as PropType<number | null>,
    default: null,
  },
  decimalSeparator: {
    type: String,
    validator: (v: any) => !v || v.length === 1,
  },

  ...omit(makeVTextFieldProps(), ['modelValue', 'validationValue']),
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
    const vTextFieldRef = ref<VTextField>()

    const { holdStart, holdStop } = useHold({ toggleUpDown })
    const form = useForm(props)
    const controlsDisabled = computed(() => (
      form.isDisabled.value || form.isReadonly.value
    ))

    const { isFocused, focus, blur } = useFocus(props)

    const { decimalSeparator: decimalSeparatorFromLocale } = useLocale()
    const decimalSeparator = computed(() => props.decimalSeparator?.[0] || decimalSeparatorFromLocale.value)

    function correctPrecision (val: number, precision = props.precision, trim = true) {
      const fixed = precision == null
        ? String(val)
        : val.toFixed(precision)

      if (isFocused.value && trim) {
        return Number(fixed).toString() // trim zeros
          .replace('.', decimalSeparator.value)
      }

      if (props.minFractionDigits === null || (precision !== null && precision < props.minFractionDigits)) {
        return fixed.replace('.', decimalSeparator.value)
      }

      let [baseDigits, fractionDigits] = fixed.split('.')

      fractionDigits = (fractionDigits ?? '').padEnd(props.minFractionDigits, '0')
        .replace(new RegExp(`(?<=\\d{${props.minFractionDigits}})0`, 'g'), '')

      return [
        baseDigits,
        fractionDigits,
      ].filter(Boolean).join(decimalSeparator.value)
    }

    const model = useProxiedModel(props, 'modelValue', null,
      val => val ?? null,
      val => val == null
        ? val ?? null
        : clamp(Number(val), props.min, props.max)
    )

    const _inputText = shallowRef<string | null>(null)
    watchEffect(() => {
      if (isFocused.value && !controlsDisabled.value) {
        // ignore external changes
      } else if (model.value == null) {
        _inputText.value = null
      } else if (!isNaN(model.value)) {
        _inputText.value = correctPrecision(model.value)
      }
    })
    const inputText = computed<string | null>({
      get: () => _inputText.value,
      set (val) {
        if (val === null || val === '') {
          model.value = null
          _inputText.value = null
          return
        }
        const parsedValue = Number(val.replace(decimalSeparator.value, '.'))
        if (!isNaN(parsedValue) && parsedValue <= props.max && parsedValue >= props.min) {
          model.value = parsedValue
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

    const incrementIcon = toRef(() => controlVariant.value === 'split' ? '$plus' : '$collapse')
    const decrementIcon = toRef(() => controlVariant.value === 'split' ? '$minus' : '$expand')
    const controlNodeSize = toRef(() => controlVariant.value === 'split' ? 'default' : 'small')
    const controlNodeDefaultHeight = toRef(() => controlVariant.value === 'stacked' ? 'auto' : '100%')

    const incrementSlotProps = {
      props: {
        style: { touchAction: 'none' },
        onClick: onControlClick,
        onPointerup: onControlMouseup,
        onPointerdown: onUpControlMousedown,
      },
    }
    const decrementSlotProps = {
      props: {
        style: { touchAction: 'none' },
        onClick: onControlClick,
        onPointerup: onControlMouseup,
        onPointerdown: onDownControlMousedown,
      },
    }

    watch(() => props.precision, () => formatInputValue())
    watch(() => props.minFractionDigits, () => formatInputValue())

    onMounted(() => {
      clampModel()
    })

    function inferPrecision (value: number | null) {
      if (value == null) return 0
      const str = value.toString()
      const idx = str.indexOf('.')
      return ~idx ? str.length - idx : 0
    }

    function toggleUpDown (increment = true) {
      if (controlsDisabled.value) return
      if (model.value == null) {
        inputText.value = correctPrecision(clamp(0, props.min, props.max))
        return
      }

      let inferredPrecision = Math.max(inferPrecision(model.value), inferPrecision(props.step))
      if (props.precision != null) inferredPrecision = Math.max(inferredPrecision, props.precision)
      if (increment) {
        if (canIncrease.value) inputText.value = correctPrecision(model.value + props.step, inferredPrecision)
      } else {
        if (canDecrease.value) inputText.value = correctPrecision(model.value - props.step, inferredPrecision)
      }
    }

    function onBeforeinput (e: InputEvent) {
      if (!e.data) return
      const inputElement = e.target as HTMLInputElement
      const { value: existingTxt, selectionStart, selectionEnd } = inputElement ?? {}

      const potentialNewInputVal =
        existingTxt
          ? existingTxt.slice(0, selectionStart as number | undefined) + e.data + existingTxt.slice(selectionEnd as number | undefined)
          : e.data

      const potentialNewNumber = extractNumber(potentialNewInputVal, props.precision, decimalSeparator.value)

      // Allow only numbers, "-" and {decimal separator}
      // Allow "-" and {decimal separator} only once
      // Allow "-" only at the start

      if (!new RegExp(`^-?\\d*${escapeForRegex(decimalSeparator.value)}?\\d*$`).test(potentialNewInputVal)) {
        e.preventDefault()
        inputElement!.value = potentialNewNumber
      }

      if (props.precision == null) return

      // Ignore decimal digits above precision limit
      if (potentialNewInputVal.split(decimalSeparator.value)[1]?.length > props.precision) {
        e.preventDefault()
        inputElement!.value = potentialNewNumber
      }
      // Ignore decimal separator when precision = 0
      if (props.precision === 0 && potentialNewInputVal.includes(decimalSeparator.value)) {
        e.preventDefault()
        inputElement!.value = potentialNewNumber
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

    function onControlClick (e: MouseEvent) {
      e.stopPropagation()
    }

    function onControlMouseup (e: PointerEvent) {
      const el = e.currentTarget as HTMLElement
      el?.releasePointerCapture(e.pointerId)
      e.preventDefault()
      e.stopPropagation()
      holdStop()
    }

    function onUpControlMousedown (e: PointerEvent) {
      const el = e.currentTarget as HTMLElement
      el?.setPointerCapture(e.pointerId)
      e.preventDefault()
      e.stopPropagation()
      holdStart('up')
    }

    function onDownControlMousedown (e: PointerEvent) {
      const el = e.currentTarget as HTMLElement
      el?.setPointerCapture(e.pointerId)
      e.preventDefault()
      e.stopPropagation()
      holdStart('down')
    }

    function clampModel () {
      if (controlsDisabled.value) return
      if (!vTextFieldRef.value) return
      const actualText = vTextFieldRef.value.value
      const parsedValue = Number(actualText.replace(decimalSeparator.value, '.'))
      if (actualText && !isNaN(parsedValue)) {
        inputText.value = correctPrecision(clamp(parsedValue, props.min, props.max))
      } else {
        inputText.value = null
      }
    }

    function formatInputValue () {
      if (controlsDisabled.value) return
      inputText.value = model.value !== null && !isNaN(model.value)
        ? correctPrecision(model.value, props.precision, false)
        : null
    }

    function trimDecimalZeros () {
      if (controlsDisabled.value) return
      if (model.value === null || isNaN(model.value)) {
        inputText.value = null
        return
      }
      inputText.value = model.value.toString()
        .replace('.', decimalSeparator.value)
    }

    function onFocus () {
      focus()
      trimDecimalZeros()
    }

    function onBlur () {
      blur()
      clampModel()
    }

    useRender(() => {
      const { modelValue: _, ...textFieldProps } = VTextField.filterProps(props)

      function incrementControlNode () {
        return !slots.increment ? (
          <VBtn
            aria-hidden="true"
            data-testid="increment"
            disabled={ !canIncrease.value }
            flat
            height={ controlNodeDefaultHeight.value }
            icon={ incrementIcon.value }
            key="increment-btn"
            onClick={ onControlClick }
            onPointerdown={ onUpControlMousedown }
            onPointerup={ onControlMouseup }
            size={ controlNodeSize.value }
            style="touch-action: none"
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
            { slots.increment(incrementSlotProps) }
          </VDefaultsProvider>
        )
      }

      function decrementControlNode () {
        return !slots.decrement ? (
          <VBtn
            aria-hidden="true"
            data-testid="decrement"
            disabled={ !canDecrease.value }
            flat
            height={ controlNodeDefaultHeight.value }
            icon={ decrementIcon.value }
            key="decrement-btn"
            onClick={ onControlClick }
            onPointerdown={ onDownControlMousedown }
            onPointerup={ onControlMouseup }
            size={ controlNodeSize.value }
            style="touch-action: none"
            tabindex="-1"
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
            { slots.decrement(decrementSlotProps) }
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
          ) : (props.reverse || controlVariant.value === 'hidden'
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
          ) : (props.reverse && controlVariant.value !== 'hidden'
            ? <>{ controlNode() }{ dividerNode() }</>
            : undefined)

      const hasPrependInner = slots['prepend-inner'] || prependInnerControl

      return (
        <VTextField
          ref={ vTextFieldRef }
          v-model={ inputText.value }
          validationValue={ model.value }
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
