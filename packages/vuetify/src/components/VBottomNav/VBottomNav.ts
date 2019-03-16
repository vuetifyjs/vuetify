// Styles
import './VBottomNav.sass'

// Mixins
import Applicationable from '../../mixins/applicationable'
import ButtonGroup from '../../mixins/button-group'
import Colorable from '../../mixins/colorable'
import Measurable from '../../mixins/measurable'
import Proxyable from '../../mixins/proxyable'
import Themeable from '../../mixins/themeable'
import { factory as ToggleableFactory } from '../../mixins/toggleable'

// Util
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'

export default mixins(
  Applicationable('bottom', [
    'height',
    'value'
  ]),
  Colorable,
  Measurable,
  Proxyable,
  Themeable,
  ToggleableFactory('inputValue')
  /* @vue/component */
).extend({
  name: 'v-bottom-nav',

  props: {
    active: [Number, String],
    activeClass: {
      type: String,
      default: 'v-btn--active'
    },
    mandatory: Boolean,
    height: {
      type: [Number, String],
      default: 56
    },
    shift: Boolean,
    inputValue: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classes (): object {
      return {
        'v-bottom-nav--absolute': this.absolute,
        'v-bottom-nav--fixed': !this.absolute && (this.app || this.fixed),
        'v-bottom-nav--shift': this.shift
      }
    },
    styles (): object {
      return {
        ...this.measurableStyles,
        transform: this.isActive ? 'none' : 'translateY(-100%)'
      }
    }
  },

  methods: {
    updateApplication (): number {
      return this.$el
        ? this.$el.clientHeight
        : 0
    },
    updateValue (val: any) {
      this.$emit('update:active', val)
    }
  },

  render (h): VNode {
    return h(ButtonGroup, this.setBackgroundColor(this.color, {
      staticClass: 'v-bottom-nav',
      class: this.classes,
      style: this.styles,
      props: {
        activeClass: this.activeClass,
        mandatory: Boolean(this.mandatory || this.active !== undefined),
        value: this.active
      },
      on: { change: this.updateValue }
    }), this.$slots.default)
  }
})
