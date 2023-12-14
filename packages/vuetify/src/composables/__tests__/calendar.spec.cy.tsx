/// <reference types="../../../types/cypress" />

// Composables
import { makeCalendarProps, useCalendar } from '@/composables/calendar'
import { useDate } from '@/composables/date'

// Utilities
import { defineComponent } from 'vue'

const Component = defineComponent({
  props: makeCalendarProps(),
  setup (props) {
    const { daysInMonth, displayValue } = useCalendar(props as any)
    const date = useDate()

    return () => (
      <div class="pa-2">
        <div class="mb-4">
          { date.format(displayValue.value, 'monthAndYear') }
        </div>

        <div class="d-flex flex-wrap ga-2">
          { daysInMonth.value.map((day: any) => (
            <div class="pa-2 border">{ day.isoDate }</div>
          ))}
        </div>
      </div>
    )
  },
})

describe('calendar.ts', () => {
  it('render days based upon displayValue', () => {
    cy
      .mount(() => (<Component displayValue="2021-10-10" />))
      .percySnapshot()
  })
})
