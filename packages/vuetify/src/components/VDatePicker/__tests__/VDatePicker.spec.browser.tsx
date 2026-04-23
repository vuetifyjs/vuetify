// Components
import { VDatePicker } from '..'

// Utilities
import { render, screen, userEvent, waitIdle } from '@test'
import { within } from '@testing-library/vue'
import { commands } from 'vitest/browser'
import { nextTick, ref } from 'vue'

describe('VDatePicker', () => {
  it('shows hover range preview after selecting start date', async () => {
    const model = ref<unknown[]>([])
    render(() => (
      <VDatePicker v-model={ model.value } multiple="range" />
    ))

    // Select the 10th as start date
    await userEvent.click(await screen.findByText(10))
    await expect.poll(() => model.value).toHaveLength(1)

    // Hover over the 15th
    const day15 = await screen.findByText(15)
    await userEvent.hover(day15)

    // Days between 10 and 15 (inclusive) should have the hover-range class
    const hoverRangeDays = document.querySelectorAll('.v-date-picker-month__day--hover-range')
    expect(hoverRangeDays).toHaveLength(6) // 10, 11, 12, 13, 14, 15

    // The start day should have the hover-range-start class
    const hoverStart = document.querySelectorAll('.v-date-picker-month__day--hover-range-start')
    expect(hoverStart).toHaveLength(1)

    // The hovered day should have the hover-range-end class
    const hoverEnd = document.querySelectorAll('.v-date-picker-month__day--hover-range-end')
    expect(hoverEnd).toHaveLength(1)
  })

  it('clears hover range preview when mouse leaves the calendar', async () => {
    const model = ref<unknown[]>([])
    render(() => (
      <VDatePicker v-model={ model.value } multiple="range" />
    ))

    // Select the 10th as start date
    await userEvent.click(await screen.findByText(10))

    // Hover over the 15th
    await userEvent.hover(await screen.findByText(15))
    expect(document.querySelectorAll('.v-date-picker-month__day--hover-range').length).toBeGreaterThan(0)

    // Move mouse out of the days container
    await userEvent.unhover(document.querySelector('.v-date-picker-month__days')!)
    expect(document.querySelectorAll('.v-date-picker-month__day--hover-range')).toHaveLength(0)
  })

  it('does not show hover range preview when range is already complete', async () => {
    const model = ref<unknown[]>([])
    render(() => (
      <VDatePicker v-model={ model.value } multiple="range" />
    ))

    // Select full range: 10th to 15th
    await userEvent.click(await screen.findByText(10))
    await userEvent.click(await screen.findByText(15))
    await expect.poll(() => model.value).toHaveLength(2)

    // Hover over another day — no hover-range class should appear
    await userEvent.hover(await screen.findByText(20))
    expect(document.querySelectorAll('.v-date-picker-month__day--hover-range')).toHaveLength(0)
  })

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
    const yearsContainer = await screen.getByCSS('.v-date-picker-years__content')
    await userEvent.click(await within(yearsContainer).getByText('2025'))
    await userEvent.click(await screen.findByTestId('month-btn'))
    await commands.waitStable('.v-date-picker-months')
    const monthsContainer = await screen.getByCSS('.v-date-picker-months__content')
    await userEvent.click(await within(monthsContainer).findByText('Jan'))
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
    await nextTick()
    await waitIdle()

    await userEvent.click(await screen.findByText(21))
    await userEvent.click(await screen.findByText(7))
    await expect.poll(() => model.value).toHaveLength(4)

    expect('Invalid firstDayOfWeek, expected discrete number in range [0-6]').toHaveBeenTipped()

    await commands.clearAbortTimeout()
  })
})
