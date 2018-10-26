'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('../../../src/stylus/components/_time-picker-title.styl');

var _pickerButton = require('../../mixins/picker-button');

var _pickerButton2 = _interopRequireDefault(_pickerButton);

var _util = require('../VDatePicker/util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */

// Mixins
exports.default = {
    name: 'v-time-picker-title',
    mixins: [_pickerButton2.default],
    props: {
        ampm: Boolean,
        hour: Number,
        minute: Number,
        period: {
            type: String,
            validator: function validator(period) {
                return period === 'am' || period === 'pm';
            }
        },
        readonly: Boolean,
        selectingHour: Boolean
    },
    methods: {
        genTime: function genTime() {
            var hour = this.hour;
            if (this.ampm) {
                hour = hour ? (hour - 1) % 12 + 1 : 12;
            }
            var displayedHour = this.hour == null ? '--' : this.ampm ? hour : (0, _util.pad)(hour);
            var displayedMinute = this.minute == null ? '--' : (0, _util.pad)(this.minute);
            return this.$createElement('div', {
                'class': 'v-time-picker-title__time'
            }, [this.genPickerButton('selectingHour', true, displayedHour), this.$createElement('span', ':'), this.genPickerButton('selectingHour', false, displayedMinute)]);
        },
        genAmPm: function genAmPm() {
            return this.$createElement('div', {
                staticClass: 'v-time-picker-title__ampm'
            }, [this.genPickerButton('period', 'am', 'am', this.readonly), this.genPickerButton('period', 'pm', 'pm', this.readonly)]);
        }
    },
    render: function render(h) {
        return h('div', {
            staticClass: 'v-time-picker-title'
        }, [this.genTime(), this.ampm ? this.genAmPm() : null]);
    }
};
// Utils
//# sourceMappingURL=VTimePickerTitle.js.map