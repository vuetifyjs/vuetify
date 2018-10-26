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
    data() {
        return {
            currentSrc: '',
            image: null,
            isLoading: true,
            calculatedAspectRatio: undefined
        };
    },
    computed: {
        computedAspectRatio() {
            return this.normalisedSrc.aspect;
        },
        normalisedSrc() {
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
        __cachedImage() {
            if (!(this.normalisedSrc.src || this.normalisedSrc.lazySrc))
                return [];
            const backgroundImage = [];
            const src = this.isLoading ? this.normalisedSrc.lazySrc : this.currentSrc;
            if (this.gradient)
                backgroundImage.push(`linear-gradient(${this.gradient})`);
            if (src)
                backgroundImage.push(`url("${src}")`);
            const image = this.$createElement('div', {
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
        src() {
            if (!this.isLoading)
                this.init();
            else
                this.loadImage();
        },
        '$vuetify.breakpoint.width': 'getSrc'
    },
    beforeMount() {
        this.init();
    },
    methods: {
        init() {
            if (this.normalisedSrc.lazySrc) {
                const lazyImg = new Image();
                lazyImg.src = this.normalisedSrc.lazySrc;
                this.pollForSize(lazyImg, null);
            }
            /* istanbul ignore else */
            if (this.normalisedSrc.src)
                this.loadImage();
        },
        onLoad() {
            this.getSrc();
            this.isLoading = false;
            this.$emit('load', this.src);
        },
        onError() {
            consoleError(`Image load failed\n\n` +
                `src: ${this.normalisedSrc.src}`, this);
            this.$emit('error', this.src);
        },
        getSrc() {
            /* istanbul ignore else */
            if (this.image)
                this.currentSrc = this.image.currentSrc || this.image.src;
        },
        loadImage() {
            const image = new Image();
            this.image = image;
            image.onload = () => {
                /* istanbul ignore if */
                if (image.decode) {
                    image.decode().catch((err) => {
                        consoleWarn(`Failed to decode image, trying to render anyway\n\n` +
                            `src: ${this.normalisedSrc.src}` +
                            (err.message ? `\nOriginal error: ${err.message}` : ''), this);
                    }).then(this.onLoad);
                }
                else {
                    this.onLoad();
                }
            };
            image.onerror = this.onError;
            image.src = this.normalisedSrc.src;
            this.sizes && (image.sizes = this.sizes);
            this.normalisedSrc.srcset && (image.srcset = this.normalisedSrc.srcset);
            this.aspectRatio || this.pollForSize(image);
            this.getSrc();
        },
        pollForSize(img, timeout = 100) {
            const poll = () => {
                const { naturalHeight, naturalWidth } = img;
                if (naturalHeight || naturalWidth) {
                    this.calculatedAspectRatio = naturalWidth / naturalHeight;
                }
                else {
                    timeout != null && setTimeout(poll, timeout);
                }
            };
            poll();
        },
        __genPlaceholder() {
            if (this.$slots.placeholder) {
                const placeholder = this.isLoading
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
    render(h) {
        const node = VResponsive.options.render.call(this, h);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkltZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZJbWcvVkltZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHNDQUFzQyxDQUFBO0FBTTdDLGFBQWE7QUFDYixPQUFPLFdBQVcsTUFBTSxnQkFBZ0IsQ0FBQTtBQUV4QyxRQUFRO0FBQ1IsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQVU5RCxvQkFBb0I7QUFDcEIsZUFBZSxXQUFXLENBQUMsTUFBTSxDQUFDO0lBQ2hDLElBQUksRUFBRSxPQUFPO0lBRWIsS0FBSyxFQUFFO1FBQ0wsR0FBRyxFQUFFLE1BQU07UUFDWCxPQUFPLEVBQUUsT0FBTztRQUNoQixHQUFHLEVBQUU7WUFDSCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxFQUFFO1NBQ3lCO1FBQ3RDLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLE9BQU8sRUFBRSxNQUFNO1FBQ2YsTUFBTSxFQUFFLE1BQU07UUFDZCxLQUFLLEVBQUUsTUFBTTtRQUNiLFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGVBQWU7U0FDekI7UUFDRCxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxpQkFBaUI7U0FDM0I7S0FDRjtJQUVELElBQUk7UUFDRixPQUFPO1lBQ0wsVUFBVSxFQUFFLEVBQUU7WUFDZCxLQUFLLEVBQUUsSUFBK0I7WUFDdEMsU0FBUyxFQUFFLElBQUk7WUFDZixxQkFBcUIsRUFBRSxTQUErQjtTQUN2RCxDQUFBO0lBQ0gsQ0FBQztJQUVELFFBQVEsRUFBRTtRQUNSLG1CQUFtQjtZQUNqQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFBO1FBQ2xDLENBQUM7UUFDRCxhQUFhO1lB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WUFDZCxJQUFJLENBQUMsYUFBYTtZQUNsQixJQUFJLENBQUMsYUFBYTtZQUNsQixJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFVBQVUsRUFBRTtTQUNsQixDQUFBO1FBRUQsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUM5QyxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9faW1hZ2VzLnN0eWwnXG5cbi8vIFR5cGVzXG5pbXBvcnQgeyBWTm9kZSB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IFByb3BWYWxpZGF0b3IgfSBmcm9tICd2dWUvdHlwZXMvb3B0aW9ucydcblxuLy8gQ29tcG9uZW50c1xuaW1wb3J0IFZSZXNwb25zaXZlIGZyb20gJy4uL1ZSZXNwb25zaXZlJ1xuXG4vLyBVdGlsc1xuaW1wb3J0IHsgY29uc29sZUVycm9yLCBjb25zb2xlV2FybiB9IGZyb20gJy4uLy4uL3V0aWwvY29uc29sZSdcblxuLy8gbm90IGludGVuZGVkIGZvciBwdWJsaWMgdXNlLCB0aGlzIGlzIHBhc3NlZCBpbiBieSB2dWV0aWZ5LWxvYWRlclxuZXhwb3J0IGludGVyZmFjZSBzcmNPYmplY3Qge1xuICBzcmM6IHN0cmluZ1xuICBzcmNzZXQ/OiBzdHJpbmdcbiAgbGF6eVNyYzogc3RyaW5nXG4gIGFzcGVjdDogbnVtYmVyXG59XG5cbi8qIEB2dWUvY29tcG9uZW50ICovXG5leHBvcnQgZGVmYXVsdCBWUmVzcG9uc2l2ZS5leHRlbmQoe1xuICBuYW1lOiAndi1pbWcnLFxuXG4gIHByb3BzOiB7XG4gICAgYWx0OiBTdHJpbmcsXG4gICAgY29udGFpbjogQm9vbGVhbixcbiAgICBzcmM6IHtcbiAgICAgIHR5cGU6IFtTdHJpbmcsIE9iamVjdF0sXG4gICAgICBkZWZhdWx0OiAnJ1xuICAgIH0gYXMgUHJvcFZhbGlkYXRvcjxzdHJpbmcgfCBzcmNPYmplY3Q+LFxuICAgIGdyYWRpZW50OiBTdHJpbmcsXG4gICAgbGF6eVNyYzogU3RyaW5nLFxuICAgIHNyY3NldDogU3RyaW5nLFxuICAgIHNpemVzOiBTdHJpbmcsXG4gICAgcG9zaXRpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdjZW50ZXIgY2VudGVyJ1xuICAgIH0sXG4gICAgdHJhbnNpdGlvbjoge1xuICAgICAgdHlwZTogW0Jvb2xlYW4sIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiAnZmFkZS10cmFuc2l0aW9uJ1xuICAgIH1cbiAgfSxcblxuICBkYXRhICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudFNyYzogJycsIC8vIFNldCBmcm9tIHNyY3NldFxuICAgICAgaW1hZ2U6IG51bGwgYXMgSFRNTEltYWdlRWxlbWVudCB8IG51bGwsXG4gICAgICBpc0xvYWRpbmc6IHRydWUsXG4gICAgICBjYWxjdWxhdGVkQXNwZWN0UmF0aW86IHVuZGVmaW5lZCBhcyBudW1iZXIgfCB1bmRlZmluZWRcbiAgICB9XG4gIH0sXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjb21wdXRlZEFzcGVjdFJhdGlvICgpOiBudW1iZXIge1xuICAgICAgcmV0dXJuIHRoaXMubm9ybWFsaXNlZFNyYy5hc3BlY3RcbiAgICB9LFxuICAgIG5vcm1hbGlzZWRTcmMgKCk6IHNyY09iamVjdCB7XG4gICAgICByZXR1cm4gdHlwZW9mIHRoaXMuc3JjID09PSAnc3RyaW5nJ1xuICAgICAgICA/IHtcbiAgICAgICAgICBzcmM6IHRoaXMuc3JjLFxuICAgICAgICAgIHNyY3NldDogdGhpcy5zcmNzZXQsXG4gICAgICAgICAgbGF6eVNyYzogdGhpcy5sYXp5U3JjLFxuICAgICAgICAgIGFzcGVjdDogTnVtYmVyKHRoaXMuYXNwZWN0UmF0aW8gfHwgdGhpcy5jYWxjdWxhdGVkQXNwZWN0UmF0aW8pXG4gICAgICAgIH1cbiAgICAgICAgOiB7XG4gICAgICAgICAgc3JjOiB0aGlzLnNyYy5zcmMsXG4gICAgICAgICAgc3Jjc2V0OiB0aGlzLnNyY3NldCB8fCB0aGlzLnNyYy5zcmNzZXQsXG4gICAgICAgICAgbGF6eVNyYzogdGhpcy5sYXp5U3JjIHx8IHRoaXMuc3JjLmxhenlTcmMsXG4gICAgICAgICAgYXNwZWN0OiBOdW1iZXIodGhpcy5hc3BlY3RSYXRpbyB8fCB0aGlzLnNyYy5hc3BlY3QgfHwgdGhpcy5jYWxjdWxhdGVkQXNwZWN0UmF0aW8pXG4gICAgICAgIH1cbiAgICB9LFxuICAgIF9fY2FjaGVkSW1hZ2UgKCk6IFZOb2RlIHwgbmV2ZXJbXSB7XG4gICAgICBpZiAoISh0aGlzLm5vcm1hbGlzZWRTcmMuc3JjIHx8IHRoaXMubm9ybWFsaXNlZFNyYy5sYXp5U3JjKSkgcmV0dXJuIFtdXG5cbiAgICAgIGNvbnN0IGJhY2tncm91bmRJbWFnZTogc3RyaW5nW10gPSBbXVxuICAgICAgY29uc3Qgc3JjID0gdGhpcy5pc0xvYWRpbmcgPyB0aGlzLm5vcm1hbGlzZWRTcmMubGF6eVNyYyA6IHRoaXMuY3VycmVudFNyY1xuXG4gICAgICBpZiAodGhpcy5ncmFkaWVudCkgYmFja2dyb3VuZEltYWdlLnB1c2goYGxpbmVhci1ncmFkaWVudCgke3RoaXMuZ3JhZGllbnR9KWApXG4gICAgICBpZiAoc3JjKSBiYWNrZ3JvdW5kSW1hZ2UucHVzaChgdXJsKFwiJHtzcmN9XCIpYClcblxuICAgICAgY29uc3QgaW1hZ2UgPSB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1pbWFnZV9faW1hZ2UnLFxuICAgICAgICBjbGFzczoge1xuICAgICAgICAgICd2LWltYWdlX19pbWFnZS0tcHJlbG9hZCc6IHRoaXMuaXNMb2FkaW5nLFxuICAgICAgICAgICd2LWltYWdlX19pbWFnZS0tY29udGFpbic6IHRoaXMuY29udGFpbixcbiAgICAgICAgICAndi1pbWFnZV9faW1hZ2UtLWNvdmVyJzogIXRoaXMuY29udGFpblxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYmFja2dyb3VuZEltYWdlLmpvaW4oJywgJyksXG4gICAgICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiB0aGlzLnBvc2l0aW9uXG4gICAgICAgIH0sXG4gICAgICAgIGtleTogK3RoaXMuaXNMb2FkaW5nXG4gICAgICB9KVxuXG4gICAgICBpZiAoIXRoaXMudHJhbnNpdGlvbikgcmV0dXJuIGltYWdlXG5cbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCd0cmFuc2l0aW9uJywge1xuICAgICAgICBhdHRyczoge1xuICAgICAgICAgIG5hbWU6IHRoaXMudHJhbnNpdGlvbixcbiAgICAgICAgICBtb2RlOiAnaW4tb3V0J1xuICAgICAgICB9XG4gICAgICB9LCBbaW1hZ2VdKVxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIHNyYyAoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNMb2FkaW5nKSB0aGlzLmluaXQoKVxuICAgICAgZWxzZSB0aGlzLmxvYWRJbWFnZSgpXG4gICAgfSxcbiAgICAnJHZ1ZXRpZnkuYnJlYWtwb2ludC53aWR0aCc6ICdnZXRTcmMnXG4gIH0sXG5cbiAgYmVmb3JlTW91bnQgKCkge1xuICAgIHRoaXMuaW5pdCgpXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGluaXQgKCkge1xuICAgICAgaWYgKHRoaXMubm9ybWFsaXNlZFNyYy5sYXp5U3JjKSB7XG4gICAgICAgIGNvbnN0IGxhenlJbWcgPSBuZXcgSW1hZ2UoKVxuICAgICAgICBsYXp5SW1nLnNyYyA9IHRoaXMubm9ybWFsaXNlZFNyYy5sYXp5U3JjXG4gICAgICAgIHRoaXMucG9sbEZvclNpemUobGF6eUltZywgbnVsbClcbiAgICAgIH1cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICBpZiAodGhpcy5ub3JtYWxpc2VkU3JjLnNyYykgdGhpcy5sb2FkSW1hZ2UoKVxuICAgIH0sXG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuZ2V0U3JjKClcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuJGVtaXQoJ2xvYWQnLCB0aGlzLnNyYylcbiAgICB9LFxuICAgIG9uRXJyb3IgKCkge1xuICAgICAgY29uc29sZUVycm9yKFxuICAgICAgICBgSW1hZ2UgbG9hZCBmYWlsZWRcXG5cXG5gICtcbiAgICAgICAgYHNyYzogJHt0aGlzLm5vcm1hbGlzZWRTcmMuc3JjfWAsXG4gICAgICAgIHRoaXNcbiAgICAgIClcbiAgICAgIHRoaXMuJGVtaXQoJ2Vycm9yJywgdGhpcy5zcmMpXG4gICAgfSxcbiAgICBnZXRTcmMgKCkge1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIGlmICh0aGlzLmltYWdlKSB0aGlzLmN1cnJlbnRTcmMgPSB0aGlzLmltYWdlLmN1cnJlbnRTcmMgfHwgdGhpcy5pbWFnZS5zcmNcbiAgICB9LFxuICAgIGxvYWRJbWFnZSAoKSB7XG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpXG4gICAgICB0aGlzLmltYWdlID0gaW1hZ2VcblxuICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKGltYWdlLmRlY29kZSkge1xuICAgICAgICAgIGltYWdlLmRlY29kZSgpLmNhdGNoKChlcnI6IERPTUV4Y2VwdGlvbikgPT4ge1xuICAgICAgICAgICAgY29uc29sZVdhcm4oXG4gICAgICAgICAgICAgIGBGYWlsZWQgdG8gZGVjb2RlIGltYWdlLCB0cnlpbmcgdG8gcmVuZGVyIGFueXdheVxcblxcbmAgK1xuICAgICAgICAgICAgICBgc3JjOiAke3RoaXMubm9ybWFsaXNlZFNyYy5zcmN9YCArXG4gICAgICAgICAgICAgIChlcnIubWVzc2FnZSA/IGBcXG5PcmlnaW5hbCBlcnJvcjogJHtlcnIubWVzc2FnZX1gIDogJycpLFxuICAgICAgICAgICAgICB0aGlzXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSkudGhlbih0aGlzLm9uTG9hZClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9uTG9hZCgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGltYWdlLm9uZXJyb3IgPSB0aGlzLm9uRXJyb3JcblxuICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5ub3JtYWxpc2VkU3JjLnNyY1xuICAgICAgdGhpcy5zaXplcyAmJiAoaW1hZ2Uuc2l6ZXMgPSB0aGlzLnNpemVzKVxuICAgICAgdGhpcy5ub3JtYWxpc2VkU3JjLnNyY3NldCAmJiAoaW1hZ2Uuc3Jjc2V0ID0gdGhpcy5ub3JtYWxpc2VkU3JjLnNyY3NldClcblxuICAgICAgdGhpcy5hc3BlY3RSYXRpbyB8fCB0aGlzLnBvbGxGb3JTaXplKGltYWdlKVxuICAgICAgdGhpcy5nZXRTcmMoKVxuICAgIH0sXG4gICAgcG9sbEZvclNpemUgKGltZzogSFRNTEltYWdlRWxlbWVudCwgdGltZW91dDogbnVtYmVyIHwgbnVsbCA9IDEwMCkge1xuICAgICAgY29uc3QgcG9sbCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBuYXR1cmFsSGVpZ2h0LCBuYXR1cmFsV2lkdGggfSA9IGltZ1xuXG4gICAgICAgIGlmIChuYXR1cmFsSGVpZ2h0IHx8IG5hdHVyYWxXaWR0aCkge1xuICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZEFzcGVjdFJhdGlvID0gbmF0dXJhbFdpZHRoIC8gbmF0dXJhbEhlaWdodFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRpbWVvdXQgIT0gbnVsbCAmJiBzZXRUaW1lb3V0KHBvbGwsIHRpbWVvdXQpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcG9sbCgpXG4gICAgfSxcbiAgICBfX2dlblBsYWNlaG9sZGVyICgpOiBWTm9kZSB8IHZvaWQge1xuICAgICAgaWYgKHRoaXMuJHNsb3RzLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gdGhpcy5pc0xvYWRpbmdcbiAgICAgICAgICA/IFt0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogJ3YtaW1hZ2VfX3BsYWNlaG9sZGVyJ1xuICAgICAgICAgIH0sIHRoaXMuJHNsb3RzLnBsYWNlaG9sZGVyKV1cbiAgICAgICAgICA6IFtdXG5cbiAgICAgICAgaWYgKCF0aGlzLnRyYW5zaXRpb24pIHJldHVybiBwbGFjZWhvbGRlclswXVxuXG4gICAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCd0cmFuc2l0aW9uJywge1xuICAgICAgICAgIGF0dHJzOiB7IG5hbWU6IHRoaXMudHJhbnNpdGlvbiB9XG4gICAgICAgIH0sIHBsYWNlaG9sZGVyKVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICByZW5kZXIgKGgpOiBWTm9kZSB7XG4gICAgY29uc3Qgbm9kZSA9IFZSZXNwb25zaXZlLm9wdGlvbnMucmVuZGVyLmNhbGwodGhpcywgaClcblxuICAgIG5vZGUuZGF0YS5zdGF0aWNDbGFzcyArPSAnIHYtaW1hZ2UnXG5cbiAgICBub2RlLmRhdGEuYXR0cnMgPSB7XG4gICAgICByb2xlOiB0aGlzLmFsdCA/ICdpbWcnIDogdW5kZWZpbmVkLFxuICAgICAgJ2FyaWEtbGFiZWwnOiB0aGlzLmFsdFxuICAgIH1cblxuICAgIG5vZGUuY2hpbGRyZW4gPSBbXG4gICAgICB0aGlzLl9fY2FjaGVkU2l6ZXIsXG4gICAgICB0aGlzLl9fY2FjaGVkSW1hZ2UsXG4gICAgICB0aGlzLl9fZ2VuUGxhY2Vob2xkZXIoKSxcbiAgICAgIHRoaXMuZ2VuQ29udGVudCgpXG4gICAgXVxuXG4gICAgcmV0dXJuIGgobm9kZS50YWcsIG5vZGUuZGF0YSwgbm9kZS5jaGlsZHJlbilcbiAgfVxufSlcbiJdfQ==