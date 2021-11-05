// Styles
import './VSelectionControl.sass'

// Components
import { VIcon } from '@/components/VIcon'
import { VFieldLabel } from '@/components/VField/VFieldLabel'

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
import { genericComponent, getUid, SUPPORTS_FOCUS_VISIBLE, useRender } from '@/util'

// Types
import type { ComputedRef, InjectionKey, WritableComputedRef } from 'vue'
import type { MakeSlots } from '@/util'

interface VSelectionGroupContext {
  name?: string
  onIcon?: string
  offIcon?: string
  type?: string
}

export const VSelectionGroupSymbol: InjectionKey<VSelectionGroupContext> = Symbol.for('vuetify:selection-group')

export type SelectionControlSlot = {
  model: WritableComputedRef<any>
  isReadonly: ComputedRef<boolean>
  isDisabled: ComputedRef<boolean>
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
    default: [SelectionControlSlot]
  }>
}>()({
  name: 'VSelectionControl',

  directives: { Ripple },

  inheritAttrs: false,

  props: {
    color: String,
    id: String,
    label: String,
    offIcon: String,
    onIcon: String,
    type: String,
    value: {
      type: null,
      default: undefined as any,
    },

    ...makeThemeProps(),
    ...makeDensityProps(),
    ...makeValidationProps(),
  },

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { attrs, slots }) {
    const group = inject(VSelectionGroupSymbol, {})
    const { densityClasses } = useDensity(props, 'v-selection-control')
    const { isDisabled, isReadonly, isValid, validationClasses } = useValidation(props, 'v-input')
    const model = useProxiedModel(props, 'modelValue')
    const uid = getUid()
    const { textColorClasses, textColorStyles } = useTextColor(computed(() => {
      return isValid.value || model.value ? props.color : undefined
    }))
    const icon = computed(() => {
      if (
        model.value && (
          model.value === props.value ||
          props.value == null
        )
      ) return group?.onIcon ?? props.onIcon

      return group?.offIcon ?? props.offIcon
    })

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
              'v-selection-control--focused': isFocused.value,
              'v-selection-control--focus-visible': isFocusVisible.value,
            },
            densityClasses.value,
            validationClasses.value,
          ]}
          { ...attrs }
        >
          <div
            class={[
              'v-selection-control__input',
              textColorClasses.value,
            ]}
            style={ textColorStyles.value }
            v-ripple={[
              !isDisabled.value && !isReadonly.value,
              null,
              ['center', 'circle'],
            ]}
          >
            <VIcon icon={ icon.value } />

            { slots.default
              ? slots.default?.({
                model,
                isReadonly,
                isDisabled,
                props: {
                  onFocus,
                  onBlur,
                  id: id.value,
                },
              }) : (
                <input
                  v-model={ model.value }
                  disabled={ isDisabled.value }
                  id={ id.value }
                  onBlur={ onBlur }
                  onFocus={ onFocus }
                  readonly={ isReadonly.value }
                  type={ group?.type ?? props.type }
                  value={ props.value }
                  name={ group?.name ?? props.name }
                />
              ) }
          </div>

          <VFieldLabel
            for={ id.value }
            style="position: static; pointer-events: auto; cursor: pointer;"
          >
            { label }
          </VFieldLabel>
        </div>
      )
    })

    return {}
  },
})

export type VSelectionControl = InstanceType<typeof VSelectionControl>
