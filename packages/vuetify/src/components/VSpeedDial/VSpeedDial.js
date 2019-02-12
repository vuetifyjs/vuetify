import '../../stylus/components/_speed-dial.styl'

import Overlayable from '../../mixins/overlayable'
import Toggleable from '../../mixins/toggleable'
import Positionable from '../../mixins/positionable'
import Transitionable from '../../mixins/transitionable'

import ClickOutside from '../../directives/click-outside'

/* @vue/component */
export default {
  name: 'v-speed-dial',

  directives: { ClickOutside },

  mixins: [Overlayable, Positionable, Toggleable, Transitionable],

  props: {
    direction: {
      type: String,
      default: 'top',
      validator: val => {
        return ['top', 'right', 'bottom', 'left'].includes(val)
      }
    },
    openOnHover: Boolean,
    transition: {
      type: String,
      default: 'scale-transition'
    },
    hideOverlay: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    hovered: false
  }),

  computed: {
    classes () {
      return {
        'v-speed-dial': true,
        'v-speed-dial--top': this.top,
        'v-speed-dial--right': this.right,
        'v-speed-dial--bottom': this.bottom,
        'v-speed-dial--left': this.left,
        'v-speed-dial--absolute': this.absolute,
        'v-speed-dial--fixed': this.fixed,
        [`v-speed-dial--direction-${this.direction}`]: true
      }
    }
  },

  render (h) {
    let children = []
    const data = {
      'class': this.classes,
      directives: [{
        name: 'click-outside',
        value: () => (this.isActive = false)
      }],
      on: {
        click: () => (this.isActive = !this.isActive)
      }
    }

    if (this.openOnHover) {
      data.on.mouseenter = () => { this.hovered = true; this.isActive = true }
      data.on.mouseleave = () => { this.hovered = false; this.isActive = false }
    }

    if (this.isActive) {
      children = (this.$slots.default || []).map((b, i) => {
        b.key = i

        return b
      })

      if (!this.hideOverlay && !this.hovered) {
        this.genOverlay()
      }
    } else if (!this.hideOverlay) {
      this.removeOverlay()
    }

    const list = h('transition-group', {
      'class': 'v-speed-dial__list',
      props: {
        name: this.transition,
        mode: this.mode,
        origin: this.origin,
        tag: 'div'
      }
    }, children)

    return h('div', data, [this.$slots.activator, list])
  }
}
