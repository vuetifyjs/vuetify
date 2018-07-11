import '../../stylus/components/_images.styl'

import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'

import { consoleError } from '../../util/console'

// not intended for public use, this is passed in by vuetify-loader
interface srcObject {
  src: string
  srcset?: string
  lazySrc: string
  aspect: number
}

export default Vue.extend({
  name: 'v-img',

  inheritAttrs: false,

  props: {
    aspectRatio: [String, Number],
    contain: Boolean,
    src: {
      type: [String, Object],
      required: true
    } as PropValidator<string | srcObject>,
    lazySrc: String,
    srcset: String,
    sizes: String,
    // lazy: [Boolean, String] // TODO: only load when visible
    transition: {
      type: String,
      default: 'fade-transition'
    }
  },

  data () {
    return {
      image: null as HTMLImageElement | null,
      isLoading: false,
      computedAspectRatio: undefined as number | undefined
    }
  },

  computed: {
    currentSrc (): string {
      return this.isLoading
        ? this.computedLazySrc
        : this.computedSrc
    },
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
    }
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
      this.isLoading = false
      this.$emit('load', this.src)
    },
    onError () {
      consoleError('Image load failed\n\nsrc: ' + this.computedSrc, this)
      this.$emit('error', this.src)
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
      image.sizes = this.sizes
      this.computedSrcset && (image.srcset = this.computedSrcset)
      this.aspectRatio || this.pollForSize(image)
    },
    pollForSize (img: HTMLImageElement, timeout: number | null = 100) {
      if (!(img.naturalHeight || img.naturalWidth)) {
        const poll = () => {
          const { naturalHeight, naturalWidth } = img

          if (naturalHeight || naturalWidth) {
            this.computedAspectRatio = naturalHeight / naturalWidth
          } else {
            setTimeout(poll, timeout)
          }
        }

        timeout != null ? setTimeout(poll, timeout) : poll()
      }
    }
  },

  render (h): VNode {
    const attrs = this.isLoading ? undefined : {
      srcset: this.srcset,
      sizes: this.sizes
    }

    const image = h('img', {
      staticClass: 'v-image__image',
      class: {
        'v-image__image--preload': this.isLoading
      },
      attrs: {
        src: this.currentSrc,
        ...attrs,
        ...this.$attrs
      },
      key: this.currentSrc
    })

    const placeholder = this.$slots.placeholder && h('div', {
      staticClass: 'v-image__placeholder'
    }, this.$slots.placeholder)

    return h('div', {
      staticClass: 'v-image',
      class: {
        'v-image--contain': this.contain,
        'v-image--cover': !this.contain
      },
      style: this.aspectStyle
    }, [
      h('transition', {
        attrs: { name: this.transition }
      }, [image]),
      this.isLoading ? h('transition', {
        attrs: { name: this.transition }
      }, [placeholder]) : []
    ])
  }
})
