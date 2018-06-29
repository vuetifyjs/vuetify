// Styles
import '../../stylus/components/_bottom-navs.styl'

// Mixins
import Applicationable from '../../mixins/applicationable'
import ButtonGroup from '../../mixins/button-group'
import Colorable from '../../mixins/colorable'

/* @vue/component */
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
      default: 56,
      type: [Number, String],
      validator: v => !isNaN(parseInt(v))
    },
    shift: Boolean,
    value: null
  },

  computed: {
    classes () {
      return {
        'v-bottom-nav--absolute': this.absolute,
        'v-bottom-nav--fixed': !this.absolute && (this.app || this.fixed),
        'v-bottom-nav--shift': this.shift,
        'v-bottom-nav--active': this.value
      }
    },
    computedHeight () {
      return parseInt(this.height)
    }
  },

  watch: {
    active () {
      this.update()
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
      staticClass: 'v-bottom-nav',
      class: this.addBackgroundColorClassChecks(this.classes),
      style: {
        height: `${parseInt(this.computedHeight)}px`
      },
      ref: 'content'
    }, this.$slots.default)
  }
}
