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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
        return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
    }
    catch (error) {
        e = { error: error };
    }
    finally {
        try {
            if (r && !r.done && (m = i["return"]))
                m.call(i);
        }
        finally {
            if (e)
                throw e.error;
        }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
};
// Styles
import '../../stylus/components/_calendar-weekly.styl';
// Mixins
import CalendarBase from './mixins/calendar-base';
// Util
import props from './util/props';
import { createDayList, getDayIdentifier, createNativeLocaleFormatter } from './util/timestamp';
/* @vue/component */
export default CalendarBase.extend({
    name: 'v-calendar-weekly',
    props: props.weeks,
    computed: {
        staticClass: function () {
            return 'v-calendar-weekly';
        },
        classes: function () {
            return this.themeClasses;
        },
        parsedMinWeeks: function () {
            return parseInt(this.minWeeks);
        },
        days: function () {
            var minDays = this.parsedMinWeeks * this.weekdays.length;
            var start = this.getStartOfWeek(this.parsedStart);
            var end = this.getEndOfWeek(this.parsedEnd);
            return createDayList(start, end, this.times.today, this.weekdaySkips, Number.MAX_SAFE_INTEGER, minDays);
        },
        todayWeek: function () {
            var today = this.times.today;
            var start = this.getStartOfWeek(today);
            var end = this.getEndOfWeek(today);
            return createDayList(start, end, today, this.weekdaySkips, this.weekdays.length, this.weekdays.length);
        },
        monthFormatter: function () {
            if (this.monthFormat) {
                return this.monthFormat;
            }
            var longOptions = { timeZone: 'UTC', month: 'long' };
            var shortOptions = { timeZone: 'UTC', month: 'short' };
            return createNativeLocaleFormatter(this.locale, function (_tms, short) { return short ? shortOptions : longOptions; });
        }
    },
    methods: {
        isOutside: function (day) {
            var dayIdentifier = getDayIdentifier(day);
            return dayIdentifier < getDayIdentifier(this.parsedStart) ||
                dayIdentifier > getDayIdentifier(this.parsedEnd);
        },
        genHead: function () {
            return this.$createElement('div', {
                staticClass: 'v-calendar-weekly__head'
            }, this.genHeadDays());
        },
        genHeadDays: function () {
            return this.todayWeek.map(this.genHeadDay);
        },
        genHeadDay: function (day, index) {
            var outside = this.isOutside(this.days[index]);
            var color = day.present ? this.color : undefined;
            return this.$createElement('div', this.setTextColor(color, {
                key: day.date,
                staticClass: 'v-calendar-weekly__head-weekday',
                class: this.getRelativeClasses(day, outside)
            }), this.weekdayFormatter(day, this.shortWeekdays));
        },
        genWeeks: function () {
            var days = this.days;
            var weekDays = this.weekdays.length;
            var weeks = [];
            for (var i = 0; i < days.length; i += weekDays) {
                weeks.push(this.genWeek(days.slice(i, i + weekDays)));
            }
            return weeks;
        },
        genWeek: function (week) {
            return this.$createElement('div', {
                key: week[0].date,
                staticClass: 'v-calendar-weekly__week'
            }, week.map(this.genDay));
        },
        genDay: function (day) {
            var outside = this.isOutside(day);
            var slot = this.$scopedSlots.day;
            var slotData = __assign({ outside: outside }, day);
            var hasMonth = day.day === 1 && this.showMonthOnFirst;
            return this.$createElement('div', {
                key: day.date,
                staticClass: 'v-calendar-weekly__day',
                class: this.getRelativeClasses(day, outside),
                on: this.getDefaultMouseEventHandlers(':day', function (_e) { return day; })
            }, [
                this.genDayLabel(day),
                hasMonth ? this.genDayMonth(day) : '',
                slot ? slot(slotData) : ''
            ]);
        },
        genDayLabel: function (day) {
            var color = day.present ? this.color : undefined;
            var slot = this.$scopedSlots.dayLabel;
            return this.$createElement('div', this.setTextColor(color, {
                staticClass: 'v-calendar-weekly__day-label',
                on: this.getMouseEventHandlers({
                    'click:date': { event: 'click', stop: true },
                    'contextmenu:date': { event: 'contextmenu', stop: true, prevent: true, result: false }
                }, function (_e) { return day; })
            }), slot ? slot(day) : this.dayFormatter(day, false));
        },
        genDayMonth: function (day) {
            var color = day.present ? this.color : undefined;
            var slot = this.$scopedSlots.dayMonth;
            return this.$createElement('div', this.setTextColor(color, {
                staticClass: 'v-calendar-weekly__day-month'
            }), slot ? slot(day) : this.monthFormatter(day, this.shortMonths));
        }
    },
    render: function (h) {
        return h('div', {
            staticClass: this.staticClass,
            class: this.classes,
            nativeOn: {
                dragstart: function (e) {
                    e.preventDefault();
                }
            }
        }, __spread([
            !this.hideHeader ? this.genHead() : ''
        ], this.genWeeks()));
    }
});
//# sourceMappingURL=VCalendarWeekly.js.map
//# sourceMappingURL=VCalendarWeekly.js.map
//# sourceMappingURL=VCalendarWeekly.js.map
//# sourceMappingURL=VCalendarWeekly.js.map