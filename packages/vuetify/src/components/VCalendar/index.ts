// Styles
import './VCalendarCategory.sass'
import './VCalendarDaily.sass'
import './VCalendarWeekly.sass'

import VCalendar from './VCalendar'
import VCalendarDaily from './VCalendarDaily'
import VCalendarWeekly from './VCalendarWeekly'
import VCalendarMonthly from './VCalendarMonthly'
import VCalendarCategory from './VCalendarCategory'

export { VCalendar, VCalendarCategory, VCalendarDaily, VCalendarWeekly, VCalendarMonthly }

export default {
  $_vuetify_subcomponents: {
    VCalendar,
    VCalendarCategory,
    VCalendarDaily,
    VCalendarWeekly,
    VCalendarMonthly,
  },
}
