// Styles
import './VInput.sass'

// Components
import { useInputIcon } from '@/components/VInput/InputIcon'
import { VMessages } from '@/components/VMessages/VMessages'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDensityProps, useDensity } from '@/composables/density'
import { IconValue } from '@/composables/icons'
import { useRtl } from '@/composables/locale'
import { makeValidationProps, useValidation } from '@/composables/validation'

// Utilities
import { computed } from 'vue'
import { EventProp, genericComponent, getUid, propsFactory, useRender } from '@/util'

// Types
import type { ComputedRef, PropType, Ref } from 'vue'
import type { VMessageSlot } from '@/components/VMessages/VMessages'

export interface VInputSlot {
  id: ComputedRef<string>
  messagesId: ComputedRef<string>
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
  centerAffix: {
    type: Boolean,
    default: true,
  },
  prependIcon: IconValue,
  hideDetails: [Boolean, String] as PropType<boolean | 'auto'>,
  hint: String,
  persistentHint: Boolean,
  messages: {
    type: [Array, String] as PropType<string | readonly string[]>,
    default: () => ([]),
  },
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
    validator: (v: any) => ['horizontal', 'vertical'].includes(v),
  },

  'onClick:prepend': EventProp<[MouseEvent]>(),
  'onClick:append': EventProp<[MouseEvent]>(),

  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeValidationProps(),
}, 'v-input')

export type VInputSlots = {
  default: VInputSlot
  prepend: VInputSlot
  append: VInputSlot
  details: VInputSlot
  message: VMessageSlot
}

export const VInput = genericComponent<VInputSlots>()({
  name: 'VInput',

  props: {
    ...makeVInputProps(),
  },

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { attrs, slots, emit }) {
    const { densityClasses } = useDensity(props)
    const { rtlClasses } = useRtl()
    const { InputIcon } = useInputIcon(props)

    const uid = getUid()
    const id = computed(() => props.id || `input-${uid}`)
    const messagesId = computed(() => `${id.value}-messages`)

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
      messagesId,
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

    const messages = computed(() => {
      if (props.errorMessages?.length || (!isPristine.value && errorMessages.value.length)) {
        return errorMessages.value
      } else if (props.hint && (props.persistentHint || props.focused)) {
        return props.hint
      } else {
        return props.messages
      }
    })

    useRender(() => {
      const hasPrepend = !!(slots.prepend || props.prependIcon)
      const hasAppend = !!(slots.append || props.appendIcon)
      const hasMessages = messages.value.length > 0
      const hasDetails = !props.hideDetails || (
        props.hideDetails === 'auto' &&
        (hasMessages || !!slots.details)
      )

      return (
        <div
          class={[
            'v-input',
            `v-input--${props.direction}`,
            {
              'v-input--center-affix': props.centerAffix,
            },
            densityClasses.value,
            rtlClasses.value,
            validationClasses.value,
            props.class,
          ]}
          style={ props.style }
        >
          { hasPrepend && (
            <div key="prepend" class="v-input__prepend">
              { slots.prepend?.(slotProps.value) }

              { props.prependIcon && (
                <InputIcon
                  key="prepend-icon"
                  name="prepend"
                />
              )}
            </div>
          )}

          { slots.default && (
            <div class="v-input__control">
              { slots.default?.(slotProps.value) }
            </div>
          )}

          { hasAppend && (
            <div key="append" class="v-input__append">
              { props.appendIcon && (
                <InputIcon
                  key="append-icon"
                  name="append"
                />
              )}

              { slots.append?.(slotProps.value) }
            </div>
          )}

          { hasDetails && (
            <div class="v-input__details">
              <VMessages
                id={ messagesId.value }
                active={ hasMessages }
                messages={ messages.value }
                v-slots={{ message: slots.message }}
              />

              { slots.details?.(slotProps.value) }
            </div>
          )}
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
