// Components
import { VDatePicker } from '../VDatePicker'

// Utilities
import { render, screen, userEvent } from '@test'
import { nextTick, ref } from 'vue'

// January 2026, Sun-start:
// Sun Mon Tue Wed Thu Fri Sat
//                   1   2   3
//   4   5   6   7   8   9  10
//  11  12  13  14  15  16  17
//  18  19  20  21  22  23  24
//  25  26  27  28  29  30  31

const highlighted = () => document.querySelector<HTMLElement>('[data-highlighted]')

describe('VDatePickerMonth — virtual focus', () => {
  it('arrow keys move data-highlighted without changing the model, Enter and Space select', async () => {
    const model = ref()
    render(() => <VDatePicker v-model={ model.value } month={ 0 } year={ 2026 } />)

    // Click Jan 10 (Sat, last of row 2) — sets selection and virtual focus
    await userEvent.click(await screen.findByText('10'))
    const valueAt10 = model.value

    // ArrowRight: 10 → 11, crosses week-row boundary (Sat → Sun)
    await userEvent.keyboard('{ArrowRight}')
    expect(model.value).toStrictEqual(valueAt10)
    expect(highlighted()?.textContent?.trim()).toBe('11')

    // ArrowDown: 11 → 18
    await userEvent.keyboard('{ArrowDown}')
    expect(model.value).toStrictEqual(valueAt10)
    expect(highlighted()?.textContent?.trim()).toBe('18')

    // ArrowLeft: 18 → 17
    await userEvent.keyboard('{ArrowLeft}')
    expect(model.value).toStrictEqual(valueAt10)
    expect(highlighted()?.textContent?.trim()).toBe('17')

    // ArrowUp: 17 → 10
    await userEvent.keyboard('{ArrowUp}')
    expect(model.value).toStrictEqual(valueAt10)
    expect(highlighted()?.textContent?.trim()).toBe('10')

    // Enter selects the highlighted day (10)
    await userEvent.keyboard('{Enter}')
    expect(new Date(model.value).getDate()).toBe(10)

    // Click 11 (Sun, first of row 3), ArrowLeft crosses back to 10 (Sat)
    await userEvent.click(await screen.findByText('11'))
    await userEvent.keyboard('{ArrowLeft}')
    expect(highlighted()?.textContent?.trim()).toBe('10')

    // Space selects the highlighted day (10)
    await userEvent.keyboard(' ')
    expect(new Date(model.value).getDate()).toBe(10)
  })

  it('starts navigation from the clicked day', async () => {
    render(() => <VDatePicker month={ 0 } year={ 2026 } />)

    // Click 2 (Fri), ArrowDown → 9 (Fri, same column)
    await userEvent.click(await screen.findByText('2'))
    await userEvent.keyboard('{ArrowDown}')
    expect(highlighted()?.textContent?.trim()).toBe('9')

    // Click 11 (Sun), ArrowRight → 12 (Mon)
    await userEvent.click(await screen.findByText('11'))
    await userEvent.keyboard('{ArrowRight}')
    expect(highlighted()?.textContent?.trim()).toBe('12')

    // Click 15 (Thu), ArrowLeft → 14 (Wed)
    await userEvent.click(await screen.findByText('15'))
    await userEvent.keyboard('{ArrowLeft}')
    expect(highlighted()?.textContent?.trim()).toBe('14')

    // Click 28 (Wed), ArrowUp → 21 (Wed, same column)
    await userEvent.click(await screen.findByText('28'))
    await userEvent.keyboard('{ArrowUp}')
    expect(highlighted()?.textContent?.trim()).toBe('21')
  })
})

