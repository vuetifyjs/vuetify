// Styles
import '../../stylus/components/_content.styl';
// Mixins
import SSRBootable from '../../mixins/ssr-bootable';
/* @vue/component */
export default {
    name: 'v-content',
    mixins: [SSRBootable],
    props: {
        tag: {
            type: String,
            default: 'main'
        }
    },
    computed: {
        styles: function () {
            var _a = this.$vuetify.application, bar = _a.bar, top = _a.top, right = _a.right, footer = _a.footer, insetFooter = _a.insetFooter, bottom = _a.bottom, left = _a.left;
            return {
                paddingTop: top + bar + "px",
                paddingRight: right + "px",
                paddingBottom: footer + insetFooter + bottom + "px",
                paddingLeft: left + "px"
            };
        }
    },
    render: function (h) {
        var data = {
            staticClass: 'v-content',
            style: this.styles,
            ref: 'content'
        };
        return h(this.tag, data, [
            h('div', { staticClass: 'v-content__wrap' }, this.$slots.default)
        ]);
    }
};
//# sourceMappingURL=VContent.js.map
//# sourceMappingURL=VContent.js.map
//# sourceMappingURL=VContent.js.map