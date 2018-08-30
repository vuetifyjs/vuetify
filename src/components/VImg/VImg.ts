import '../../stylus/components/_images.styl'

// Types
import { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'

// Components
import VResponsive from '../VResponsive'

// Utils
import { consoleError, consoleWarn } from '../../util/console'

// not intended for public use, this is passed in by vuetify-loader
export interface srcObject {
  src: string
  srcset?: string
  lazySrc: string
  aspect: number
}

/* @vue/component */
export default VResponsive.extend({
  name: 'v-img',

  props: {
    alt: String,
    contain: Boolean,
    src: {
      type: [String, Object],
      default: ''
    } as PropValidator<string | srcObject>,
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

  data () {
    return {
      currentSrc: '', // Set from srcset
      image: null as HTMLImageElement | null,
      isLoading: true,
      calculatedAspectRatio: undefined as number | undefined
    }
  },

  computed: {
    computedAspectRatio (): number {
      return this.normalisedSrc.aspect
    },
    normalisedSrc (): srcObject {
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
        }
    },
    __cachedImage (): VNode | never[] {
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
          'v-image__image--cover': !this.contain
        },
        style: {
          backgroundImage: backgroundImage.join(', '),
          backgroundPosition: this.position
        },
        key: +this.isLoading
      })

      if (!this.transition) return image

      return this.$createElement('transition', {
        attrs: {
          name: this.transition,
          mode: 'in-out'
        }
      }, [image])
    }
  },

  watch: {
    src () {
      if (!this.isLoading) this.init()
      else this.loadImage()
    },
    '$vuetify.breakpoint.width': 'getSrc'
  },

  beforeMount () {
    this.init()
  },

  methods: {
    init () {
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
    onError (err: ErrorEvent) {
      consoleError(
        `Image load failed\n\n` +
        `src: ${this.normalisedSrc.src}` +
        (err.message ? `\nOriginal error: ${err.message}` : ''),
        this
      )
      this.$emit('error', this.src)
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
          this.calculatedAspectRatio = naturalWidth / naturalHeight
        } else {
          timeout != null && setTimeout(poll, timeout)
        }
      }

      poll()
    },
    __genPlaceholder (): VNode | void {
      if (this.$slots.placeholder) {
        const placeholder = this.isLoading
          ? [this.$createElement('div', {
            staticClass: 'v-image__placeholder'
          }, this.$slots.placeholder)]
          : []

        if (!this.transition) return placeholder[0]

        return this.$createElement('transition', {
          attrs: { name: this.transition }
        }, placeholder)
      }
    }
  },

  render (h): VNode {
    const node = VResponsive.options.render.call(this, h)

    node.data.staticClass += ' v-image'

    node.data.attrs = {
      role: this.alt ? 'img' : undefined,
      'aria-label': this.alt
    }

    node.children = [
      this.__cachedSizer,
      this.__cachedImage,
      this.__genPlaceholder(),
      this.genContent()
    ]

    return h(node.tag, node.data, node.children)
  }
})
