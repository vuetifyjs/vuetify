// Styles
import './VCalendarWeekly.sass'

// Mixins
import VCalendarWeekly from './VCalendarWeekly'

// Util
import { getEndOfMonth, getStartOfMonth, parseTimestamp } from './util/timestamp'

// Utilities
import { defineComponent } from '@/util'

// Types
import type { CalendarTimestamp } from './types'

/* @vue/component */
export default defineComponent({
  name: 'VCalendarMonthly',

  extends: VCalendarWeekly,

  computed: {
    staticClass (): string {
      return 'v-calendar-monthly v-calendar-weekly'
    },
    parsedStart (): CalendarTimestamp {
      return getStartOfMonth(parseTimestamp(this.start, true))
    },
    parsedEnd (): CalendarTimestamp {
      return getEndOfMonth(parseTimestamp(this.end, true))
    },
  },

})
