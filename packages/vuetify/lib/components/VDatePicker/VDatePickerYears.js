import '../../../src/stylus/components/_date-picker-years.styl';
// Mixins
import Colorable from '../../mixins/colorable';
// Utils
import { createNativeLocaleFormatter } from './util';
/* @vue/component */
export default {
    name: 'v-date-picker-years',
    mixins: [Colorable],
    props: {
        format: {
            type: Function,
            default: null
        },
        locale: {
            type: String,
            default: 'en-us'
        },
        min: [Number, String],
        max: [Number, String],
        value: [Number, String]
    },
    data: function data() {
        return {
            defaultColor: 'primary'
        };
    },

    computed: {
        formatter: function formatter() {
            return this.format || createNativeLocaleFormatter(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 });
        }
    },
    mounted: function mounted() {
        var activeItem = this.$el.getElementsByClassName('active')[0];
        if (activeItem) {
            this.$el.scrollTop = activeItem.offsetTop - this.$el.offsetHeight / 2 + activeItem.offsetHeight / 2;
        } else {
            this.$el.scrollTop = this.$el.scrollHeight / 2 - this.$el.offsetHeight / 2;
        }
    },

    methods: {
        genYearItem: function genYearItem(year) {
            var _this = this;

            var formatted = this.formatter('' + year);
            var active = parseInt(this.value, 10) === year;
            var color = active && (this.color || 'primary');
            return this.$createElement('li', this.setTextColor(color, {
                key: year,
                'class': { active: active },
                on: {
                    click: function click() {
                        return _this.$emit('input', year);
                    }
                }
            }), formatted);
        },
        genYearItems: function genYearItems() {
            var children = [];
            var selectedYear = this.value ? parseInt(this.value, 10) : new Date().getFullYear();
            var maxYear = this.max ? parseInt(this.max, 10) : selectedYear + 100;
            var minYear = Math.min(maxYear, this.min ? parseInt(this.min, 10) : selectedYear - 100);
            for (var year = maxYear; year >= minYear; year--) {
                children.push(this.genYearItem(year));
            }
            return children;
        }
    },
    render: function render() {
        return this.$createElement('ul', {
            staticClass: 'v-date-picker-years',
            ref: 'years'
        }, this.genYearItems());
    }
};
//# sourceMappingURL=VDatePickerYears.js.map