// Directives
import Ripple from '../directives/ripple';
// Types
import Vue from 'vue';
export default Vue.extend({
    name: 'rippleable',
    directives: { Ripple: Ripple },
    props: {
        ripple: {
            type: [Boolean, Object],
            default: true
        }
    },
    methods: {
        genRipple: function (data) {
            if (data === void 0) {
                data = {};
            }
            if (!this.ripple)
                return null;
            data.staticClass = 'v-input--selection-controls__ripple';
            data.directives = data.directives || [];
            data.directives.push({
                name: 'ripple',
                value: { center: true }
            });
            data.on = Object.assign({
                click: this.onChange
            }, this.$listeners);
            return this.$createElement('div', data);
        },
        onChange: function () { }
    }
});
//# sourceMappingURL=rippleable.js.map
//# sourceMappingURL=rippleable.js.map
//# sourceMappingURL=rippleable.js.map