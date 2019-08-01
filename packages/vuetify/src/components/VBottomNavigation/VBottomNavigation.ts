// Styles
import './VBottomNavigation.sass'

// Mixins
import Applicationable from '../../mixins/applicationable'
import ButtonGroup from '../../mixins/button-group'
import Colorable from '../../mixins/colorable'
import Measurable from '../../mixins/measurable'
import Proxyable from '../../mixins/proxyable'
import Scrollable from '../../mixins/scrollable'
import Themeable from '../../mixins/themeable'
import { factory as ToggleableFactory } from '../../mixins/toggleable'

// Utilities
import mixins from '../../util/mixins'
import { breaking } from '../../util/console'

// Types
import { VNode } from 'vue'

export default mixins(
  Applicationable('bottom', [
    'height',
    'inputValue',
  ]),
  Colorable,
  Measurable,
  ToggleableFactory('inputValue'),
  Proxyable,
  Scrollable,
  Themeable
  /* @vue/component */
).extend({
  name: 'v-bottom-navigation',

  props: {
    activeClass: {
      type: String,
      default: 'v-btn--active',
    },
    backgroundColor: String,
    grow: Boolean,
    height: {
      type: [Number, String],
      default: 56,
    },
    hideOnScroll: Boolean,
    horizontal: Boolean,
    inputValue: {
      type: Boolean,
      default: true,
    },
    mandatory: Boolean,
    shift: Boolean,
  },

  data () {
    return {
      isActive: this.inputValue,
    }
  },

  computed: {
    canScroll (): boolean {
      return (
        Scrollable.options.computed.canScroll.call(this) &&
        (
          this.hideOnScroll ||
          !this.inputValue
        )
      )
    },
    classes (): object {
      return {
        'v-bottom-navigation--absolute': this.absolute,
        'v-bottom-navigation--grow': this.grow,
        'v-bottom-navigation--fixed': !this.absolute && (this.app || this.fixed),
        'v-bottom-navigation--horizontal': this.horizontal,
        'v-bottom-navigation--shift': this.shift,
      }
    },
    styles (): object {
      return {
        ...this.measurableStyles,
        transform: this.isActive ? 'none' : 'translateY(100%)',
      }
    },
  },

  created () {
    /* istanbul ignore next */
    if (this.$attrs.hasOwnProperty('active')) {
      breaking('active.sync', 'value or v-model', this)
    }
  },

  methods: {
    thresholdMet () {
      this.isActive = !this.isScrollingUp
      this.$emit('update:input-value', this.isActive)
    },
    updateApplication (): number {
      return this.$el
        ? this.$el.clientHeight
        : 0
    },
    updateValue (val: any) {
      this.$emit('change', val)
    },
  },

  render (h): VNode {
    const data = this.setBackgroundColor(this.backgroundColor, {
      staticClass: 'v-bottom-navigation',
      class: this.classes,
      style: this.styles,
      props: {
        activeClass: this.activeClass,
        mandatory: Boolean(
          this.mandatory ||
          this.value !== undefined
        ),
        value: this.internalValue,
      },
      on: { change: this.updateValue },
    })

    if (this.canScroll) {
      data.directives = data.directives || []

      data.directives.push({
        arg: this.scrollTarget,
        name: 'scroll',
        value: this.onScroll,
      })
    }

    return h(ButtonGroup, this.setTextColor(this.color, data), this.$slots.default)
  },
})
