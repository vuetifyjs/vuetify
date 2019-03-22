import Vue from 'vue';
export function factory(prop, event) {
    if (prop === void 0) {
        prop = 'value';
    }
    if (event === void 0) {
        event = 'change';
    }
    var _a, _b;
    return Vue.extend({
        name: 'proxyable',
        model: {
            prop: prop,
            event: event
        },
        props: (_a = {},
            _a[prop] = {
                required: false
            },
            _a),
        data: function () {
            return {
                internalLazyValue: this[prop]
            };
        },
        computed: {
            internalValue: {
                get: function () {
                    return this.internalLazyValue;
                },
                set: function (val) {
                    if (val === this.internalLazyValue)
                        return;
                    this.internalLazyValue = val;
                    this.$emit(event, val);
                }
            }
        },
        watch: (_b = {},
            _b[prop] = function (val) {
                this.internalLazyValue = val;
            },
            _b)
    });
}
/* eslint-disable-next-line no-redeclare */
var Proxyable = factory();
export default Proxyable;
//# sourceMappingURL=proxyable.js.map
//# sourceMappingURL=proxyable.js.map
//# sourceMappingURL=proxyable.js.map