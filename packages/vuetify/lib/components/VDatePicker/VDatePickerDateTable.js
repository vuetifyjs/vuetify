// Mixins
import Colorable from '../../mixins/colorable';
import DatePickerTable from './mixins/date-picker-table';
import Themeable from '../../mixins/themeable';
// Utils
import { pad, createNativeLocaleFormatter, monthChange } from './util';
import { createRange } from '../../util/helpers';
/* @vue/component */
export default {
    name: 'v-date-picker-date-table',
    mixins: [Colorable, DatePickerTable, Themeable],
    props: {
        events: {
            type: [Array, Object, Function],
            default: function _default() {
                return null;
            }
        },
        eventColor: {
            type: [String, Function, Object],
            default: 'warning'
        },
        firstDayOfWeek: {
            type: [String, Number],
            default: 0
        },
        weekdayFormat: {
            type: Function,
            default: null
        }
    },
    computed: {
        formatter: function formatter() {
            return this.format || createNativeLocaleFormatter(this.locale, { day: 'numeric', timeZone: 'UTC' }, { start: 8, length: 2 });
        },
        weekdayFormatter: function weekdayFormatter() {
            return this.weekdayFormat || createNativeLocaleFormatter(this.locale, { weekday: 'narrow', timeZone: 'UTC' });
        },
        weekDays: function weekDays() {
            var _this = this;

            var first = parseInt(this.firstDayOfWeek, 10);
            return this.weekdayFormatter ? createRange(7).map(function (i) {
                return _this.weekdayFormatter('2017-01-' + (first + i + 15));
            }) // 2017-01-15 is Sunday
            : createRange(7).map(function (i) {
                return ['S', 'M', 'T', 'W', 'T', 'F', 'S'][(i + first) % 7];
            });
        }
    },
    methods: {
        calculateTableDate: function calculateTableDate(delta) {
            return monthChange(this.tableDate, Math.sign(delta || 1));
        },
        genTHead: function genTHead() {
            var _this2 = this;

            var days = this.weekDays.map(function (day) {
                return _this2.$createElement('th', day);
            });
            return this.$createElement('thead', this.genTR(days));
        },
        genEvent: function genEvent(date) {
            var eventColor = void 0;
            if (typeof this.eventColor === 'string') {
                eventColor = this.eventColor;
            } else if (typeof this.eventColor === 'function') {
                eventColor = this.eventColor(date);
            } else {
                eventColor = this.eventColor[date];
            }
            return this.$createElement('div', this.setBackgroundColor(eventColor || this.color || 'accent', {
                staticClass: 'v-date-picker-table__event'
            }));
        },

        // Returns number of the days from the firstDayOfWeek to the first day of the current month
        weekDaysBeforeFirstDayOfTheMonth: function weekDaysBeforeFirstDayOfTheMonth() {
            var firstDayOfTheMonth = new Date(this.displayedYear + '-' + pad(this.displayedMonth + 1) + '-01T00:00:00+00:00');
            var weekDay = firstDayOfTheMonth.getUTCDay();
            return (weekDay - parseInt(this.firstDayOfWeek) + 7) % 7;
        },
        isEvent: function isEvent(date) {
            if (Array.isArray(this.events)) {
                return this.events.indexOf(date) > -1;
            } else if (this.events instanceof Function) {
                return this.events(date);
            } else {
                return false;
            }
        },
        genTBody: function genTBody() {
            var children = [];
            var daysInMonth = new Date(this.displayedYear, this.displayedMonth + 1, 0).getDate();
            var rows = [];
            var day = this.weekDaysBeforeFirstDayOfTheMonth();
            while (day--) {
                rows.push(this.$createElement('td'));
            }for (day = 1; day <= daysInMonth; day++) {
                var date = this.displayedYear + '-' + pad(this.displayedMonth + 1) + '-' + pad(day);
                rows.push(this.$createElement('td', [this.genButton(date, true), this.isEvent(date) ? this.genEvent(date) : null]));
                if (rows.length % 7 === 0) {
                    children.push(this.genTR(rows));
                    rows = [];
                }
            }
            if (rows.length) {
                children.push(this.genTR(rows));
            }
            return this.$createElement('tbody', children);
        },
        genTR: function genTR(children) {
            return [this.$createElement('tr', children)];
        }
    },
    render: function render() {
        return this.genTable('v-date-picker-table v-date-picker-table--date', [this.genTHead(), this.genTBody()]);
    }
};
//# sourceMappingURL=VDatePickerDateTable.js.map