// Styles
import './VStepperItem.sass'

// Components
import { VAvatar } from '@/components/VAvatar/VAvatar'
import { VIcon } from '@/components/VIcon/VIcon'

// Composables
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { IconValue } from '@/composables/icons'
import { genOverlays } from '@/composables/variant'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { computed } from 'vue'
import { VStepperSymbol } from './shared'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { RippleDirectiveBinding } from '@/directives/ripple'

export type StepperItem = string | Record<string, any>

export type StepperItemSlot = {
  canEdit: boolean
  hasError: boolean
  hasCompleted: boolean
  title?: string | number
  subtitle?: string | number
  step: any
}

export type VStepperItemSlots = {
  default: StepperItemSlot
  icon: StepperItemSlot
  title: StepperItemSlot
  subtitle: StepperItemSlot
}

export type ValidationRule = () => string | boolean

export const makeStepperItemProps = propsFactory({
  color: String,
  title: String,
  subtitle: String,
  complete: Boolean,
  completeIcon: {
    type: IconValue,
    default: '$complete',
  },
  editable: Boolean,
  editIcon: {
    type: IconValue,
    default: '$edit',
  },
  error: Boolean,
  errorIcon: {
    type: IconValue,
    default: '$error',
  },
  icon: IconValue,
  ripple: {
    type: [Boolean, Object] as PropType<RippleDirectiveBinding['value']>,
    default: true,
  },
  rules: {
    type: Array as PropType<readonly ValidationRule[]>,
    default: () => ([]),
  },
}, 'StepperItem')

export const makeVStepperItemProps = propsFactory({
  ...makeStepperItemProps(),
  ...makeGroupItemProps(),
}, 'VStepperItem')

export const VStepperItem = genericComponent<VStepperItemSlots>()({
  name: 'VStepperItem',

  directives: { Ripple },

  props: makeVStepperItemProps(),

  emits: {
    'group:selected': (val: { value: boolean }) => true,
  },

  setup (props, { slots }) {
    const group = useGroupItem(props, VStepperSymbol, true)
    const step = computed(() => group?.value.value ?? props.value)
    const isValid = computed(() => props.rules.every(handler => handler() === true))
    const isClickable = computed(() => !props.disabled && props.editable)
    const canEdit = computed(() => !props.disabled && props.editable)
    const hasError = computed(() => props.error || !isValid.value)
    const hasCompleted = computed(() => props.complete || (props.rules.length > 0 && isValid.value))
    const icon = computed(() => {
      if (hasError.value) return props.errorIcon
      if (hasCompleted.value) return props.completeIcon
      if (group.isSelected.value && props.editable) return props.editIcon

      return props.icon
    })
    const slotProps = computed(() => ({
      canEdit: canEdit.value,
      hasError: hasError.value,
      hasCompleted: hasCompleted.value,
      title: props.title,
      subtitle: props.subtitle,
      step: step.value,
      value: props.value,
    }))

    useRender(() => {
      const hasColor = (
        !group ||
        group.isSelected.value ||
        hasCompleted.value ||
        canEdit.value
      ) && (
        !hasError.value &&
        !props.disabled
      )
      const hasTitle = !!(props.title != null || slots.title)
      const hasSubtitle = !!(props.subtitle != null || slots.subtitle)

      function onClick () {
        group?.toggle()
      }

      return (
        <button
          class={[
            'v-stepper-item',
            {
              'v-stepper-item--complete': hasCompleted.value,
              'v-stepper-item--disabled': props.disabled,
              'v-stepper-item--error': hasError.value,
            },
            group?.selectedClass.value,
          ]}
          disabled={ !props.editable }
          v-ripple={[
            props.ripple && props.editable,
            null,
            null,
          ]}
          onClick={ onClick }
        >
          { isClickable.value && genOverlays(true, 'v-stepper-item') }

          <VAvatar
            key="stepper-avatar"
            class="v-stepper-item__avatar"
            color={ hasColor ? props.color : undefined }
            size={ 24 }
          >
            { slots.icon?.(slotProps.value) ?? (
              icon.value ? (
                <VIcon icon={ icon.value }></VIcon>
              ) : step.value
            )}
          </VAvatar>

          <div class="v-stepper-item__content">
            { hasTitle && (
              <div
                key="title"
                class="v-stepper-item__title"
              >
                { slots.title?.(slotProps.value) ?? props.title }
              </div>
            )}

            { hasSubtitle && (
              <div
                key="subtitle"
                class="v-stepper-item__subtitle"
              >
                { slots.subtitle?.(slotProps.value) ?? props.subtitle }
              </div>
            )}

            { slots.default?.(slotProps.value) }
          </div>
        </button>
      )
    })
    return {}
  },
})

export type VStepperItem = InstanceType<typeof VStepperItem>
