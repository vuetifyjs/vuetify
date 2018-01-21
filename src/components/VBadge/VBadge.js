import '../../stylus/components/_badges.styl'

// Mixins
import Colorable from '../../mixins/colorable'
import Toggleable from '../../mixins/toggleable'
import { factory as PositionableFactory } from '../../mixins/positionable'
import Transitionable from '../../mixins/transitionable'

export default {
  name: 'v-badge',

  mixins: [Colorable, Toggleable, PositionableFactory(['left', 'bottom']), Transitionable],

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
    classes () {
      return {
        'badge--bottom': this.bottom,
        'badge--left': this.left,
        'badge--overlap': this.overlap
      }
    }
  },

  render (h) {
    const badge = this.$slots.badge ? [h('span', {
      staticClass: 'badge__badge',
      'class': this.addBackgroundColorClassChecks(),
      attrs: this.attrs,
      directives: [{
        name: 'show',
        value: this.isActive
      }]
    }, this.$slots.badge)] : null

    return h('span', {
      staticClass: 'badge',
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
}
