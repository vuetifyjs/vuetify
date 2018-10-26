var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import '../../../src/stylus/components/_subheaders.styl';
import Themeable from '../../mixins/themeable';
/* @vue/component */
export default {
    name: 'v-subheader',
    mixins: [Themeable],
    props: {
        inset: Boolean
    },
    render: function render(h) {
        return h('div', {
            staticClass: 'v-subheader',
            class: _extends({
                'v-subheader--inset': this.inset
            }, this.themeClasses),
            attrs: this.$attrs,
            on: this.$listeners
        }, this.$slots.default);
    }
};
//# sourceMappingURL=VSubheader.js.map