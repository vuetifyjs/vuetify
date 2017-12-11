// Styles
require('../../stylus/components/_bottom-navs.styl')

// Mixins
import Applicationable from '../../mixins/applicationable'
import ButtonGroup from '../../mixins/button-group'
import Colorable from '../../mixins/colorable'

export default {
  name: 'v-bottom-nav',

  mixins: [
    Applicationable('bottom', [
      'height',
      'value'
    ]),
    ButtonGroup,
    Colorable
  ],

  props: {
    active: [Number, String],
    height: {
      default: 48,
      type: [Number, String],
      validator: v => !isNaN(parseInt(v))
    },
    shift: Boolean,
    value: { required: false }
  },

  watch: {
    active (val) {
      this.updateValue(val)
    }
  },

  computed: {
    classes () {
      return {
        'bottom-nav--absolute': this.absolute,
        'bottom-nav--fixed': !this.absolute && (this.app || this.fixed),
        'bottom-nav--shift': this.shift,
        'bottom-nav--active': this.value
      }
    },
    computedHeight () {
      return parseInt(this.height)
    }
  },

  methods: {
    isSelected (i) {
      const item = this.getValue(i)
      return this.active === item
    },
    /**
     * Update the application layout
     *
     * @return {number}
     */
    updateApplication () {
      return !this.value
        ? 0
        : this.computedHeight
    },
    updateValue (i) {
      const item = this.getValue(i)

      this.$emit('update:active', item)
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'bottom-nav',
      class: this.addBackgroundColorClassChecks(this.classes),
      style: {
        height: `${parseInt(this.computedHeight)}px`
      },
      ref: 'content'
    }, this.$slots.default)
  }
}
