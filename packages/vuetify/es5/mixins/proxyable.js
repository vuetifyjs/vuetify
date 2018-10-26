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
    var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'value';
    var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'change';

    return _vue2.default.extend({
        name: 'proxyable',
        model: {
            prop: prop,
            event: event
        },
        props: _defineProperty({}, prop, {
            required: false
        }),
        data: function data() {
            return {
                internalLazyValue: this[prop]
            };
        },

        computed: {
            internalValue: {
                get: function get() {
                    return this.internalLazyValue;
                },
                set: function set(val) {
                    if (val === this.internalLazyValue) return;
                    this.internalLazyValue = val;
                    this.$emit(event, val);
                }
            }
        },
        watch: _defineProperty({}, prop, function (val) {
            this.internalLazyValue = val;
        })
    });
}
/* eslint-disable-next-line no-redeclare */
var Proxyable = factory();
exports.default = Proxyable;
//# sourceMappingURL=proxyable.js.map