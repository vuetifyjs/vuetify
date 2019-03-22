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
// Components
import VTimePickerTitle from './VTimePickerTitle';
import VTimePickerClock from './VTimePickerClock';
// Mixins
import Picker from '../../mixins/picker';
// Utils
import { createRange } from '../../util/helpers';
import pad from '../VDatePicker/util/pad';
import mixins from '../../util/mixins';
var rangeHours24 = createRange(24);
var rangeHours12am = createRange(12);
var rangeHours12pm = rangeHours12am.map(function (v) { return v + 12; });
var range60 = createRange(60);
var selectingTimes = { hour: 1, minute: 2, second: 3 };
var selectingNames = { 1: 'hour', 2: 'minute', 3: 'second' };
export { selectingTimes };
export default mixins(Picker
/* @vue/component */
).extend({
    name: 'v-time-picker',
    props: {
        allowedHours: Function,
        allowedMinutes: Function,
        allowedSeconds: Function,
        disabled: Boolean,
        format: {
            type: String,
            default: 'ampm',
            validator: function (val) {
                return ['ampm', '24hr'].includes(val);
            }
        },
        min: String,
        max: String,
        readonly: Boolean,
        scrollable: Boolean,
        useSeconds: Boolean,
        value: null
    },
    data: function () {
        return {
            inputHour: null,
            inputMinute: null,
            inputSecond: null,
            lazyInputHour: null,
            lazyInputMinute: null,
            lazyInputSecond: null,
            period: 'am',
            selecting: selectingTimes.hour
        };
    },
    computed: {
        selectingHour: {
            get: function () {
                return this.selecting === selectingTimes.hour;
            },
            set: function (v) {
                this.selecting = selectingTimes.hour;
            }
        },
        selectingMinute: {
            get: function () {
                return this.selecting === selectingTimes.minute;
            },
            set: function (v) {
                this.selecting = selectingTimes.minute;
            }
        },
        selectingSecond: {
            get: function () {
                return this.selecting === selectingTimes.second;
            },
            set: function (v) {
                this.selecting = selectingTimes.second;
            }
        },
        isAllowedHourCb: function () {
            var _this = this;
            if (!this.min && !this.max)
                return this.allowedHours;
            var minHour = this.min ? Number(this.min.split(':')[0]) : 0;
            var maxHour = this.max ? Number(this.max.split(':')[0]) : 23;
            return function (val) {
                return val >= minHour * 1 &&
                    val <= maxHour * 1 &&
                    (!_this.allowedHours || _this.allowedHours(val));
            };
        },
        isAllowedMinuteCb: function () {
            var _this = this;
            var isHourAllowed = !this.allowedHours || this.allowedHours(this.inputHour);
            if (!this.min && !this.max) {
                return isHourAllowed ? this.allowedMinutes : function () { return false; };
            }
            var _a = __read(this.min ? this.min.split(':').map(Number) : [0, 0], 2), minHour = _a[0], minMinute = _a[1];
            var _b = __read(this.max ? this.max.split(':').map(Number) : [23, 59], 2), maxHour = _b[0], maxMinute = _b[1];
            var minTime = minHour * 60 + minMinute * 1;
            var maxTime = maxHour * 60 + maxMinute * 1;
            return function (val) {
                var time = 60 * _this.inputHour + val;
                return time >= minTime &&
                    time <= maxTime &&
                    isHourAllowed &&
                    (!_this.allowedMinutes || _this.allowedMinutes(val));
            };
        },
        isAllowedSecondCb: function () {
            var _this = this;
            var isHourAllowed = !this.allowedHours || this.allowedHours(this.inputHour);
            var isMinuteAllowed = !this.allowedMinutes || this.allowedMinutes(this.inputMinute);
            if (!this.min && !this.max) {
                return isHourAllowed && isMinuteAllowed ? this.allowedSeconds : function () { return false; };
            }
            var _a = __read(this.min ? this.min.split(':').map(Number) : [0, 0, 0], 3), minHour = _a[0], minMinute = _a[1], minSecond = _a[2];
            var _b = __read(this.max ? this.max.split(':').map(Number) : [23, 59, 59], 3), maxHour = _b[0], maxMinute = _b[1], maxSecond = _b[2];
            var minTime = minHour * 3600 + minMinute * 60 + (minSecond || 0) * 1;
            var maxTime = maxHour * 3600 + maxMinute * 60 + (maxSecond || 0) * 1;
            return function (val) {
                var time = 3600 * _this.inputHour + 60 * _this.inputMinute + val;
                return time >= minTime &&
                    time <= maxTime &&
                    isHourAllowed && isMinuteAllowed &&
                    (!_this.allowedSeconds || _this.allowedSeconds(val));
            };
        },
        isAmPm: function () {
            return this.format === 'ampm';
        }
    },
    watch: {
        value: 'setInputData'
    },
    mounted: function () {
        this.setInputData(this.value);
    },
    methods: {
        genValue: function () {
            if (this.inputHour != null && this.inputMinute != null && (!this.useSeconds || this.inputSecond != null)) {
                return pad(this.inputHour) + ":" + pad(this.inputMinute) + (this.useSeconds ? ":" + pad(this.inputSecond) : '');
            }
            return null;
        },
        emitValue: function () {
            var value = this.genValue();
            if (value !== null)
                this.$emit('input', value);
        },
        setPeriod: function (period) {
            this.period = period;
            if (this.inputHour != null) {
                var newHour = this.inputHour + (period === 'am' ? -12 : 12);
                this.inputHour = this.firstAllowed('hour', newHour);
                this.emitValue();
            }
        },
        setInputData: function (value) {
            if (value == null || value === '') {
                this.inputHour = null;
                this.inputMinute = null;
                this.inputSecond = null;
            }
            else if (value instanceof Date) {
                this.inputHour = value.getHours();
                this.inputMinute = value.getMinutes();
                this.inputSecond = value.getSeconds();
            }
            else {
                var _a = __read(value.trim().toLowerCase().match(/^(\d+):(\d+)(:(\d+))?([ap]m)?$/) || new Array(6), 6), hour = _a[1], minute = _a[2], second = _a[4], period = _a[5];
                this.inputHour = period ? this.convert12to24(parseInt(hour, 10), period) : parseInt(hour, 10);
                this.inputMinute = parseInt(minute, 10);
                this.inputSecond = parseInt(second || 0, 10);
            }
            this.period = (this.inputHour == null || this.inputHour < 12) ? 'am' : 'pm';
        },
        convert24to12: function (hour) {
            return hour ? ((hour - 1) % 12 + 1) : 12;
        },
        convert12to24: function (hour, period) {
            return hour % 12 + (period === 'pm' ? 12 : 0);
        },
        onInput: function (value) {
            if (this.selecting === selectingTimes.hour) {
                this.inputHour = this.isAmPm ? this.convert12to24(value, this.period) : value;
            }
            else if (this.selecting === selectingTimes.minute) {
                this.inputMinute = value;
            }
            else {
                this.inputSecond = value;
            }
            this.emitValue();
        },
        onChange: function (value) {
            this.$emit("click:" + selectingNames[this.selecting], value);
            var emitChange = this.selecting === (this.useSeconds ? selectingTimes.second : selectingTimes.minute);
            if (this.selecting === selectingTimes.hour) {
                this.selecting = selectingTimes.minute;
            }
            else if (this.useSeconds && this.selecting === selectingTimes.minute) {
                this.selecting = selectingTimes.second;
            }
            if (this.inputHour === this.lazyInputHour &&
                this.inputMinute === this.lazyInputMinute &&
                (!this.useSeconds || this.inputSecond === this.lazyInputSecond))
                return;
            var time = this.genValue();
            if (time === null)
                return;
            this.lazyInputHour = this.inputHour;
            this.lazyInputMinute = this.inputMinute;
            this.useSeconds && (this.lazyInputSecond = this.inputSecond);
            emitChange && this.$emit('change', time);
        },
        firstAllowed: function (type, value) {
            var allowedFn = type === 'hour' ? this.isAllowedHourCb : (type === 'minute' ? this.isAllowedMinuteCb : this.isAllowedSecondCb);
            if (!allowedFn)
                return value;
            // TODO: clean up
            var range = type === 'minute'
                ? range60
                : (type === 'second'
                    ? range60
                    : (this.isAmPm
                        ? (value < 12
                            ? rangeHours12am
                            : rangeHours12pm)
                        : rangeHours24));
            var first = range.find(function (v) { return allowedFn((v + value) % range.length + range[0]); });
            return ((first || 0) + value) % range.length + range[0];
        },
        genClock: function () {
            return this.$createElement(VTimePickerClock, {
                props: {
                    allowedValues: this.selecting === selectingTimes.hour
                        ? this.isAllowedHourCb
                        : (this.selecting === selectingTimes.minute
                            ? this.isAllowedMinuteCb
                            : this.isAllowedSecondCb),
                    color: this.color,
                    dark: this.dark,
                    disabled: this.disabled,
                    double: this.selecting === selectingTimes.hour && !this.isAmPm,
                    format: this.selecting === selectingTimes.hour
                        ? (this.isAmPm ? this.convert24to12 : function (val) { return val; })
                        : function (val) { return pad(val, 2); },
                    light: this.light,
                    max: this.selecting === selectingTimes.hour ? (this.isAmPm && this.period === 'am' ? 11 : 23) : 59,
                    min: this.selecting === selectingTimes.hour && this.isAmPm && this.period === 'pm' ? 12 : 0,
                    readonly: this.readonly,
                    scrollable: this.scrollable,
                    size: Number(this.width) - ((!this.fullWidth && this.landscape) ? 80 : 20),
                    step: this.selecting === selectingTimes.hour ? 1 : 5,
                    value: this.selecting === selectingTimes.hour
                        ? this.inputHour
                        : (this.selecting === selectingTimes.minute
                            ? this.inputMinute
                            : this.inputSecond)
                },
                on: {
                    input: this.onInput,
                    change: this.onChange
                },
                ref: 'clock'
            });
        },
        genPickerBody: function () {
            return this.$createElement('div', {
                staticClass: 'v-time-picker-clock__container',
                key: this.selecting
            }, [this.genClock()]);
        },
        genPickerTitle: function () {
            var _this = this;
            return this.$createElement(VTimePickerTitle, {
                props: {
                    ampm: this.isAmPm,
                    disabled: this.disabled,
                    hour: this.inputHour,
                    minute: this.inputMinute,
                    second: this.inputSecond,
                    period: this.period,
                    readonly: this.readonly,
                    useSeconds: this.useSeconds,
                    selecting: this.selecting
                },
                on: {
                    'update:selecting': function (value) { return (_this.selecting = value); },
                    'update:period': this.setPeriod
                },
                ref: 'title',
                slot: 'title'
            });
        }
    },
    render: function () {
        return this.genPicker('v-picker--time');
    }
});
//# sourceMappingURL=VTimePicker.js.map
//# sourceMappingURL=VTimePicker.js.map