// Composables
import { makeCalendarProps, useCalendar } from '@/composables/calendar'
import { useDate } from '@/composables/date'

// Utilities
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { createVuetify } from '@/framework'

// Types
import type { CalendarProps } from '@/composables/calendar'

describe('calendar', () => {
  it('renders days based upon displayValue', () => {
    expect.assertions(2)
    mount(defineComponent({
      props: makeCalendarProps(),
      setup (props) {
        const calendar = useCalendar({ ...props, displayValue: '2021-10-10' } as any)
        const date = useDate()

        expect(date.format(calendar.displayValue.value, 'monthAndYear')).toMatchInlineSnapshot(`"October 2021"`)
        expect(calendar.daysInMonth.value.map(day => day.isoDate)).toMatchInlineSnapshot(`
          [
            "2021-09-26",
            "2021-09-27",
            "2021-09-28",
            "2021-09-29",
            "2021-09-30",
            "2021-10-01",
            "2021-10-02",
            "2021-10-03",
            "2021-10-04",
            "2021-10-05",
            "2021-10-06",
            "2021-10-07",
            "2021-10-08",
            "2021-10-09",
            "2021-10-10",
            "2021-10-11",
            "2021-10-12",
            "2021-10-13",
            "2021-10-14",
            "2021-10-15",
            "2021-10-16",
            "2021-10-17",
            "2021-10-18",
            "2021-10-19",
            "2021-10-20",
            "2021-10-21",
            "2021-10-22",
            "2021-10-23",
            "2021-10-24",
            "2021-10-25",
            "2021-10-26",
            "2021-10-27",
            "2021-10-28",
            "2021-10-29",
            "2021-10-30",
            "2021-10-31",
            "2021-11-01",
            "2021-11-02",
            "2021-11-03",
            "2021-11-04",
            "2021-11-05",
            "2021-11-06",
          ]
        `)

        return () => {}
      },
    }), {
      global: { plugins: [createVuetify()] },
    })
  })

  it.each([
    [{}, 'S,M,T,W,T,F,S'],
    [{ weekdays: [1, 2, 3, 4, 5] }, 'M,T,W,T,F'],
    [{ firstDayOfWeek: 1 }, 'M,T,W,T,F,S,S'],
    [{ firstDayOfWeek: 2 }, 'T,W,T,F,S,S,M'],
    [{ firstDayOfWeek: 3 }, 'W,T,F,S,S,M,T'],
    [{ firstDayOfWeek: 1, weekdays: [1, 2, 3, 4] }, 'M,T,W,T'],
    [{ firstDayOfWeek: 1, weekdays: [2, 3, 4] }, 'T,W,T'],
    [{ firstDayOfWeek: 2, weekdays: [2, 3, 4] }, 'T,W,T'],
    [{ firstDayOfWeek: 3, weekdays: [2, 3, 4] }, 'W,T,T'],
  ] as [CalendarProps, string][])('calculates weekday labels correctly for %s', (customizedProps: CalendarProps, expected: string) => {
    expect.assertions(1)
    mount(defineComponent({
      props: makeCalendarProps(customizedProps),
      setup (props) {
        const calendar = useCalendar(props as any)
        expect(calendar.weekdayLabels.value.join(',')).toBe(expected)
        return () => {}
      },
    }), {
      global: { plugins: [createVuetify()] },
    })
  })
})