describe('VDatePickerMonth — onFocusin', () => {
  it('focuses the first visible non-adjacent day when tabbing in without a selection', async () => {
    // showAdjacentMonths ensures adjacent buttons exist in DOM,
    // confirming onFocusin skips them and lands on Jan 1
    render(() => (
      <>
        <VDatePicker month={ 0 } year={ 2026 } showAdjacentMonths />
        <button data-testid="after">After</button>
      </>
    ))

    await userEvent.click(screen.getByTestId('after'))
    await userEvent.tab({ shift: true }) // → day grid

    expect(highlighted()?.textContent?.trim()).toBe('1')
  })

  it('focuses the selected day when tabbing in', async () => {
    render(() => (
      <>
        <VDatePicker modelValue="2026-01-15" month={ 0 } year={ 2026 } />
        <button data-testid="after">After</button>
      </>
    ))

    await userEvent.click(screen.getByTestId('after'))
    await userEvent.tab({ shift: true }) // → day grid

    expect(highlighted()?.textContent?.trim()).toBe('15')
  })
})

describe('VDatePickerMonth — tab order', () => {
  it('Tab from a day button escapes the grid; Shift+Tab re-enters it', async () => {
    render(() => (
      <>
        <VDatePicker modelValue="2026-01-15" month={ 0 } year={ 2026 } />
        <button data-testid="after">After</button>
      </>
    ))

    const grid = screen.getByCSS('.v-date-picker-month__days')

    await userEvent.click(screen.getByTestId('after'))
    await userEvent.tab({ shift: true }) // → day grid
    expect(highlighted()?.textContent?.trim()).toBe('15')

    // Move virtual focus off the selected day
    await userEvent.keyboard('{ArrowRight}{ArrowRight}')
    expect(highlighted()?.textContent?.trim()).toBe('17')

    // Tab should move focus out of the grid entirely
    await userEvent.tab()
    expect(document.activeElement).toBe(screen.getByTestId('after'))

    // Shift+Tab should return focus into the grid
    await userEvent.tab({ shift: true })
    expect(grid.contains(document.activeElement) || document.activeElement === grid).toBe(true)
  })

  it('Shift+Tab from a day button escapes to before the picker', async () => {
    render(() => (
      <>
        <button data-testid="before">Before</button>
        <VDatePicker modelValue="2026-01-15" month={ 0 } year={ 2026 }>
          {{ controls: () => null }}
        </VDatePicker>
        <button data-testid="after">After</button>
      </>
    ))

    await userEvent.click(screen.getByTestId('after'))
    await userEvent.tab({ shift: true }) // → day grid

    await userEvent.tab({ shift: true }) // escape upward
    expect(document.activeElement).toBe(screen.getByTestId('before'))
  })
})

describe('VDatePickerMonth — focusout', () => {
  it('click outside the grid removes data-highlighted', async () => {
    render(() => (
      <>
        <VDatePicker modelValue="2026-01-15" month={ 0 } year={ 2026 } />
        <button data-testid="after">After</button>
      </>
    ))

    await userEvent.click(screen.getByTestId('after'))
    await userEvent.tab({ shift: true }) // → day grid
    expect(highlighted()).not.toBeNull()

    await userEvent.click(document.body)
    expect(highlighted()).toBeNull()
  })
})

