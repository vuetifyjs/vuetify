var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Styles
import '../../../src/stylus/components/_button-toggle.styl';
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
        classes: function classes() {
            return _extends({}, ButtonGroup.options.computed.classes.call(this), {
                'v-btn-toggle': true,
                'v-btn-toggle--only-child': this.selectedItems.length === 1,
                'v-btn-toggle--selected': this.selectedItems.length > 0
            });
        }
    }
});
//# sourceMappingURL=VBtnToggle.js.map