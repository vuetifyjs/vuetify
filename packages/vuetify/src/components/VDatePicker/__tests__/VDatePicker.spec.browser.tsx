// Components
import { VDatePicker } from '..'

// Utilities
import { render, screen, userEvent, wait } from '@test'
import { commands } from '@vitest/browser/context'
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

    // Expect only 2 dates (first and last) to be selected
    await expect.poll(() => model.value).toHaveLength(2)

    // Verify the correct dates are selected (10th and 20th)
    const dates = model.value as Date[]

    expect(dates[0].getDate()).toBe(10)
    expect(dates[1].getDate()).toBe(20)
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
    await commands.waitStable('.v-date-picker-months')
    await userEvent.click(await screen.findByText('Jan'))
    await commands.waitStable('.v-date-picker-month__days')
    await userEvent.click(await screen.findByText(7))

    // Select 2025-02-07
    await userEvent.click(await screen.findByTestId('next-month'))
    await commands.waitStable('.v-date-picker-month__days')
    await userEvent.click(await screen.findByText(7))

    // Expect only 2 dates (first and last) spanning across two months
    await expect.poll(() => model.value).toHaveLength(2)

    // Verify the correct dates are selected (2025-01-07 and 2025-02-07)
    const dates = model.value as Date[]

    expect(dates[0].getFullYear()).toBe(2025)
    expect(dates[0].getMonth()).toBe(0)
    expect(dates[0].getDate()).toBe(7)
    expect(dates[1].getFullYear()).toBe(2025)
    expect(dates[1].getMonth()).toBe(1)
    expect(dates[1].getDate()).toBe(7)
  })

  it('does not trigger infinite loop when first-day-of-week is out of range', async () => {
    const model = ref<unknown[]>([])
    const firstDay = ref<number>(0)
    render(() => (
      <VDatePicker v-model={ model.value } firstDayOfWeek={ firstDay.value } multiple />
    ))

    await userEvent.click(await screen.findByText(10))
    await userEvent.click(await screen.findByText(13))
    await expect.poll(() => model.value).toHaveLength(2)

    await commands.abortAfter(5000, 'VDatePicker infinite loop detection')

    firstDay.value = -1.5
    await wait(100)

    await userEvent.click(await screen.findByText(21))
    await userEvent.click(await screen.findByText(7))
    await expect.poll(() => model.value).toHaveLength(4)

    expect('Invalid firstDayOfWeek, expected discrete number in range [0-6]').toHaveBeenTipped()

    await commands.clearAbortTimeout()
  })
})
