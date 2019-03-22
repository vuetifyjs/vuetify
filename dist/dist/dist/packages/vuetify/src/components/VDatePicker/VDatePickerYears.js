import '../../stylus/components/_date-picker-years.styl';
// Mixins
import Colorable from '../../mixins/colorable';
// Utils
import { createNativeLocaleFormatter } from './util';
import mixins from '../../util/mixins';
export default mixins(Colorable
/* @vue/component */
).extend({
    name: 'v-date-picker-years',
    props: {
        format: Function,
        locale: {
            type: String,
            default: 'en-us'
        },
        min: [Number, String],
        max: [Number, String],
        readonly: Boolean,
        value: [Number, String]
    },
    data: function () {
        return {
            defaultColor: 'primary'
        };
    },
    computed: {
        formatter: function () {
            return this.format || createNativeLocaleFormatter(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 });
        }
    },
    mounted: function () {
        var _this = this;
        setTimeout(function () {
            var activeItem = _this.$el.getElementsByClassName('active')[0];
            if (activeItem) {
                _this.$el.scrollTop = activeItem.offsetTop - _this.$el.offsetHeight / 2 + activeItem.offsetHeight / 2;
            }
            else {
                _this.$el.scrollTop = _this.$el.scrollHeight / 2 - _this.$el.offsetHeight / 2;
            }
        });
    },
    methods: {
        genYearItem: function (year) {
            var _this = this;
            var formatted = this.formatter("" + year);
            var active = parseInt(this.value, 10) === year;
            var color = active && (this.color || 'primary');
            return this.$createElement('li', this.setTextColor(color, {
                key: year,
                'class': { active: active },
                on: {
                    click: function () { return _this.$emit('input', year); }
                }
            }), formatted);
        },
        genYearItems: function () {
            var children = [];
            var selectedYear = this.value ? parseInt(this.value, 10) : new Date().getFullYear();
            var maxYear = this.max ? parseInt(this.max, 10) : (selectedYear + 100);
            var minYear = Math.min(maxYear, this.min ? parseInt(this.min, 10) : (selectedYear - 100));
            for (var year = maxYear; year >= minYear; year--) {
                children.push(this.genYearItem(year));
            }
            return children;
        }
    },
    render: function () {
        return this.$createElement('ul', {
            staticClass: 'v-date-picker-years',
            ref: 'years'
        }, this.genYearItems());
    }
});
//# sourceMappingURL=VDatePickerYears.js.map
//# sourceMappingURL=VDatePickerYears.js.map
//# sourceMappingURL=VDatePickerYears.js.map