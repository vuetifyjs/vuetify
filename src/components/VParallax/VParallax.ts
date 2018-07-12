// Style
import '../../stylus/components/_parallax.styl'

// Mixins
import Translatable from '../../mixins/translatable'

// Types
import Vue from 'vue'
import { VNode, VNodeData } from 'vue/types/vnode'
import mixins, { ExtractVue } from '../../util/mixins'

interface options extends Vue {
  $refs: {
    img: HTMLImageElement
  }
}

/* @vue/component */
export default mixins<options & ExtractVue<typeof Translatable>>(Translatable).extend({
  name: 'v-parallax',

  props: {
    alt: String,
    height: {
      type: [String, Number],
      default: 500
    },
    src: String
  },

  data: () => ({
    isBooted: false
  }),

  computed: {
    styles (): object {
      return {
        display: 'block',
        opacity: this.isBooted ? 1 : 0,
        transform: `translate(-50%, ${this.parallax}px)`
      }
    }
  },

  watch: {
    parallax () {
      this.isBooted = true
    }
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
    },
    objHeight () {
      return this.$refs.img.naturalHeight
    }
  },

  render (h): VNode {
    const imgData: VNodeData = {
      staticClass: 'v-parallax__image',
      style: this.styles,
      attrs: {
        src: this.src
      },
      ref: 'img'
    }

    if (this.alt) imgData.attrs!.alt = this.alt

    const container = h('div', {
      staticClass: 'v-parallax__image-container'
    }, [
      h('img', imgData)
    ])

    const content = h('div', {
      staticClass: 'v-parallax__content'
    }, this.$slots.default)

    return h('div', {
      staticClass: 'v-parallax',
      style: {
        height: `${this.height}px`
      },
      on: this.$listeners
    }, [container, content])
  }
})
