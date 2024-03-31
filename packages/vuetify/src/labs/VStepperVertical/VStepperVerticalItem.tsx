// Components
import { VAvatar } from '@/components/VAvatar/VAvatar'
import { VExpansionPanel } from '@/components/VExpansionPanel'
import { makeVExpansionPanelProps } from '@/components/VExpansionPanel/VExpansionPanel'
import { VIcon } from '@/components/VIcon/VIcon'
import { makeStepperItemProps } from '@/components/VStepper/VStepperItem'

// Utilities
import { computed, ref } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { StepperItemSlot } from '@/components/VStepper/VStepperItem'

export type VStepperVerticalItemSlots = {
  default: StepperItemSlot
  icon: StepperItemSlot
  subtitle: StepperItemSlot
  title: StepperItemSlot
  text: StepperItemSlot
}

export const makeVStepperVerticalItemProps = propsFactory({
  ...makeStepperItemProps(),
  ...makeVExpansionPanelProps({
    expandIcon: '',
    collapseIcon: '',
  }),
}, 'VStepperVerticalItem')

export const VStepperVerticalItem = genericComponent<VStepperVerticalItemSlots>()({
  name: 'VStepperVerticalItem',

  props: makeVStepperVerticalItemProps(),

  setup (props, { slots }) {
    const vExpansionPanelRef = ref<typeof VExpansionPanel>()
    const step = computed(() => props.value)
    const isValid = computed(() => props.rules.every(handler => handler() === true))
    const canEdit = computed(() => !props.disabled && props.editable)
    const hasError = computed(() => props.error || !isValid.value)
    const hasCompleted = computed(() => props.complete || (props.rules.length > 0 && isValid.value))
    const icon = computed(() => {
      if (hasError.value) return props.errorIcon
      if (hasCompleted.value) return props.completeIcon
      if (props.editable) return props.editIcon

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
        hasCompleted.value ||
        canEdit.value
      ) && (
        !hasError.value &&
        !props.disabled
      )

      const expansionPanelProps = VExpansionPanel.filterProps(props)

      return (
        <VExpansionPanel
          ref={ vExpansionPanelRef }
          { ...expansionPanelProps }
          class={[
            'v-stepper',
            {
              'v-stepper-item--complete': hasCompleted.value,
              'v-stepper-item--disabled': props.disabled,
              'v-stepper-item--error': hasError.value,
            },
            props.class,
          ]}
          style={ props.style }
        >
          {{
            title: () => (
              <>
                <VAvatar
                  key="stepper-avatar"
                  class="v-stepper-vertical-item__avatar"
                  color={ hasColor ? props.color : 'surface-variant' }
                  size={ 24 }
                  start
                >
                  { slots.icon?.(slotProps.value) ?? (
                    icon.value ? (
                      <VIcon icon={ icon.value }></VIcon>
                    ) : step.value
                  )}
                </VAvatar>

                { slots.title?.(slotProps.value) ?? props.title }
              </>
            ),
            text: () => slots.default?.(slotProps.value) ?? props.text,
          }}
        </VExpansionPanel>
      )
    })

    return {}
  },
})

export type VStepperVerticalItem = InstanceType<typeof VStepperVerticalItem>
