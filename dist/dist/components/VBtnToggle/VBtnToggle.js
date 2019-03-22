var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles
import '../../stylus/components/_button-toggle.styl';
// Mixins
import ButtonGroup from '../../mixins/button-group';
/* @vue/component */
export default ButtonGroup.extend({
    name: 'v-btn-toggle',
    props: {
        activeClass: {
            type: String,
            default: 'v-btn--active'
        }
    },
    computed: {
        classes: function () {
            return __assign({}, ButtonGroup.options.computed.classes.call(this), { 'v-btn-toggle': true, 'v-btn-toggle--only-child': this.selectedItems.length === 1, 'v-btn-toggle--selected': this.selectedItems.length > 0 });
        }
    }
});
//# sourceMappingURL=VBtnToggle.js.map
//# sourceMappingURL=VBtnToggle.js.map