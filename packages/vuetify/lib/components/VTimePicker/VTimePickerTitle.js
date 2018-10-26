import '../../../src/stylus/components/_time-picker-title.styl';
// Mixins
import PickerButton from '../../mixins/picker-button';
// Utils
import { pad } from '../VDatePicker/util';
/* @vue/component */
export default {
    name: 'v-time-picker-title',
    mixins: [PickerButton],
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
            var displayedHour = this.hour == null ? '--' : this.ampm ? hour : pad(hour);
            var displayedMinute = this.minute == null ? '--' : pad(this.minute);
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
//# sourceMappingURL=VTimePickerTitle.js.map