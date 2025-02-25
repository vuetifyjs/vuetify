// Components
import { VDatePicker } from '..'

// Utilities
import { render, screen } from '@test'
import { fireEvent, waitFor } from '@testing-library/vue'
import { ref } from 'vue'

describe('VDatePicker', () => {
  const selectDay = async (dayIndex: number, buttonClass = '.v-date-picker-month__day-btn') => {
    const days = screen.getAllByCSS(buttonClass)
    const dayButton = days[dayIndex]
    await fireEvent.click(dayButton)
  }

  const selectMonth = async (monthName: string) => {
    const monthButton = screen.getByCSS('.v-date-picker-controls__month-btn')
    await fireEvent.click(monthButton)
    const month = screen.getByText(monthName, { exact: false })
    await fireEvent.click(month)
  }

  it('selects a range of dates', async () => {
    const model = ref<unknown[]>([])
    render(() => (
        <VDatePicker v-model={ model.value } multiple="range" />
    ))

    // Select two days in the same month (e.g., 10th and 20th)
    await selectDay(10)
    await selectDay(20)

    await waitFor(() => {
      expect(model.value).toHaveLength(11) // Expect a 11-day range to be selected
    })
  })

  it('selects a range of dates across month boundary', async () => {
    const model = ref<unknown[]>([])
    render(() => (
      <VDatePicker v-model={ model.value } multiple="range" />
    ))

    // Select day 7 in January
    await selectMonth('Jan')
    await selectDay(7)

    // Switch to February and select day 7
    await selectMonth('Feb')
    await selectDay(7)

    await waitFor(() => {
      expect(model.value).toHaveLength(32) // Expect a 32-day range spanning across two months
    })
  })
})
