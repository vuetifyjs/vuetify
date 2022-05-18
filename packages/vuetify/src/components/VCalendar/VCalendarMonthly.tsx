import { computed, defineComponent } from "vue";
import type { ComputedRef } from 'vue'

import { VCalendarWeekly } from "./VCalendarWeekly";
// import type { CalendarCategory } from '@/composables/calendar/timestamp'
import { makeBaseProps, makeTimesProps, makeWeeksProps } from "./composables/props";
import { makeThemeProps } from "@/composables/theme";
import { makeVariantProps } from "@/composables/variant";

export const VCalendarMonthly = defineComponent({
  name: 'VCalendarMonthly',
  props: {
    categories: Array,
    maxDays: Number,
    ...makeBaseProps(),
    ...makeThemeProps(),
    ...makeTimesProps(),
    ...makeVariantProps(),
    ...makeWeeksProps(),
  },
  setup(props, { attrs, slots }) {
    // Computeds
    const staticClass: ComputedRef<string> = computed(() => {
      return 'v-calendar-monthly v-calendar-weekly'
    })
    return () => (
      <VCalendarWeekly class={staticClass.value} { ...props} v-slots={ slots }></VCalendarWeekly>
    )
   
    
  }

})

export type VCalendarMonthly = InstanceType<typeof VCalendarMonthly>
