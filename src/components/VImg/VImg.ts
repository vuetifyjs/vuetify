import '../../stylus/components/_images.styl'

import Vue, { VNode } from 'vue'
import { VFadeTransition } from '../transitions'
import { PropValidator } from 'vue/types/options'
import { consoleError } from '../../util/console'

// not intended for public use, this is passed in by vuetify-loader
interface srcObject {
  src: string
  lazySrc: string
  aspect: number
}

export default Vue.extend({
  name: 'v-img',

  inheritAttrs: false,

  props: {
    aspectRatio: [String, Number],
    src: {
      type: [String, Object],
      required: true
    } as PropValidator<string | srcObject>,
    lazySrc: String
    // lazy: [Boolean, String] // TODO: only load when visible
  },

  data () {
    return {
      isLoading: false,
      computedAspectRatio: undefined as number | undefined
    }
  },

  computed: {
    currentSrc (): string {
      return (this.computedLazySrc && this.isLoading)
        ? this.computedLazySrc
        : this.computedSrc
    },
    computedSrc (): string {
      return typeof this.src === 'string' ? this.src : this.src.src
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
    this.isLoading = !!this.computedLazySrc
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
        this.loadImage()
      }
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

      image.onload = () => {
        if (image.decode) {
          image.decode().then(this.onLoad)
        } else {
          this.onLoad()
        }
      }
      image.onerror = this.onError

      image.src = this.computedSrc
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
    return h('div', {
      staticClass: 'v-image',
      style: this.aspectStyle
    }, [
      h(VFadeTransition, {
        attrs: { mode: 'in-out' }
      }, [
        h('img', {
          class: 'v-image__image',
          attrs: {
            src: this.currentSrc,
            ...this.$attrs
          },
          key: this.currentSrc
        })
      ])
    ])
  }
})
