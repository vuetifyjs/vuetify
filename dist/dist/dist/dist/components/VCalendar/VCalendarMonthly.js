// Styles
import '../../stylus/components/_calendar-weekly.styl';
// Mixins
import VCalendarWeekly from './VCalendarWeekly';
// Util
import { parseTimestamp, getStartOfMonth, getEndOfMonth } from './util/timestamp';
/* @vue/component */
export default VCalendarWeekly.extend({
    name: 'v-calendar-monthly',
    computed: {
        staticClass: function () {
            return 'v-calendar-monthly v-calendar-weekly';
        },
        parsedStart: function () {
            return getStartOfMonth(parseTimestamp(this.start));
        },
        parsedEnd: function () {
            return getEndOfMonth(parseTimestamp(this.end));
        }
    }
});
//# sourceMappingURL=VCalendarMonthly.js.map
//# sourceMappingURL=VCalendarMonthly.js.map
//# sourceMappingURL=VCalendarMonthly.js.map
//# sourceMappingURL=VCalendarMonthly.js.map