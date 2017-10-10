require('../../stylus/components/_chips.styl')

import VIcon from '../VIcon'
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'
import Toggleable from '../../mixins/toggleable'

export default {
  name: 'v-chip',

  components: {
    VIcon
  },

  mixins: [Colorable, Themeable, Toggleable],

  props: {
    close: Boolean,
    disabled: Boolean,
    label: Boolean,
    outline: Boolean,
    // Used for selects/tagging
    selected: Boolean,
    small: Boolean,
    textColor: String,
    value: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classes () {
      const classes = this.addBackgroundColorClassChecks({
        'chip': true,
        'chip--disabled': this.disabled,
        'chip--selected': this.selected,
        'chip--label': this.label,
        'chip--outline': this.outline,
        'chip--small': this.small,
        'chip--removable': this.close,
        'theme--light': this.light,
        'theme--dark': this.dark
      })

      return (this.textColor || this.outline)
        ? this.addTextColorClassChecks(classes, this.textColor ? 'textColor' : 'color')
        : classes
    }
  },

  render (h) {
    const children = [this.$slots.default]
    const data = {
      'class': this.classes,
      attrs: { tabindex: this.disabled ? -1 : 0 },
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      on: this.$listeners
    }

    if (this.close) {
      const data = {
        staticClass: 'chip__close',
        on: {
          click: e => {
            e.stopPropagation()

            this.$emit('input', false)
          }
        }
      }

      children.push(h('div', data, [
        h(VIcon, { props: { right: true } }, 'cancel')
      ]))
    }

    return h('span', data, children)
  }
}
