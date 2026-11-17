// Components
import { VCalendar } from '../VCalendar'

// Utilities
import { render, screen, userEvent } from '@test'

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
})
