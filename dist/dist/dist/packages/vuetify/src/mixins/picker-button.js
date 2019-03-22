// Mixins
import Colorable from './colorable';
// Utilities
import mixins from '../util/mixins';
/* @vue/component */
export default mixins(Colorable).extend({
    methods: {
        genPickerButton: function (prop, value, content, readonly, staticClass) {
            var _this = this;
            if (readonly === void 0) {
                readonly = false;
            }
            if (staticClass === void 0) {
                staticClass = '';
            }
            var active = this[prop] === value;
            var click = function (event) {
                event.stopPropagation();
                _this.$emit("update:" + prop, value);
            };
            return this.$createElement('div', {
                staticClass: ("v-picker__title__btn " + staticClass).trim(),
                'class': {
                    'v-picker__title__btn--active': active,
                    'v-picker__title__btn--readonly': readonly
                },
                on: (active || readonly) ? undefined : { click: click }
            }, Array.isArray(content) ? content : [content]);
        }
    }
});
//# sourceMappingURL=picker-button.js.map
//# sourceMappingURL=picker-button.js.map
//# sourceMappingURL=picker-button.js.map