describe('VDatePickerMonth — boundary crossing', () => {
  it('ArrowLeft from Feb 1 navigates to Jan 31', async () => {
    const month = ref(1)
    const year = ref(2026)
    render(() => (
      <VDatePicker
        modelValue="2026-02-01"
        v-model:month={ month.value }
        v-model:year={ year.value }
      />
    ))

    // Click Feb 1 to anchor virtual focus on the selected day
    await userEvent.click(await screen.findByText('1'))
    await userEvent.keyboard('{ArrowLeft}')

    expect(month.value).toBe(0)
    await expect.poll(() => document.querySelector('[data-highlighted]')?.textContent?.trim()).toBe('31')
  })

  it('ArrowDown crosses into the next month to the same weekday', async () => {
    const month = ref(0)
    const year = ref(2026)
    render(() => (
      <VDatePicker
        modelValue="2026-01-29"
        v-model:month={ month.value }
        v-model:year={ year.value }
      />
    ))

    // Click Jan 29 (Thu) to anchor virtual focus
    await userEvent.click(await screen.findByText('29'))
    await userEvent.keyboard('{ArrowDown}')

    expect(month.value).toBe(1)
    // Jan 29 (Thu) + 7 days = Feb 5 (Thu)
    await expect.poll(() => document.querySelector('[data-highlighted]')?.textContent?.trim()).toBe('5')
  })

  it('grid retains data-highlighted on a button after cross-month transition', async () => {
    const month = ref(1)
    const year = ref(2026)
    render(() => (
      <VDatePicker
        modelValue="2026-02-01"
        v-model:month={ month.value }
        v-model:year={ year.value }
      />
    ))

    await userEvent.click(await screen.findByText('1'))
    await userEvent.keyboard('{ArrowLeft}')

    await expect.poll(() => document.querySelector('[data-highlighted]')).not.toBeNull()
    expect(document.querySelector('[data-highlighted]')!.tagName.toLowerCase()).toBe('button')
  })

  it('emits update:month and update:year when crossing boundary', async () => {
    const onUpdateMonth = vi.fn()
    const onUpdateYear = vi.fn()
    render(() => (
      <VDatePicker
        modelValue="2026-01-01"
        month={ 0 }
        year={ 2026 }
        onUpdate:month={ onUpdateMonth }
        onUpdate:year={ onUpdateYear }
      />
    ))

    // Click Jan 1 to anchor virtual focus on the selected day
    await userEvent.click(await screen.findByText('1'))
    await userEvent.keyboard('{ArrowLeft}') // Jan 1 → Dec 31

    expect(onUpdateMonth).toHaveBeenCalledWith(11)
    expect(onUpdateYear).toHaveBeenCalledWith(2025)
  })
})

describe('VDatePickerMonth — Escape', () => {
  it('highlights the selected day when it is in the current month', async () => {
    render(() => <VDatePicker modelValue="2026-01-15" month={ 0 } year={ 2026 } />)

    await userEvent.click(await screen.findByText('15'))
    await userEvent.keyboard('{ArrowRight}')
    expect(highlighted()?.textContent?.trim()).toBe('16')

    await userEvent.keyboard('{Escape}')
    expect(highlighted()?.textContent?.trim()).toBe('15')
  })

  it('highlights today when there is no selection, navigating months if necessary', async () => {
    const month = ref(5)
    const year = ref(2099)
    render(() => (
      <>
        <VDatePicker v-model:month={ month.value } v-model:year={ year.value } />
        <button data-testid="after">After</button>
      </>
    ))

    await userEvent.click(screen.getByTestId('after'))
    await userEvent.tab({ shift: true }) // → day grid

    await userEvent.keyboard('{Escape}')
    await nextTick()

    const today = new Date()
    expect(month.value).toBe(today.getMonth())
    expect(year.value).toBe(today.getFullYear())
    await expect.poll(() => document.querySelector('[data-highlighted]')).not.toBeNull()
  })
})

describe('VDatePickerMonths — Escape', () => {
  it('closes the months panel and returns focus with a highlighted day in the grid', async () => {
    render(() => (
      <>
        <VDatePicker modelValue="2026-01-15" month={ 0 } year={ 2026 } />
        <button data-testid="after">After</button>
      </>
    ))

    await userEvent.click(screen.getByTestId('month-btn'))
    await screen.findByCSS('.v-date-picker-months__content')
    await userEvent.click(screen.getByTestId('after'))
    await userEvent.tab({ shift: true }) // → months content

    await userEvent.keyboard('{Escape}')

    await expect.poll(() => document.querySelector('.v-date-picker-months')).toBeNull()
    await expect.poll(() => document.querySelector('[data-highlighted]')).not.toBeNull()
    expect(document.querySelector('[data-highlighted]')!.tagName.toLowerCase()).toBe('button')
  })
})

describe('VDatePickerYears — Escape', () => {
  it('closes the years panel and returns focus with a highlighted day in the grid', async () => {
    render(() => (
      <>
        <VDatePicker modelValue="2026-01-15" month={ 0 } year={ 2026 } />
        <button data-testid="after">After</button>
      </>
    ))

    await userEvent.click(screen.getByTestId('year-btn'))
    await screen.findByCSS('.v-date-picker-years__content')
    await userEvent.click(screen.getByTestId('after'))
    await userEvent.tab({ shift: true }) // → years content

    await userEvent.keyboard('{Escape}')

    await expect.poll(() => document.querySelector('.v-date-picker-years')).toBeNull()
    await expect.poll(() => document.querySelector('[data-highlighted]')).not.toBeNull()
    expect(document.querySelector('[data-highlighted]')!.tagName.toLowerCase()).toBe('button')
  })
})

