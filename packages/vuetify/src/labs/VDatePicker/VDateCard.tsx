// Styles
import './VDateCard.sass'

// Components
import { VCard } from '@/components/VCard'
import { VDatePickerControls } from './VDatePickerControls'
import { VDatePickerMonth } from './VDatePickerMonth'
import { VDatePickerYears } from './VDatePickerYears'

// Composables
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'
import { createDatePicker } from './composables'

// Utilities
import { defineComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const VDateCard = defineComponent({
  name: 'VDateCard',

  props: {
    color: String,
    input: {
      type: String as PropType<'keyboard' | 'calendar'>,
      default: 'calendar',
    },
    mode: {
      type: String as PropType<'month' | 'years'>,
      default: 'month',
    },
    modelValue: null,
    displayDate: null,
    locale: null,
    ...makeTransitionProps({
      transition: 'fade',
    }),
    range: Boolean,
  },

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { emit }) {
    const { mode, displayDate } = createDatePicker(props)
    useRender(() => (
      <VCard
        class="v-date-card"
      >
        <VDatePickerControls />
        <MaybeTransition transition={ props.transition } mode="out-in">
          { mode.value === 'month' ? (
            <div class="v-date-card__month">
              <VDatePickerMonth
                v-model:displayDate={ displayDate.value }
                locale={ props.locale }
              />
            </div>
          ) : (
            <VDatePickerYears
              locale={ props.locale }
            />
          ) }
        </MaybeTransition>
      </VCard>
    ))

    return {}
  },
})
