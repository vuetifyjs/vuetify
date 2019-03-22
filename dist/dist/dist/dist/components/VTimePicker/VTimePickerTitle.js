import '../../stylus/components/_time-picker-title.styl';
// Mixins
import PickerButton from '../../mixins/picker-button';
// Utils
import { pad } from '../VDatePicker/util';
import mixins from '../../util/mixins';
import { selectingTimes } from './VTimePicker';
export default mixins(PickerButton
/* @vue/component */
).extend({
    name: 'v-time-picker-title',
    props: {
        ampm: Boolean,
        disabled: Boolean,
        hour: Number,
        minute: Number,
        second: Number,
        period: {
            type: String,
            validator: function (period) { return period === 'am' || period === 'pm'; }
        },
        readonly: Boolean,
        useSeconds: Boolean,
        selecting: Number
    },
    methods: {
        genTime: function () {
            var hour = this.hour;
            if (this.ampm) {
                hour = hour ? ((hour - 1) % 12 + 1) : 12;
            }
            var displayedHour = this.hour == null ? '--' : this.ampm ? String(hour) : pad(hour);
            var displayedMinute = this.minute == null ? '--' : pad(this.minute);
            var titleContent = [
                this.genPickerButton('selecting', selectingTimes.hour, displayedHour, this.disabled),
                this.$createElement('span', ':'),
                this.genPickerButton('selecting', selectingTimes.minute, displayedMinute, this.disabled)
            ];
            if (this.useSeconds) {
                var displayedSecond = this.second == null ? '--' : pad(this.second);
                titleContent.push(this.$createElement('span', ':'));
                titleContent.push(this.genPickerButton('selecting', selectingTimes.second, displayedSecond, this.disabled));
            }
            return this.$createElement('div', {
                'class': 'v-time-picker-title__time'
            }, titleContent);
        },
        genAmPm: function () {
            return this.$createElement('div', {
                staticClass: 'v-time-picker-title__ampm'
            }, [
                this.genPickerButton('period', 'am', 'am', this.disabled || this.readonly),
                this.genPickerButton('period', 'pm', 'pm', this.disabled || this.readonly)
            ]);
        }
    },
    render: function (h) {
        var children = [this.genTime()];
        this.ampm && children.push(this.genAmPm());
        return h('div', {
            staticClass: 'v-time-picker-title'
        }, children);
    }
});
//# sourceMappingURL=VTimePickerTitle.js.map
//# sourceMappingURL=VTimePickerTitle.js.map
//# sourceMappingURL=VTimePickerTitle.js.map
//# sourceMappingURL=VTimePickerTitle.js.map