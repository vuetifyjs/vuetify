import { cloneVNode } from 'vue';
// Styles
import './VCard.sass'

// Extensions
import VSheet from '../VSheet'

// Mixins
import Loadable from '../../mixins/loadable'
import Routable from '../../mixins/routable'

// Helpers
import { defineComponent, getCurrentInstance, h } from 'vue'

// Types
import type { VNode } from 'vue'

export default defineComponent({
  name: 'v-card',

  mixins: [
    Loadable,
    Routable,
    VSheet,
  ],

  props: {
    flat: Boolean,
    hover: Boolean,
    img: String,
    link: Boolean,
    loaderHeight: {
      type: [Number, String],
      default: 4,
    },
    raised: Boolean,
  },

  computed: {
    classes (): object {
      return {
        'v-card': true,
        ...Routable.computed!.classes.call(this),
        'v-card--flat': this.flat,
        'v-card--hover': this.hover,
        'v-card--link': this.isClickable,
        'v-card--loading': this.loading,
        'v-card--disabled': this.disabled,
        'v-card--raised': this.raised,
        ...VSheet.computed!.classes.call(this),
      }
    },
    styles (): object {
      const style: Dictionary<string> = {
        ...VSheet.computed!.styles.call(this),
      }

      if (this.img) {
        style.background = `url("${this.img}") center center / cover no-repeat`
      }

      return style
    },
  },

  methods: {
    genProgress () {
      const render = Loadable.methods!.genProgress.call(this)

      if (!render) return null

      return h('div', {
        class: 'v-card__progress',
        key: 'progress',
      }, [render])
    },
  },

  render (): VNode {
    const vnode = this.generateRouteLink([
      this.genProgress(),
      this.$slots.default?.(),
    ])
    const data: Dictionary = {
      style: this.styles,
    }

    if (this.isClickable) {
      data.tabindex = 0
    }

    return cloneVNode(vnode, this.setBackgroundColor(this.color, data))
  },
})
