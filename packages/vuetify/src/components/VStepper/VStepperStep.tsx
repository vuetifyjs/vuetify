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
import { useTextColor } from '@/composables/color'

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
    errors: Boolean,
    errorIcon: {
      type: String,
      default: '$error',
    },
    // rules: {
    //   type: Array as PropType<any[]>,
    //   default: () => [],
    // },
    step: {
      type: Number,
      required: true,
    },
    title: String,
    subtitle: String,
    ...makeGroupItemProps(),
  },

  setup (props, { slots, emit }) {
    const groupItem = useGroupItem(props, VStepperGroupProvideSymbol)

    const currentStep = computed(() => groupItem.group.items.value.findIndex(x => x.id === groupItem.group.selected.value[0]) + 1)
    const active = computed(() => props.step <= currentStep.value)
    const completed = computed(() => props.step < currentStep.value)

    const icon = computed(() => {
      if (props.errors && props.errorIcon) return props.errorIcon
      if (completed.value && props.completeIcon) return props.completeIcon

      return undefined
    })

    const color = computed(() => {
      if (props.errors) return 'error'
      if (active.value) return 'primary'

      return 'grey'
    })

    const { textColorClasses, textColorStyles } = useTextColor(computed(() => {
      if (props.errors) return 'error'

      return undefined
    }))

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
          textColorClasses.value,
        ]}
        style={{
          ...textColorStyles.value,
        }}
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
              color={ color.value }
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
