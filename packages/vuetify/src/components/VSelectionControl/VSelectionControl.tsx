// Styles
import './VSelectionControl.sass'

// Components
import { VIcon } from '@/components/VIcon'
import { VLabel } from '@/components/VLabel'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeThemeProps } from '@/composables/theme'
import { makeValidationProps, useValidation } from '@/composables/validation'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useTextColor } from '@/composables/color'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { computed, inject, ref } from 'vue'
import { deepEqual, genericComponent, getUid, SUPPORTS_FOCUS_VISIBLE, useRender } from '@/util'

// Types
import type { ComputedRef, PropType, Ref, WritableComputedRef } from 'vue'
import type { MakeSlots } from '@/util'
import { VSelectionControlGroupSymbol } from '../VSelectionControlGroup/VSelectionControlGroup'

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

  props: {
    color: String,
    id: String,
    inline: Boolean,
    label: String,
    offIcon: String,
    onIcon: String,
    ripple: {
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: null,
    },
    trueValue: {
      type: null,
      default: undefined as any,
    },
    falseValue: {
      type: null,
      default: undefined as any,
    },
    type: String,
    value: {
      type: null,
      default: undefined as any,
    },
    valueComparator: {
      type: Function as PropType<typeof deepEqual>,
      default: deepEqual,
    },

    ...makeThemeProps(),
    ...makeDensityProps(),
    ...makeValidationProps(),
  },

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { attrs, slots }) {
    const group = inject(VSelectionControlGroupSymbol, undefined)
    const { densityClasses } = useDensity(props, 'v-selection-control')
    const { isDisabled, isReadonly, isValid, validationClasses } = useValidation(props, 'v-selection-control')
    const modelValue = useProxiedModel(props, 'modelValue')
    const trueValue = computed(() => (
      props.trueValue !== undefined ? props.trueValue
      : props.value !== undefined ? props.value
      : true
    ))
    const falseValue = computed(() => props.falseValue !== undefined ? props.falseValue : false)
    const isMultiple = computed(() => (
      group?.multiple.value ||
      props.multiple ||
      Array.isArray(modelValue.value)
    ))
    const model = computed({
      get () {
        const val = group ? group.modelValue.value : modelValue.value

        return isMultiple.value
          ? val.some((v: any) => props.valueComparator(v, trueValue.value))
          : props.valueComparator(val, trueValue.value)
      },
      set (val: boolean) {
        const currentValue = val ? trueValue.value : falseValue.value

        let newVal = currentValue

        if (isMultiple.value) {
          newVal = val
            ? [currentValue, ...modelValue.value]
            : modelValue.value.filter((item: any) => !props.valueComparator(item, trueValue.value))
        }

        if (group?.modelValue) {
          group.modelValue.value = newVal
        } else {
          modelValue.value = newVal
        }
      },
    })
    const { textColorClasses, textColorStyles } = useTextColor(computed(() => {
      return model.value && isValid.value !== false ? props.color : undefined
    }))
    const icon = computed(() => {
      return model.value
        ? group?.onIcon?.value ?? props.onIcon
        : group?.offIcon?.value ?? props.offIcon
    })

    const uid = getUid()
    const id = computed(() => props.id || `input-${uid}`)
    const isFocused = ref(false)
    const isFocusVisible = ref(false)

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

      return (
        <div
          class={[
            'v-selection-control',
            {
              'v-selection-control--dirty': model.value,
              'v-selection-control--focused': isFocused.value,
              'v-selection-control--focus-visible': isFocusVisible.value,
              'v-selection-control--inline': group?.inline || props.inline,
            },
            densityClasses.value,
            textColorClasses.value,
            validationClasses.value,
          ]}
        >
          { slots.default?.() }

          <div class="v-selection-control__wrapper">
            <div
              class={[
                'v-selection-control__input',
              ]}
              style={ textColorStyles.value }
              v-ripple={ props.ripple && [
                !isDisabled.value && !isReadonly.value,
                null,
                ['center', 'circle'],
              ]}
            >
              { icon.value && <VIcon icon={ icon.value } /> }

              <input
                v-model={ model.value }
                disabled={ isDisabled.value }
                id={ id.value }
                onBlur={ onBlur }
                onFocus={ onFocus }
                readonly={ isReadonly.value }
                type={ group?.type?.value ?? props.type }
                value={ trueValue.value }
                name={ group?.name?.value ?? props.name }
                { ...attrs }
              />

              { slots.input?.({
                model,
                isReadonly,
                isDisabled,
                textColorClasses,
                props: {
                  onFocus,
                  onBlur,
                  id: id.value,
                },
              }) }
            </div>
          </div>

          <VLabel
            disabled={ isDisabled.value }
            error={ isValid.value === false }
            for={ id.value }
          >
            { label }
          </VLabel>
        </div>
      )
    })

    return {}
  },
})

export type VSelectionControl = InstanceType<typeof VSelectionControl>
