import '../../stylus/components/_jumbotrons.styl'

// Types
import mixins from '../../util/mixins'
import { VNode } from 'vue/types'
import { PropValidator } from 'vue/types/options'
import { srcObject } from './../VImg/VImg'

// Components
import VImg from '../VImg'

// Mixins
import Colorable from '../../mixins/colorable'
import Routable from '../../mixins/routable'
import Themeable from '../../mixins/themeable'

// Helpers
import deepmerge from '../../util/deepmerge'

/* @vue/component */
export default mixins(VImg, Colorable, Routable, Themeable).extend({
  name: 'v-jumbotron',

  props: {
    src: {
      type: [String, Object],
      required: true
    } as PropValidator<string | srcObject>,
    gradient: String,
    tag: {
      type: String,
      default: 'div'
    }
  },

  computed: {
    backgroundStyles (): string | undefined {
      return this.gradient ? `linear-gradient(${this.gradient})` : undefined
    }
  },

  beforeCreate () {
    (this.$options.props as any).src.required = false;
    (this.$options.props as any).src.default = () => ({})
  },

  methods: {
    genContent () {
      return this.$createElement('div', {
        staticClass: 'v-jumbotron__content'
      }, this.$slots.default)
    }
  },

  render (h): VNode {
    const { tag, data } = this.generateRouteLink()
    const node: VNode = VImg.options.render.call(this, h)

    node.tag! = tag

    node.data!.staticClass += ' v-jumbotron'

    node.data = deepmerge(data, node.data, {
      class: this.addBackgroundColorClassChecks(this.themeClasses),
      style: {
        background: this.backgroundStyles
      }
    })

    node.children!.push(this.genContent())

    return node
  }
})
