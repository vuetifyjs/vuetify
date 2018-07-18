import '../../stylus/components/_images.styl'

import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import { VNodeChildrenArrayContents } from 'vue/types/vnode'

import { consoleError } from '../../util/console'
import { convertToUnit } from '../../util/helpers'

// not intended for public use, this is passed in by vuetify-loader
export interface srcObject {
  src: string
  srcset?: string
  lazySrc: string
  aspect: number
}

export default Vue.extend({
  name: 'v-img',

  props: {
    alt: String,
    aspectRatio: [String, Number],
    contain: Boolean,
    src: {
      type: [String, Object],
      required: true
    } as PropValidator<string | srcObject>,
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
    },
    height: [String, Number],
    maxHeight: [String, Number]
  },

  data () {
    return {
      currentSrc: '', // Set from srcset
      image: null as HTMLImageElement | null,
      isLoading: true,
      computedAspectRatio: undefined as number | undefined
    }
  },

  computed: {
    computedSrc (): string {
      return typeof this.src === 'string' ? this.src : this.src.src
    },
    computedSrcset (): string | undefined {
      return typeof this.src === 'string' ? this.srcset : this.src.srcset
    },
    computedLazySrc (): string {
      return typeof this.src === 'string'
        ? this.lazySrc
        : this.lazySrc || this.src.lazySrc
    },
    aspectStyle (): object | undefined {
      const srcAspect = typeof this.src !== 'string'
        ? this.src.aspect
        : undefined
      const aspectRatio = +this.aspectRatio || srcAspect || this.computedAspectRatio
      return aspectRatio ? { 'padding-bottom': aspectRatio * 100 + '%' } : undefined
    },
    __cachedSizer (): VNode {
      return this.$createElement('div', { style: this.aspectStyle, staticClass: 'v-image__sizer' })
    },
    __cachedImage (): VNode | never[] {
      if (!(this.computedSrc || this.computedLazySrc)) return []

      const src = this.isLoading ? this.computedLazySrc : this.currentSrc

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
      ])
    }
  },

  watch: {
    src (val) {
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
      if (this.computedLazySrc) {
        const lazyImg = new Image()
        lazyImg.src = this.computedLazySrc
        this.pollForSize(lazyImg, null)
      }
      if (this.computedSrc) this.loadImage()
    },
    onLoad () {
      this.getSrc()
      this.isLoading = false
      this.$emit('load', this.src)
    },
    onError () {
      consoleError('Image load failed\n\nsrc: ' + this.computedSrc, this)
      this.$emit('error', this.src)
    },
    getSrc () {
      if (this.image) this.currentSrc = this.image.currentSrc
    },
    loadImage () {
      const image = new Image()
      this.image = image

      image.onload = () => {
        if (image.decode) {
          image.decode().then(this.onLoad)
        } else {
          this.onLoad()
        }
      }
      image.onerror = this.onError

      image.src = this.computedSrc
      this.sizes && (image.sizes = this.sizes)
      this.computedSrcset && (image.srcset = this.computedSrcset)

      this.aspectRatio || this.pollForSize(image)
      this.currentSrc = image.currentSrc
    },
    pollForSize (img: HTMLImageElement, timeout: number | null = 100) {
      const poll = () => {
        const { naturalHeight, naturalWidth } = img

        if (naturalHeight || naturalWidth) {
          this.computedAspectRatio = naturalHeight / naturalWidth
        } else {
          timeout != null && setTimeout(poll, timeout)
        }
      }

      poll()
    },
    __genPlaceholder (): VNode | never[] {
      if (this.$slots.placeholder) {
        const placeholder = this.$createElement('div', {
          staticClass: 'v-image__placeholder'
        }, this.$slots.placeholder)

        return this.$createElement('transition', {
          attrs: { name: this.transition }
        }, this.isLoading ? [placeholder] : [])
      } else {
        return [] // TODO: vue's types don't allow undefined
      }
    }
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-image',
      style: {
        height: convertToUnit(this.height),
        maxHeight: convertToUnit(this.maxHeight)
      },
      attrs: {
        role: this.alt ? 'img' : undefined,
        'aria-label': this.alt
      }
    }, [
      this.__cachedSizer,
      this.__cachedImage,
      this.__genPlaceholder()
    ])
  }
})
