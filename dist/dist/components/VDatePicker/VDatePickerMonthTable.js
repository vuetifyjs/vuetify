// Mixins
import DatePickerTable from './mixins/date-picker-table';
// Utils
import { pad, createNativeLocaleFormatter } from './util';
import mixins from '../../util/mixins';
export default mixins(DatePickerTable
/* @vue/component */
).extend({
    name: 'v-date-picker-month-table',
    computed: {
        formatter: function () {
            return this.format || createNativeLocaleFormatter(this.locale, { month: 'short', timeZone: 'UTC' }, { start: 5, length: 2 });
        }
    },
    methods: {
        calculateTableDate: function (delta) {
            return "" + (parseInt(this.tableDate, 10) + Math.sign(delta || 1));
        },
        genTBody: function () {
            var _this = this;
            var children = [];
            var cols = Array(3).fill(null);
            var rows = 12 / cols.length;
            var _loop_1 = function (row) {
                var tds = cols.map(function (_, col) {
                    var month = row * cols.length + col;
                    var date = _this.displayedYear + "-" + pad(month + 1);
                    return _this.$createElement('td', {
                        key: month
                    }, [
                        _this.genButton(date, false, 'month', _this.formatter)
                    ]);
                });
                children.push(this_1.$createElement('tr', {
                    key: row
                }, tds));
            };
            var this_1 = this;
            for (var row = 0; row < rows; row++) {
                _loop_1(row);
            }
            return this.$createElement('tbody', children);
        }
    },
    render: function () {
        return this.genTable('v-date-picker-table v-date-picker-table--month', [
            this.genTBody()
        ], this.calculateTableDate);
    }
});
//# sourceMappingURL=VDatePickerMonthTable.js.map
//# sourceMappingURL=VDatePickerMonthTable.js.map