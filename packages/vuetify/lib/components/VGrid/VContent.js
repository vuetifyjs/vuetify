// Styles
import '../../../src/stylus/components/_content.styl';
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
        styles: function styles() {
            var _$vuetify$application = this.$vuetify.application,
                bar = _$vuetify$application.bar,
                top = _$vuetify$application.top,
                right = _$vuetify$application.right,
                footer = _$vuetify$application.footer,
                insetFooter = _$vuetify$application.insetFooter,
                bottom = _$vuetify$application.bottom,
                left = _$vuetify$application.left;

            return {
                paddingTop: top + bar + 'px',
                paddingRight: right + 'px',
                paddingBottom: footer + insetFooter + bottom + 'px',
                paddingLeft: left + 'px'
            };
        }
    },
    render: function render(h) {
        var data = {
            staticClass: 'v-content',
            style: this.styles,
            ref: 'content'
        };
        return h(this.tag, data, [h('div', { staticClass: 'v-content__wrap' }, this.$slots.default)]);
    }
};
//# sourceMappingURL=VContent.js.map