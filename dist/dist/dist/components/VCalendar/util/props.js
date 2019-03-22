import { validateTimestamp, parseDate } from './timestamp';
export default {
    base: {
        start: {
            type: String,
            validate: validateTimestamp,
            default: function () { return parseDate(new Date()).date; }
        },
        end: {
            type: String,
            validate: validateTimestamp,
            default: '0000-00-00'
        },
        weekdays: {
            type: Array,
            default: function () { return [0, 1, 2, 3, 4, 5, 6]; }
        },
        hideHeader: {
            type: Boolean,
            default: false
        },
        shortWeekdays: {
            type: Boolean,
            default: true
        },
        weekdayFormat: {
            type: Function,
            default: null
        },
        dayFormat: {
            type: Function,
            default: null
        },
        locale: {
            type: String,
            default: 'en-us'
        }
    },
    intervals: {
        maxDays: {
            type: Number,
            default: 7
        },
        shortIntervals: {
            type: Boolean,
            default: true
        },
        intervalHeight: {
            type: [Number, String],
            default: 40,
            validate: validateNumber
        },
        intervalMinutes: {
            type: [Number, String],
            default: 60,
            validate: validateNumber
        },
        firstInterval: {
            type: [Number, String],
            default: 0,
            validate: validateNumber
        },
        intervalCount: {
            type: [Number, String],
            default: 24,
            validate: validateNumber
        },
        intervalFormat: {
            type: Function,
            default: null
        },
        intervalStyle: {
            type: Function,
            default: null
        },
        showIntervalLabel: {
            type: Function,
            default: null
        }
    },
    weeks: {
        minWeeks: {
            validate: validateNumber,
            default: 1
        },
        shortMonths: {
            type: Boolean,
            default: true
        },
        showMonthOnFirst: {
            type: Boolean,
            default: true
        },
        monthFormat: {
            type: Function,
            default: null
        }
    },
    calendar: {
        type: {
            type: String,
            default: 'month'
        },
        value: {
            type: String,
            validate: validateTimestamp
        }
    }
};
function validateNumber(input) {
    return isFinite(parseInt(input));
}
//# sourceMappingURL=props.js.map
//# sourceMappingURL=props.js.map
//# sourceMappingURL=props.js.map