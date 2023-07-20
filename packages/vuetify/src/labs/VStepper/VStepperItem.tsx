// Components
import { VAvatar } from '@/components/VAvatar/VAvatar'

// Composables
import { makeGroupItemProps, useGroupItem } from '@/composables/group'

// Directives
import { Ripple } from '@/directives/ripple'

// Utilities
import { computed } from 'vue'
import { VStepperSymbol } from './VStepper'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { RippleDirectiveBinding } from '@/directives/ripple'

export const makeVStepperItemProps = propsFactory({
  color: String,
  title: String,
  subtitle: String,

  complete: Boolean,
  completeIcon: {
    type: String,
    default: '$complete',
  },
  editable: Boolean,
  editIcon: {
    type: String,
    default: '$edit',
  },
  error: Boolean,
  errorIcon: {
    type: String,
    default: '$error',
  },
  ripple: {
    type: [Boolean, Object] as PropType<RippleDirectiveBinding['value']>,
    default: true,
  },

  ...makeGroupItemProps(),
}, 'VStepperItem')

export const VStepperItem = genericComponent()({
  name: 'VStepperItem',

  directives: { Ripple },

  props: makeVStepperItemProps(),

  emits: {
    'group:selected': (val: { value: boolean }) => true,
  },

  setup (props, { slots }) {
    const group = useGroupItem(props, VStepperSymbol, false)
    const step = computed(() => group?.value.value ?? props.value)
    const canEdit = computed(() => {
      return props.editable
    })
    const hasError = computed(() => props.error)
    const hasCompleted = computed(() => props.complete)
    const icon = computed(() => {
      if (hasError.value) return props.errorIcon
      if (hasCompleted.value) return props.completeIcon
      if (canEdit.value) return props.editIcon

      return undefined
    })

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

      function onClick () {
        group?.toggle()
      }

      return (
        <button
          class={[
            'v-stepper-item',
            {
              'v-stepper-item--complete': hasCompleted.value,
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
          <VAvatar
            key="stepper-avatar"
            class="v-stepper-item__avatar"
            color={ hasColor ? props.color : undefined }
            icon={ icon.value }
            size={ 24 }
            text={ step.value }
          />

          <div class="v-stepper-item__content">
            { props.title && (
              // stepper item title
              <div
                key="title"
                class="v-stepper-item__title"
              >
                { props.title }
              </div>
            )}

            { props.subtitle && (
              // stepper item subtitle
              <div
                key="subtitle"
                class="v-stepper-item__subtitle"
              >
                { props.subtitle }
              </div>
            )}

            { slots.default?.() }
          </div>
        </button>
      )
    })
    return {}
  },
})
