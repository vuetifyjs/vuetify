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
import '../../stylus/components/_chips.styl';
import mixins from '../../util/mixins';
// Components
import VIcon from '../VIcon';
// Mixins
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
import Toggleable from '../../mixins/toggleable';
/* @vue/component */
export default mixins(Colorable, Themeable, Toggleable).extend({
    name: 'v-chip',
    props: {
        close: Boolean,
        disabled: Boolean,
        label: Boolean,
        outline: Boolean,
        // Used for selects/tagging
        selected: Boolean,
        small: Boolean,
        textColor: String,
        value: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        classes: function () {
            return __assign({ 'v-chip--disabled': this.disabled, 'v-chip--selected': this.selected && !this.disabled, 'v-chip--label': this.label, 'v-chip--outline': this.outline, 'v-chip--small': this.small, 'v-chip--removable': this.close }, this.themeClasses);
        }
    },
    methods: {
        genClose: function (h) {
            var _this = this;
            var data = {
                staticClass: 'v-chip__close',
                on: {
                    click: function (e) {
                        e.stopPropagation();
                        _this.$emit('input', false);
                    }
                }
            };
            return h('div', data, [
                h(VIcon, '$vuetify.icons.delete')
            ]);
        },
        genContent: function (h) {
            return h('span', {
                staticClass: 'v-chip__content'
            }, [
                this.$slots.default,
                this.close && this.genClose(h)
            ]);
        }
    },
    render: function (h) {
        var data = this.setBackgroundColor(this.color, {
            staticClass: 'v-chip',
            'class': this.classes,
            attrs: { tabindex: this.disabled ? -1 : 0 },
            directives: [{
                    name: 'show',
                    value: this.isActive
                }],
            on: this.$listeners
        });
        var color = this.textColor || (this.outline && this.color);
        return h('span', this.setTextColor(color, data), [this.genContent(h)]);
    }
});
//# sourceMappingURL=VChip.js.map
//# sourceMappingURL=VChip.js.map
//# sourceMappingURL=VChip.js.map
//# sourceMappingURL=VChip.js.map