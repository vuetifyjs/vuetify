// Styles
import './VInput.sass'

// Components
import { VIcon } from '@/components/VIcon'
import { VMessages } from '@/components/VMessages'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeValidationProps, useValidation } from '@/composables/validation'

// Utilities
import { computed } from 'vue'
import { genericComponent, getUid, pick, propsFactory, useRender } from '@/util'

// Types
import type { ComputedRef, ExtractPropTypes, PropType, Ref } from 'vue'
import type { MakeSlots } from '@/util'

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
  appendIcon: String,
  prependIcon: String,
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
    'click:prepend': (e: MouseEvent) => true,
    'click:append': (e: MouseEvent) => true,
    'update:modelValue': (val: any) => true,
  },

  setup (props, { slots, emit }) {
    const { densityClasses } = useDensity(props)
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
    } = useValidation(props)

    const uid = getUid()
    const id = computed(() => props.id || `input-${uid}`)

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
        slots.messages ||
        props.messages?.length ||
        errorMessages.value.length
      )
      const hasDetails = !props.hideDetails || (
        props.hideDetails === 'auto' &&
        hasMessages
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
            <div
              class="v-input__prepend"
              onClick={ e => emit('click:prepend', e) }
            >
              { slots?.prepend?.(slotProps.value) }

              { props.prependIcon && (
                <VIcon icon={ props.prependIcon } />
              ) }
            </div>
          ) }

          { slots.default && (
            <div class="v-input__control">
              { slots.default?.(slotProps.value) }
            </div>
          ) }

          { hasAppend && (
            <div
              class="v-input__append"
              onClick={ e => emit('click:append', e) }
            >
              { slots?.append?.(slotProps.value) }

              { props.appendIcon && (
                <VIcon icon={ props.appendIcon } />
              ) }
            </div>
          ) }

          { hasDetails && (
            <div class="v-input__details">
              <VMessages
                active={ hasMessages }
                value={ errorMessages.value.length > 0
                  ? errorMessages.value
                  : props.messages
                }
                v-slots={{ default: slots.messages }}
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

export function filterInputProps (props: ExtractPropTypes<ReturnType<typeof makeVInputProps>>) {
  return pick(props, Object.keys(VInput.props) as any)
}
