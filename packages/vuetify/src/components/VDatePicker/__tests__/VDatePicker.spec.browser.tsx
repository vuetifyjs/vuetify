// Components
import { VDatePicker } from '..'

// Utilities
import { render, screen, userEvent, waitIdle } from '@test'
import { within } from '@testing-library/vue'
import { commands } from 'vitest/browser'
import { nextTick, ref } from 'vue'

describe('VDatePicker', () => {
  function dispatchTouchEvent (target: Element, type: 'touchstart' | 'touchmove' | 'touchend', x: number, y: number) {
    const touchPoint = new Touch({
      identifier: 1,
      target,
      clientX: x,
      clientY: y,
      pageX: x,
      pageY: y,
      screenX: x,
      screenY: y,
      radiusX: 1,
      radiusY: 1,
      rotationAngle: 0,
      force: 1,
    })
    const isEnd = type === 'touchend'
    const touches = isEnd ? [] : [touchPoint]
    const changedTouches = [touchPoint]

    target.dispatchEvent(new TouchEvent(type, {
      bubbles: true,
      cancelable: true,
      touches,
      targetTouches: touches,
      changedTouches,
    }))
  }

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

  it('no-auto-navigation should keep the displayed month after model change', async () => {
    const onUpdateMonth = vi.fn()
    const onUpdateYear = vi.fn()
    const model = ref<unknown>('2026-01-15')

    render(() => (
      <VDatePicker
        v-model={ model.value }
        month={ 0 }
        year={ 2026 }
        onUpdate:month={ onUpdateMonth }
        onUpdate:year={ onUpdateYear }
        noAutoNavigation
      />
    ))

    // Reassign the model to a date in February. Without `no-auto-navigation` this would
    // emit update:month and re-render to Feb 2026. With it, the picker must stay on Jan.
    model.value = '2026-02-20'
    await nextTick()

    expect(onUpdateMonth).not.toHaveBeenCalled()
    expect(onUpdateYear).not.toHaveBeenCalled()

    // January grid is still rendered.
    expect(document.querySelector('[data-v-date="2026-01-15"]')).not.toBeNull()
    expect(document.querySelector('[data-v-date="2026-02-20"]')).toBeNull()
  })

  it('scrollable should navigate to next month on mouse wheel', async () => {
    render(() => (
      <VDatePicker
        modelValue="2026-01-15"
        month={ 0 }
        year={ 2026 }
        scrollable
      />
    ))

    const days = document.querySelector('.v-date-picker-month__days')
    expect(days).not.toBeNull()

    days!.dispatchEvent(new WheelEvent('wheel', { deltaY: 1, bubbles: true, cancelable: true }))
    await nextTick()

    expect(document.querySelector('[data-v-date="2026-02-15"]')).not.toBeNull()
  })

  it('scrollable should navigate to next month on swipe gesture', async () => {
    render(() => (
      <VDatePicker
        modelValue="2026-01-15"
        month={ 0 }
        year={ 2026 }
        scrollable
      />
    ))

    const days = document.querySelector('.v-date-picker-month__days')
    expect(days).not.toBeNull()

    dispatchTouchEvent(days!, 'touchstart', 120, 120)
    dispatchTouchEvent(days!, 'touchend', 40, 120)
    await nextTick()

    expect(document.querySelector('[data-v-date="2026-02-15"]')).not.toBeNull()
  })
})
