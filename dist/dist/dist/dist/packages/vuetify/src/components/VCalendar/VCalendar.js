// Styles
// import '../../stylus/components/_calendar-daily.styl'
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Mixins
import CalendarBase from './mixins/calendar-base';
// Util
import props from './util/props';
import { DAYS_IN_MONTH_MAX, DAY_MIN, DAYS_IN_WEEK, parseTimestamp, relativeDays, nextDay, prevDay, copyTimestamp, updateFormatted, updateWeekday, updateRelative, getStartOfMonth, getEndOfMonth } from './util/timestamp';
// Calendars
import VCalendarMonthly from './VCalendarMonthly';
import VCalendarDaily from './VCalendarDaily';
import VCalendarWeekly from './VCalendarWeekly';
/* @vue/component */
export default CalendarBase.extend({
    name: 'v-calendar',
    props: __assign({}, props.calendar, props.weeks, props.intervals),
    data: function () {
        return ({
            lastStart: null,
            lastEnd: null
        });
    },
    computed: {
        parsedValue: function () {
            return parseTimestamp(this.value) ||
                this.parsedStart ||
                this.times.today;
        },
        renderProps: function () {
            var around = this.parsedValue;
            var component = 'div';
            var maxDays = this.maxDays;
            var start = around;
            var end = around;
            switch (this.type) {
                case 'month':
                    component = VCalendarMonthly;
                    start = getStartOfMonth(around);
                    end = getEndOfMonth(around);
                    break;
                case 'week':
                    component = VCalendarDaily;
                    start = this.getStartOfWeek(around);
                    end = this.getEndOfWeek(around);
                    maxDays = 7;
                    break;
                case 'day':
                    component = VCalendarDaily;
                    maxDays = 1;
                    break;
                case '4day':
                    component = VCalendarDaily;
                    end = relativeDays(copyTimestamp(end), nextDay, 4);
                    updateFormatted(end);
                    maxDays = 4;
                    break;
                case 'custom-weekly':
                    component = VCalendarWeekly;
                    start = this.parsedStart || around;
                    end = this.parsedEnd;
                    break;
                case 'custom-daily':
                    component = VCalendarDaily;
                    start = this.parsedStart || around;
                    end = this.parsedEnd;
                    break;
            }
            return { component: component, start: start, end: end, maxDays: maxDays };
        }
    },
    watch: {
        renderProps: 'checkChange'
    },
    methods: {
        checkChange: function () {
            var _a = this.renderProps, start = _a.start, end = _a.end;
            if (start !== this.lastStart || end !== this.lastEnd) {
                this.lastStart = start;
                this.lastEnd = end;
                this.$emit('change', { start: start, end: end });
            }
        },
        move: function (amount) {
            if (amount === void 0) {
                amount = 1;
            }
            var moved = copyTimestamp(this.parsedValue);
            var forward = amount > 0;
            var mover = forward ? nextDay : prevDay;
            var limit = forward ? DAYS_IN_MONTH_MAX : DAY_MIN;
            var times = forward ? amount : -amount;
            while (--times >= 0) {
                switch (this.type) {
                    case 'month':
                        moved.day = limit;
                        mover(moved);
                        break;
                    case 'week':
                        relativeDays(moved, mover, DAYS_IN_WEEK);
                        break;
                    case 'day':
                        mover(moved);
                        break;
                    case '4day':
                        relativeDays(moved, mover, 4);
                        break;
                }
            }
            updateWeekday(moved);
            updateFormatted(moved);
            updateRelative(moved, this.times.now);
            this.$emit('input', moved.date);
            this.$emit('moved', moved);
        },
        next: function (amount) {
            if (amount === void 0) {
                amount = 1;
            }
            this.move(amount);
        },
        prev: function (amount) {
            if (amount === void 0) {
                amount = 1;
            }
            this.move(-amount);
        },
        timeToY: function (time, clamp) {
            if (clamp === void 0) {
                clamp = true;
            }
            var c = this.$children[0];
            if (c && c.timeToY) {
                return c.timeToY(time, clamp);
            }
            else {
                return false;
            }
        },
        minutesToPixels: function (minutes) {
            var c = this.$children[0];
            if (c && c.minutesToPixels) {
                return c.minutesToPixels(minutes);
            }
            else {
                return -1;
            }
        },
        scrollToTime: function (time) {
            var c = this.$children[0];
            if (c && c.scrollToTime) {
                return c.scrollToTime(time);
            }
            else {
                return false;
            }
        }
    },
    render: function (h) {
        var _this = this;
        var _a = this.renderProps, start = _a.start, end = _a.end, maxDays = _a.maxDays, component = _a.component;
        return h(component, {
            staticClass: 'v-calendar',
            props: __assign({}, this.$props, { start: start.date, end: end.date, maxDays: maxDays }),
            on: __assign({}, this.$listeners, { 'click:date': function (day) {
                    if (_this.$listeners['input']) {
                        _this.$emit('input', day.date);
                    }
                    if (_this.$listeners['click:date']) {
                        _this.$emit('click:date', day);
                    }
                } }),
            scopedSlots: this.$scopedSlots
        });
    }
});
//# sourceMappingURL=VCalendar.js.map
//# sourceMappingURL=VCalendar.js.map
//# sourceMappingURL=VCalendar.js.map
//# sourceMappingURL=VCalendar.js.map