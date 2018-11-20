// Styles
import '../../stylus/components/_badges.styl'

// Mixins
import Colorable from '../../mixins/colorable'
import Toggleable from '../../mixins/toggleable'
import { factory as PositionableFactory } from '../../mixins/positionable'
import Transitionable from '../../mixins/transitionable'

// Types
import { VNode } from 'vue'
import mixins from '../../util/mixins'

export default mixins(
  Colorable,
  Toggleable,
  PositionableFactory(['left', 'bottom']),
  Transitionable
/* @vue/component */
).extend({
  name: 'v-badge',

  props: {
    color: {
      type: String,
      default: 'primary'
    },
    overlap: Boolean,
    transition: {
      type: String,
      default: 'fab-transition'
    },
    value: {
      default: true
    }
  },

  computed: {
    classes (): object {
      return {
        'v-badge--bottom': this.bottom,
        'v-badge--left': this.left,
        'v-badge--overlap': this.overlap
      }
    }
  },

  render (h): VNode {
    const badge = this.$slots.badge ? [h('span', this.setBackgroundColor(this.color, {
      staticClass: 'v-badge__badge',
      attrs: this.$attrs,
      directives: [{
        name: 'show',
        value: this.isActive
      }] as any
    }), this.$slots.badge)] as any : null

    return h('span', {
      staticClass: 'v-badge',
      'class': this.classes
    }, [
      this.$slots.default,
      h('transition', {
        props: {
          name: this.transition,
          origin: this.origin,
          mode: this.mode
        }
      }, badge)
    ])
  }
})