describe('VDatePickerMonths — virtual focus', () => {
  it('arrow keys, Enter, Shift+Tab and click outside work correctly', async () => {
    const month = ref(0)
    render(() => (
      <>
        <button data-testid="before">Before</button>
        <VDatePicker v-model:month={ month.value } year={ 2026 } />
        <button data-testid="after">After</button>
      </>
    ))

    const openMonths = async () => {
      await userEvent.click(screen.getByTestId('month-btn'))
      await screen.findByCSS('.v-date-picker-months__content')
      await userEvent.click(screen.getByTestId('after'))
      await userEvent.tab({ shift: true }) // → months content → onFocusin highlights current month
    }

    await openMonths()

    expect(highlighted()).not.toBeNull()
    const initialMonth = month.value

    // ArrowRight: Jan → Feb (no model change)
    await userEvent.keyboard('{ArrowRight}')
    expect(month.value).toBe(initialMonth)
    expect(highlighted()?.textContent?.trim()).toContain('Feb')

    // Enter selects Feb (panel auto-closes)
    await userEvent.keyboard('{Enter}')
    expect(month.value).toBe(1)

    // Re-open
    await openMonths()
    expect(highlighted()).not.toBeNull()

    // Click outside clears data-highlighted (panel stays open)
    await userEvent.click(document.body)
    expect(highlighted()).toBeNull()

    // Panel is still open — re-tab into it and Shift+Tab escapes upward
    await userEvent.click(screen.getByTestId('after'))
    await userEvent.tab({ shift: true }) // → months content
    await userEvent.tab({ shift: true }) // → escapes upward
    expect(document.querySelector('.v-date-picker-months__content')?.contains(document.activeElement)).toBe(false)
  })
})

describe('VDatePickerYears — virtual focus', () => {
  it('arrow keys, Enter, Shift+Tab and click outside work correctly', async () => {
    const year = ref(2026)
    render(() => (
      <>
        <button data-testid="before">Before</button>
        <VDatePicker v-model:year={ year.value } month={ 0 } />
        <button data-testid="after">After</button>
      </>
    ))

    const openYears = async () => {
      await userEvent.click(screen.getByTestId('year-btn'))
      await screen.findByCSS('.v-date-picker-years__content')
      await userEvent.click(screen.getByTestId('after'))
      await userEvent.tab({ shift: true }) // → years content → onFocusin highlights current year
    }

    await openYears()

    expect(highlighted()).not.toBeNull()
    expect(highlighted()?.textContent?.trim()).toBe('2026')
    const initialYear = year.value

    // ArrowRight: 2026 → 2027 (no model change)
    await userEvent.keyboard('{ArrowRight}')
    expect(year.value).toBe(initialYear)
    expect(highlighted()?.textContent?.trim()).toBe('2027')

    // Enter selects 2027 (panel auto-closes)
    await userEvent.keyboard('{Enter}')
    expect(year.value).toBe(2027)

    // Re-open; the highlighted year should be the newly selected one
    await openYears()
    expect(highlighted()?.textContent?.trim()).toBe('2027')

    // Click outside clears data-highlighted (panel stays open)
    await userEvent.click(document.body)
    expect(highlighted()).toBeNull()

    // Panel is still open — re-tab into it and Shift+Tab escapes upward
    await userEvent.click(screen.getByTestId('after'))
    await userEvent.tab({ shift: true }) // → years content
    await userEvent.tab({ shift: true }) // → escapes upward
    expect(document.querySelector('.v-date-picker-years__content')?.contains(document.activeElement)).toBe(false)
  })
})

