// Components
import { VMonthPicker } from '../VMonthPicker'

// Utilities
import { render, screen, userEvent, wait } from '@test'
import { ref } from 'vue'

describe('VMonthPicker', () => {
  it('should select a month and emit the correct model value', async () => {
    const model = ref<string | null>(null)

    render(() => (
      <VMonthPicker
        v-model={ model.value }
        color="primary"
      />
    ))

    // Should render 12 month buttons inside the months grid
    const monthButtons = screen.getByCSS('.v-month-picker__months-content')
      .querySelectorAll('.v-btn')
    expect(monthButtons).toHaveLength(12)

    // Click the first month (January)
    await userEvent.click(monthButtons[0])
    // Model should be in YYYY-MM format, ending with -01 for January
    expect(model.value).toMatch(/-01$/)

    // Click a different month (June, index 5)
    await userEvent.click(monthButtons[5])
    expect(model.value).toMatch(/-06$/)

    // Year controls should be visible
    const controls = screen.getByCSS('.v-month-picker__controls')
    expect(controls).toBeTruthy()

    // Click previous year arrow
    const prevBtn = controls.querySelector('.v-btn')!
    const currentYear = parseInt(model.value!.split('-')[0])
    await userEvent.click(prevBtn)
    await wait(200)

    // After navigating to prev year and re-selecting, year should decrease
    // The month buttons are re-rendered for the new year
    const newMonthButtons = screen.getByCSS('.v-month-picker__months-content')
      .querySelectorAll('.v-btn')
    await userEvent.click(newMonthButtons[5])
    await wait()

    expect(model.value).toBe(`${currentYear - 1}-06`)
  })

  it('should toggle to year view and back when selecting a year', async () => {
    const model = ref<string | null>('2024-03')

    render(() => (
      <VMonthPicker v-model={ model.value } />
    ))

    // Should initially show months view
    expect(screen.getByCSS('.v-month-picker__months')).toBeTruthy()

    // Click the year button in controls to toggle to years view
    const controls = screen.getByCSS('.v-month-picker__controls')
    const yearBtn = controls.querySelectorAll('.v-btn')[1] // middle button is year toggle
    await userEvent.click(yearBtn)

    // Should now show years view
    expect(screen.getByCSS('.v-date-picker-years')).toBeTruthy()

    // Click a year
    const yearButtons = screen.getByCSS('.v-date-picker-years__content')
      .querySelectorAll('.v-btn')
    // Find and click a year button (they should contain year text)
    const targetYear = Array.from(yearButtons).find(
      btn => btn.textContent?.trim() === '2026'
    )
    expect(targetYear).toBeTruthy()
    await userEvent.click(targetYear!)
    await wait(200) // viewMode transition back to months

    // Should switch back to months view after selecting a year
    expect(screen.getByCSS('.v-month-picker__months')).toBeTruthy()

    // Now select a month to confirm the year stuck
    const monthButtons = screen.getByCSS('.v-month-picker__months-content')
      .querySelectorAll('.v-btn')
    await userEvent.click(monthButtons[8]) // September

    expect(model.value).toBe('2026-09')
  })

  it('should support range selection', async () => {
    const model = ref<string[]>([])

    render(() => (
      <VMonthPicker
        v-model={ model.value }
        multiple="range"
        color="primary"
      />
    ))

    const monthButtons = screen.getByCSS('.v-month-picker__months-content')
      .querySelectorAll('.v-btn')

    await userEvent.click(monthButtons[2]) // March
    expect(model.value).toHaveLength(1)
    expect(model.value[0]).toMatch(/-03$/)

    await userEvent.click(monthButtons[6]) // July
    expect(model.value).toHaveLength(2)
    expect(model.value[0]).toMatch(/-03$/)
    expect(model.value[1]).toMatch(/-07$/)

    const monthDivs = screen.getByCSS('.v-month-picker__months-content')
      .querySelectorAll('.v-month-picker__month')
    expect(monthDivs[3].classList.contains('v-month-picker__month--range-middle')).toBe(true) // Apr
    expect(monthDivs[4].classList.contains('v-month-picker__month--range-middle')).toBe(true) // May
    expect(monthDivs[5].classList.contains('v-month-picker__month--range-middle')).toBe(true) // Jun
    expect(monthDivs[2].classList.contains('v-month-picker__month--range-start')).toBe(true) // Mar
    expect(monthDivs[6].classList.contains('v-month-picker__month--range-end')).toBe(true) // Jul
  })

  it('should support multiple selection', async () => {
    const model = ref<string[]>([])

    render(() => (
      <VMonthPicker
        v-model={ model.value }
        multiple
        color="primary"
      />
    ))

    const monthButtons = screen.getByCSS('.v-month-picker__months-content')
      .querySelectorAll('.v-btn')

    await userEvent.click(monthButtons[0]) // January
    expect(model.value).toHaveLength(1)

    await userEvent.click(monthButtons[2]) // March
    expect(model.value).toHaveLength(2)

    await userEvent.click(monthButtons[5]) // June
    expect(model.value).toHaveLength(3)

    await userEvent.click(monthButtons[0]) // January (deselect)
    expect(model.value).toHaveLength(2)
  })
})
