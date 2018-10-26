// Style
import '../../../src/stylus/components/_parallax.styl';
// Mixins
import Translatable from '../../mixins/translatable';
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Translatable).extend({
    name: 'v-parallax',
    props: {
        alt: String,
        height: {
            type: [String, Number],
            default: 500
        },
        src: String
    },
    data: function data() {
        return {
            isBooted: false
        };
    },
    computed: {
        styles: function styles() {
            return {
                display: 'block',
                opacity: this.isBooted ? 1 : 0,
                transform: 'translate(-50%, ' + this.parallax + 'px)'
            };
        }
    },
    watch: {
        parallax: function parallax() {
            this.isBooted = true;
        }
    },
    mounted: function mounted() {
        this.init();
    },

    methods: {
        init: function init() {
            var _this = this;

            var img = this.$refs.img;
            if (!img) return;
            if (img.complete) {
                this.translate();
                this.listeners();
            } else {
                img.addEventListener('load', function () {
                    _this.translate();
                    _this.listeners();
                }, false);
            }
        },
        objHeight: function objHeight() {
            return this.$refs.img.naturalHeight;
        }
    },
    render: function render(h) {
        var imgData = {
            staticClass: 'v-parallax__image',
            style: this.styles,
            attrs: {
                src: this.src
            },
            ref: 'img'
        };
        if (this.alt) imgData.attrs.alt = this.alt;
        var container = h('div', {
            staticClass: 'v-parallax__image-container'
        }, [h('img', imgData)]);
        var content = h('div', {
            staticClass: 'v-parallax__content'
        }, this.$slots.default);
        return h('div', {
            staticClass: 'v-parallax',
            style: {
                height: this.height + 'px'
            },
            on: this.$listeners
        }, [container, content]);
    }
});
//# sourceMappingURL=VParallax.js.map