import '../../stylus/components/_images.styl'

import Vue, { VNode } from 'vue'
import { VFadeTransition } from '../transitions'
import { PropValidator } from 'vue/types/options'

interface srcObject {
  src: string
  aspect: number
}

export default Vue.extend({
  name: 'v-img',

  inheritAttrs: false,

  props: {
    aspectRatio: [String, Number],
    src: {
      type: String,
      required: true
    },
    lazySrc: [String, Object] as PropValidator<string | srcObject>
    // lazy: [Boolean, String] // TODO: only load when visible
  },

  data () {
    return {
      isLoading: !!this.lazySrc,
      computedAspectRatio: undefined as number | undefined
    }
  },

  computed: {
    currentSrc (): string {
      return (this.lazySrc && this.isLoading)
        ? this.computedLazySrc
        : this.src
    },
    computedLazySrc (): string {
      return typeof this.lazySrc === 'string' ? this.lazySrc : this.lazySrc.src
    },
    aspectStyle (): object | undefined {
      const aspectRatio = this.aspectRatio || this.computedAspectRatio
      return aspectRatio ? { 'padding-bottom': +aspectRatio * 100 + '%' } : undefined
    }
  },

  watch: {
    src (val) {
      if (!this.isLoading) this.init()
      else this.loadImage()
    }
  },

  beforeMount () {
    this.init()
  },

  methods: {
    init () {
      if (this.lazySrc) {
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
    loadImage () {
      const image = new Image()

      if (image.decode) {
        image.src = this.src
        image.decode().then(this.onLoad)
      } else {
        image.onload = this.onLoad
        image.src = this.src
      }

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
