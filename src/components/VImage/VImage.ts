import '../../stylus/components/_images.styl'

import Vue, { VNode } from 'vue'
import { VFadeTransition } from '../transitions'
import { PropValidator } from 'vue/types/options'

interface srcObject {
  src: string
  aspect: number
}

export default Vue.extend({
  name: 'v-image',

  inheritAttrs: false,

  props: {
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
      aspectRatio: undefined as number | undefined
    }
  },

  computed: {
    currentSrc (): string {
      return (this.lazySrc && this.isLoading)
        ? this.actualLazySrc
        : this.src
    },
    actualLazySrc (): string {
      return typeof this.lazySrc === 'string' ? this.lazySrc : this.lazySrc.src
    },
    aspectStyle (): {} | undefined {
      return this.aspectRatio ? { 'padding-bottom': this.aspectRatio * 100 + '%' } : undefined
    }
  },

  beforeMount () {
    if (this.lazySrc) {
      const lazyImg = new Image()
      lazyImg.src = this.actualLazySrc
      this.pollForSize(lazyImg)
      this.loadImage()
    }
  },

  methods: {
    loadImage () {
      const image = new Image()
      this.pollForSize(image)
      image.onload = () => {
        console.log('loaded', performance.now())
        this.isLoading = false
        this.$emit('load', this.src)
      }
      image.src = this.src
    },
    pollForSize (img: HTMLImageElement) {
      const timeout = 100

      const poll = () => {
        const { naturalHeight, naturalWidth } = img

        if (naturalHeight || naturalWidth) {
          this.aspectRatio = naturalHeight / naturalWidth
          console.log(this.aspectRatio, performance.now())
        } else {
          console.log('no')
          setTimeout(poll, timeout)
        }
      }

      if (!(img.naturalHeight || img.naturalWidth)) {
        setTimeout(poll, timeout)
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
