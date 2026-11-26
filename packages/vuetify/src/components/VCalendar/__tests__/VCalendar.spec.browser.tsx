// Components
import { VCalendar } from '../VCalendar'

// Utilities
import { render, screen, userEvent } from '@test'
import { shallowRef } from 'vue'

describe('VCalendar', () => {
  it('should scroll the category view with the mouse wheel', async () => {
    render(() => (
      <div style={{ height: '300px' }}>
        <VCalendar type="category" categories={['John Smith', 'Tori Walker']} categoryShowAll />
      </div>
    ))

    const calendar = screen.getByCSS('.v-calendar-category')
    expect(calendar.scrollHeight).toBeGreaterThan(calendar.clientHeight)

    await userEvent.wheel(calendar, { delta: { y: 200 } })

    await expect.poll(() => calendar.scrollTop).toBeGreaterThan(0)
  })

  it('should scroll the category view to time', async () => {
    const calendar = shallowRef()
    render(() => (
      <div style={{ height: '300px' }}>
        <VCalendar ref={ calendar } type="category" categories={['John Smith']} />
      </div>
    ))

    const root = screen.getByCSS('.v-calendar-category')
    expect(calendar.value.scrollToTime('12:00')).toBe(true)
    expect(root.scrollTop).toBeGreaterThan(0)
  })
})
