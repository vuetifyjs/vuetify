import { makeTransitionProps, MaybeTransition } from '@/composables/transition'
import { defineComponent, useRender } from '@/util'
import type { PropType } from 'vue'
import { VCard } from '../VCard'
import { createDatePicker } from './composables'
import { VDatePickerControls } from './VDatePickerControls'
import { VDatePickerMonth } from './VDatePickerMonth'
import { VDatePickerYears } from './VDatePickerYears'

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
  },

  setup (props) {
    const { mode } = createDatePicker(props)
    useRender(() => (
      <VCard
        class="v-date-card"
        width="350"
      >
        <VDatePickerControls
          showPrevNextButtons
        />
        <MaybeTransition transition={ props.transition } mode="out-in">
          { mode.value === 'month' ? (
            <VDatePickerMonth
              locale={ props.locale }
            />
          ) : (
            <VDatePickerYears
              height="350"
              locale={ props.locale }
            />
          ) }
        </MaybeTransition>
      </VCard>
    ))

    return {}
  },
})
