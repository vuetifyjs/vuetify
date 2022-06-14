import { makeTransitionProps, MaybeTransition } from '@/composables/transition'
import { defineComponent, useRender } from '@/util'
import type { PropType } from 'vue'
import { VCard } from '../VCard'
import { VDivider } from '../VDivider'
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
    range: Boolean,
  },

  setup (props) {
    const { mode } = createDatePicker(props)
    useRender(() => (
      <VCard
        class="v-date-card"
      >
        <VDatePickerControls
          showPrevNextButtons
        />
        <MaybeTransition transition={ props.transition } mode="out-in">
          { mode.value === 'month' ? (
            <div class="v-date-card__month">
              <VDatePickerMonth
                locale={ props.locale }
              />
              { props.range && (
                <>
                  <VDivider vertical />
                  <VDatePickerMonth
                    locale={ props.locale }
                  />
                </>
              ) }
            </div>
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
