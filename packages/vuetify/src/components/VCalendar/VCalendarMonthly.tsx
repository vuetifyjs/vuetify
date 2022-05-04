import { computed, defineComponent } from "vue";
import type { ComputedRef } from 'vue'

import { VCalendarWeekly } from "./VCalendarWeekly";
import { CalendarTimestamp, getEndOfMonth, getStartOfMonth, parseTimestamp } from "@/composables/calendar/timestamp";
// import type { CalendarCategory } from '@/composables/calendar/timestamp'
import { makeBaseProps, makeTimesProps, makeWeeksProps } from "./composables/props";
import { makeThemeProps } from "@/composables/theme";
import { makeVariantProps } from "@/composables/variant";
import { VTimestampInput } from "../VCalendar_old/util/timestamp";

export const VCalendarMonthly = defineComponent({
  name: 'VCalendarMonthly',
  props: {
    categories: Array,
    maxDays: Number,
    ...makeTimesProps(),
    ...makeBaseProps(),
    ...makeWeeksProps(),
    ...makeThemeProps(),
    ...makeVariantProps()
  },
  setup(props, { attrs, slots }) {
    // Computeds
    const staticClass: ComputedRef<string> = computed(() => {
      return 'v-calendar-monthly v-calendar-weekly'
    })

    const parsedStart: ComputedRef<CalendarTimestamp> = computed(() => {
      return getStartOfMonth(parseTimestamp(props.start, true))
    })

    const parsedEnd: ComputedRef<CalendarTimestamp> = computed(() => {
      return getEndOfMonth(parseTimestamp(props.end as VTimestampInput, true))
    })
    return () => (
        <VCalendarWeekly class={staticClass} { ...{...props, start: props.start, end: props.end, parsedStart: parsedStart.value, parsedEnd: parsedEnd.value} }></VCalendarWeekly>
    )
   
    
  }

})

export type VCalendarMonthly = InstanceType<typeof VCalendarMonthly>
