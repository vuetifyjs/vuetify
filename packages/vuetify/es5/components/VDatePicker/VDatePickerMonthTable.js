'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _colorable = require('../../mixins/colorable');

var _colorable2 = _interopRequireDefault(_colorable);

var _datePickerTable = require('./mixins/date-picker-table');

var _datePickerTable2 = _interopRequireDefault(_datePickerTable);

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
// Mixins
exports.default = {
    name: 'v-date-picker-month-table',
    mixins: [_colorable2.default, _datePickerTable2.default, _themeable2.default],
    computed: {
        formatter: function formatter() {
            return this.format || (0, _util.createNativeLocaleFormatter)(this.locale, { month: 'short', timeZone: 'UTC' }, { start: 5, length: 2 });
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
                    }, [_this.genButton(_this.displayedYear + '-' + (0, _util.pad)(month + 1), false)]);
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
// Utils
//# sourceMappingURL=VDatePickerMonthTable.js.map