// Components
import { VDatePicker } from '..'

// Utilities
import { render, screen, userEvent } from '@test'
import { ref } from 'vue'

describe('VDatePicker', () => {
  it('selects a range of dates', async () => {
    const model = ref<unknown[]>([])
    render(() => (
      <VDatePicker v-model={ model.value } multiple="range" />
    ))

    // Select two days in the same month (e.g., 10th and 20th)
    await userEvent.click(await screen.findByText(10))
    await userEvent.click(await screen.findByText(20))

    // Expect a 11-day range to be selected
    await expect.poll(() => model.value).toHaveLength(11)
  })

  it('selects a range of dates across month boundary', async () => {
    const model = ref<unknown[]>([])
    render(() => (
      <VDatePicker v-model={ model.value } multiple="range" />
    ))

    // Select 2025-01-07
    await userEvent.click(await screen.findByTestId('year-btn'))
    await userEvent.click(await screen.findByText('2025'))
    await userEvent.click(await screen.findByTestId('month-btn'))
    await userEvent.click(await screen.findByText('Jan'))
    await userEvent.click(await screen.findByText(7))

    // Select 2025-02-07
    await userEvent.click(await screen.findByTestId('next-month'))
    await userEvent.click(await screen.findByText(7))

    // Expect a 32-day range spanning across two months
    await expect.poll(() => model.value).toHaveLength(32)
  })
})
