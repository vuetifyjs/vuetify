// Mixins
import CalendarBase from './calendar-base';
// Util
import props from '../util/props';
import { parseTime, copyTimestamp, updateMinutes, createDayList, createIntervalList, createNativeLocaleFormatter } from '../util/timestamp';
/* @vue/component */
export default CalendarBase.extend({
    name: 'calendar-with-intervals',
    props: props.intervals,
    computed: {
        parsedFirstInterval: function () {
            return parseInt(this.firstInterval);
        },
        parsedIntervalMinutes: function () {
            return parseInt(this.intervalMinutes);
        },
        parsedIntervalCount: function () {
            return parseInt(this.intervalCount);
        },
        parsedIntervalHeight: function () {
            return parseFloat(this.intervalHeight);
        },
        firstMinute: function () {
            return this.parsedFirstInterval * this.parsedIntervalMinutes;
        },
        bodyHeight: function () {
            return this.parsedIntervalCount * this.parsedIntervalHeight;
        },
        days: function () {
            return createDayList(this.parsedStart, this.parsedEnd, this.times.today, this.weekdaySkips, this.maxDays);
        },
        intervals: function () {
            var days = this.days;
            var first = this.parsedFirstInterval;
            var minutes = this.parsedIntervalMinutes;
            var count = this.parsedIntervalCount;
            var now = this.times.now;
            return days.map(function (d) { return createIntervalList(d, first, minutes, count, now); });
        },
        intervalFormatter: function () {
            if (this.intervalFormat) {
                return this.intervalFormat;
            }
            var longOptions = { timeZone: 'UTC', hour12: true, hour: '2-digit', minute: '2-digit' };
            var shortOptions = { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: '2-digit' };
            var shortHourOptions = { timeZone: 'UTC', hour12: true, hour: 'numeric' };
            return createNativeLocaleFormatter(this.locale, function (tms, short) { return short ? (tms.minute === 0 ? shortHourOptions : shortOptions) : longOptions; });
        }
    },
    methods: {
        showIntervalLabelDefault: function (interval) {
            var first = this.intervals[0][0];
            var isFirst = first.hour === interval.hour && first.minute === interval.minute;
            return !isFirst && interval.minute === 0;
        },
        intervalStyleDefault: function (_interval) {
            return undefined;
        },
        getTimestampAtEvent: function (e, day) {
            var timestamp = copyTimestamp(day);
            var bounds = e.currentTarget.getBoundingClientRect();
            var baseMinutes = this.firstMinute;
            var touchEvent = e;
            var mouseEvent = e;
            var touches = touchEvent.changedTouches || touchEvent.touches;
            var clientY = touches && touches[0] ? touches[0].clientY : mouseEvent.clientY;
            var addIntervals = (clientY - bounds.top) / this.parsedIntervalHeight;
            var addMinutes = Math.floor(addIntervals * this.parsedIntervalMinutes);
            var minutes = baseMinutes + addMinutes;
            return updateMinutes(timestamp, minutes, this.times.now);
        },
        getSlotScope: function (timestamp) {
            var scope = copyTimestamp(timestamp);
            scope.timeToY = this.timeToY;
            scope.minutesToPixels = this.minutesToPixels;
            return scope;
        },
        scrollToTime: function (time) {
            var y = this.timeToY(time);
            var pane = this.$refs.scrollArea;
            if (y === false || !pane) {
                return false;
            }
            pane.scrollTop = y;
            return true;
        },
        minutesToPixels: function (minutes) {
            return minutes / this.parsedIntervalMinutes * this.parsedIntervalHeight;
        },
        timeToY: function (time, clamp) {
            if (clamp === void 0) {
                clamp = true;
            }
            var minutes = parseTime(time);
            if (minutes === false) {
                return false;
            }
            var min = this.firstMinute;
            var gap = this.parsedIntervalCount * this.parsedIntervalMinutes;
            var delta = (minutes - min) / gap;
            var y = delta * this.bodyHeight;
            if (clamp) {
                if (y < 0) {
                    y = 0;
                }
                if (y > this.bodyHeight) {
                    y = this.bodyHeight;
                }
            }
            return y;
        }
    }
});
//# sourceMappingURL=calendar-with-intervals.js.map
//# sourceMappingURL=calendar-with-intervals.js.map
//# sourceMappingURL=calendar-with-intervals.js.map