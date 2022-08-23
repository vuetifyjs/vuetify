// Styles
import './VInput.sass'

// Components
import { VMessages } from '@/components/VMessages'

// Composables
import { IconValue } from '@/composables/icons'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeValidationProps, useValidation } from '@/composables/validation'

// Utilities
import { computed } from 'vue'
import { EventProp, genericComponent, getUid, isOn, pick, propsFactory, useRender } from '@/util'

// Types
import type { ComputedRef, PropType, Ref } from 'vue'
import type { MakeSlots } from '@/util'
import { useInputIcon } from '@/components/VInput/InputIcon'

export interface VInputSlot {
  id: ComputedRef<string>
  isDirty: ComputedRef<boolean>
  isDisabled: ComputedRef<boolean>
  isReadonly: ComputedRef<boolean>
  isPristine: Ref<boolean>
  isValid: ComputedRef<boolean | null>
  isValidating: Ref<boolean>
  reset: () => void
  resetValidation: () => void
  validate: () => void
}

export const makeVInputProps = propsFactory({
  id: String,
  appendIcon: IconValue,
  prependIcon: IconValue,
  hideDetails: [Boolean, String] as PropType<boolean | 'auto'>,
  messages: {
    type: [Array, String] as PropType<string | string[]>,
    default: () => ([]),
  },
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
    validator: (v: any) => ['horizontal', 'vertical'].includes(v),
  },

  'onClick:prepend': EventProp,
  'onClick:append': EventProp,

  ...makeDensityProps(),
  ...makeValidationProps(),
})

export type VInputSlots = MakeSlots<{
  default: [VInputSlot]
  prepend: [VInputSlot]
  append: [VInputSlot]
  details: [VInputSlot]
}>

export const VInput = genericComponent<new <T>() => {
  $slots: VInputSlots
}>()({
  name: 'VInput',

  props: {
    ...makeVInputProps(),
  },

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { attrs, slots, emit }) {
    const { densityClasses } = useDensity(props)
    const { InputIcon } = useInputIcon(props)

    const uid = getUid()
    const id = computed(() => props.id || `input-${uid}`)

    const {
      errorMessages,
      isDirty,
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      reset,
      resetValidation,
      validate,
      validationClasses,
    } = useValidation(props, 'v-input', id)

    const slotProps = computed<VInputSlot>(() => ({
      id,
      isDirty,
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      reset,
      resetValidation,
      validate,
    }))

    useRender(() => {
      const hasPrepend = !!(slots.prepend || props.prependIcon)
      const hasAppend = !!(slots.append || props.appendIcon)
      const hasMessages = !!(
        props.messages?.length ||
        errorMessages.value.length
      )
      const hasDetails = !props.hideDetails || (
        props.hideDetails === 'auto' &&
        (hasMessages || !!slots.details)
      )

      return (
        <div class={[
          'v-input',
          `v-input--${props.direction}`,
          densityClasses.value,
          validationClasses.value,
        ]}
        >
          { hasPrepend && (
            <div key="prepend" class="v-input__prepend">
              { props.prependIcon && (
                <InputIcon
                  key="prepend-icon"
                  name="prepend"
                />
              ) }

              { slots.prepend?.(slotProps.value) }
            </div>
          ) }

          { slots.default && (
            <div class="v-input__control">
              { slots.default?.(slotProps.value) }
            </div>
          ) }

          { hasAppend && (
            <div key="append" class="v-input__append">
              { slots.append?.(slotProps.value) }

              { props.appendIcon && (
                <InputIcon
                  key="append-icon"
                  name="append"
                />
              ) }
            </div>
          ) }

          { hasDetails && (
            <div class="v-input__details">
              <VMessages
                active={ hasMessages }
                messages={ errorMessages.value.length > 0
                  ? errorMessages.value
                  : props.messages
                }
                v-slots={{ message: slots.message }}
              />

              { slots.details?.(slotProps.value) }
            </div>
          ) }
        </div>
      )
    })

    return {
      reset,
      resetValidation,
      validate,
    }
  },
})

export type VInput = InstanceType<typeof VInput>

export function filterInputProps (props: Record<string, unknown>) {
  const keys = Object.keys(VInput.props).filter(k => !isOn(k))
  return pick(props, keys)
}
