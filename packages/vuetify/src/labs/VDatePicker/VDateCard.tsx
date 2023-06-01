// Styles
import './VDateCard.sass'

// Components
import { makeVDatePickerControlsProps, VDatePickerControls } from './VDatePickerControls'
import { makeVDatePickerMonthProps, VDatePickerMonth } from './VDatePickerMonth'
import { makeVDatePickerYearsProps, VDatePickerYears } from './VDatePickerYears'
import { VCard } from '@/components/VCard'

// Composables
import { createDatePicker } from './composables'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const makeVDateCardProps = propsFactory({
  inputMode: {
    type: String as PropType<'keyboard' | 'calendar'>,
    default: 'calendar',
  },

  ...makeVDatePickerControlsProps(),
  ...makeVDatePickerMonthProps(),
  ...makeVDatePickerYearsProps(),
  ...makeTransitionProps({ transition: 'fade' }),

  modelValue: null,
}, 'VDateCard')

export const VDateCard = genericComponent()({
  name: 'VDateCard',

  props: makeVDateCardProps(),

  emits: {
    'update:modelValue': (value: any) => true,
    'update:displayDate': (value: any) => true,
    'update:viewMode': (mode: 'month' | 'year') => true,
    'update:inputMode': (value: any) => true,
  },

  setup (props, { emit }) {
    createDatePicker(props)

    useRender(() => {
      const [cardProps] = VCard.filterProps(props)
      const [datePickerControlsProps] = VDatePickerControls.filterProps(props)
      const [datePickerMonthProps] = VDatePickerMonth.filterProps(props)
      const [datePickerYearsProps] = VDatePickerYears.filterProps(props)

      return (
        <VCard
          { ...cardProps }
          class="v-date-card"
        >
          <VDatePickerControls
            { ...datePickerControlsProps }
            onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
            onUpdate:viewMode={ viewMode => emit('update:viewMode', viewMode) }
          />

          <MaybeTransition transition={ props.transition } mode="out-in">
            { props.viewMode === 'month' ? (
              <div class="v-date-card__month">
                <VDatePickerMonth
                  { ...datePickerMonthProps }
                  onUpdate:modelValue={ modelValue => emit('update:modelValue', modelValue) }
                  onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
                />
              </div>
            ) : (
              <VDatePickerYears
                { ...datePickerYearsProps }
                onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
                onUpdate:viewMode={ viewMode => emit('update:viewMode', viewMode) }
              />
            )}
          </MaybeTransition>
        </VCard>
      )
    })

    return {}
  },
})

export type VDateCard = InstanceType<typeof VDateCard>
