function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from 'vue';
export function factory() {
    var _watch;

    var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'value';
    var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'input';

    return Vue.extend({
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
export default Toggleable;
//# sourceMappingURL=toggleable.js.map