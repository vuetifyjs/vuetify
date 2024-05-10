// Styles
import './VStepperVerticalItem.sass'

// Components
import { VStepperVerticalActions } from './VStepperVerticalActions'
import { VAvatar } from '@/components/VAvatar/VAvatar'
import { VExpansionPanel } from '@/components/VExpansionPanel'
import { makeVExpansionPanelProps } from '@/components/VExpansionPanel/VExpansionPanel'
import { VIcon } from '@/components/VIcon/VIcon'
import { makeStepperItemProps } from '@/components/VStepper/VStepperItem'

// Utilities
import { computed, ref } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { StepperItemSlot } from '@/components/VStepper/VStepperItem'

export type VStepperVerticalItemSlots = {
  default: StepperItemSlot
  icon: StepperItemSlot
  subtitle: StepperItemSlot
  title: StepperItemSlot
  text: StepperItemSlot
  prev: StepperItemSlot
  next: StepperItemSlot
  actions: StepperItemSlot
}

export const makeVStepperVerticalItemProps = propsFactory({
  hideActions: Boolean,

  ...makeStepperItemProps(),
  ...omit(makeVExpansionPanelProps({
    expandIcon: '',
    collapseIcon: '',
  }), ['hideActions']),
}, 'VStepperVerticalItem')

export const VStepperVerticalItem = genericComponent<VStepperVerticalItemSlots>()({
  name: 'VStepperVerticalItem',

  props: makeVStepperVerticalItemProps(),

  emits: {
    'click:next': () => true,
    'click:prev': () => true,
    'click:finish': () => true,
  },

  setup (props, { emit, slots }) {
    const vExpansionPanelRef = ref<typeof VExpansionPanel>()
    const step = computed(() => !isNaN(parseInt(props.value)) ? Number(props.value) : props.value)
    const groupItem = computed(() => vExpansionPanelRef.value?.groupItem)
    const isSelected = computed(() => groupItem.value?.isSelected.value ?? false)
    const isValid = computed(() => isSelected.value ? props.rules.every(handler => handler() === true) : null)
    const canEdit = computed(() => !props.disabled && props.editable)
    const hasError = computed(() => props.error || (isSelected.value && !isValid.value))
    const hasCompleted = computed(() => props.complete || (props.rules.length > 0 && isValid.value === true))

    const disabled = computed(() => {
      if (props.disabled) return props.disabled
      if (groupItem.value?.isFirst.value) return 'prev'

      return false
    })
    const icon = computed(() => {
      if (hasError.value) return props.errorIcon
      if (hasCompleted.value) return props.completeIcon
      if (groupItem.value?.isSelected.value && props.editable) return props.editIcon

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

    function onClickFinish () {
      emit('click:finish')
    }

    function onClickNext () {
      emit('click:next')

      groupItem.value.group.next()
    }

    function onClickPrev () {
      emit('click:prev')

      groupItem.value.group.prev()
    }

    useRender(() => {
      const hasColor = (
        hasCompleted.value ||
        groupItem.value?.isSelected.value
      ) && (
        !hasError.value &&
        !props.disabled
      )

      const hasActions = !props.hideActions || !!slots.actions
      const expansionPanelProps = VExpansionPanel.filterProps(props)

      return (
        <VExpansionPanel
          _as="VStepperVerticalItem"
          ref={ vExpansionPanelRef }
          { ...expansionPanelProps }
          class={[
            'v-stepper-vertical-item',
            {
              'v-stepper-vertical-item--complete': hasCompleted.value,
              'v-stepper-vertical-item--disabled': props.disabled,
              'v-stepper-vertical-item--editable': canEdit.value,
              'v-stepper-vertical-item--error': hasError.value,
            },
            props.class,
          ]}
          readonly={ !props.editable }
          style={ props.style }
          color=""
          hide-actions={ false }
          value={ step.value }
        >
          {{
            title: () => (
              <>
                <VAvatar
                  key="stepper-avatar"
                  class="v-stepper-vertical-item__avatar"
                  color={ hasColor ? props.color : undefined }
                  size={ 24 }
                  start
                >
                  { slots.icon?.(slotProps.value) ?? (
                    icon.value ? (
                      <VIcon icon={ icon.value }></VIcon>
                    ) : step.value
                  )}
                </VAvatar>

                <div>
                  <div class="v-stepper-vertical-item__title">
                    { slots.title?.(slotProps.value) ?? props.title }
                  </div>

                  <div class="v-stepper-vertical-item__subtitle">
                    { slots.subtitle?.(slotProps.value) ?? props.subtitle }
                  </div>
                </div>
              </>
            ),
            text: () => (
              <>
                { slots.default?.(slotProps.value) ?? props.text }

                { hasActions && (
                  slots.actions?.(slotProps.value) ?? (
                    <VStepperVerticalActions
                      disabled={ disabled.value }
                      onClick:next={ onClickNext }
                      onClick:prev={ onClickPrev }
                      onClick:finish={ onClickFinish }
                      finish={ groupItem.value?.isLast.value }
                      v-slots={{
                        prev: slots.prev ? (slotProps: any) => slots.prev?.(slotProps) : undefined,
                        next: slots.next ? (slotProps: any) => slots.next?.(slotProps) : undefined,
                      }}
                    />
                  )
                )}
              </>
            ),
          }}
        </VExpansionPanel>
      )
    })

    return {}
  },
})

export type VStepperVerticalItem = InstanceType<typeof VStepperVerticalItem>