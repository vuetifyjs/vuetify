// Styles
import '../../stylus/components/_messages.styl';
// Mixins
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Colorable, Themeable).extend({
    name: 'v-messages',
    props: {
        value: {
            type: Array,
            default: function () { return ([]); }
        }
    },
    methods: {
        genChildren: function () {
            return this.$createElement('transition-group', {
                staticClass: 'v-messages__wrapper',
                attrs: {
                    name: 'message-transition',
                    tag: 'div'
                }
            }, this.value.map(this.genMessage));
        },
        genMessage: function (message, key) {
            return this.$createElement('div', {
                staticClass: 'v-messages__message',
                key: key,
                domProps: {
                    innerHTML: message
                }
            });
        }
    },
    render: function (h) {
        return h('div', this.setTextColor(this.color, {
            staticClass: 'v-messages',
            class: this.themeClasses
        }), [this.genChildren()]);
    }
});
//# sourceMappingURL=VMessages.js.map
//# sourceMappingURL=VMessages.js.map
//# sourceMappingURL=VMessages.js.map
//# sourceMappingURL=VMessages.js.map
//# sourceMappingURL=VMessages.js.map