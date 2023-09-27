// @ts-nocheck
/* eslint-disable */

// Styles
import './VDateRangeCard.sass'

// Components
import { makeVDatePickerControlsProps, VDatePickerControls } from '../VDatePicker/VDatePickerControls'
import { makeVDatePickerMonthProps, VDatePickerMonth } from '../VDatePicker/VDatePickerMonth'
import { makeVDatePickerYearsProps, VDatePickerYears } from '../VDatePicker/VDatePickerYears'
import { VCard } from '@/components/VCard'

// Composables
import { createDatePicker } from '../VDatePicker/composables'
import { makeTransitionProps } from '@/composables/transition'

// Utilities
import { ref } from 'vue'
import { defineComponent, propsFactory, useRender } from '@/util'

// Types
import { dateEmits, makeDateProps } from '../VDateInput/composables'
import { useDate } from '@/labs/date'

export const makeVDateRangeCardProps = propsFactory({
  ...makeDateProps(),
  ...makeVDatePickerControlsProps(),
  ...makeVDatePickerMonthProps(),
  ...makeVDatePickerYearsProps(),
  ...makeTransitionProps({ transition: 'fade' }),
}, 'VDateRangeCard')

export const VDateRangeCard = defineComponent({
  name: 'VDateRangeCard',

  props: makeVDateRangeCardProps(),

  emits: {
    ...dateEmits,
  },

  setup (props, { emit }) {
    const adapter = useDate()
    createDatePicker(props)

    const hoverDate = ref(null)

    useRender(() => {
      const [cardProps] = VCard.filterProps(props)
      const [datePickerControlsProps] = VDatePickerControls.filterProps(props)
      const [datePickerMonthProps] = VDatePickerMonth.filterProps(props)
      const [datePickerYearsProps] = VDatePickerYears.filterProps(props)

      return (
        <VCard
          { ...cardProps }
          class="v-date-range-card"
        >
          { props.viewMode === 'month' ? (
            <>
              <div class="v-date-range-card__start">
                <VDatePickerControls
                  { ...datePickerControlsProps }
                  onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
                  onUpdate:viewMode={ viewMode => emit('update:viewMode', viewMode) }
                  range="start"
                />
                <VDatePickerMonth
                  { ...datePickerMonthProps }
                  onUpdate:modelValue={ modelValue => emit('update:modelValue', modelValue) }
                  v-model:hoverDate={ hoverDate.value }
                  multiple
                  side="start"
                />
              </div>
              <div class="v-date-range-card__divider" />
              <div class="v-date-range-card__end">
                <VDatePickerControls
                  { ...datePickerControlsProps }
                  onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
                  onUpdate:viewMode={ viewMode => emit('update:viewMode', viewMode) }
                  range="end"
                />
                <VDatePickerMonth
                  { ...datePickerMonthProps }
                  onUpdate:modelValue={ modelValue => emit('update:modelValue', modelValue) }
                  displayDate={ adapter.addMonths(props.displayDate, 1) }
                  v-model:hoverDate={ hoverDate.value }
                  multiple
                  side="end"
                />
              </div>
            </>
          ) : (
            <div class="v-date-range-card__years">
              <VDatePickerControls
                { ...datePickerControlsProps }
                onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
                onUpdate:viewMode={ viewMode => emit('update:viewMode', viewMode) }
              />
              <VDatePickerYears
                { ...datePickerYearsProps }
                onUpdate:displayDate={ displayDate => emit('update:displayDate', displayDate) }
                onUpdate:viewMode={ viewMode => emit('update:viewMode', viewMode) }
              />
            </div>
          )}
        </VCard>
      )
    })

    return {}
  },
})

export type VDateRangeCard = InstanceType<typeof VDateRangeCard>
