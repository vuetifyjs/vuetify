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
/* @vue/component */
export default {
    name: 'v-date-picker',
    mixins: [Picker],
    props: {
        allowedDates: Function,
        // Function formatting the day in date picker table
        dayFormat: {
            type: Function,
            default: null
        },
        events: {
            type: [Array, Object, Function],
            default: () => null
        },
        eventColor: {
            type: [String, Function, Object],
            default: 'warning'
        },
        firstDayOfWeek: {
            type: [String, Number],
            default: 0
        },
        // Function formatting the tableDate in the day/month table header
        headerDateFormat: {
            type: Function,
            default: null
        },
        locale: {
            type: String,
            default: 'en-us'
        },
        max: String,
        min: String,
        // Function formatting month in the months table
        monthFormat: {
            type: Function,
            default: null
        },
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
        // Function formatting currently selected date in the picker title
        titleDateFormat: {
            type: Function,
            default: null
        },
        type: {
            type: String,
            default: 'date',
            validator: type => ['date', 'month'].includes(type) // TODO: year
        },
        value: [Array, String],
        // Function formatting the year in table header and pickup title
        yearFormat: {
            type: Function,
            default: null
        },
        yearIcon: String
    },
    data() {
        const now = new Date();
        return {
            activePicker: this.type.toUpperCase(),
            defaultColor: 'accent',
            inputDay: null,
            inputMonth: null,
            inputYear: null,
            isReversing: false,
            now,
            // tableDate is a string in 'YYYY' / 'YYYY-M' format (leading zero for month is not required)
            tableDate: (() => {
                if (this.pickerDate) {
                    return this.pickerDate;
                }
                const date = (this.multiple ? this.value[this.value.length - 1] : this.value) ||
                    `${now.getFullYear()}-${now.getMonth() + 1}`;
                const type = this.type === 'date' ? 'month' : 'year';
                return this.sanitizeDateString(date, type);
            })()
        };
    },
    computed: {
        lastValue() {
            return this.multiple ? this.value[this.value.length - 1] : this.value;
        },
        selectedMonths() {
            if (!this.value || !this.value.length || this.type === 'month') {
                return this.value;
            }
            else if (this.multiple) {
                return this.value.map(val => val.substr(0, 7));
            }
            else {
                return this.value.substr(0, 7);
            }
        },
        current() {
            if (this.showCurrent === true) {
                return this.sanitizeDateString(`${this.now.getFullYear()}-${this.now.getMonth() + 1}-${this.now.getDate()}`, this.type);
            }
            return this.showCurrent || null;
        },
        inputDate() {
            return this.type === 'date'
                ? `${this.inputYear}-${pad(this.inputMonth + 1)}-${pad(this.inputDay)}`
                : `${this.inputYear}-${pad(this.inputMonth + 1)}`;
        },
        tableMonth() {
            return (this.pickerDate || this.tableDate).split('-')[1] - 1;
        },
        tableYear() {
            return (this.pickerDate || this.tableDate).split('-')[0] * 1;
        },
        minMonth() {
            return this.min ? this.sanitizeDateString(this.min, 'month') : null;
        },
        maxMonth() {
            return this.max ? this.sanitizeDateString(this.max, 'month') : null;
        },
        minYear() {
            return this.min ? this.sanitizeDateString(this.min, 'year') : null;
        },
        maxYear() {
            return this.max ? this.sanitizeDateString(this.max, 'year') : null;
        },
        formatters() {
            return {
                year: this.yearFormat || createNativeLocaleFormatter(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 }),
                titleDate: this.titleDateFormat || (this.multiple ? this.defaultTitleMultipleDateFormatter : this.defaultTitleDateFormatter)
            };
        },
        defaultTitleMultipleDateFormatter() {
            if (this.value.length < 2) {
                return dates => dates.length ? this.defaultTitleDateFormatter(dates[0]) : '0 selected';
            }
            return dates => `${dates.length} selected`;
        },
        defaultTitleDateFormatter() {
            const titleFormats = {
                year: { year: 'numeric', timeZone: 'UTC' },
                month: { month: 'long', timeZone: 'UTC' },
                date: { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }
            };
            const titleDateFormatter = createNativeLocaleFormatter(this.locale, titleFormats[this.type], {
                start: 0,
                length: { date: 10, month: 7, year: 4 }[this.type]
            });
            const landscapeFormatter = date => titleDateFormatter(date)
                .replace(/([^\d\s])([\d])/g, (match, nonDigit, digit) => `${nonDigit} ${digit}`)
                .replace(', ', ',<br>');
            return this.landscape ? landscapeFormatter : titleDateFormatter;
        }
    },
    watch: {
        tableDate(val, prev) {
            // Make a ISO 8601 strings from val and prev for comparision, otherwise it will incorrectly
            // compare for example '2000-9' and '2000-10'
            const sanitizeType = this.type === 'month' ? 'year' : 'month';
            this.isReversing = this.sanitizeDateString(val, sanitizeType) < this.sanitizeDateString(prev, sanitizeType);
            this.$emit('update:pickerDate', val);
        },
        pickerDate(val) {
            if (val) {
                this.tableDate = val;
            }
            else if (this.lastValue && this.type === 'date') {
                this.tableDate = this.sanitizeDateString(this.lastValue, 'month');
            }
            else if (this.lastValue && this.type === 'month') {
                this.tableDate = this.sanitizeDateString(this.lastValue, 'year');
            }
        },
        value(newValue, oldValue) {
            this.checkMultipleProp();
            this.setInputDate();
            if (!this.multiple && this.value && !this.pickerDate) {
                this.tableDate = this.sanitizeDateString(this.inputDate, this.type === 'month' ? 'year' : 'month');
            }
            else if (this.multiple && this.value.length && !oldValue.length && !this.pickerDate) {
                this.tableDate = this.sanitizeDateString(this.inputDate, this.type === 'month' ? 'year' : 'month');
            }
        },
        type(type) {
            this.activePicker = type.toUpperCase();
            if (this.value && this.value.length) {
                const output = (this.multiple ? this.value : [this.value])
                    .map(val => this.sanitizeDateString(val, type))
                    .filter(this.isDateAllowed);
                this.$emit('input', this.multiple ? output : output[0]);
            }
        }
    },
    created() {
        this.checkMultipleProp();
        if (this.pickerDate !== this.tableDate) {
            this.$emit('update:pickerDate', this.tableDate);
        }
        this.setInputDate();
    },
    methods: {
        emitInput(newInput) {
            const output = this.multiple
                ? (this.value.indexOf(newInput) === -1
                    ? this.value.concat([newInput])
                    : this.value.filter(x => x !== newInput))
                : newInput;
            this.$emit('input', output);
            this.multiple || this.$emit('change', newInput);
        },
        checkMultipleProp() {
            if (this.value == null)
                return;
            const valueType = this.value.constructor.name;
            const expected = this.multiple ? 'Array' : 'String';
            if (valueType !== expected) {
                consoleWarn(`Value must be ${this.multiple ? 'an' : 'a'} ${expected}, got ${valueType}`, this);
            }
        },
        isDateAllowed(value) {
            return isDateAllowed(value, this.min, this.max, this.allowedDates);
        },
        yearClick(value) {
            this.inputYear = value;
            if (this.type === 'month') {
                this.tableDate = `${value}`;
            }
            else {
                this.tableDate = `${value}-${pad(this.tableMonth + 1)}`;
            }
            this.activePicker = 'MONTH';
            this.reactive && !this.multiple && this.isDateAllowed(this.inputDate) && this.$emit('input', this.inputDate);
        },
        monthClick(value) {
            this.inputYear = parseInt(value.split('-')[0], 10);
            this.inputMonth = parseInt(value.split('-')[1], 10) - 1;
            if (this.type === 'date') {
                this.tableDate = value;
                this.activePicker = 'DATE';
                this.reactive && !this.multiple && this.isDateAllowed(this.inputDate) && this.$emit('input', this.inputDate);
            }
            else {
                this.emitInput(this.inputDate);
            }
        },
        dateClick(value) {
            this.inputYear = parseInt(value.split('-')[0], 10);
            this.inputMonth = parseInt(value.split('-')[1], 10) - 1;
            this.inputDay = parseInt(value.split('-')[2], 10);
            this.emitInput(this.inputDate);
        },
        genPickerTitle() {
            return this.$createElement(VDatePickerTitle, {
                props: {
                    date: this.value ? this.formatters.titleDate(this.value) : '',
                    selectingYear: this.activePicker === 'YEAR',
                    year: this.formatters.year(`${this.inputYear}`),
                    yearIcon: this.yearIcon,
                    value: this.multiple ? this.value[0] : this.value
                },
                slot: 'title',
                style: this.readonly ? {
                    'pointer-events': 'none'
                } : undefined,
                on: {
                    'update:selectingYear': value => this.activePicker = value ? 'YEAR' : this.type.toUpperCase()
                }
            });
        },
        genTableHeader() {
            return this.$createElement(VDatePickerHeader, {
                props: {
                    nextIcon: this.nextIcon,
                    color: this.color,
                    dark: this.dark,
                    disabled: this.readonly,
                    format: this.headerDateFormat,
                    light: this.light,
                    locale: this.locale,
                    min: this.activePicker === 'DATE' ? this.minMonth : this.minYear,
                    max: this.activePicker === 'DATE' ? this.maxMonth : this.maxYear,
                    prevIcon: this.prevIcon,
                    value: this.activePicker === 'DATE' ? `${this.tableYear}-${pad(this.tableMonth + 1)}` : `${this.tableYear}`
                },
                on: {
                    toggle: () => this.activePicker = (this.activePicker === 'DATE' ? 'MONTH' : 'YEAR'),
                    input: value => this.tableDate = value
                }
            });
        },
        genDateTable() {
            return this.$createElement(VDatePickerDateTable, {
                props: {
                    allowedDates: this.allowedDates,
                    color: this.color,
                    current: this.current,
                    dark: this.dark,
                    disabled: this.readonly,
                    events: this.events,
                    eventColor: this.eventColor,
                    firstDayOfWeek: this.firstDayOfWeek,
                    format: this.dayFormat,
                    light: this.light,
                    locale: this.locale,
                    min: this.min,
                    max: this.max,
                    tableDate: `${this.tableYear}-${pad(this.tableMonth + 1)}`,
                    scrollable: this.scrollable,
                    value: this.value
                },
                ref: 'table',
                on: {
                    input: this.dateClick,
                    tableDate: value => this.tableDate = value
                }
            });
        },
        genMonthTable() {
            return this.$createElement(VDatePickerMonthTable, {
                props: {
                    allowedDates: this.type === 'month' ? this.allowedDates : null,
                    color: this.color,
                    current: this.current ? this.sanitizeDateString(this.current, 'month') : null,
                    dark: this.dark,
                    disabled: this.readonly,
                    format: this.monthFormat,
                    light: this.light,
                    locale: this.locale,
                    min: this.minMonth,
                    max: this.maxMonth,
                    scrollable: this.scrollable,
                    value: this.selectedMonths,
                    tableDate: `${this.tableYear}`
                },
                ref: 'table',
                on: {
                    input: this.monthClick,
                    tableDate: value => this.tableDate = value
                }
            });
        },
        genYears() {
            return this.$createElement(VDatePickerYears, {
                props: {
                    color: this.color,
                    format: this.yearFormat,
                    locale: this.locale,
                    min: this.minYear,
                    max: this.maxYear,
                    value: `${this.tableYear}`
                },
                on: {
                    input: this.yearClick
                }
            });
        },
        genPickerBody() {
            const children = this.activePicker === 'YEAR' ? [
                this.genYears()
            ] : [
                this.genTableHeader(),
                this.activePicker === 'DATE' ? this.genDateTable() : this.genMonthTable()
            ];
            return this.$createElement('div', {
                key: this.activePicker,
                style: this.readonly ? {
                    'pointer-events': 'none'
                } : undefined
            }, children);
        },
        // Adds leading zero to month/day if necessary, returns 'YYYY' if type = 'year',
        // 'YYYY-MM' if 'month' and 'YYYY-MM-DD' if 'date'
        sanitizeDateString(dateString, type) {
            const [year, month = 1, date = 1] = dateString.split('-');
            return `${year}-${pad(month)}-${pad(date)}`.substr(0, { date: 10, month: 7, year: 4 }[type]);
        },
        setInputDate() {
            if (this.lastValue) {
                const array = this.lastValue.split('-');
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
    render() {
        return this.genPicker('v-picker--date');
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkRhdGVQaWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9WRGF0ZVBpY2tlci9WRGF0ZVBpY2tlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxhQUFhO0FBQ2IsT0FBTyxnQkFBZ0IsTUFBTSxvQkFBb0IsQ0FBQTtBQUNqRCxPQUFPLGlCQUFpQixNQUFNLHFCQUFxQixDQUFBO0FBQ25ELE9BQU8sb0JBQW9CLE1BQU0sd0JBQXdCLENBQUE7QUFDekQsT0FBTyxxQkFBcUIsTUFBTSx5QkFBeUIsQ0FBQTtBQUMzRCxPQUFPLGdCQUFnQixNQUFNLG9CQUFvQixDQUFBO0FBRWpELFNBQVM7QUFDVCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQTtBQUV4QyxRQUFRO0FBQ1IsT0FBTyxFQUFFLEdBQUcsRUFBRSwyQkFBMkIsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUN6RCxPQUFPLGFBQWEsTUFBTSxzQkFBc0IsQ0FBQTtBQUNoRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFFaEQsb0JBQW9CO0FBQ3BCLGVBQWU7SUFDYixJQUFJLEVBQUUsZUFBZTtJQUVyQixNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFFaEIsS0FBSyxFQUFFO1FBQ0wsWUFBWSxFQUFFLFFBQVE7UUFDdEIsbURBQW1EO1FBQ25ELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxRQUFRO1lBQ2QsT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO1lBQy9CLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJO1NBQ3BCO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7WUFDaEMsT0FBTyxFQUFFLFNBQVM7U0FDbkI7UUFDRCxjQUFj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Z0JBQ0wsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUE7Z0JBQ3pELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUE7Z0JBQ2pGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFBO2FBQ3BEO1FBQ0gsQ0FBQztLQUNGO0lBRUQsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ3pDLENBQUM7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29tcG9uZW50c1xuaW1wb3J0IFZEYXRlUGlja2VyVGl0bGUgZnJvbSAnLi9WRGF0ZVBpY2tlclRpdGxlJ1xuaW1wb3J0IFZEYXRlUGlja2VySGVhZGVyIGZyb20gJy4vVkRhdGVQaWNrZXJIZWFkZXInXG5pbXBvcnQgVkRhdGVQaWNrZXJEYXRlVGFibGUgZnJvbSAnLi9WRGF0ZVBpY2tlckRhdGVUYWJsZSdcbmltcG9ydCBWRGF0ZVBpY2tlck1vbnRoVGFibGUgZnJvbSAnLi9WRGF0ZVBpY2tlck1vbnRoVGFibGUnXG5pbXBvcnQgVkRhdGVQaWNrZXJZZWFycyBmcm9tICcuL1ZEYXRlUGlja2VyWWVhcnMnXG5cbi8vIE1peGluc1xuaW1wb3J0IFBpY2tlciBmcm9tICcuLi8uLi9taXhpbnMvcGlja2VyJ1xuXG4vLyBVdGlsc1xuaW1wb3J0IHsgcGFkLCBjcmVhdGVOYXRpdmVMb2NhbGVGb3JtYXR0ZXIgfSBmcm9tICcuL3V0aWwnXG5pbXBvcnQgaXNEYXRlQWxsb3dlZCBmcm9tICcuL3V0aWwvaXNEYXRlQWxsb3dlZCdcbmltcG9ydCB7IGNvbnNvbGVXYXJuIH0gZnJvbSAnLi4vLi4vdXRpbC9jb25zb2xlJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1kYXRlLXBpY2tlcicsXG5cbiAgbWl4aW5zOiBbUGlja2VyXSxcblxuICBwcm9wczoge1xuICAgIGFsbG93ZWREYXRlczogRnVuY3Rpb24sXG4gICAgLy8gRnVuY3Rpb24gZm9ybWF0dGluZyB0aGUgZGF5IGluIGRhdGUgcGlja2VyIHRhYmxlXG4gICAgZGF5Rm9ybWF0OiB7XG4gICAgICB0eXBlOiBGdW5jdGlvbixcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIGV2ZW50czoge1xuICAgICAgdHlwZTogW0FycmF5LCBPYmplY3QsIEZ1bmN0aW9uXSxcbiAgICAgIGRlZmF1bHQ6ICgpID0+IG51bGxcbiAgICB9LFxuICAgIGV2ZW50Q29sb3I6IHtcbiAgICAgIHR5cGU6IFtTdHJpbmcsIEZ1bmN0aW9uLCBPYmplY3RdLFxuICAgICAgZGVmYXVsdDogJ3dhcm5pbmcnXG4gICAgfSxcbiAgICBmaXJzdERheU9mV2Vlazoge1xuICAgICAgdHlwZTogW1N0cmluZywgTnVtYmVyXSxcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuICAgIC8vIEZ1bmN0aW9uIGZvcm1hdHRpbmcgdGhlIHRhYmxlRGF0ZSBpbiB0aGUgZGF5L21vbnRoIHRhYmxlIGhlYWRlclxuICAgIGhlYWRlckRhdGVGb3JtYXQ6IHtcbiAgICAgIHR5cGU6IEZ1bmN0aW9uLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgbG9jYWxlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZW4tdXMnXG4gICAgfSxcbiAgICBtYXg6IFN0cmluZyxcbiAgICBtaW46IFN0cmluZyxcbiAgICAvLyBGdW5jdGlvbiBmb3JtYXR0aW5nIG1vbnRoIGluIHRoZSBtb250aHMgdGFibGVcbiAgICBtb250aEZvcm1hdDoge1xuICAgICAgdHlwZTogRnVuY3Rpb24sXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICBtdWx0aXBsZTogQm9vbGVhbixcbiAgICBuZXh0SWNvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJyR2dWV0aWZ5Lmljb25zLm5leHQnXG4gICAgfSxcbiAgICBwaWNrZXJEYXRlOiBTdHJpbmcsXG4gICAgcHJldkljb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICckdnVldGlmeS5pY29ucy5wcmV2J1xuICAgIH0sXG4gICAgcmVhY3RpdmU6IEJvb2xlYW4sXG4gICAgcmVhZG9ubHk6IEJvb2xlYW4sXG4gICAgc2Nyb2xsYWJsZTogQm9vbGVhbixcbiAgICBzaG93Q3VycmVudDoge1xuICAgICAgdHlwZTogW0Jvb2xlYW4sIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfSxcbiAgICAvLyBGdW5jdGlvbiBmb3JtYXR0aW5nIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlIGluIHRoZSBwaWNrZXIgdGl0bGVcbiAgICB0aXRsZURhdGVGb3JtYXQ6IHtcbiAgICAgIHR5cGU6IEZ1bmN0aW9uLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgdHlwZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2RhdGUnLFxuICAgICAgdmFsaWRhdG9yOiB0eXBlID0+IFsnZGF0ZScsICdtb250aCddLmluY2x1ZGVzKHR5cGUpIC8vIFRPRE86IHllYXJcbiAgICB9LFxuICAgIHZhbHVlOiBbQXJyYXksIFN0cmluZ10sXG4gICAgLy8gRnVuY3Rpb24gZm9ybWF0dGluZyB0aGUgeWVhciBpbiB0YWJsZSBoZWFkZXIgYW5kIHBpY2t1cCB0aXRsZVxuICAgIHllYXJGb3JtYXQ6IHtcbiAgICAgIHR5cGU6IEZ1bmN0aW9uLFxuICAgICAgZGVmYXVsdDogbnVsbFxuICAgIH0sXG4gICAgeWVhckljb246IFN0cmluZ1xuICB9LFxuXG4gIGRhdGEgKCkge1xuICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKClcbiAgICByZXR1cm4ge1xuICAgICAgYWN0aXZlUGlja2VyOiB0aGlzLnR5cGUudG9VcHBlckNhc2UoKSxcbiAgICAgIGRlZmF1bHRDb2xvcjogJ2FjY2VudCcsXG4gICAgICBpbnB1dERheTogbnVsbCxcbiAgICAgIGlucHV0TW9udGg6IG51bGwsXG4gICAgICBpbnB1dFllYXI6IG51bGwsXG4gICAgICBpc1JldmVyc2luZzogZmFsc2UsXG4gICAgICBub3csXG4gICAgICAvLyB0YWJsZURhdGUgaXMgYSBzdHJpbmcgaW4gJ1lZWVknIC8gJ1lZWVktTScgZm9ybWF0IChsZWFkaW5nIHplcm8gZm9yIG1vbnRoIGlzIG5vdCByZXF1aXJlZClcbiAgICAgIHRhYmxlRGF0ZTogKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucGlja2VyRGF0ZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnBpY2tlckRhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRhdGUgPSAodGhpcy5tdWx0aXBsZSA/IHRoaXMudmFsdWVbdGhpcy52YWx1ZS5sZW5ndGggLSAxXSA6IHRoaXMudmFsdWUpIHx8XG4gICAgICAgICAgYCR7bm93LmdldEZ1bGxZZWFyKCl9LSR7bm93LmdldE1vbnRoKCkgKyAxfWBcbiAgICAgICAgY29uc3QgdHlwZSA9IHRoaXMudHlwZSA9PT0gJ2RhdGUnID8gJ21vbnRoJyA6ICd5ZWFyJ1xuICAgICAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZURhdGVTdHJpbmcoZGF0ZSwgdHlwZSlcbiAgICAgIH0pKClcbiAgICB9XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBsYXN0VmFsdWUgKCkge1xuICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbGUgPyB0aGlzLnZhbHVlW3RoaXMudmFsdWUubGVuZ3RoIC0gMV0gOiB0aGlzLnZhbHVlXG4gICAgfSxcbiAgICBzZWxlY3RlZE1vbnRocyAoKSB7XG4gICAgICBpZiAoIXRoaXMudmFsdWUgfHwgIXRoaXMudmFsdWUubGVuZ3RoIHx8IHRoaXMudHlwZSA9PT0gJ21vbnRoJykge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVxuICAgICAgfSBlbHNlIGlmICh0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlLm1hcCh2YWwgPT4gdmFsLnN1YnN0cigwLCA3KSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlLnN1YnN0cigwLCA3KVxuICAgICAgfVxuICAgIH0sXG4gICAgY3VycmVudCAoKSB7XG4gICAgICBpZiAodGhpcy5zaG93Q3VycmVudCA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZURhdGVTdHJpbmcoYCR7dGhpcy5ub3cuZ2V0RnVsbFllYXIoKX0tJHt0aGlzLm5vdy5nZXRNb250aCgpICsgMX0tJHt0aGlzLm5vdy5nZXREYXRlKCl9YCwgdGhpcy50eXBlKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5zaG93Q3VycmVudCB8fCBudWxsXG4gICAgfSxcbiAgICBpbnB1dERhdGUgKCkge1xuICAgICAgcmV0dXJuIHRoaXMudHlwZSA9PT0gJ2RhdGUnXG4gICAgICAgID8gYCR7dGhpcy5pbnB1dFllYXJ9LSR7cGFkKHRoaXMuaW5wdXRNb250aCArIDEpfS0ke3BhZCh0aGlzLmlucHV0RGF5KX1gXG4gICAgICAgIDogYCR7dGhpcy5pbnB1dFllYXJ9LSR7cGFkKHRoaXMuaW5wdXRNb250aCArIDEpfWBcbiAgICB9LFxuICAgIHRhYmxlTW9udGggKCkge1xuICAgICAgcmV0dXJuICh0aGlzLnBpY2tlckRhdGUgfHwgdGhpcy50YWJsZURhdGUpLnNwbGl0KCctJylbMV0gLSAxXG4gICAgfSxcbiAgICB0YWJsZVllYXIgKCkge1xuICAgICAgcmV0dXJuICh0aGlzLnBpY2tlckRhdGUgfHwgdGhpcy50YWJsZURhdGUpLnNwbGl0KCctJylbMF0gKiAxXG4gICAgfSxcbiAgICBtaW5Nb250aCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5taW4gPyB0aGlzLnNhbml0aXplRGF0ZVN0cmluZyh0aGlzLm1pbiwgJ21vbnRoJykgOiBudWxsXG4gICAgfSxcbiAgICBtYXhNb250aCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXggPyB0aGlzLnNhbml0aXplRGF0ZVN0cmluZyh0aGlzLm1heCwgJ21vbnRoJykgOiBudWxsXG4gICAgfSxcbiAgICBtaW5ZZWFyICgpIHtcbiAgICAgIHJldHVybiB0aGlzLm1pbiA/IHRoaXMuc2FuaXRpemVEYXRlU3RyaW5nKHRoaXMubWluLCAneWVhcicpIDogbnVsbFxuICAgIH0sXG4gICAgbWF4WWVhciAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXggPyB0aGlzLnNhbml0aXplRGF0ZVN0cmluZyh0aGlzLm1heCwgJ3llYXInKSA6IG51bGxcbiAgICB9LFxuICAgIGZvcm1hdHRlcnMgKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeWVhcjogdGhpcy55ZWFyRm9ybWF0IHx8IGNyZWF0ZU5hdGl2ZUxvY2FsZUZvcm1hdHRlcih0aGlzLmxvY2FsZSwgeyB5ZWFyOiAnbnVtZXJpYycsIHRpbWVab25lOiAnVVRDJyB9LCB7IGxlbmd0aDogNCB9KSxcbiAgICAgICAgdGl0bGVEYXRlOiB0aGlzLnRpdGxlRGF0ZUZvcm1hdCB8fCAodGhpcy5tdWx0aXBsZSA/IHRoaXMuZGVmYXVsdFRpdGxlTXVsdGlwbGVEYXRlRm9ybWF0dGVyIDogdGhpcy5kZWZhdWx0VGl0bGVEYXRlRm9ybWF0dGVyKVxuICAgICAgfVxuICAgIH0sXG4gICAgZGVmYXVsdFRpdGxlTXVsdGlwbGVEYXRlRm9ybWF0dGVyICgpIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIGRhdGVzID0+IGRhdGVzLmxlbmd0aCA/IHRoaXMuZGVmYXVsdFRpdGxlRGF0ZUZvcm1hdHRlcihkYXRlc1swXSkgOiAnMCBzZWxlY3RlZCdcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGVzID0+IGAke2RhdGVzLmxlbmd0aH0gc2VsZWN0ZWRgXG4gICAgfSxcbiAgICBkZWZhdWx0VGl0bGVEYXRlRm9ybWF0dGVyICgpIHtcbiAgICAgIGNvbnN0IHRpdGxlRm9ybWF0cyA9IHtcbiAgICAgICAgeWVhcjogeyB5ZWFyOiAnbnVtZXJpYycsIHRpbWVab25lOiAnVVRDJyB9LFxuICAgICAgICBtb250aDogeyBtb250aDogJ2xvbmcnLCB0aW1lWm9uZTogJ1VUQycgfSxcbiAgICAgICAgZGF0ZTogeyB3ZWVrZGF5OiAnc2hvcnQnLCBtb250aDogJ3Nob3J0JywgZGF5OiAnbnVtZXJpYycsIHRpbWVab25lOiAnVVRDJyB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRpdGxlRGF0ZUZvcm1hdHRlciA9IGNyZWF0ZU5hdGl2ZUxvY2FsZUZvcm1hdHRlcih0aGlzLmxvY2FsZSwgdGl0bGVGb3JtYXRzW3RoaXMudHlwZV0sIHtcbiAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgIGxlbmd0aDogeyBkYXRlOiAxMCwgbW9udGg6IDcsIHllYXI6IDQgfVt0aGlzLnR5cGVdXG4gICAgICB9KVxuXG4gICAgICBjb25zdCBsYW5kc2NhcGVGb3JtYXR0ZXIgPSBkYXRlID0+IHRpdGxlRGF0ZUZvcm1hdHRlcihkYXRlKVxuICAgICAgICAucmVwbGFjZSgvKFteXFxkXFxzXSkoW1xcZF0pL2csIChtYXRjaCwgbm9uRGlnaXQsIGRpZ2l0KSA9PiBgJHtub25EaWdpdH0gJHtkaWdpdH1gKVxuICAgICAgICAucmVwbGFjZSgnLCAnLCAnLDxicj4nKVxuXG4gICAgICByZXR1cm4gdGhpcy5sYW5kc2NhcGUgPyBsYW5kc2NhcGVGb3JtYXR0ZXIgOiB0aXRsZURhdGVGb3JtYXR0ZXJcbiAgICB9XG4gIH0sXG5cbiAgd2F0Y2g6IHtcbiAgICB0YWJsZURhdGUgKHZhbCwgcHJldikge1xuICAgICAgLy8gTWFrZSBhIElTTyA4NjAxIHN0cmluZ3MgZnJvbSB2YWwgYW5kIHByZXYgZm9yIGNvbXBhcmlzaW9uLCBvdGhlcndpc2UgaXQgd2lsbCBpbmNvcnJlY3RseVxuICAgICAgLy8gY29tcGFyZSBmb3IgZXhhbXBsZSAnMjAwMC05JyBhbmQgJzIwMDAtMTAnXG4gICAgICBjb25zdCBzYW5pdGl6ZVR5cGUgPSB0aGlzLnR5cGUgPT09ICdtb250aCcgPyAneWVhcicgOiAnbW9udGgnXG4gICAgICB0aGlzLmlzUmV2ZXJzaW5nID0gdGhpcy5zYW5pdGl6ZURhdGVTdHJpbmcodmFsLCBzYW5pdGl6ZVR5cGUpIDwgdGhpcy5zYW5pdGl6ZURhdGVTdHJpbmcocHJldiwgc2FuaXRpemVUeXBlKVxuICAgICAgdGhpcy4kZW1pdCgndXBkYXRlOnBpY2tlckRhdGUnLCB2YWwpXG4gICAgfSxcbiAgICBwaWNrZXJEYXRlICh2YWwpIHtcbiAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgdGhpcy50YWJsZURhdGUgPSB2YWxcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5sYXN0VmFsdWUgJiYgdGhpcy50eXBlID09PSAnZGF0ZScpIHtcbiAgICAgICAgdGhpcy50YWJsZURhdGUgPSB0aGlzLnNhbml0aXplRGF0ZVN0cmluZyh0aGlzLmxhc3RWYWx1ZSwgJ21vbnRoJylcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5sYXN0VmFsdWUgJiYgdGhpcy50eXBlID09PSAnbW9udGgnKSB7XG4gICAgICAgIHRoaXMudGFibGVEYXRlID0gdGhpcy5zYW5pdGl6ZURhdGVTdHJpbmcodGhpcy5sYXN0VmFsdWUsICd5ZWFyJylcbiAgICAgIH1cbiAgICB9LFxuICAgIHZhbHVlIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIHRoaXMuY2hlY2tNdWx0aXBsZVByb3AoKVxuICAgICAgdGhpcy5zZXRJbnB1dERhdGUoKVxuXG4gICAgICBpZiAoIXRoaXMubXVsdGlwbGUgJiYgdGhpcy52YWx1ZSAmJiAhdGhpcy5waWNrZXJEYXRlKSB7XG4gICAgICAgIHRoaXMudGFibGVEYXRlID0gdGhpcy5zYW5pdGl6ZURhdGVTdHJpbmcodGhpcy5pbnB1dERhdGUsIHRoaXMudHlwZSA9PT0gJ21vbnRoJyA/ICd5ZWFyJyA6ICdtb250aCcpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMubXVsdGlwbGUgJiYgdGhpcy52YWx1ZS5sZW5ndGggJiYgIW9sZFZhbHVlLmxlbmd0aCAmJiAhdGhpcy5waWNrZXJEYXRlKSB7XG4gICAgICAgIHRoaXMudGFibGVEYXRlID0gdGhpcy5zYW5pdGl6ZURhdGVTdHJpbmcodGhpcy5pbnB1dERhdGUsIHRoaXMudHlwZSA9PT0gJ21vbnRoJyA/ICd5ZWFyJyA6ICdtb250aCcpXG4gICAgICB9XG4gICAgfSxcbiAgICB0eXBlICh0eXBlKSB7XG4gICAgICB0aGlzLmFjdGl2ZVBpY2tlciA9IHR5cGUudG9VcHBlckNhc2UoKVxuXG4gICAgICBpZiAodGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBvdXRwdXQgPSAodGhpcy5tdWx0aXBsZSA/IHRoaXMudmFsdWUgOiBbdGhpcy52YWx1ZV0pXG4gICAgICAgICAgLm1hcCh2YWwgPT4gdGhpcy5zYW5pdGl6ZURhdGVTdHJpbmcodmFsLCB0eXBlKSlcbiAgICAgICAgICAuZmlsdGVyKHRoaXMuaXNEYXRlQWxsb3dlZClcbiAgICAgICAgdGhpcy4kZW1pdCgnaW5wdXQnLCB0aGlzLm11bHRpcGxlID8gb3V0cHV0IDogb3V0cHV0WzBdKVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBjcmVhdGVkICgpIHtcbiAgICB0aGlzLmNoZWNrTXVsdGlwbGVQcm9wKClcblxuICAgIGlmICh0aGlzLnBpY2tlckRhdGUgIT09IHRoaXMudGFibGVEYXRlKSB7XG4gICAgICB0aGlzLiRlbWl0KCd1cGRhdGU6cGlja2VyRGF0ZScsIHRoaXMudGFibGVEYXRlKVxuICAgIH1cbiAgICB0aGlzLnNldElucHV0RGF0ZSgpXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGVtaXRJbnB1dCAobmV3SW5wdXQpIHtcbiAgICAgIGNvbnN0IG91dHB1dCA9IHRoaXMubXVsdGlwbGVcbiAgICAgICAgPyAoXG4gICAgICAgICAgdGhpcy52YWx1ZS5pbmRleE9mKG5ld0lucHV0KSA9PT0gLTFcbiAgICAgICAgICAgID8gdGhpcy52YWx1ZS5jb25jYXQoW25ld0lucHV0XSlcbiAgICAgICAgICAgIDogdGhpcy52YWx1ZS5maWx0ZXIoeCA9PiB4ICE9PSBuZXdJbnB1dClcbiAgICAgICAgKVxuICAgICAgICA6IG5ld0lucHV0XG5cbiAgICAgIHRoaXMuJGVtaXQoJ2lucHV0Jywgb3V0cHV0KVxuICAgICAgdGhpcy5tdWx0aXBsZSB8fCB0aGlzLiRlbWl0KCdjaGFuZ2UnLCBuZXdJbnB1dClcbiAgICB9LFxuICAgIGNoZWNrTXVsdGlwbGVQcm9wICgpIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlID09IG51bGwpIHJldHVyblxuICAgICAgY29uc3QgdmFsdWVUeXBlID0gdGhpcy52YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lXG4gICAgICBjb25zdCBleHBlY3RlZCA9IHRoaXMubXVsdGlwbGUgPyAnQXJyYXknIDogJ1N0cmluZydcbiAgICAgIGlmICh2YWx1ZVR5cGUgIT09IGV4cGVjdGVkKSB7XG4gICAgICAgIGNvbnNvbGVXYXJuKGBWYWx1ZSBtdXN0IGJlICR7dGhpcy5tdWx0aXBsZSA/ICdhbicgOiAnYSd9ICR7ZXhwZWN0ZWR9LCBnb3QgJHt2YWx1ZVR5cGV9YCwgdGhpcylcbiAgICAgIH1cbiAgICB9LFxuICAgIGlzRGF0ZUFsbG93ZWQgKHZhbHVlKSB7XG4gICAgICByZXR1cm4gaXNEYXRlQWxsb3dlZCh2YWx1ZSwgdGhpcy5taW4sIHRoaXMubWF4LCB0aGlzLmFsbG93ZWREYXRlcylcbiAgICB9LFxuICAgIHllYXJDbGljayAodmFsdWUpIHtcbiAgICAgIHRoaXMuaW5wdXRZZWFyID0gdmFsdWVcbiAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdtb250aCcpIHtcbiAgICAgICAgdGhpcy50YWJsZURhdGUgPSBgJHt2YWx1ZX1gXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRhYmxlRGF0ZSA9IGAke3ZhbHVlfS0ke3BhZCh0aGlzLnRhYmxlTW9udGggKyAxKX1gXG4gICAgICB9XG4gICAgICB0aGlzLmFjdGl2ZVBpY2tlciA9ICdNT05USCdcbiAgICAgIHRoaXMucmVhY3RpdmUgJiYgIXRoaXMubXVsdGlwbGUgJiYgdGhpcy5pc0RhdGVBbGxvd2VkKHRoaXMuaW5wdXREYXRlKSAmJiB0aGlzLiRlbWl0KCdpbnB1dCcsIHRoaXMuaW5wdXREYXRlKVxuICAgIH0sXG4gICAgbW9udGhDbGljayAodmFsdWUpIHtcbiAgICAgIHRoaXMuaW5wdXRZZWFyID0gcGFyc2VJbnQodmFsdWUuc3BsaXQoJy0nKVswXSwgMTApXG4gICAgICB0aGlzLmlucHV0TW9udGggPSBwYXJzZUludCh2YWx1ZS5zcGxpdCgnLScpWzFdLCAxMCkgLSAxXG4gICAgICBpZiAodGhpcy50eXBlID09PSAnZGF0ZScpIHtcbiAgICAgICAgdGhpcy50YWJsZURhdGUgPSB2YWx1ZVxuICAgICAgICB0aGlzLmFjdGl2ZVBpY2tlciA9ICdEQVRFJ1xuICAgICAgICB0aGlzLnJlYWN0aXZlICYmICF0aGlzLm11bHRpcGxlICYmIHRoaXMuaXNEYXRlQWxsb3dlZCh0aGlzLmlucHV0RGF0ZSkgJiYgdGhpcy4kZW1pdCgnaW5wdXQnLCB0aGlzLmlucHV0RGF0ZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZW1pdElucHV0KHRoaXMuaW5wdXREYXRlKVxuICAgICAgfVxuICAgIH0sXG4gICAgZGF0ZUNsaWNrICh2YWx1ZSkge1xuICAgICAgdGhpcy5pbnB1dFllYXIgPSBwYXJzZUludCh2YWx1ZS5zcGxpdCgnLScpWzBdLCAxMClcbiAgICAgIHRoaXMuaW5wdXRNb250aCA9IHBhcnNlSW50KHZhbHVlLnNwbGl0KCctJylbMV0sIDEwKSAtIDFcbiAgICAgIHRoaXMuaW5wdXREYXkgPSBwYXJzZUludCh2YWx1ZS5zcGxpdCgnLScpWzJdLCAxMClcbiAgICAgIHRoaXMuZW1pdElucHV0KHRoaXMuaW5wdXREYXRlKVxuICAgIH0sXG4gICAgZ2VuUGlja2VyVGl0bGUgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoVkRhdGVQaWNrZXJUaXRsZSwge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGRhdGU6IHRoaXMudmFsdWUgPyB0aGlzLmZvcm1hdHRlcnMudGl0bGVEYXRlKHRoaXMudmFsdWUpIDogJycsXG4gICAgICAgICAgc2VsZWN0aW5nWWVhcjogdGhpcy5hY3RpdmVQaWNrZXIgPT09ICdZRUFSJyxcbiAgICAgICAgICB5ZWFyOiB0aGlzLmZvcm1hdHRlcnMueWVhcihgJHt0aGlzLmlucHV0WWVhcn1gKSxcbiAgICAgICAgICB5ZWFySWNvbjogdGhpcy55ZWFySWNvbixcbiAgICAgICAgICB2YWx1ZTogdGhpcy5tdWx0aXBsZSA/IHRoaXMudmFsdWVbMF0gOiB0aGlzLnZhbHVlXG4gICAgICAgIH0sXG4gICAgICAgIHNsb3Q6ICd0aXRsZScsXG4gICAgICAgIHN0eWxlOiB0aGlzLnJlYWRvbmx5ID8ge1xuICAgICAgICAgICdwb2ludGVyLWV2ZW50cyc6ICdub25lJ1xuICAgICAgICB9IDogdW5kZWZpbmVkLFxuICAgICAgICBvbjoge1xuICAgICAgICAgICd1cGRhdGU6c2VsZWN0aW5nWWVhcic6IHZhbHVlID0+IHRoaXMuYWN0aXZlUGlja2VyID0gdmFsdWUgPyAnWUVBUicgOiB0aGlzLnR5cGUudG9VcHBlckNhc2UoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgZ2VuVGFibGVIZWFkZXIgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoVkRhdGVQaWNrZXJIZWFkZXIsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBuZXh0SWNvbjogdGhpcy5uZXh0SWNvbixcbiAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcbiAgICAgICAgICBkYXJrOiB0aGlzLmRhcmssXG4gICAgICAgICAgZGlzYWJsZWQ6IHRoaXMucmVhZG9ubHksXG4gICAgICAgICAgZm9ybWF0OiB0aGlzLmhlYWRlckRhdGVGb3JtYXQsXG4gICAgICAgICAgbGlnaHQ6IHRoaXMubGlnaHQsXG4gICAgICAgICAgbG9jYWxlOiB0aGlzLmxvY2FsZSxcbiAgICAgICAgICBtaW46IHRoaXMuYWN0aXZlUGlja2VyID09PSAnREFURScgPyB0aGlzLm1pbk1vbnRoIDogdGhpcy5taW5ZZWFyLFxuICAgICAgICAgIG1heDogdGhpcy5hY3RpdmVQaWNrZXIgPT09ICdEQVRFJyA/IHRoaXMubWF4TW9udGggOiB0aGlzLm1heFllYXIsXG4gICAgICAgICAgcHJldkljb246IHRoaXMucHJldkljb24sXG4gICAgICAgICAgdmFsdWU6IHRoaXMuYWN0aXZlUGlja2VyID09PSAnREFURScgPyBgJHt0aGlzLnRhYmxlWWVhcn0tJHtwYWQodGhpcy50YWJsZU1vbnRoICsgMSl9YCA6IGAke3RoaXMudGFibGVZZWFyfWBcbiAgICAgICAgfSxcbiAgICAgICAgb246IHtcbiAgICAgICAgICB0b2dnbGU6ICgpID0+IHRoaXMuYWN0aXZlUGlja2VyID0gKHRoaXMuYWN0aXZlUGlja2VyID09PSAnREFURScgPyAnTU9OVEgnIDogJ1lFQVInKSxcbiAgICAgICAgICBpbnB1dDogdmFsdWUgPT4gdGhpcy50YWJsZURhdGUgPSB2YWx1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgZ2VuRGF0ZVRhYmxlICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KFZEYXRlUGlja2VyRGF0ZVRhYmxlLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgYWxsb3dlZERhdGVzOiB0aGlzLmFsbG93ZWREYXRlcyxcbiAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcbiAgICAgICAgICBjdXJyZW50OiB0aGlzLmN1cnJlbnQsXG4gICAgICAgICAgZGFyazogdGhpcy5kYXJrLFxuICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnJlYWRvbmx5LFxuICAgICAgICAgIGV2ZW50czogdGhpcy5ldmVudHMsXG4gICAgICAgICAgZXZlbnRDb2xvcjogdGhpcy5ldmVudENvbG9yLFxuICAgICAgICAgIGZpcnN0RGF5T2ZXZWVrOiB0aGlzLmZpcnN0RGF5T2ZXZWVrLFxuICAgICAgICAgIGZvcm1hdDogdGhpcy5kYXlGb3JtYXQsXG4gICAgICAgICAgbGlnaHQ6IHRoaXMubGlnaHQsXG4gICAgICAgICAgbG9jYWxlOiB0aGlzLmxvY2FsZSxcbiAgICAgICAgICBtaW46IHRoaXMubWluLFxuICAgICAgICAgIG1heDogdGhpcy5tYXgsXG4gICAgICAgICAgdGFibGVEYXRlOiBgJHt0aGlzLnRhYmxlWWVhcn0tJHtwYWQodGhpcy50YWJsZU1vbnRoICsgMSl9YCxcbiAgICAgICAgICBzY3JvbGxhYmxlOiB0aGlzLnNjcm9sbGFibGUsXG4gICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWVcbiAgICAgICAgfSxcbiAgICAgICAgcmVmOiAndGFibGUnLFxuICAgICAgICBvbjoge1xuICAgICAgICAgIGlucHV0OiB0aGlzLmRhdGVDbGljayxcbiAgICAgICAgICB0YWJsZURhdGU6IHZhbHVlID0+IHRoaXMudGFibGVEYXRlID0gdmFsdWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGdlbk1vbnRoVGFibGUgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoVkRhdGVQaWNrZXJNb250aFRhYmxlLCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgYWxsb3dlZERhdGVzOiB0aGlzLnR5cGUgPT09ICdtb250aCcgPyB0aGlzLmFsbG93ZWREYXRlcyA6IG51bGwsXG4gICAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICAgICAgY3VycmVudDogdGhpcy5jdXJyZW50ID8gdGhpcy5zYW5pdGl6ZURhdGVTdHJpbmcodGhpcy5jdXJyZW50LCAnbW9udGgnKSA6IG51bGwsXG4gICAgICAgICAgZGFyazogdGhpcy5kYXJrLFxuICAgICAgICAgIGRpc2FibGVkOiB0aGlzLnJlYWRvbmx5LFxuICAgICAgICAgIGZvcm1hdDogdGhpcy5tb250aEZvcm1hdCxcbiAgICAgICAgICBsaWdodDogdGhpcy5saWdodCxcbiAgICAgICAgICBsb2NhbGU6IHRoaXMubG9jYWxlLFxuICAgICAgICAgIG1pbjogdGhpcy5taW5Nb250aCxcbiAgICAgICAgICBtYXg6IHRoaXMubWF4TW9udGgsXG4gICAgICAgICAgc2Nyb2xsYWJsZTogdGhpcy5zY3JvbGxhYmxlLFxuICAgICAgICAgIHZhbHVlOiB0aGlzLnNlbGVjdGVkTW9udGhzLFxuICAgICAgICAgIHRhYmxlRGF0ZTogYCR7dGhpcy50YWJsZVllYXJ9YFxuICAgICAgICB9LFxuICAgICAgICByZWY6ICd0YWJsZScsXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgaW5wdXQ6IHRoaXMubW9udGhDbGljayxcbiAgICAgICAgICB0YWJsZURhdGU6IHZhbHVlID0+IHRoaXMudGFibGVEYXRlID0gdmFsdWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGdlblllYXJzICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KFZEYXRlUGlja2VyWWVhcnMsIHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjb2xvcjogdGhpcy5jb2xvcixcbiAgICAgICAgICBmb3JtYXQ6IHRoaXMueWVhckZvcm1hdCxcbiAgICAgICAgICBsb2NhbGU6IHRoaXMubG9jYWxlLFxuICAgICAgICAgIG1pbjogdGhpcy5taW5ZZWFyLFxuICAgICAgICAgIG1heDogdGhpcy5tYXhZZWFyLFxuICAgICAgICAgIHZhbHVlOiBgJHt0aGlzLnRhYmxlWWVhcn1gXG4gICAgICAgIH0sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgaW5wdXQ6IHRoaXMueWVhckNsaWNrXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBnZW5QaWNrZXJCb2R5ICgpIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5hY3RpdmVQaWNrZXIgPT09ICdZRUFSJyA/IFtcbiAgICAgICAgdGhpcy5nZW5ZZWFycygpXG4gICAgICBdIDogW1xuICAgICAgICB0aGlzLmdlblRhYmxlSGVhZGVyKCksXG4gICAgICAgIHRoaXMuYWN0aXZlUGlja2VyID09PSAnREFURScgPyB0aGlzLmdlbkRhdGVUYWJsZSgpIDogdGhpcy5nZW5Nb250aFRhYmxlKClcbiAgICAgIF1cblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAga2V5OiB0aGlzLmFjdGl2ZVBpY2tlcixcbiAgICAgICAgc3R5bGU6IHRoaXMucmVhZG9ubHkgPyB7XG4gICAgICAgICAgJ3BvaW50ZXItZXZlbnRzJzogJ25vbmUnXG4gICAgICAgIH0gOiB1bmRlZmluZWRcbiAgICAgIH0sIGNoaWxkcmVuKVxuICAgIH0sXG4gICAgLy8gQWRkcyBsZWFkaW5nIHplcm8gdG8gbW9udGgvZGF5IGlmIG5lY2Vzc2FyeSwgcmV0dXJucyAnWVlZWScgaWYgdHlwZSA9ICd5ZWFyJyxcbiAgICAvLyAnWVlZWS1NTScgaWYgJ21vbnRoJyBhbmQgJ1lZWVktTU0tREQnIGlmICdkYXRlJ1xuICAgIHNhbml0aXplRGF0ZVN0cmluZyAoZGF0ZVN0cmluZywgdHlwZSkge1xuICAgICAgY29uc3QgW3llYXIsIG1vbnRoID0gMSwgZGF0ZSA9IDFdID0gZGF0ZVN0cmluZy5zcGxpdCgnLScpXG4gICAgICByZXR1cm4gYCR7eWVhcn0tJHtwYWQobW9udGgpfS0ke3BhZChkYXRlKX1gLnN1YnN0cigwLCB7IGRhdGU6IDEwLCBtb250aDogNywgeWVhcjogNCB9W3R5cGVdKVxuICAgIH0sXG4gICAgc2V0SW5wdXREYXRlICgpIHtcbiAgICAgIGlmICh0aGlzLmxhc3RWYWx1ZSkge1xuICAgICAgICBjb25zdCBhcnJheSA9IHRoaXMubGFzdFZhbHVlLnNwbGl0KCctJylcbiAgICAgICAgdGhpcy5pbnB1dFllYXIgPSBwYXJzZUludChhcnJheVswXSwgMTApXG4gICAgICAgIHRoaXMuaW5wdXRNb250aCA9IHBhcnNlSW50KGFycmF5WzFdLCAxMCkgLSAxXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdkYXRlJykge1xuICAgICAgICAgIHRoaXMuaW5wdXREYXkgPSBwYXJzZUludChhcnJheVsyXSwgMTApXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW5wdXRZZWFyID0gdGhpcy5pbnB1dFllYXIgfHwgdGhpcy5ub3cuZ2V0RnVsbFllYXIoKVxuICAgICAgICB0aGlzLmlucHV0TW9udGggPSB0aGlzLmlucHV0TW9udGggPT0gbnVsbCA/IHRoaXMuaW5wdXRNb250aCA6IHRoaXMubm93LmdldE1vbnRoKClcbiAgICAgICAgdGhpcy5pbnB1dERheSA9IHRoaXMuaW5wdXREYXkgfHwgdGhpcy5ub3cuZ2V0RGF0ZSgpXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2VuUGlja2VyKCd2LXBpY2tlci0tZGF0ZScpXG4gIH1cbn1cbiJdfQ==