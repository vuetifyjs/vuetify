// Style
import './VParallax.sass'

// Mixins
import Translatable from '../../mixins/translatable'
import mixins from '../../util/mixins'
import { getSlot } from '../../util/helpers'

// Types
import { VNode, VNodeData } from 'vue/types/vnode'

const baseMixins = mixins(
  Translatable
)
interface options extends InstanceType<typeof baseMixins> {
  $refs: {
    img: HTMLImageElement
  }
}

/* @vue/component */
export default baseMixins.extend<options>().extend({
  name: 'v-parallax',

  props: {
    alt: {
      type: String,
      default: '',
    },
    height: {
      type: [String, Number],
      default: 500,
    },
    src: String,
    srcset: String,
  },

  data: () => ({
    isBooted: false,
  }),

  computed: {
    styles (): object {
      return {
        display: 'block',
        opacity: this.isBooted ? 1 : 0,
        transform: `translate(-50%, ${this.parallax}px)`,
      }
    },
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      const img = this.$refs.img

      if (!img) return

      if (img.complete) {
        this.translate()
        this.listeners()
      } else {
        img.addEventListener('load', () => {
          this.translate()
          this.listeners()
        }, false)
      }

      this.isBooted = true
    },
    objHeight () {
      return this.$refs.img.naturalHeight
    },
  },

  render (h): VNode {
    const imgData: VNodeData = {
      staticClass: 'v-parallax__image',
      style: this.styles,
      attrs: {
        src: this.src,
        srcset: this.srcset,
        alt: this.alt,
      },
      ref: 'img',
    }

    const container = h('div', {
      staticClass: 'v-parallax__image-container',
    }, [
      h('img', imgData),
    ])

    const content = h('div', {
      staticClass: 'v-parallax__content',
    }, getSlot(this))

    return h('div', {
      staticClass: 'v-parallax',
      style: {
        height: `${this.height}px`,
      },
      on: this.$listeners,
    }, [container, content])
  },
})
