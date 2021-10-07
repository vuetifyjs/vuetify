// Styles
import './VSelectionControl.sass'

// Components
import { VIcon } from '@/components/VIcon'
import { VFieldLabel } from '@/components/VField/VFieldLabel'

// Composables
import { useTextColor } from '@/composables/color'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeThemeProps } from '@/composables/theme'
import { makeValidationProps, useValidation } from '@/composables/validation'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { computed, ref } from 'vue'
import { genericComponent, getUid, SUPPORTS_FOCUS_VISIBLE, useRender } from '@/util'

// Types
import type { ComputedRef, WritableComputedRef } from 'vue'
import type { MakeSlots } from '@/util'

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
    offIcon: {
      type: String,
      required: true,
    },
    onIcon: {
      type: String,
      required: true,
    },

    ...makeThemeProps(),
    ...makeValidationProps(),
  },

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { attrs, slots }) {
    const { isDisabled, isReadonly, isValid } = useValidation(props, 'v-checkbox')
    const model = useProxiedModel(props, 'modelValue')
    const uid = getUid()
    const { textColorClasses, textColorStyles } = useTextColor(computed(() => {
      return isValid.value || model.value ? props.color : undefined
    }))
    const icon = computed(() => {
      return model.value ? props.onIcon : props.offIcon
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

    function onClick () {
      if (isDisabled.value || isReadonly.value) return

      model.value = !model.value
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
            onClick={ onClick }
          >
            <VIcon icon={ icon.value } />

            { slots.default?.({
              model,
              isReadonly,
              isDisabled,
              props: {
                onFocus,
                onBlur,
                id: id.value,
              },
            } as SelectionControlSlot) }
          </div>

          <VFieldLabel
            for={ id.value }
            style="position: static; pointer-events: auto; cursor: pointer;"
            onClick={ onClick }
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
