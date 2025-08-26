// Styles
import './VCalendarWeekly.sass'

// Components
import { VCalendarWeekly } from './VCalendarWeekly'

// Composables
import { makeCalendarBaseProps } from './composables/calendarBase'
import { forwardRefs } from '@/composables/forwardRefs'

// Utilities
import { computed, ref } from 'vue'
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
    const parsedStart = computed((): CalendarTimestamp => {
      return getStartOfMonth(parseTimestamp(props.start, true))
    })

    const parsedEnd = computed((): CalendarTimestamp => {
      return getEndOfMonth(parseTimestamp(props.end!, true))
    })

    const weeklyRef = ref<VCalendarWeekly>()

    useRender(() => (
      <VCalendarWeekly
        ref={ weeklyRef }
        class="v-calendar-monthly"
        { ...props }
        start={ parsedStart.value.date }
        end={ parsedEnd.value.date }
        v-slots={ slots }
      />
    ))

    return forwardRefs({
      parsedStart,
      parsedEnd,
    }, weeklyRef)
  },
})

export type VCalendarMonthly = InstanceType<typeof VCalendarMonthly>
