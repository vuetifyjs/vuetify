import '../../stylus/components/_images.styl';
// Components
import VResponsive from '../VResponsive';
// Utils
import { consoleError } from '../../util/console';
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
        lazySrc: String,
        srcset: String,
        sizes: String,
        position: {
            type: String,
            default: 'center center'
        },
        transition: {
            type: String,
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
            const src = this.isLoading ? this.normalisedSrc.lazySrc : this.currentSrc;
            return this.$createElement('transition', {
                attrs: {
                    name: this.transition,
                    mode: 'in-out'
                }
            }, [
                this.$createElement('div', {
                    staticClass: 'v-image__image',
                    class: {
                        'v-image__image--preload': this.isLoading,
                        'v-image__image--contain': this.contain,
                        'v-image__image--cover': !this.contain
                    },
                    style: {
                        backgroundImage: src ? `url("${src}")` : undefined,
                        backgroundPosition: this.position
                    },
                    key: +this.isLoading
                })
            ]);
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
            consoleError('Image load failed\n\nsrc: ' + this.normalisedSrc.src, this);
            this.$emit('error', this.src);
        },
        getSrc() {
            /* istanbul ignore else */
            if (this.image)
                this.currentSrc = this.image.currentSrc;
        },
        loadImage() {
            const image = new Image();
            this.image = image;
            image.onload = () => {
                /* istanbul ignore if */
                if (image.decode) {
                    image.decode().then(this.onLoad);
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
            this.currentSrc = image.currentSrc;
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
                const placeholder = this.$createElement('div', {
                    staticClass: 'v-image__placeholder'
                }, this.$slots.placeholder);
                return this.$createElement('transition', {
                    attrs: { name: this.transition }
                }, this.isLoading ? [placeholder] : []);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkltZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZJbWcvVkltZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLHNDQUFzQyxDQUFBO0FBTTdDLGFBQWE7QUFDYixPQUFPLFdBQVcsTUFBTSxnQkFBZ0IsQ0FBQTtBQUV4QyxRQUFRO0FBQ1IsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBVWpELG9CQUFvQjtBQUNwQixlQUFlLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDaEMsSUFBSSxFQUFFLE9BQU87SUFFYixLQUFLLEVBQUU7UUFDTCxHQUFHLEVBQUUsTUFBTTtRQUNYLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLEdBQUcsRUFBRTtZQUNILElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLEVBQUU7U0FDeUI7UUFDdEMsT0FBTyxFQUFFLE1BQU07UUFDZixNQUFNLEVBQUUsTUFBTTtRQUNkLEtBQUssRUFBRSxNQUFNO1FBQ2IsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsZUFBZTtTQUN6QjtRQUNELFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGlCQUFpQjtTQUMzQjtLQUNGO0lBRUQsSUFBSTtRQUNGLE9BQU87WUFDTCxVQUFVLEVBQUUsRUFBRTtZQUNkLEtBQUssRUFBRSxJQUErQjtZQUN0QyxTQUFTLEVBQUUsSUFBSTtZQUNmLHFCQUFxQixFQUFFLFNBQStCO1NBQ3ZELENBQUE7SUFDSCxDQUFDO0lBRUQsUUFBUSxFQUFFO1FBQ1IsbUJBQW1CO1lBQ2pCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUE7UUFDbEMsQ0FBQztRQUNELGFBQWE7WUFDWCxPQUFPLE9BQU8sSUFBSSxDQUFDLEdBQUcsS0FBSyxRQUFRO2dCQUNqQyxDQUFDLENB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LE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUVyRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxVQUFVLENBQUE7UUFFbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDaEIsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUztZQUNsQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEdBQUc7U0FDdkIsQ0FBQTtRQUVELElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDZCxJQUFJLENBQUMsYUFBYTtZQUNsQixJQUFJLENBQUMsYUFBYTtZQUNsQixJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFVBQVUsRUFBRTtTQUNsQixDQUFBO1FBRUQsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUM5QyxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9faW1hZ2VzLnN0eWwnXG5cbi8vIFR5cGVzXG5pbXBvcnQgeyBWTm9kZSB9IGZyb20gJ3Z1ZSdcbmltcG9ydCB7IFByb3BWYWxpZGF0b3IgfSBmcm9tICd2dWUvdHlwZXMvb3B0aW9ucydcblxuLy8gQ29tcG9uZW50c1xuaW1wb3J0IFZSZXNwb25zaXZlIGZyb20gJy4uL1ZSZXNwb25zaXZlJ1xuXG4vLyBVdGlsc1xuaW1wb3J0IHsgY29uc29sZUVycm9yIH0gZnJvbSAnLi4vLi4vdXRpbC9jb25zb2xlJ1xuXG4vLyBub3QgaW50ZW5kZWQgZm9yIHB1YmxpYyB1c2UsIHRoaXMgaXMgcGFzc2VkIGluIGJ5IHZ1ZXRpZnktbG9hZGVyXG5leHBvcnQgaW50ZXJmYWNlIHNyY09iamVjdCB7XG4gIHNyYzogc3RyaW5nXG4gIHNyY3NldD86IHN0cmluZ1xuICBsYXp5U3JjOiBzdHJpbmdcbiAgYXNwZWN0OiBudW1iZXJcbn1cblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IFZSZXNwb25zaXZlLmV4dGVuZCh7XG4gIG5hbWU6ICd2LWltZycsXG5cbiAgcHJvcHM6IHtcbiAgICBhbHQ6IFN0cmluZyxcbiAgICBjb250YWluOiBCb29sZWFuLFxuICAgIHNyYzoge1xuICAgICAgdHlwZTogW1N0cmluZywgT2JqZWN0XSxcbiAgICAgIGRlZmF1bHQ6ICcnXG4gICAgfSBhcyBQcm9wVmFsaWRhdG9yPHN0cmluZyB8IHNyY09iamVjdD4sXG4gICAgbGF6eVNyYzogU3RyaW5nLFxuICAgIHNyY3NldDogU3RyaW5nLFxuICAgIHNpemVzOiBTdHJpbmcsXG4gICAgcG9zaXRpb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdjZW50ZXIgY2VudGVyJ1xuICAgIH0sXG4gICAgdHJhbnNpdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2ZhZGUtdHJhbnNpdGlvbidcbiAgICB9XG4gIH0sXG5cbiAgZGF0YSAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnRTcmM6ICcnLCAvLyBTZXQgZnJvbSBzcmNzZXRcbiAgICAgIGltYWdlOiBudWxsIGFzIEhUTUxJbWFnZUVsZW1lbnQgfCBudWxsLFxuICAgICAgaXNMb2FkaW5nOiB0cnVlLFxuICAgICAgY2FsY3VsYXRlZEFzcGVjdFJhdGlvOiB1bmRlZmluZWQgYXMgbnVtYmVyIHwgdW5kZWZpbmVkXG4gICAgfVxuICB9LFxuXG4gIGNvbXB1dGVkOiB7XG4gICAgY29tcHV0ZWRBc3BlY3RSYXRpbyAoKTogbnVtYmVyIHtcbiAgICAgIHJldHVybiB0aGlzLm5vcm1hbGlzZWRTcmMuYXNwZWN0XG4gICAgfSxcbiAgICBub3JtYWxpc2VkU3JjICgpOiBzcmNPYmplY3Qge1xuICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLnNyYyA9PT0gJ3N0cmluZydcbiAgICAgICAgPyB7XG4gICAgICAgICAgc3JjOiB0aGlzLnNyYyxcbiAgICAgICAgICBzcmNzZXQ6IHRoaXMuc3Jjc2V0LFxuICAgICAgICAgIGxhenlTcmM6IHRoaXMubGF6eVNyYyxcbiAgICAgICAgICBhc3BlY3Q6IE51bWJlcih0aGlzLmFzcGVjdFJhdGlvIHx8IHRoaXMuY2FsY3VsYXRlZEFzcGVjdFJhdGlvKVxuICAgICAgICB9XG4gICAgICAgIDoge1xuICAgICAgICAgIHNyYzogdGhpcy5zcmMuc3JjLFxuICAgICAgICAgIHNyY3NldDogdGhpcy5zcmNzZXQgfHwgdGhpcy5zcmMuc3Jjc2V0LFxuICAgICAgICAgIGxhenlTcmM6IHRoaXMubGF6eVNyYyB8fCB0aGlzLnNyYy5sYXp5U3JjLFxuICAgICAgICAgIGFzcGVjdDogTnVtYmVyKHRoaXMuYXNwZWN0UmF0aW8gfHwgdGhpcy5zcmMuYXNwZWN0IHx8IHRoaXMuY2FsY3VsYXRlZEFzcGVjdFJhdGlvKVxuICAgICAgICB9XG4gICAgfSxcbiAgICBfX2NhY2hlZEltYWdlICgpOiBWTm9kZSB8IG5ldmVyW10ge1xuICAgICAgaWYgKCEodGhpcy5ub3JtYWxpc2VkU3JjLnNyYyB8fCB0aGlzLm5vcm1hbGlzZWRTcmMubGF6eVNyYykpIHJldHVybiBbXVxuXG4gICAgICBjb25zdCBzcmMgPSB0aGlzLmlzTG9hZGluZyA/IHRoaXMubm9ybWFsaXNlZFNyYy5sYXp5U3JjIDogdGhpcy5jdXJyZW50U3JjXG5cbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCd0cmFuc2l0aW9uJywge1xuICAgICAgICBhdHRyczoge1xuICAgICAgICAgIG5hbWU6IHRoaXMudHJhbnNpdGlvbixcbiAgICAgICAgICBtb2RlOiAnaW4tb3V0J1xuICAgICAgICB9XG4gICAgICB9LCBbXG4gICAgICAgIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ3YtaW1hZ2VfX2ltYWdlJyxcbiAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgJ3YtaW1hZ2VfX2ltYWdlLS1wcmVsb2FkJzogdGhpcy5pc0xvYWRpbmcsXG4gICAgICAgICAgICAndi1pbWFnZV9faW1hZ2UtLWNvbnRhaW4nOiB0aGlzLmNvbnRhaW4sXG4gICAgICAgICAgICAndi1pbWFnZV9faW1hZ2UtLWNvdmVyJzogIXRoaXMuY29udGFpblxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogc3JjID8gYHVybChcIiR7c3JjfVwiKWAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kUG9zaXRpb246IHRoaXMucG9zaXRpb25cbiAgICAgICAgICB9LFxuICAgICAgICAgIGtleTogK3RoaXMuaXNMb2FkaW5nXG4gICAgICAgIH0pXG4gICAgICBdKVxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIHNyYyAoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNMb2FkaW5nKSB0aGlzLmluaXQoKVxuICAgICAgZWxzZSB0aGlzLmxvYWRJbWFnZSgpXG4gICAgfSxcbiAgICAnJHZ1ZXRpZnkuYnJlYWtwb2ludC53aWR0aCc6ICdnZXRTcmMnXG4gIH0sXG5cbiAgYmVmb3JlTW91bnQgKCkge1xuICAgIHRoaXMuaW5pdCgpXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGluaXQgKCkge1xuICAgICAgaWYgKHRoaXMubm9ybWFsaXNlZFNyYy5sYXp5U3JjKSB7XG4gICAgICAgIGNvbnN0IGxhenlJbWcgPSBuZXcgSW1hZ2UoKVxuICAgICAgICBsYXp5SW1nLnNyYyA9IHRoaXMubm9ybWFsaXNlZFNyYy5sYXp5U3JjXG4gICAgICAgIHRoaXMucG9sbEZvclNpemUobGF6eUltZywgbnVsbClcbiAgICAgIH1cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICBpZiAodGhpcy5ub3JtYWxpc2VkU3JjLnNyYykgdGhpcy5sb2FkSW1hZ2UoKVxuICAgIH0sXG4gICAgb25Mb2FkICgpIHtcbiAgICAgIHRoaXMuZ2V0U3JjKClcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuJGVtaXQoJ2xvYWQnLCB0aGlzLnNyYylcbiAgICB9LFxuICAgIG9uRXJyb3IgKCkge1xuICAgICAgY29uc29sZUVycm9yKCdJbWFnZSBsb2FkIGZhaWxlZFxcblxcbnNyYzogJyArIHRoaXMubm9ybWFsaXNlZFNyYy5zcmMsIHRoaXMpXG4gICAgICB0aGlzLiRlbWl0KCdlcnJvcicsIHRoaXMuc3JjKVxuICAgIH0sXG4gICAgZ2V0U3JjICgpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICBpZiAodGhpcy5pbWFnZSkgdGhpcy5jdXJyZW50U3JjID0gdGhpcy5pbWFnZS5jdXJyZW50U3JjXG4gICAgfSxcbiAgICBsb2FkSW1hZ2UgKCkge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKVxuICAgICAgdGhpcy5pbWFnZSA9IGltYWdlXG5cbiAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmIChpbWFnZS5kZWNvZGUpIHtcbiAgICAgICAgICBpbWFnZS5kZWNvZGUoKS50aGVuKHRoaXMub25Mb2FkKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub25Mb2FkKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaW1hZ2Uub25lcnJvciA9IHRoaXMub25FcnJvclxuXG4gICAgICBpbWFnZS5zcmMgPSB0aGlzLm5vcm1hbGlzZWRTcmMuc3JjXG4gICAgICB0aGlzLnNpemVzICYmIChpbWFnZS5zaXplcyA9IHRoaXMuc2l6ZXMpXG4gICAgICB0aGlzLm5vcm1hbGlzZWRTcmMuc3Jjc2V0ICYmIChpbWFnZS5zcmNzZXQgPSB0aGlzLm5vcm1hbGlzZWRTcmMuc3Jjc2V0KVxuXG4gICAgICB0aGlzLmFzcGVjdFJhdGlvIHx8IHRoaXMucG9sbEZvclNpemUoaW1hZ2UpXG4gICAgICB0aGlzLmN1cnJlbnRTcmMgPSBpbWFnZS5jdXJyZW50U3JjXG4gICAgfSxcbiAgICBwb2xsRm9yU2l6ZSAoaW1nOiBIVE1MSW1hZ2VFbGVtZW50LCB0aW1lb3V0OiBudW1iZXIgfCBudWxsID0gMTAwKSB7XG4gICAgICBjb25zdCBwb2xsID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7IG5hdHVyYWxIZWlnaHQsIG5hdHVyYWxXaWR0aCB9ID0gaW1nXG5cbiAgICAgICAgaWYgKG5hdHVyYWxIZWlnaHQgfHwgbmF0dXJhbFdpZHRoKSB7XG4gICAgICAgICAgdGhpcy5jYWxjdWxhdGVkQXNwZWN0UmF0aW8gPSBuYXR1cmFsV2lkdGggLyBuYXR1cmFsSGVpZ2h0XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGltZW91dCAhPSBudWxsICYmIHNldFRpbWVvdXQocG9sbCwgdGltZW91dClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBwb2xsKClcbiAgICB9LFxuICAgIF9fZ2VuUGxhY2Vob2xkZXIgKCk6IFZOb2RlIHwgdm9pZCB7XG4gICAgICBpZiAodGhpcy4kc2xvdHMucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICd2LWltYWdlX19wbGFjZWhvbGRlcidcbiAgICAgICAgfSwgdGhpcy4kc2xvdHMucGxhY2Vob2xkZXIpXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ3RyYW5zaXRpb24nLCB7XG4gICAgICAgICAgYXR0cnM6IHsgbmFtZTogdGhpcy50cmFuc2l0aW9uIH1cbiAgICAgICAgfSwgdGhpcy5pc0xvYWRpbmcgPyBbcGxhY2Vob2xkZXJdIDogW10pXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHJlbmRlciAoaCk6IFZOb2RlIHtcbiAgICBjb25zdCBub2RlID0gVlJlc3BvbnNpdmUub3B0aW9ucy5yZW5kZXIuY2FsbCh0aGlzLCBoKVxuXG4gICAgbm9kZS5kYXRhLnN0YXRpY0NsYXNzICs9ICcgdi1pbWFnZSdcblxuICAgIG5vZGUuZGF0YS5hdHRycyA9IHtcbiAgICAgIHJvbGU6IHRoaXMuYWx0ID8gJ2ltZycgOiB1bmRlZmluZWQsXG4gICAgICAnYXJpYS1sYWJlbCc6IHRoaXMuYWx0XG4gICAgfVxuXG4gICAgbm9kZS5jaGlsZHJlbiA9IFtcbiAgICAgIHRoaXMuX19jYWNoZWRTaXplcixcbiAgICAgIHRoaXMuX19jYWNoZWRJbWFnZSxcbiAgICAgIHRoaXMuX19nZW5QbGFjZWhvbGRlcigpLFxuICAgICAgdGhpcy5nZW5Db250ZW50KClcbiAgICBdXG5cbiAgICByZXR1cm4gaChub2RlLnRhZywgbm9kZS5kYXRhLCBub2RlLmNoaWxkcmVuKVxuICB9XG59KVxuIl19