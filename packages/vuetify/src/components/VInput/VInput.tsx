// Styles
import './VInput.sass'

// Components
import { VIcon } from '@/components/VIcon'
import { VMessages } from '@/components/VMessages'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeDensityProps, useDensity } from '@/composables/density'
import { makeValidationProps, useValidation } from '@/composables/validation'

// Utilities
import { computed, watchEffect } from 'vue'
import { genericComponent, getUid, pick, propsFactory } from '@/util'

// Types
import type { ComputedRef, ExtractPropTypes, PropType, Ref } from 'vue'
import type { MakeSlots } from '@/util'

export type VInputSlot = {
  isDisabled: ComputedRef<boolean>
  isReadonly: ComputedRef<boolean>
  isPristine: Ref<boolean | null>
  isValid: ComputedRef<boolean | null>
  isValidating: Ref<boolean>
  reset: () => void
  resetValidation: () => void
  validate: () => void
}

export const makeVInputProps = propsFactory({
  id: String,
  active: Boolean,
  focused: Boolean,
  dirty: Boolean,
  appendIcon: String,
  prependIcon: String,
  hideDetails: [Boolean, String] as PropType<boolean | 'auto'>,
  hint: String,
  messages: {
    type: [Array, String],
    default: () => ([]),
  },
  persistentHint: Boolean,
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal',
    validator: (v: any) => ['horizontal', 'vertical'].includes(v),
  },

  ...makeDensityProps(),
  ...makeValidationProps(),
})

export const VInput = genericComponent<new <T>() => {
  $slots: MakeSlots<{
    default: [VInputSlot]
    prepend: [VInputSlot]
    append: [VInputSlot]
    details: [VInputSlot]
  }>
}>()({
  name: 'VInput',

  props: makeVInputProps(),

  emits: {
    'click:prepend': (e: MouseEvent) => true,
    'click:append': (e: MouseEvent) => true,
    'update:focused': (v: Boolean) => true,
    'update:active': (v: Boolean) => true,
  },

  setup (props, { slots, emit }) {
    const isActive = useProxiedModel(props, 'active')
    const isFocused = useProxiedModel(props, 'focused')
    const { densityClasses } = useDensity(props, 'v-input')
    const {
      errorMessages,
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      reset,
      resetValidation,
      validate,
      validationClasses,
    } = useValidation(props, 'v-input')

    const uid = getUid()
    const id = computed(() => props.id || `input-${uid}`)

    const slotProps = computed<VInputSlot>(() => ({
      id,
      isActive,
      isFocused,
      isDirty: props.dirty,
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      reset,
      resetValidation,
      validate,
      focus: () => isFocused.value = true,
      blur: () => isFocused.value = false,
    }))

    watchEffect(() => isActive.value = isFocused.value || props.dirty)

    return () => {
      const hasPrepend = (slots.prepend || props.prependIcon)
      const hasAppend = (slots.append || props.appendIcon)
      const hasHint = !!(slots.hint || props.hint)
      const hasMessages = !!(
        slots.messages ||
        props.messages?.length ||
        errorMessages.value.length
      )
      const hasDetails = !props.hideDetails || (
        props.hideDetails === 'auto' &&
        (hasMessages || hasHint)
      )
      const showMessages = hasMessages || (
        hasHint &&
        (props.persistentHint || props.focused)
      )

      return (
        <div class={[
          'v-input',
          {
            'v-input--active': isActive.value,
            'v-input--dirty': props.dirty,
            'v-input--disabled': props.disabled,
            'v-input--focused': isFocused.value,
          },
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

          <div class="v-input__control">
            { slots.default?.(slotProps.value) }
          </div>

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
                active={ showMessages }
                value={ hasMessages ? props.messages : [props.hint] }
                v-slots={{ default: slots.messages }}
              />

              { slots.details?.(slotProps.value) }
            </div>
          ) }
        </div>
      )
    }
  },
})

export type VInput = InstanceType<typeof VInput>

export function filterInputProps (props: ExtractPropTypes<ReturnType<typeof makeVInputProps>>) {
  return pick(props, Object.keys(VInput.props) as any)
}
