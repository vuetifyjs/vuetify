// Styles
import './VCalendar.sass'

import { genericComponent, useRender } from '@/util'

export const VCalendar = genericComponent()({
  name: 'VCalendar',

  props: {
    value: [String, Date],
  },

  setup (props, { emit, slots }) {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const showWeeks = [0, 1, 2, 3, 4, 5]
    const showDays = [0, 1, 2, 3, 4, 5, 6]
    useRender(() => (
      <div class={['v-calendar', 'v-calendar-monthly', 'v-calendar-weekly']}>
        <div class="v-calendar-weekly__head">
          {
            weekdays.map(weekday => (
              <div class="v-calendar-weekly__head-weekday">
                { weekday }
              </div>
            ))
          }
        </div>
        {
          showWeeks.map((week, wi) => (
            <div class="v-calendar-weekly__week">
              {
                showDays.map((day, di) => (
                  <div class="v-calendar-weekly__day">
                    <div class="v-calendar-weekly__day-label">
                      Day { di }
                    </div>
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    ))

    return {}
  },
})

export type VCalendar = InstanceType<typeof VCalendar>
