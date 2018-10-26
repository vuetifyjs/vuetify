// Mixins
import Colorable from '../../mixins/colorable';
import DatePickerTable from './mixins/date-picker-table';
import Themeable from '../../mixins/themeable';
// Utils
import { pad, createNativeLocaleFormatter } from './util';
/* @vue/component */
export default {
    name: 'v-date-picker-month-table',
    mixins: [Colorable, DatePickerTable, Themeable],
    computed: {
        formatter: function formatter() {
            return this.format || createNativeLocaleFormatter(this.locale, { month: 'short', timeZone: 'UTC' }, { start: 5, length: 2 });
        }
    },
    methods: {
        calculateTableDate: function calculateTableDate(delta) {
            return '' + (parseInt(this.tableDate, 10) + Math.sign(delta || 1));
        },
        genTBody: function genTBody() {
            var _this = this;

            var children = [];
            var cols = Array(3).fill(null);
            var rows = 12 / cols.length;

            var _loop = function _loop(row) {
                var tds = cols.map(function (_, col) {
                    var month = row * cols.length + col;
                    return _this.$createElement('td', {
                        key: month
                    }, [_this.genButton(_this.displayedYear + '-' + pad(month + 1), false)]);
                });
                children.push(_this.$createElement('tr', {
                    key: row
                }, tds));
            };

            for (var row = 0; row < rows; row++) {
                _loop(row);
            }
            return this.$createElement('tbody', children);
        }
    },
    render: function render() {
        return this.genTable('v-date-picker-table v-date-picker-table--month', [this.genTBody()]);
    }
};
//# sourceMappingURL=VDatePickerMonthTable.js.map