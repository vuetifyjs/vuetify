var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
// Components
import VDatePickerTitle from './VDatePickerTitle';
import VDatePickerHeader from './VDatePickerHeader';
import VDatePickerDateTable from './VDatePickerDateTable';
import VDatePickerMonthTable from './VDatePickerMonthTable';
import VDatePickerYears from './VDatePickerYears';
// Mixins
import Picker from '../../mixins/picker';
// Utils
import { pad, createNativeLocaleFormatter } from './util';
import isDateAllowed from './util/isDateAllowed';
import { consoleWarn } from '../../util/console';
import { daysInMonth } from '../VCalendar/util/timestamp';
import mixins from '../../util/mixins';
// Adds leading zero to month/day if necessary, returns 'YYYY' if type = 'year',
// 'YYYY-MM' if 'month' and 'YYYY-MM-DD' if 'date'
function sanitizeDateString(dateString, type) {
    var _a = __read(dateString.split('-'), 3), year = _a[0], _b = _a[1], month = _b === void 0 ? 1 : _b, _c = _a[2], date = _c === void 0 ? 1 : _c;
    return (year + "-" + pad(month) + "-" + pad(date)).substr(0, { date: 10, month: 7, year: 4 }[type]);
}
export default mixins(Picker
/* @vue/component */
).extend({
    name: 'v-date-picker',
    props: {
        allowedDates: Function,
        // Function formatting the day in date picker table
        dayFormat: Function,
        disabled: Boolean,
        events: {
            type: [Array, Function, Object],
            default: function () { return null; }
        },
        eventColor: {
            type: [Array, Function, Object, String],
            default: function () { return 'warning'; }
        },
        firstDayOfWeek: {
            type: [String, Number],
            default: 0
        },
        // Function formatting the tableDate in the day/month table header
        headerDateFormat: Function,
        locale: {
            type: String,
            default: 'en-us'
        },
        max: String,
        min: String,
        // Function formatting month in the months table
        monthFormat: Function,
        multiple: Boolean,
        nextIcon: {
            type: String,
            default: '$vuetify.icons.next'
        },
        pickerDate: String,
        prevIcon: {
            type: String,
            default: '$vuetify.icons.prev'
        },
        reactive: Boolean,
        readonly: Boolean,
        scrollable: Boolean,
        showCurrent: {
            type: [Boolean, String],
            default: true
        },
        showWeek: Boolean,
        // Function formatting currently selected date in the picker title
        titleDateFormat: Function,
        type: {
            type: String,
            default: 'date',
            validator: function (type) { return ['date', 'month'].includes(type); } // TODO: year
        },
        value: [Array, String],
        weekdayFormat: Function,
        // Function formatting the year in table header and pickup title
        yearFormat: Function,
        yearIcon: String
    },
    data: function () {
        var _this = this;
        var now = new Date();
        return {
            activePicker: this.type.toUpperCase(),
            inputDay: null,
            inputMonth: null,
            inputYear: null,
            isReversing: false,
            now: now,
            // tableDate is a string in 'YYYY' / 'YYYY-M' format (leading zero for month is not required)
            tableDate: (function () {
                if (_this.pickerDate) {
                    return _this.pickerDate;
                }
                var date = (_this.multiple ? _this.value[_this.value.length - 1] : _this.value) ||
                    now.getFullYear() + "-" + (now.getMonth() + 1);
                return sanitizeDateString(date, _this.type === 'date' ? 'month' : 'year');
            })()
        };
    },
    computed: {
        lastValue: function () {
            return this.multiple ? this.value[this.value.length - 1] : this.value;
        },
        selectedMonths: function () {
            if (!this.value || !this.value.length || this.type === 'month') {
                return this.value;
            }
            else if (this.multiple) {
                return this.value.map(function (val) { return val.substr(0, 7); });
            }
            else {
                return this.value.substr(0, 7);
            }
        },
        current: function () {
            if (this.showCurrent === true) {
                return sanitizeDateString(this.now.getFullYear() + "-" + (this.now.getMonth() + 1) + "-" + this.now.getDate(), this.type);
            }
            return this.showCurrent || null;
        },
        inputDate: function () {
            return this.type === 'date'
                ? this.inputYear + "-" + pad(this.inputMonth + 1) + "-" + pad(this.inputDay)
                : this.inputYear + "-" + pad(this.inputMonth + 1);
        },
        tableMonth: function () {
            return Number((this.pickerDate || this.tableDate).split('-')[1]) - 1;
        },
        tableYear: function () {
            return Number((this.pickerDate || this.tableDate).split('-')[0]);
        },
        minMonth: function () {
            return this.min ? sanitizeDateString(this.min, 'month') : null;
        },
        maxMonth: function () {
            return this.max ? sanitizeDateString(this.max, 'month') : null;
        },
        minYear: function () {
            return this.min ? sanitizeDateString(this.min, 'year') : null;
        },
        maxYear: function () {
            return this.max ? sanitizeDateString(this.max, 'year') : null;
        },
        formatters: function () {
            return {
                year: this.yearFormat || createNativeLocaleFormatter(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 }),
                titleDate: this.titleDateFormat || (this.multiple ? this.defaultTitleMultipleDateFormatter : this.defaultTitleDateFormatter)
            };
        },
        defaultTitleMultipleDateFormatter: function () {
            var _this = this;
            if (this.value.length < 2) {
                return function (dates) { return dates.length ? _this.defaultTitleDateFormatter(dates[0]) : '0 selected'; };
            }
            return function (dates) { return dates.length + " selected"; };
        },
        defaultTitleDateFormatter: function () {
            var titleFormats = {
                year: { year: 'numeric', timeZone: 'UTC' },
                month: { month: 'long', timeZone: 'UTC' },
                date: { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }
            };
            var titleDateFormatter = createNativeLocaleFormatter(this.locale, titleFormats[this.type], {
                start: 0,
                length: { date: 10, month: 7, year: 4 }[this.type]
            });
            var landscapeFormatter = function (date) { return titleDateFormatter(date)
                .replace(/([^\d\s])([\d])/g, function (match, nonDigit, digit) { return nonDigit + " " + digit; })
                .replace(', ', ',<br>'); };
            return this.landscape ? landscapeFormatter : titleDateFormatter;
        }
    },
    watch: {
        tableDate: function (val, prev) {
            // Make a ISO 8601 strings from val and prev for comparision, otherwise it will incorrectly
            // compare for example '2000-9' and '2000-10'
            var sanitizeType = this.type === 'month' ? 'year' : 'month';
            this.isReversing = sanitizeDateString(val, sanitizeType) < sanitizeDateString(prev, sanitizeType);
            this.$emit('update:pickerDate', val);
        },
        pickerDate: function (val) {
            if (val) {
                this.tableDate = val;
            }
            else if (this.lastValue && this.type === 'date') {
                this.tableDate = sanitizeDateString(this.lastValue, 'month');
            }
            else if (this.lastValue && this.type === 'month') {
                this.tableDate = sanitizeDateString(this.lastValue, 'year');
            }
        },
        value: function (newValue, oldValue) {
            this.checkMultipleProp();
            this.setInputDate();
            if (!this.multiple && this.value && !this.pickerDate) {
                this.tableDate = sanitizeDateString(this.inputDate, this.type === 'month' ? 'year' : 'month');
            }
            else if (this.multiple && this.value.length && !oldValue.length && !this.pickerDate) {
                this.tableDate = sanitizeDateString(this.inputDate, this.type === 'month' ? 'year' : 'month');
            }
        },
        type: function (type) {
            this.activePicker = type.toUpperCase();
            if (this.value && this.value.length) {
                var output = (this.multiple ? this.value : [this.value])
                    .map(function (val) { return sanitizeDateString(val, type); })
                    .filter(this.isDateAllowed);
                this.$emit('input', this.multiple ? output : output[0]);
            }
        }
    },
    created: function () {
        this.checkMultipleProp();
        if (this.pickerDate !== this.tableDate) {
            this.$emit('update:pickerDate', this.tableDate);
        }
        this.setInputDate();
    },
    methods: {
        emitInput: function (newInput) {
            var output = this.multiple
                ? (this.value.indexOf(newInput) === -1
                    ? this.value.concat([newInput])
                    : this.value.filter(function (x) { return x !== newInput; }))
                : newInput;
            this.$emit('input', output);
            this.multiple || this.$emit('change', newInput);
        },
        checkMultipleProp: function () {
            if (this.value == null)
                return;
            var valueType = this.value.constructor.name;
            var expected = this.multiple ? 'Array' : 'String';
            if (valueType !== expected) {
                consoleWarn("Value must be " + (this.multiple ? 'an' : 'a') + " " + expected + ", got " + valueType, this);
            }
        },
        isDateAllowed: function (value) {
            return isDateAllowed(value, this.min, this.max, this.allowedDates);
        },
        yearClick: function (value) {
            this.inputYear = value;
            if (this.type === 'month') {
                this.tableDate = "" + value;
            }
            else {
                this.tableDate = value + "-" + pad((this.tableMonth || 0) + 1);
            }
            this.activePicker = 'MONTH';
            if (this.reactive && !this.readonly && !this.multiple && this.isDateAllowed(this.inputDate)) {
                this.$emit('input', this.inputDate);
            }
        },
        monthClick: function (value) {
            this.inputYear = parseInt(value.split('-')[0], 10);
            this.inputMonth = parseInt(value.split('-')[1], 10) - 1;
            if (this.type === 'date') {
                if (this.inputDay) {
                    this.inputDay = Math.min(this.inputDay, daysInMonth(this.inputYear, this.inputMonth + 1));
                }
                this.tableDate = value;
                this.activePicker = 'DATE';
                if (this.reactive && !this.readonly && !this.multiple && this.isDateAllowed(this.inputDate)) {
                    this.$emit('input', this.inputDate);
                }
            }
            else {
                this.emitInput(this.inputDate);
            }
        },
        dateClick: function (value) {
            this.inputYear = parseInt(value.split('-')[0], 10);
            this.inputMonth = parseInt(value.split('-')[1], 10) - 1;
            this.inputDay = parseInt(value.split('-')[2], 10);
            this.emitInput(this.inputDate);
        },
        genPickerTitle: function () {
            var _this = this;
            return this.$createElement(VDatePickerTitle, {
                props: {
                    date: this.value ? this.formatters.titleDate(this.value) : '',
                    disabled: this.disabled,
                    readonly: this.readonly,
                    selectingYear: this.activePicker === 'YEAR',
                    year: this.formatters.year(this.value ? "" + this.inputYear : this.tableDate),
                    yearIcon: this.yearIcon,
                    value: this.multiple ? this.value[0] : this.value
                },
                slot: 'title',
                on: {
                    'update:selectingYear': function (value) { return _this.activePicker = value ? 'YEAR' : _this.type.toUpperCase(); }
                }
            });
        },
        genTableHeader: function () {
            var _this = this;
            return this.$createElement(VDatePickerHeader, {
                props: {
                    nextIcon: this.nextIcon,
                    color: this.color,
                    dark: this.dark,
                    disabled: this.disabled,
                    format: this.headerDateFormat,
                    light: this.light,
                    locale: this.locale,
                    min: this.activePicker === 'DATE' ? this.minMonth : this.minYear,
                    max: this.activePicker === 'DATE' ? this.maxMonth : this.maxYear,
                    prevIcon: this.prevIcon,
                    readonly: this.readonly,
                    value: this.activePicker === 'DATE' ? pad(this.tableYear, 4) + "-" + pad(this.tableMonth + 1) : "" + pad(this.tableYear, 4)
                },
                on: {
                    toggle: function () { return _this.activePicker = (_this.activePicker === 'DATE' ? 'MONTH' : 'YEAR'); },
                    input: function (value) { return _this.tableDate = value; }
                }
            });
        },
        genDateTable: function () {
            var _this = this;
            return this.$createElement(VDatePickerDateTable, {
                props: {
                    allowedDates: this.allowedDates,
                    color: this.color,
                    current: this.current,
                    dark: this.dark,
                    disabled: this.disabled,
                    events: this.events,
                    eventColor: this.eventColor,
                    firstDayOfWeek: this.firstDayOfWeek,
                    format: this.dayFormat,
                    light: this.light,
                    locale: this.locale,
                    min: this.min,
                    max: this.max,
                    readonly: this.readonly,
                    scrollable: this.scrollable,
                    showWeek: this.showWeek,
                    tableDate: pad(this.tableYear, 4) + "-" + pad(this.tableMonth + 1),
                    value: this.value,
                    weekdayFormat: this.weekdayFormat
                },
                ref: 'table',
                on: {
                    input: this.dateClick,
                    tableDate: function (value) { return _this.tableDate = value; },
                    'click:date': function (value) { return _this.$emit('click:date', value); },
                    'dblclick:date': function (value) { return _this.$emit('dblclick:date', value); }
                }
            });
        },
        genMonthTable: function () {
            var _this = this;
            return this.$createElement(VDatePickerMonthTable, {
                props: {
                    allowedDates: this.type === 'month' ? this.allowedDates : null,
                    color: this.color,
                    current: this.current ? sanitizeDateString(this.current, 'month') : null,
                    dark: this.dark,
                    disabled: this.disabled,
                    events: this.type === 'month' ? this.events : null,
                    eventColor: this.type === 'month' ? this.eventColor : null,
                    format: this.monthFormat,
                    light: this.light,
                    locale: this.locale,
                    min: this.minMonth,
                    max: this.maxMonth,
                    readonly: this.readonly && this.type === 'month',
                    scrollable: this.scrollable,
                    value: this.selectedMonths,
                    tableDate: "" + pad(this.tableYear, 4)
                },
                ref: 'table',
                on: {
                    input: this.monthClick,
                    tableDate: function (value) { return _this.tableDate = value; },
                    'click:month': function (value) { return _this.$emit('click:month', value); },
                    'dblclick:month': function (value) { return _this.$emit('dblclick:month', value); }
                }
            });
        },
        genYears: function () {
            return this.$createElement(VDatePickerYears, {
                props: {
                    color: this.color,
                    format: this.yearFormat,
                    locale: this.locale,
                    min: this.minYear,
                    max: this.maxYear,
                    value: this.tableYear
                },
                on: {
                    input: this.yearClick
                }
            });
        },
        genPickerBody: function () {
            var children = this.activePicker === 'YEAR' ? [
                this.genYears()
            ] : [
                this.genTableHeader(),
                this.activePicker === 'DATE' ? this.genDateTable() : this.genMonthTable()
            ];
            return this.$createElement('div', {
                key: this.activePicker
            }, children);
        },
        setInputDate: function () {
            if (this.lastValue) {
                var array = this.lastValue.split('-');
                this.inputYear = parseInt(array[0], 10);
                this.inputMonth = parseInt(array[1], 10) - 1;
                if (this.type === 'date') {
                    this.inputDay = parseInt(array[2], 10);
                }
            }
            else {
                this.inputYear = this.inputYear || this.now.getFullYear();
                this.inputMonth = this.inputMonth == null ? this.inputMonth : this.now.getMonth();
                this.inputDay = this.inputDay || this.now.getDate();
            }
        }
    },
    render: function () {
        return this.genPicker('v-picker--date');
    }
});
//# sourceMappingURL=VDatePicker.js.map