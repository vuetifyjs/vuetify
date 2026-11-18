// Components
import { VDateRangePicker } from '../VDateRangePicker'
import { VDialog } from '@/components/VDialog'

// Utilities
import { isClickable, page, render, screen, scroll, userEvent, waitIdle } from '@test'
import { within } from '@testing-library/vue'
import { commands } from 'vitest/browser'
import { nextTick, ref } from 'vue'

const cell = (iso: string) => screen.queryByCSS(`[data-v-date="${iso}"]`)
const dayBtn = (iso: string) => cell(iso) as HTMLButtonElement | null
const dayWrapper = (iso: string) => cell(iso)?.closest<HTMLElement>('.v-date-picker-month__day') ?? null

describe('VDateRangePicker', () => {
  it('renders two adjacent calendar panels by default', async () => {
    render(() => (
      <VDateRangePicker modelValue={['2026-04-15', '2026-04-20']} />
    ))

    // April 15 is in the left panel; May 15 is in the right panel.
    await expect.poll(() => cell('2026-04-15')).not.toBeNull()
    await expect.poll(() => cell('2026-05-15')).not.toBeNull()

    // showAdjacentMonths is forced to false: May 1 is NOT rendered as a button in the left
    // calendar — only as a real cell in the right panel.
    expect(screen.queryAllByCSS('[data-v-date="2026-05-01"]')).toHaveLength(1)
  })

  it('renders the footer slot inside the picker root, below the calendar body', async () => {
    render(() => (
      <VDateRangePicker modelValue={['2026-04-15', '2026-04-20']}>
        {{
          footer: () => <div data-testid="picker-footer">Footer content</div>,
        }}
      </VDateRangePicker>
    ))

    const body = await screen.getByCSS('.v-date-range-picker > .v-picker__body')
    const footer = await screen.getByCSS('.v-date-range-picker > .v-picker__actions')

    expect(footer.contains(screen.getByTestId('picker-footer'))).toBe(true)
    // Footer is a sibling of body inside the root — never wraps siblings composed externally.
    expect(footer.parentElement).toBe(body.parentElement)
    expect(body.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('ArrowRight on the last visible day of the left panel focuses the matching day in the right panel', async () => {
    render(() => (
      <VDateRangePicker modelValue={['2026-04-30']} />
    ))

    // Click April 30 in the left panel to anchor virtual focus.
    const apr30 = dayBtn('2026-04-30')!
    await userEvent.click(apr30)
    await userEvent.keyboard('{ArrowRight}')

    // Focus should jump to May 1 in the right panel — NOT shift the displayed months.
    await expect.poll(() => document.activeElement?.getAttribute('data-v-date')).toBe('2026-05-01')

    // Both panels should still show their original months: April still visible on the left,
    // May still visible on the right.
    expect(cell('2026-04-15')).not.toBeNull()
    expect(cell('2026-05-15')).not.toBeNull()
  })

  it('ArrowLeft on the first visible day of the left panel shifts the months back', async () => {
    render(() => (
      <VDateRangePicker modelValue={['2026-04-01']} />
    ))

    // Click April 1 to anchor virtual focus.
    await userEvent.click(dayBtn('2026-04-01')!)
    await userEvent.keyboard('{ArrowLeft}')

    // Months should have shifted back: left = March, right = April. Focus is on March 31.
    await expect.poll(() => cell('2026-03-15')).not.toBeNull()
    await expect.poll(() => document.activeElement?.getAttribute('data-v-date')).toBe('2026-03-31')
    // April still visible in the right panel.
    await expect.poll(() => cell('2026-04-15')).not.toBeNull()
  })

  it('hover preview in one panel updates the preview band in the other', async () => {
    // Seed the model with a single range-start so the picker opens on April 2026 with no rangeEnd yet.
    const model = ref<unknown[]>(['2026-04-10'])
    render(() => (
      <VDateRangePicker v-model={ model.value } />
    ))

    await expect.poll(() => dayBtn('2026-05-15')).not.toBeNull()

    // Hover over a date in the right panel — preview should extend from Apr 10 through May 15
    // across both panels (without the cross-panel sync, only the right panel would show preview).
    await userEvent.hover(dayBtn('2026-05-15')!)

    // Cells between Apr 10 and May 15 should now carry preview classes in BOTH panels.
    await expect.poll(() => dayWrapper('2026-04-20')).toHaveClass('v-date-picker-month__day--preview-middle')
    await expect.poll(() => dayWrapper('2026-05-05')).toHaveClass('v-date-picker-month__day--preview-middle')
  })

  describe('scrollable', () => {
    it('stacks months vertically and scrolls their labels with the calendar', async () => {
      render(() => (
        <VDateRangePicker
          modelValue={['2026-04-15']}
          min="2026-04-01"
          max="2026-12-31"
          height={ 480 }
          scrollable
        />
      ))

      const months = screen.getByCSS('.v-date-range-picker__months')
      const weekdays = screen.getByCSS('.v-date-range-picker__weekdays')
      const april = await screen.findByText('April 2026')
      const may = await screen.findByText('May 2026')
      await waitIdle()

      expect(screen.queryAllByCSS('.v-date-range-picker__months')).toHaveLength(1)
      expect(may.getBoundingClientRect().top).toBeGreaterThan(april.getBoundingClientRect().top)
      expect(may.getBoundingClientRect().left).toBe(april.getBoundingClientRect().left)

      const initialTop = april.getBoundingClientRect().top
      const weekdaysTop = weekdays.getBoundingClientRect().top
      await scroll({ top: 80 }, months)

      await expect.poll(() => april.getBoundingClientRect().top).toBeLessThan(initialTop - 70)
      expect(weekdays.getBoundingClientRect().top).toBe(weekdaysTop)
    })

    it('renders earlier and later months as the virtual list scrolls', async () => {
      render(() => (
        <VDateRangePicker
          modelValue={['2026-04-15']}
          min="2026-01-01"
          max="2026-12-31"
          height={ 480 }
          scrollable
        />
      ))

      const months = screen.getByCSS('.v-date-range-picker__months')

      await expect.poll(() => cell('2026-04-15')).not.toBeNull()
      await waitIdle()
      expect(screen.queryAllByCSS('.v-date-range-picker__month').length).toBeLessThan(12)

      await scroll({ top: 0 }, months)
      await expect.poll(() => cell('2026-01-15')).not.toBeNull()

      await scroll({ top: months.scrollHeight }, months)
      await expect.poll(() => cell('2026-12-15')).not.toBeNull()
      await expect.poll(() => cell('2026-01-15')).toBeNull()
    })

    it('opens an unbounded dynamic calendar on the selected date', async () => {
      render(() => (
        <VDateRangePicker modelValue={['2026-02-28']} weeksInMonth="dynamic" height={ 480 } scrollable />
      ))

      const months = screen.getByCSS('.v-date-range-picker__months')
      await expect.poll(() => dayBtn('2026-02-28')).not.toBeNull()
      await waitIdle()

      await expect.poll(() => dayBtn('2026-02-28')!.getBoundingClientRect().top)
        .toBeGreaterThanOrEqual(months.getBoundingClientRect().top)
      await expect.poll(() => dayBtn('2026-02-28')!.getBoundingClientRect().bottom)
        .toBeLessThanOrEqual(months.getBoundingClientRect().bottom)
      expect(screen.getAllByCSS('.v-date-range-picker__month').length).toBeLessThan(10)
    })

    it('keeps the selected month visible after a fullscreen dialog opens', async () => {
      const lock = await commands.getLock()

      try {
        await page.viewport(390, 844)
        await commands.setReduceMotionDisabled()
        const afterEnter = vi.fn()
        render(() => (
          <VDialog fullscreen onAfterEnter={ afterEnter }>
            {{
              activator: ({ props }) => <button { ...props }>Open picker</button>,
              default: () => (
                <VDateRangePicker
                  modelValue={['2026-11-05', '2026-11-09']}
                  weeksInMonth="dynamic"
                  height="100%"
                  width="100%"
                  scrollable
                />
              ),
            }}
          </VDialog>
        ))

        expect(cell('2026-11-05')).toBeNull()
        await userEvent.click(screen.getByRole('button', { name: 'Open picker' }))
        await expect.poll(() => afterEnter).toHaveBeenCalledTimes(1)
        await waitIdle()
        await waitIdle()

        const months = screen.getByCSS('.v-date-range-picker__months')
        await expect.poll(() => dayBtn('2026-11-05')).not.toBeNull()
        await expect.poll(() => dayBtn('2026-11-05')!.getBoundingClientRect().top)
          .toBeGreaterThanOrEqual(months.getBoundingClientRect().top)
        await expect.poll(() => dayBtn('2026-11-09')!.getBoundingClientRect().bottom)
          .toBeLessThanOrEqual(months.getBoundingClientRect().bottom)
      } finally {
        await commands.setReduceMotionEnabled()
        await commands.releaseLock(lock)
      }
    })

    it('selects a date range across two months', async () => {
      const model = ref<unknown[]>(['2026-04-15', '2026-04-20'])
      render(() => (
        <VDateRangePicker
          v-model={ model.value }
          min="2026-04-01"
          max="2026-05-31"
          height={ 480 }
          scrollable
        />
      ))

      await userEvent.click(dayBtn('2026-04-30')!)
      await expect.poll(() => dayBtn('2026-05-02')).not.toBeNull()
      await userEvent.click(dayBtn('2026-05-02')!)

      await expect.poll(() => model.value).toEqual([
        new Date(2026, 3, 30),
        new Date(2026, 4, 2, 23, 59, 59, 999),
      ])
      expect(dayWrapper('2026-04-30')).toHaveClass('v-date-picker-month__day--range-start')
      expect(dayWrapper('2026-05-01')).toHaveClass('v-date-picker-month__day--range-middle')
      expect(dayWrapper('2026-05-02')).toHaveClass('v-date-picker-month__day--range-end')
    })

    it('respects minimum, maximum and allowed dates', async () => {
      render(() => (
        <VDateRangePicker
          modelValue={['2026-04-12']}
          min="2026-04-10"
          max="2026-05-10"
          allowedDates={['2026-04-10', '2026-04-12', '2026-05-10']}
          scrollable
        />
      ))

      await expect.poll(() => dayBtn('2026-05-10')).not.toBeNull()
      expect(screen.getByRole('button', { name: /April 9, 2026/ })).toBeDisabled()
      expect(screen.getByRole('button', { name: /April 11, 2026/ })).toBeDisabled()
      expect(dayBtn('2026-04-10')).toBeEnabled()
      expect(dayBtn('2026-04-12')).toBeEnabled()
      expect(dayBtn('2026-05-10')).toBeEnabled()
      expect(screen.getByRole('button', { name: /May 11, 2026/ })).toBeDisabled()
    })

    it.each(['readonly', 'disabled'] as const)('prevents date selection when %s', async state => {
      render(() => (
        <VDateRangePicker
          modelValue={['2026-04-15']}
          min="2026-04-01"
          max="2026-05-31"
          readonly={ state === 'readonly' }
          disabled={ state === 'disabled' }
          scrollable
        />
      ))

      const date = screen.getByRole('button', { name: /April 20, 2026/ })
      await expect(isClickable(date)).resolves.toBe(false)
    })

    it('does not select dates with the keyboard when readonly', async () => {
      const lock = await commands.getLock()

      try {
        const model = ref<unknown[]>(['2026-04-15'])
        render(() => (
          <VDateRangePicker
            v-model={ model.value }
            min="2026-04-01"
            max="2026-05-31"
            readonly
            scrollable
          />
        ))

        dayBtn('2026-04-20')!.focus()
        await userEvent.keyboard('{Enter}')
        expect(model.value).toEqual(['2026-04-15'])
      } finally {
        await commands.releaseLock(lock)
      }
    })

    it.each([false, true])('keeps keyboard focus across months with RTL %s', async rtl => {
      const lock = await commands.getLock()

      try {
        render(() => (
          <div dir={ rtl ? 'rtl' : 'ltr' }>
            <VDateRangePicker
              modelValue={['2026-04-30']}
              min="2026-04-01"
              max="2026-06-30"
              height={ 360 }
              scrollable
            />
          </div>
        ), null, { locale: { rtl: { en: rtl } } })

        await userEvent.click(dayBtn('2026-04-30')!)
        await userEvent.keyboard(rtl ? '{ArrowLeft}' : '{ArrowRight}')

        await expect.poll(() => document.activeElement?.getAttribute('data-v-date')).toBe('2026-05-01')

        const months = screen.getByCSS('.v-date-range-picker__months')
        await expect.poll(() => dayBtn('2026-05-01')!.getBoundingClientRect().bottom)
          .toBeLessThanOrEqual(months.getBoundingClientRect().bottom + 1)
      } finally {
        await commands.releaseLock(lock)
      }
    })

    it('follows an externally selected range to another month', async () => {
      const model = ref<unknown[]>(['2026-04-15', '2026-04-20'])
      render(() => (
        <VDateRangePicker
          v-model={ model.value }
          min="2026-01-01"
          max="2026-12-31"
          scrollable
        />
      ))

      await expect.poll(() => cell('2026-04-15')).not.toBeNull()
      model.value = ['2026-10-03', '2026-10-20']
      await expect.poll(() => cell('2026-10-03')).not.toBeNull()

      const months = screen.getByCSS('.v-date-range-picker__months')
      await expect.poll(() => dayBtn('2026-10-03')!.getBoundingClientRect().top)
        .toBeGreaterThanOrEqual(months.getBoundingClientRect().top)
      await expect.poll(() => dayBtn('2026-10-03')!.getBoundingClientRect().bottom)
        .toBeLessThanOrEqual(months.getBoundingClientRect().bottom)
    })

    it('does not replace another month when Escape is pressed', async () => {
      const lock = await commands.getLock()

      try {
        render(() => (
          <VDateRangePicker
            modelValue={['2026-04-15', '2026-04-20']}
            min="2026-04-01"
            max="2026-06-30"
            scrollable
          />
        ))

        await expect.poll(() => dayBtn('2026-05-15')).not.toBeNull()
        const may = dayBtn('2026-05-15')!.closest('.v-date-range-picker__month')!
        dayBtn('2026-05-15')!.focus()
        await userEvent.keyboard('{Escape}')

        expect(within(may).getByText('May 2026')).toBeVisible()
        expect(cell('2026-05-15')).not.toBeNull()
        expect(screen.getAllByCSS('[data-v-date="2026-04-15"]')).toHaveLength(1)
      } finally {
        await commands.releaseLock(lock)
      }
    })

    it('keeps one weekday row above months and preserves week numbers when it is hidden', async () => {
      const hideWeekdays = ref(false)
      render(() => (
        <VDateRangePicker
          modelValue={['2026-04-15']}
          min="2026-04-01"
          max="2026-05-31"
          firstDayOfWeek={ 1 }
          weekdays={[1, 2, 3, 4, 5]}
          hideWeekdays={ hideWeekdays.value }
          showWeek
          scrollable
        />
      ))

      expect(screen.getAllByCSS('.v-date-picker-month__weekday').map(day => day.textContent))
        .toEqual(['M', 'T', 'W', 'T', 'F'])
      expect(cell('2026-04-10')).not.toBeNull()
      expect(cell('2026-04-11')).toBeNull()
      expect(screen.getAllByCSS('.v-date-picker-month__weeks').length).toBeGreaterThan(1)

      hideWeekdays.value = true
      await expect.poll(() => screen.queryAllByCSS('.v-date-picker-month__weekday')).toHaveLength(0)
      expect(screen.queryByCSS('.v-date-range-picker__weekdays')).toBeNull()
      expect(screen.getAllByCSS('.v-date-picker-month__weeks').length).toBeGreaterThan(0)
      expect(cell('2026-04-10')).not.toBeNull()
    })

    it('switches between the panel and scrollable layouts without losing the range', async () => {
      const scrollable = ref(false)
      const model = ref<unknown[]>(['2026-04-15', '2026-05-20'])
      render(() => (
        <VDateRangePicker
          v-model={ model.value }
          min="2026-04-01"
          max="2026-06-30"
          scrollable={ scrollable.value }
        />
      ))

      expect(screen.queryAllByCSS('.v-date-range-picker__panel')).toHaveLength(2)

      scrollable.value = true
      await expect.poll(() => screen.queryAllByCSS('.v-date-range-picker__months')).toHaveLength(1)
      expect(screen.queryAllByCSS('.v-date-range-picker__panel')).toHaveLength(0)
      expect(cell('2026-04-15')).not.toBeNull()

      scrollable.value = false
      await expect.poll(() => screen.queryAllByCSS('.v-date-range-picker__panel')).toHaveLength(2)
      expect(cell('2026-04-15')).not.toBeNull()
      expect(cell('2026-05-20')).not.toBeNull()
      expect(model.value).toEqual(['2026-04-15', '2026-05-20'])
    })
  })

  describe('auto-navigate on model change', () => {
    it('shifts both panels into view when the new model falls outside the current months', async () => {
      const model = ref<unknown[]>(['2026-04-15', '2026-04-20'])
      render(() => (
        <VDateRangePicker v-model={ model.value } />
      ))

      // Initial state: left=April, right=May.
      await expect.poll(() => cell('2026-04-15')).not.toBeNull()
      await expect.poll(() => cell('2026-05-15')).not.toBeNull()

      // Simulate a preset switch — jump the model to February.
      model.value = ['2026-02-03', '2026-02-20']
      await commands.waitStable('.v-date-range-picker .v-picker__body')

      // Both panels should follow: left=Feb, right=March (sync forward by 1).
      expect(cell('2026-02-03')).not.toBeNull()
      expect(cell('2026-03-15')).not.toBeNull()
      // April should no longer be rendered.
      expect(cell('2026-04-15')).toBeNull()
    })

    it('does not move the panels when the new model is already visible', async () => {
      const model = ref<unknown[]>(['2026-04-15'])
      render(() => (
        <VDateRangePicker v-model={ model.value } />
      ))

      await expect.poll(() => cell('2026-04-15')).not.toBeNull()

      // Update the model to a date that's already visible in the right panel.
      model.value = ['2026-04-15', '2026-05-20']
      await nextTick()

      // No navigation — April and May are still the displayed months.
      expect(cell('2026-04-15')).not.toBeNull()
      expect(cell('2026-05-20')).not.toBeNull()
      // March should NOT be rendered — proves panels didn't shift back.
      expect(cell('2026-03-15')).toBeNull()
    })
  })

  describe('independent-months', () => {
    it('renders extra nav buttons on each panel and disables them when months would collide', async () => {
      render(() => (
        <VDateRangePicker modelValue={['2026-04-15', '2026-04-20']} independentMonths />
      ))

      const panels = screen.queryAllByCSS('.v-date-range-picker__panel')
      expect(panels).toHaveLength(2)

      // Inner-facing nav buttons are always rendered but visually hidden when not independent;
      // with independent-months on, the hidden marker is gone.
      expect(screen.queryAllByCSS('.v-date-range-picker__nav-hidden')).toHaveLength(0)

      // Each panel's controls have a prev + next button (2 each, 4 total).
      const navButtons = panels.flatMap(panel =>
        within(panel).queryAllByCSS('.v-date-picker-controls .v-btn')
      )
      expect(navButtons).toHaveLength(4)

      // Left=April, Right=May → left's next would step into May (same as right), right's prev would step into April (same as left).
      const [leftPrev, leftNext, rightPrev, rightNext] = navButtons as HTMLButtonElement[]
      expect(leftPrev).toBeEnabled()
      expect(leftNext).toBeDisabled()
      expect(rightPrev).toBeDisabled()
      expect(rightNext).toBeEnabled()
    })

    it('ArrowLeft on the first day of the right panel pulls the right panel back into the gap', async () => {
      // Left = May, Right = July → gap at June. ArrowLeft from July 1 should pull right to June.
      render(() => (
        <VDateRangePicker modelValue={['2026-05-15', '2026-07-10']} independentMonths />
      ))

      await userEvent.click(dayBtn('2026-07-01')!)
      await userEvent.keyboard('{ArrowLeft}')

      await expect.poll(() => cell('2026-06-30')).not.toBeNull()
      await expect.poll(() => document.activeElement?.getAttribute('data-v-date')).toBe('2026-06-30')
      // Left panel stayed on May; only the right panel moved.
      expect(cell('2026-05-15')).not.toBeNull()
      await expect.poll(() => cell('2026-07-10')).toBeNull()
    })

    it('ArrowRight on the last day of the left panel pushes the left panel into the gap', async () => {
      // Left = May, Right = July → gap at June. ArrowRight from May 31 should push left to June.
      render(() => (
        <VDateRangePicker modelValue={['2026-05-15', '2026-07-10']} independentMonths />
      ))

      await userEvent.click(dayBtn('2026-05-31')!)
      await userEvent.keyboard('{ArrowRight}')

      await expect.poll(() => cell('2026-06-01')).not.toBeNull()
      await expect.poll(() => document.activeElement?.getAttribute('data-v-date')).toBe('2026-06-01')
      // Right panel stayed on July; only the left panel moved.
      expect(cell('2026-07-10')).not.toBeNull()
      await expect.poll(() => cell('2026-05-15')).toBeNull()
    })

    it('ArrowRight on April 30 still cross-focuses May 1 in independent mode when panels are adjacent', async () => {
      render(() => (
        <VDateRangePicker modelValue={['2026-04-30']} independentMonths />
      ))

      // Independent mode: navigateToSelection on init still seats right at left+1 (May) here.
      await userEvent.click(dayBtn('2026-04-30')!)
      await userEvent.keyboard('{ArrowRight}')

      await expect.poll(() => document.activeElement?.getAttribute('data-v-date')).toBe('2026-05-01')
      // Both panels stayed on the same months — nav only crosses focus, no shift.
      expect(cell('2026-04-15')).not.toBeNull()
      expect(cell('2026-05-20')).not.toBeNull()
    })

    it('navigates the right panel to the end-date month, keeping the gap when the model spans multiple months', async () => {
      const model = ref<unknown[]>(['2026-04-15', '2026-07-10'])
      render(() => (
        <VDateRangePicker v-model={ model.value } independentMonths />
      ))

      // Left should land on April; right should land on July (not May).
      await expect.poll(() => cell('2026-04-15')).not.toBeNull()
      await expect.poll(() => cell('2026-07-10')).not.toBeNull()
      // May/June should NOT be rendered — proves we jumped, not stepped.
      await expect.poll(() => cell('2026-05-15')).toBeNull()
      await expect.poll(() => cell('2026-06-15')).toBeNull()
    })

    it('allows the panels to drift apart and re-enables the buttons once there is a gap', async () => {
      render(() => (
        <VDateRangePicker modelValue={['2026-04-15', '2026-04-20']} independentMonths />
      ))

      const panels = screen.queryAllByCSS('.v-date-range-picker__panel')
      const panelButtons = (i: number) => within(panels[i]).queryAllByCSS('.v-date-picker-controls .v-btn')

      // Step left back to March, right forward to June. Now there's a 3-month gap.
      await userEvent.click(panelButtons(0)[0])
      await userEvent.click(panelButtons(1)[1])
      await commands.waitStable('.v-date-range-picker .v-picker__body')

      // Both inner-facing buttons should now be enabled again.
      expect(panelButtons(0)[1]).toBeEnabled()
      expect(panelButtons(1)[0]).toBeEnabled()
    })
  })
})
