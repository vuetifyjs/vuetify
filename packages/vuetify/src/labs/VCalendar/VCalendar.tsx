// Styles
import './VCalendar.sass'

import { genericComponent, useRender } from '@/util'

import { useDate } from '@/labs/date'
import { VCalendarDay } from './VCalendarDay'

export const VCalendar = genericComponent()({
  name: 'VCalendar',

  props: {
    disabled: Array<Date>,
    hideDayHeaders: Boolean,
    type: {
      type: String,
      default: 'month',
      validator (val: string) {
        return ['month', 'week', 'day'].includes(val)
      },
    },
    value: Date,
    weekdays: {
      type: Array<number>,
      default: () => [0, 1, 2, 3, 4, 5, 6],
    },
  },

  setup (props, { emit, slots }) {
    const date = useDate()

    const dayNames = date.getWeekdays()
    const showWeeks = date.getWeekArray(new Date())
    useRender(() => (
      <div class={['v-calendar', 'v-calendar-monthly', 'v-calendar-weekly']}>
        <div v-if="!hideDayHeaders" class="v-calendar-weekly__head">
          {
            props.weekdays.map(weekday => (
              <div class="v-calendar-weekly__head-weekday">
                { dayNames[weekday] }
              </div>
            ))
          }
        </div>
        {
          showWeeks.map((week, wi) => (
            <div class="v-calendar-weekly__week">
              {
                week.filter((_, wi) => props.weekdays.includes(wi)).map((day, di) => (
                  <VCalendarDay
                    active={ props.value === day }
                    disabled={ day ? props.disabled?.includes(day) : false }
                    title={ day ? date.format(day, 'dayOfMonth') : 'NaN' }
                  ></VCalendarDay>
                ))
              }
            </div>
          ))
        }
      </div>
    ))

    return { showWeeks }
  },
})

export type VCalendar = InstanceType<typeof VCalendar>
