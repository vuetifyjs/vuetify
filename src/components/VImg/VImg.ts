import '../../stylus/components/_images.styl'

import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'

import { consoleError } from '../../util/console'
import { convertToUnit } from '../../util/helpers'

// not intended for public use, this is passed in by vuetify-loader
interface srcObject {
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
    }
  },

  watch: {
    src (val) {
      if (!this.isLoading) this.init()
      else this.loadImage()
    },
    '$vuetify.breakpoint.width': 'getSrc'
  },

  created () {
    this.isLoading = true
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
      this.loadImage()
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
    }
  },

  render (h): VNode {
    const src = this.isLoading ? this.computedLazySrc : this.currentSrc

    const image = h('div', {
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

    const placeholder = this.$slots.placeholder && h('div', {
      staticClass: 'v-image__placeholder'
    }, this.$slots.placeholder)

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
      h('div', { style: this.aspectStyle, staticClass: 'v-image__sizer' }),
      h('transition', {
        attrs: {
          name: this.transition,
          mode: 'in-out'
        }
      }, [image]),
      this.isLoading ? h('transition', {
        attrs: { name: this.transition }
      }, [placeholder]) : []
    ])
  }
})
