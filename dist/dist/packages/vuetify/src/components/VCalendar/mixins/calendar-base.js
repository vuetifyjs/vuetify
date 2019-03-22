// Mixins
import mixins from '../../../util/mixins';
import Themeable from '../../../mixins/themeable';
import Colorable from '../../../mixins/colorable';
import Times from './times';
import Mouse from './mouse';
// Util
import props from '../util/props';
import { parseTimestamp, getWeekdaySkips, createDayList, createNativeLocaleFormatter, getStartOfWeek, getEndOfWeek } from '../util/timestamp';
/* @vue/component */
export default mixins(Colorable, Themeable, Times, Mouse).extend({
    name: 'calendar-base',
    props: props.base,
    computed: {
        weekdaySkips: function () {
            return getWeekdaySkips(this.weekdays);
        },
        parsedStart: function () {
            return parseTimestamp(this.start);
        },
        parsedEnd: function () {
            return parseTimestamp(this.end);
        },
        days: function () {
            return createDayList(this.parsedStart, this.parsedEnd, this.times.today, this.weekdaySkips);
        },
        dayFormatter: function () {
            if (this.dayFormat) {
                return this.dayFormat;
            }
            var options = { timeZone: 'UTC', day: 'numeric' };
            return createNativeLocaleFormatter(this.locale, function (_tms, _short) { return options; });
        },
        weekdayFormatter: function () {
            if (this.weekdayFormat) {
                return this.weekdayFormat;
            }
            var longOptions = { timeZone: 'UTC', weekday: 'long' };
            var shortOptions = { timeZone: 'UTC', weekday: 'short' };
            return createNativeLocaleFormatter(this.locale, function (_tms, short) { return short ? shortOptions : longOptions; });
        }
    },
    methods: {
        getRelativeClasses: function (timestamp, outside) {
            if (outside === void 0) {
                outside = false;
            }
            return {
                'v-present': timestamp.present,
                'v-past': timestamp.past,
                'v-future': timestamp.future,
                'v-outside': outside
            };
        },
        getStartOfWeek: function (timestamp) {
            return getStartOfWeek(timestamp, this.weekdays, this.times.today);
        },
        getEndOfWeek: function (timestamp) {
            return getEndOfWeek(timestamp, this.weekdays, this.times.today);
        }
    }
});
//# sourceMappingURL=calendar-base.js.map
//# sourceMappingURL=calendar-base.js.map