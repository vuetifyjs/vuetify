require('../../stylus/components/_buttons.styl')

import Colorable from '../../mixins/colorable'
import Contextualable from '../../mixins/contextualable'
import Positionable from '../../mixins/positionable'
import Routable from '../../mixins/routable'
import Themeable from '../../mixins/themeable'
import { factory as ToggleableFactory } from '../../mixins/toggleable'

export default {
  name: 'v-btn',

  mixins: [
    Colorable,
    Contextualable,
    Routable,
    Positionable,
    Themeable,
    ToggleableFactory('inputValue')
  ],

  props: {
    activeClass: {
      type: String,
      default: 'btn--active'
    },
    block: Boolean,
    fab: Boolean,
    flat: Boolean,
    icon: Boolean,
    large: Boolean,
    loading: Boolean,
    outline: Boolean,
    raised: {
      type: Boolean,
      default: true
    },
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    round: Boolean,
    small: Boolean,
    tag: {
      type: String,
      default: 'button'
    },
    type: {
      type: String,
      default: 'button'
    },
    value: null
  },

  computed: {
    classes () {
      const colorBackground = !this.outline && !this.flat
      const colorText = !this.disabled && !colorBackground

      const classes = {
        'btn': true,
        'btn--active': this.isActive,
        'btn--absolute': this.absolute,
        'btn--block': this.block,
        'btn--bottom': this.bottom,
        'btn--disabled': this.disabled,
        'btn--flat': this.flat,
        'btn--floating': this.fab,
        'btn--fixed': this.fixed,
        'btn--hover': this.hover,
        'btn--icon': this.icon,
        'btn--large': this.large,
        'btn--left': this.left,
        'btn--loader': this.loading,
        'btn--outline': this.outline,
        'btn--raised': !this.flat || this.raised,
        'btn--right': this.right,
        'btn--round': this.round,
        'btn--router': this.to,
        'btn--small': this.small,
        'btn--top': this.top,
        ...this.themeClasses
      }

      if (!this.color) {
        return Object.assign(classes, {
          'primary': this.primary && colorBackground,
          'secondary': this.secondary && colorBackground,
          'success': this.success && colorBackground,
          'info': this.info && colorBackground,
          'warning': this.warning && colorBackground,
          'error': this.error && colorBackground,
          'primary--text': this.primary && colorText,
          'secondary--text': this.secondary && colorText,
          'success--text': this.success && colorText,
          'info--text': this.info && colorText,
          'warning--text': this.warning && colorText,
          'error--text': this.error && colorText
        })
      }

      return colorBackground
        ? this.addBackgroundColorClassChecks(classes)
        : this.addTextColorClassChecks(classes)
    }
  },

  methods: {
    // Prevent focus to match md spec
    click (e) {
      !this.fab &&
        e.detail &&
        this.$el.blur()

      this.$emit('click', e)
    },
    genContent () {
      return this.$createElement(
        'div',
        { 'class': 'btn__content' },
        [this.$slots.default]
      )
    },
    genLoader () {
      const children = []

      if (!this.$slots.loader) {
        children.push(this.$createElement('v-progress-circular', {
          props: {
            indeterminate: true,
            size: 26
          }
        }))
      } else {
        children.push(this.$slots.loader)
      }

      return this.$createElement('span', { 'class': 'btn__loading' }, children)
    }
  },

  mounted () {
    Object.keys(Contextualable.props).forEach(prop => {
      if (this[prop]) {
        console.warn(`Context prop '${prop}' for VBtn component has been deprecated. Use 'color' prop instead.`)
      }
    })
  },

  render (h) {
    const { tag, data } = this.generateRouteLink()
    const children = [this.genContent()]

    tag === 'button' && (data.attrs.type = this.type)
    this.loading && children.push(this.genLoader())

    data.attrs.value = ['string', 'number'].includes(typeof this.value)
      ? this.value
      : JSON.stringify(this.value)

    return h(tag, data, children)
  }
}
