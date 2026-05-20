// Components
import { VDateRangePicker } from '../VDateRangePicker'

// Utilities
import { render, screen, userEvent } from '@test'
import { within } from '@testing-library/vue'
import { commands } from 'vitest/browser'
import { ref } from 'vue'

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
    await expect.poll(() => cell('2026-03-31')).not.toBeNull()
    await expect.poll(() => document.activeElement?.getAttribute('data-v-date')).toBe('2026-03-31')
    // April still visible in the right panel.
    expect(cell('2026-04-15')).not.toBeNull()
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
    await expect.poll(() =>
      dayWrapper('2026-04-20')?.classList.contains('v-date-picker-month__day--preview-middle')
    ).toBe(true)

    await expect.poll(() =>
      dayWrapper('2026-05-05')?.classList.contains('v-date-picker-month__day--preview-middle')
    ).toBe(true)
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

      // No navigation — April and May are still the displayed months.
      await expect.poll(() => cell('2026-04-15')).not.toBeNull()
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
      expect(leftPrev.disabled).toBe(false)
      expect(leftNext.disabled).toBe(true)
      expect(rightPrev.disabled).toBe(true)
      expect(rightNext.disabled).toBe(false)
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
      expect(cell('2026-07-10')).toBeNull()
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
      expect(cell('2026-05-15')).toBeNull()
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
      expect(cell('2026-05-15')).toBeNull()
      expect(cell('2026-06-15')).toBeNull()
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
