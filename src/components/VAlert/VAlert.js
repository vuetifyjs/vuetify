require('../../stylus/components/_alerts.styl')

import VIcon from '../VIcon'

import Colorable from '../../mixins/colorable'
import Toggleable from '../../mixins/toggleable'
import Transitionable from '../../mixins/transitionable'

export default {
  name: 'v-alert',

  components: {
    VIcon
  },

  mixins: [Colorable, Toggleable, Transitionable],

  props: {
    dismissible: Boolean,
    icon: String
  },

  computed: {
    classes () {
      return {
        'alert--dismissible': this.dismissible,
        [this.color || 'error']: true
      }
    }
  },

  render (h) {
    const children = [h('div', this.$slots.default)]

    if (this.icon) {
      children.unshift(h('v-icon', {
        'class': 'alert__icon'
      }, this.icon))
    }

    if (this.dismissible) {
      const close = h('a', {
        'class': 'alert__dismissible',
        domProps: { href: 'javascript:;' },
        on: { click: () => this.$emit('input', false) }
      }, [
        h(VIcon, {
          props: {
            right: true
          }
        }, 'cancel')
      ])

      children.push(close)
    }

    const alert = h('div', {
      staticClass: 'alert',
      'class': this.classes,
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      on: this.$listeners
    }, children)

    if (!this.transition) return alert

    return h('transition', {
      props: {
        name: this.transition,
        origin: this.origin,
        mode: this.mode
      }
    }, [alert])
  }
}
