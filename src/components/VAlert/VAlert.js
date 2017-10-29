// Styles
require('../../stylus/components/_alerts.styl')

// Components
import VIcon from '../VIcon'

// Mixins
import Colorable from '../../mixins/colorable'
import Toggleable from '../../mixins/toggleable'
import Transitionable from '../../mixins/transitionable'

// Helpers
import { genColorClasses } from '../../util/helpers'

export default {
  name: 'v-alert',

  components: {
    VIcon
  },

  mixins: [Colorable, Toggleable, Transitionable],

  props: {
    color: {
      type: String,
      default: 'primary'
    },
    dismissible: Boolean,
    icon: String,
    type: {
      type: String,
      validator (val) {
        return [
          'info',
          'error',
          'success',
          'warning'
        ].includes(val)
      }
    }
  },

  computed: {
    classes () {
      return {
        'alert--dismissible': this.dismissible,
        [genColorClasses(this.type, this.dark)]: true
      }
    },
    computedIcon () {
      if (this.icon || !this.type) return this.icon

      switch (this.type) {
        case 'info': return 'info'
        case 'error': return 'warning'
        case 'success': return 'check_circle'
        case 'warning': return 'priority_high'
      }
    }
  },

  render (h) {
    const children = [h('div', this.$slots.default)]

    if (this.computedIcon) {
      children.unshift(h('v-icon', {
        'class': 'alert__icon'
      }, this.computedIcon))
    }

    if (this.dismissible) {
      const close = h('a', {
        'class': 'alert__dismissible',
        domProps: { href: 'javascript:;' },
        on: { click: () => this.$emit('input', false) }
      }, [
        h(VIcon, {
          props: { right: true }
        }, 'cancel')
      ])

      children.push(close)
    }

    const alert = h('div', {
      staticClass: 'alert',
      'class': this._computedClasses,
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
