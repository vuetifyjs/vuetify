// Styles
import './VStepperStep.sass'

// Components
import { VAvatar } from '@/components/VAvatar'
import { VBtn } from '@/components/VBtn'

// Composable
import { makeGroupItemProps, useGroupItem } from '@/composables/group'
import { defineComponent } from '@/util'

// Utilities
import { computed, inject } from 'vue'
import { VStepperGroupProvideSymbol, VStepperProvideSymbol } from './VStepper'

// Types
import type { PropType } from 'vue'

export const VStepperStep = defineComponent({
  name: 'VStepperStep',

  inheritAttrs: false,

  props: {
    color: {
      type: String,
      default: 'primary',
    },
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
    errorIcon: {
      type: String,
      default: '$error',
    },
    rules: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    step: {
      type: Number,
      required: true,
    },
    title: String,
    subtitle: String,
    last: Boolean,
    ...makeGroupItemProps(),
  },

  setup (props, { slots, emit }) {
    const groupItem = useGroupItem(props, VStepperGroupProvideSymbol)

    const currentStep = computed(() => groupItem.group.items.value.findIndex(x => x.id === groupItem.group.selected.value[0]) + 1)
    const active = computed(() => props.step <= currentStep.value)
    const completed = computed(() => props.step < currentStep.value)

    const icon = computed(() => {
      if (completed.value && props.completeIcon) return props.completeIcon

      return undefined
    })

    const stepper = inject(VStepperProvideSymbol)

    if (!stepper) throw new Error('foo')

    return () => (
      <VBtn
        class={[
          'v-stepper-step',
          `v-stepper-step--${stepper.direction.value}`,
          {
            'v-stepper-step--stacked-labels': stepper.direction.value === 'horizontal' && stepper.stackedLabels.value,
          },
        ]}
        stacked={ stepper.direction.value === 'horizontal' && stepper.stackedLabels.value }
        variant="text"
        rounded={ 0 }
        onClick={ groupItem.toggle }
        height="100%"
        block={ stepper.direction.value === 'vertical' }
      >
        {{
          prepend: () => (
            <VAvatar
              size="x-small"
              color={ active.value ? 'primary' : 'grey' }
              class={ !active.value && 'text-white' }
              icon={ icon.value }
            >
              { !icon.value && props.step }
            </VAvatar>
          ),
          default: () => (
            <div class="v-stepper-step__content">
              <div class="v-stepper-step__label">{ props.title }</div>
              { props.subtitle && <div class="v-stepper-step__subtitle">{ props.subtitle }</div> }
            </div>
          ),
        }}
      </VBtn>
    )
  },
})
