// Styles
import './VCalendarWeekly.sass'

// Components
import { VCalendarWeekly } from './VCalendarWeekly'

// Composables
import { makeCalendarBaseProps, useCalendarBase } from './composables/calendarBase'

// Utilities
import { computed } from 'vue'
import { getEndOfMonth, getStartOfMonth, parseTimestamp } from './util/timestamp'
import { defineComponent, useRender } from '@/util'

// Types
import type { CalendarTimestamp } from './types'

export const VCalendarMonthly = defineComponent({
  name: 'VCalendarMonthly',

  props: {
    ...makeCalendarBaseProps(),
  },

  setup (props, { slots }) {
    const base = useCalendarBase(props)

    const parsedStart = computed((): CalendarTimestamp => {
      return getStartOfMonth(parseTimestamp(props.start, true))
    })

    const parsedEnd = computed((): CalendarTimestamp => {
      return getEndOfMonth(parseTimestamp(props.end!, true))
    })

    useRender(() => (
      <VCalendarWeekly
        class="v-calendar-monthly"
        { ...props }
        start={ parsedStart.value.date }
        end={ parsedEnd.value.date }
        v-slots={ slots }
      />
    ))

    return {
      ...base,
      parsedStart,
      parsedEnd,
    }
  },
})

export type VCalendarMonthly = InstanceType<typeof VCalendarMonthly>
