// Styles
import './VStepperVerticalItem.sass'

// Components
import { VAvatar } from '@/components/VAvatar/VAvatar'
import { VExpansionPanel } from '@/components/VExpansionPanel'
import { makeVExpansionPanelProps } from '@/components/VExpansionPanel/VExpansionPanel'
import { VIcon } from '@/components/VIcon/VIcon'
import { VStepperActions } from '@/components/VStepper/VStepperActions'
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
  prev: StepperItemSlot
  next: StepperItemSlot
  actions: StepperItemSlot
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
    const groupItem = computed(() => vExpansionPanelRef.value?.groupItem)
    const selected = computed(() => groupItem.value?.group.selected.value)
    const _items = computed(() => groupItem.value?.group.items.value ?? [])
    const activeIndex = computed(() => {
      return _items.value.findIndex((item: any) => selected.value.includes(item.id))
    })

    const disabled = computed(() => {
      if (props.disabled) return props.disabled
      if (activeIndex.value === 0) return 'prev'
      if (activeIndex.value === _items.value.length - 1) return 'next'

      return false
    })
    const icon = computed(() => {
      if (hasError.value) return props.errorIcon
      if (hasCompleted.value) return props.completeIcon
      if (props.editable && !props.icon) return props.editIcon

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

    function onClickNext () {
      groupItem.value.group.next()
    }

    function onClickPrev () {
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
              'v-stepper-vertical-item--error': hasError.value,
            },
            props.class,
          ]}
          readonly={ !props.editable }
          style={ props.style }
          color=""
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

                <VStepperActions
                  class="v-stepper-vertical-actions"
                  disabled={ disabled.value }
                  onClick:next={ onClickNext }
                  onClick:prev={ onClickPrev }
                  v-slots={{
                    prev: slots.prev,
                    next: slots.next,
                    default: slots.actions,
                  }}
                />
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
