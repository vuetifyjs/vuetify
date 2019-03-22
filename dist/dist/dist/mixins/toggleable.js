import Vue from 'vue';
export function factory(prop, event) {
    if (prop === void 0) {
        prop = 'value';
    }
    if (event === void 0) {
        event = 'input';
    }
    var _a, _b;
    return Vue.extend({
        name: 'toggleable',
        model: { prop: prop, event: event },
        props: (_a = {},
            _a[prop] = { required: false },
            _a),
        data: function () {
            return {
                isActive: !!this[prop]
            };
        },
        watch: (_b = {},
            _b[prop] = function (val) {
                this.isActive = !!val;
            },
            _b.isActive = function (val) {
                !!val !== this[prop] && this.$emit(event, val);
            },
            _b)
    });
}
/* eslint-disable-next-line no-redeclare */
var Toggleable = factory();
export default Toggleable;
//# sourceMappingURL=toggleable.js.map
//# sourceMappingURL=toggleable.js.map
//# sourceMappingURL=toggleable.js.map