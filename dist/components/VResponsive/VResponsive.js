import '../../stylus/components/_responsive.styl';
// Mixins
import Measurable from '../../mixins/measurable';
// Utils
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Measurable).extend({
    name: 'v-responsive',
    props: {
        aspectRatio: [String, Number]
    },
    computed: {
        computedAspectRatio: function () {
            return Number(this.aspectRatio);
        },
        aspectStyle: function () {
            return this.computedAspectRatio
                ? { paddingBottom: (1 / this.computedAspectRatio) * 100 + '%' }
                : undefined;
        },
        __cachedSizer: function () {
            if (!this.aspectStyle)
                return [];
            return this.$createElement('div', {
                style: this.aspectStyle,
                staticClass: 'v-responsive__sizer'
            });
        }
    },
    methods: {
        genContent: function () {
            return this.$createElement('div', {
                staticClass: 'v-responsive__content'
            }, this.$slots.default);
        }
    },
    render: function (h) {
        return h('div', {
            staticClass: 'v-responsive',
            style: this.measurableStyles,
            on: this.$listeners
        }, [
            this.__cachedSizer,
            this.genContent()
        ]);
    }
});
//# sourceMappingURL=VResponsive.js.map