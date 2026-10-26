// Components
import { VCalendar } from '../VCalendar'

// Utilities
import LuxonAdapter from '@date-io/luxon'
import { render, screen } from '@test'

describe('VCalendar', () => {
  it('should accept and emit date adapter values', async () => {
    const adapter = new LuxonAdapter()
    const onUpdate = vi.fn()

    render(VCalendar, {
      props: {
        modelValue: adapter.date('2025-03-15'),
        now: adapter.date('2025-03-12T10:00'),
        events: [{ name: 'Standup', start: adapter.date('2025-03-12T09:00'), end: adapter.date('2025-03-12T09:15'), timed: true }],
      },
      attrs: { 'onUpdate:modelValue': onUpdate },
    }, {
      date: { adapter: LuxonAdapter },
    })

    await screen.findByText('Standup')

    const [firstDay] = await screen.findAllByCSS('.v-calendar-weekly__day:not(.v-outside) .v-calendar-weekly__day-label .v-icon-btn')
    firstDay.click()

    const [value] = onUpdate.mock.calls[0]
    expect(adapter.isValid(value)).toBe(true)
    expect(adapter.toISO(value)).toMatch(/^2025-03-01T00:00/)
  })
})
