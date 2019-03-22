import '../../stylus/components/_images.styl';
// Components
import VResponsive from '../VResponsive';
// Utils
import { consoleError, consoleWarn } from '../../util/console';
/* @vue/component */
export default VResponsive.extend({
    name: 'v-img',
    props: {
        alt: String,
        contain: Boolean,
        src: {
            type: [String, Object],
            default: ''
        },
        gradient: String,
        lazySrc: String,
        srcset: String,
        sizes: String,
        position: {
            type: String,
            default: 'center center'
        },
        transition: {
            type: [Boolean, String],
            default: 'fade-transition'
        }
    },
    data: function () {
        return {
            currentSrc: '',
            image: null,
            isLoading: true,
            calculatedAspectRatio: undefined
        };
    },
    computed: {
        computedAspectRatio: function () {
            return this.normalisedSrc.aspect;
        },
        normalisedSrc: function () {
            return typeof this.src === 'string'
                ? {
                    src: this.src,
                    srcset: this.srcset,
                    lazySrc: this.lazySrc,
                    aspect: Number(this.aspectRatio || this.calculatedAspectRatio)
                }
                : {
                    src: this.src.src,
                    srcset: this.srcset || this.src.srcset,
                    lazySrc: this.lazySrc || this.src.lazySrc,
                    aspect: Number(this.aspectRatio || this.src.aspect || this.calculatedAspectRatio)
                };
        },
        __cachedImage: function () {
            if (!(this.normalisedSrc.src || this.normalisedSrc.lazySrc))
                return [];
            var backgroundImage = [];
            var src = this.isLoading ? this.normalisedSrc.lazySrc : this.currentSrc;
            if (this.gradient)
                backgroundImage.push("linear-gradient(" + this.gradient + ")");
            if (src)
                backgroundImage.push("url(\"" + src + "\")");
            var image = this.$createElement('div', {
                staticClass: 'v-image__image',
                class: {
                    'v-image__image--preload': this.isLoading,
                    'v-image__image--contain': this.contain,
                    'v-image__image--cover': !this.contain
                },
                style: {
                    backgroundImage: backgroundImage.join(', '),
                    backgroundPosition: this.position
                },
                key: +this.isLoading
            });
            if (!this.transition)
                return image;
            return this.$createElement('transition', {
                attrs: {
                    name: this.transition,
                    mode: 'in-out'
                }
            }, [image]);
        }
    },
    watch: {
        src: function () {
            if (!this.isLoading)
                this.init();
            else
                this.loadImage();
        },
        '$vuetify.breakpoint.width': 'getSrc'
    },
    mounted: function () {
        this.init();
    },
    methods: {
        init: function () {
            if (this.normalisedSrc.lazySrc) {
                var lazyImg = new Image();
                lazyImg.src = this.normalisedSrc.lazySrc;
                this.pollForSize(lazyImg, null);
            }
            /* istanbul ignore else */
            if (this.normalisedSrc.src)
                this.loadImage();
        },
        onLoad: function () {
            this.getSrc();
            this.isLoading = false;
            this.$emit('load', this.src);
        },
        onError: function () {
            consoleError("Image load failed\n\n" +
                ("src: " + this.normalisedSrc.src), this);
            this.$emit('error', this.src);
        },
        getSrc: function () {
            /* istanbul ignore else */
            if (this.image)
                this.currentSrc = this.image.currentSrc || this.image.src;
        },
        loadImage: function () {
            var _this = this;
            var image = new Image();
            this.image = image;
            image.onload = function () {
                /* istanbul ignore if */
                if (image.decode) {
                    image.decode().catch(function (err) {
                        consoleWarn("Failed to decode image, trying to render anyway\n\n" +
                            ("src: " + _this.normalisedSrc.src) +
                            (err.message ? "\nOriginal error: " + err.message : ''), _this);
                    }).then(_this.onLoad);
                }
                else {
                    _this.onLoad();
                }
            };
            image.onerror = this.onError;
            image.src = this.normalisedSrc.src;
            this.sizes && (image.sizes = this.sizes);
            this.normalisedSrc.srcset && (image.srcset = this.normalisedSrc.srcset);
            this.aspectRatio || this.pollForSize(image);
            this.getSrc();
        },
        pollForSize: function (img, timeout) {
            var _this = this;
            if (timeout === void 0) { timeout = 100; }
            var poll = function () {
                var naturalHeight = img.naturalHeight, naturalWidth = img.naturalWidth;
                if (naturalHeight || naturalWidth) {
                    _this.calculatedAspectRatio = naturalWidth / naturalHeight;
                }
                else {
                    timeout != null && setTimeout(poll, timeout);
                }
            };
            poll();
        },
        __genPlaceholder: function () {
            if (this.$slots.placeholder) {
                var placeholder = this.isLoading
                    ? [this.$createElement('div', {
                            staticClass: 'v-image__placeholder'
                        }, this.$slots.placeholder)]
                    : [];
                if (!this.transition)
                    return placeholder[0];
                return this.$createElement('transition', {
                    attrs: { name: this.transition }
                }, placeholder);
            }
        }
    },
    render: function (h) {
        var node = VResponsive.options.render.call(this, h);
        node.data.staticClass += ' v-image';
        node.data.attrs = {
            role: this.alt ? 'img' : undefined,
            'aria-label': this.alt
        };
        node.children = [
            this.__cachedSizer,
            this.__cachedImage,
            this.__genPlaceholder(),
            this.genContent()
        ];
        return h(node.tag, node.data, node.children);
    }
});
//# sourceMappingURL=VImg.js.map