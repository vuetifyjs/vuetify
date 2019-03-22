// Mixins
import DatePickerTable from './mixins/date-picker-table';
// Utils
import { pad, createNativeLocaleFormatter, monthChange } from './util';
import { createRange } from '../../util/helpers';
import mixins from '../../util/mixins';
export default mixins(DatePickerTable
/* @vue/component */
).extend({
    name: 'v-date-picker-date-table',
    props: {
        firstDayOfWeek: {
            type: [String, Number],
            default: 0
        },
        showWeek: Boolean,
        weekdayFormat: Function
    },
    computed: {
        formatter: function () {
            return this.format || createNativeLocaleFormatter(this.locale, { day: 'numeric', timeZone: 'UTC' }, { start: 8, length: 2 });
        },
        weekdayFormatter: function () {
            return this.weekdayFormat || createNativeLocaleFormatter(this.locale, { weekday: 'narrow', timeZone: 'UTC' });
        },
        weekDays: function () {
            var _this = this;
            var first = parseInt(this.firstDayOfWeek, 10);
            return this.weekdayFormatter
                ? createRange(7).map(function (i) { return _this.weekdayFormatter("2017-01-" + (first + i + 15)); }) // 2017-01-15 is Sunday
                : createRange(7).map(function (i) { return ['S', 'M', 'T', 'W', 'T', 'F', 'S'][(i + first) % 7]; });
        }
    },
    methods: {
        calculateTableDate: function (delta) {
            return monthChange(this.tableDate, Math.sign(delta || 1));
        },
        genTHead: function () {
            var _this = this;
            var days = this.weekDays.map(function (day) { return _this.$createElement('th', day); });
            this.showWeek && days.unshift(this.$createElement('th'));
            return this.$createElement('thead', this.genTR(days));
        },
        // Returns number of the days from the firstDayOfWeek to the first day of the current month
        weekDaysBeforeFirstDayOfTheMonth: function () {
            var firstDayOfTheMonth = new Date(this.displayedYear + "-" + pad(this.displayedMonth + 1) + "-01T00:00:00+00:00");
            var weekDay = firstDayOfTheMonth.getUTCDay();
            return (weekDay - parseInt(this.firstDayOfWeek) + 7) % 7;
        },
        getWeekNumber: function () {
            var dayOfYear = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334][this.displayedMonth];
            if (this.displayedMonth > 1 &&
                (((this.displayedYear % 4 === 0) && (this.displayedYear % 100 !== 0)) || (this.displayedYear % 400 === 0))) {
                dayOfYear++;
            }
            var offset = (this.displayedYear +
                ((this.displayedYear - 1) >> 2) -
                Math.floor((this.displayedYear - 1) / 100) +
                Math.floor((this.displayedYear - 1) / 400) -
                Number(this.firstDayOfWeek)) % 7; // https://en.wikipedia.org/wiki/Zeller%27s_congruence
            return Math.floor((dayOfYear + offset) / 7) + 1;
        },
        genWeekNumber: function (weekNumber) {
            return this.$createElement('td', [
                this.$createElement('small', {
                    staticClass: 'v-date-picker-table--date__week'
                }, String(weekNumber).padStart(2, '0'))
            ]);
        },
        genTBody: function () {
            var children = [];
            var daysInMonth = new Date(this.displayedYear, this.displayedMonth + 1, 0).getDate();
            var rows = [];
            var day = this.weekDaysBeforeFirstDayOfTheMonth();
            var weekNumber = this.getWeekNumber();
            this.showWeek && rows.push(this.genWeekNumber(weekNumber++));
            while (day--)
                rows.push(this.$createElement('td'));
            for (day = 1; day <= daysInMonth; day++) {
                var date = this.displayedYear + "-" + pad(this.displayedMonth + 1) + "-" + pad(day);
                rows.push(this.$createElement('td', [
                    this.genButton(date, true, 'date', this.formatter)
                ]));
                if (rows.length % (this.showWeek ? 8 : 7) === 0) {
                    children.push(this.genTR(rows));
                    rows = [];
                    day < daysInMonth && this.showWeek && rows.push(this.genWeekNumber(weekNumber++));
                }
            }
            if (rows.length) {
                children.push(this.genTR(rows));
            }
            return this.$createElement('tbody', children);
        },
        genTR: function (children) {
            return [this.$createElement('tr', children)];
        }
    },
    render: function () {
        return this.genTable('v-date-picker-table v-date-picker-table--date', [
            this.genTHead(),
            this.genTBody()
        ], this.calculateTableDate);
    }
});
//# sourceMappingURL=VDatePickerDateTable.js.map
//# sourceMappingURL=VDatePickerDateTable.js.map
//# sourceMappingURL=VDatePickerDateTable.js.map