describe('VDatePickerMonth — with custom weekdays', () => {
  // Jan 2026, Mon–Fri only:
  //  Mon Tue Wed Thu Fri
  //                1   2
  //   5   6   7   8   9
  //  12  13  14  15  16
  //  19  20  21  22  23
  //  26  27  28  29  30

  it('ArrowUp/Down moves to the same weekday column', async () => {
    render(() => <VDatePicker modelValue="2026-01-08" month={ 0 } year={ 2026 } weekdays={[1, 2, 3, 4, 5]} />)

    await userEvent.click(await screen.findByText('8')) // Jan 8 (Thu)
    await userEvent.keyboard('{ArrowDown}')
    expect(highlighted()?.textContent?.trim()).toBe('15')

    await userEvent.keyboard('{ArrowUp}')
    expect(highlighted()?.textContent?.trim()).toBe('8')
  })

  it('ArrowRight skips invisible weekend days', async () => {
    // Jan 9 = Fri; next visible day = Jan 12 (Mon), skipping Sat 10 and Sun 11
    render(() => <VDatePicker modelValue="2026-01-09" month={ 0 } year={ 2026 } weekdays={[1, 2, 3, 4, 5]} />)

    await userEvent.click(await screen.findByText('9'))
    await userEvent.keyboard('{ArrowRight}')
    expect(highlighted()?.textContent?.trim()).toBe('12')

    await userEvent.keyboard('{ArrowLeft}')
    expect(highlighted()?.textContent?.trim()).toBe('9')
  })

  it('cross-month boundary works correctly with filtered weekdays', async () => {
    const month = ref(0)
    const year = ref(2026)
    // Jan 30 = Fri; next visible day = Feb 2 (Mon)
    render(() => (
      <VDatePicker
        modelValue="2026-01-30"
        v-model:month={ month.value }
        v-model:year={ year.value }
        weekdays={[1, 2, 3, 4, 5]}
      />
    ))

    await userEvent.click(await screen.findByText('30'))
    await userEvent.keyboard('{ArrowRight}')

    expect(month.value).toBe(1)
    await expect.poll(() => document.querySelector('[data-highlighted]')?.textContent?.trim()).toBe('2')
  })

  it('ArrowLeft from the first workday when the 1st is a weekend skips to the prev month', async () => {
    // March 2026: March 1 = Sun (not shown), March 2 = Mon (first workday).
    // ArrowLeft should skip Sun Mar 1 and Sat Feb 28, landing on Fri Feb 27.
    const month = ref(2)
    const year = ref(2026)
    render(() => (
      <VDatePicker
        modelValue="2026-03-02"
        v-model:month={ month.value }
        v-model:year={ year.value }
        weekdays={[1, 2, 3, 4, 5]}
      />
    ))

    await userEvent.click(await screen.findByText('2'))
    await userEvent.keyboard('{ArrowLeft}')

    expect(month.value).toBe(1)
    await expect.poll(() => document.querySelector('[data-highlighted]')?.textContent?.trim()).toBe('27')
  })

  it('ArrowLeft from the first workday when prev month ends on a weekend keeps focus', async () => {
    // June 2026: June 1 = Mon (first workday).
    // ArrowLeft should skip Sun May 31 and Sat May 30, landing on Fri May 29.
    const month = ref(5)
    const year = ref(2026)
    render(() => (
      <VDatePicker
        modelValue="2026-06-01"
        v-model:month={ month.value }
        v-model:year={ year.value }
        weekdays={[1, 2, 3, 4, 5]}
      />
    ))

    await userEvent.click(await screen.findByText('1'))
    await userEvent.keyboard('{ArrowLeft}')

    expect(month.value).toBe(4)
    await expect.poll(() => document.querySelector('[data-highlighted]')?.textContent?.trim()).toBe('29')
  })
})

describe('VDatePickerMonth — edge cases', () => {
  it('does not throw when no date is selected and arrow key is pressed', async () => {
    render(() => (
      <>
        <VDatePicker />
        <button data-testid="after">After</button>
      </>
    ))

    await userEvent.click(screen.getByTestId('after'))
    await userEvent.tab({ shift: true }) // → day grid

    await expect(userEvent.keyboard('{ArrowRight}')).resolves.not.toThrow()
  })

  it('does not clear existing selections in multiple mode when navigating', async () => {
    const model = ref<unknown[]>([])
    render(() => <VDatePicker v-model={ model.value } multiple />)

    await userEvent.click(await screen.findByText('10'))
    await userEvent.click(await screen.findByText('15'))
    expect(model.value).toHaveLength(2)

    await userEvent.keyboard('{ArrowRight}')

    expect(model.value).toHaveLength(2)
  })
})

