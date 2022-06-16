// Styles
import './VSelectionControl.sass'

// Components
import { VIcon } from '@/components/VIcon'
import { VLabel } from '@/components/VLabel'
import { VSelectionControlGroupSymbol } from '@/components/VSelectionControlGroup/VSelectionControlGroup'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeThemeProps } from '@/composables/theme'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useTextColor } from '@/composables/color'
import { IconValue } from '@/composables/icons'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { computed, inject, ref } from 'vue'
import {
  deepEqual,
  filterInputAttrs,
  genericComponent,
  getUid,
  pick,
  propsFactory,
  SUPPORTS_FOCUS_VISIBLE,
  useRender,
  wrapInArray,
} from '@/util'

// Types
import type { ComputedRef, ExtractPropTypes, PropType, Ref, WritableComputedRef } from 'vue'
import type { MakeSlots } from '@/util'

export type SelectionControlSlot = {
  model: WritableComputedRef<any>
  isReadonly: ComputedRef<boolean>
  isDisabled: ComputedRef<boolean>
  textColorClasses: Ref<string[]>
  props: {
    onBlur: (e: Event) => void
    onFocus: (e: FocusEvent) => void
    id: string
  }
}

export const makeSelectionControlProps = propsFactory({
  color: String,
  disabled: Boolean,
  error: Boolean,
  id: String,
  inline: Boolean,
  label: String,
  falseIcon: IconValue,
  trueIcon: IconValue,
  ripple: {
    type: Boolean,
    default: true,
  },
  multiple: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
  name: String,
  readonly: Boolean,
  trueValue: null,
  falseValue: null,
  modelValue: null,
  type: String,
  value: null,
  valueComparator: {
    type: Function as PropType<typeof deepEqual>,
    default: deepEqual,
  },

  ...makeThemeProps(),
  ...makeDensityProps(),
})

export function useSelectionControl (
  props: ExtractPropTypes<ReturnType<typeof makeSelectionControlProps>> & {
    'onUpdate:modelValue': ((val: any) => void) | undefined
  }
) {
  const group = inject(VSelectionControlGroupSymbol, undefined)
  const { densityClasses } = useDensity(props)
  const modelValue = useProxiedModel(props, 'modelValue')
  const trueValue = computed(() => (
    props.trueValue !== undefined ? props.trueValue
    : props.value !== undefined ? props.value
    : true
  ))
  const falseValue = computed(() => props.falseValue !== undefined ? props.falseValue : false)
  const isMultiple = computed(() => (
    group?.multiple.value ||
    !!props.multiple ||
    (props.multiple == null && Array.isArray(modelValue.value))
  ))
  const model = computed({
    get () {
      const val = group ? group.modelValue.value : modelValue.value

      return isMultiple.value
        ? val.some((v: any) => props.valueComparator(v, trueValue.value))
        : props.valueComparator(val, trueValue.value)
    },
    set (val: boolean) {
      if (props.readonly) return

      const currentValue = val ? trueValue.value : falseValue.value

      let newVal = currentValue

      if (isMultiple.value) {
        newVal = val
          ? [...wrapInArray(modelValue.value), currentValue]
          : wrapInArray(modelValue.value).filter((item: any) => !props.valueComparator(item, trueValue.value))
      }

      if (group) {
        group.modelValue.value = newVal
      } else {
        modelValue.value = newVal
      }
    },
  })
  const { textColorClasses, textColorStyles } = useTextColor(computed(() => {
    return (
      model.value &&
      !props.error &&
      !props.disabled
    ) ? props.color : undefined
  }))
  const icon = computed(() => {
    return model.value
      ? group?.trueIcon.value ?? props.trueIcon
      : group?.falseIcon.value ?? props.falseIcon
  })

  return {
    group,
    densityClasses,
    trueValue,
    falseValue,
    model,
    textColorClasses,
    textColorStyles,
    icon,
  }
}

export const VSelectionControl = genericComponent<new <T>() => {
  $props: {
    modelValue?: T
    'onUpdate:modelValue'?: (val: T) => any
  }
  $slots: MakeSlots<{
    default: []
    input: [SelectionControlSlot]
  }>
}>()({
  name: 'VSelectionControl',

  directives: { Ripple },

  inheritAttrs: false,

  props: makeSelectionControlProps(),

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { attrs, slots }) {
    const {
      densityClasses,
      group,
      icon,
      model,
      textColorClasses,
      textColorStyles,
      trueValue,
    } = useSelectionControl(props)
    const uid = getUid()
    const id = computed(() => props.id || `input-${uid}`)
    const isFocused = ref(false)
    const isFocusVisible = ref(false)
    const input = ref<HTMLInputElement>()

    function onFocus (e: FocusEvent) {
      isFocused.value = true
      if (
        !SUPPORTS_FOCUS_VISIBLE ||
        (SUPPORTS_FOCUS_VISIBLE && (e.target as HTMLElement).matches(':focus-visible'))
      ) {
        isFocusVisible.value = true
      }
    }

    function onBlur () {
      isFocused.value = false
      isFocusVisible.value = false
    }

    useRender(() => {
      const label = slots.label
        ? slots.label({
          label: props.label,
          props: { for: id.value },
        })
        : props.label
      const type = group?.type.value ?? props.type
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)

      return (
        <div
          class={[
            'v-selection-control',
            {
              'v-selection-control--dirty': model.value,
              'v-selection-control--disabled': props.disabled,
              'v-selection-control--error': props.error,
              'v-selection-control--focused': isFocused.value,
              'v-selection-control--focus-visible': isFocusVisible.value,
              'v-selection-control--inline': group?.inline.value || props.inline,
            },
            densityClasses.value,
          ]}
          { ...rootAttrs }
        >
          <div
            class={[
              'v-selection-control__wrapper',
              textColorClasses.value,
            ]}
            style={ textColorStyles.value }
          >
            { slots.default?.() }

            <div
              class={[
                'v-selection-control__input',
              ]}
              v-ripple={ props.ripple && [
                !props.disabled && !props.readonly,
                null,
                ['center', 'circle'],
              ]}
            >
              { icon.value && <VIcon icon={ icon.value } /> }

              <input
                v-model={ model.value }
                ref={ input }
                disabled={ props.disabled }
                id={ id.value }
                onBlur={ onBlur }
                onFocus={ onFocus }
                aria-readonly={ props.readonly }
                type={ type }
                value={ trueValue.value }
                name={ group?.name.value ?? props.name }
                aria-checked={ type === 'checkbox' ? model.value : undefined }
                { ...inputAttrs }
              />

              { slots.input?.({
                model,
                textColorClasses,
                props: {
                  onFocus,
                  onBlur,
                  id: id.value,
                },
              }) }
            </div>
          </div>

          { label && (
            <VLabel for={ id.value }>
              { label }
            </VLabel>
          ) }
        </div>
      )
    })

    return {
      isFocused,
      input,
    }
  },
})

export type VSelectionControl = InstanceType<typeof VSelectionControl>

export function filterControlProps (props: ExtractPropTypes<ReturnType<typeof makeSelectionControlProps>>) {
  return pick(props, Object.keys(VSelectionControl.props) as any)
}
