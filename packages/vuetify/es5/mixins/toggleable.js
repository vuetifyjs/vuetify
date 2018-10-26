'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.factory = factory;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function factory() {
    var _watch;

    var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'value';
    var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'input';

    return _vue2.default.extend({
        name: 'toggleable',
        model: { prop: prop, event: event },
        props: _defineProperty({}, prop, { required: false }),
        data: function data() {
            return {
                isActive: !!this[prop]
            };
        },

        watch: (_watch = {}, _defineProperty(_watch, prop, function (val) {
            this.isActive = !!val;
        }), _defineProperty(_watch, 'isActive', function isActive(val) {
            !!val !== this[prop] && this.$emit(event, val);
        }), _watch)
    });
}
/* eslint-disable-next-line no-redeclare */
var Toggleable = factory();
exports.default = Toggleable;
//# sourceMappingURL=toggleable.js.map