describe('VDatePickerMonth — multiple mode', () => {
  it('navigating with arrow keys and selecting with Enter and Space', async () => {
    const model = ref<unknown[]>([])
    render(() => <VDatePicker v-model={ model.value } multiple month={ 0 } year={ 2026 } />)

    // Click Jan 5 to anchor virtual focus
    await userEvent.click(await screen.findByText('5'))
    expect(model.value).toHaveLength(1)

    // ArrowRight → 6, Enter to select
    await userEvent.keyboard('{ArrowRight}')
    await userEvent.keyboard('{Enter}')
    expect(model.value).toHaveLength(2)

    // ArrowDown → 13, Space to select
    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard(' ')
    expect(model.value).toHaveLength(3)

    const dates = (model.value as Date[]).map(d => new Date(d).getDate())
    expect(dates).toContain(5)
    expect(dates).toContain(6)
    expect(dates).toContain(13)
  })
})

describe('preserve focus when selecting day from adjacent month', () => {
  // January 2026, Sun-start: Dec 28–31 appear as adjacent days in the first row.
  // Jan 1 = index 4, Dec 31 = index 3.

  it('selection transitions the month, while keeping focus the arrows working', async () => {
    const model = ref<unknown>()
    const month = ref(0)
    const year = ref(2026)
    render(() => (
      <VDatePicker
        v-model={ model.value }
        v-model:month={ month.value }
        v-model:year={ year.value }
        showAdjacentMonths
      />
    ))

    // Anchor virtual focus on Jan 1, then move to adjacent Dec 31.
    // findByText('1') would be ambiguous — Feb 1 is also rendered as adjacent
    // in the 6th static week row, so target by data-v-date instead.
    await userEvent.click(await screen.findByCSS('[data-v-date="2026-01-01"]'))
    await userEvent.keyboard('{ArrowLeft}')
    expect(highlighted()?.textContent?.trim()).toBe('31')
    expect(month.value).toBe(0)

    // Enter selects Dec 31 → month transitions to December
    await userEvent.keyboard('{Enter}')
    expect(month.value).toBe(11)
    expect(year.value).toBe(2025)

    // Focus must be restored to Dec 31 in the new view
    await expect.poll(() => document.querySelector('[data-highlighted]')?.textContent?.trim()).toBe('31')

    // Arrow keys must work after the transition
    await userEvent.keyboard('{ArrowLeft}')
    await expect.poll(() => document.querySelector('[data-highlighted]')?.textContent?.trim()).toBe('30')
  })
})

describe('VDatePickerMonth — range mode', () => {
  it('navigating and selecting with Enter, including cross-month', async () => {
    const model = ref<unknown[]>([])
    const month = ref(0)
    const year = ref(2026)
    render(() => (
      <VDatePicker
        v-model={ model.value }
        multiple="range"
        v-model:month={ month.value }
        v-model:year={ year.value }
      />
    ))

    // Click Jan 29 to set range start
    await userEvent.click(await screen.findByText('29'))
    expect(model.value).toHaveLength(1)

    // ArrowRight × 3: Jan 29 → 30 → 31 → boundary → Feb 1
    await userEvent.keyboard('{ArrowRight}')
    await userEvent.keyboard('{ArrowRight}')
    await userEvent.keyboard('{ArrowRight}')

    expect(month.value).toBe(1)
    await expect.poll(() => document.querySelector('[data-highlighted]')?.textContent?.trim()).toBe('1')

    // Enter to set range end at Feb 1
    await userEvent.keyboard('{Enter}')
    expect(model.value).toHaveLength(2)

    const [start, end] = model.value as Date[]
    expect(new Date(start).getDate()).toBe(29)
    expect(new Date(start).getMonth()).toBe(0)
    expect(new Date(end).getDate()).toBe(1)
    expect(new Date(end).getMonth()).toBe(1)
  })
})
