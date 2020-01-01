// Styles
import './VImg.sass'

// Directives
import intersect from '../../directives/intersect'

// Types
import { PropValidator, PropType } from 'vue/types/options'
import {
  VNode,
  VNodeDirective,
} from 'vue'

// Components
import VResponsive from '../VResponsive'

// Mixins
import Themeable from '../../mixins/themeable'

// Utils
import mergeData from '../../util/mergeData'
import mixins from '../../util/mixins'
import { consoleError, consoleWarn } from '../../util/console'

// not intended for public use, this is passed in by vuetify-loader
export interface srcObject {
  src: string
  srcset?: string
  lazySrc: string
  aspect: number
}

const baseMixins = mixins(
  VResponsive,
  Themeable,
)

/* @vue/component */
export default baseMixins.extend({
  name: 'v-img',

  directives: { intersect },

  props: {
    alt: String,
    contain: Boolean,
    eager: Boolean,
    gradient: String,
    lazySrc: String,
    options: {
      type: Object,
      // For more information on types, navigate to:
      // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      default: () => ({
        root: undefined,
        rootMargin: undefined,
        threshold: undefined,
      }),
    } as PropValidator<IntersectionObserverInit>,
    position: {
      type: String,
      default: 'center center',
    },
    sizes: String,
    src: {
      type: [String, Object] as PropType<string | srcObject>,
      default: '',
    },
    srcset: String,
    transition: {
      type: [Boolean, String],
      default: 'fade-transition',
    },
  },

  data () {
    return {
      currentSrc: '', // Set from srcset
      image: null as HTMLImageElement | null,
      isLoading: true,
      calculatedAspectRatio: undefined as number | undefined,
      naturalWidth: undefined as number | undefined,
    }
  },

  computed: {
    computedAspectRatio (): number | undefined {
      const aspectRatio = Number(this.normalisedSrc.aspect || this.calculatedAspectRatio)

      return !isNaN(aspectRatio) ? (1 / aspectRatio) : undefined
    },
    hasIntersect () {
      return (
        typeof window !== 'undefined' &&
        'IntersectionObserver' in window
      )
    },
    normalisedSrc (): srcObject {
      return typeof this.src === 'string'
        ? {
          src: this.src,
          srcset: this.srcset,
          lazySrc: this.lazySrc,
          aspect: Number(this.aspectRatio || 0),
        } : {
          src: this.src.src,
          srcset: this.srcset || this.src.srcset,
          lazySrc: this.lazySrc || this.src.lazySrc,
          aspect: Number(this.aspectRatio || this.src.aspect),
        }
    },
    __cachedImage (): VNode | [] {
      if (!(this.normalisedSrc.src || this.normalisedSrc.lazySrc)) return []

      const backgroundImage: string[] = []
      const src = this.isLoading ? this.normalisedSrc.lazySrc : this.currentSrc

      if (this.gradient) backgroundImage.push(`linear-gradient(${this.gradient})`)
      if (src) backgroundImage.push(`url("${src}")`)

      const image = this.$createElement('div', {
        staticClass: 'v-image__image',
        class: {
          'v-image__image--preload': this.isLoading,
          'v-image__image--contain': this.contain,
          'v-image__image--cover': !this.contain,
        },
        style: {
          backgroundImage: backgroundImage.join(', '),
          backgroundPosition: this.position,
        },
        key: +this.isLoading,
      })

      /* istanbul ignore if */
      if (!this.transition) return image

      return this.$createElement('transition', {
        attrs: {
          name: this.transition,
          mode: 'in-out',
        },
      }, [image])
    },
  },

  watch: {
    src () {
      // Force re-init when src changes
      if (!this.isLoading) this.init(undefined, undefined, true)
      else this.loadImage()
    },
    '$vuetify.breakpoint.width': 'getSrc',
  },

  mounted () {
    this.init()
  },

  methods: {
    init (
      entries?: IntersectionObserverEntry[],
      observer?: IntersectionObserver,
      isIntersecting?: boolean
    ) {
      // If the current browser supports the intersection
      // observer api, the image is not observable, and
      // the eager prop isn't being used, do not load
      if (
        this.hasIntersect &&
        !isIntersecting &&
        !this.eager
      ) return

      if (this.normalisedSrc.lazySrc) {
        const lazyImg = new Image()
        lazyImg.src = this.normalisedSrc.lazySrc
        this.pollForSize(lazyImg, null)
      }
      /* istanbul ignore else */
      if (this.normalisedSrc.src) this.loadImage()
    },
    onLoad () {
      this.getSrc()
      this.isLoading = false
      this.$emit('load', this.src)
    },
    onError () {
      consoleError(
        `Image load failed\n\n` +
        `src: ${this.normalisedSrc.src}`,
        this
      )
      this.$emit('error', this.src)
    },
    genContent (): VNode | undefined {
      return this.computedAspectRatio != null
        ? VResponsive.options.methods.genContent.call(this)
        : undefined
    },
    getSrc () {
      /* istanbul ignore else */
      if (this.image) this.currentSrc = this.image.currentSrc || this.image.src
    },
    loadImage () {
      const image = new Image()
      this.image = image

      image.onload = () => {
        /* istanbul ignore if */
        if (image.decode) {
          image.decode().catch((err: DOMException) => {
            consoleWarn(
              `Failed to decode image, trying to render anyway\n\n` +
              `src: ${this.normalisedSrc.src}` +
              (err.message ? `\nOriginal error: ${err.message}` : ''),
              this
            )
          }).then(this.onLoad)
        } else {
          this.onLoad()
        }
      }
      image.onerror = this.onError

      image.src = this.normalisedSrc.src
      this.sizes && (image.sizes = this.sizes)
      this.normalisedSrc.srcset && (image.srcset = this.normalisedSrc.srcset)

      this.aspectRatio || this.pollForSize(image)
      this.getSrc()
    },
    pollForSize (img: HTMLImageElement, timeout: number | null = 100) {
      const poll = () => {
        const { naturalHeight, naturalWidth } = img

        if (naturalHeight || naturalWidth) {
          this.naturalWidth = naturalWidth
          this.calculatedAspectRatio = naturalWidth / naturalHeight
        } else {
          timeout != null && setTimeout(poll, timeout)
        }
      }

      poll()
    },
    __genPlaceholder (): VNode | undefined {
      if (!this.$slots.placeholder) return undefined

      const placeholder = this.isLoading
        ? [this.$createElement('div', {
          staticClass: 'v-image__placeholder',
        }, this.$slots.placeholder)]
        : []

      if (!this.transition) return placeholder[0]

      return this.$createElement('transition', {
        props: {
          appear: true,
          name: this.transition,
        },
      }, placeholder)
    },
  },

  render (h): VNode {
    const directives = []
    const node = VResponsive.options.render.call(this, h)

    // Only load intersect directive if it
    // will work in the current browser.
    if (this.hasIntersect) {
      directives.push({
        name: 'intersect',
        options: this.options,
        modifiers: { once: true },
        value: this.init,
      } as VNodeDirective)
    }

    const data = mergeData(node.data!, {
      staticClass: 'v-image',
      attrs: {
        role: this.alt ? 'img' : undefined,
        'aria-label': this.alt,
      },
      directives,
    })

    return h(node.tag, data, [
      this.__cachedSizer,
      this.__cachedImage,
      this.__genPlaceholder(),
      this.genContent(),
    ])
  },
})
