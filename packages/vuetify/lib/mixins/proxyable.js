function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Vue from 'vue';
export function factory() {
    var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'value';
    var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'change';

    return Vue.extend({
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
export default Proxyable;
//# sourceMappingURL=proxyable.js.map