// Styles
import './VStepperContent.sass'

// Components
import { VWindowItem } from '@/components/VWindow'
import { VExpandTransition } from '@/components/transitions'

// Composables
import { useLazy } from '@/composables/lazy'

// Utilities
import { computed, inject } from 'vue'
import { defineComponent } from '@/util'
import { VStepperGroupProvideSymbol, VStepperProvideSymbol } from './VStepper'

export const VStepperContent = defineComponent({
  name: 'VStepperContent',

  inheritAttrs: false,

  props: {
    step: {
      type: Number,
      required: true,
    },
    value: null,
    eager: Boolean,
  },

  setup (props, { slots, emit }) {
    const group = inject(VStepperGroupProvideSymbol)
    const stepper = inject(VStepperProvideSymbol)

    if (!group) throw new Error('foo')
    if (!stepper) throw new Error('foo')

    const groupItemId = computed(() => group.findId(props.value))
    const isOpen = computed(() => {
      const id = groupItemId.value
      return id != null ? group.isSelected(id) : false
    })

    const { hasContent, onAfterLeave } = useLazy(props, isOpen)

    const slotProps = computed(() => ({
      prev: group.prev,
      next: group.next,
      isOpen: isOpen.value,
    }))

    return () => {
      const content = slots[`content.${props.value}`]
        ? slots[`content.${props.value}`]!(slotProps.value)
        : slots.content
          ? slots.content(slotProps.value)
          : null

      if (stepper.direction.value === 'vertical') {
        return (
          <div
            class={[
              'v-stepper-content',
              'v-stepper-content--vertical',
            ]}
          >
            <VExpandTransition onAfterLeave={ onAfterLeave }>
              <div
                class="v-stepper-content__wrapper"
                v-show={ isOpen.value }
              >
                { hasContent && content }
              </div>
            </VExpandTransition>
          </div>
        )
      }

      return (
        <VWindowItem value={ groupItemId.value }>
          <div
            class={[
              'v-stepper-content',
              'v-stepper-content--horizontal',
            ]}
          >
            { content }
          </div>
        </VWindowItem>
      )
    }
  },
})
