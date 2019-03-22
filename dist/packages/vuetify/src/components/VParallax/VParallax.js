// Style
import '../../stylus/components/_parallax.styl';
// Mixins
import Translatable from '../../mixins/translatable';
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Translatable).extend({
    name: 'v-parallax',
    props: {
        alt: {
            type: String,
            default: ''
        },
        height: {
            type: [String, Number],
            default: 500
        },
        src: String
    },
    data: function () { return ({
        isBooted: false
    }); },
    computed: {
        styles: function () {
            return {
                display: 'block',
                opacity: this.isBooted ? 1 : 0,
                transform: "translate(-50%, " + this.parallax + "px)"
            };
        }
    },
    watch: {
        parallax: function () {
            this.isBooted = true;
        }
    },
    mounted: function () {
        this.init();
    },
    methods: {
        init: function () {
            var _this = this;
            var img = this.$refs.img;
            if (!img)
                return;
            if (img.complete) {
                this.translate();
                this.listeners();
            }
            else {
                img.addEventListener('load', function () {
                    _this.translate();
                    _this.listeners();
                }, false);
            }
        },
        objHeight: function () {
            return this.$refs.img.naturalHeight;
        }
    },
    render: function (h) {
        var imgData = {
            staticClass: 'v-parallax__image',
            style: this.styles,
            attrs: {
                src: this.src,
                alt: this.alt
            },
            ref: 'img'
        };
        var container = h('div', {
            staticClass: 'v-parallax__image-container'
        }, [
            h('img', imgData)
        ]);
        var content = h('div', {
            staticClass: 'v-parallax__content'
        }, this.$slots.default);
        return h('div', {
            staticClass: 'v-parallax',
            style: {
                height: this.height + "px"
            },
            on: this.$listeners
        }, [container, content]);
    }
});
//# sourceMappingURL=VParallax.js.map